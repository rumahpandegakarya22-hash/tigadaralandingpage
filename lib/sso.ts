import { jwtVerify } from "jose";

// Tiket singkat dari dashboard (satu rahasia bersama: LANDING_SSO_SECRET) yang ditukar jadi sesi admin.
// Password admin tidak pernah dikirim ke mana pun; login password biasa di /admin/login tetap berfungsi.

export const ISSUER_SSO = "kost-dashboard";
export const AUDIENCE_SSO = "landing-admin";
const UMUR_MAKS_DETIK = 120; // dashboard menerbitkan 60 detik; tolak yang lebih panjang walau tanda tangannya benar
const PANJANG_RAHASIA_MIN = 32;

export async function verifySsoToken(
  token: string | null | undefined,
  secret: string | undefined,
  now: Date = new Date(),
): Promise<boolean> {
  if (!token || !secret || secret.length < PANJANG_RAHASIA_MIN) return false;
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
      issuer: ISSUER_SSO,
      audience: AUDIENCE_SSO,
      algorithms: ["HS256"],
      currentDate: now,
      clockTolerance: 5,
    });
    if (typeof payload.exp !== "number" || typeof payload.iat !== "number") return false;
    return payload.exp - payload.iat <= UMUR_MAKS_DETIK;
  } catch {
    return false;
  }
}
