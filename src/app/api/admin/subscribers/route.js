import { NextResponse } from "next/server";
import { getSubscribers, deleteSubscriber } from "@/lib/db";

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

  const subscribers = getSubscribers();
  return NextResponse.json({
    success: true,
    subscribers,
  });
}

export async function DELETE(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Subscriber ID/Email is required" }, { status: 400 });
  }

  deleteSubscriber(id);
  return NextResponse.json({ success: true, message: "Subscriber removed." });
}
