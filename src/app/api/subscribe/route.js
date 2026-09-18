import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const result = addSubscriber(email);

    return NextResponse.json({
      success: true,
      message: result.existing
        ? "You are already subscribed to the community!"
        : "Thank you for subscribing! Welcome to the praise tribe.",
      subscriber: result.subscriber,
    });
  } catch (err) {
    console.error("API subscribe error:", err);
    return NextResponse.json(
      { error: "Internal server error processing subscription." },
      { status: 500 }
    );
  }
}
