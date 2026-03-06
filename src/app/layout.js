import { Poppins } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/global/AppShell";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/context/CartContext";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import WhatsAppBubble from "@/components/global/WhatsAppBubble";  // ✅ Added

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Kravy – Smart Billing Software for Restaurants & Shops",
  description:
    "Kravy provides a smart billing software solution built for restaurants and small businesses to manage sales and invoices.",
  keywords: [
    "Kravy billing software",
    "restaurant billing app",
    "POS machine",
    "smart billing app",
    "shop billing software",
    "digital invoice system",
  ],
  openGraph: {
    title: "Kravy – Smart Billing Software for Restaurants & Shops",
    description:
      "A modern POS solution with cloud-based billing software. Simplify your sales, inventory, and invoices with Kravy.",
    url: "https://kravy.in",
    siteName: "Kravy",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kravy – Billing Made Easy",
    description:
      "Software solution for restaurants, cafés, and small shops. Fast setup and cloud-based billing.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <ThemeProvider defaultTheme="dark" storageKey="kravy-theme">
          <CartProvider>
            <AppShell>{children}</AppShell>

            {/* ✅ WhatsApp Floating Button */}
            <WhatsAppBubble />
          </CartProvider>
        </ThemeProvider>

        {/* Analytics */}
        <Analytics />
        <SpeedInsights />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DDZXQ7G4VW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DDZXQ7G4VW');
          `}
        </Script>

        {/* Meta / Facebook Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1674228269954185');
            fbq('track', 'PageView');
          `}
        </Script>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </body>
    </html>
  );
}
