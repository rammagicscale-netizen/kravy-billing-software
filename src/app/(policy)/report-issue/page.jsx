import React from "react";
import { Bug, Mail, MapPin, Headset } from "lucide-react";
import Template from "@/components/global/template";
import { COMPANY } from "@/constants";

export const metadata = {
  title: `Report an Issue - ${COMPANY.NAME}`,
  description: `Found an issue or can’t access your account? Contact ${COMPANY.NAME} support for fast help and issue reporting.`,
  keywords: [
    `${COMPANY.NAME} support`,
    "report issue",
    "account help",
    "technical issue",
    "billing issue",
    "POS support",
  ],
  openGraph: {
    title: `Report an Issue - ${COMPANY.NAME}`,
    description: `Found an issue or can’t access your account? Contact ${COMPANY.NAME} support for fast help and issue reporting.`,
    url: `${COMPANY.DOMAIN}/report-issue`,
    siteName: COMPANY.NAME,
    images: [
      {
        url: COMPANY.OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `Report an Issue at ${COMPANY.NAME}`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

const cardData = [
  {
    title: "Report a Bug or Issue",
    description: "Something not working as expected? Let us know.",
    icon: <Bug className="w-6 h-6 text-red-500" />,
    content: (
      <>
        If you’ve encountered a technical issue, incorrect billing entry, or
        something behaving unexpectedly, please share the details with us.
        <br />
        <br />
        You can email screenshots, order IDs, or error descriptions to{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.REPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {COMPANY.EMAIL.REPORT}
        </a>
        .<br />
        <br />
        Our team resolves most reports within 24 hours.
      </>
    ),
  },
  {
    title: "General Support",
    description: "Need help with your account, plan, or setup?",
    icon: <Mail className="w-6 h-6 text-green-500" />,
    content: (
      <>
        For questions about billing, plan upgrades, or using the billing system,
        contact our support team anytime.
        <br />
        <br />
        Email us at{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.SUPPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {COMPANY.EMAIL.SUPPORT}
        </a>{" "}
        — we’ll be happy to assist you.
      </>
    ),
  },
  {
    title: "Business or Partnership Contact",
    description: "Looking to collaborate or integrate with us?",
    icon: <MapPin className="w-6 h-6 text-green-500" />,
    content: (
      <>
        For media, partnership, or B2B collaboration inquiries, reach out to{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.PARTNER}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {COMPANY.EMAIL.PARTNER}
        </a>
        .
        <br />
        <br />
        Location: {COMPANY.ADDRESS}
      </>
    ),
  },
];

const contactData = {
  title: `Facing an Issue with ${COMPANY.NAME}?`,
  description: `We’re here to help with product issues, billing concerns, or integration problems. Let us know what went wrong, and we’ll fix it fast.`,
  content: (
    <div>
      <p className="mb-4">
        Whether it’s a bug, configuration issue, or account access problem — our
        support team is available during working hours ({COMPANY.WORKING_HOURS})
        to assist you.
      </p>
      <p>
        📧 Report a problem:{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.REPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {COMPANY.EMAIL.REPORT}
        </a>
        <br />
        📧 General support:{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.SUPPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {COMPANY.EMAIL.SUPPORT}
        </a>
        <br />
        📍 Location: {COMPANY.ADDRESS}
      </p>
    </div>
  ),
};

const Page = () => {
  return (
    <Template
      title="Report an Issue"
      heading={
        <div>
          Report a Problem <br className="hidden sm:block" />
          or Get Instant Support
        </div>
      }
      description={`Found an issue or can't access your ${COMPANY.NAME} account? Let us know — we’ll get it fixed as soon as possible.`}
      ctaDescription={`Our team continuously improves ${COMPANY.NAME}. Reporting an issue helps us serve you and others better.`}
      ctaLink="/contact"
      ctaButton={
        <span className="flex items-center gap-2">
          <Headset className="w-4 h-4" />
          Contact Support
        </span>
      }
      infoData={cardData}
      contactData={contactData}
    />
  );
};

export default Page;
