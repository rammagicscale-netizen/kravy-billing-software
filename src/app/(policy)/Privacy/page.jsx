//src/app/(policy)/Privacy/page.jsx
import React, { use } from "react";
import Template from "@/components/global/template";
import { Headset } from "lucide-react";
import { COMPANY } from "@/constants";

export const metadata = {
    title: `Privacy Policy | ${COMPANY.NAME}`,
    description: `${COMPANY.NAME} respects your privacy and ensures secure handling of business and billing data across our software and POS systems.`,
    keywords: [
        COMPANY.NAME,
        "Privacy Policy",
        "Kravy Privacy",
        "Billing Software Security",
        "POS Data Protection",
        "Kravy Billing App",
    ],
    openGraph: {
        title: `Privacy Policy | ${COMPANY.NAME}`,
        description: `Learn how ${COMPANY.NAME} collects, uses, and protects your data.`,
        url: `${COMPANY.DOMAIN}/privacy`,
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
        description: `${COMPANY.NAME} keeps your billing and POS data secure.`,
        images: [COMPANY.OG_IMAGE],
    },
};

const PRIVACY_INFO = [
    {
        title: "1. Introduction",
        description: "Our commitment to protecting your privacy.",
        content: (
            <>
                {COMPANY.NAME}  operates billing software and POS
                solutions for businesses. This Privacy Policy explains how we collect,
                use, and safeguard your information when you use our services.
                <br />
                <br />
                By using our platform, you agree to the practices described in this
                policy.
            </>
        ),
    },
    {
        title: "2. Information We Collect",
        description: "Types of data collected from users and businesses.",
        content: (
            <>
                We collect only the information required to provide secure and efficient
                billing services:
                <ul className="list-disc pl-5 mt-3 space-y-1">
                    <li>Business details (name, address, GST number, phone)</li>
                    <li>User account details (email, phone, authentication data)</li>
                    <li>Billing and transaction records</li>
                    <li>Device information (OS, browser, IP address)</li>
                    <li>App usage data for performance improvement</li>
                </ul>
            </>
        ),
    },
    {
        title: "3. How We Use Your Information",
        description: "Purpose of collecting and processing your data.",
        content: (
            <>
                Your data is used to:
                <ul className="list-disc pl-5 mt-3 space-y-1">
                    <li>Provide billing and invoicing functionality</li>
                    <li>Authenticate users securely</li>
                    <li>Improve system performance and reliability</li>
                    <li>Enable POS hardware compatibility</li>
                    <li>Provide customer and technical support</li>
                    <li>Comply with legal obligations</li>
                </ul>
                <br />
                We do not sell or rent your data.
            </>
        ),
    },
    {
        title: "4. Data Sharing & Third-Party Services",
        description: "Limited data sharing with trusted providers.",
        content: (
            <>
                We may share data only with trusted third-party vendors required for:
                <ul className="list-disc pl-5 mt-3 space-y-1">
                    <li>Authentication services</li>
                    <li>Cloud hosting providers</li>
                    <li>Payment processing services</li>
                    <li>Analytics tools (if enabled)</li>
                </ul>
                <br />
                All third-party providers are required to maintain strict data security
                standards.
            </>
        ),
    },
    {
        title: "5. Data Security",
        description: "How we protect your business and billing information.",
        content: (
            <>
                {COMPANY.NAME} implements industry-standard encryption, secure servers,
                and restricted access controls to protect your data.
                <br />
                <br />
                While we take strong precautions, no online system can guarantee 100%
                security.
            </>
        ),
    },
    {
        title: "6. Cookies & Tracking",
        description: "Use of cookies and performance monitoring tools.",
        content: (
            <>
                Our website and platform may use cookies to enhance functionality,
                analyze traffic, and improve user experience.
                <br />
                <br />
                You can disable cookies through your browser settings if preferred.
            </>
        ),
    },
    {
        title: "7. User Rights",
        description: "Your control over your personal and business data.",
        content: (
            <>
                You have the right to:
                <ul className="list-disc pl-5 mt-3 space-y-1">
                    <li>Request access to your stored data</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your account data</li>
                    <li>Raise privacy-related concerns</li>
                </ul>
                <br />
                To submit a request, email us at{" "}
                <a
                    href={`mailto:${COMPANY.EMAIL.SUPPORT}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                    {COMPANY.EMAIL.SUPPORT}
                </a>
                .
            </>
        ),
    },
    {
        title: "8. Children’s Privacy",
        description: "Protection for minors.",
        content: (
            <>
                Our services are not intended for individuals under the age of 13.
                We do not knowingly collect personal information from children.
            </>
        ),
    },
    {
        title: "9. Policy Updates",
        description: "Changes to this Privacy Policy.",
        content: (
            <>
                We may update this Privacy Policy from time to time.
                Any updates will be reflected on this page with a revised effective date.
                Continued use of our services indicates acceptance of the updated policy.
            </>
        ),
    },
];

const PRIVACY_CONTACT = {
    title: "Need Help With Privacy Questions?",
    description:
        "Our support team is available to clarify any concerns regarding data security or usage.",
    content: (
        <div>
            <p className="mb-4">
                If you have questions regarding billing records, POS hardware data,
                or account privacy, contact our support team.
            </p>
            <p>
                Support Email:{" "}
                <a
                    href={`mailto:${COMPANY.EMAIL.SUPPORT}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                    {COMPANY.EMAIL.SUPPORT}
                </a>
                <br />
                General Email:{" "}
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

export default function PrivacyPage() {
    return (
        <Template
            title="Privacy Policy"
            heading={
                <div>
                    Your Business Data <br className="hidden sm:block" />
                    Secure with {COMPANY.NAME}
                </div>
            }
            description={`${COMPANY.NAME} is committed to protecting your business and customer information while delivering reliable billing and POS solutions.`}
            ctaDescription="Have questions about data protection or privacy practices? Contact our support team."
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