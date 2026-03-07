//src/app/api/phonepe/webhook/route.js

import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req){

try{

const auth = req.headers.get("authorization");

const expected =
"Basic " +
Buffer.from(
`${process.env.PHONEPE_WEBHOOK_USERNAME}:${process.env.PHONEPE_WEBHOOK_PASSWORD}`
).toString("base64");

if(auth !== expected){

return new Response("Unauthorized",{status:401});

}

const body = await req.json();

console.log("PhonePe Webhook:",body);

const orderId =
body.orderId ||
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

if(state==="COMPLETED"){

await Order.findOneAndUpdate(
{phonepeOrderId:orderId},
{paymentStatus:"SUCCESS"}
);

}

if(state==="FAILED"){

await Order.findOneAndUpdate(
{phonepeOrderId:orderId},
{paymentStatus:"FAILED"}
);

}

return Response.json({received:true});

}catch(err){

console.error("Webhook error",err);

return Response.json(
{error:"Webhook processing failed"},
{status:500}
);

}

}