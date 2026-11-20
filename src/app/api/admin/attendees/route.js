import { NextResponse } from "next/server";
import { getAdminEmail } from "@/lib/adminAuth";
import { getAttendees, deleteAttendee, toggleCheckIn, getDashboardMetrics } from "@/lib/db";

export async function GET(request) {
  if (!(await getAdminEmail(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const attendees = await getAttendees();
  const metrics = await getDashboardMetrics();

  return NextResponse.json({
    success: true,
    attendees,
    metrics,
  });
}

export async function DELETE(request) {
  if (!(await getAdminEmail(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Attendee ID is required" }, { status: 400 });
  }

  await deleteAttendee(id);
  return NextResponse.json({ success: true, message: "Attendee removed." });
}

export async function PATCH(request) {
  if (!(await getAdminEmail(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: "Attendee ID is required" }, { status: 400 });
  }

  const updated = await toggleCheckIn(id);
  return NextResponse.json({ success: true, attendee: updated });
}
