import { NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";

const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || "PGMXXXXXXXX";
const SALT_KEY = process.env.PHONEPE_SALT_KEY || "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX || "1";

export async function POST(req, { params }) {
    try {
        const { id: merchantTransactionId } = await params;

        // After payment, PhonePe redirects back with a POST request
        // We check the status using PhonePe Status API
        const checkStatusUrl = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`;

        const string = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + SALT_KEY;
        const checksum = crypto.createHash("sha256").update(string).digest("hex") + "###" + SALT_INDEX;

        const options = {
            method: "GET",
            url: checkStatusUrl,
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "X-VERIFY": checksum,
                "X-MERCHANT-ID": MERCHANT_ID,
            },
        };

        const response = await axios.request(options);

        console.log("PhonePe Status Response:", response.data);

        if (response.data.success === true) {
            // Payment Successful
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/checkout/success?id=${merchantTransactionId}`,
                { status: 303 }
            );
        } else {
            // Payment Failed
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/checkout/failed?id=${merchantTransactionId}`,
                { status: 303 }
            );
        }
    } catch (error) {
        console.error("PhonePe Status Check Error:", error.response?.data || error.message);
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/checkout/failed`,
            { status: 303 }
        );
    }
}
