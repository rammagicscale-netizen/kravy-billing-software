import React from "react";
import { Headset, ShieldCheck, Trash2 } from "lucide-react";
import Template from "@/components/global/template";
import { COMPANY } from "@/constants";

export const metadata = {
  title: `Return & Refund Policy | ${COMPANY.NAME}`,
  description: `Understand our return and refund policy for ${COMPANY.NAME} — your all-in-one billing software and hardware solution.`,
  keywords: [
    COMPANY.NAME,
    "refund policy",
    "return policy",
    "billing software",
    "POS system",
    "thermal printer",
    "subscription",
  ],
  robots: "index, follow",
};

const cardData = [
  {
    title: "Hardware Delivery & Software Activation",
    description:
      "Your printer hardware and billing software subscription are activated after successful payment.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        At <strong>{COMPANY.NAME}</strong>, we provide a combined{" "}
        <strong>hardware + software billing solution</strong>.
        <br />
        <br />
        <strong>Delivery & Activation:</strong> Once your payment is confirmed,
        our team initiates your account setup and hardware delivery within{" "}
        <strong>2–5 business days</strong>.
        <br />
        <br />
        This includes:
        <ul className="list-disc pl-5 mt-2">
          <li>Thermal printer and accessories (if part of your plan)</li>
          <li>Access credentials for your billing dashboard</li>
          <li>Remote onboarding and setup support</li>
        </ul>
        <br />
        <strong>Delivery Confirmation:</strong> You’ll receive an activation
        email or call once your product and account are ready. If you don’t
        receive confirmation within the expected timeframe, please reach out to{" "}
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
    title: "No Refund / Return",
    description:
      "Once your subscription and device setup are activated, refunds or returns cannot be processed.",
    icon: <Trash2 className="w-6 h-6 text-green-500" />,
    content: (
      <>
        Due to the nature of our service — which includes both hardware delivery
        and immediate software activation — <strong>{COMPANY.NAME}</strong>{" "}
        maintains a <strong>no-refund policy</strong> after activation or
        shipment.
        <br />
        <br />
        Users receive complete access to licensed billing software and connected
        devices upon activation, making returns or cancellations impractical.

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
    title: "Exceptions for Billing or Shipping Errors",
    description:
      "Refunds or returns may be approved only in verified exceptional cases.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        Refunds or replacements may be processed only in the following verified
        scenarios:
        <ul className="list-disc pl-5 mt-2">
          <li>Duplicate or failed transactions</li>
          <li>Incorrect item shipped</li>
          <li>Hardware damaged during delivery</li>
        </ul>
        <br />
        <p>
          In such cases, please notify us within <strong>7 days</strong> of
          delivery or payment by emailing{" "}
          <a
            href={`mailto:${COMPANY.EMAIL.SUPPORT}`}
            className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
          >
            {COMPANY.EMAIL.SUPPORT}
          </a>{" "}
          with your order details and supporting evidence.
        </p>

        {/* New Refund Timeline added below */}
        <div className="mt-4 p-4 border-t border-gray-800 bg-black/20 rounded-lg">
          <p className="text-sm text-gray-400">
            Refund will be credited within{" "}
            <span className="text-white font-bold">7-8 days</span> to the
            original source of payment method.
          </p>
        </div>
      </>
    ),
  },
];

const contactData = {
  title: "Need Help Understanding Our Policy?",
  description: "Have questions about refunds, billing issues, or returns?",
  content: (
    <div>
      <p className="mb-4">
        For clarifications regarding refunds, hardware returns, or subscription
        cancellation, reach us at{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.SUPPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          {COMPANY.EMAIL.SUPPORT}
        </a>{" "}
        or{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.CONTACT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          {COMPANY.EMAIL.CONTACT}
        </a>
        .
      </p>
      <p>
        For issues related to payments or damaged hardware, please report them
        directly to{" "}
        <a
          href={`mailto:${COMPANY.EMAIL.REPORT}`}
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          {COMPANY.EMAIL.REPORT}
        </a>
        . Our team in {COMPANY.ADDRESS} will assist you promptly.
      </p>
    </div>
  ),
};

const page = () => {
  return (
    <Template
      title="Return & Refund Policy"
      heading={
        <div>
          Return & Refund <br className="hidden sm:block" />
          Policy for {COMPANY.NAME}
        </div>
      }
      description={`Understand the return, refund, and cancellation policy for ${COMPANY.NAME} — your complete POS billing system.`}
      ctaDescription={`${COMPANY.NAME} offers transparent service terms. Refunds apply only to verified billing or shipping errors; activated subscriptions and delivered hardware are non-refundable.`}
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
