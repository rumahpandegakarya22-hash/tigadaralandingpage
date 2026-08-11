// Seed landing_* tables dari lib/mock-data.ts — dijalankan sekali buat isi property pertama.
// Pakai tsx biar bisa import file TypeScript langsung.
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { readFileSync } from "node:fs";
import {
  landingProperties,
  landingHighlights,
  landingGalleryPhotos,
  landingRooms,
  landingFacilities,
  landingTestimonials,
  landingFaqs,
} from "../lib/db/schema.ts";
import {
  property,
  highlights,
  galleryPhotos,
  tourVideo,
  rooms,
  facilities,
  testimonials,
  faqs,
} from "../lib/mock-data.ts";
import { eq } from "drizzle-orm";

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

const existing = await db
  .select({ id: landingProperties.id })
  .from(landingProperties)
  .where(eq(landingProperties.slug, slug));

if (existing.length > 0) {
  console.log(`Property slug "${slug}" sudah ada (id=${existing[0].id}), seed dilewati. Hapus manual dulu kalau mau re-seed.`);
  process.exit(0);
}

const [inserted] = await db
  .insert(landingProperties)
  .values({
    slug,
    name: property.name,
    tagline: property.tagline,
    city: property.city,
    address: property.address,
    addressDetail: property.addressDetail,
    directions: property.directions,
    mapsEmbedUrl: property.mapsEmbedUrl,
    mapsUrl: property.mapsUrl,
    whatsappNumber: property.whatsappNumber,
    phoneDisplay: property.phoneDisplay,
    heroPhotoUrl: galleryPhotos[0].src,
    heroPhotoAlt: galleryPhotos[0].alt,
    tourVideoUrl: tourVideo.src,
    tourVideoPosterUrl: tourVideo.poster.src,
  })
  .returning({ id: landingProperties.id });

const propertyId = inserted.id;

await db.insert(landingHighlights).values(
  highlights.map((h, i) => ({ propertyId, label: h.label, icon: h.icon, order: i }))
);

await db.insert(landingGalleryPhotos).values(
  galleryPhotos.map((p, i) => ({ propertyId, url: p.src, alt: p.alt, order: i }))
);

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

await db.insert(landingFacilities).values(
  facilities.map((f, i) => ({
    propertyId,
    name: f.name,
    description: f.description,
    icon: f.icon,
    photoUrl: f.photo.src,
    photoAlt: f.photo.alt,
    order: i,
  }))
);

await db.insert(landingTestimonials).values(
  testimonials.map((t, i) => ({
    propertyId,
    name: t.name,
    initials: t.initials,
    rating: t.rating,
    role: t.role,
    quote: t.quote,
    order: i,
  }))
);

await db.insert(landingFaqs).values(
  faqs.map((f, i) => ({ propertyId, question: f.question, answer: f.answer, order: i }))
);

console.log(`Seed selesai. property id=${propertyId} slug=${slug}`);
