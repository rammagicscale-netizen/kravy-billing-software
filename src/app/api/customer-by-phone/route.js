import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(req) {

  try {

    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone");

    if (!phone) {
      return NextResponse.json(null);
    }

    await connectToDatabase();

    const order = await Order.findOne({
      "customer.phone": phone,
      paymentStatus: "SUCCESS"
    })
    .sort({ createdAt: -1 }) // latest order
    .lean();

    if (!order) {
      return NextResponse.json(null);
    }

    return NextResponse.json(order.customer);

  } catch (err) {

    console.error(err);
    return NextResponse.json(null);

  }

}