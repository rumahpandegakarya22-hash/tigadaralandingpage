"use server";

import { z } from "zod";
import { landingHighlights } from "@/lib/db/schema";
import { createRow, updateRow, deleteRow, reorderRow, nextOrder, revalidateProperty } from "@/lib/admin/crud-helpers";
import { highlightIconOptions } from "@/lib/icon-options";

const schema = z.object({
  label: z.string().min(1, "Label wajib diisi"),
  icon: z.enum(highlightIconOptions),
});

export async function createHighlight(propertyId: number, slug: string, formData: FormData) {
  const data = schema.parse({ label: formData.get("label"), icon: formData.get("icon") });
  const order = await nextOrder(landingHighlights, propertyId);
  await createRow(landingHighlights, { ...data, propertyId, order });
  revalidateProperty(slug);
}

export async function updateHighlight(slug: string, id: number, formData: FormData) {
  const data = schema.parse({ label: formData.get("label"), icon: formData.get("icon") });
  await updateRow(landingHighlights, id, data);
  revalidateProperty(slug);
}

export async function deleteHighlight(slug: string, id: number) {
  await deleteRow(landingHighlights, id);
  revalidateProperty(slug);
}

export async function moveHighlight(propertyId: number, slug: string, id: number, direction: "up" | "down") {
  await reorderRow(landingHighlights, id, propertyId, direction);
  revalidateProperty(slug);
}
