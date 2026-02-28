import { NextResponse } from "next/server";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const PHONEPE_ENV = process.env.PHONEPE_ENV || "PROD"; // Using PROD since credentials look like LIVE credentials

const TOKEN_URL = PHONEPE_ENV === "PROD"
    ? "https://api.phonepe.com/apis/identity-manager/v1/oauth/token"
    : "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token";

const PAY_URL = PHONEPE_ENV === "PROD"
    ? "https://api.phonepe.com/apis/pg/checkout/v2/pay"
    : "https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay";

async function getAccessToken() {
    const CLIENT_ID = process.env.PHONEPE_CLIENT_ID;
    const CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET;
    const CLIENT_VERSION = process.env.PHONEPE_CLIENT_VERSION || "1";

    try {
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
        params.append("client_id", CLIENT_ID);
        params.append("client_version", CLIENT_VERSION);
        params.append("client_secret", CLIENT_SECRET);

        const response = await axios.post(TOKEN_URL, params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        return response.data.access_token;
    } catch (error) {
        console.error("Token Fetch Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch access token");
    }
}

export async function POST(req) {
    const CLIENT_ID = process.env.PHONEPE_CLIENT_ID;
    const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || CLIENT_ID;
    const CLIENT_VERSION = process.env.PHONEPE_CLIENT_VERSION || "1";

    try {
        const { amount, transactionId, mobileNumber } = await req.json();

        const token = await getAccessToken();

        const payload = {
            merchantOrderId: transactionId,
            amount: Math.round(amount * 100), // convert to paisa
            paymentFlow: {
                type: "PG_CHECKOUT",
                merchantUrls: {
                    redirectUrl: `${BASE_URL}/api/phonepe/status/${transactionId}`,
                }
            }
        };

        console.log("PhonePe API Payload:", JSON.stringify(payload));
        console.log("Using CLIENT_ID:", CLIENT_ID);
        console.log("Using MERCHANT_ID:", MERCHANT_ID);
        console.log("Using CLIENT_VERSION:", CLIENT_VERSION);

        const response = await axios.post(PAY_URL, payload, {
            headers: {
                Authorization: `O-Bearer ${token}`,
                "Content-Type": "application/json",
                "X-MERCHANT-ID": MERCHANT_ID
            },
        });

        console.log("PhonePe PAY API Response:", response.data);

        // PhonePe responds with redirectUrl inside the root or data object
        const redirectUrl = response.data.redirectUrl || (response.data.data && response.data.data.redirectUrl);

        if (redirectUrl) {
            return NextResponse.json({ url: redirectUrl });
        } else {
            throw new Error(response.data.message || "Payment initiation failed");
        }
    } catch (error) {
        console.error("PhonePe Initiation Error:", error.response?.data || error.message);
        return NextResponse.json(
            {
                error: error.response?.data?.message || "Payment initiation failed",
                details: error.message,
                remoteResponse: error.response?.data
            },
            { status: 500 }
        );
    }
}
