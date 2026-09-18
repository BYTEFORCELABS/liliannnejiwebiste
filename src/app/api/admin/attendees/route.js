import { NextResponse } from "next/server";
import { getAttendees, deleteAttendee, toggleCheckIn, getDashboardMetrics } from "@/lib/db";

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

  const attendees = getAttendees();
  const metrics = getDashboardMetrics();

  return NextResponse.json({
    success: true,
    attendees,
    metrics,
  });
}

export async function DELETE(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Attendee ID is required" }, { status: 400 });
  }

  deleteAttendee(id);
  return NextResponse.json({ success: true, message: "Attendee removed." });
}

export async function PATCH(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: "Attendee ID is required" }, { status: 400 });
  }

  const updated = toggleCheckIn(id);
  return NextResponse.json({ success: true, attendee: updated });
}
