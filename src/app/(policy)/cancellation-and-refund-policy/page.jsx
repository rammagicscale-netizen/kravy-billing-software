import React from "react";
import { Headset, ShieldCheck, Clock } from "lucide-react";
import Template from "@/components/global/template";
import { COMPANY } from "@/constants";

export const metadata = {
  title: `Cancellation & Refund Policy - ${COMPANY.NAME}`,
  description: `Understand the cancellation and refund policy for ${COMPANY.NAME} billing software subscriptions.`,
  keywords: `${COMPANY.NAME}, Cancellation Policy, Refund Policy, Billing Software, POS Subscription`,
  openGraph: {
    title: `Cancellation & Refund Policy - ${COMPANY.NAME}`,
    description: `Customers can cancel their order within 24 hours. Refunds are processed within 5-6 business days for approved cancellations.`,
    url: `${COMPANY.DOMAIN}/cancellation-and-refund-policy`,
    siteName: COMPANY.NAME,
    type: "website",
  },
};

const cardData = [
  {
    title: "Cancellation Policy",
    description: "Flexible cancellation for your subscription within the first 24 hours.",
    icon: <Clock className="w-6 h-6 text-green-500" />,
    content: (
      <>
        Customers can cancel their order within <strong>24 hours</strong> of placing it.
        <br />
        <br />
        Cancellation requests made after 24 hours may not be accepted once the service has been processed or the account has been activated.
      </>
    ),
  },
  {
    title: "Refund Policy",
    description: "Transparent refund process for approved cancellations.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        If the cancellation request is approved, the refund will be processed and credited to the original source of payment within <strong>5–6 business days</strong>.
        <br />
        <br />
        Please note that refund timelines may vary slightly depending on your bank or payment provider.
      </>
    ),
  },
];

const contactData = {
  title: "Need Help with Cancellation or Refunds?",
  description: `Our support team is here to assist you with any questions regarding your ${COMPANY.NAME} subscription cancellation.`,
  content: (
    <div>
      <p className="mb-4">
        If you wish to cancel your subscription or have questions about a refund, please contact us at{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.SUPPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          {COMPANY.EMAIL.SUPPORT}
        </a>
        .
      </p>
      <p>
        All requests are reviewed carefully by our billing team to ensure a fair and transparent process.
      </p>
    </div>
  ),
};

const page = () => {
  return (
    <Template
      title="Cancellation & Refund Policy"
      heading={
        <div>
          Cancellation & <br className="hidden sm:block" /> Refund Policy
        </div>
      }
      description={`Learn about ${COMPANY.NAME}’s terms for cancelling your billing software subscription and our refund timelines.`}
      ctaDescription={`${COMPANY.NAME} goal is to provide a seamless experience. If you're not satisfied, we're here to help with your cancellation request.`}
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

export default page;
