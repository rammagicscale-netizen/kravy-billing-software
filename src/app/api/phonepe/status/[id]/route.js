import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// PhonePe redirects back to this URL, usually via POST with form data
export async function POST(req, { params }) {
    try {
        const { id: merchantOrderId } = await params;

        let isSuccess = false;

        try {
            // PhonePe typically sends details as form data on redirect
            const formData = await req.formData();
            const code = formData.get("code");
            console.log("PhonePe Redirect Form Data:", Object.fromEntries(formData));

            if (code === "PAYMENT_SUCCESS") {
                isSuccess = true;
            }
        } catch (e) {
            console.log("Could not parse form data on PhonePe redirect", e.message);
        }

        if (isSuccess) {
            return NextResponse.redirect(`${BASE_URL}/checkout/success?id=${merchantOrderId}`, {
                status: 303,
            });
        } else {
            return NextResponse.redirect(`${BASE_URL}/checkout/failed?id=${merchantOrderId}`, {
                status: 303,
            });
        }
    } catch (error) {
        console.error("PhonePe Redirect Handler Error:", error.message);
        return NextResponse.redirect(`${BASE_URL}/checkout/failed`, {
            status: 303,
        });
    }
}

// Fallback GET handled just in case they redirect via GET
export async function GET(req, { params }) {
    try {
        const { id: merchantOrderId } = await params;
        const url = new URL(req.url);
        const code = url.searchParams.get("code");

        if (code === "PAYMENT_SUCCESS") {
            return NextResponse.redirect(`${BASE_URL}/checkout/success?id=${merchantOrderId}`);
        } else {
            return NextResponse.redirect(`${BASE_URL}/checkout/failed?id=${merchantOrderId}`);
        }
    } catch (error) {
        return NextResponse.redirect(`${BASE_URL}/checkout/failed`);
    }
}
