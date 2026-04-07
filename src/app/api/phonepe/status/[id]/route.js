//src/app/api/phonepe/status/[id]/route.js

import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import { checkPhonePeStatus } from "@/lib/phonepe";

async function generateInvoiceNumber() {
    let invoiceNumber;
    let exists = true;
    while (exists) {
      invoiceNumber = "INV-" + Math.floor(100000 + Math.random() * 900000);
      const order = await Order.findOne({ invoiceNumber });
      if (!order) exists = false;
    }
    return invoiceNumber;
}

export async function GET(req, { params }) {
  const { id } = await params;
  await connectToDatabase();

  const order = await Order.findOne({
    merchantOrderId: id
  });

  if (!order) {
    return Response.json({ status: "NOT_FOUND" });
  }

  // If status is PENDING, double-check with PhonePe
  if (order.paymentStatus === "PENDING") {
    const { status: phonePeStatus } = await checkPhonePeStatus(id);
    
    if (phonePeStatus === "COMPLETED" || phonePeStatus === "SUCCESS") {
      order.paymentStatus = "SUCCESS";
      order.paidAt = new Date();
      if (!order.invoiceNumber) {
        order.invoiceNumber = await generateInvoiceNumber();
      }
      await order.save();
    } else if (phonePeStatus === "FAILED" || phonePeStatus === "FAIL") {
      order.paymentStatus = "FAILED";
      await order.save();
    }
  }

  return Response.json({
    status: order.paymentStatus,
    order
  });
}