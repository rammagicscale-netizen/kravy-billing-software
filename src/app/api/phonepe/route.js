//src/app/api/phonepe/route.js


import { NextResponse } from "next/server";
import axios from "axios";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

const TOKEN_URL =
"https://api.phonepe.com/apis/identity-manager/v1/oauth/token";

const PAY_URL =
"https://api.phonepe.com/apis/pg/checkout/v2/pay";

async function getAccessToken(){

const params = new URLSearchParams();

params.append("grant_type","client_credentials");
params.append("client_id",process.env.PHONEPE_CLIENT_ID);
params.append("client_version",process.env.PHONEPE_CLIENT_VERSION);
params.append("client_secret",process.env.PHONEPE_CLIENT_SECRET);

const res = await axios.post(
TOKEN_URL,
params,
{headers:{ "Content-Type":"application/x-www-form-urlencoded"}}
);

return res.data.access_token;

}

export async function POST(req){

try{

const { amount, customer, items, clerkUserId } = await req.json();

const token = await getAccessToken();

const merchantOrderId = "OMO" + Date.now();

/* ---------- PHONEPE PAYLOAD ---------- */

const payload = {

merchantOrderId,

amount: Math.round(amount * 100),

paymentFlow:{
type:"PG_CHECKOUT",

merchantUrls:{

redirectUrl:
`${process.env.NEXT_PUBLIC_BASE_URL}/payment/result/${merchantOrderId}`

}

}

};

/* ---------- CREATE PAYMENT ---------- */

const response = await axios.post(

PAY_URL,

payload,

{

headers:{
Authorization:`O-Bearer ${token}`,
"Content-Type":"application/json",
"X-MERCHANT-ID":process.env.PHONEPE_MERCHANT_ID
}

}

);

const phonepeOrderId = response.data.orderId;

/* ---------- SAVE ORDER ---------- */

await connectToDatabase();

await Order.create({

merchantOrderId,
phonepeOrderId,

customer:{
  ...customer
},

items,
amount,
clerkUserId,
paymentStatus:"PENDING"

});

/* ---------- RETURN REDIRECT ---------- */

const redirectUrl =
response.data.redirectUrl ||
response.data.data?.redirectUrl;

return NextResponse.json({

url:redirectUrl

});

}catch(err){

console.error("PhonePe Error:",err.response?.data || err);

if (err.name === "ValidationError") {
  console.error("Mongoose Validation Error Details:", JSON.stringify(err.errors, null, 2));
}

return NextResponse.json(
  {
    error:"Payment initiation failed",
    details:err.message,
    fields: err.errors ? Object.keys(err.errors) : undefined
  },
  {status:500}
);
}

}