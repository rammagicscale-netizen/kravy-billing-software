"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import { 
    Zap, 
    ShieldCheck, 
    Loader2, 
    Crown,
    Phone,
    Printer,
    CreditCard,
    ArrowRight,
    Mail,
    MapPin,
    User,
    Package,
    Building2
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

  // Pin Code Auto-fetch logic
  useEffect(() => {
    if (customer.pincode.length === 6) {
        fetch(`https://api.postalpincode.in/pincode/${customer.pincode}`)
            .then(res => res.json())
            .then(data => {
                if (data[0].Status === "Success") {
                    const postOffice = data[0].PostOffice[0];
                    setCustomer(prev => ({
                        ...prev,
                        district: postOffice.District,
                        state: postOffice.State,
                        // Pre-fill address line with city if empty
                        addressLine: prev.addressLine || `${postOffice.Name}, ${postOffice.District}`
                    }));
                }
            })
            .catch(err => console.error("Pincode API Error:", err));
    }
  }, [customer.pincode]);

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
      alert("Please fill in Name, Phone, and Complete Address.");
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
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-500/10 overflow-hidden">
      {/* Tight Wrapper */}
      <div className="max-w-7xl mx-auto h-screen flex flex-col p-4 md:p-6 lg:p-8">
        
        {/* Header - Compact */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <Crown size={20} className="text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-black tracking-tight leading-none mb-1">Premium Bridge</h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Finalize Activation</p>
                </div>
            </div>
            
            {/* Selected Plan Banner - Compact */}
            <div className="bg-white rounded-2xl px-6 py-3 flex items-center gap-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                        <Zap size={16} fill="currentColor" />
                    </div>
                    <span className="text-sm font-black text-slate-700">{activePlan.name}</span>
                </div>
                <div className="w-px h-6 bg-slate-200" />
                <span className="text-lg font-black text-indigo-600">₹{activePlan.price.toLocaleString()}</span>
            </div>
        </div>

        {/* Content Area - Scrollable but tight */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
            
            {/* Left: Form - Light Mode */}
            <div className="lg:col-span-8 overflow-y-auto pr-2 custom-scrollbar space-y-6">
                <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 border border-indigo-100">
                            <Building2 size={16} />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Business Details</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Business Name *</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                                <input 
                                    type="text" 
                                    placeholder="Trading Name"
                                    value={customer.name}
                                    onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 text-sm font-bold outline-none focus:border-indigo-500 transition-all placeholder:text-slate-300"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number *</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                                <input 
                                    type="tel" 
                                    placeholder="10-digit mobile"
                                    value={customer.phone}
                                    onChange={(e) => setCustomer(prev => ({ ...prev, phone: e.target.value }))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 text-sm font-bold outline-none focus:border-indigo-500 transition-all placeholder:text-slate-300"
                                />
                            </div>
                        </div>
                        <div className="space-y-1 md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                                <input 
                                    type="email" 
                                    placeholder="For invoice delivery"
                                    value={customer.email}
                                    onChange={(e) => setCustomer(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 text-sm font-bold outline-none focus:border-indigo-500 transition-all placeholder:text-slate-300"
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Pincode *</label>
                            <input 
                                type="text" 
                                placeholder="6-digit PIN"
                                maxLength={6}
                                value={customer.pincode}
                                onChange={(e) => setCustomer(prev => ({ ...prev, pincode: e.target.value }))}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold outline-none focus:border-indigo-500 transition-all placeholder:text-slate-300"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">State / District</label>
                            <input 
                                type="text" 
                                placeholder="Auto-fetched"
                                value={customer.state && customer.district ? `${customer.district}, ${customer.state}` : ""}
                                readOnly
                                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold text-slate-500 outline-none"
                            />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Complete Address *</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                                <input 
                                    type="text" 
                                    placeholder="Shop No, Area, Landmark"
                                    value={customer.addressLine}
                                    onChange={(e) => setCustomer(prev => ({ ...prev, addressLine: e.target.value }))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 text-sm font-bold outline-none focus:border-indigo-500 transition-all placeholder:text-slate-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Addons Selection - Light Mode */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3 ml-2">
                        <div className="w-6 h-6 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 border border-amber-100">
                            <Package size={12} />
                        </div>
                        <h3 className="text-[10px] font-black uppercase tracking-[3px] text-slate-400">Hardware Add-ons</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addons.map((addon) => (
                            <button
                                key={addon.id}
                                onClick={() => toggleAddon(addon.id)}
                                className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${selectedAddons.includes(addon.id) ? 'bg-indigo-50 border-indigo-500 shadow-sm' : 'bg-white border-slate-200 hover:border-indigo-200'}`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${selectedAddons.includes(addon.id) ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                    {addon.icon}
                                </div>
                                <div className="text-left flex-1">
                                    <h4 className="text-xs font-black">{addon.name}</h4>
                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{addon.subtitle}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-black">₹{addon.price.toLocaleString()}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right: Summary - Sticky & Tight */}
            <div className="lg:col-span-4 h-full flex flex-col">
                <div className="bg-slate-900 rounded-[2.5rem] p-6 md:p-8 text-white flex flex-col shadow-2xl shadow-slate-900/20 border border-white/5">
                    <h3 className="text-lg font-black mb-6 tracking-tight">Order Summary</h3>
                    
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[8px] font-black uppercase tracking-widest opacity-40">Main Plan</p>
                                <p className="font-black text-xs">{activePlan.name}</p>
                            </div>
                            <p className="font-black text-sm">₹{activePlan.price.toLocaleString()}</p>
                        </div>

                        {selectedAddons.length > 0 && (
                            <div className="pt-4 border-t border-white/5 space-y-2">
                                {selectedAddons.map(id => {
                                    const a = addons.find(x => x.id === id);
                                    return (
                                        <div key={id} className="flex justify-between items-center text-[11px] font-bold">
                                            <span className="opacity-60">{a.name}</span>
                                            <span>₹{a.price.toLocaleString()}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="pt-6 border-t border-white/10 mb-8">
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Total Amount</span>
                            <span className="text-3xl font-black">₹{totalAmount.toLocaleString()}</span>
                        </div>
                    </div>

                    <button 
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-[3px] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-indigo-600/20"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <><ShieldCheck size={16} /> Pay Securely</>}
                    </button>

                    <div className="mt-6 flex items-center justify-center gap-3 opacity-30">
                        <ShieldCheck size={12} />
                        <span className="text-[8px] font-black uppercase tracking-widest">PhonePe Protected</span>
                    </div>
                </div>

                <div className="mt-4 p-4 bg-white rounded-2xl border border-slate-200 text-center">
                    <p className="text-[8px] font-black uppercase tracking-[3px] text-slate-400 mb-1">Activation Help</p>
                    <a href="tel:+919289507882" className="text-xs font-black text-indigo-600 hover:text-indigo-700 transition-colors">+91 9289507882</a>
                </div>
            </div>
        </div>

      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}

export default function BridgePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><Loader2 className="animate-spin text-indigo-500" /></div>}>
      <BridgeContent />
    </Suspense>
  );
}
