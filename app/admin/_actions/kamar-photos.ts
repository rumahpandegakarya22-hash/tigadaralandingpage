"use server";

import { z } from "zod";
import { and, asc, eq, max, ne } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { landingKamarPhotos } from "@/lib/db/schema";
import { requireAdmin, revalidateProperty } from "@/lib/admin/crud-helpers";

const schema = z.object({
  noKamar: z.coerce.number().int().positive("Nomor kamar wajib diisi"),
  url: z.string().url("URL foto tidak valid"),
  alt: z.string().optional(),
  isCover: z.enum(["Tidak", "Ya"]).default("Tidak"),
});

function parse(formData: FormData) {
  return schema.parse({
    noKamar: formData.get("noKamar"),
    url: formData.get("url"),
    alt: String(formData.get("alt") ?? "").trim() || undefined,
    isCover: formData.get("isCover") ?? "Tidak",
  });
}

// Satu cover per nomor kamar: bila baris ini cover, cover lama di nomor yang sama dicabut.
async function clearOtherCovers(noKamar: number, keepId: number) {
  await db
    .update(landingKamarPhotos)
    .set({ isCover: 0 })
    .where(and(eq(landingKamarPhotos.noKamar, noKamar), ne(landingKamarPhotos.id, keepId)));
}

export async function createKamarPhoto(slug: string, formData: FormData) {
  await requireAdmin();
  const { isCover, ...data } = parse(formData);
  const [{ top }] = await db
    .select({ top: max(landingKamarPhotos.order) })
    .from(landingKamarPhotos)
    .where(eq(landingKamarPhotos.noKamar, data.noKamar));
  const [row] = await db
    .insert(landingKamarPhotos)
    .values({ ...data, order: (top ?? -1) + 1, isCover: isCover === "Ya" ? 1 : 0 })
    .returning({ id: landingKamarPhotos.id });
  if (isCover === "Ya") await clearOtherCovers(data.noKamar, row.id);
  revalidateProperty(slug);
}

export async function updateKamarPhoto(slug: string, id: number, formData: FormData) {
  await requireAdmin();
  const { isCover, ...data } = parse(formData);
  await db
    .update(landingKamarPhotos)
    .set({ ...data, isCover: isCover === "Ya" ? 1 : 0, updatedAt: new Date().toISOString() })
    .where(eq(landingKamarPhotos.id, id));
  if (isCover === "Ya") await clearOtherCovers(data.noKamar, id);
  revalidateProperty(slug);
}

export async function deleteKamarPhoto(slug: string, id: number) {
  await requireAdmin();
  await db.delete(landingKamarPhotos).where(eq(landingKamarPhotos.id, id));
  revalidateProperty(slug);
}

// Urutan hanya berlaku di dalam satu nomor kamar (grup foto yang sama).
export async function moveKamarPhoto(slug: string, id: number, direction: "up" | "down") {
  await requireAdmin();
  const [row] = await db.select().from(landingKamarPhotos).where(eq(landingKamarPhotos.id, id));
  if (!row) return;
  const group = await db
    .select()
    .from(landingKamarPhotos)
    .where(eq(landingKamarPhotos.noKamar, row.noKamar))
    .orderBy(asc(landingKamarPhotos.order), asc(landingKamarPhotos.id));
  const i = group.findIndex((r) => r.id === id);
  const j = direction === "up" ? i - 1 : i + 1;
  if (i === -1 || j < 0 || j >= group.length) return;
  // Tulis ulang urutan 0..n agar tetap konsisten walau ada nilai `order` yang sama.
  const reordered = [...group];
  [reordered[i], reordered[j]] = [reordered[j], reordered[i]];
  for (const [idx, r] of reordered.entries()) {
    await db.update(landingKamarPhotos).set({ order: idx }).where(eq(landingKamarPhotos.id, r.id));
  }
  revalidateProperty(slug);
}
