"use client";

import React from "react";
import { motion } from "framer-motion";

// IMAGES (original format)
const zomatoImages = [
  "/assets/App1.jpeg",
  "/assets/App2.jpeg",
  "/assets/App3.jpeg",
  "/assets/App4.jpeg",
  "/assets/App5.jpeg",
  "/assets/App6.jpeg",
  "/assets/App7.jpeg",
  "/assets/App8.jpeg",
  "/assets/App9.jpeg",
];

// Duplicate for seamless loop
const duplicatedImages = [...zomatoImages, ...zomatoImages];

const ZomatoApproved = () => {
  return (
    <section id="trust" className="relative pt-8 md:pt-12 pb-20 md:pb-32 overflow-hidden bg-white dark:bg-[#030308]">
      {/* Background blur */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/3 w-[700px] h-[700px] bg-purple-300/10 dark:bg-purple-800/10 rounded-md blur-[160px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-300/10 dark:bg-indigo-700/10 rounded-md blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-blue-500/5 dark:bg-blue-500/10 border border-blue-400/20 rounded-full text-xs font-semibold text-blue-600 dark:text-blue-400 backdrop-blur-sm">
              ✨ TRUSTED CHOICE
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Approved & Trusted by <br className="hidden md:block"/>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Shopkeepers</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            We stand beside those who build their dreams everyday, making every sale smoother and business management stress-free.
          </p>
        </motion.div>
      </div>

      {/* Seamless Infinite Marquee */}
      <div className="relative flex overflow-hidden group">
        <div className="flex gap-8 animate-marquee whitespace-nowrap py-10">
          {duplicatedImages.map((src, i) => (
            <div
              key={`image-${i}`}
              className="flex-shrink-0 transition-transform duration-500 hover:scale-105"
            >
              <SmartphoneMockup src={src} alt={`Zomato approved ${i + 1}`} />
            </div>
          ))}
        </div>
        
        {/* Gradients to fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-[#030308] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-[#030308] to-transparent z-10 pointer-events-none" />
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

function SmartphoneMockup({ src, alt }) {
  return (
    <div className="w-54 md:w-70 relative group/phone">
      {/* Outer phone frame */}
      <div className="relative bg-[#0a0a10] rounded-[3.5rem] p-3 border-[8px] border-[#1a1a24] shadow-2xl overflow-hidden transition-all duration-500 group-hover/phone:shadow-blue-500/20">
        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30" />
        
        {/* Screen Content */}
        <div className="relative aspect-[9/18.5] rounded-[2.5rem] overflow-hidden bg-black">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover opacity-90 group-hover/phone:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

export default ZomatoApproved;
