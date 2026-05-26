import React from "react";
import Link from "next/link";
import { Compass, ShieldCheck, Zap, HelpCircle } from "lucide-react";
import Template from "@/components/global/template";
import { COMPANY } from "@/constants";

export const metadata = {
  title: `Sitemap - ${COMPANY.NAME}`,
  description: `Find all the pages, resources, features, and legal policies of ${COMPANY.NAME} Billing Software.`,
  keywords: [
    COMPANY.NAME,
    "Sitemap",
    "Billing Software",
    "POS System",
    "All Pages",
  ],
  authors: [{ name: `${COMPANY.NAME} Team`, url: COMPANY.DOMAIN }],
  openGraph: {
    title: `Sitemap - ${COMPANY.NAME}`,
    description: `Find all the pages, resources, features, and legal policies of ${COMPANY.NAME} Billing Software.`,
    url: `${COMPANY.DOMAIN}/sitemap`,
    siteName: COMPANY.NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Sitemap - ${COMPANY.NAME}`,
    description: `Find all the pages, resources, features, and legal policies of ${COMPANY.NAME} Billing Software.`,
  },
};

const sitemapData = [
  {
    title: "Main Navigation",
    description: "Explore the primary pages and sections of the Kravy platform.",
    icon: <Compass className="w-6 h-6 text-green-500" />,
    content: (
      <ul className="space-y-3 font-medium">
        <li>
          <Link href="/" className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2">
            <span>•</span> Home Page
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2">
            <span>•</span> About Us
          </Link>
        </li>
        <li>
          <Link href="/pricing" className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2">
            <span>•</span> Software Pricing
          </Link>
        </li>
        <li>
          <Link href="/updates" className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2">
            <span>•</span> Product Updates
          </Link>
        </li>
        <li>
          <Link href="/blog" className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2">
            <span>•</span> Blog & Resources
          </Link>
        </li>
      </ul>
    ),
  },
  {
    title: "Features & Sections",
    description: "Discover our high-tech capabilities built to simplify your business operations.",
    icon: <Zap className="w-6 h-6 text-green-500" />,
    content: (
      <ul className="space-y-3 font-medium">
        <li>
          <Link href="/#features" className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2">
            <span>•</span> 3-Click Easy Billing
          </Link>
        </li>
        <li>
          <Link href="/#features" className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2">
            <span>•</span> Real-Time Sales Analytics
          </Link>
        </li>
        <li>
          <Link href="/#features" className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2">
            <span>•</span> Cloud Inventory Management
          </Link>
        </li>
        <li>
          <Link href="/#features" className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2">
            <span>•</span> QR Code Table Ordering
          </Link>
        </li>
        <li>
          <Link href="/orders" className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2">
            <span>•</span> Order Tracking
          </Link>
        </li>
      </ul>
    ),
  },
  {
    title: "Legal & Policies",
    description: "Read our rules, user guidelines, and transparency policies.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <ul className="space-y-3 font-medium">
        <li>
          <Link href="/privacy-policy" className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2">
            <span>•</span> Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/terms-and-conditions" className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2">
            <span>•</span> Terms & Conditions
          </Link>
        </li>
        <li>
          <Link href="/cancellation-and-refund-policy" className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2">
            <span>•</span> Refund & Cancellation Policy
          </Link>
        </li>
        <li>
          <Link href="/disclaimer" className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2">
            <span>•</span> Disclaimer
          </Link>
        </li>
        <li>
          <Link href="/delete-account" className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2">
            <span>•</span> Account Deletion
          </Link>
        </li>
      </ul>
    ),
  },
  {
    title: "Support & Assistance",
    description: "Get assistance, resolve query issues, or connect with our specialized team.",
    icon: <HelpCircle className="w-6 h-6 text-green-500" />,
    content: (
      <ul className="space-y-3 font-medium">
        <li>
          <Link href="/faqs" className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2">
            <span>•</span> FAQ Center
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2">
            <span>•</span> Contact Support
          </Link>
        </li>
        <li>
          <Link href="/report-issue" className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2">
            <span>•</span> Report an Issue
          </Link>
        </li>
        <li>
          <a href={`mailto:${COMPANY.EMAIL.SUPPORT}`} className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2">
            <span>•</span> Email: {COMPANY.EMAIL.SUPPORT}
          </a>
        </li>
        <li>
          <a href={`tel:${COMPANY.PHONE}`} className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2">
            <span>•</span> Call: {COMPANY.PHONE}
          </a>
        </li>
      </ul>
    ),
  },
];

const contactData = {
  title: "Looking for something specific?",
  description: "Our dedicated support desk is available to assist you with customized configurations or other concerns.",
  content: (
    <div>
      <p className="mb-4">
        You can email us directly at{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.SUPPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2 font-semibold"
        >
          {COMPANY.EMAIL.SUPPORT}
        </a>{" "}
        or call us at{" "}
        <a
          href={`tel:${COMPANY.PHONE}`}
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2 font-semibold"
        >
          {COMPANY.PHONE}
        </a>.
      </p>
      <p>
        Our business office is situated at {COMPANY.ADDRESS}. We operate from {COMPANY.WORKING_HOURS} to ensure high-uptime software operations for your business.
      </p>
    </div>
  ),
};

const SitemapPage = () => {
  return (
    <Template
      title="Sitemap"
      heading={
        <div>
          Kravy Platform <br className="hidden sm:block" /> Sitemap & Directory
        </div>
      }
      description="Easy navigation to all parts of our billing software website. Access legal terms, features, and main links quickly."
      ctaDescription={`Looking for a reliable billing partner for your restaurant or cafe? Activate ${COMPANY.NAME} POS system today.`}
      ctaLink="/contact"
      ctaButton={
        <span className="flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Request a Demo
        </span>
      }
      infoData={sitemapData}
      contactData={contactData}
    />
  );
};

export default SitemapPage;
