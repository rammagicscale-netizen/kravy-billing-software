"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EnquiryModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Always show popup on every page load (after small delay)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const timer = setTimeout(() => setOpen(true), 1800); // 1.8s delay
    return () => clearTimeout(timer);
  }, []);

  const validatePhone = (value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length === 10; // simple Indian 10-digit check
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validatePhone(phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          source: "popup",
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit. Try again.");
      }

      setSuccess("Thanks! We’ll contact you shortly.");

      setTimeout(() => {
        setOpen(false);
      }, 1400);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-24 md:pt-32"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {/* Floating card wrapper for subtle float animation */}
            <motion.div
              className="w-full max-w-md"
              initial={{ y: 6 }}
              animate={{ y: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 14,
              }}
            >
              <div className="relative">
                {/* Glow / gradient border */}
                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-green-400/60 via-emerald-400/50 to-sky-400/60 blur-[2px] opacity-70" />

                {/* Card */}
                <div className="relative rounded-3xl bg-white/95 dark:bg-[#050816] border border-white/60 dark:border-white/10 shadow-2xl px-5 py-5 md:px-6 md:py-6">
                  {/* Badge + close */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-green-50 text-green-700 dark:bg-emerald-500/15 dark:text-emerald-200 px-2.5 py-1 text-[10px] font-medium">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                        </span>
                        Limited onboarding slots
                      </div>
                      <h2 className="mt-2 text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                        Want Kravy for your shop?
                      </h2>
                      <p className="mt-1 text-xs md:text-[13px] text-gray-600 dark:text-gray-300">
                        Share your details and our team will call you with{" "}
                        <span className="font-medium">pricing, demo</span> and the
                        best plan for your business.
                      </p>
                    </div>

                    <button
                      onClick={() => setOpen(false)}
                      className="ml-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm rounded-full p-1 hover:bg-gray-100/80 dark:hover:bg-white/5"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3 mt-2">
                    {/* Name */}
                    <div>
                      <label className="text-[11px] font-medium text-gray-700 dark:text-gray-300">
                        Name (optional)
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="mt-1 w-full rounded-xl border border-gray-200/80 dark:border-white/10 bg-white/90 dark:bg-white/5 px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-[11px] font-medium text-gray-700 dark:text-gray-300">
                        Mobile Number
                      </label>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="inline-flex items-center rounded-xl border border-gray-200/80 dark:border-white/10 bg-gray-50/70 dark:bg-white/5 px-2.5 py-2 text-[11px] text-gray-600 dark:text-gray-200">
                          +91
                        </span>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="10-digit mobile number"
                          className="flex-1 rounded-xl border border-gray-200/80 dark:border-white/10 bg-white/90 dark:bg-white/5 px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    {/* Status */}
                    <div className="min-h-[18px]">
                      {error && (
                        <p className="text-[11px] text-red-500">
                          {error}
                        </p>
                      )}
                      {success && (
                        <p className="text-[11px] text-green-500">
                          {success}
                        </p>
                      )}
                    </div>

                    {/* Button */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white text-sm font-semibold py-2.5 rounded-xl shadow-md shadow-green-500/20 disabled:shadow-none transition"
                    >
                      {loading ? (
                        <>
                          <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>Get Callback</>
                      )}
                    </motion.button>

                    <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center leading-relaxed">
                      We respect your privacy. Your number will only be used for{" "}
                      <span className="font-medium">Kravy product communication</span>.
                      No spam, ever.
                    </p>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
