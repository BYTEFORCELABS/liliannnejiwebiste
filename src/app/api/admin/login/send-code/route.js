import { NextResponse } from "next/server";
import {
  normalizeEmail,
  generateLoginCode,
  hashLoginCode,
  CODE_TTL_MS,
  RESEND_COOLDOWN_MS,
  MAX_CODES_PER_HOUR,
} from "@/lib/adminAuth";
import { isAdminEmail, getLatestLoginCode, getRecentLoginCodeTimes, createLoginCode } from "@/lib/db";
import { sendAdminLoginCodeEmail } from "@/lib/email";

const HOUR_MS = 60 * 60 * 1000;

// The same answer whether or not the email is an admin, so this form
// cannot be used to find out who the admins are.
const SENT = {
  success: true,
  message: "If that email is on the admin list, a 6-digit code is on its way.",
};

// Limits are reported, not swallowed: a silent "on its way" with no email
// looks exactly like a delivery failure. This does reveal that the email is
// an admin, but only to someone who has just requested codes for it.
function tooSoon(error, retryAfterSeconds) {
  return NextResponse.json(
    { error, retryAfter: retryAfterSeconds },
    { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
  );
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = normalizeEmail(body?.email);
  if (!email) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    if (!(await isAdminEmail(email))) {
      return NextResponse.json(SENT);
    }

    const now = Date.now();

    const latest = await getLatestLoginCode(email);
    const sinceLatest = latest ? now - new Date(latest.createdAt).getTime() : Infinity;
    if (sinceLatest < RESEND_COOLDOWN_MS) {
      const wait = Math.ceil((RESEND_COOLDOWN_MS - sinceLatest) / 1000);
      return tooSoon(
        `A code was sent to this email less than a minute ago. Check your inbox and spam, or request a new one in ${wait}s.`,
        wait
      );
    }

    const sentTimes = await getRecentLoginCodeTimes(email, new Date(now - HOUR_MS).toISOString());
    if (sentTimes.length >= MAX_CODES_PER_HOUR) {
      // The limit lifts when the oldest code in the window turns an hour old
      const wait = Math.ceil((sentTimes[0] + HOUR_MS - now) / 1000);
      const minutes = Math.max(1, Math.ceil(wait / 60));
      console.warn(`Admin sign-in: hourly code limit reached for ${email}`);
      return tooSoon(
        `Too many codes requested for this email. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`,
        wait
      );
    }

    const code = generateLoginCode();
    await createLoginCode({
      email,
      codeHash: hashLoginCode(email, code),
      expiresAt: new Date(Date.now() + CODE_TTL_MS).toISOString(),
    });

    const result = await sendAdminLoginCodeEmail(email, code);
    if (!result.success) {
      return NextResponse.json(
        { error: "We couldn't send the code email right now. Please try again shortly." },
        { status: 502 }
      );
    }

    return NextResponse.json(SENT);
  } catch (err) {
    console.error("Admin send-code error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
