"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import { 
    Zap, 
    Check, 
    ShieldCheck, 
    Loader2, 
    Crown,
    CheckCircle2,
    Phone,
    Printer,
    CreditCard,
    ArrowRight,
    Mail,
    MapPin,
    User,
    Package
} from "lucide-react";

const plans = [
    { key: "year1", name: "1 Year Plan", price: 3999 },
    { key: "year2", name: "2 Year Plan", price: 5999 },
    { key: "year3", name: "3 Year Plan", price: 7499 },
];

const addons = [
    {
        id: "printer",
        name: "Thermal Printer",
        subtitle: "58mm Bluetooth + USB",
        price: 1999,
        originalPrice: 2999,
        icon: <Printer className="w-5 h-5" />,
    },
    {
        id: "gateway",
        name: "Payment Gateway",
        subtitle: "One-time Activation",
        price: 1499,
        originalPrice: 2500,
        icon: <CreditCard className="w-5 h-5" />,
    }
];

function BridgeContent() {
  const searchParams = useSearchParams();
  const initialClerkId = searchParams.get("clerkId");
  const initialPlan = searchParams.get("plan") || "year1";
  const initialAmount = searchParams.get("amount") || "3999";
  
  const [loading, setLoading] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    house: "",
    addressLine: "",
    district: "",
    state: "",
    pincode: ""
  });

  const activePlan = plans.find(p => p.key === initialPlan) || { key: initialPlan, name: "Selected Plan", price: parseFloat(initialAmount) };
  
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = addons.find(a => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);
  
  const totalAmount = activePlan.price + addonsTotal;

  const toggleAddon = (id) => {
    setSelectedAddons(prev => 
        prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handlePayment = async () => {
    if (!initialClerkId || initialClerkId === 'guest') {
      alert("Identifier missing. Please login to the billing portal first.");
      return;
    }
    
    if (!customer.name || !customer.phone || !customer.addressLine) {
      alert("Please fill in all required fields (Name, Phone, Address).");
      return;
    }

    setLoading(true);
    try {
      const items = [
        { id: activePlan.key, name: activePlan.name, price: activePlan.price, quantity: 1 },
        ...selectedAddons.map(id => {
            const a = addons.find(x => x.id === id);
            return { id: a.id, name: a.name, price: a.price, quantity: 1 };
        })
      ];

      const response = await axios.post("/api/phonepe", {
        amount: totalAmount,
        customer,
        items,
        clerkUserId: initialClerkId
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans py-12 px-4 selection:bg-indigo-500/10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20 mb-6"
            >
                <Crown size={14} className="text-indigo-500" />
                <span className="text-[10px] font-black uppercase tracking-[2px] text-indigo-400">Subscription Bridge</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Finalize Activation</h1>
            <p className="text-zinc-500 text-sm font-medium">Please fill your details to complete the premium upgrade.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form & Addons */}
            <div className="lg:col-span-8 space-y-8">
                
                {/* Selected Plan Banner */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-600/10 border border-white/10">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center border border-white/20">
                            <Zap size={32} className="text-white" fill="currentColor" />
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-black tracking-tight">{activePlan.name}</h2>
                            <p className="text-indigo-100 text-[10px] font-black uppercase tracking-widest">SaaS Premium Subscription</p>
                        </div>
                    </div>
                    <div className="text-3xl font-black">₹{activePlan.price.toLocaleString()}</div>
                </div>

                {/* Details Form */}
                <div className="bg-zinc-900/50 rounded-[3rem] p-8 md:p-12 border border-white/5">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500 border border-indigo-500/20">
                            <User size={20} />
                        </div>
                        <h3 className="text-xl font-black">Business Details</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Business Name *</label>
                            <input 
                                type="text" 
                                placeholder="Trading Name"
                                value={customer.name}
                                onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-indigo-500 transition-all"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Phone Number *</label>
                            <input 
                                type="tel" 
                                placeholder="10-digit mobile"
                                value={customer.phone}
                                onChange={(e) => setCustomer(prev => ({ ...prev, phone: e.target.value }))}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-indigo-500 transition-all"
                            />
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
                            <input 
                                type="email" 
                                placeholder="For invoice delivery"
                                value={customer.email}
                                onChange={(e) => setCustomer(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-indigo-500 transition-all"
                            />
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Complete Address *</label>
                            <input 
                                type="text" 
                                placeholder="Shop No, Area, City"
                                value={customer.addressLine}
                                onChange={(e) => setCustomer(prev => ({ ...prev, addressLine: e.target.value }))}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-indigo-500 transition-all"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Pincode</label>
                            <input 
                                type="text" 
                                placeholder="6-digit PIN"
                                value={customer.pincode}
                                onChange={(e) => setCustomer(prev => ({ ...prev, pincode: e.target.value }))}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-indigo-500 transition-all"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">State</label>
                            <input 
                                type="text" 
                                placeholder="Business State"
                                value={customer.state}
                                onChange={(e) => setCustomer(prev => ({ ...prev, state: e.target.value }))}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-indigo-500 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Addons Selection */}
                <div>
                    <div className="flex items-center gap-4 mb-6 ml-2">
                        <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500 border border-amber-500/20">
                            <Package size={16} />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-[3px] text-zinc-500">Hardware Add-ons</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addons.map((addon) => (
                            <button
                                key={addon.id}
                                onClick={() => toggleAddon(addon.id)}
                                className={`p-6 rounded-[2rem] border flex items-center gap-6 transition-all ${selectedAddons.includes(addon.id) ? 'bg-zinc-900 border-indigo-500 shadow-lg shadow-indigo-500/5' : 'bg-zinc-900/50 border-white/5 hover:border-white/10'}`}
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${selectedAddons.includes(addon.id) ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
                                    {addon.icon}
                                </div>
                                <div className="text-left flex-1">
                                    <h4 className="text-sm font-black">{addon.name}</h4>
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{addon.subtitle}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-black">₹{addon.price.toLocaleString()}</div>
                                    <div className="text-[10px] font-bold line-through text-zinc-700">₹{addon.originalPrice.toLocaleString()}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Sticky Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-8">
                <div className="bg-indigo-600 rounded-[2.5rem] p-8 shadow-2xl shadow-indigo-600/20 border border-white/10">
                    <h3 className="text-xl font-black mb-6 tracking-tight">Order Summary</h3>
                    
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Selected Plan</p>
                                <p className="font-black text-sm">{activePlan.name}</p>
                            </div>
                            <p className="font-black">₹{activePlan.price.toLocaleString()}</p>
                        </div>

                        {selectedAddons.length > 0 && (
                            <div className="pt-4 border-t border-white/10 space-y-3">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Add-ons</p>
                                {selectedAddons.map(id => {
                                    const a = addons.find(x => x.id === id);
                                    return (
                                        <div key={id} className="flex justify-between items-center text-xs font-bold">
                                            <span>{a.name}</span>
                                            <span>₹{a.price.toLocaleString()}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="pt-6 border-t border-white/20 mb-8">
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Total Payable</span>
                            <span className="text-3xl font-black">₹{totalAmount.toLocaleString()}</span>
                        </div>
                    </div>

                    <button 
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full py-5 rounded-2xl bg-black text-white font-black text-xs uppercase tracking-[3px] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-xl shadow-black/20 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <><ShieldCheck size={18} /> Pay with PhonePe</>}
                    </button>

                    <div className="mt-8 flex items-center justify-center gap-3 opacity-50">
                        <ShieldCheck size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest tracking-[1px]">Secure Transaction</span>
                    </div>
                </div>

                <div className="mt-6 p-6 bg-zinc-900/50 rounded-3xl border border-white/5 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[3px] text-zinc-500 mb-2">Activation Support</p>
                    <a href="tel:+919289507882" className="text-sm font-black text-indigo-400 hover:text-indigo-300 transition-colors">+91 9289507882</a>
                </div>
            </div>

        </div>

      </div>
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
