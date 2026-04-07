//src/app/checkout/page.jsx
"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

function CheckoutContent() {
  const { cartItems, addToCart, removeFromCart, totalAmount, clearCart } = useCart();
  const searchParams = useSearchParams();
  const retryOrderId = searchParams.get("retry");
  
  const [showPrinterModal, setShowPrinterModal] = useState(false);
  const printerPrice = 1999;
  const printerAdded = cartItems.some((item) => item.id === "printer");
  
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    gst: "",
    house: "",
    addressLine: "",
    district: "",
    state: "",
    country: "India",
    pincode: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (retryOrderId) {
      const fetchFailedOrder = async () => {
        try {
          const res = await fetch(`/api/phonepe/status/${retryOrderId}`);
          const data = await res.json();
          if (data.order && data.order.customer) {
            setCustomer({
                ...data.order.customer,
                country: data.order.customer.country || "India"
            });
          }
        } catch (err) {
          console.error("Failed to fetch retry order:", err);
        }
      };
      fetchFailedOrder();
    }
  }, [retryOrderId]);

  const addPrinter = () => {
    if (printerAdded) return;
    addToCart({
      id: "printer",
      name: "Thermal Printer (58mm)",
      price: printerPrice,
      quantity: 1,
    });
  };

  const removePrinter = () => {
    removeFromCart("printer");
  };

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const handleCustomerChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async () => {
    if (!cartItems.length) return;

    // VALIDATION
    const requiredFields = ["name", "phone", "house", "addressLine", "district", "state", "pincode"];
    const missing = requiredFields.filter(f => !customer[f]?.trim());
    
    if (missing.length > 0) {
      alert(`Please fill in all required fields: ${missing.join(", ")}`);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/phonepe", {
        amount: totalAmount,
        customer,
        items: cartItems
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment initiation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Checkout</h1>
      
      {/* Customer Details Form */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 mb-8 shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-neutral-900 dark:text-white flex items-center gap-2">
          <span className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
          Customer Details
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-500 ml-1">Full Name *</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              required
              value={customer.name}
              onChange={handleCustomerChange}
              className="w-full px-4 py-3 border rounded-xl text-sm bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-500 ml-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              placeholder="10-digit mobile"
              required
              value={customer.phone}
              onChange={async (e) => {
                const phone = e.target.value.replace(/\D/g, "").slice(0,10);
                setCustomer(prev => ({ ...prev, phone }));
                if (phone.length === 10) {
                  try {
                    const res = await fetch(`/api/customer-by-phone?phone=${phone}`);
                    const data = await res.json();
                    if (data && !data.error) {
                      setCustomer(prev => ({ ...prev, ...data, phone }));
                    }
                  } catch (err) { console.log(err); }
                }
              }}
              className="w-full px-4 py-3 border rounded-xl text-sm bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-500 ml-1">Email (Optional)</label>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              value={customer.email}
              onChange={handleCustomerChange}
              className="w-full px-4 py-3 border rounded-xl text-sm bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
            />
          </div>

          {/* GST */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-500 ml-1">GSTIN (Optional)</label>
            <input
              type="text"
              name="gst"
              placeholder="Add GST for tax credit"
              value={customer.gst}
              onChange={(e) => setCustomer(prev => ({ ...prev, gst: e.target.value.toUpperCase() }))}
              className="w-full px-4 py-3 border rounded-xl text-sm bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
            />
          </div>

          {/* Flat / Shop */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-500 ml-1">Flat / Shop No *</label>
            <input
              type="text"
              name="house"
              placeholder="e.g. Shop 42, 1st Floor"
              required
              value={customer.house}
              onChange={handleCustomerChange}
              className="w-full px-4 py-3 border rounded-xl text-sm bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
            />
          </div>

          {/* Address Line */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-500 ml-1">Address Area *</label>
            <input
              type="text"
              name="addressLine"
              placeholder="Street or Area name"
              required
              value={customer.addressLine}
              onChange={handleCustomerChange}
              className="w-full px-4 py-3 border rounded-xl text-sm bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
            />
          </div>

          {/* District / City */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-500 ml-1">City / District *</label>
            <input
              type="text"
              name="district"
              placeholder="e.g. New Delhi"
              required
              value={customer.district}
              onChange={handleCustomerChange}
              className="w-full px-4 py-3 border rounded-xl text-sm bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
            />
          </div>

          {/* State */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-500 ml-1">State *</label>
            <input
              type="text"
              name="state"
              placeholder="e.g. Delhi"
              required
              value={customer.state}
              onChange={handleCustomerChange}
              className="w-full px-4 py-3 border rounded-xl text-sm bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
            />
          </div>

          {/* Pincode */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-500 ml-1">Pincode *</label>
            <input
              type="text"
              name="pincode"
              placeholder="6-digit ZIP"
              required
              value={customer.pincode}
              onChange={handleCustomerChange}
              className="w-full px-4 py-3 border rounded-xl text-sm bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
            />
          </div>

          {/* Country */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-500 ml-1">Country</label>
            <input
              type="text"
              name="country"
              value={customer.country}
              disabled
              className="w-full px-4 py-3 border rounded-xl text-sm bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-400 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-neutral-900 dark:text-white flex items-center gap-2">
          <span className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
          Order Summary
        </h2>

        {cartItems.length === 0 ? (
          <div className="py-8 text-center bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-700">
            <p className="text-neutral-500 mb-4">Your cart is currently empty.</p>
            <Link href="/" className="px-6 py-2 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all">Start Shopping</Link>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-8">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-neutral-100 dark:border-neutral-800 transition-all">
                  <div>
                    <p className="font-bold text-neutral-900 dark:text-white">{item.name}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{formatCurrency(item.price)} × {item.quantity}</p>
                  </div>
                  <p className="font-bold text-neutral-900 dark:text-white">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between py-6 border-t border-neutral-100 dark:border-neutral-800 mb-8 px-2">
              <span className="font-bold text-neutral-500">Grand Total Payable</span>
              <span className="text-2xl font-black text-neutral-900 dark:text-white">{formatCurrency(totalAmount)}</span>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 ${
                loading ? "bg-neutral-300 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-[1.01] active:scale-95 shadow-emerald-500/20"
              }`}
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Finalizing...</>
              ) : (
                "PAY NOW WITH PHONEPE"
              )}
            </button>
            
            <p className="text-center text-[10px] text-neutral-400 mt-4 leading-relaxed">
              By proceeding, you agree to our terms and conditions. <br/>
              Payments are 100% secure and encrypted.
            </p>
          </>
        )}
      </div>

      {/* Printer Add-on (Optional UI) */}
      {!printerAdded && cartItems.length > 0 && (
        <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-3xl flex items-center justify-between gap-6 overflow-hidden relative">
            <div className="relative z-10">
                <h3 className="font-bold text-amber-900 dark:text-amber-200">Need a receipt printer?</h3>
                <p className="text-sm text-amber-800/70 dark:text-amber-400/70 mt-1">Add our 58mm thermal printer for just {formatCurrency(printerPrice)}</p>
                <button 
                    onClick={addPrinter}
                    className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 transition-all"
                >
                    Add to Cart
                </button>
            </div>
            <img src="/assets/printer.png" className="w-24 h-24 object-contain opacity-20 absolute -right-4 -bottom-4 rotate-12" alt=""/>
        </div>
      )}
    </section>
  );
}

const Loader2 = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="w-10 h-10 animate-spin text-emerald-500" /></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
