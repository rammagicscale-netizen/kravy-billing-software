import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";

export async function generateInvoice(order){

const pdfDoc = await PDFDocument.create();
const page = pdfDoc.addPage([595,842]);

const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

const { height } = page.getSize();

const brand = rgb(0.149, 0.278, 0.878);

/* ---------- HEADER ---------- */


const headerHeight = 100;

page.drawRectangle({
  x: 0,
  y: height - headerHeight,
  width: 595,
  height: headerHeight,
  color: rgb(0.149, 0.278, 0.878)
});

/* ---------- LOGO ---------- */

const logoPath = path.join(process.cwd(), "public/logo.png");

if (fs.existsSync(logoPath)) {

  const logoBytes = fs.readFileSync(logoPath);
  const logo = await pdfDoc.embedPng(logoBytes);

  const logoWidth = 90;
  const logoHeight = 90;

  page.drawImage(logo, {
    x: 40,
    y: height - headerHeight / 2 - logoHeight / 2,
    width: logoWidth,
    height: logoHeight
  });

}

/* ---------- COMPANY TEXT ---------- */

const companyName = "Kravy Software";
const address1 = "House No. 599, 3rd Floor";
const address2 = "Rajokri, New Delhi, India, 110038";
const gst = "GSTIN: 07CFNPV4928Q1Z9";

const rightMargin = 40;
const textSizeTitle = 20;
const textSize = 9;

const nameWidth = bold.widthOfTextAtSize(companyName, textSizeTitle);

const startX = 595 - nameWidth - rightMargin;
const startY = height - 35;

page.drawText(companyName, {
  x: startX,
  y: startY,
  size: textSizeTitle,
  font: bold,
  color: rgb(1,1,1)
});

page.drawText(address1, {
  x: startX,
  y: startY - 15,
  size: textSize,
  font,
  color: rgb(1,1,1)
});

page.drawText(address2, {
  x: startX,
  y: startY - 28,
  size: textSize,
  font,
  color: rgb(1,1,1)
});

page.drawText(gst, {
  x: startX,
  y: startY - 41,
  size: textSize,
  font,
  color: rgb(1,1,1)
});
/* ---------- TITLE ---------- */

page.drawText("INVOICE",{
x:260,
y:height-150,
size:18,
font:bold
});

/* ---------- BILL TO ---------- */

let y = height - 200;

page.drawText("Bill To",{x:40,y,size:11,font:bold});

y -= 18;

page.drawText(order.customerName,{x:40,y,size:10,font});
y -= 14;

page.drawText(`Phone: ${order.customerPhone}`,{x:40,y,size:10,font});

/* ---------- INVOICE DETAILS ---------- */

let infoY = height - 200;

page.drawText("Invoice #",{x:350,y:infoY,size:10,font});
page.drawText(order.invoiceNumber,{x:440,y:infoY,size:10,font:bold});

infoY -= 16;

page.drawText("Date",{x:350,y:infoY,size:10,font});
page.drawText(
new Date(order.invoiceDate).toLocaleDateString(),
{x:440,y:infoY,size:10,font}
);

infoY -= 16;

page.drawText("Txn ID",{x:350,y:infoY,size:10,font});
page.drawText(order.phonepeOrderId,{x:440,y:infoY,size:9,font});

/* ---------- TABLE HEADER ---------- */

y -= 50;

page.drawRectangle({
x:40,
y,
width:510,
height:22,
color: rgb(0.149, 0.278, 0.878)
});

page.drawText("#",{x:50,y:y+6,size:10,font:bold,color:rgb(1,1,1)});
page.drawText("Item & Description",{x:80,y:y+6,size:10,font:bold,color:rgb(1,1,1)});
page.drawText("Qty",{x:300,y:y+6,size:10,font:bold,color:rgb(1,1,1)});
page.drawText("Rate",{x:360,y:y+6,size:10,font:bold,color:rgb(1,1,1)});
page.drawText("Amount",{x:450,y:y+6,size:10,font:bold,color:rgb(1,1,1)});

y -= 30;

/* ---------- ITEMS ---------- */

order.items.forEach((item,i)=>{

const total = item.price * item.quantity;

page.drawText(String(i+1),{x:50,y,size:10,font});

page.drawText(item.name,{x:80,y,size:10,font});

page.drawText("Product Service",{x:80,y:y-12,size:8,font,color:rgb(0.5,0.5,0.5)});

page.drawText(String(item.quantity),{x:300,y,size:10,font});

page.drawText(`Rs ${item.price}`,{x:360,y,size:10,font});

page.drawText(`Rs ${total}`,{x:450,y,size:10,font});

y -= 35;

});

/* ---------- TOTAL ---------- */

y -= 10;

page.drawText("Total",{x:380,y,size:12,font:bold});

page.drawText(`Rs ${order.amount}`,{x:450,y,size:12,font:bold});

/* ---------- PAYMENT ---------- */

y -= 60;

page.drawText("Payment Details",{x:40,y,size:11,font:bold});

y -= 16;

page.drawText("Mode: PhonePe",{x:40,y,size:10,font});

y -= 14;

page.drawText(`Transaction ID: ${order.phonepeOrderId}`,{
x:40,
y,
size:10,
font
});

/* ---------- QR ---------- */

const qrData=`Invoice:${order.invoiceNumber}
Amount:${order.amount}
Txn:${order.phonepeOrderId}`;

const qr = await QRCode.toDataURL(qrData);

const qrImg = await pdfDoc.embedPng(
Buffer.from(qr.replace(/^data:image\/png;base64,/,""),"base64")
);

page.drawImage(qrImg,{
x:260,
y:90,
width:100,
height:100
});

/* ---------- FOOTER ---------- */
const footerHeight = 30;

/* ---------- RECEIPT TEXT ABOVE FOOTER ---------- */

const receiptText =
"This is a computer generated receipt and does not require signature.";

const receiptWidth = font.widthOfTextAtSize(receiptText, 9);

page.drawText(receiptText, {
  x: (595 - receiptWidth) / 2,
  y: footerHeight + 10,
  size: 9,
  font
});

/* ---------- FOOTER BAR ---------- */

page.drawRectangle({
  x: 0,
  y: 0,
  width: 595,
  height: footerHeight,
  color: rgb(0.149, 0.278, 0.878)
});

/* ---------- FOOTER CONTACT TEXT ---------- */

const footerText =
"Phone: 9289507882  |  www.kravy.in  |  support@kravy.in";

const textWidth = font.widthOfTextAtSize(footerText, 9);

page.drawText(footerText, {
  x: (595 - textWidth) / 2,
  y: footerHeight / 2 - 4,
  size: 9,
  font,
  color: rgb(1,1,1)
});

const pdfBytes = await pdfDoc.save();

return Buffer.from(pdfBytes);

}