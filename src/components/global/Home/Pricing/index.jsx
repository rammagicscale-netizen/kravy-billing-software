"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export const plans = [
  {
    key: "trial",
    name: "Free Trial",
    price: 1,
    originalPrice: null,
    description: "Try the billing software free for 3 days.",
    features: [
      "3 Day full access trial",
      "Unlimited invoices during trial",
      "Dashboard & reports",
      "Customer & item management",
    ],
  },
  {
    key: "year1",
    name: "1 Year Plan",
    price: 3999,
    originalPrice: 7000,
    description: "Perfect for small restaurants and shops.",
    features: [
      "Unlimited invoices",
      "Business dashboard",
      "GST billing support",
      "Customer & item management",
      "Email support",
    ],
  },
  {
    key: "year2",
    name: "2 Year Plan",
    price: 5999,
    originalPrice: 14000,
    description: "Best value for growing businesses.",
    features: [
      "Everything in 1 Year plan",
      "Priority support",
      "Advanced reports",
      "Staff management",
      "Cloud backup",
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
      "Multi outlet support",
      "Advanced analytics",
      "Dedicated onboarding",
      "Lifetime data backup",
    ],
    highlight: true,
  },
];

export default function PricingSection() {
  const router = useRouter();
  const { addToCart, cartItems, removeFromCart } = useCart();

  const handlePlanSelect = (plan, any) => {

    const planKeys = ["trial", "year1", "year2", "year3"];

    // remove existing plan if already in cart
    cartItems.forEach((item) => {
      if (planKeys.includes(item.id)) {
        removeFromCart(item.id);
      }
    });

    // add selected plan
    addToCart({
      id: plan.key,
      name: plan.name,
      price: plan.price,
      quantity: 1,
      cycle: "plan",
    });

    // redirect to checkout
    router.push("/checkout");
  };

  return (
    <section className="px-4 py-20 text-center">

      <h2 className="text-4xl font-bold mb-4">
        Choose Your Plan
      </h2>

      <p className="text-gray-500 mb-12 max-w-xl mx-auto">
        Simple pricing designed for restaurants and food businesses.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">

        {plans.map((plan) => {

          const saving =
            plan.originalPrice && plan.originalPrice - plan.price;

          return (
            <motion.div
              key={plan.key}
              whileHover={{ scale: 1.05 }}
              className={`relative flex flex-col rounded-2xl p-6 border shadow-sm
              ${
                plan.highlight
                  ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-none"
                  : "bg-white dark:bg-[#121228]"
              }`}
            >

              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full">
                  Best Value
                </span>
              )}

              {saving && (
                <div className="text-xs font-semibold text-green-500 mb-2">
                  Save ₹{saving.toLocaleString()}
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
                className={`mt-auto py-3 rounded-xl font-semibold flex items-center justify-center gap-2
                ${
                  plan.highlight
                    ? "bg-white text-purple-700"
                    : "bg-gray-900 text-white"
                }`}
              >
                Get Plan
                <ArrowRight className="w-4 h-4" />
              </button>

            </motion.div>
          );
        })}
      </div>
    </section>
  );
}