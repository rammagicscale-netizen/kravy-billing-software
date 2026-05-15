"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Zap, 
    Check, 
    ChevronRight, 
    Sparkles, 
    ShieldCheck, 
    Loader2, 
    Crown,
    CheckCircle2,
    Phone,
    Plus,
    Printer,
    CreditCard,
    ArrowRight,
    ArrowLeft,
    Mail,
    MapPin,
    User
} from "lucide-react";

const plans = [
    {
      key: "year1",
      name: "1 Year Plan",
      price: 3999,
      originalPrice: 7000,
      description: "Perfect for restaurants and small businesses.",
      features: [
        "Unlimited invoices",
        "Analytics dashboard",
        "Inventory management",
        "Tax / GST management",
        "Invoice with logo & QR",
        "Chat & Email support",
      ],
    },
    {
      key: "year2",
      name: "2 Year Plan",
      price: 5999,
      originalPrice: 14000,
      description: "Best choice for growing businesses.",
      features: [
        "Everything in 1 Year plan",
        "Advanced Kitchen workflow",
        "Coupons & Loyalty system",
        "Table QR ordering system",
        "Inventory alerts",
        "Priority support",
      ],
      popular: true
    },
    {
      key: "year3",
      name: "3 Year Plan",
      price: 7499,
      originalPrice: 21000,
      description: "Maximum savings for long-term businesses.",
      features: [
        "Everything in 2 Year plan",
        "Kitchen automation",
        "Smart inventory tracking",
        "Advanced tax reports",
        "Lifetime priority support",
        "VIP Onboarding",
      ],
      highlight: true,
    },
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
  const initialAmount = searchParams.get("amount");
  const initialPlan = searchParams.get("plan");
  
  const [step, setStep] = useState(1); // 1: Plan/Addon, 2: Details, 3: Payment
  const [loading, setLoading] = useState(false);
  
  const [selectedPlan, setSelectedPlan] = useState(initialPlan || "year1");
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

  const activePlan = plans.find(p => p.key === selectedPlan) || plans[0];
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

  const handleNext = () => {
    if (step === 1) setStep(2);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
  };

  const handlePayment = async () => {
    if (!initialClerkId || initialClerkId === 'guest') {
      alert("Identifier missing. Please login to the billing portal first.");
      return;
    }
    
    if (!customer.name || !customer.phone || !customer.addressLine) {
      alert("Please fill in all required fields.");
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
    <div className="min-h-screen bg-[#09090b] text-white font-sans selection:bg-indigo-500/10 py-12 px-4">
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
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Complete Your Upgrade</h1>
            <p className="text-zinc-500 text-sm font-medium">Activate your premium features on billing.kravy.in</p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-12 flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-800 -z-10" />
            {[1, 2].map((s) => (
                <div key={s} className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black transition-all ${step >= s ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-zinc-900 text-zinc-600 border border-zinc-800'}`}>
                    {s}
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Main Content Area */}
            <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <motion.div 
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-8"
                        >
                            {/* Plans Selection */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {plans.map((plan) => (
                                    <button
                                        key={plan.key}
                                        onClick={() => setSelectedPlan(plan.key)}
                                        className={`relative p-6 rounded-[2.5rem] border text-left transition-all ${selectedPlan === plan.key ? 'bg-indigo-600/10 border-indigo-500 shadow-xl shadow-indigo-500/10' : 'bg-zinc-900/50 border-white/5 hover:border-white/10'}`}
                                    >
                                        {selectedPlan === plan.key && (
                                            <div className="absolute top-4 right-4 text-indigo-500">
                                                <CheckCircle2 size={20} />
                                            </div>
                                        )}
                                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1">{plan.name}</p>
                                        <div className="text-2xl font-black mb-4">₹{plan.price.toLocaleString()}</div>
                                        <ul className="space-y-2 opacity-60">
                                            {plan.features.slice(0, 4).map((f, i) => (
                                                <li key={i} className="text-[10px] font-bold flex items-center gap-2">
                                                    <div className="w-1 h-1 rounded-full bg-indigo-500" /> {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </button>
                                ))}
                            </div>

                            {/* Addons Selection */}
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-[3px] text-zinc-500 mb-6 ml-2">Hardware Add-ons</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {addons.map((addon) => (
                                        <button
                                            key={addon.id}
                                            onClick={() => toggleAddon(addon.id)}
                                            className={`p-6 rounded-[2rem] border flex items-center gap-6 transition-all ${selectedAddons.includes(addon.id) ? 'bg-zinc-900 border-indigo-500 shadow-lg shadow-indigo-500/5' : 'bg-zinc-900/50 border-white/5'}`}
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
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-zinc-900/50 rounded-[3rem] p-8 md:p-12 border border-white/5"
                        >
                            <h2 className="text-2xl font-black mb-8">Business Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Business Name *</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                                        <input 
                                            type="text" 
                                            placeholder="Trading Name"
                                            value={customer.name}
                                            onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl px-12 py-4 text-sm font-bold outline-none focus:border-indigo-500 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Phone Number *</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                                        <input 
                                            type="tel" 
                                            placeholder="10-digit mobile"
                                            value={customer.phone}
                                            onChange={(e) => setCustomer(prev => ({ ...prev, phone: e.target.value }))}
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl px-12 py-4 text-sm font-bold outline-none focus:border-indigo-500 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                                        <input 
                                            type="email" 
                                            placeholder="For invoice delivery"
                                            value={customer.email}
                                            onChange={(e) => setCustomer(prev => ({ ...prev, email: e.target.value }))}
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl px-12 py-4 text-sm font-bold outline-none focus:border-indigo-500 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Complete Address *</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                                        <input 
                                            type="text" 
                                            placeholder="Shop No, Area, City"
                                            value={customer.addressLine}
                                            onChange={(e) => setCustomer(prev => ({ ...prev, addressLine: e.target.value }))}
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl px-12 py-4 text-sm font-bold outline-none focus:border-indigo-500 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Pincode</label>
                                    <input 
                                        type="text" 
                                        placeholder="6-digit PIN"
                                        value={customer.pincode}
                                        onChange={(e) => setCustomer(prev => ({ ...prev, pincode: e.target.value }))}
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-indigo-500 transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">State</label>
                                    <input 
                                        type="text" 
                                        placeholder="Business State"
                                        value={customer.state}
                                        onChange={(e) => setCustomer(prev => ({ ...prev, state: e.target.value }))}
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-indigo-500 transition-all"
                                    />
                                </div>
                            </div>

                            <button 
                                onClick={handleBack}
                                className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
                            >
                                <ArrowLeft size={16} /> Edit Plan
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Sticky Order Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-8">
                <div className="bg-indigo-600 rounded-[2.5rem] p-8 shadow-2xl shadow-indigo-600/20">
                    <h3 className="text-xl font-black mb-6">Order Summary</h3>
                    
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest opacity-70">Main Plan</p>
                                <p className="font-black">{activePlan.name}</p>
                            </div>
                            <p className="font-black">₹{activePlan.price.toLocaleString()}</p>
                        </div>

                        {selectedAddons.length > 0 && (
                            <div className="pt-4 border-t border-white/10 space-y-3">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Add-ons</p>
                                {selectedAddons.map(id => {
                                    const a = addons.find(x => x.id === id);
                                    return (
                                        <div key={id} className="flex justify-between items-center text-sm font-bold">
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
                            <span className="text-xs font-black uppercase tracking-widest opacity-70">Total Amount</span>
                            <span className="text-3xl font-black">₹{totalAmount.toLocaleString()}</span>
                        </div>
                    </div>

                    {step === 1 ? (
                        <button 
                            onClick={handleNext}
                            className="w-full py-5 rounded-2xl bg-white text-indigo-600 font-black text-xs uppercase tracking-[2px] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-xl shadow-black/10"
                        >
                            Next: Business Details <ArrowRight size={16} />
                        </button>
                    ) : (
                        <button 
                            onClick={handlePayment}
                            disabled={loading}
                            className="w-full py-5 rounded-2xl bg-black text-white font-black text-xs uppercase tracking-[3px] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-xl shadow-black/20 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <><ShieldCheck size={18} /> Pay with PhonePe</>}
                        </button>
                    )}

                    <div className="mt-8 flex items-center justify-center gap-3 opacity-50">
                        <ShieldCheck size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Safe & Encrypted</span>
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
