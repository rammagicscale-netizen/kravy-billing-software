import PricingSection from "@/components/global/Home/Pricing";
import React from "react";
import { COMPANY } from "@/constants";

export const metadata = {
  title: `Pricing - ${COMPANY.name}`,
  description: `Explore ${COMPANY.name} pricing plans for our smart billing software designed to help businesses manage invoices, orders, and payments easily.`,
  keywords: [
    `${COMPANY.name} pricing`,
    "billing software pricing",
    "invoice management software",
    "POS billing system",
    "business billing solution",
  ],
  authors: [{ name: `${COMPANY.name} Team`, email: COMPANY.email }],
  robots: "index, follow",

  openGraph: {
    title: `Pricing - ${COMPANY.name}`,
    description: `Discover affordable billing software plans at ${COMPANY.name} to manage invoices, orders, and payments efficiently.`,
    url: `${COMPANY.url}/pricing`,
    type: "website",
    images: [
      {
        url: `${COMPANY.url}/logo.png`,
        width: 1200,
        height: 630,
        alt: `${COMPANY.name} Logo`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `Pricing - ${COMPANY.name}`,
    description: `Check pricing plans for ${COMPANY.name} billing software and simplify your business billing process.`,
  },
};

const PricingPage = () => {
  return (
    <div className="w-full bg-grid h-full flex items-center justify-center py-16">
      <PricingSection />
    </div>
  );
};

export default PricingPage;