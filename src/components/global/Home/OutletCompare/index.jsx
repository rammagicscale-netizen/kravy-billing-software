"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function OutletCompare() {
  return (
    <section id="compare" className="w-full px-4 py-16">
      {/* Heading */}
      <motion.div
        className="text-center max-w-4xl mx-auto mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          Why Upgrade to{" "}
          <span className="text-primary">Kravy Billing Software</span>?
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg md:text-xl">
          Don't let manual billing slow down your business.
        </p>
      </motion.div>

      {/* Simplified Static Block */}
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <div className="relative overflow-hidden rounded-2xl border shadow-md bg-white dark:bg-neutral-900 border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center gap-8 p-8">

            {/* Keeping only the first image and text */}
            <div className="flex-1 text-center">
              {/* <div className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded mb-4 shadow-md">
                BE
              </div> */}
              <Image
                src="/assets/Dashboard2.png"
                alt="Dashboard "
                width={600}
                height={700}
                className="w-full h-auto mb-6 opacity-80 filter rounded-lg object-cover"
              />
              {/* <p className="text-gray-600 dark:text-gray-400 italic">
                Manual errors and slow billing that frustrate customers.
              </p> */}
            </div>

            {/* Benefit Side */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                The Solution by Kravy Software Development
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Experience a fully customizable and dynamic billing interface. Our software gives you complete control over your workspace:
              </p>

              <ul className="text-left space-y-3 mt-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1 shrink-0">✓</span>
                  <span><b>Smart Column Rearrangement:</b> Easily change the position of any table column to perfectly match your workflow (e.g., move the 2nd column to the 1st position with ease).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1 shrink-0">✓</span>
                  <span><b>Complete Visibility Control:</b> Hide any unwanted columns completely. The entire column, including its heading, disappears for a cleaner, clutter-free view.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1 shrink-0">✓</span>
                  <span><b>Personalized Dashboard:</b> Set up your billing table exactly how your business needs it, reducing distractions and speeding up checkouts.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
