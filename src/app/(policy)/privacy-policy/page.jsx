import React from "react";
import Template from "@/components/global/template";
import { Headset } from "lucide-react";
import { COMPANY } from "@/constants";

export const metadata = {
  title: `Privacy Policy | ${COMPANY.NAME}`,
  description: `${COMPANY.NAME} values your privacy. Learn how we collect, use, and protect your data when you use our billing software solutions.`,
  keywords: [
    COMPANY.NAME,
    "Privacy Policy",
    "Data Protection",
    "Billing Software Security",
    "POS System Privacy",
    "Kravy Billing App",
  ],
  openGraph: {
    title: `Privacy Policy | ${COMPANY.NAME}`,
    description: `${COMPANY.NAME} ensures complete privacy and security for your business and customer data.`,
    url: `${COMPANY.DOMAIN}/privacy-policy`,
    type: "website",
    images: [
      {
        url: COMPANY.OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${COMPANY.NAME} Privacy Policy`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Privacy Policy | ${COMPANY.NAME}`,
    description: `${COMPANY.NAME} respects your privacy and keeps your data secure across our software systems.`,
    images: [COMPANY.OG_IMAGE],
  },
};

const PRIVACY_INFO = [
  {
    title: "Data We Collect",
    description: "Information collected through your use of Kravy’s services.",
    content: (
      <>
        We collect minimal information necessary to provide our billing
        services effectively. This includes:
        <ul className="list-disc pl-5 mt-2">
          <li>Business details (name, phone number, GST, address)</li>
          <li>User account details (email, phone number, password)</li>
          <li>Usage logs for app performance improvement</li>
          <li>Device and network information for troubleshooting</li>
        </ul>
        All data is stored securely and used only for service enhancement.
      </>
    ),
  },
  {
    title: "How We Use Your Data",
    description: "Purpose behind data collection and retention.",
    content: (
      <>
        Your data helps us provide seamless software updates and manage your
        account. We also use aggregated data for analytics to improve service quality.
        <br />
        <br />
        We never sell or rent your data to third parties. Data sharing happens
        only with trusted vendors who help operate our systems (e.g., cloud or
        payment providers).
      </>
    ),
  },
  {
    title: "Data Security & Encryption",
    description:
      "Your data is protected through encryption and secure data practices.",
    content: (
      <>
        {COMPANY.NAME} uses industry-standard encryption and secure hosting to
        ensure your information is protected from unauthorized access or loss.
        <br />
        <br />
        Regular audits and security checks are conducted to maintain compliance
        with data safety regulations.
      </>
    ),
  },
  {
    title: "Cookies & Tracking",
    description: "How we handle cookies on our website and app.",
    content: (
      <>
        Our website and billing app may use cookies to store preferences,
        analyze performance, and personalize your experience. You can disable
        cookies from your browser settings anytime.
      </>
    ),
  },
  {
    title: "Your Rights & Data Access",
    description: "Control your personal and business data with full access.",
    content: (
      <>
        You have the right to access, update, or delete your stored data at any
        time. Simply contact us at{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.SUPPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {COMPANY.EMAIL.SUPPORT}
        </a>{" "}
        to raise a data-related request.
      </>
    ),
  },
];

const PRIVACY_CONTACT = {
  title: "Need More Clarity?",
  description:
    "If you have questions about our privacy policy or data protection practices, reach out to us directly.",
  content: (
    <div>
      <p className="mb-4">
        We’re transparent about how we handle your data. Whether it’s related to
        billing records or software usage, you can reach our
        data support team anytime.
      </p>
      <p>
        Email:{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.SUPPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {COMPANY.EMAIL.SUPPORT}
        </a>
        <br />
        General Queries:{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.CONTACT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {COMPANY.EMAIL.CONTACT}
        </a>
        <br />
        Address: {COMPANY.ADDRESS}
      </p>
    </div>
  ),
};

export default function PrivacyPolicyPage() {
  return (
    <Template
      title="Privacy Policy"
      heading={
        <div>
          Your Data, <br className="hidden sm:block" /> Your Privacy – Protected
          by {COMPANY.NAME}
        </div>
      }
      description={`${COMPANY.NAME} is committed to protecting your personal and business data while delivering secure billing solutions.`}
      ctaDescription="Need clarity on data usage or security? Contact our privacy support team for assistance."
      ctaLink="/contact"
      ctaButton={
        <span className="flex items-center gap-2">
          <Headset className="w-4 h-4" />
          Contact Support
        </span>
      }
      infoData={PRIVACY_INFO}
      contactData={PRIVACY_CONTACT}
    />
  );
}
