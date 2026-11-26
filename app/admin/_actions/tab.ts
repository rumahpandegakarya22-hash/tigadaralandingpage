"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db/client";
import { landingCopy } from "@/lib/db/schema";
import { requireAdmin, revalidateProperty } from "@/lib/admin/crud-helpers";

const schema = z.object({
  icon: z.union([z.literal(""), z.url({ protocol: /^https$/, error: "URL ikon harus https" })]),
  title: z.string().max(120, "Judul maksimal 120 karakter"),
});

/** Kosong → baris dihapus (kembali ke bawaan). */
export async function saveTabSettings(slug: string, propertyId: number, formData: FormData) {
  await requireAdmin();
  const data = schema.parse({
    icon: String(formData.get("icon") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
  });
  const now = new Date().toISOString();

  for (const [key, value] of [
    ["tab_icon_url", data.icon],
    [`tab_title_${propertyId}`, data.title],
  ]) {
    if (!value) {
      await db.delete(landingCopy).where(eq(landingCopy.key, key));
      continue;
    }
    await db
      .insert(landingCopy)
      .values({ key, value, updatedAt: now })
      .onConflictDoUpdate({ target: landingCopy.key, set: { value, updatedAt: now } });
  }

  revalidateProperty(slug);
  revalidatePath("/", "layout"); // ikon dipasang di root layout, dipakai semua halaman
}
