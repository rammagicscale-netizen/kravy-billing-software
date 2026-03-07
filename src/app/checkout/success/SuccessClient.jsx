//src/app/checkout/success/SuccessClient.jsx

"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";

export default function SuccessClient() {

const { clearCart } = useCart();
const searchParams = useSearchParams();

const orderId = searchParams.get("orderId");

useEffect(() => {
clearCart();
}, [clearCart]);

return (
<div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">

<CheckCircle2 className="w-20 h-20 text-emerald-500 mb-6" />

<h1 className="text-3xl font-bold mb-3">
Payment Successful
</h1>

<p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
Your order has been successfully placed.  
Invoice is ready for download.
</p>

<div className="flex flex-col sm:flex-row gap-4">

{orderId && (
<a
href={`/api/invoice/${orderId}`}
className="px-6 py-3 bg-black text-white rounded-lg"
>
Download Invoice
</a>
)}

<button
onClick={() => window.print()}
className="px-6 py-3 border rounded-lg"
>
Print Page
</button>

<Link
href="/"
className="px-6 py-3 bg-emerald-600 text-white rounded-lg"
>
Go Home
</Link>

</div>

</div>
);
}