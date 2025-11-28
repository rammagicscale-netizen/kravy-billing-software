import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

// ✅ Handle POST /api/enquiry
export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const {
      name,
      email,
      phone,
      message,
      businessType,
      storeName,
      city,
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Name and phone are required." },
        { status: 400 }
      );
    }

    await Enquiry.create({
      name,
      email,
      phone,
      message,
      businessType,
      storeName,
      city,
    });

    return NextResponse.json(
      { success: true, message: "Enquiry submitted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("ENQUIRY_API_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong on the server." },
      { status: 500 }
    );
  }
}

// ✅ Optional GET (helps to test quickly)
export async function GET() {
  return NextResponse.json(
    { success: true, message: "Use POST to submit enquiries." },
    { status: 200 }
  );
}
