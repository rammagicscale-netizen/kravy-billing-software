"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";


export const metadata = {
title: "Pricing | Kravy Billing Software",
description: "Affordable POS billing software for restaurants and shops.",
};

export const plans = [
  {
    key: "trial",
    name: "Free Trial",
    price: 1,
    originalPrice: null,
    description: "Explore the billing platform with a full feature trial.",
    features: [
      "3 Day full access trial",
      "Unlimited invoices during trial",
      "Analytics dashboard",
      "Customer management",
      "Invoice with logo & QR",
      "3 click billing system",
      "Basic inventory management",
      "Chat support",
    ],
  },

  {
    key: "year1",
    name: "1 Year Plan",
    price: 3999,
    originalPrice: 7000,
    description: "Perfect for restaurants and small businesses.",
    features: [
      "Unlimited invoices",
      "Analytics dashboard",
      "3 click billing system",
      "Customer management",
      "Inventory management",
      "Tax / GST management",
      "Invoice with logo & QR",
      "Table QR ordering",
      "Bulk item uploading",
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
      "Advanced analytics dashboard",
      "Kitchen workflow system",
      "Coupons, loyalty & offers management",
      "Table QR ordering system",
      "Inventory tracking with alerts",
      "Bulk menu uploading",
      "Priority support",
      "Customer insights reports",
      "Chat & Email support",
    ],
  },

  {
    key: "year3",
    name: "3 Year Plan",
    price: 7499,
    originalPrice: 21000,
    description: "Maximum savings for long-term businesses.",
    features: [
      "Everything in 2 Year plan",
      "Advanced analytics dashboard",
      "Kitchen workflow automation",
      "Inventory smart tracking",
      "Coupons, loyalty & offers management",
      "Table QR ordering system",
      "Bulk uploading system",
      "Advanced tax / GST reports",
      "Priority support",
      "Chat & Email support",
    ],
    highlight: true,
  },
];

export default function PricingSection() {
  const router = useRouter();
  const { addToCart, cartItems, removeFromCart, setIsCartOpen } = useCart();

  const handlePlanSelect = (plan) => {
    // The plan keys mapping is already handled by CartContext's addToCart logic
    // but we can ensure consistency here if needed.
    
    // add selected plan
    addToCart({
      id: plan.key,
      name: plan.name,
      price: plan.price,
    });

    // open the cart sidebar
    setIsCartOpen(true);
  };

  return (
    <section id="pricing" className="px-6 py-20 text-center">

      <h2 className="text-4xl font-black mb-4 dark:text-white tracking-tight">
        Choose Your Plan
      </h2>

      <p className="text-sm text-gray-500 dark:text-neutral-400 mb-12 max-w-xl mx-auto px-4">
        Simple, transparent pricing designed for restaurants and food businesses. No hidden fees.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">

        {plans.map((plan) => {

          const saving =
            plan.originalPrice && plan.originalPrice - plan.price;

          const savePercent =
            plan.originalPrice &&
            Math.round((saving / plan.originalPrice) * 100);

          return (
            <motion.div
              key={plan.key}
              whileHover={{ y: -5 }}
              className={`relative flex flex-col rounded-[2.5rem] p-8 border transition-all duration-300 shadow-sm
              ${
                plan.highlight
                  ? "bg-gradient-to-br from-indigo-600 to-indigo-800 text-white border-none shadow-xl shadow-indigo-500/20"
                  : "bg-white dark:bg-zinc-900 border-neutral-200 dark:border-white/5"
              }`}
            >

              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full">
                  Best Value
                </span>
              )}

              {savePercent && (
                <div className="text-xs font-semibold text-green-500 mb-2">
                  Save {savePercent}%
                </div>
              )}

              <h3 className="text-xl font-semibold">
                {plan.name}
              </h3>

              <div className="mt-2 mb-3">

                {plan.originalPrice && (
                  <div className="text-sm line-through opacity-70">
                    ₹{plan.originalPrice}
                  </div>
                )}

                <div className="text-4xl font-bold">
                  ₹{plan.price}
                </div>

              </div>

              <p className="text-sm opacity-80 mb-6">
                {plan.description}
              </p>

              <ul className="space-y-3 text-left text-sm mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanSelect(plan)}
                className={`mt-auto py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]
                ${
                  plan.highlight
                    ? "bg-white text-black"
                    : "bg-neutral-900 dark:bg-white/10 text-white"
                }`}
              >
                Select Plan
                <ArrowRight className="w-4 h-4" />
              </button>

            </motion.div>
          );
        })}
      </div>
    </section>
  );
}