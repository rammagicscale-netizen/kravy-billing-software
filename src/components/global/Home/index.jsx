"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { GradientText } from "../GradientTextButton/GradientText";
import { Video } from "./Video";
import PricingSection from "./Pricing";
import Faqs from "./Faqs";
import Testimonials from "./Reviews";
import WhyChooseUs from "./whyChooseUs";
import AboutPlatform from "./AboutThisPlatform";

import OutletCompare from "./OutletCompare";
import MasonryGallery from "../galllery";
import ZomatoApproved from "./ZomatoApproved";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="pb-16 w-full text-neutral-900 dark:text-white transition-colors duration-300">
      <div className="w-full px-4 text-center pt-20 bg-grid bg-grid-dark flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <GradientText />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl w-full sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white"
        >
          Tired of Billing {" "}
          <span className="text-red-500 underline">Do Effortless Billing </span>
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            <br />
            With Us
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-md md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl"
        >
          Kravy Billing Software: Simplify Your Invoicing in 3 Clicks.
          From Order to Invoice in Seconds — Kravy Billing Made Simple
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-10 flex gap-4 flex-wrap justify-center"
        >
          {/* <a href="#gallery">
            <button className="border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-3 rounded-xl transition-all shadow-sm">
              View
            </button>
          </a> */}
          {/* Button hidden as requested */}
          <a
            href="https://kravy-pos-website.vercel.app/"
            target="_blank"
            className="hidden group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl 
  bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 
  px-7 py-3.5 font-semibold text-white transition-all duration-300 
  shadow-md hover:shadow-lg hover:scale-[1.04] active:scale-[0.97]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Try Now
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
    bg-gradient-to-r from-emerald-600 to-green-700 blur-xl"
            />
          </a>
        </motion.div>
      </div>

      <div className="mt-12 md:mt-20 px-4">
        <Video />
      </div>

      {/* <MasonryGallery /> */}

      <ZomatoApproved />


      <OutletCompare />
      <WhyChooseUs />
      <AboutPlatform />
      <PricingSection />
      <Testimonials />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-20 px-4"
      >
        <div className="max-w-6xl mx-auto rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 md:p-10 backdrop-blur-lg shadow-lg dark:shadow-black/20 bg-white/60 dark:bg-[#10101a]/70">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="md:w-2/3 text-neutral-700 dark:text-neutral-300 text-md leading-relaxed">
              Boost your Sales with kravy, professionally curated to elevate your
              shop and drive more customers
            </p>

            <Link
              href="#pricing"
              className="flex justify-center w-full md:w-auto items-center px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-200 shadow-md hover:scale-[1.02]"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-12"
      >
        <Faqs />
      </motion.div>
    </div>
  );
}
