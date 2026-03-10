import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import axios from "axios";

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

export async function GET(req,{params}){

try{

const { id } = await params;

await connectToDatabase();

const order = await Order.findOne({
merchantOrderId:id
});

if(!order){

return Response.json(
{error:"Order not found"},
{status:404}
);

}

/* PAYMENT ALREADY COMPLETED */

if(order.paymentStatus === "SUCCESS"){

return Response.json(
{error:"Payment already completed"},
{status:400}
);

}

/* EXISTING PENDING PAYMENT */

if(order.paymentStatus === "PENDING"){

return Response.json({

url:`${process.env.NEXT_PUBLIC_BASE_URL}/payment/status/${order.merchantOrderId}`

});

}

/* FAILED PAYMENT → CREATE NEW PHONEPE ORDER */

const token = await getAccessToken();

const newMerchantOrderId = "OMO" + Date.now();

const payload = {

merchantOrderId:newMerchantOrderId,

amount:Math.round(order.amount * 100),

paymentFlow:{
type:"PG_CHECKOUT",

merchantUrls:{
redirectUrl:
`${process.env.NEXT_PUBLIC_BASE_URL}/payment/status/${newMerchantOrderId}`
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

/* UPDATE ORDER */

order.merchantOrderId = newMerchantOrderId;

await order.save();

const redirectUrl =
response.data.redirectUrl ||
response.data.data?.redirectUrl;

return Response.json({

url:redirectUrl

});

}catch(err){

console.error("Resume Payment Error:",err.response?.data || err);

return Response.json(
{error:"Resume payment failed"},
{status:500}
);

}

}