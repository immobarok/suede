import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "suede_admin_session";
const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 8;

function getAdminPassword(): string {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  if (!password) {
    throw new Error("Missing ADMIN_DASHBOARD_PASSWORD in environment");
  }
  return password;
}

function getAdminSessionSecret(): string {
  return process.env.ADMIN_DASHBOARD_SESSION_SECRET || getAdminPassword();
}

function signPayload(payloadBase64: string): string {
  const secret = getAdminSessionSecret();
  return crypto
    .createHmac("sha256", secret)
    .update(payloadBase64)
    .digest("base64url");
}

function timingSafeEqual(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

function buildSessionToken(): string {
  const payload = {
    exp: Math.floor(Date.now() / 1000) + ADMIN_SESSION_TTL_SECONDS,
    role: "admin",
  };

  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString(
    "base64url",
  );
  const signature = signPayload(payloadBase64);
  return `${payloadBase64}.${signature}`;
}

export function verifyAdminPassword(password: string): boolean {
  const seeded = getAdminPassword();
  return timingSafeEqual(password, seeded);
}

export async function setAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: ADMIN_SESSION_COOKIE,
    value: buildSessionToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: ADMIN_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function hasValidAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    return false;
  }

  const [payloadBase64, signature] = token.split(".");
  if (!payloadBase64 || !signature) {
    return false;
  }

  const expectedSignature = signPayload(payloadBase64);
  if (!timingSafeEqual(signature, expectedSignature)) {
    return false;
  }

  try {
    const payloadRaw = Buffer.from(payloadBase64, "base64url").toString("utf8");
    const payload = JSON.parse(payloadRaw) as { exp?: number; role?: string };

    if (payload.role !== "admin" || !payload.exp) {
      return false;
    }

    return payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}
