import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken, ADMIN_SESSION_COOKIE } from "@/lib/session";

export async function proxy(request: NextRequest) {
  // /admin/sso memverifikasi tiketnya sendiri (lihat app/admin/sso/route.ts), jadi tidak butuh sesi lebih dulu.
  if (request.nextUrl.pathname === "/admin/login" || request.nextUrl.pathname === "/admin/sso") {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const isAuthed = await verifySessionToken(token);

  if (!isAuthed) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
