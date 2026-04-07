"use client";

import React, { useEffect, useState, use } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, Download, Printer, Home, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentResultPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const id = params.id;
  const [status, setStatus] = useState("CHECKING");
  const [order, setOrder] = useState(null);
  const router = useRouter();

  const invoiceUrl = `/api/invoice/${id}`;

  useEffect(() => {
    if (!id) return;

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/phonepe/status/${id}`);
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
  }, [id]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0a0a1a] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white dark:bg-[#10101a] rounded-[2.5rem] shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
      >
        <div className="p-10 md:p-16">
          {/* Status Icon & Title */}
          <div className="text-center mb-10">
            {status === "CHECKING" || status === "PENDING" ? (
              <div className="flex flex-col items-center">
                <Loader2 className="w-20 h-20 text-blue-500 animate-spin mb-6" />
                <h1 className="text-3xl font-extrabold dark:text-white">Verifying Payment...</h1>
                <p className="text-neutral-500 mt-3 text-lg">Please do not refresh this page.</p>
              </div>
            ) : status === "SUCCESS" ? (
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                >
                  <CheckCircle2 className="w-24 h-24 text-emerald-500 mb-6" />
                </motion.div>
                <h1 className="text-4xl font-extrabold dark:text-white">Payment Successful</h1>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold text-xl mt-2 underline underline-offset-8">Order Confirmed!</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <XCircle className="w-24 h-24 text-red-500 mb-6" />
                <h1 className="text-4xl font-extrabold dark:text-white">Payment Failed</h1>
                <p className="text-red-500 mt-2 font-bold text-xl underline underline-offset-8">Something went wrong.</p>
              </div>
            )}
          </div>

          {/* Details Card */}
          {order && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-50 dark:bg-neutral-900/40 rounded-3xl border border-neutral-100 dark:border-neutral-800/60 p-8 mb-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div>
                  <label className="text-[11px] uppercase tracking-[0.2em] font-black text-neutral-400 dark:text-neutral-600">Transaction ID</label>
                  <p className="font-mono text-sm dark:text-neutral-200 mt-1 truncate">{order.merchantOrderId}</p>
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-[0.2em] font-black text-neutral-400 dark:text-neutral-600">Invoice Number</label>
                  <p className="font-mono text-sm dark:text-neutral-200 mt-1">{order.invoiceNumber || (status === "SUCCESS" ? "Generating..." : "N/A")}</p>
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-[0.2em] font-black text-neutral-400 dark:text-neutral-600">Amount Paid</label>
                  <p className="font-black text-neutral-900 dark:text-white text-2xl mt-0.5">₹ {order.amount.toFixed(2)}</p>
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-[0.2em] font-black text-neutral-400 dark:text-neutral-600">Customer</label>
                  <p className="font-bold text-neutral-800 dark:text-neutral-200 mt-0.5 truncate">{order.customer.name}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            {status === "SUCCESS" ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href={invoiceUrl}
                    download
                    className="flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-blue-500/25"
                  >
                    <Download size={20} />
                    DOWNLOAD INVOICE
                  </a>
                  <button
                    onClick={() => {
                      const win = window.open(invoiceUrl);
                      setTimeout(() => win?.print(), 500);
                    }}
                    className="flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-black border-2 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all dark:text-white transform hover:scale-[1.02] active:scale-95"
                  >
                    <Printer size={20} />
                    PRINT INVOICE
                  </button>
                </div>
                <Link
                  href="/"
                  className="flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-black bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition-all transform hover:scale-[1.01] shadow-2xl"
                >
                  <Home size={20} />
                  RETURN TO HOMEPAGE
                </Link>
              </>
            ) : status === "FAILED" ? (
              <>
                <Link
                  href={`/checkout?retry=${id}`}
                  className="flex items-center justify-center gap-3 px-8 py-6 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white transition-all transform hover:scale-[1.02] shadow-xl shadow-red-500/20 text-lg"
                >
                  <ShoppingCart size={22} />
                  TRY PAYMENT AGAIN
                </Link>
                <Link
                  href="/"
                  className="flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-black border-2 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all dark:text-white transform hover:scale-[1.01]"
                >
                  <Home size={18} />
                  CANCEL & GO HOME
                </Link>
              </>
            ) : null}
          </div>
        </div>

        {/* Branding Footer */}
        <div className={`h-2.5 w-full ${status === "SUCCESS" ? "bg-emerald-500" : status === "FAILED" ? "bg-red-500" : "bg-blue-500"}`} />
      </motion.div>
      
      <p className="mt-8 text-neutral-400 text-sm font-medium">
        Secure Transaction Powered by PhonePe
      </p>
    </div>
  );
}
