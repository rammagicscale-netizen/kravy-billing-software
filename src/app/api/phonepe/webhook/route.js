//src/app/api/phonepe/webhook/route.js
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req) {

  try {

    const auth = req.headers.get("authorization");

    const expected =
      "Basic " +
      Buffer.from(
        `${process.env.PHONEPE_WEBHOOK_USERNAME}:${process.env.PHONEPE_WEBHOOK_PASSWORD}`
      ).toString("base64");

    if (auth !== expected) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    console.log("PhonePe Webhook:", body);

    // PhonePe may send nested payload
    const merchantOrderId =
      body.merchantOrderId ||
      body.payload?.merchantOrderId;

    const state =
      body.state ||
      body.payload?.state;

    if (!merchantOrderId) {
      return Response.json({ error: "Invalid payload" }, { status: 400 });
    }

    await connectToDatabase();

    if (state === "COMPLETED") {

      await Order.findOneAndUpdate(
        { transactionId: merchantOrderId },
        { paymentStatus: "SUCCESS" }
      );

    }

    if (state === "FAILED") {

      await Order.findOneAndUpdate(
        { transactionId: merchantOrderId },
        { paymentStatus: "FAILED" }
      );

    }

    return Response.json({ received: true });

  } catch (error) {

    console.error("Webhook Error:", error);

    return Response.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );

  }
}
