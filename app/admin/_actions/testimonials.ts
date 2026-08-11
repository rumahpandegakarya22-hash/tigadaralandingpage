"use server";

import { z } from "zod";
import { landingTestimonials } from "@/lib/db/schema";
import { createRow, updateRow, deleteRow, reorderRow, nextOrder, revalidateProperty } from "@/lib/admin/crud-helpers";

const schema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  initials: z.string().min(1, "Inisial wajib diisi").max(3),
  rating: z.coerce.number().int().min(1).max(5),
  role: z.string().min(1, "Peran/pekerjaan wajib diisi"),
  quote: z.string().min(1, "Kutipan wajib diisi"),
});

function parseForm(formData: FormData) {
  return schema.parse({
    name: formData.get("name"),
    initials: formData.get("initials"),
    rating: formData.get("rating"),
    role: formData.get("role"),
    quote: formData.get("quote"),
  });
}

export async function createTestimonial(propertyId: number, slug: string, formData: FormData) {
  const data = parseForm(formData);
  const order = await nextOrder(landingTestimonials, propertyId);
  await createRow(landingTestimonials, { ...data, propertyId, order });
  revalidateProperty(slug);
}

export async function updateTestimonial(slug: string, id: number, formData: FormData) {
  const data = parseForm(formData);
  await updateRow(landingTestimonials, id, data);
  revalidateProperty(slug);
}

export async function deleteTestimonial(slug: string, id: number) {
  await deleteRow(landingTestimonials, id);
  revalidateProperty(slug);
}

export async function moveTestimonial(propertyId: number, slug: string, id: number, direction: "up" | "down") {
  await reorderRow(landingTestimonials, id, propertyId, direction);
  revalidateProperty(slug);
}
