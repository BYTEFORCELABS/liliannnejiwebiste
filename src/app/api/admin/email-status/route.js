import { NextResponse } from "next/server";
import { getAdminEmail } from "@/lib/adminAuth";
import { getEmailProviderStatus, sendReverbTicketEmail } from "@/lib/email";

export async function GET(request) {
  if (!(await getAdminEmail(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const status = getEmailProviderStatus();
  return NextResponse.json({ success: true, status });
}

export async function POST(request) {
  if (!(await getAdminEmail(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { testEmail } = await request.json();
    if (!testEmail) {
      return NextResponse.json({ error: "Recipient email is required" }, { status: 400 });
    }

    const testAttendee = {
      fullName: "Admin Test Attendee",
      gender: "Female",
      email: testEmail,
      city: "Port Harcourt",
      ticketCode: "TEST-TICKET-2026",
    };

    const result = await sendReverbTicketEmail(testAttendee);
    return NextResponse.json({ success: true, result });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
