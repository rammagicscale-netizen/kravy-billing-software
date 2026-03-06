"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

export default function FailedPage() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");

  useEffect(() => {
    if (!transactionId) return;

    // update order status to FAILED
    axios.post("/api/payment-failed", {
      transactionId,
    }).catch((err) => {
      console.error("Failed to update order status:", err);
    });

  }, [transactionId]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">

      <XCircle className="w-16 h-16 text-red-500 mb-6" />

      <h1 className="text-3xl font-bold mb-2">
        Payment Failed
      </h1>

      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        We couldn&apos;t process your payment. Please try again or contact support if the issue persists.
      </p>

      {transactionId && (
        <p className="text-sm text-gray-400 mb-6">
          Transaction ID: {transactionId}
        </p>
      )}

      <div className="flex gap-4">

        <Link
          href="/checkout"
          className="px-6 py-3 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-lg font-semibold shadow-md hover:bg-gray-800 transition-all"
        >
          Try Again
        </Link>

        <Link
          href="/contact"
          className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        >
          Contact Support
        </Link>

      </div>

    </div>
  );
}