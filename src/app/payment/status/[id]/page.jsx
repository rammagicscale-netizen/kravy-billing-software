//src/app/payment/status/[id]/page.jsx

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, Download, Printer, Home } from "lucide-react";
import Link from "next/link";

export default function PaymentStatus() {

const params = useParams();

const id = params.id;
const [status,setStatus] = useState("CHECKING");

const invoiceUrl = `/api/invoice/${id}`;

useEffect(()=>{

const interval = setInterval(async()=>{

const res = await fetch(`/api/phonepe/status/${id}`);
const data = await res.json();

setStatus(data.status);

if(data.status !== "PENDING"){
clearInterval(interval);
}

},2000);

return ()=>clearInterval(interval);

},[id]);

if(status === "CHECKING"){

return(

<div className="min-h-screen flex items-center justify-center">
Checking payment status...
</div>

);

}

/* SUCCESS UI */

if(status === "SUCCESS"){

return(

<div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-12">

<div className="text-center max-w-lg">

<div className="flex justify-center mb-4">
<CheckCircle2 className="w-20 h-20 text-emerald-500" />
</div>

<h1 className="text-3xl font-bold">
Payment Successful
</h1>

<p className="text-gray-600 mt-2">
Your order has been successfully placed.
</p>

</div>

<div className="w-full max-w-4xl mt-10 bg-white rounded-2xl shadow-lg border overflow-hidden">

<div className="flex justify-between px-6 py-5 border-b">

<div>

<p className="text-sm text-gray-500">
Invoice ID
</p>

<p className="text-lg font-semibold break-all">
{id}
</p>

</div>

<span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
PAID
</span>

</div>

<div className="flex flex-wrap gap-3 px-6 py-4">

<a
href={invoiceUrl}
download
className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-black text-white"
>

<Download size={16} />
Download

</a>

<button
onClick={()=>{
const win = window.open(invoiceUrl);
setTimeout(()=>win?.print(),500);
}}
className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border"
>

<Printer size={16} />
Print

</button>

<Link
href="/"
className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 text-white"
>

<Home size={16} />
Home

</Link>

</div>

<div className="bg-gray-50 p-4 md:p-6">

<div className="rounded-xl overflow-hidden border shadow-inner">

<iframe
src={invoiceUrl}
className="w-full h-[600px]"
/>

</div>

</div>

</div>

</div>

);

}

/* FAILED */

return(

<div className="min-h-screen flex flex-col items-center justify-center">

<h1 className="text-3xl text-red-600 font-bold">
Payment Failed
</h1>

<Link
href={`/checkout?retry=${id}`}
className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg"
>

Try Again

</Link>

</div>

);

}