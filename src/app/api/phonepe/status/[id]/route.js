import { NextResponse } from "next/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// PhonePe redirect (POST form)
export async function POST(req, { params }) {
  const merchantOrderId = params.id;

  try {
    let code = null;

    try {
      const formData = await req.formData();
      code = formData.get("code");

      console.log(
        "PhonePe POST Redirect Data:",
        Object.fromEntries(formData)
      );
    } catch (err) {
      console.log("No form data received:", err.message);
    }

    if (code === "PAYMENT_SUCCESS") {
      return NextResponse.redirect(
        `${BASE_URL}/checkout/success?orderId=${merchantOrderId}`,
        { status: 303 }
      );
    }

    return NextResponse.redirect(
      `${BASE_URL}/checkout/failed?transactionId=${merchantOrderId}`,
      { status: 303 }
    );
  } catch (error) {
    console.error("PhonePe POST handler error:", error.message);

    return NextResponse.redirect(
      `${BASE_URL}/checkout/failed?transactionId=${merchantOrderId}`,
      { status: 303 }
    );
  }
}

// fallback if redirect comes as GET
export async function GET(req, { params }) {
  const merchantOrderId = params.id;

  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    console.log("PhonePe GET Redirect:", code);

    if (code === "PAYMENT_SUCCESS") {
      return NextResponse.redirect(
        `${BASE_URL}/checkout/success?orderId=${merchantOrderId}`
      );
    }

    return NextResponse.redirect(
      `${BASE_URL}/checkout/failed?transactionId=${merchantOrderId}`
    );
  } catch (error) {
    console.error("PhonePe GET handler error:", error.message);

    return NextResponse.redirect(`${BASE_URL}/checkout/failed`);
  }
}