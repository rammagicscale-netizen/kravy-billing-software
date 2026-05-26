import React from "react";
import Template from "@/components/global/template";
import Link from "next/link";
import { Compass } from "lucide-react";
import { COMPANY } from "@/constants";

export const metadata = {
  title: `Sitemap | ${COMPANY.NAME}`,
  description: `Navigate through the Kravy billing software website easily. Find direct links to our features, pricing, support, and company information.`,
  keywords: [
    COMPANY.NAME,
    "Sitemap",
    "Website Navigation",
    "Billing Software Links",
    "POS System Sitemap",
  ],
  openGraph: {
    title: `Sitemap | ${COMPANY.NAME}`,
    description: `Easily find your way around the Kravy platform with our comprehensive site map.`,
    url: `${COMPANY.DOMAIN}/sitemap`,
    type: "website",
    images: [
      {
        url: COMPANY.OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${COMPANY.NAME} Sitemap`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Sitemap | ${COMPANY.NAME}`,
    description: `Easily find your way around the Kravy platform with our comprehensive site map.`,
    images: [COMPANY.OG_IMAGE],
  },
};

const SITEMAP_INFO = [
  {
    title: "Core Pages",
    description: "Access the main areas of the Kravy platform.",
    content: (
      <ul className="space-y-2 mt-2">
        <li>
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-sm">
            Home Page
          </Link>
          <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
            Kravy main page, featuring 3-click billing details, testimonials, and platform overview.
          </span>
        </li>
        <li>
          <Link href="/about" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-sm">
            About Us
          </Link>
          <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
            Learn more about our team, goals, vision, and mission to revolutionize POS billing.
          </span>
        </li>
        <li>
          <Link href="/pricing" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-sm">
            Pricing Plans
          </Link>
          <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
            Affordable monthly and annual plans tailored for food trucks, cafes, and multi-outlet restaurants.
          </span>
        </li>
        <li>
          <Link href="/updates" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-sm">
            Product Updates
          </Link>
          <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
            Stay in the loop with our latest features, design upgrades, and POS software patches.
          </span>
        </li>
      </ul>
    ),
  },
  {
    title: "Support & FAQs",
    description: "Find solutions, ask questions, or report technical difficulties.",
    content: (
      <ul className="space-y-2 mt-2">
        <li>
          <Link href="/faqs" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-sm">
            Frequently Asked Questions
          </Link>
          <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
            Got questions about integrations, security, or custom hardware setup? Find answers instantly.
          </span>
        </li>
        <li>
          <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-sm">
            Contact Support
          </Link>
          <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
            Get in touch with our product experts, customer service, or request a custom billing consultation.
          </span>
        </li>
        <li>
          <Link href="/report-issue" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-sm">
            Report an Issue
          </Link>
          <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
            Encountered a bug or error? Let us know so we can fix it for you immediately.
          </span>
        </li>
      </ul>
    ),
  },
  {
    title: "Legal & Compliance",
    description: "Read our regulatory policies, user terms, and legal terms.",
    content: (
      <ul className="space-y-2 mt-2">
        <li>
          <Link href="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-sm">
            Privacy Policy
          </Link>
          <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
            Read about how we collect, encrypt, use, and protect your store and customer records.
          </span>
        </li>
        <li>
          <Link href="/terms-and-conditions" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-sm">
            Terms of Service
          </Link>
          <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
            The legal terms governing your use of our billing applications and cloud dashboards.
          </span>
        </li>
        <li>
          <Link href="/cancellation-and-refund-policy" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-sm">
            Refund & Cancellation Policy
          </Link>
          <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
            Information about subscription cancellations, automatic renewals, and refund eligibility.
          </span>
        </li>
        <li>
          <Link href="/delete-account" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-sm">
            Delete Account
          </Link>
          <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
            Request the closure of your Kravy account and deletion of your personal and business data.
          </span>
        </li>
      </ul>
    ),
  },
  {
    title: "Insights & Resources",
    description: "Explore our helpful resources and manage your orders.",
    content: (
      <ul className="space-y-2 mt-2">
        <li>
          <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-sm">
            Official Blog
          </Link>
          <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
            Tips on maximizing restaurant sales, running a retail outlet, and leveraging modern POS technology.
          </span>
        </li>
        <li>
          <Link href="/orders" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-sm">
            Track Orders
          </Link>
          <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
            Track hardware orders (like printers or scanners) or check subscription payment status.
          </span>
        </li>
      </ul>
    ),
  },
];

const SITEMAP_CONTACT = {
  title: "Can't Find What You're Looking For?",
  description:
    "If you are looking for a specific page, feature, or customized solution that is not listed here, please contact us.",
  content: (
    <div>
      <p className="mb-4">
        Our customer support representatives are available 24/7 to guide you through the platform or help you get a custom setup.
      </p>
      <p>
        Email Support:{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.SUPPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
        >
          {COMPANY.EMAIL.SUPPORT}
        </a>
        <br />
        Call/WhatsApp:{" "}
        <a
          href={`tel:${COMPANY.PHONE}`}
          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
        >
          {COMPANY.PHONE}
        </a>
      </p>
    </div>
  ),
};

export default function SitemapPage() {
  return (
    <Template
      title="Sitemap"
      heading={
        <div>
          Explore All Pages <br className="hidden sm:block" /> and Resources on Kravy
        </div>
      }
      description="Easily navigate through our website to find billing software features, pricing, blogs, policies, and helpful customer support channels."
      ctaDescription="Have custom requirements or need help getting started with our POS? Reach out to our billing team."
      ctaLink="/contact"
      ctaButton={
        <span className="flex items-center gap-2">
          <Compass className="w-4 h-4" />
          Navigate to Contact
        </span>
      }
      infoData={SITEMAP_INFO}
      contactData={SITEMAP_CONTACT}
    />
  );
}
