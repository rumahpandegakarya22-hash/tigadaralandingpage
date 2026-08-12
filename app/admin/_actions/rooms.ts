"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { landingRooms, landingRoomPhotos } from "@/lib/db/schema";
import {
  createRow,
  updateRow,
  deleteRow,
  reorderRow,
  nextOrder,
  revalidateProperty,
  requireAdmin,
} from "@/lib/admin/crud-helpers";

const schema = z.object({
  name: z.string().min(1, "Nama tipe kamar wajib diisi"),
  price: z.coerce.number().int().positive("Harga harus angka positif"),
  // Satu URL foto per baris. Foto pertama jadi cover + thumbnail.
  photoUrls: z
    .string()
    .transform((v) =>
      v
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
    )
    .pipe(z.array(z.string().url("Ada URL foto yang tidak valid")).min(1, "Minimal satu URL foto")),
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
    photoUrls: formData.get("photoUrls"),
    photoAlt: formData.get("photoAlt"),
    size: formData.get("size"),
    bed: formData.get("bed"),
    specs: formData.get("specs"),
    note: formData.get("note"),
  });
}

/** Ganti seluruh foto slideshow kamar sesuai daftar URL (foto[0] = cover). */
async function syncRoomPhotos(roomId: number, urls: string[], alt: string) {
  await db.delete(landingRoomPhotos).where(eq(landingRoomPhotos.roomId, roomId));
  await db.insert(landingRoomPhotos).values(
    urls.map((url, i) => ({ roomId, url, alt, order: i, isCover: i === 0 ? 1 : 0 }))
  );
}

export async function createRoom(propertyId: number, slug: string, formData: FormData) {
  const { photoUrls, ...rest } = parseForm(formData);
  const order = await nextOrder(landingRooms, propertyId);
  await requireAdmin();
  const [row] = await db
    .insert(landingRooms)
    .values({ ...rest, photoUrl: photoUrls[0], propertyId, order })
    .returning({ id: landingRooms.id });
  await syncRoomPhotos(row.id, photoUrls, rest.photoAlt);
  revalidateProperty(slug);
}

export async function updateRoom(slug: string, id: number, formData: FormData) {
  const { photoUrls, ...rest } = parseForm(formData);
  await updateRow(landingRooms, id, { ...rest, photoUrl: photoUrls[0] });
  await syncRoomPhotos(id, photoUrls, rest.photoAlt);
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
