"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Sign Up & Login",
    desc: "Create your account and securely log in to access your billing dashboard and manage your business.",
    img: "/assets/Login.png",
  },
  {
    title: "Browse Suitable Plans & Add-Ons",
    desc: "Choose a billing plan that fits your business needs and enable useful add-ons like reports, inventory, and GST billing.",
    img: "/assets/Pricing.png",
  },
  {
    title: "Dashboard",
    desc: "View your business insights in one place including total sales, bills generated, payment modes, and daily growth.",
    img: "/assets/dashboard.png",
  },
  {
    title: "Setup Your Menu / Products",
    desc: "Add your products or menu items, set prices, categories, and taxes to prepare your system for quick billing.",
    img: "/assets/Menu.png",
  },
  {
    title: "Do Seamless Billing",
    desc: "Generate bills instantly, accept multiple payment modes like cash or UPI, and track every transaction easily.",
    img: "/assets/Billing.png",
  },
];

export default function AboutThisPlatform() {
  return (
    <section className="relative py-20 px-4 md:px-6 lg:px-8 text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12"
        >
          How Our Platform Works
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-4 backdrop-blur-md shadow-lg flex flex-col items-start text-start"
            >
              <img
                src={step.img}
                alt={step.title}
                className="w-full object-cover rounded-xl mb-4 border border-white/10"
              />

              <h3 className="text-lg font-semibold mb-2">{i+1}. {step.title}</h3>
              <p className="text-sm text-gray-600 dark:text-neutral-300">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
