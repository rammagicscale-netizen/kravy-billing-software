//src/app/api/phonepe/status/[id]/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

const BASE_URL =
process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function POST(req, { params }) {

const merchantOrderId = params.id;

await connectToDatabase();

try {

let code = null;

try {
const formData = await req.formData();
code = formData.get("code");
} catch {}

if (code === "PAYMENT_SUCCESS") {

await Order.findOneAndUpdate(
{ transactionId: merchantOrderId },
{ paymentStatus: "SUCCESS" }
);

return NextResponse.redirect(
`${BASE_URL}/checkout/success?orderId=${merchantOrderId}`,
{ status: 303 }
);
}

await Order.findOneAndUpdate(
{ transactionId: merchantOrderId },
{ paymentStatus: "FAILED" }
);

return NextResponse.redirect(
`${BASE_URL}/checkout/failed?transactionId=${merchantOrderId}`,
{ status: 303 }
);

} catch (error) {

return NextResponse.redirect(
`${BASE_URL}/checkout/failed?transactionId=${merchantOrderId}`
);
}
}