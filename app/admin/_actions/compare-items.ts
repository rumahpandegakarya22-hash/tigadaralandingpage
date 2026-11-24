"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { landingCopy } from "@/lib/db/schema";
import { COMPARE_ITEMS_KEY } from "@/lib/compare";
import { requireAdmin, revalidateProperty } from "@/lib/admin/crud-helpers";

const itemSchema = z.object({
  id: z.string().min(1).max(40),
  label: z.string().trim().max(40).optional(),
  keywords: z.array(z.string().trim().min(1).max(40)).max(10).optional(),
  enabled: z.boolean().optional(),
  custom: z.boolean().optional(),
});
const schema = z
  .array(itemSchema)
  .max(60)
  .refine((items) => items.every((i) => !i.custom || (i.label && i.keywords?.length)), {
    message: "Item tambahan wajib punya nama dan minimal satu kata kunci",
  });

/** Simpan daftar item perbandingan sebagai JSON di landing_copy (tanpa mengubah struktur tabel). */
export async function saveCompareItems(slug: string, json: string) {
  await requireAdmin();
  const items = schema.parse(JSON.parse(json));
  const now = new Date().toISOString();
  await db
    .insert(landingCopy)
    .values({ key: COMPARE_ITEMS_KEY, value: JSON.stringify(items), updatedAt: now })
    .onConflictDoUpdate({ target: landingCopy.key, set: { value: JSON.stringify(items), updatedAt: now } });
  revalidateProperty(slug);
}

/** Kembali ke daftar item bawaan: hapus baris pengaturan. */
export async function resetCompareItems(slug: string) {
  await requireAdmin();
  await db.delete(landingCopy).where(eq(landingCopy.key, COMPARE_ITEMS_KEY));
  revalidateProperty(slug);
}
