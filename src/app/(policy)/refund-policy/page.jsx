import React from "react";
import { Headset, ShieldCheck, Trash2 } from "lucide-react";
import Template from "@/components/global/template";
import { COMPANY } from "@/constants";

export const metadata = {
  title: `Refund Policy - ${COMPANY.NAME}`,
  description: `Understand our refund policy for ${COMPANY.NAME} billing software and hardware subscriptions. Refunds are only applicable for valid billing errors.`,
  keywords: `${COMPANY.NAME}, Refund Policy, Billing Software, POS Subscription, Printer Refund, Payment Issue`,
  openGraph: {
    title: `Refund Policy - ${COMPANY.NAME}`,
    description: `${COMPANY.NAME} provides billing hardware and software on a subscription basis. Refunds are applicable only for verified billing errors.`,
    url: `${COMPANY.DOMAIN}/refund-policy`,
    siteName: COMPANY.NAME,
    type: "website",
  },
};

const cardData = [
  {
    title: "No Refund / Return",
    description:
      "Once your subscription and device setup are activated, refunds or returns cannot be processed.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        {COMPANY.NAME} provides instant activation of your billing account and
        linked hardware (such as the thermal printer) upon payment.
        <br />
        <br />
        Since our service includes both hardware and licensed software,
        <strong> no refunds</strong> are available after activation or delivery,
        unless required by law or due to a verified billing error.

        {/* New Highlighted Note */}
        <div className="mt-4 p-3 border-l-2 border-red-500 bg-red-500/10">
          <p className="text-xs text-red-400 uppercase tracking-wider font-semibold">
            Strict Policy: No refund / return available after activation.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "User Agreement at the Time of Subscription",
    description:
      "All users agree to our refund policy during the subscription process.",
    icon: <Trash2 className="w-6 h-6 text-green-500" />,
    content: (
      <>
        By subscribing to {COMPANY.NAME}, users confirm that they understand and
        agree to our refund terms before activating their billing system.
        <br />
        <br />
        We encourage users to contact our support team before making a payment
        if they have any doubts regarding features, compatibility, or pricing.
      </>
    ),
  },
  {
    title: "Refunds for Verified Billing Issues",
    description:
      "Refunds are only processed for valid billing-related errors or duplicate transactions.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        {COMPANY.NAME} may issue refunds in specific cases such as:
        <ul className="list-disc ml-5 mt-2">
          <li>Duplicate payments due to a technical issue</li>
          <li>Accidental overcharges</li>
          <li>Failed or incomplete transactions</li>
        </ul>
        <br />
        To request a refund review, please contact our support team within 7
        days of payment with your transaction ID and billing details.
      </>
    ),
  },
];

const contactData = {
  title: "Need Help with a Billing or Refund Concern?",
  description: `Our support team can assist with verified billing or refund issues related to your ${COMPANY.NAME} subscription.`,
  content: (
    <div>
      <p className="mb-4">
        While {COMPANY.NAME} follows a no-refund policy after activation, we do
        understand that rare billing issues may occur. If you believe a payment
        error has taken place, contact us at{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.SUPPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          {COMPANY.EMAIL.SUPPORT}
        </a>
        .
      </p>
      <p>
        All refund requests are reviewed carefully. For urgent concerns or
        reporting technical payment issues, you can also reach{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.REPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          {COMPANY.EMAIL.REPORT}
        </a>
        .
      </p>
    </div>
  ),
};

const page = () => {
  return (
    <Template
      title="Refund Policy"
      heading={
        <div>
          Refund Policy <br className="hidden sm:block" />
          for {COMPANY.NAME} Subscriptions
        </div>
      }
      description={`Learn about ${COMPANY.NAME}’s refund policy for billing software and printer packages. Refunds apply only for verified billing errors.`}
      ctaDescription={`${COMPANY.NAME} follows a transparent refund policy — no refunds after activation, except in valid billing error cases.`}
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
