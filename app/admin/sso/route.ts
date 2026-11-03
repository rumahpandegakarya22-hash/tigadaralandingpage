import { NextRequest, NextResponse } from "next/server";
import { createAdminSession } from "@/lib/session";
import { verifySsoToken } from "@/lib/sso";

// Masuk otomatis dari dashboard: tiket valid -> sesi admin (cookie yang sama dengan login password) -> /admin.
// Tiket tidak sah/kedaluwarsa -> halaman login biasa, tanpa memberi tahu alasannya.
export async function GET(req: NextRequest) {
  const sah = await verifySsoToken(req.nextUrl.searchParams.get("token"), process.env.LANDING_SSO_SECRET);
  if (!sah) return NextResponse.redirect(new URL("/admin/login", req.url));

  await createAdminSession();
  const res = NextResponse.redirect(new URL("/admin", req.url));
  res.headers.set("Cache-Control", "no-store");
  res.headers.set("Referrer-Policy", "no-referrer");
  return res;
}
