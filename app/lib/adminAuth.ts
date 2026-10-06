import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "lh_admin";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 12; // 12 hours

function adminPassword() {
  const password = process.env.ADMIN_PASSWORD;
  return password && password.length >= 8 ? password : null;
}

export function isAdminConfigured() {
  return adminPassword() !== null;
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

// The session cookie is derived from the password, so changing the password
// signs every admin out.
export function sessionToken() {
  const password = adminPassword();
  if (!password) return null;
  return createHmac("sha256", password).update("lh-admin-session").digest("hex");
}

export function isCorrectPassword(candidate: unknown) {
  const password = adminPassword();
  if (!password || typeof candidate !== "string") return false;
  const digest = (value: string) =>
    createHmac("sha256", "lh-admin-login").update(value).digest("hex");
  return safeEqual(digest(candidate), digest(password));
}

export async function isAdmin() {
  const expected = sessionToken();
  if (!expected) return false;
  const cookie = (await cookies()).get(ADMIN_COOKIE)?.value;
  return typeof cookie === "string" && safeEqual(cookie, expected);
}
