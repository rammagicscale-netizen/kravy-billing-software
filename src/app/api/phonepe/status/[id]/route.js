//src/app/api/phonepe/status/[id]/route.js

import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(req, { params }) {

  const { id } = await params;

  await connectToDatabase();

  const order = await Order.findOne({
    merchantOrderId: id
  });

  if (!order) {

    return Response.json({
      status: "NOT_FOUND"
    });

  }

  return Response.json({
    status: order.paymentStatus,
    order
  });

}