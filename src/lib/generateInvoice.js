import PDFDocument from "pdfkit";
import QRCode from "qrcode";

export async function generateInvoice(order) {

  const doc = new PDFDocument({ margin: 50 });

  const buffers = [];
  doc.on("data", buffers.push.bind(buffers));

  // LOGO
  doc.image("public/logo.png", 50, 45, { width: 120 });

  doc.fontSize(20).text("INVOICE", 400, 50);

  doc.moveDown();

  // COMPANY DETAILS
  doc.fontSize(12).text("Kravy Technologies");
  doc.text("Delhi, India");
  doc.text("Email: support@kravy.in");
  doc.text("GSTIN: 07ABCDE1234F1Z5");

  doc.moveDown();

  // CUSTOMER
  doc.text(`Invoice: ${order.invoiceNumber}`);
  doc.text(`Date: ${new Date().toLocaleDateString()}`);

  doc.moveDown();

  doc.text(`Customer: ${order.customerName}`);
  doc.text(`Phone: ${order.customerPhone}`);
  doc.text(`Email: ${order.customerEmail || "-"}`);

  doc.moveDown();

  // ITEMS TABLE
  doc.fontSize(14).text("Items");

  order.items.forEach((item) => {
    doc.fontSize(12).text(
      `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`
    );
  });

  doc.moveDown();

  doc.fontSize(14).text(`Total: ₹${order.amount}`, {
    align: "right",
  });

  doc.moveDown();

  // QR CODE (payment / invoice link)
  const qrData = `Invoice:${order.invoiceNumber} Amount:${order.amount}`;
  const qrImage = await QRCode.toDataURL(qrData);

  const base64 = qrImage.replace(/^data:image\/png;base64,/, "");
  const qrBuffer = Buffer.from(base64, "base64");

  doc.image(qrBuffer, 450, doc.y, { width: 100 });

  doc.end();

  return new Promise((resolve) => {
    doc.on("end", () => {
      resolve(Buffer.concat(buffers));
    });
  });
}