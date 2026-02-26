import { NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";

const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || "PGMXXXXXXXX";
const SALT_KEY = process.env.PHONEPE_SALT_KEY || "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX || "1";
const PHONEPE_BASE_URL = process.env.PHONEPE_BASE_URL || "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

export async function POST(req) {
    try {
        const { amount, transactionId, mobileNumber, userId } = await req.json();

        const payload = {
            merchantId: MERCHANT_ID,
            merchantTransactionId: transactionId,
            merchantUserId: userId || "user_" + Date.now(),
            amount: amount * 100, // amount in paisa
            redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/phonepe/status/${transactionId}`,
            redirectMode: "POST",
            callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/phonepe/status/${transactionId}`,
            mobileNumber: mobileNumber,
            paymentInstrument: {
                type: "PAY_PAGE",
            },
        };

        const dataPayload = JSON.stringify(payload);
        const dataBase64 = Buffer.from(dataPayload).toString("base64");

        const fullURL = dataBase64 + "/pg/v1/pay" + SALT_KEY;
        const checksum = crypto.createHash("sha256").update(fullURL).digest("hex") + "###" + SALT_INDEX;

        const options = {
            method: "POST",
            url: PHONEPE_BASE_URL,
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "X-VERIFY": checksum,
            },
            data: {
                request: dataBase64,
            },
        };

        const response = await axios.request(options);

        return NextResponse.json({
            url: response.data.data.instrumentResponse.redirectInfo.url,
        });
    } catch (error) {
        console.error("PhonePe Initiation Error:", error.response?.data || error.message);
        return NextResponse.json(
            { error: "Payment initiation failed" },
            { status: 500 }
        );
    }
}
