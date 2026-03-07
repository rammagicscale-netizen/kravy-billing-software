
//src/app/api/payment-failed/route.js
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    const body = await req.json();

    await connectToDatabase();

    await Order.findOneAndUpdate(
      { transactionId: body.transactionId },
      { paymentStatus: "FAILED" }
    );

    return Response.json({ success: true });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}