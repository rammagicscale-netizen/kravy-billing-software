import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(req) {

  try {

    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    const phone = searchParams.get("phone");

    if (!phone) {
      return Response.json(
        { error: "Phone number required" },
        { status: 400 }
      );
    }

    const orders = await Order.find({
      "customer.phone": phone
    })
      .sort({ createdAt: -1 })
      .lean();

    return Response.json(orders);

  } catch (err) {

    console.error("Orders API error:", err);

    return Response.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );

  }

}