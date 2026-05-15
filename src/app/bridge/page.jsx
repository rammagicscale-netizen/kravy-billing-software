"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Loader2, Crown } from "lucide-react";

function BridgeContent() {
  const searchParams = useSearchParams();
  const clerkId = searchParams.get("clerkId");
  const amount = searchParams.get("amount") || "3999";
  
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    house: "Billing Portal",
    addressLine: "Bridge Activation",
    district: "Online",
    state: "Digital",
    country: "India",
    pincode: "000000"
  });

  const handlePayment = async () => {
    if (!clerkId) {
      alert("Missing Clerk ID. Please return to billing portal.");
      return;
    }
    if (!customer.name || !customer.phone) {
      alert("Please enter your name and phone number.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/phonepe", {
        amount: parseFloat(amount),
        customer,
        items: [{ id: "premium", name: "Premium Subscription", price: parseFloat(amount), quantity: 1 }],
        clerkUserId: clerkId
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Bridge Payment Error:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-zinc-900 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden"
      >
        <div className="p-1 h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 flex items-center justify-center">
            <div className="w-16 h-16 bg-black/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
                <Crown size={32} className="text-white" />
            </div>
        </div>

        <div className="p-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-black tracking-tight mb-2">Activate Premium Access</h1>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Bridging for billing.kravy.in</p>
            </div>

            <div className="space-y-4 mb-8">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Business Name</label>
                    <input 
                        type="text" 
                        placeholder="Your Business Name"
                        value={customer.name}
                        onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-black/50 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-indigo-500 transition-all"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Contact Phone</label>
                    <input 
                        type="tel" 
                        placeholder="Mobile Number"
                        value={customer.phone}
                        onChange={(e) => setCustomer(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-black/50 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-indigo-500 transition-all"
                    />
                </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 mb-8 border border-white/5">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-400">Total Payable</span>
                    <span className="text-2xl font-black text-indigo-400">₹{parseFloat(amount).toLocaleString()}</span>
                </div>
            </div>

            <button 
                onClick={handlePayment}
                disabled={loading}
                className="w-full py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm uppercase tracking-[3px] transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 disabled:opacity-50"
            >
                {loading ? <><Loader2 className="animate-spin" /> Processing...</> : "Pay with PhonePe"}
            </button>

            <div className="mt-8 flex items-center justify-center gap-4 opacity-20">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Secure Activation Bridge</span>
            </div>
        </div>
      </motion.div>

      <p className="mt-8 text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
        Property of Kravy.in &copy; 2026
      </p>
    </div>
  );
}

export default function BridgePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090b] flex items-center justify-center"><Loader2 className="animate-spin text-indigo-500" /></div>}>
      <BridgeContent />
    </Suspense>
  );
}
