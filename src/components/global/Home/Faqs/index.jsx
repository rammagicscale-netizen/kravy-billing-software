"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Globe,
  Laptop2,
  CalendarClock,
  XCircle,
} from "lucide-react";
import { COMPANY } from "@/constants";

const faqs = [
  {
    icon: HelpCircle,
    question: "What is Kravy?",
    answer: `${COMPANY.NAME} is a modern cloud-based billing and POS software solution built for restaurants, cafés, and retail stores. It simplifies daily operations and sales tracking through powerful intuitive tools.`,
  },
  {
    icon: Sparkles,
    question: "What do I get with a Kravy subscription?",
    answer:
      "You get full access to Kravy’s POS software, cloud dashboard, real-time reporting, and 24/7 support — everything needed to run your business efficiently.",
  },
  {
    icon: ShieldCheck,
    question: "Is my data secure with Kravy?",
    answer:
      "Absolutely. All transactions and customer data are stored securely using end-to-end encryption and cloud backups hosted on secure Indian servers.",
  },
  {
    icon: Globe,
    question: "Can I access my billing data from anywhere?",
    answer:
      "Yes. Kravy is fully cloud-based, so you can log in from any device and view real-time sales, inventory, and analytics anytime, anywhere.",
  },
  {
    icon: Laptop2,
    question: "Does Kravy support multiple outlets or franchises?",
    answer:
      "Yes! Kravy allows centralized control and analytics across multiple outlets, helping you manage performance, billing, and inventory in one place.",
  },
  {
    icon: XCircle,
    question: "Can I cancel or change my plan anytime?",
    answer:
      "Yes. Kravy offers flexible monthly and annual plans that can be canceled or upgraded anytime from your dashboard — no lock-ins.",
  },
  {
    icon: CalendarClock,
    question: "What if I need help setting up Kravy?",
    answer: `Our onboarding team provides complete setup assistance and live demos. You can email us anytime at ${COMPANY.EMAIL.SUPPORT} for help or training requests.`,
  },
];

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-4 px-4 sm:px-8 w-full mx-auto text-neutral-900 dark:text-white">
      <h2 className="text-4xl font-bold text-center mb-12">
        💡 Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, i) => {
          const Icon = faq.icon;
          const isOpen = openIndex === i;

          return (
            <motion.div
              key={i}
              className={`rounded-md border border-neutral-200 dark:border-neutral-700 shadow-lg dark:shadow-black/20 bg-white/70 dark:bg-[#10101a]/70 backdrop-blur transition-colors overflow-hidden`}
              whileHover={{ scale: 1.01 }}
            >
              <button
                onClick={() => toggle(i)}
                className={`w-full flex items-center justify-between px-5 py-4 text-left font-medium text-md md:text-lg transition-all duration-300 ${isOpen
                    ? "bg-indigo-100 dark:bg-[#1a183b]/60"
                    : "hover:bg-indigo-50 dark:hover:bg-[#16142f]/40"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-indigo-500 dark:text-indigo-400 shrink-0" />
                  <span className="text-neutral-900 dark:text-white">
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 text-start py-5 text-sm sm:text-base text-neutral-700 dark:text-gray-300">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
