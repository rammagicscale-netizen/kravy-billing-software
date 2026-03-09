"use client";

import { CheckCircle2, Download, Printer, Home } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";

export default function SuccessClient() {

const { clearCart } = useCart();
const searchParams = useSearchParams();

const orderId = searchParams.get("orderId");
const invoiceUrl = `/api/invoice/${orderId}`;

useEffect(() => {
clearCart();
}, []);

return (

<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-neutral-950 dark:to-neutral-900 flex flex-col items-center px-4 py-12">

{/* SUCCESS MESSAGE */}

<div className="text-center max-w-lg">

<div className="flex justify-center mb-4">
<CheckCircle2 className="w-20 h-20 text-emerald-500" />
</div>

<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
Payment Successful
</h1>

<p className="text-gray-600 dark:text-gray-400 mt-2">
Your order has been successfully placed.  
You can preview or download the invoice below.
</p>

</div>

{/* INVOICE CARD */}

{orderId && (

<div className="w-full max-w-5xl mt-10 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-800 overflow-hidden">

{/* CARD HEADER */}

<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5 border-b border-gray-200 dark:border-neutral-800">

<div>

<p className="text-sm text-gray-500">
Invoice ID
</p>

<p className="text-lg font-semibold text-gray-900 dark:text-white break-all">
{orderId}
</p>

</div>

<div className="flex items-center gap-3">

<span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
PAID
</span>

</div>

</div>

{/* ACTION BUTTONS */}

<div className="flex flex-wrap gap-3 px-6 py-4">

<a
href={invoiceUrl}
download
className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black"
>
<Download size={16} />
Download
</a>

<button
onClick={()=>{
const win = window.open(invoiceUrl);
setTimeout(()=>win?.print(),500);
}}
className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800"
>
<Printer size={16} />
Print
</button>

<Link
href="/"
className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700"
>
<Home size={16} />
Home
</Link>

</div>

{/* PREVIEW CONTAINER */}

<div className="bg-gray-50 dark:bg-neutral-950 p-4 md:p-6">

<div className="rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-800 shadow-inner">

<iframe
src={invoiceUrl}
className="
w-full
h-[500px]
sm:h-[600px]
md:h-[700px]
lg:h-[800px]
"
/>

</div>

</div>

</div>

)}

</div>

);
}