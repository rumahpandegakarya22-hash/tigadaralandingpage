import test from "node:test";
import assert from "node:assert/strict";
import { SignJWT } from "jose";
import { verifySsoToken, ISSUER_SSO, AUDIENCE_SSO } from "./sso";

const RAHASIA = "rahasia-uji-yang-cukup-panjang-untuk-hs256-0123456789";
const SEKARANG = new Date("2026-11-03T10:00:00Z");
const iat = Math.floor(SEKARANG.getTime() / 1000);

async function buat(opts: { rahasia?: string; iss?: string; aud?: string; iat?: number; exp?: number } = {}) {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(opts.iss ?? ISSUER_SSO)
    .setAudience(opts.aud ?? AUDIENCE_SSO)
    .setIssuedAt(opts.iat ?? iat)
    .setExpirationTime(opts.exp ?? iat + 60)
    .sign(new TextEncoder().encode(opts.rahasia ?? RAHASIA));
}

test("tiket sah diterima", async () => {
  assert.equal(await verifySsoToken(await buat(), RAHASIA, SEKARANG), true);
});

test("tiket kedaluwarsa ditolak", async () => {
  const lewat = new Date(SEKARANG.getTime() + 120_000);
  assert.equal(await verifySsoToken(await buat(), RAHASIA, lewat), false);
});

test("tiket dengan rahasia lain ditolak", async () => {
  const t = await buat({ rahasia: "rahasia-lain-yang-juga-cukup-panjang-0123456789ab" });
  assert.equal(await verifySsoToken(t, RAHASIA, SEKARANG), false);
});

test("issuer atau audience salah ditolak", async () => {
  assert.equal(await verifySsoToken(await buat({ iss: "penyerang" }), RAHASIA, SEKARANG), false);
  assert.equal(await verifySsoToken(await buat({ aud: "aplikasi-lain" }), RAHASIA, SEKARANG), false);
});

test("masa berlaku terlalu panjang ditolak walau tanda tangan benar", async () => {
  assert.equal(await verifySsoToken(await buat({ exp: iat + 3600 }), RAHASIA, SEKARANG), false);
});

test("tanpa token, token sampah, atau rahasia kosong/pendek ditolak", async () => {
  assert.equal(await verifySsoToken(undefined, RAHASIA, SEKARANG), false);
  assert.equal(await verifySsoToken(null, RAHASIA, SEKARANG), false);
  assert.equal(await verifySsoToken("", RAHASIA, SEKARANG), false);
  assert.equal(await verifySsoToken("bukan.jwt.sama-sekali", RAHASIA, SEKARANG), false);
  const t = await buat();
  assert.equal(await verifySsoToken(t, undefined, SEKARANG), false);
  assert.equal(await verifySsoToken(t, "", SEKARANG), false);
  assert.equal(await verifySsoToken(t, "pendek", SEKARANG), false);
});

test("token tanpa tanda tangan (alg none) ditolak", async () => {
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const none = `${b64({ alg: "none", typ: "JWT" })}.${b64({ iss: ISSUER_SSO, aud: AUDIENCE_SSO, iat, exp: iat + 60 })}.`;
  assert.equal(await verifySsoToken(none, RAHASIA, SEKARANG), false);
});
