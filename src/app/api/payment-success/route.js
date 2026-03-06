import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import { generateInvoice } from "@/lib/generateInvoice";
import { sendInvoiceEmail } from "@/lib/sendInvoiceEmail";

export async function POST(req) {
  try {
    const body = await req.json();

    await connectToDatabase();

    const order = await Order.findOneAndUpdate(
      { transactionId: body.transactionId },
      { paymentStatus: "SUCCESS" },
      { new: true }
    );

    if (!order) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    const pdfBuffer = await generateInvoice(order);

    if (order.customerEmail) {
      await sendInvoiceEmail(order, pdfBuffer);
    }

    return Response.json({ success: true });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Payment update failed" },
      { status: 500 }
    );
  }
}