"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import QRCode from "qrcode";

const PLAY_STORE_LINK = "https://play.google.com/store/apps/details?id=com.vikas9095.kravy";

const AppDownload = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    QRCode.toDataURL(PLAY_STORE_LINK, {
      width: 512,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
      errorCorrectionLevel: 'H'
    }).then(setQrCodeUrl);
  }, []);

  return (
    <section className="py-10 px-4 md:px-6 lg:px-8 overflow-hidden bg-white dark:bg-[#030308]">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 dark:from-blue-950/10 dark:via-[#080810] dark:to-indigo-950/10 border border-blue-100 dark:border-blue-900/20 p-6 md:p-8 lg:p-10 overflow-hidden shadow-xl">
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-400/5 dark:bg-blue-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-400/5 dark:bg-indigo-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-16">
            
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4"
              >
                <span className="px-3 py-1 bg-blue-500/10 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-800/50 rounded-full text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">
                  Available on Play Store
                </span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight"
              >
                Download the <br className="hidden lg:block"/>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Kravy App</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-md md:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed"
              >
                Take your business everywhere. Smart billing, 
                real-time tracking, and effortless management in your pocket.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap justify-center md:justify-start gap-4"
              >
                <a 
                  href={PLAY_STORE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative transition-transform hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-blue-500/10 blur-lg group-hover:bg-blue-500/20 transition-all rounded-lg" />
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play" 
                    className="relative h-12 w-auto"
                  />
                </a>
              </motion.div>
            </div>

            {/* Right Mockup */}
            <div className="flex-1 relative flex justify-center md:justify-end self-end h-[350px] md:h-[450px]">
              <motion.div
                initial={{ opacity: 0, y: 120 }}
                whileInView={{ opacity: 1, y: 60 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-[320px] md:w-[400px]"
              >
                {/* Side Buttons for Realism */}
                <div className="absolute left-[-2px] top-32 w-[3px] h-12 bg-gray-800 rounded-l-md z-10" />
                <div className="absolute left-[-2px] top-48 w-[3px] h-12 bg-gray-800 rounded-l-md z-10" />
                <div className="absolute right-[-2px] top-40 w-[3px] h-16 bg-gray-800 rounded-r-md z-10" />

                {/* Smartphone Mockup Frame */}
                <div className="relative bg-gradient-to-b from-[#1a1a24] to-[#0a0a10] rounded-t-[3.8rem] p-2.5 md:p-3 border-[10px] border-b-0 border-[#1a1a24] shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.4)] overflow-hidden h-[650px]">
                  
                  {/* Glass Reflection Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none z-20" />
                  
                  {/* Dynamic Island */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-30 flex items-center justify-end px-3">
                    <div className="w-1.5 h-1.5 bg-[#1a1a24] rounded-full" />
                  </div>
                  
                  {/* Screen Content */}
                  <div className="relative h-full w-full rounded-t-[3rem] overflow-hidden bg-white flex flex-col items-center pt-12 md:pt-14 px-8 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-6 md:mb-8"
                    >
                      <p className="text-gray-500 text-xs md:text-sm font-bold mb-1.5 uppercase tracking-tighter">Scan the QR code to</p>
                      <p className="text-gray-900 font-black text-xl md:text-2xl tracking-tight">download the app</p>
                    </motion.div>
                    
                    {qrCodeUrl && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="relative p-3.5 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 group cursor-pointer"
                        onClick={() => window.open(PLAY_STORE_LINK, '_blank')}
                      >
                        <img src={qrCodeUrl} alt="Kravy App QR Code" className="w-44 h-44 md:w-56 md:h-56" />
                        
                        {/* QR Center Logo */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                           <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-50 p-2">
                             <img src="/logo.png" alt="Kravy Logo" className="w-full h-full object-contain" />
                           </div>
                        </div>
                        
                        {/* Interactive scan hint */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-white text-[9px] font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-xl">
                            CLICK TO OPEN
                        </div>
                      </motion.div>
                    )}

                    <div className="mt-10 md:mt-12 flex flex-col items-center gap-2.5">
                        <div className="flex gap-1">
                            {[1,2,3,4,5].map(i => (
                                <span key={i} className="text-yellow-400 text-xs">★</span>
                            ))}
                        </div>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">
                            Trusted by 10k+ users
                        </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
