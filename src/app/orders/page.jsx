//src/app/orders/page.jsx
"use client";

import { useState } from "react";

export default function Orders(){

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

/* RESUME / RETRY PAYMENT */

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

<div className="min-h-screen px-6 py-16">

{/* SEARCH */}

<div className="max-w-md mx-auto mb-10">

<input
className="border p-3 w-full mb-3 rounded-lg"
placeholder="Enter Mobile Number"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
/>

<button
onClick={search}
className="bg-blue-600 text-white p-3 w-full rounded-lg"
>

{loading ? "Searching..." : "Search Orders"}

</button>

</div>

{/* ORDERS LIST */}

<div className="max-w-2xl mx-auto space-y-4">

{orders.length === 0 && !loading && (

<div className="text-center text-gray-500">
No orders found
</div>

)}

{orders.map(order=>(

<div
key={order._id}
className="border p-4 rounded-lg shadow-sm"
>

{/* HEADER */}

<div className="flex justify-between mb-2">

<span className="font-semibold">

{order.invoiceNumber || order.merchantOrderId}

</span>

<span
className={`text-sm font-semibold ${
order.paymentStatus === "SUCCESS"
? "text-green-600"
: order.paymentStatus === "FAILED"
? "text-red-600"
: "text-orange-600"
}`}
>

{order.paymentStatus}

</span>

</div>

<div className="text-sm mb-3">

Amount: ₹{order.amount}

</div>

{/* SUCCESS */}

{order.paymentStatus === "SUCCESS" && (

<a
href={`/api/invoice/${order.merchantOrderId}`}
className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
>

Download Invoice

</a>

)}

{/* FAILED */}

{order.paymentStatus === "FAILED" && (

<button
onClick={()=>resumePayment(order.merchantOrderId)}
className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
>

Retry Payment

</button>

)}

{/* PENDING */}

{order.paymentStatus === "PENDING" && (

<button
onClick={()=>resumePayment(order.merchantOrderId)}
className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm"
>

Resume Payment

</button>

)}

</div>

))}

</div>

</div>

);
}