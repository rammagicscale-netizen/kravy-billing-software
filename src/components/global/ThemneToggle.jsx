"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until component is mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // While not mounted, render a neutral icon so server and client match
  if (!mounted) {
    return (
      <button
        className="p-2 rounded-full border border-border/40 flex items-center justify-center"
        aria-label="Toggle theme"
      >
        <Moon className="w-5 h-5 opacity-0" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-full border border-border/40 flex items-center justify-center"
      whileHover={{ scale: 1.05 }}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </motion.button>
  );
}
