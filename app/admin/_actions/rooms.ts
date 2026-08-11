"use server";

import { z } from "zod";
import { landingRooms } from "@/lib/db/schema";
import { createRow, updateRow, deleteRow, reorderRow, nextOrder, revalidateProperty } from "@/lib/admin/crud-helpers";

const schema = z.object({
  name: z.string().min(1, "Nama tipe kamar wajib diisi"),
  price: z.coerce.number().int().positive("Harga harus angka positif"),
  photoUrl: z.string().url("URL foto tidak valid"),
  photoAlt: z.string().min(1, "Deskripsi foto wajib diisi"),
  size: z.string().min(1),
  bed: z.string().min(1),
  specs: z
    .string()
    .transform((v) => v.split(",").map((s) => s.trim()).filter(Boolean)),
  note: z.string().optional().transform((v) => (v ? v : null)),
});

function parseForm(formData: FormData) {
  return schema.parse({
    name: formData.get("name"),
    price: formData.get("price"),
    photoUrl: formData.get("photoUrl"),
    photoAlt: formData.get("photoAlt"),
    size: formData.get("size"),
    bed: formData.get("bed"),
    specs: formData.get("specs"),
    note: formData.get("note"),
  });
}

export async function createRoom(propertyId: number, slug: string, formData: FormData) {
  const data = parseForm(formData);
  const order = await nextOrder(landingRooms, propertyId);
  await createRow(landingRooms, { ...data, propertyId, order });
  revalidateProperty(slug);
}

export async function updateRoom(slug: string, id: number, formData: FormData) {
  const data = parseForm(formData);
  await updateRow(landingRooms, id, data);
  revalidateProperty(slug);
}

export async function deleteRoom(slug: string, id: number) {
  await deleteRow(landingRooms, id);
  revalidateProperty(slug);
}

export async function moveRoom(propertyId: number, slug: string, id: number, direction: "up" | "down") {
  await reorderRow(landingRooms, id, propertyId, direction);
  revalidateProperty(slug);
}
