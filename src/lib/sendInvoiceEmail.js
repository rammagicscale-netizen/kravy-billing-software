//src/lib/sendInvoiceEmail.js

import nodemailer from "nodemailer";

export async function sendInvoiceEmail(order, pdfBuffer) {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Kravy Billing" <${process.env.EMAIL_USER}>`,
    to: order.customerEmail,
    subject: `Your Invoice ${order.invoiceNumber}`,
    text: `Thank you for your purchase. Your invoice is attached.`,
    attachments: [
      {
        filename: `${order.invoiceNumber}.pdf`,
        content: pdfBuffer
      }
    ]
  });
}