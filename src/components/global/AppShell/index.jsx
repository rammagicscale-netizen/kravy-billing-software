
//src/components/global/AppShell/index.jsx
"use client";

import Header from "../Header";
import Footer from "../Footer";
import EnquiryModal from "../../EnquiryModal"; // ✅ Correct Path
import { usePathname } from "next/navigation";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isBridge = pathname === "/bridge";

  if (isBridge) {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <>
      {/* 🔔 Global Enquiry Popup (appears once per user) */}
      <EnquiryModal />

      {/* Global Header */}
      <Header />

      {/* Page content */}
      <div className="pt-12 min-h-screen">
        {children}
      </div>

      {/* Global Footer */}
      <Footer />
    </>
  );
}
``
