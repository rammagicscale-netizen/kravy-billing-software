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

const { amount, customer, items } = await req.json();

const token = await getAccessToken();

const merchantOrderId="KRAVY_"+Date.now();

const payload={
merchantOrderId,
amount:Math.round(amount*100),

paymentFlow:{
type:"PG_CHECKOUT",
merchantUrls:{
redirectUrl:`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`
}
}
};

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

const orderId=response.data.orderId;

await connectToDatabase();

/* invoice */

let invoiceNumber;

const lastOrder = await Order
.findOne({ invoiceNumber: { $exists: true } })
.sort({ createdAt: -1 });

if (!lastOrder) {

  invoiceNumber = "INV-2026-0001";

} else {

  const lastNum = parseInt(lastOrder.invoiceNumber.split("-")[2] || "0");

  invoiceNumber = `INV-2026-${String(lastNum + 1).padStart(4, "0")}`;

}

/* save order */

await Order.create({

invoiceNumber,
phonepeOrderId: orderId,
customerName: customer.name,
customerPhone: customer.phone,
customerEmail: customer.email,
items,
amount,
paymentStatus:"PENDING"

});

const redirectUrl =
response.data.redirectUrl ||
response.data.data?.redirectUrl;

return NextResponse.json({url:redirectUrl});

}catch(err){

console.error("PhonePe Error:",err.response?.data || err);

return NextResponse.json(
{
error:"Payment initiation failed",
details:err.message
},
{status:500}
);

}

}