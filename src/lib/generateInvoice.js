//src/lib/generateInvoice.js

import PDFDocument from "pdfkit";
import QRCode from "qrcode";

export async function generateInvoice(order) {

const doc = new PDFDocument({
size: "A4",
margin: 40,
});

const buffers = [];

doc.on("data", buffers.push.bind(buffers));

/* -----------------------
HEADER
----------------------- */

doc.image("public/logo.png", 40, 40, { width: 110 });

doc
.fontSize(22)
.font("Helvetica-Bold")
.text("TAX INVOICE", 420, 45);

doc.moveDown(2);

/* -----------------------
COMPANY DETAILS
----------------------- */

doc
.fontSize(10)
.font("Helvetica")
.text("Kravy Billing Software ", 40, 120)
.text(" 599, 3rd floor, Rajokri, Delhi, India")
.text("Email: support@kravy.in")
.text("GSTIN: 07CFNPV4928Q1Z9");

/* -----------------------
INVOICE INFO
----------------------- */

doc
.fontSize(10)
.text(`Invoice No: ${order.invoiceNumber}`, 350, 120)
.text(`Invoice Date: ${new Date(order.invoiceDate).toLocaleDateString()}`)
.text(`Transaction ID: ${order.transactionId}`)
.text(`Payment Method: PhonePe`);

doc.moveDown(2);

/* -----------------------
CUSTOMER DETAILS
----------------------- */

doc
.fontSize(12)
.font("Helvetica-Bold")
.text("Bill To", 40, 180);

doc
.font("Helvetica")
.fontSize(10)
.text(order.customerName)
.text(`Phone: ${order.customerPhone}`)
.text(`Email: ${order.customerEmail || "-"}`);

doc.moveDown(2);

/* -----------------------
TABLE HEADER
----------------------- */

const tableTop = 250;

doc
.font("Helvetica-Bold")
.fontSize(10)
.text("Item", 40, tableTop)
.text("Qty", 300, tableTop)
.text("Price", 350, tableTop)
.text("Total", 450, tableTop);

doc.moveTo(40, tableTop + 15)
.lineTo(550, tableTop + 15)
.stroke();

/* -----------------------
TABLE ITEMS
----------------------- */

let position = tableTop + 25;

doc.font("Helvetica");

order.items.forEach((item) => {

const total = item.price * item.quantity;

doc
.fontSize(10)
.text(item.name, 40, position)
.text(item.quantity, 300, position)
.text(`₹${item.price}`, 350, position)
.text(`₹${total}`, 450, position);

position += 20;

});

/* -----------------------
TOTAL
----------------------- */

doc.moveTo(40, position + 10)
.lineTo(550, position + 10)
.stroke();

doc
.font("Helvetica-Bold")
.fontSize(12)
.text("Grand Total", 350, position + 25)
.text(`₹${order.amount}`, 450, position + 25);

/* -----------------------
QR CODE
----------------------- */

const qrData = `Invoice:${order.invoiceNumber}
Amount:${order.amount}
Customer:${order.customerName}`;

const qrImage = await QRCode.toDataURL(qrData);

const base64 = qrImage.replace(/^data:image\/png;base64,/, "");
const qrBuffer = Buffer.from(base64, "base64");

doc.image(qrBuffer, 420, position + 70, { width: 100 });

doc
.fontSize(8)
.font("Helvetica")
.text("Scan for invoice verification", 420, position + 180);

/* -----------------------
FOOTER
----------------------- */

doc
.fontSize(9)
.text(
"This is a computer generated invoice and does not require signature.",
40,
750,
{
align: "center",
width: 520,
}
);

doc.end();

/* -----------------------
RETURN BUFFER
----------------------- */

return new Promise((resolve) => {

doc.on("end", () => {
resolve(Buffer.concat(buffers));
});

});

}