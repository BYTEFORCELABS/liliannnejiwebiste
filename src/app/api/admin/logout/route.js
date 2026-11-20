import { NextResponse } from "next/server";
import { sessionCookieOptions } from "@/lib/adminAuth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({ ...sessionCookieOptions(0), value: "" });
  response.cookies.set({ ...sessionCookieOptions(0), name: "lilian_admin_auth", value: "" });
  return response;
}
