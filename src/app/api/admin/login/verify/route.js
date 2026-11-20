import { NextResponse } from "next/server";
import {
  normalizeEmail,
  loginCodeMatches,
  createSessionToken,
  sessionCookieOptions,
  MAX_CODE_ATTEMPTS,
} from "@/lib/adminAuth";
import {
  isAdminEmail,
  getLatestLoginCode,
  recordFailedLoginAttempt,
  consumeLoginCode,
} from "@/lib/db";

const EXPIRED = "That code has expired or was already used. Request a new one.";

function fail(error, status = 401) {
  return NextResponse.json({ error }, { status });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid request.", 400);
  }

  const email = normalizeEmail(body?.email);
  const code = String(body?.code ?? "").replace(/\s+/g, "");
  if (!email || !/^\d{6}$/.test(code)) {
    return fail("Enter the 6-digit code from your email.", 400);
  }

  try {
    if (!(await isAdminEmail(email))) return fail(EXPIRED);

    // Only the most recent code counts; sending a new one retires the rest.
    const record = await getLatestLoginCode(email);
    if (
      !record ||
      record.usedAt ||
      new Date(record.expiresAt).getTime() < Date.now() ||
      record.attempts >= MAX_CODE_ATTEMPTS
    ) {
      return fail(EXPIRED);
    }

    if (!loginCodeMatches(email, code, record.codeHash)) {
      const attempts = record.attempts + 1;
      await recordFailedLoginAttempt(record.id, attempts);
      const left = MAX_CODE_ATTEMPTS - attempts;
      return fail(
        left > 0
          ? `That code is incorrect. ${left} ${left === 1 ? "try" : "tries"} left.`
          : "Too many incorrect tries. Request a new code."
      );
    }

    if (!(await consumeLoginCode(record.id))) return fail(EXPIRED);

    const response = NextResponse.json({ success: true, email });
    response.cookies.set({ ...sessionCookieOptions(), value: createSessionToken(email) });
    // Retire the old password-era cookie if this browser still has one
    response.cookies.set({ ...sessionCookieOptions(0), name: "lilian_admin_auth", value: "" });
    return response;
  } catch (err) {
    console.error("Admin verify error:", err);
    return fail("Something went wrong. Please try again.", 500);
  }
}
