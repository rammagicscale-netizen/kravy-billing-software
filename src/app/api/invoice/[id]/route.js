//src/app/api/invoice/[id]/route.js

export const runtime = "nodejs";

import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import { generateInvoice } from "@/lib/generateInvoice";

export async function GET(req,{params}){

try{

const { id } = params;

await connectToDatabase();

const order = await Order.findOne({
merchantOrderId:id
}).lean();

if(!order){

return Response.json(
{error:"Order not found"},
{status:404}
);

}

/* PAYMENT CHECK */

if(order.paymentStatus !== "SUCCESS"){

return Response.json(
{error:"Payment not completed"},
{status:400}
);

}

/* GENERATE PDF */

const pdfBuffer = await generateInvoice(order);

return new Response(pdfBuffer,{

headers:{

"Content-Type":"application/pdf",

"Content-Disposition":
`attachment; filename=${order.invoiceNumber}.pdf`

}

});

}catch(err){

console.error("Invoice error:",err);

return Response.json(
{error:err.message},
{status:500}
);

}

}