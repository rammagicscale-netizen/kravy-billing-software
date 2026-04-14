"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Rahul Kapoor",
    title: "Owner, The Coffee Beanery",
    quote:
      "Kravy has completely changed how we handle our billing. It's so fast that we've reduced customer waiting time by half. The 3-click system is pure genius!",
    img: "https://b.zmtcdn.com/merchant/diy/pictures/7/21783367/12ba37b49ddcdfed026091b8f8845bb8.jpeg",
  },
  {
    name: "Sonia Mehta",
    title: "Founder, Sweet Delights Bakery",
    quote:
      "The inventory management and sales analytics are incredibly intuitive. I can finally track my daily profits from my phone. Kravy is essential for any modern outlet.",
    img: "https://b.zmtcdn.com/merchant/diy/pictures/0/22015050/0f45d0056ce66d5d8df2af8941353f7a.png",
  },
  {
    name: "Vikram Singh",
    title: "Owner, Gourmet Food Truck",
    quote:
      "I needed something simple yet powerful for my food truck, and Kravy delivered. The UPI integration is flawless, and it works great even on small tablets.",
    img: "https://b.zmtcdn.com/merchant/diy/pictures/0/21380380/95e197cd95db36e88df8a7fe87689d64.jpg",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function Testimonials() {
  return (
    <section className="mt-20 px-4 md:px-0 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-neutral-800 dark:text-white tracking-tight">
          Trust by 100+ Leading Outlets 🚀
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2 font-medium">
          See how Kravy Billing is powering modern food businesses.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-4 md:p-8 backdrop-blur-lg shadow-lg dark:shadow-black/20 bg-white/60 dark:bg-[#10101a]/70 transition-colors"
          >
            <div className="flex items-center gap-1 text-yellow-500 mb-3">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="text-neutral-800 dark:text-neutral-200 text-sm leading-relaxed mb-6 italic">
              “{t.quote}”
            </p>
            <div className="flex items-center gap-3">
              <img
                src={t.img}
                alt={t.name}
                width={40}
                height={40}
                className="rounded-full object-cover border border-neutral-300 dark:border-neutral-600"
              />
              <div>
                <div className="text-sm font-semibold text-neutral-800 dark:text-white">
                  {t.name}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {t.title}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
