import React from "react";
import { Mail, Phone, MapPin, Headset } from "lucide-react";
import Template from "@/components/global/template";
import { COMPANY } from "@/constants";

export const metadata = {
  title: `Contact Us | ${COMPANY.NAME}`,
  description: `Need help with your billing software, account setup, or subscription? Contact the ${COMPANY.NAME} support team for assistance.`,
  keywords: [
    "Kravy contact",
    "billing software support",
    "smart billing support",
    "POS system help",
    "restaurant billing",
  ],
  openGraph: {
    title: `Contact Us | ${COMPANY.NAME}`,
    description: `Need help with your billing software, account setup, or subscription? Contact the ${COMPANY.NAME} support team for assistance.`,
    url: `${COMPANY.DOMAIN}/contact`,
    siteName: COMPANY.NAME,
    images: [
      {
        url: COMPANY.OG_IMAGE,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Us | ${COMPANY.NAME}`,
    description: `Need help with your billing software, account setup, or subscription? Contact the ${COMPANY.NAME} support team for assistance.`,
    images: [COMPANY.OG_IMAGE],
  },
};

const cardData = [
  {
    title: "Customer Support",
    description: "Need help with your billing software or account setup?",
    icon: <Headset className="w-6 h-6 text-green-500" />,
    content: (
      <>
        Whether you need assistance setting up your Kravy billing system,
        configuring your account, or managing your subscription, our
        support team is here for you.
        <br />
        <br />
        Reach out via email at{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.SUPPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {COMPANY.EMAIL.SUPPORT}
        </a>{" "}
        — we typically respond within 24 hours during working hours (
        {COMPANY.WORKING_HOURS}).
      </>
    ),
  },
  {
    title: "Phone Support",
    description: "Prefer to talk to someone directly?",
    icon: <Phone className="w-6 h-6 text-green-500" />,
    content: (
      <>
        You can contact us at{" "}
        <a
          href={`tel:${COMPANY.PHONE}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {COMPANY.PHONE}
        </a>{" "}
        during our business hours ({COMPANY.WORKING_HOURS}).
      </>
    ),
  },
  {
    title: "Location",
    description: "Our operations and support are based in India.",
    icon: <MapPin className="w-6 h-6 text-green-500" />,
    content: (
      <>
        <strong>{COMPANY.LEGAL_NAME}</strong>
        <br />
        {COMPANY.ADDRESS}
        <br />
        <br />
        Please contact us before scheduling a visit — we primarily operate
        remotely for faster service.
      </>
    ),
  },
];

const contactData = {
  title: "We’re Here to Help",
  description:
    "Questions about your Kravy subscription, billing setup, or account configuration? Get in touch.",
  content: (
    <div>
      <p className="mb-4">
        Whether you're setting up a new Kravy billing system or need help with
        your existing account, we’re happy to assist. Our support covers both
        billing and account troubleshooting.
      </p>
      <p>
        Email Support:{" "}
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
        Partnership or Dealership:{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.PARTNER}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {COMPANY.EMAIL.PARTNER}
        </a>
        <br />
        Location: {COMPANY.ADDRESS}
      </p>
    </div>
  ),
};

const page = () => {
  return (
    <Template
      title="Contact Us"
      heading={
        <div>
          Get in Touch <br className="hidden sm:block" /> with {COMPANY.NAME}{" "}
          Support
        </div>
      }
      description={`Need help with your ${COMPANY.NAME} billing software, account setup, or subscription? Contact our team for support and assistance.`}
      ctaDescription="We’re just an email away. Reach out with your questions, and our support team will get back to you promptly."
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
