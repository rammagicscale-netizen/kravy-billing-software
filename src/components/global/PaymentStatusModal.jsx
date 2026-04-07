"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, Download, Printer, Home, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentStatusModal({ orderId }) {
  const [status, setStatus] = useState("CHECKING");
  const [order, setOrder] = useState(null);
  const router = useRouter();

  const invoiceUrl = `/api/invoice/${orderId}`;

  useEffect(() => {
    if (!orderId) return;

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/phonepe/status/${orderId}`);
        const data = await res.json();
        
        if (data.status) {
          setStatus(data.status);
          if (data.order) setOrder(data.order);
        }

        if (data.status !== "PENDING" && data.status !== "CHECKING") {
          return true; // Stop polling
        }
      } catch (err) {
        console.error("Status check error:", err);
      }
      return false;
    };

    // Initial check
    checkStatus().then((done) => {
      if (done) return;

      const interval = setInterval(async () => {
        const isDone = await checkStatus();
        if (isDone) clearInterval(interval);
      }, 3000);

      return () => clearInterval(interval);
    });
  }, [orderId]);

  const handleClose = () => {
    router.push("/");
  };

  if (!orderId) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#0f0f1a] rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
        >
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors z-10"
          >
            <X size={20} className="text-neutral-500" />
          </button>

          <div className="p-8 md:p-12">
            {/* Status Icon & Title */}
            <div className="text-center mb-8">
              {status === "CHECKING" || status === "PENDING" ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-4" />
                  <h2 className="text-2xl font-bold dark:text-white">Verifying Payment...</h2>
                  <p className="text-neutral-500 mt-2 text-sm">Please do not refresh or close this window.</p>
                </div>
              ) : status === "SUCCESS" ? (
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                  >
                    <CheckCircle2 className="w-20 h-20 text-emerald-500 mb-4" />
                  </motion.div>
                  <h2 className="text-3xl font-extrabold dark:text-white">Payment Successful</h2>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium mt-1">Order Confirmed!</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <XCircle className="w-20 h-20 text-red-500 mb-4" />
                  <h2 className="text-3xl font-extrabold dark:text-white">Payment Failed</h2>
                  <p className="text-red-500 mt-1 font-medium">Something went wrong with the transaction.</p>
                </div>
              )}
            </div>

            {/* Order Summary Card (Visible on Success) */}
            {status === "SUCCESS" && order && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl border border-neutral-100 dark:border-neutral-800 p-6 mb-8"
              >
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-400">Order ID</label>
                    <p className="font-mono text-sm dark:text-neutral-200 truncate">{order.merchantOrderId}</p>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-400">Invoice ID</label>
                    <p className="font-mono text-sm dark:text-neutral-200 truncate">{order.invoiceNumber || "Generating..."}</p>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-400">Amount Paid</label>
                    <p className="font-bold text-neutral-900 dark:text-white text-lg">₹ {order.amount}</p>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-400">Customer</label>
                    <p className="font-medium text-neutral-800 dark:text-neutral-200 truncate">{order.customer.name}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3">
              {status === "SUCCESS" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <a
                    href={invoiceUrl}
                    download
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-lg shadow-blue-500/20"
                  >
                    <Download size={18} />
                    Download Invoice
                  </a>
                  <button
                    onClick={() => {
                      const win = window.open(invoiceUrl);
                      setTimeout(() => win?.print(), 500);
                    }}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all"
                  >
                    <Printer size={18} className="dark:text-white" />
                    <span className="dark:text-white">Print Invoice</span>
                  </button>
                  <Link
                    href="/"
                    onClick={handleClose}
                    className="md:col-span-2 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-neutral-900 text-white dark:bg-white dark:text-black hover:opacity-90 transition-all"
                  >
                    <Home size={18} />
                    Back to Home
                  </Link>
                </div>
              ) : status === "FAILED" ? (
                <div className="flex flex-col gap-3">
                  <Link
                    href={`/checkout?retry=${orderId}`}
                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 transition-all"
                  >
                    Try Again
                  </Link>
                  <button
                    onClick={handleClose}
                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all dark:text-white"
                  >
                    Cancel & Return
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          {/* Bottom Branding Bar */}
          {status === "SUCCESS" && (
            <div className="bg-emerald-500 h-1.5 w-full" />
          )}
          {status === "FAILED" && (
            <div className="bg-red-500 h-1.5 w-full" />
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
