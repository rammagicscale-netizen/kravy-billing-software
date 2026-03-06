"use client";

import React from "react";
import Home from "@/components/global/Home";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/global/animated-background";
import PlanBanner from "@/components/global/PlanBanner";

export default function Page() {
  return (
    <div className="relative bg-white dark:bg-[#0a0a1a] flex flex-col items-center justify-center overflow-hidden">
      <AnimatedBackground />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative z-10 max-w-7xl w-full mx-auto px-2 md:px-4"
      >
        {/* Hero / main section */}
        <Home />

        {/* Plan banner section */}
        <div className="mt-12">
          {/* <PlanBanner /> */}
        </div>
      </motion.div>
    </div>
  );
}
