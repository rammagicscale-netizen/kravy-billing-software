"use client";

import { motion } from "framer-motion";
import { 
  Receipt, 
  Smartphone, 
  TrendingUp, 
  Calculator, 
  LayoutDashboard, 
  CreditCard 
} from "lucide-react";

const features = [
  {
    title: "Fast Invoicing",
    description: "Generate bills in 3 clicks. No more customer queues.",
    icon: <Receipt size={22} />,
    color: "bg-blue-500"
  },
  {
    title: "Any Device",
    description: "Seamlessly runs on Mobile, Tablets, and POS hardware.",
    icon: <Smartphone size={22} />,
    color: "bg-purple-500"
  },
  {
    title: "Sale Insights",
    description: "Real-time tracking of orders, payments, and profits.",
    icon: <TrendingUp size={22} />,
    color: "bg-emerald-500"
  },
  {
    title: "GST Ready",
    description: "Automated SGST/CGST calculations for hassle-free filing.",
    icon: <Calculator size={22} />,
    color: "bg-rose-500"
  },
  {
    title: "Smart POS",
    description: "Intuitive interface designed for high-speed counter operations.",
    icon: <LayoutDashboard size={22} />,
    color: "bg-amber-500"
  },
  {
    title: "UPI & More",
    description: "Accept payments via UPI QR, Cards, or Cash instantly.",
    icon: <CreditCard size={22} />,
    color: "bg-indigo-500"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    },
  }),
};

export default function WhyChooseUs() {
  return (
    <section id="features" className="py-24 px-6 md:px-0 max-w-6xl mx-auto relative z-10 overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/[0.03] dark:bg-emerald-500/[0.05] blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-4 inline-block"
        >
          Premium Features
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-white tracking-tighter"
        >
          Built for <span className="italic text-neutral-400">High-Performance</span> Teams
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover={{ y: -5 }}
            className="group p-8 rounded-[2.5rem] bg-white dark:bg-[#0a0a0f] border border-neutral-100 dark:border-white/5 shadow-xl shadow-neutral-200/20 dark:shadow-none hover:border-emerald-500/20 transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-2xl ${f.color} text-white flex items-center justify-center mb-6 shadow-lg shadow-current/20 group-hover:scale-110 transition-transform duration-300`}>
              {f.icon}
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{f.title}</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-[13px] leading-relaxed">
              {f.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
