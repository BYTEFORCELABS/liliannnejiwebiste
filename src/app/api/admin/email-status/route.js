import { NextResponse } from "next/server";
import { getEmailProviderStatus, sendReverbTicketEmail } from "@/lib/email";

function isAuthorized(request) {
  const cookie = request.cookies.get("lilian_admin_auth");
  const authHeader = request.headers.get("authorization");
  const adminPass = process.env.ADMIN_PASSWORD || "lilian2026";

  if (cookie?.value === "authenticated_admin_session") return true;
  if (authHeader === `Bearer ${adminPass}`) return true;
  return false;
}

export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const status = getEmailProviderStatus();
  return NextResponse.json({ success: true, status });
}

export async function POST(request) {
  if (!isAuthorized(request)) {
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
