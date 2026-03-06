import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import { generateInvoice } from "@/lib/generateInvoice";

export async function GET(req, { params }) {
  await connectToDatabase();

  const order = await Order.findById(params.id);

  if (!order) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  const pdfBuffer = await generateInvoice(order);

  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${order.invoiceNumber}.pdf`,
    },
  });
}