//src/app/api/phonepe/status/[id]/route.js

import { NextResponse } from "next/server";
import axios from "axios";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://kravy.in";

const PHONEPE_ENV = process.env.PHONEPE_ENV || "PROD";

const STATUS_URL =
  PHONEPE_ENV === "PROD"
    ? "https://api.phonepe.com/apis/pg/checkout/v2/order/"
    : "https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/order/";

async function getAccessToken() {

  const params = new URLSearchParams();

  params.append("grant_type", "client_credentials");
  params.append("client_id", process.env.PHONEPE_CLIENT_ID);
  params.append("client_version", process.env.PHONEPE_CLIENT_VERSION);
  params.append("client_secret", process.env.PHONEPE_CLIENT_SECRET);

  const response = await axios.post(
    PHONEPE_ENV === "PROD"
      ? "https://api.phonepe.com/apis/identity-manager/v1/oauth/token"
      : "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token",
    params,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.access_token;
}

async function verifyPayment(transactionId) {

  const token = await getAccessToken();

  const response = await axios.get(
    `${STATUS_URL}${transactionId}`,
    {
      headers: {
        Authorization: `O-Bearer ${token}`,
        "X-MERCHANT-ID": process.env.PHONEPE_MERCHANT_ID,
      },
    }
  );

  return response.data;
}

async function handlePayment(transactionId) {

  await connectToDatabase();

  const status = await verifyPayment(transactionId);

  const state = status.state;

  if (state === "COMPLETED") {

    await Order.findOneAndUpdate(
      { transactionId },
      { paymentStatus: "SUCCESS" }
    );

    return NextResponse.redirect(
      `${BASE_URL}/checkout/success?orderId=${transactionId}`
    );
  }

  await Order.findOneAndUpdate(
    { transactionId },
    { paymentStatus: "FAILED" }
  );

  return NextResponse.redirect(
    `${BASE_URL}/checkout/failed?transactionId=${transactionId}`
  );
}

export async function GET(req, { params }) {

  const transactionId = params.id;

  return handlePayment(transactionId);
}

export async function POST(req, { params }) {

  const transactionId = params.id;

  return handlePayment(transactionId);
}