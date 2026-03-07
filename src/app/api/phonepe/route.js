//src/app/api/phonepe/route.js

import { NextResponse } from "next/server";
import axios from "axios";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const TOKEN_URL =
  "https://api.phonepe.com/apis/identity-manager/v1/oauth/token";

const PAY_URL =
  "https://api.phonepe.com/apis/pg/checkout/v2/pay";

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

export async function POST(req) {

  try {

    const { amount, transactionId } = await req.json();

    const token = await getAccessToken();

    const payload = {
      merchantOrderId: transactionId,
      amount: Math.round(amount * 100),
      paymentFlow: {
        type: "PG_CHECKOUT",
        merchantUrls: {
          redirectUrl: `${BASE_URL}/api/phonepe/status/${transactionId}`,
        },
      },
    };

    const response = await axios.post(
      PAY_URL,
      payload,
      {
        headers: {
          Authorization: `O-Bearer ${token}`,
          "Content-Type": "application/json",
          "X-MERCHANT-ID": process.env.PHONEPE_MERCHANT_ID,
        },
      }
    );

    const orderId = response.data.orderId;

    await connectToDatabase();

    await Order.findOneAndUpdate(
      { transactionId },
      { phonepeOrderId: orderId }
    );

    const redirectUrl =
      response.data.redirectUrl ||
      response.data?.data?.redirectUrl;

    return NextResponse.json({ url: redirectUrl });

  } catch (error) {

    console.error("PhonePe Payment Error:", error.response?.data || error);

    return NextResponse.json(
      { error: "Payment initiation failed" },
      { status: 500 }
    );
  }
}