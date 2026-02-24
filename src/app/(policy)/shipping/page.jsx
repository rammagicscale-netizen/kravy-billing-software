import React from "react";
import { Headset, ShieldCheck, Trash2 } from "lucide-react";
import Template from "@/components/global/template";
import { COMPANY } from "@/constants";

export const metadata = {
  title: `Shipping & Delivery Policy | ${COMPANY.NAME}`,
  description: `Learn about ${COMPANY.NAME}'s shipping and digital delivery process for POS hardware and software subscriptions.`,
  keywords: [
    COMPANY.NAME,
    "Shipping Policy",
    "Digital Delivery",
    "POS System",
    "Billing Software",
    "Restaurant Billing Machine",
  ],
  openGraph: {
    title: `Shipping & Delivery Policy | ${COMPANY.NAME}`,
    description: `Learn how ${COMPANY.NAME} manages hardware shipping and instant software access for your billing system.`,
    url: `${COMPANY.DOMAIN}/shipping-policy`,
    siteName: COMPANY.NAME,
    images: [{ url: COMPANY.OG_IMAGE, width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Shipping & Delivery Policy | ${COMPANY.NAME}`,
    description: `Read ${COMPANY.NAME}'s hardware shipping and software access policy.`,
    images: [COMPANY.OG_IMAGE],
  },
};

const cardData = [
  {
    title: "Hardware Shipping Policy",
    description:
      "Thermal printers and POS devices are shipped securely across India.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        {/* Updated Legal Name for GST Compliance */}
        At <span className="font-semibold text-white uppercase">{COMPANY.LEGAL_NAME}</span>, we provide both hardware and
        software solutions. All hardware orders, including{" "}
        <strong>thermal printers</strong> and <strong>POS devices</strong>, are
        processed within <strong>1–3 business days</strong> of payment.
        <br />
        <br />
        <strong>Shipping Details:</strong>
        <ul className="list-disc pl-5 mt-2">
          <li>Free or discounted delivery may apply to select plans.</li>
          <li>
            Orders are shipped via trusted logistics partners across India.
          </li>
          <li>
            Delivery time varies between <strong>3–7 business days</strong>.
          </li>
        </ul>
        <br />
        You’ll receive tracking details once your product has been dispatched.
        For any shipping-related inquiries, contact us at{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.SUPPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          {COMPANY.EMAIL.SUPPORT}
        </a>
        .
      </>
    ),
  },
  {
    title: "Software & Digital Delivery",
    description:
      "Instant access to Kravy Billing Software upon subscription activation.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        Once your payment is confirmed, you’ll receive access credentials for
        the <strong>{COMPANY.NAME} Billing App</strong> within{" "}
        <strong>24 hours</strong> — often immediately.
        <br />
        <br />
        This includes:
        <ul className="list-disc pl-5 mt-2">
          <li>Dashboard login credentials for cloud billing software</li>
          <li>Device pairing guide for your thermal printer</li>
          <li>Ongoing updates and support during your active plan</li>
        </ul>
        <br />
        If you face any issue accessing your software, please contact{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.SUPPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          {COMPANY.EMAIL.SUPPORT}
        </a>
        .
      </>
    ),
  },
  {
    title: "Returns, Refunds & Replacements",
    description: "Hardware returns are eligible only for defective products.",
    icon: <Trash2 className="w-6 h-6 text-green-500" />,
    content: (
      <>
        Due to the hybrid nature of our offering (hardware + software),{" "}
        <strong>{COMPANY.NAME}</strong> maintains a clear policy:
        <ul className="list-disc pl-5 mt-2">
          <li>
            Hardware can be replaced within <strong>7 days</strong> if defective
            on arrival.
          </li>
          <li>
            Software subscriptions are <strong>non-refundable</strong> once
            activated.
          </li>
          <li>
            All replacements are subject to verification by our support team.
          </li>
        </ul>

        {/* New Replacement Timeline */}
        <div className="mt-4 flex items-center gap-2 text-blue-400 font-medium">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <span>Replacement will be delivered within 5-6 days.</span>
        </div>
        <br />
        Please email{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.REPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          {COMPANY.EMAIL.REPORT}
        </a>{" "}
        to report defective hardware or delivery issues.
      </>
    ),
  },
];

const contactData = {
  title: "Need Help with Delivery or Activation?",
  description:
    "Our team is ready to assist you with orders, access, or replacements.",
  content: (
    <div>
      <p className="mb-4">
        For delivery tracking, software access issues, or hardware replacement,
        please contact us at{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.SUPPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          {COMPANY.EMAIL.SUPPORT}
        </a>{" "}
        or call{" "}
        <a
          href={`tel:${COMPANY.PHONE}`}
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          {COMPANY.PHONE}
        </a>
        .
      </p>
      <p>
        Visit us at {COMPANY.ADDRESS} <br />
        <span className="text-sm text-gray-500">
          Working Hours: {COMPANY.WORKING_HOURS}
        </span>
      </p>
    </div>
  ),
};

const page = () => {
  return (
    <Template
      title="Shipping & Delivery Policy"
      heading={
        <div>
          Shipping & Digital Delivery <br className="hidden sm:block" /> Policy
        </div>
      }
      description={`Understand how ${COMPANY.NAME} handles hardware shipping, digital access, and refund eligibility for your POS system.`}
      ctaDescription={`${COMPANY.NAME} provides a complete hardware + software billing solution. Once subscribed, you’ll get hardware delivery and instant app access.`}
      ctaLink="/report-issue"
      ctaButton={
        <span className="flex items-center gap-2">
          <Headset className="w-4 h-4" />
          Report an Issue
        </span>
      }
      infoData={cardData}
      contactData={contactData}
    />
  );
};

export default page;
