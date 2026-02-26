"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

import axios from "axios";

export default function CheckoutPage() {
  const { cartItems, totalAmount, clearCart } = useCart();

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const handlePayment = async () => {
    if (!cartItems.length) return;

    try {
      const transactionId = "MT" + Date.now();
      const response = await axios.post("/api/phonepe", {
        amount: totalAmount,
        transactionId: transactionId,
        mobileNumber: "9999999999", // You can add a field to collect this
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment initiation failed. Please try again.");
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      {cartItems.length === 0 ? (
        <div className="border rounded-xl p-6 text-center border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Your cart is empty.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-semibold"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatCurrency(item.price)} × {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Total payable
            </span>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              {formatCurrency(totalAmount)}
            </span>
          </div>

          <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 px-4 py-3 text-xs text-emerald-900 dark:text-emerald-100 mb-4">
            Payments are secured by PhonePe. Your transaction will be processed via a secure payment gateway.
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg text-sm font-semibold mb-3 shadow-md hover:scale-[1.01] transition-all"
          >
            Pay Now with PhonePe
          </button>

          <Link
            href="/"
            className="block w-full text-center text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ← Back to Home
          </Link>
        </>
      )}
    </section>
  );
}
