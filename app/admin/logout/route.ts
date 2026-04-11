import { NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/lib/auth/admin-session";

export async function POST(request: Request) {
  await clearAdminSessionCookie();
  return NextResponse.redirect(new URL("/admin/login", request.url));
}
