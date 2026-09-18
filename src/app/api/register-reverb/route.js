import { NextResponse } from "next/server";
import { addAttendee } from "@/lib/db";
import { sendReverbTicketEmail } from "@/lib/email";

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, gender, email, phone, city } = body;

    // Validation
    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Full name and email are required." },
        { status: 400 }
      );
    }

    // Save attendee to persistent database
    const attendee = addAttendee({
      fullName,
      gender: gender || "Male",
      email,
      phone: phone || "",
      city: city || "",
    });

    // Send confirmation admission pass email asynchronously
    const emailResult = await sendReverbTicketEmail(attendee);

    return NextResponse.json({
      success: true,
      message: "Registration successful! Admission ticket generated.",
      attendee,
      emailResult,
    });
  } catch (err) {
    console.error("API register-reverb error:", err);
    return NextResponse.json(
      { error: "Internal server error processing registration." },
      { status: 500 }
    );
  }
}
