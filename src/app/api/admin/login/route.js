import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.ADMIN_PASSWORD || "lilian2026";

    if (password === correctPassword) {
      const response = NextResponse.json({
        success: true,
        message: "Authenticated successfully.",
      });

      // Set auth cookie
      response.cookies.set({
        name: "lilian_admin_auth",
        value: "authenticated_admin_session",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { error: "Invalid admin passcode." },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Error processing login." },
      { status: 500 }
    );
  }
}
