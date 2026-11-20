import "server-only";
import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import { isAdminEmail } from "@/lib/db";

// ===================================================================
// ADMIN SIGN-IN: email one-time codes + a signed session cookie
// ===================================================================
// 1. An admin enters their email. If it is in admin_users, a 6-digit code
//    is emailed to them (only a keyed hash of it is stored).
// 2. They enter the code. If it matches, is unexpired, unused and has had
//    fewer than MAX_CODE_ATTEMPTS guesses, they get a session cookie.
// 3. The cookie is "<payload>.<HMAC signature>", so it cannot be forged
//    without ADMIN_SESSION_SECRET. Every admin request also re-checks that
//    the email is still in admin_users, so removing someone locks them out
//    on their very next request.

export const SESSION_COOKIE = "lilian_admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days, in seconds

export const CODE_TTL_MS = 10 * 60 * 1000; // a code is valid for 10 minutes
export const MAX_CODE_ATTEMPTS = 5; // wrong guesses before a code is void
export const RESEND_COOLDOWN_MS = 60 * 1000; // one code per minute per email
export const MAX_CODES_PER_HOUR = 10;

// Deliberately loose: the admin_users list is the real gate, this only
// rejects input that is obviously not an email address.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(value) {
  const email = String(value ?? "").trim().toLowerCase();
  return EMAIL_PATTERN.test(email) && email.length <= 254 ? email : null;
}

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET is missing or shorter than 32 characters. " +
        "Generate one with: openssl rand -base64 48"
    );
  }
  return value;
}

function sign(purpose, data) {
  return createHmac("sha256", secret()).update(`${purpose}:${data}`).digest("base64url");
}

function safeEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

// --- ONE-TIME CODES ---

export function generateLoginCode() {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

// Bound to the email, so a code hash is useless for any other address
export function hashLoginCode(email, code) {
  return sign("login-code", `${email}:${code}`);
}

export function loginCodeMatches(email, code, storedHash) {
  return safeEqual(hashLoginCode(email, code), storedHash);
}

// --- SESSION COOKIE ---

export function createSessionToken(email) {
  const payload = Buffer.from(
    JSON.stringify({ email, exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE })
  ).toString("base64url");
  return `${payload}.${sign("session", payload)}`;
}

function readSessionToken(token) {
  if (typeof token !== "string") return null;
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra !== undefined) return null;
  if (!safeEqual(sign("session", payload), signature)) return null;

  try {
    const { email, exp } = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof email !== "string" || typeof exp !== "number") return null;
    if (exp * 1000 < Date.now()) return null;
    return email;
  } catch {
    return null;
  }
}

export function sessionCookieOptions(maxAge = SESSION_MAX_AGE) {
  return {
    name: SESSION_COOKIE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge,
    path: "/",
  };
}

// The one check every admin API route uses. Returns the signed-in admin's
// email, or null if the request is not from a current admin.
export async function getAdminEmail(request) {
  try {
    const email = readSessionToken(request.cookies.get(SESSION_COOKIE)?.value);
    if (!email) return null;
    return (await isAdminEmail(email)) ? email : null;
  } catch (err) {
    console.error("Admin session check failed:", err.message);
    return null;
  }
}
