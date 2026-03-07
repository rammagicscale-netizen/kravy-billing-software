//src/app/api/phonepe/status/[id]/route.js

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.kravy.in";

async function handleSuccess(merchantOrderId) {
  await connectToDatabase();

  await Order.findOneAndUpdate(
    { transactionId: merchantOrderId },
    { paymentStatus: "SUCCESS" }
  );

  return NextResponse.redirect(
    `${BASE_URL}/checkout/success?orderId=${merchantOrderId}`
  );
}

async function handleFail(merchantOrderId) {
  await connectToDatabase();

  await Order.findOneAndUpdate(
    { transactionId: merchantOrderId },
    { paymentStatus: "FAILED" }
  );

  return NextResponse.redirect(
    `${BASE_URL}/checkout/failed?transactionId=${merchantOrderId}`
  );
}

/* PHONEPE POST REDIRECT */
export async function POST(req, { params }) {

  const merchantOrderId = params.id;

  try {
    const formData = await req.formData();
    const code = formData.get("code");

    if (code === "PAYMENT_SUCCESS") {
      return handleSuccess(merchantOrderId);
    }

    return handleFail(merchantOrderId);

  } catch (error) {
    return handleFail(merchantOrderId);
  }
}

/* BROWSER GET REDIRECT */
export async function GET(req, { params }) {

  const merchantOrderId = params.id;

  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (code === "PAYMENT_SUCCESS") {
    return handleSuccess(merchantOrderId);
  }

  return handleFail(merchantOrderId);
}