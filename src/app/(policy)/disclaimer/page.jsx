import React from "react";
import { Headset, ShieldCheck, AlertTriangle } from "lucide-react";
import Template from "@/components/global/template";
import { COMPANY } from "@/constants";

export const metadata = {
  title: `Disclaimer - ${COMPANY.NAME}`,
  description: `Understand the scope, limitations, and responsibilities of using ${COMPANY.NAME} software and services.`,
  keywords: [
    COMPANY.NAME,
    "Disclaimer",
    "Billing Software",
    "POS System",
    "Restaurant Billing",
    "Retail POS",
    "Cloud Billing",
  ],
  authors: [{ name: `${COMPANY.NAME} Team`, url: COMPANY.DOMAIN }],
  openGraph: {
    title: `Disclaimer - ${COMPANY.NAME}`,
    description: `Understand the scope, limitations, and responsibilities of using ${COMPANY.NAME} software and services.`,
    url: `${COMPANY.DOMAIN}/disclaimer`,
    siteName: COMPANY.NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Disclaimer - ${COMPANY.NAME}`,
    description: `Understand the scope, limitations, and responsibilities of using ${COMPANY.NAME} software and services.`,
  },
};

const cardData = [
  {
    title: "Software Usage",
    description:
      "Our billing app is provided as a software solution for ease of business operations.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        {COMPANY.NAME} provides a cloud-based billing software
        as part of its service offering. While we ensure smooth
        integration, occasional compatibility or network-related issues may
        arise due to third-party integrations or system environments.
        <br />
        <br />
        We recommend using officially supported devices and maintaining updated
        software versions for the best experience.
      </>
    ),
  },
  {
    title: "No Guarantee of Business Outcomes",
    description:
      "We do not guarantee any increase in sales or operational efficiency as results may vary.",
    icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
    content: (
      <>
        While {COMPANY.NAME} is designed to simplify billing and inventory
        management, actual results may depend on business operations, user
        practices, and internet reliability.
        <br />
        <br />
        {COMPANY.NAME} is not responsible for business performance outcomes,
        customer traffic, or sales increases.
      </>
    ),
  },
  {
    title: "Third-Party Integrations",
    description:
      "We are not responsible for third-party apps or integrations used with our platform.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        {COMPANY.NAME} may offer integrations with payment gateways, accounting
        software, or external APIs. However, these services are managed by their
        respective providers.
        <br />
        <br />
        Any downtime, data loss, or operational issues arising from these
        services fall under their own terms and policies.
      </>
    ),
  },
  {
    title: "User Responsibility",
    description:
      "You are responsible for your account data, device management, and business records.",
    icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
    content: (
      <>
        Users must ensure that login credentials and business data
        are used securely and in compliance with local business laws.
        <br />
        <br />
        {COMPANY.NAME} shall not be liable for any misuse, data entry errors, or
        system damage due to improper usage or unauthorized access.
      </>
    ),
  },
];

const contactData = {
  title: "Need Help or Have Questions?",
  description:
    "Our support team is available to help with questions about your Kravy subscription or billing concerns.",
  content: (
    <div>
      <p className="mb-4">
        You can reach out to us anytime at{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.SUPPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          {COMPANY.EMAIL.SUPPORT}
        </a>{" "}
        or{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.REPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          {COMPANY.EMAIL.REPORT}
        </a>
        .
      </p>
      <p>
        We're based in {COMPANY.ADDRESS} and operate during{" "}
        {COMPANY.WORKING_HOURS}. Our team is here to ensure your Kravy billing
        experience runs smoothly.
      </p>
    </div>
  ),
};

const page = () => {
  return (
    <Template
      title="Disclaimer"
      heading={
        <div>
          Disclaimer <br className="hidden sm:block" />
          and User Responsibility
        </div>
      }
      description={`Understand the terms, scope, and responsibilities of using ${COMPANY.NAME} software solutions.`}
      ctaDescription={`${COMPANY.NAME} provides software billing solutions for businesses. Please read this disclaimer carefully before use.`}
      ctaLink="/support"
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

export default page;
