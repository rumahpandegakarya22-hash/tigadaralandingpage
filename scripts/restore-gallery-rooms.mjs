// Restore isi landing_gallery_photos + landing_rooms yang kosong, dari lib/mock-data.ts.
// Non-destruktif: hanya insert kalau tabel child kosong untuk property tsb,
// dan hanya set hero_photo_url kalau masih kosong. Aman dijalankan ulang.
// Jalankan: npx tsx scripts/restore-gallery-rooms.mjs
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { readFileSync } from "node:fs";
import { eq } from "drizzle-orm";
import {
  landingProperties,
  landingGalleryPhotos,
  landingRooms,
} from "../lib/db/schema.ts";
import { property, galleryPhotos, rooms } from "../lib/mock-data.ts";

for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split("\n")) {
  const i = line.indexOf("=");
  if (i === -1 || line.trim().startsWith("#")) continue;
  const key = line.slice(0, i).trim();
  if (!process.env[key]) process.env[key] = line.slice(i + 1).trim();
}

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const db = drizzle(client);

const slug = property.id; // "kost-tiga-dara"

const [prop] = await db
  .select({ id: landingProperties.id, heroPhotoUrl: landingProperties.heroPhotoUrl })
  .from(landingProperties)
  .where(eq(landingProperties.slug, slug));

if (!prop) {
  console.error(`Property slug "${slug}" tidak ditemukan. Jalankan db:seed dulu.`);
  process.exit(1);
}

const propertyId = prop.id;

const existingGallery = await db
  .select({ id: landingGalleryPhotos.id })
  .from(landingGalleryPhotos)
  .where(eq(landingGalleryPhotos.propertyId, propertyId));

if (existingGallery.length === 0) {
  await db.insert(landingGalleryPhotos).values(
    galleryPhotos.map((p, i) => ({ propertyId, url: p.src, alt: p.alt, order: i }))
  );
  console.log(`Gallery: inserted ${galleryPhotos.length} foto.`);
} else {
  console.log(`Gallery: sudah ada ${existingGallery.length} foto, dilewati.`);
}

const existingRooms = await db
  .select({ id: landingRooms.id })
  .from(landingRooms)
  .where(eq(landingRooms.propertyId, propertyId));

if (existingRooms.length === 0) {
  await db.insert(landingRooms).values(
    rooms.map((r, i) => ({
      propertyId,
      name: r.name,
      price: r.price,
      photoUrl: r.photo.src,
      photoAlt: r.photo.alt,
      size: r.size,
      bed: r.bed,
      specs: r.specs,
      note: r.note ?? null,
      order: i,
    }))
  );
  console.log(`Rooms: inserted ${rooms.length} kamar.`);
} else {
  console.log(`Rooms: sudah ada ${existingRooms.length} kamar, dilewati.`);
}

if (!prop.heroPhotoUrl) {
  await db
    .update(landingProperties)
    .set({ heroPhotoUrl: galleryPhotos[0].src })
    .where(eq(landingProperties.id, propertyId));
  console.log(`Hero: set ke ${galleryPhotos[0].src}`);
} else {
  console.log(`Hero: sudah terisi, dilewati.`);
}

console.log("Restore selesai.");
process.exit(0);
