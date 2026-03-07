//src/app/api/invoice/[id]/route.js

import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import { generateInvoice } from "@/lib/generateInvoice";

export async function GET(req,{params}){

try{

const {id}=params;

await connectToDatabase();

const order = await Order.findOne({
phonepeOrderId:id
});

if(!order){

return Response.json(
{error:"Order not found"},
{status:404}
);

}

const pdfBuffer = await generateInvoice(order);

return new Response(pdfBuffer,{
headers:{
"Content-Type":"application/pdf",
"Content-Disposition":`attachment; filename=${order.invoiceNumber}.pdf`
}
});

}catch(err){

console.error("Invoice error",err);

return Response.json(
{error:"Failed to generate invoice"},
{status:500}
);

}

}