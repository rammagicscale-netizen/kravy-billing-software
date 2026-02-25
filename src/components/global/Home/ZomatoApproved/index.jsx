"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

// IMAGES (original format)
const zomatoImages = [
  "/assets/sh1.png",
  "/assets/sh2.png",
  "/assets/sh3.png",
  "/assets/sh4.png",
  "/assets/setup1.png",
  "/assets/setup2.png",
  "/assets/setup3.png",
  "/assets/setup4.png",
];

// REELS (local videos + cover images)
const instagramReels = [
  {
    cover: "/assets/reels/reel1.jpg",
    video: "/assets/reels/reel1.mp4",
  },
  {
    cover: "/assets/reels/reel2.jpg",
    video: "/assets/reels/reel2.mp4",
  },
  {
    cover: "/assets/reels/reel3.jpg",
    video: "/assets/reels/reel3.mp4",
  },
  {
    cover: "/assets/reels/reel4.jpg",
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
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-5">
          Approved & Trusted by Shopkeepers
        </h2>
        <p className="text-md text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Trusted by shopkeepers who open their shops with faith each morning.
          We stand beside them, making every sale smoother and stress-free.
        </p>
      </motion.div>

      {/* Mobile Carousel (original image style) */}
      <MobileCarousel zomatoImages={zomatoImages} />

      {/* Desktop / Tablet: original horizontal scroll with images only */}
      <div className="hidden sm:flex gap-6 overflow-x-auto pb-4 mx-2 snap-x snap-mandatory scroll-smooth items-center">
        {zomatoImages.map((src, i) => (
          <motion.div
            key={`d-${i}`}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="cursor-pointer py-0 flex-shrink-0 snap-center w-64 md:w-72 lg:w-80"
          >
            <Card className="w-full group rounded-2xl border border-neutral-200 dark:border-neutral-700 p-0 overflow-hidden backdrop-blur-xl bg-white/60 dark:bg-[#10101a]/70 shadow-md transition-all duration-300">
              <div className="relative h-[500px]">
                <img
                  src={src}
                  alt={`Zomato approved ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            </Card>
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
        root: null, // viewport
        threshold: 0.3, // section visible at least 30%
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
      className="mb-10"
    >
      <h2 className="text-2xl md:text-4xl font-bold mb-5 text-center text-gray-900 dark:text-white">
        Instagram Reels Showcase
      </h2>

      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 px-2">
        {reels.map((reel, i) => (
          <div
            key={`reel-${i}`}
            className="snap-center flex-shrink-0 w-64 md:w-72 lg:w-80"
          >
            <ReelCard reel={reel} sectionVisible={sectionVisible} />
          </div>
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

  // When section visibility changes, control autoplay
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
      // Section not visible OR user paused
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
      // user explicitly paused
      video.pause();
      setUserPaused(true);
      setIsPlaying(false);
    } else {
      // user explicitly played
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
    <div
      onDoubleClick={handleDoubleClick}
      className="p-[2px] rounded-[36px] bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-400"
    >
      <Card
        className="group relative rounded-[32px] overflow-hidden 
        bg-black/80 outline outline-2 outline-black/60 
        shadow-[0_26px_70px_rgba(0,0,0,0.7)]
        transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_32px_90px_rgba(0,0,0,0.85)] cursor-pointer"
      >
        <div className="h-[500px] relative overflow-hidden">
          {/* COVER IMAGE */}
          <img
            src={reel.cover}
            alt="Reel cover"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300
            ${isPlaying ? "opacity-0" : "opacity-100"} group-hover:scale-105`}
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
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300
              ${isPlaying ? "opacity-100" : "opacity-0"} group-hover:scale-105`}
            />
          )}

          {/* LOADING SPINNER */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-10 h-10 rounded-full border-2 border-white/40 border-t-transparent animate-spin" />
            </div>
          )}

          {/* Dark gradient when only cover */}
          {!isPlaying && !isLoading && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
          )}

          {/* Play icon hint when not playing */}
          {!isPlaying && !isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
              <div className="w-16 h-16 rounded-full border border-white/80 flex items-center justify-center bg-black/40 backdrop-blur-md shadow-lg">
                <div className="ml-1 w-0 h-0 border-t-[12px] border-b-[12px] border-l-[20px] border-l-white border-t-transparent border-b-transparent" />
              </div>
            </div>
          )}

          {/* Double-tap heart animation */}
          {showHeart && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <svg
                className="w-20 h-20 text-red-500 opacity-90 animate-ping"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
                4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 
                14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          )}

          {/* Reel Badge */}
          <div className="absolute top-3 left-3 px-3 py-1 text-[10px] rounded-full bg-black/75 text-white shadow flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Reel
          </div>

          {/* Bottom controls: Play/Pause + Mute */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20">
            {/* Play / Pause button */}
            <button
              onClick={togglePlayPause}
              className="rounded-full bg-black/70 text-white px-3 py-1.5 text-[11px] flex items-center gap-1 backdrop-blur-md"
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
            </button>

            {/* Sound toggle */}
            {reel.video && (
              <button
                onClick={toggleMute}
                className="rounded-full bg-black/70 text-white px-2.5 py-1.5 text-[11px] flex items-center gap-1 backdrop-blur-md"
              >
                {isMuted ? (
                  <>
                    <span>🔇</span>
                    <span>Sound off</span>
                  </>
                ) : (
                  <>
                    <span>🔊</span>
                    <span>Sound on</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

/* =====================================================
   MOBILE CAROUSEL (original image format)
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
        className="sm:hidden flex gap-4 overflow-x-auto pb-4 mx-2 snap-x snap-mandatory scroll-smooth"
      >
        {zomatoImages.map((src, i) => (
          <motion.div
            key={`m-${i}`}
            data-index={i}
            ref={(el) => (itemRefs.current[i] = el)}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="cursor-pointer py-0 flex-shrink-0 snap-center"
          >
            <Card className="w-56 group rounded-2xl border border-neutral-200 dark:border-neutral-700 p-0 overflow-hidden backdrop-blur-xl bg-white/60 dark:bg-[#10101a]/70 shadow-md transition-all duration-300">
              <div className="relative h-[500px]">
                <img
                  src={src}
                  alt={`Zomato approved ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Dots */}
      <div className="sm:hidden flex items-center justify-center gap-2 mt-2">
        {zomatoImages.map((_, i) => (
          <button
            key={`dot-${i}`}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${active === i
                ? "bg-neutral-900 dark:bg-white"
                : "bg-neutral-300 dark:bg-neutral-600"
              }`}
          />
        ))}
      </div>
    </>
  );
}
