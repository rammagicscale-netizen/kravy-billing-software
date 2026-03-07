import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req) {

  const auth = req.headers.get("authorization");

  const expected = "Basic " + Buffer
    .from("kravy_webhook:kravyWebhook@2026")
    .toString("base64");

  if (auth !== expected) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const { merchantOrderId, state } = body;

  await connectToDatabase();

  if (state === "COMPLETED") {

    await Order.findOneAndUpdate(
      { transactionId: merchantOrderId },
      { paymentStatus: "SUCCESS" }
    );

  } else if (state === "FAILED") {

    await Order.findOneAndUpdate(
      { transactionId: merchantOrderId },
      { paymentStatus: "FAILED" }
    );

  }

  return Response.json({ success: true });
}