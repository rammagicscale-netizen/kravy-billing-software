"use client";

import { useState } from "react";
import { Search, FileText, RotateCcw, Clock } from "lucide-react";

export default function Orders() {

const [phone,setPhone] = useState("");
const [orders,setOrders] = useState([]);
const [loading,setLoading] = useState(false);

const search = async ()=>{

if(!phone){
alert("Enter mobile number");
return;
}

setLoading(true);

try{

const res = await fetch(`/api/orders?phone=${phone}`);
const data = await res.json();

setOrders(Array.isArray(data) ? data : []);

}catch(err){

console.error(err);
alert("Failed to fetch orders");

}

setLoading(false);

};

const resumePayment = async(id)=>{

try{

const res = await fetch(`/api/payment/resume/${id}`);
const data = await res.json();

if(data.url){
window.location.href = data.url;
}

}catch(err){

console.error(err);
alert("Resume payment failed");

}

};

return(

<div className="min-h-screen px-6 py-16 bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-black dark:via-zinc-900 dark:to-black">

{/* PAGE TITLE */}

<div className="text-center mb-12">

<h1 className="text-3xl md:text-4xl font-bold mb-2">
Track Your Orders
</h1>

<p className="text-gray-500">
Enter your mobile number to view your billing orders
</p>

</div>

{/* SEARCH BOX */}

<div className="max-w-md mx-auto mb-12 bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg border">

<div className="flex gap-3">

<input
className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
placeholder="Enter Mobile Number"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
/>

<button
onClick={search}
className="bg-blue-600 text-white px-4 rounded-lg flex items-center gap-2"
>

<Search size={18}/>
{loading ? "Searching" : "Search"}

</button>

</div>

</div>

{/* ORDERS LIST */}

<div className="max-w-3xl mx-auto space-y-5">

{orders.length === 0 && !loading && (

<div className="text-center bg-white dark:bg-zinc-900 p-10 rounded-xl shadow border">

<Clock className="mx-auto mb-3 text-gray-400"/>

<p className="text-gray-500">
No orders found for this number
</p>

</div>

)}

{orders.map(order=>(

<div
key={order._id}
className="bg-white dark:bg-zinc-900 border rounded-xl p-5 shadow hover:shadow-xl transition-all"
>

{/* HEADER */}

<div className="flex justify-between items-center mb-3">

<div>

<p className="font-semibold text-lg">
{order.invoiceNumber || order.merchantOrderId}
</p>

<p className="text-xs text-gray-500">
Order ID
</p>

</div>

<span
className={`text-xs font-semibold px-3 py-1 rounded-full ${
order.paymentStatus === "SUCCESS"
? "bg-green-100 text-green-700"
: order.paymentStatus === "FAILED"
? "bg-red-100 text-red-700"
: "bg-orange-100 text-orange-700"
}`}
>

{order.paymentStatus}

</span>

</div>

{/* DETAILS */}

<div className="text-sm text-gray-600 mb-4">

<p>Amount: <span className="font-semibold">₹{order.amount}</span></p>

{order.createdAt && (
<p>
Date: {new Date(order.createdAt).toLocaleDateString()}
</p>
)}

</div>

{/* ACTION BUTTONS */}

<div className="flex gap-3">

{/* SUCCESS */}

{order.paymentStatus === "SUCCESS" && (

<a
href={`/api/invoice/${order.merchantOrderId}`}
className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
>

<FileText size={16}/>
Download Invoice

</a>

)}

{/* FAILED */}

{order.paymentStatus === "FAILED" && (

<button
onClick={()=>resumePayment(order.merchantOrderId)}
className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
>

<RotateCcw size={16}/>
Retry Payment

</button>

)}

{/* PENDING */}

{order.paymentStatus === "PENDING" && (

<button
onClick={()=>resumePayment(order.merchantOrderId)}
className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm"
>

<RotateCcw size={16}/>
Resume Payment

</button>

)}

</div>

</div>

))}

</div>

</div>

);
}