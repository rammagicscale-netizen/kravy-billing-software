"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

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

// REELS (local videos + cover images)
const instagramReels = [
  {
    video: "/assets/reels/reel1.mp4",
  },
  {
    video: "/assets/reels/reel2.mp4",
  },
  {
    video: "/assets/reels/reel3.mp4",
  },
  {
    video: "/assets/reels/reel4.mp4",
  },
];

const ZomatoApproved = () => {
  return (
    <section className="relative py-10 px-3 md:py-14 overflow-hidden">
      {/* Background blur */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/3 w-[700px] h-[700px] bg-purple-300/30 dark:bg-purple-800/20 rounded-md blur-[160px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-300/20 dark:bg-indigo-700/10 rounded-md blur-[120px]" />
      </div>

      {/* ==========================
          INSTAGRAM REELS SHOWCASE
      =========================== */}
      <ReelsShowcase reels={instagramReels} />

      {/* ==========================
          APPROVED & TRUSTED SECTION
          (images only, original layout)
      =========================== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <div className="inline-block mb-4">
          <span className="px-4 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-full text-xs font-semibold text-blue-600 dark:text-blue-400 backdrop-blur-sm">
            ✨ TRUSTED CHOICE
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
          Approved & Trusted by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Shopkeepers</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
          Trusted by shopkeepers who open their shops with faith each morning.
          We stand beside them, making every sale smoother and stress-free.
        </p>
      </motion.div>

      {/* Mobile Carousel (smartphone mockup style) */}
      <MobileCarousel zomatoImages={zomatoImages} />

      {/* Desktop / Tablet: horizontal scroll with smartphone mockups */}
      <div className="hidden sm:flex gap-8 overflow-x-auto pb-6 px-4 snap-x snap-mandatory scroll-smooth items-center justify-start">
        {zomatoImages.map((src, i) => (
          <motion.div
            key={`d-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="flex-shrink-0 snap-center transform transition-all duration-300 hover:shadow-2xl"
          >
            <SmartphoneMockup src={src} alt={`Zomato approved ${i + 1}`} />
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      {/* <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-10"
      >
        <div className="mx-auto rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 md:p-10 backdrop-blur-lg shadow-lg dark:shadow-black/20 bg-white/60 dark:bg-[#10101a]/70">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="md:w-2/3 text-neutral-700 dark:text-neutral-300 text-md leading-relaxed">
              Boost your restaurant operations with Kravy Billing Software — built to streamline billing, 
              manage orders faster, and improve overall efficiency. 
              Professionally designed tools help you run your business smoothly
            </p>

            <motion.a
              href="https://kravy-pos-website.vercel.app/"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex md:w-[150px] justify-center
               w-full text-center items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              Boost Now
            </motion.a>
          </div>
        </div>
      </motion.div> */}
    </section>
  );
};

export default ZomatoApproved;

/* =====================================================
   REELS SHOWCASE
   - Detect if whole section is visible in viewport
   - When visible => all reels auto-play (muted)
   - When not visible => all reels pause + reset
===================================================== */

function ReelsShowcase({ reels }) {
  const sectionRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setSectionVisible(entry.isIntersecting);
        });
      },
      {
        root: null,
        threshold: 0.3,
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-24"
    >
      <div className="text-center mb-12">
        <div className="inline-block mb-3">
          <span className="px-4 py-1.5 bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-400/20 rounded-full text-xs font-semibold text-pink-600 dark:text-pink-400 backdrop-blur-sm">
            📱 LIVE SHOWCASE
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Instagram Reels Showcase
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Watch our latest content in action</p>
      </div>

      <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 px-4">
        {reels.map((reel, i) => (
          <motion.div
            key={`reel-${i}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="snap-center flex-shrink-0 w-64 md:w-72 lg:w-80"
          >
            <ReelCard reel={reel} sectionVisible={sectionVisible} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* =====================================================
   REEL CARD
   - Auto-play when sectionVisible = true
   - Pause + reset when sectionVisible = false
   - Independent Play/Pause button
   - Independent Mute/Unmute per reel
   - Cover → video fade (no black screen)
   - Gradient border + smooth hover zoom
===================================================== */

function ReelCard({ reel, sectionVisible }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !reel.video) return;

    if (sectionVisible && !userPaused) {
      setIsLoading(true);
      video.muted = isMuted;
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch(() => {
          setIsPlaying(false);
          setIsLoading(false);
        });
    } else {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
      setIsLoading(false);
    }
  }, [sectionVisible, userPaused, isMuted, reel.video]);

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const togglePlayPause = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video || !reel.video) return;

    if (isPlaying) {
      video.pause();
      setUserPaused(true);
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      video.muted = isMuted;
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setUserPaused(false);
          setIsLoading(false);
        })
        .catch(() => {
          setIsPlaying(false);
          setIsLoading(false);
        });
    }
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 550);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  return (
    <motion.div
      onDoubleClick={handleDoubleClick}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative group"
    >
      {/* Glowing background effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 rounded-[28px] opacity-30 group-hover:opacity-50 blur-xl transition-all duration-300" />
      
      <div className="relative bg-gradient-to-br from-slate-900 to-black rounded-[28px] overflow-hidden shadow-2xl backdrop-blur-xl border border-white/5">
        <div className="h-[520px] relative overflow-hidden">
          {/* COVER IMAGE */}
          <img
            src={reel.cover}
            alt="Reel cover"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-300
            ${isPlaying ? "opacity-0" : "opacity-100"} group-hover:scale-110`}
          />

          {/* VIDEO */}
          {reel.video && (
            <video
              ref={videoRef}
              src={reel.video}
              muted={isMuted}
              playsInline
              poster={reel.cover}
              onCanPlay={handleCanPlay}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-300
              ${isPlaying ? "opacity-100" : "opacity-0"} group-hover:scale-110`}
            />
          )}

          {/* LOADING SPINNER */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/40 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full border-3 border-white/30 border-t-white animate-spin" />
            </div>
          )}

          {/* Dark gradient overlay */}
          {!isPlaying && !isLoading && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
          )}

          {/* Play icon hint */}
          {!isPlaying && !isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 rounded-full border-2 border-white/80 flex items-center justify-center bg-white/10 backdrop-blur-md shadow-2xl group-hover:scale-110 transition-transform"
              >
                <div className="ml-1 w-0 h-0 border-t-[10px] border-b-[10px] border-l-[16px] border-l-white border-t-transparent border-b-transparent" />
              </motion.div>
            </div>
          )}

          {/* Double-tap heart animation */}
          {showHeart && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <motion.svg
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="w-24 h-24 text-red-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </motion.svg>
            </div>
          )}

          {/* Premium Reel Badge */}
          <div className="absolute top-4 left-4 px-3.5 py-1.5 text-[11px] rounded-full bg-gradient-to-r from-pink-500/80 to-rose-500/80 text-white shadow-lg flex items-center gap-1.5 backdrop-blur-md border border-white/10 z-10 font-semibold">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Reel
          </div>

          {/* Bottom controls */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20 gap-3">
            {/* Play / Pause button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlayPause}
              className="rounded-full bg-white/20 hover:bg-white/30 text-white px-4 py-2 text-[12px] flex items-center gap-1.5 backdrop-blur-md border border-white/20 transition-all font-semibold"
            >
              {isPlaying ? (
                <>
                  <span>⏸</span>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <span>▶️</span>
                  <span>Play</span>
                </>
              )}
            </motion.button>

            {/* Sound toggle */}
            {reel.video && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMute}
                className="rounded-full bg-white/20 hover:bg-white/30 text-white px-3 py-2 text-[12px] flex items-center gap-1 backdrop-blur-md border border-white/20 transition-all"
              >
                {isMuted ? "🔇" : "🔊"}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* =====================================================
   SMARTPHONE MOCKUP COMPONENT (Premium Samsung S25)
===================================================== */

function SmartphoneMockup({ src, alt }) {
  return (
    <div className="w-64 md:w-72 lg:w-80 mx-auto">
      {/* Outer phone frame - Samsung S25 style */}
      <div className="relative bg-gradient-to-b from-slate-700 via-slate-800 to-black rounded-[50px] p-2.5 shadow-2xl"
        style={{
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.7), inset 0 0.5px 0 rgba(255, 255, 255, 0.08)"
        }}>
        
        {/* Matte edge finish */}
        <div className="absolute inset-0 rounded-[50px] bg-gradient-to-r from-white/3 to-transparent pointer-events-none z-10" />

        {/* Screen bezel - flat modern design */}
        <div className="relative bg-black rounded-[48px] overflow-hidden shadow-lg"
          style={{
            boxShadow: "inset 0 1px 4px rgba(0, 0, 0, 0.8)"
          }}>
          
          {/* Camera cutout - Samsung style pill-shaped cutout */}
          <div className="absolute top-3 right-5 w-32 h-9 bg-black/95 rounded-full z-20 flex items-center justify-center gap-3 shadow-lg border border-black/50">
            <div className="w-2.5 h-2.5 bg-slate-700 rounded-full" />
            <div className="w-2 h-2 bg-slate-800 rounded-full" />
          </div>

          {/* Screen content area */}
          <div className="relative pt-12 pb-4 px-0 bg-black">
            {/* Full screen image content - fitted to S25 viewport */}
            <div className="relative h-[475px] overflow-hidden bg-black">
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Subtle edge fade */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/3 via-transparent to-black/5 pointer-events-none" />
            </div>
          </div>

          {/* Bottom gesture area */}
          <div className="h-5 bg-black flex items-center justify-center">
            <div className="w-28 h-0.5 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>

      {/* Premium shadow beneath phone */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-52 h-10 bg-gradient-to-b from-black/15 to-transparent blur-2xl rounded-full" />
    </div>
  );
}

/* =====================================================
   MOBILE CAROUSEL (smartphone mockup style)
===================================================== */

function MobileCarousel({ zomatoImages }) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setActive(idx);
          }
        });
      },
      { root, threshold: 0.6 }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (idx) => {
    const el = itemRefs.current[idx];
    if (el && containerRef.current) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className="sm:hidden flex gap-6 overflow-x-auto pb-6 px-4 snap-x snap-mandatory scroll-smooth"
      >
        {zomatoImages.map((src, i) => (
          <motion.div
            key={`m-${i}`}
            data-index={i}
            ref={(el) => (itemRefs.current[i] = el)}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="cursor-pointer flex-shrink-0 snap-center transform transition-all duration-300"
          >
            <SmartphoneMockup src={src} alt={`Zomato approved ${i + 1}`} />
          </motion.div>
        ))}
      </div>

      {/* Modern Dot Indicators */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="sm:hidden flex items-center justify-center gap-3 mt-8"
      >
        {zomatoImages.map((_, i) => (
          <motion.button
            key={`dot-${i}`}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`transition-all duration-300 rounded-full ${
              active === i
                ? "w-8 h-2.5 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50"
                : "w-2.5 h-2.5 bg-gray-400 dark:bg-gray-600 hover:bg-gray-500"
            }`}
          />
        ))}
      </motion.div>
    </>
  );
}
