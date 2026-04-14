"use client";

import React from "react";
import { motion } from "framer-motion";
import { Instagram, Sparkles, Zap } from "lucide-react";
import Script from "next/script";

const InstagramReels = () => {
  return (
    <section id="reels" className="pt-24 pb-4 md:pt-32 md:pb-6 relative overflow-hidden bg-white dark:bg-[#030308] border-y border-neutral-100 dark:border-white/5 transition-colors duration-300">
      {/* Load Behold Script */}
      <Script 
        src="https://w.behold.so/widget.js" 
        type="module"
        strategy="afterInteractive"
      />

      {/* Theme-Aware Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-[-10%] w-[600px] h-[600px] bg-pink-500/[0.03] dark:bg-pink-600/[0.05] blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-blue-500/[0.03] dark:bg-blue-600/[0.05] blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 mb-6 backdrop-blur-xl"
          >
            <Zap className="w-3.5 h-3.5 text-pink-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 dark:text-white/70">Social Spotlight</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-6"
          >
            See us on <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent italic">Instagram</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-md md:text-xl text-neutral-500 dark:text-neutral-400 font-normal leading-relaxed"
          >
            Get a behind-the-scenes look at Kravy. New updates, tips, and 
            community stories synced live.
          </motion.p>
        </div>

        {/* Optimized Behold Widget Container - Reduced by 20% */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Subtle Outer Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-[1.5rem] md:rounded-[2.5rem] blur-xl opacity-0 dark:group-hover:opacity-100 transition-opacity" />
          
          <div className="relative bg-white dark:bg-[#0a0a0f] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-neutral-200 dark:border-white/10 shadow-xl dark:shadow-3xl">
            {/* Minimalist IG-Style Header */}
            <div className="flex items-center justify-between px-5 md:px-7 py-3.5 border-b border-neutral-100 dark:border-white/5 bg-neutral-50/50 dark:bg-white/[0.02]">
               <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[1.5px]">
                    <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center border-2 border-white dark:border-black">
                       <Instagram className="w-4 h-4 text-neutral-900 dark:text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-neutral-900 dark:text-white font-bold text-xs md:text-sm">kravy_billing</h3>
                    <p className="text-neutral-400 dark:text-neutral-500 text-[9px]">Official Instagram</p>
                  </div>
               </div>
               <a 
                href="https://www.instagram.com/kravy_billing" 
                target="_blank"
                className="px-4 py-1.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black text-[11px] font-bold hover:scale-105 transition-transform"
               >
                 Follow
               </a>
            </div>

            {/* Optimized Growth Widget */}
            <div className="min-h-[360px] md:min-h-[400px] w-full bg-white dark:bg-[#05050a] p-1 md:p-3">
               <behold-widget feed-id="hwcLFw1x4RA38tAXe58Z"></behold-widget>
            </div>
          </div>
        </motion.div>

        {/* View All CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 md:mt-12 text-center"
        >
          <a 
            href="https://www.instagram.com/kravy_billing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-neutral-500 dark:text-neutral-400 font-medium hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
          >
            View all posts on Instagram
            <Sparkles className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramReels;
