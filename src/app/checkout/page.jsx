//src/app/checkout/page.jsx
"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Zap, ShieldCheck, Printer } from "lucide-react";

function CheckoutContent() {
  const { cartItems, addToCart, removeFromCart, totalAmount, clearCart, increaseQty, decreaseQty } = useCart();
  const searchParams = useSearchParams();
  const retryOrderId = searchParams.get("retry");
  
  const [showPrinterModal, setShowPrinterModal] = useState(false);
  const printerPrice = 1999;
  const printerItem = cartItems.find((item) => item.id === "printer");
  const printerAdded = !!printerItem;
  const printerQty = printerItem?.quantity || 0;
  
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
                        addressLine: prev.addressLine || postOffice.Name
                    }));
                }
            })
            .catch(err => console.error("Pincode API Error:", err));
    }
  }, [customer.pincode]);

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
      const clerkUserId = searchParams.get("clerkId");
      
      const response = await axios.post("/api/phonepe", {
        amount: totalAmount,
        customer,
        items: cartItems,
        clerkUserId // Pass the clerkId if it exists
      });

      if (response.data.url) {
        // Clear cart before redirecting to payment gateway
        clearCart();
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

      {/* Printer Add-on (Optional UI) - Always visible if cart is not empty */}
      {cartItems.length > 0 && (
        <div className="mb-8 p-6 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-3xl flex items-center justify-between gap-6 overflow-hidden relative transition-all">
            <div className="relative z-10 w-full">
                <h3 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
                  🧾 Need a receipt printer?
                  {printerAdded && <span className="text-[10px] bg-amber-200 dark:bg-amber-800 px-2 py-0.5 rounded text-amber-900 dark:text-amber-100 font-black">ADDED TO CART</span>}
                </h3>
                <p className="text-sm text-amber-800/70 dark:text-amber-400/70 mt-1 max-w-xs">Add our 58mm thermal printer for just {formatCurrency(printerPrice)} and print instant bills.</p>
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  {!printerAdded ? (
                    <button 
                        onClick={addPrinter}
                        className="px-8 py-2.5 bg-amber-600 text-white rounded-xl text-xs font-black hover:bg-amber-700 transition-all shadow-lg active:scale-95"
                    >
                        ADD TO CART
                    </button>
                  ) : (
                    <div className="flex items-center gap-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-white dark:bg-neutral-800 rounded-xl border border-amber-200 dark:border-amber-700 p-1 shadow-sm">
                          <button 
                            onClick={() => decreaseQty("printer")}
                            className="w-8 h-8 flex items-center justify-center text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors font-black text-lg"
                          >
                            −
                          </button>
                          <span className="w-10 text-center font-black text-amber-900 dark:text-amber-100">{printerQty}</span>
                          <button 
                            onClick={() => increaseQty("printer")}
                            className="w-8 h-8 flex items-center justify-center text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors font-black text-lg"
                          >
                            +
                          </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button 
                        onClick={removePrinter}
                        className="text-xs font-bold text-red-500 hover:text-red-600 hover:underline px-2 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  
                  <button 
                      onClick={() => setShowPrinterModal(true)}
                      className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline"
                  >
                      View details
                  </button>
                </div>
            </div>
            <div className="hidden sm:block">
              <img src="/assets/printer.png" className="w-24 h-24 object-contain opacity-90" alt="Printer" onError={(e) => e.target.style.display='none'}/>
            </div>
        </div>
      )}

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
      
      {/* Printer Details Modal */}
      <PrinterModal 
        isOpen={showPrinterModal} 
        onClose={() => setShowPrinterModal(false)} 
        onAdd={addPrinter}
        isAdded={printerAdded}
      />

    </section>
  );
}

const Loader2 = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const PrinterModal = ({ isOpen, onClose, onAdd, isAdded }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Printer className="w-8 h-8 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-neutral-900 dark:text-white">Thermal Receipt Printer</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-emerald-500 text-xs font-bold uppercase tracking-wider">In Stock</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                    <span className="text-neutral-500 text-xs italic">Model: K-58Pro</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-1 rounded-full bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 dark:text-white text-sm">High-Speed Printing</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Industrial grade 90mm/s printing speed for zero customer wait time.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 p-1 rounded-full bg-blue-500/10 text-blue-500">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 dark:text-white text-sm">Direct Thermal Technology</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">No ink or ribbons required. Just put the paper and start printing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 p-1 rounded-full bg-amber-500/10 text-amber-500">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 dark:text-white text-sm">1 Year Warranty</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Complete peace of mind with our 1-year replacement warranty.</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-6 bg-neutral-50 dark:bg-neutral-800/50 rounded-3xl border border-neutral-100 dark:border-neutral-800">
                <div>
                  <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest mb-1">One-time price</p>
                  <p className="text-3xl font-black text-neutral-900 dark:text-white">₹1,999</p>
                </div>
                {!isAdded ? (
                  <button 
                    onClick={() => { onAdd(); onClose(); }}
                    className="px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10 dark:shadow-white/5"
                  >
                    ADD TO CART
                  </button>
                ) : (
                  <button 
                    disabled
                    className="px-8 py-3 bg-emerald-500 text-white rounded-2xl font-black text-sm opacity-50 cursor-not-allowed"
                  >
                    ALREADY ADDED
                  </button>
                )}
              </div>
            </div>
            
            <div className="px-10 py-4 bg-emerald-500/5 text-center">
              <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">🔥 42 merchants bought this in the last 24 hours</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="w-10 h-10 animate-spin text-emerald-500" /></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
