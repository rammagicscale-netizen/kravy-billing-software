"use client";

import { useState } from "react";
import { 
  Search, 
  FileText, 
  RotateCcw, 
  Clock, 
  ChevronRight, 
  Download, 
  Printer,
  Calendar,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Orders() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = async () => {
    if (!phone || phone.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(`/api/orders?phone=${phone}`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch orders. Please try again.");
    }

    setLoading(false);
  };

  const resumePayment = async (id) => {
    try {
      const res = await fetch(`/api/payment/resume/${id}`);
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Could not resume payment. Please start a new order.");
      }
    } catch (err) {
      console.error(err);
      alert("Resume payment failed.");
    }
  };

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const StatusBadge = ({ status }) => {
    switch (status) {
      case "SUCCESS":
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border border-emerald-100 dark:border-emerald-500/20">
            <CheckCircle2 size={12} /> Success
          </span>
        );
      case "FAILED":
        return (
          <span className="inline-flex items-center gap-1 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border border-red-100 dark:border-red-500/20">
            <XCircle size={12} /> Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border border-amber-100 dark:border-amber-500/20">
            <Clock size={12} /> {status || "Pending"}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#05060f] pb-24">
      {/* Hero Header */}
      <div className="bg-white dark:bg-[#0a0c1a] border-b dark:border-white/10 px-6 py-12 md:py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto relative z-10"
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 dark:text-white tracking-tight">
            Order Tracking
          </h1>
          <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
            View your order history, download tax invoices, and manage pending payments in one place.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="max-w-md mx-auto mt-10 relative z-20 group"
        >
          <div className="flex flex-col sm:flex-row gap-2 p-1.5 bg-white dark:bg-zinc-900 border dark:border-white/10 rounded-2xl shadow-xl shadow-indigo-500/5 focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all">
            <div className="flex items-center pl-3 pr-1 text-neutral-400 py-2 sm:py-0">
              <Search size={18} />
            </div>
            <input
              type="tel"
              maxLength={10}
              placeholder="Enter 10-digit mobile number"
              className="flex-1 bg-transparent border-none py-3 text-sm font-medium focus:ring-0 outline-none dark:text-white"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => e.key === "Enter" && search()}
            />
            <button
              onClick={search}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-3.5 sm:py-3 rounded-xl text-xs font-black transition-all active:scale-95 shadow-lg shadow-indigo-500/20 whitespace-nowrap w-full sm:w-auto"
            >
              {loading ? "SEARCHING..." : "FIND ORDERS"}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Content Area */}
      <div className="max-w-3xl mx-auto px-6 mt-12">
        <AnimatePresence mode="wait">
          {!searched ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center"
            >
              <div className="w-16 h-16 bg-neutral-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-4 border dark:border-white/5">
                <CreditCard className="text-neutral-300" size={32} />
              </div>
              <p className="text-sm font-medium text-neutral-400">Search by your billing phone number to see results.</p>
            </motion.div>
          ) : orders.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-20 text-center bg-white dark:bg-zinc-900/50 rounded-3xl border-2 border-dashed border-neutral-200 dark:border-white/5"
            >
              <div className="mb-4 flex justify-center">
                <AlertCircle className="text-amber-500" size={48} />
              </div>
              <h3 className="text-xl font-bold dark:text-white mb-2">No orders found</h3>
              <p className="text-sm text-neutral-500 max-w-xs mx-auto">
                We couldn't find any orders for <span className="font-bold text-indigo-500">{phone}</span>. Please verify the number and try again.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2 mb-4">
                <h2 className="text-xs font-black uppercase tracking-widest text-neutral-500">
                  {orders.length} ORDER{orders.length > 1 ? 'S' : ''} FOUND
                </h2>
              </div>
              
              {orders.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-zinc-900 border dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-indigo-500/5 hover:border-indigo-500/20 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-4 flex-1">
                      {/* Badge & Date */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <StatusBadge status={order.paymentStatus} />
                        <span className="text-[10px] font-bold text-neutral-400 flex items-center gap-1 group-hover:text-indigo-400 transition-colors">
                          <Calendar size={12} /> {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>

                      {/* Order Info */}
                      <div>
                        <h3 className="text-lg font-black dark:text-white truncate max-w-[250px]">
                          {order.invoiceNumber || order.merchantOrderId}
                        </h3>
                        <p className="text-[10px] text-neutral-400 mt-1 uppercase tracking-tighter font-bold">
                          {order.invoiceNumber ? "Invoice Number" : "Order ID"}
                        </p>
                      </div>

                      {/* Items Preview */}
                      <div className="flex flex-wrap gap-2 py-2 border-y dark:border-white/5 my-4">
                        {order.items?.map((item, i) => (
                          <div key={i} className="bg-neutral-50 dark:bg-white/5 px-3 py-1 rounded-lg border dark:border-white/5">
                            <p className="text-[10px] font-black dark:text-neutral-300">
                              {item.name} <span className="text-indigo-500 ml-1">×{item.quantity}</span>
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-end justify-between md:justify-start md:gap-12">
                        <div>
                          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Total Amount</p>
                          <p className="text-xl font-black text-indigo-600 dark:text-indigo-400">{formatCurrency(order.amount)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 min-w-[180px]">
                      {order.paymentStatus === "SUCCESS" ? (
                        <>
                          <a
                            href={`/api/invoice/${order.merchantOrderId}`}
                            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-2xl text-xs font-black hover:bg-indigo-700 transition-all shadow-md"
                          >
                            <Download size={16} /> DOWNLOAD INVOICE
                          </a>
                          <button
                            onClick={() => window.open(`/api/invoice/${order.merchantOrderId}`, "_blank")}
                            className="w-full flex items-center justify-center gap-2 bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-white/10 px-5 py-3 rounded-2xl text-xs font-black hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all"
                          >
                            <Printer size={16} /> PRINT VERSION
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => resumePayment(order.merchantOrderId)}
                          className="w-full flex items-center justify-center gap-2 bg-rose-600 text-white px-5 py-3 rounded-2xl text-xs font-black hover:bg-rose-700 transition-all shadow-lg shadow-rose-500/20 animate-pulse"
                        >
                          <RotateCcw size={16} /> RESUME PAYMENT
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating help fab for mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <button className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform active:scale-90">
             <AlertCircle size={24} />
        </button>
      </div>
    </div>
  );
}