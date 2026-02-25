import React from "react";
import { Headset, Rows, Zap, ShieldCheck, Trash2 } from "lucide-react";
import Template from "@/components/global/template";
import { COMPANY } from "@/constants";

export const metadata = {
  title: `Terms & Conditions | ${COMPANY.NAME}`,
  description: `Understand the rules that govern your use of ${COMPANY.NAME} — ${COMPANY.DESCRIPTION}`,
  keywords: [
    COMPANY.NAME,
    "Terms and Conditions",
    "Food Images",
    "Image Licensing",
    "POS",
    "Restaurant",
    "Small Business",
  ],
  authors: [{ name: COMPANY.NAME, url: COMPANY.DOMAIN }],
  openGraph: {
    title: `Terms & Conditions | ${COMPANY.NAME}`,
    description: `Understand the rules that govern your use of ${COMPANY.NAME}.`,
    url: `${COMPANY.DOMAIN}/terms-and-conditions`,
    siteName: COMPANY.NAME,
    type: "website",
    images: [
      {
        url: COMPANY.OG_IMAGE,
        alt: `${COMPANY.NAME} Logo`,
      },
    ],
  },
};

const cardData = [
  {
    title: "User Responsibilities",
    description: `Users must use ${COMPANY.NAME} services ethically and in compliance with all applicable laws.`,
    icon: <Rows className="w-6 h-6 text-green-500" />,
    content: (
      <>
        As a {COMPANY.NAME} user, you agree to use the platform responsibly for
        lawful and authorized purposes. All features and data are provided to
        support your business operations ethically and within compliance limits.
        <br />
        <br />
        You are responsible for maintaining the security of your account and
        login credentials.
      </>
    ),
  },
  {
    title: "Platform Usage & Limitations",
    description: `${COMPANY.NAME} offers software and cloud-based billing tools — not ownership or resale rights.`,
    icon: <Zap className="w-6 h-6 text-green-500" />,
    content: (
      <>
        {COMPANY.NAME} provides a reliable, cloud-based billing system
        designed for small shops and restaurants. Misuse, resale, or sharing of
        proprietary resources is strictly prohibited.
        <br />
        <br />
        Abuse, automation misuse, or fraudulent activity may lead to account
        suspension or legal action.
      </>
    ),
  },
  {
    title: "Security & Data Integrity",
    description:
      "We take data protection seriously, but you must also safeguard your credentials.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        {COMPANY.NAME} employs industry-standard encryption and authentication
        systems. We do not store your payment details directly.
        <br />
        <br />
        You are advised to never share your credentials and report any
        suspicious activity immediately at{" "}
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
    title: "Termination & Deletion",
    description:
      "Cancel anytime — we reserve the right to enforce policy violations.",
    icon: <Trash2 className="w-6 h-6 text-green-500" />,
    content: (
      <>
        You can cancel your account anytime. Upon termination, all service
        access will cease immediately.
        <br />
        <br />
        {COMPANY.NAME} reserves the right to suspend or delete accounts found in
        violation of our terms, including fraudulent or unethical use.
      </>
    ),
  },
];

const contactData = {
  title: "Need Clarification or Have Questions?",
  description: `We're here to help you understand the terms and make the most of ${COMPANY.NAME}.`,
  content: (
    <div>
      <p className="mb-4">
        These Terms & Conditions govern your use of{" "}
        <a
          href={COMPANY.DOMAIN}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          {COMPANY.DOMAIN.replace(/^https?:\/\//, "")}
        </a>
        . By accessing our services, you agree to abide by them.
      </p>
      <p className="mb-2">
        General inquiries:{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.CONTACT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          {COMPANY.EMAIL.CONTACT}
        </a>
      </p>
      <p className="mb-2">
        Support issues:{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.SUPPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          {COMPANY.EMAIL.SUPPORT}
        </a>
      </p>
      <p>
        Policy or account violations:{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.REPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          {COMPANY.EMAIL.REPORT}
        </a>
      </p>
    </div>
  ),
};

const Page = () => {
  return (
    <Template
      title="Terms & Conditions"
      heading={
        <div>
          Your Access. <br className="hidden sm:block" />
          Our Terms. Clear & Fair.
        </div>
      }
      description={`Understand the rules that govern your use of ${COMPANY.NAME}.`}
      ctaDescription={`By using ${COMPANY.NAME}, you agree to these Terms & Conditions designed to ensure ethical, secure, and transparent usage of our services.`}
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

export default Page;
