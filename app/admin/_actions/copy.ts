"use server";

import { inArray } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { landingCopy } from "@/lib/db/schema";
import { COPY_SECTIONS, DEFAULT_COPY } from "@/lib/copy";
import { requireAdmin, revalidateProperty } from "@/lib/admin/crud-helpers";

/** Simpan teks satu section. Kosong atau sama dengan bawaan → baris override dihapus (kembali ke default). */
export async function saveCopy(slug: string, sectionId: string, formData: FormData) {
  await requireAdmin();
  const section = COPY_SECTIONS.find((s) => s.id === sectionId);
  if (!section) throw new Error("Section tidak dikenal");

  const now = new Date().toISOString();
  const toDelete: string[] = [];

  for (const { key } of section.fields) {
    const value = String(formData.get(key) ?? "").trim();
    if (!value || value === DEFAULT_COPY[key]) {
      toDelete.push(key);
      continue;
    }
    await db
      .insert(landingCopy)
      .values({ key, value, updatedAt: now })
      .onConflictDoUpdate({ target: landingCopy.key, set: { value, updatedAt: now } });
  }

  if (toDelete.length) await db.delete(landingCopy).where(inArray(landingCopy.key, toDelete));
  revalidateProperty(slug);
}
