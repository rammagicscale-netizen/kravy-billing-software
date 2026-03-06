"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";

export default function SuccessClient() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-6" />

      <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>

      <p className="text-gray-600 mb-8 max-w-md">
        Thank you for choosing Kravy. Your subscription has been activated.
      </p>

      {orderId && (
        <a
          href={`/api/invoice/${orderId}`}
          className="mb-4 px-6 py-3 bg-black text-white rounded-lg"
        >
          Download Invoice
        </a>
      )}

      <Link
        href="/"
        className="px-6 py-3 bg-emerald-600 text-white rounded-lg"
      >
        Go to Home
      </Link>
    </div>
  );
}