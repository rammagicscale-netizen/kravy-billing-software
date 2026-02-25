import { Phone, MapPin, Headset } from "lucide-react";
import { COMPANY } from "@/constants";

export const CONTACT_METADATA = {
  title: `Contact Us | ${COMPANY.NAME} Billing Software`,
  description: `Need help with your ${COMPANY.NAME} POS setup, subscription, or software account? Contact the ${COMPANY.NAME} support team for quick assistance.`,
  openGraph: {
    title: `Contact Us | ${COMPANY.NAME} Billing Software`,
    description: `Need help with your ${COMPANY.NAME} POS setup, subscription, or software account? Contact the ${COMPANY.NAME} support team for quick assistance.`,
    url: `${COMPANY.DOMAIN}/contact`,
    siteName: COMPANY.NAME,
    images: [
      {
        url: COMPANY.OG_IMAGE,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Us | ${COMPANY.NAME}`,
    description: `Need help with your ${COMPANY.NAME} billing or account setup? Contact our support team for quick assistance.`,
    images: [COMPANY.OG_IMAGE],
  },
};

export const CONTACT_CARDS = [
  {
    title: "Customer Support",
    description:
      "Need help setting up your billing app or subscription?",
    icon: <Headset className="w-6 h-6 text-green-500" />,
    content: (
      <>
        Whether you’re facing issues with your account setup,
        software login, or dashboard, our team is here to help.
        <br />
        <br />
        Email us at{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.SUPPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {COMPANY.EMAIL.SUPPORT}
        </a>{" "}
        — we usually respond within <strong>24 hours</strong>.
      </>
    ),
  },
  {
    title: "Phone Support",
    description: "Speak directly with our technical support team.",
    icon: <Phone className="w-6 h-6 text-green-500" />,
    content: (
      <>
        Call us at{" "}
        <a
          href={`tel:${COMPANY.PHONE}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {COMPANY.PHONE}
        </a>{" "}
        during <strong>{COMPANY.WORKING_HOURS}</strong>.
      </>
    ),
  },
  {
    title: "Office Location",
    description: "We’re headquartered in India’s capital city.",
    icon: <MapPin className="w-6 h-6 text-green-500" />,
    content: (
      <>
        <strong>{COMPANY.LEGAL_NAME}</strong>
        <br />
        {COMPANY.ADDRESS}
        <br />
        <br />
        For demos or business inquiries, please email us before visiting.
      </>
    ),
  },
];

export const CONTACT_SECTION = {
  title: "We’re Here to Help",
  description:
    "Have questions about installation, account setup, or billing? Get in touch with our support team.",
  content: (
    <div>
      <p className="mb-4">
        Whether you're a restaurant owner, café manager, or shop operator,{" "}
        {COMPANY.NAME} ensures your billing setup runs smoothly. Reach out with
        any questions about your subscription or account.
      </p>
      <p>
        Support:{" "}
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
        Partnerships:{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.PARTNER}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {COMPANY.EMAIL.PARTNER}
        </a>
        <br />
        Address: {COMPANY.ADDRESS}
      </p>
    </div>
  ),
};

