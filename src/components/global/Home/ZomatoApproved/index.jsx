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
const duplicatedImages = [...zomatoImages, ...zomatoImages, ...zomatoImages];

const ZomatoApproved = () => {
  return (
    <section id="trust" className="relative pt-20 md:pt-32 pb-24 md:pb-40 overflow-hidden bg-white dark:bg-[#030308]">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 dark:bg-purple-600/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 mb-20 md:mb-28">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/20 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Trusted by 500+ Merchants
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight leading-[1.1]"
          >
            Approved & Trusted by <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-500">
              Shopkeepers
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Empowering modern businesses with seamless billing, inventory management, and 
            real-time insights. Join the revolution of smart retail.
          </motion.p>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="relative py-10">
        <div className="flex overflow-hidden group select-none">
          <div className="flex gap-6 md:gap-10 animate-marquee whitespace-nowrap">
            {duplicatedImages.map((src, i) => (
              <div
                key={`image-${i}`}
                className="flex-shrink-0 transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2"
              >
                <SmartphoneMockup src={src} alt={`Kravy POS interface ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Side Overlays for smooth fading */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-white dark:from-[#030308] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-white dark:from-[#030308] to-transparent z-20 pointer-events-none" />
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-33.333% - 1.33rem)); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
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
    <div className="w-56 md:w-80 relative">
      {/* Modern iPhone Mockup */}
      <div className="relative p-[10px] bg-[#1a1a24] rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/5 overflow-hidden">
        {/* Bezel details */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-[#1a1a24] rounded-b-2xl z-30" />
        
        {/* Internal Screen */}
        <div className="relative aspect-[9/19.5] rounded-[2.5rem] overflow-hidden bg-black ring-1 ring-white/10">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover opacity-95 hover:opacity-100 transition-opacity duration-500"
          />
          
          {/* Screen Glare */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50" />
          
          {/* Subtle Bottom Bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/20 rounded-full z-20" />
        </div>

        {/* Reflective Edge */}
        <div className="absolute inset-0 rounded-[3rem] border-2 border-white/5 pointer-events-none" />
      </div>
      
      {/* Drop Shadow */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-black/20 dark:bg-black/40 blur-2xl rounded-full -z-10" />
    </div>
  );
}

export default ZomatoApproved;

