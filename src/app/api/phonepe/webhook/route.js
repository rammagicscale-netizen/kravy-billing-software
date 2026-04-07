// import { connectToDatabase } from "@/lib/mongodb";
// import Order from "@/models/Order";

// export async function POST(req) {

// try {

// const authHeader = req.headers.get("authorization");

// const expectedAuth =
// "Basic " +
// Buffer.from(
// `${process.env.PHONEPE_WEBHOOK_USERNAME}:${process.env.PHONEPE_WEBHOOK_PASSWORD}`
// ).toString("base64");

// if (authHeader !== expectedAuth) {

// console.log("Webhook auth failed");

// return new Response("Unauthorized",{status:401});

// }

// /* ---------- BODY ---------- */

// const body = await req.json();

// console.log("PhonePe Webhook Payload:");
// console.log(JSON.stringify(body,null,2));

// const orderId =
// body.merchantOrderId ||
// body.orderId ||
// body.payload?.merchantOrderId ||
// body.payload?.orderId;

// const state =
// body.state ||
// body.payload?.state;

// if(!orderId){

// return Response.json(
// {error:"Invalid webhook payload"},
// {status:400}
// );

// }

// await connectToDatabase();

// /* ---------- FIND ORDER ---------- */

// const order = await Order.findOne({

// $or:[
// {phonepeOrderId:orderId},
// {merchantOrderId:orderId}
// ]

// });

// if(!order){

// console.log("Order not found:",orderId);

// return Response.json({received:true});

// }

// /* ---------- PREVENT DUPLICATE WEBHOOK ---------- */

// if(order.paymentStatus === "SUCCESS"){

// return Response.json({received:true});

// }

// /* ---------- PAYMENT SUCCESS ---------- */

// if(state === "COMPLETED"){

// order.paymentStatus = "SUCCESS";
// order.paidAt = new Date();

// /* GENERATE INVOICE HERE */

// const lastOrder = await Order
// .findOne({invoiceNumber:{$exists:true}})
// .sort({createdAt:-1});

// let invoiceNumber;

// if(!lastOrder){

// invoiceNumber="INV-2026-0001";

// }else{

// const lastNum =
// parseInt(lastOrder.invoiceNumber.split("-")[2] || "0");

// invoiceNumber =`INV-2026-${String(lastNum+1).padStart(4,"0")}`;

// }

// order.invoiceNumber = invoiceNumber;

// await order.save();

// console.log("Payment SUCCESS:",orderId);

// }

// /* ---------- PAYMENT FAILED ---------- */

// else if(state === "FAILED"){

// order.paymentStatus = "FAILED";

// await order.save();

// console.log("Payment FAILED:",orderId);

// }

// return Response.json({received:true});

// }catch(err){

// console.error("Webhook error:",err);

// return Response.json(
// {error:"Webhook processing failed"},
// {status:500}
// );

// }

// }



//src/app/api/phonepe/route.js

import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

/* ---------- GENERATE UNIQUE INVOICE ---------- */

async function generateInvoiceNumber() {

  let invoiceNumber;
  let exists = true;

  while (exists) {

    invoiceNumber =
      "INV-" + Math.floor(100000 + Math.random() * 900000);

    const order = await Order.findOne({ invoiceNumber });

    if (!order) {
      exists = false;
    }

  }

  return invoiceNumber;
}

export async function POST(req) {

try {

const authHeader = req.headers.get("authorization");

const expectedAuth =
"Basic " +
Buffer.from(
`${process.env.PHONEPE_WEBHOOK_USERNAME}:${process.env.PHONEPE_WEBHOOK_PASSWORD}`
).toString("base64");

if (authHeader !== expectedAuth) {

console.log("Webhook auth failed");

return new Response("Unauthorized",{status:401});

}

/* ---------- BODY ---------- */

const body = await req.json();

console.log("PhonePe Webhook Payload:");
console.log(JSON.stringify(body,null,2));

const orderId =
body.merchantOrderId ||
body.orderId ||
body.payload?.merchantOrderId ||
body.payload?.orderId;

const state =
body.state ||
body.payload?.state;

if(!orderId){

return Response.json(
{error:"Invalid webhook payload"},
{status:400}
);

}

await connectToDatabase();

/* ---------- FIND ORDER ---------- */

const order = await Order.findOne({

$or:[
{phonepeOrderId:orderId},
{merchantOrderId:orderId}
]

});

if(!order){

console.log("Order not found:",orderId);

return Response.json({received:true});

}

/* ---------- PREVENT DUPLICATE WEBHOOK ---------- */

if(order.paymentStatus === "SUCCESS"){

return Response.json({received:true});

}

/* ---------- PAYMENT SUCCESS ---------- */

if(state === "COMPLETED" || state === "SUCCESS"){

order.paymentStatus = "SUCCESS";
order.paidAt = new Date();

/* ---------- GENERATE RANDOM INVOICE ---------- */

const invoiceNumber = await generateInvoiceNumber();

order.invoiceNumber = invoiceNumber;

await order.save();

console.log("Payment SUCCESS:",orderId,"Invoice:",invoiceNumber);

}

/* ---------- PAYMENT FAILED ---------- */

else if(state === "FAILED"){

order.paymentStatus = "FAILED";

await order.save();

console.log("Payment FAILED:",orderId);

}

return Response.json({received:true});

}catch(err){

console.error("Webhook error:",err);

return Response.json(
{error:"Webhook processing failed"},
{status:500}
);

}

}