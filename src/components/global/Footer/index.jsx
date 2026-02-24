// components/Footer.tsx
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full border-t border-gray-200 dark:border-gray-800 py-6 px-6 md:px-12 text-sm text-gray-600 dark:text-gray-400"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center">
          <p>© {new Date().getFullYear()} Kravy.in</p>
          <p className="text-[10px] uppercase tracking-widest opacity-50 mt-1">
            A product of KRAVY SOFTWARE DEVELOPMENT
          </p>
        </div>
        <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
          <Link
            href="/terms-and-conditions"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/contact"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Contact Us
          </Link>
          <Link
            href="/return-policy"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Return Policy
          </Link>
          <Link
            href="/refund-policy"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Refund Policy
          </Link>
          <Link
            href="/disclaimer"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Disclaimer
          </Link>

          <Link
            href="/shipping"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Shipping Policy
          </Link>
        </div>
      </div>
    </motion.footer>
  );
}
