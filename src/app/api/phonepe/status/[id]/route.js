//src/app/api/phonepe/status/[id]/route.js


import { NextResponse } from "next/server";
import axios from "axios";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const TOKEN_URL =
  "https://api.phonepe.com/apis/identity-manager/v1/oauth/token";

const STATUS_URL =
  "https://api.phonepe.com/apis/pg/checkout/v2/order/";

async function getAccessToken() {

  const params = new URLSearchParams();

  params.append("grant_type", "client_credentials");
  params.append("client_id", process.env.PHONEPE_CLIENT_ID);
  params.append("client_version", process.env.PHONEPE_CLIENT_VERSION);
  params.append("client_secret", process.env.PHONEPE_CLIENT_SECRET);

  const response = await axios.post(TOKEN_URL, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return response.data.access_token;
}

export async function GET(req, { params }) {

  try {

    const { id } = params; // This is PhonePe orderId

    await connectToDatabase();

    const order = await Order.findOne({
      phonepeOrderId: id,
    });

    if (!order) {
      return NextResponse.redirect(
        `${BASE_URL}/checkout/failed?orderId=${id}`
      );
    }

    const token = await getAccessToken();

    const response = await axios.get(
      `${STATUS_URL}${id}`,
      {
        headers: {
          Authorization: `O-Bearer ${token}`,
          "X-MERCHANT-ID": process.env.PHONEPE_MERCHANT_ID,
        },
      }
    );

    const state = response.data.state;

    if (state === "COMPLETED") {

      await Order.findOneAndUpdate(
        { phonepeOrderId: id },
        { paymentStatus: "SUCCESS" }
      );

      return NextResponse.redirect(
        `${BASE_URL}/checkout/success?orderId=${id}`
      );
    }

    await Order.findOneAndUpdate(
      { phonepeOrderId: id },
      { paymentStatus: "FAILED" }
    );

    return NextResponse.redirect(
      `${BASE_URL}/checkout/failed?orderId=${id}`
    );

  } catch (error) {

    console.error("Status API Error:", error.response?.data || error);

    return NextResponse.redirect(
      `${BASE_URL}/checkout/failed`
    );
  }
}

export async function POST(req, ctx) {
  return GET(req, ctx);
}