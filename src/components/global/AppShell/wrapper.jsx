//src/components/global/AppShell/wrapper.jsx
"use client";

import { useEffect } from "react";
import AppShell from "./index";

export default function AppShellWrapper({ children }) {
  useEffect(() => {
    // Polyfill localStorage to prevent SSR errors
    if (typeof window !== "undefined" && !window.localStorage) {
      const store = {};
      window.localStorage = {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
          store[key] = String(value);
        },
        removeItem: (key) => {
          delete store[key];
        },
        clear: () => {
          Object.keys(store).forEach((key) => delete store[key]);
        },
      };
    }
  }, []);

  return <AppShell>{children}</AppShell>;
}
