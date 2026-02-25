import { Headset, ShieldCheck, Truck, Trash2 } from "lucide-react";
import { COMPANY_NAME, COMPANY_EMAIL, COMPANY_ADDRESS } from "@/constants";

export const POLICY_INFO = [
  {
    title: "Hardware Shipping Policy",
    description: `${COMPANY_NAME} provides POS billing hardware with secure and trackable delivery options across India.`,
    icon: <Truck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        At <strong>{COMPANY_NAME}</strong>, we offer both **software and
        physical billing hardware** (POS machines, printers, barcode scanners,
        etc.).
        <br />
        <br />
        <strong>Dispatch Timeline:</strong> All confirmed hardware orders are
        processed and shipped within <strong>3–5 business days</strong>.
        <br />
        <br />
        <strong>Delivery Partners:</strong> We work with trusted logistics
        providers to ensure safe and timely delivery. Tracking details will be
        shared via email or SMS after dispatch.
        <br />
        <br />
        <strong>Shipping Charges:</strong> Standard shipping is included for
        most locations in India. Additional charges may apply for remote or
        high-security zones.
        <br />
        <br />
        <strong>Damage & Replacement:</strong> If your device arrives damaged or
        defective, please contact our support team within{" "}
        <strong>7 days of delivery</strong> for inspection and replacement.
      </>
    ),
  },
  {
    title: "Software Access & Digital Delivery",
    description: `${COMPANY_NAME} provides instant digital access to the billing dashboard after purchase or activation.`,
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        Your {COMPANY_NAME} software license and access credentials are
        delivered **digitally** via email after your plan is activated.
        <br />
        <br />
        <strong>Instant Access:</strong> You can start billing and managing
        sales immediately after setup — no waiting required.
        <br />
        <br />
        <strong>Included Features:</strong>
        <ul className="list-disc pl-5 mt-2">
          <li>
            Cloud-based billing software for restaurant & retail operations
          </li>
          <li>Dashboard, invoicing, and sales reports</li>
          <li>POS hardware integration and data syncing</li>
        </ul>
        <br />
        If you do not receive access details within <strong>24 hours</strong> of
        payment, please reach out to{" "}
        <a
          href={`mailto:${COMPANY_EMAIL}`}
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          {COMPANY_EMAIL}
        </a>
        .
      </>
    ),
  },
  {
    title: "Refund & Return Policy",
    description:
      "Digital subscriptions are non-refundable. Hardware returns are accepted only for defective units.",
    icon: <Trash2 className="w-6 h-6 text-green-500" />,
    content: (
      <>
        <strong>Software:</strong> As {COMPANY_NAME} provides immediate access
        to the billing software after activation, all software payments are
        **non-refundable**.
        <br />
        <br />
        <strong>Hardware:</strong> You may request a **replacement** in case of
        a defective or damaged product within{" "}
        <strong>7 days of delivery</strong>. Returns are accepted only after
        inspection and verification by our technical team.
        <br />
        <br />
        Please retain the original packaging, invoice, and serial number during
        return processing.
      </>
    ),
  },
  {
    title: "Account Cancellation & Access Expiry",
    description:
      "Cancel anytime — your account remains active until the current billing cycle ends.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        You can cancel your {COMPANY_NAME} subscription at any time from your
        account dashboard.
        <br />
        <br />
        After cancellation, your digital access will remain active until the end
        of your billing cycle. Hardware remains your property, and you can
        reactivate your software license at any time.
      </>
    ),
  },
];

export const POLICY_CONTACT = {
  title: "Need Help with Shipping or Access?",
  description:
    "Our team is ready to help with hardware tracking, software activation, or refund queries.",
  content: (
    <div>
      <p className="mb-4">
        For support regarding your order or account, reach out to us at{" "}
        <a
          href={`mailto:${COMPANY_EMAIL}`}
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          {COMPANY_EMAIL}
        </a>
        .
      </p>
      <p>
        You can also report technical or delivery-related issues through our
        help desk. Our operations are based in Delhi.
      </p>
      <p className="mt-2 text-sm text-gray-500">Address: {COMPANY_ADDRESS}</p>
    </div>
  ),
};
