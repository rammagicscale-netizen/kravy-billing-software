import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    const body = await req.json();

    await connectToDatabase();

    // get last invoice
    const lastOrder = await Order.findOne().sort({ createdAt: -1 });

    let invoiceNumber = "INV-2026-0001";

    if (lastOrder && lastOrder.invoiceNumber) {
      const lastNumber = parseInt(lastOrder.invoiceNumber.split("-")[2]);
      const nextNumber = (lastNumber + 1).toString().padStart(4, "0");
      invoiceNumber = `INV-2026-${nextNumber}`;
    }

    const order = await Order.create({
      invoiceNumber,
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      customerEmail: body.customerEmail,
      items: body.items,
      amount: body.amount,
      transactionId: body.transactionId,
      paymentStatus: "PENDING",
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