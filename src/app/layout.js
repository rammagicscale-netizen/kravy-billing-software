import { Poppins } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/global/AppShell";
import Header from "@/components/global/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/context/CartContext";

import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// 👇 New import for WhatsApp bubble
import WhatsAppBubble from "@/components/global/WhatsAppBubble";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Kravy – Smart Billing Software for Restaurants & Shops",
  description:
    "Kravy provides a complete billing solution with both hardware (thermal printer) and software subscription — built for restaurants and small businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <ThemeProvider defaultTheme="dark" storageKey="kravy-theme">
          <CartProvider>
            <Header />
            <AppShell>
              <main className="pt-24">{children}</main>
            </AppShell>

            {/* 👇 WhatsApp floating bubble */}
            <WhatsAppBubble />
          </CartProvider>
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />

        {/* Scripts */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DDZXQ7G4VW"
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DDZXQ7G4VW');
          `}
        </Script>
      </body>
    </html>
  );
}
