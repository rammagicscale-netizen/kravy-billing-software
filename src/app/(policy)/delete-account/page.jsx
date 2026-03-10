//src/app/(policy)/delete-account/page.jsx
import React from "react";
import Template from "@/components/global/template";
import { Trash2 } from "lucide-react";
import { COMPANY } from "@/constants";

export const metadata = {
  title: `Delete Account | ${COMPANY.NAME}`,
  description: `Request deletion of your ${COMPANY.NAME} account and associated data. We respect your privacy and ensure secure removal of your personal information.`,
  keywords: [
    COMPANY.NAME,
    "Delete Account",
    "Account Removal",
    "Data Deletion",
    "Billing App Account Delete",
    "Kravy Account Delete",
  ],
  openGraph: {
    title: `Delete Account | ${COMPANY.NAME}`,
    description: `Learn how to request deletion of your ${COMPANY.NAME} account and associated data.`,
    url: `${COMPANY.DOMAIN}/delete-account`,
    type: "website",
    images: [
      {
        url: COMPANY.OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${COMPANY.NAME} Delete Account`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Delete Account | ${COMPANY.NAME}`,
    description: `Request deletion of your ${COMPANY.NAME} account and personal data.`,
    images: [COMPANY.OG_IMAGE],
  },
};

const DELETE_ACCOUNT_INFO = [
  {
    title: "Request Account Deletion",
    description: "How to request deletion of your account.",
    content: (
      <>
        If you want to permanently delete your account from{" "}
        <strong>{COMPANY.NAME}</strong>, please send a request to our support
        team.
        <br />
        <br />
        Email your request to:
        <br />
        <a
          href={`mailto:${COMPANY.EMAIL.SUPPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {COMPANY.EMAIL.SUPPORT}
        </a>
        <br />
        <br />
        Please include your <strong>registered phone number or email</strong>{" "}
        used in the app so we can locate your account.
      </>
    ),
  },
  {
    title: "Account Deletion Process",
    description: "Steps followed after receiving a deletion request.",
    content: (
      <>
        After we receive your request, our team will verify your account and
        process the deletion.
        <ul className="list-disc pl-5 mt-2">
          <li>Your account access will be permanently removed.</li>
          <li>Your personal data will be deleted from our systems.</li>
          <li>Associated account information will be permanently erased.</li>
        </ul>
        <br />
        This process usually takes up to <strong>48 hours</strong>.
      </>
    ),
  },
  {
    title: "Data That Will Be Deleted",
    description: "Information removed after your account deletion.",
    content: (
      <>
        Once the deletion process is completed, the following information will
        be removed:
        <ul className="list-disc pl-5 mt-2">
          <li>User profile information</li>
          <li>Login credentials</li>
          <li>Business account details</li>
          <li>Personal data associated with your account</li>
        </ul>
      </>
    ),
  },
  {
    title: "Data Retention",
    description: "Certain information may be retained for compliance.",
    content: (
      <>
        Some information may be retained for a limited period where required by
        law, fraud prevention, or security purposes.
        <br />
        <br />
        This retained data will not be used for marketing or profiling.
      </>
    ),
  },
];

const DELETE_ACCOUNT_CONTACT = {
  title: "Need Help?",
  description:
    "If you have questions regarding account deletion or data privacy, contact our support team.",
  content: (
    <div>
      <p className="mb-4">
        Our support team is available to help you with account deletion or any
        related queries.
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

export default function DeleteAccountPage() {
  return (
    <Template
      title="Delete Account"
      heading={
        <div>
          Delete Your Account <br className="hidden sm:block" /> from{" "}
          {COMPANY.NAME}
        </div>
      }
      description={`You can request permanent deletion of your ${COMPANY.NAME} account and personal data at any time.`}
      ctaDescription="Need assistance with account deletion? Contact our support team."
      ctaLink="/contact"
      ctaButton={
        <span className="flex items-center gap-2">
          <Trash2 className="w-4 h-4" />
          Contact Support
        </span>
      }
      infoData={DELETE_ACCOUNT_INFO}
      contactData={DELETE_ACCOUNT_CONTACT}
    />
  );
}