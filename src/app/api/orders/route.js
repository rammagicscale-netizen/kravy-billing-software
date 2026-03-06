import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    const body = await req.json();

    await connectDB();

    const order = await Order.create({
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      customerEmail: body.customerEmail,
      items: body.items,
      amount: body.amount,
      transactionId: body.transactionId,
    });

    return Response.json({
      success: true,
      order,
    });

  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
      error: "Failed to create order",
    });
  }
}