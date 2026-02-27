"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const plans = [
  {
    key: "starter",
    name: "Starter Plan",
    price: "₹1249",
    description: "Perfect to start billing digitally for small businesses.",
    features: [
      "Up to 200 invoices / month",
      "Basic billing dashboard",
      "GST-ready invoices",
      "Customer & item management",
    ],
    button: "Start Starter Plan",
    link: "/payment/cart?plan=starter",
    highlight: false,
  },
  {
    key: "basic",
    name: "Basic Plan",
    price: "₹1499",
    description: "Ideal for growing restaurants and cloud kitchens.",
    features: [
      "Up to 1000 invoices / month",
      "Sales & reports dashboard",
      "Table & order management",
      "Bulk item upload support",
    ],
    button: "Get Basic Plan",
    link: "/payment/cart?plan=basic",
    highlight: false,
  },
  {
    key: "pro",
    name: "Pro Plan",
    price: "₹1999",
    description: "Best for busy restaurants needing advanced control.",
    features: [
      "Unlimited invoices",
      "AI-powered business insights dashboard",
      "Staff & role management",
      "Priority support",
    ],
    button: "Go Pro",
    link: "/payment/cart?plan=pro",
    highlight: true,
  },
  {
    key: "enterprise",
    name: "Enterprise Plan",
    price: "₹2999",
    description: "Complete solution for multi-outlet businesses.",
    features: [
      "Everything in Pro",
      "Multi-branch management",
      "Advanced analytics & exports",
      "Dedicated onboarding support",
    ],
    button: "Go Enterprise",
    link: "/payment/cart?plan=enterprise",
    highlight: true,
  },
];

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function PricingSection() {
  const { addToCart } = useCart();
  const router = useRouter();

  const handlePlanSelect = (plan) => {
    addToCart({
      id: plan.key,
      name: plan.name,
      price: parseInt(plan.price.replace("₹", "")),
    });
    router.push("/checkout");
  };

  return (
    <section id="pricing" className="relative px-4 py-16 md:py-24 text-center">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px]" />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
      >
        Choose Your Perfect Plan
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12"
      >
        Simple, scalable pricing crafted for every food business — from cloud
        kitchens to fine dining.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <motion.div
            key={plan.key}
            whileHover={{
              scale: 1.04,
              y: -6,
              boxShadow: plan.highlight
                ? "0 10px 40px rgba(123, 97, 255, 0.3)"
                : "0 4px 20px rgba(0,0,0,0.08)",
            }}
            transition={{ type: "spring", stiffness: 180, damping: 12 }}
            className={`flex flex-col justify-between relative p-6 rounded-2xl backdrop-blur-md border h-full transition-all duration-300 
              ${plan.highlight
                ? "bg-gradient-to-br from-purple-100/70 to-indigo-50/50 dark:from-[#2a225a]/50 dark:to-[#14122e]/60 border-purple-300/50 dark:border-purple-400/30"
                : "bg-white/70 dark:bg-[#121228]/50 border-gray-200/40 dark:border-gray-700/40"
              }`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                Most Popular
              </span>
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {plan.name}
              </h3>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {plan.price}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                {plan.description}
              </p>
            </div>

            <ul className="mt-auto space-y-3 text-gray-700 dark:text-gray-300 text-left">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePlanSelect(plan)}
              className={`mt-6 w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all 
                ${plan.highlight
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg"
                  : "bg-gray-100 hover:bg-gray-200 dark:bg-[#ffffff10] dark:hover:bg-[#ffffff20] text-gray-900 dark:text-white"
                }`}
            >
              {plan.button} <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
