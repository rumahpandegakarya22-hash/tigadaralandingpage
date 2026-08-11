"use server";

import { z } from "zod";
import { landingGalleryPhotos } from "@/lib/db/schema";
import { createRow, updateRow, deleteRow, reorderRow, nextOrder, revalidateProperty } from "@/lib/admin/crud-helpers";

const schema = z.object({
  url: z.string().url("URL foto tidak valid"),
  alt: z.string().min(1, "Deskripsi foto wajib diisi"),
});

export async function createGalleryPhoto(propertyId: number, slug: string, formData: FormData) {
  const data = schema.parse({ url: formData.get("url"), alt: formData.get("alt") });
  const order = await nextOrder(landingGalleryPhotos, propertyId);
  await createRow(landingGalleryPhotos, { ...data, propertyId, order });
  revalidateProperty(slug);
}

export async function updateGalleryPhoto(slug: string, id: number, formData: FormData) {
  const data = schema.parse({ url: formData.get("url"), alt: formData.get("alt") });
  await updateRow(landingGalleryPhotos, id, data);
  revalidateProperty(slug);
}

export async function deleteGalleryPhoto(slug: string, id: number) {
  await deleteRow(landingGalleryPhotos, id);
  revalidateProperty(slug);
}

export async function moveGalleryPhoto(propertyId: number, slug: string, id: number, direction: "up" | "down") {
  await reorderRow(landingGalleryPhotos, id, propertyId, direction);
  revalidateProperty(slug);
}
