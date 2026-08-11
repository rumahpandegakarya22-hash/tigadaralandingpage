"use server";

import { z } from "zod";
import { landingFacilities } from "@/lib/db/schema";
import { createRow, updateRow, deleteRow, reorderRow, nextOrder, revalidateProperty } from "@/lib/admin/crud-helpers";
import { facilityIconOptions } from "@/lib/icon-options";

const schema = z.object({
  name: z.string().min(1, "Nama fasilitas wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  icon: z.enum(facilityIconOptions),
  photoUrl: z.string().url("URL foto tidak valid"),
  photoAlt: z.string().min(1, "Deskripsi foto wajib diisi"),
});

function parseForm(formData: FormData) {
  return schema.parse({
    name: formData.get("name"),
    description: formData.get("description"),
    icon: formData.get("icon"),
    photoUrl: formData.get("photoUrl"),
    photoAlt: formData.get("photoAlt"),
  });
}

export async function createFacility(propertyId: number, slug: string, formData: FormData) {
  const data = parseForm(formData);
  const order = await nextOrder(landingFacilities, propertyId);
  await createRow(landingFacilities, { ...data, propertyId, order });
  revalidateProperty(slug);
}

export async function updateFacility(slug: string, id: number, formData: FormData) {
  const data = parseForm(formData);
  await updateRow(landingFacilities, id, data);
  revalidateProperty(slug);
}

export async function deleteFacility(slug: string, id: number) {
  await deleteRow(landingFacilities, id);
  revalidateProperty(slug);
}

export async function moveFacility(propertyId: number, slug: string, id: number, direction: "up" | "down") {
  await reorderRow(landingFacilities, id, propertyId, direction);
  revalidateProperty(slug);
}
