"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/lib/db/client";
import {
  landingProperties,
  landingHighlights,
  landingGalleryPhotos,
  landingRooms,
  landingFacilities,
  landingTestimonials,
  landingFaqs,
} from "@/lib/db/schema";
import { requireAdmin, revalidateProperty } from "@/lib/admin/crud-helpers";

const schema = z.object({
  name: z.string().min(1, "Nama properti wajib diisi"),
  tagline: z.string().min(1),
  city: z.string().min(1),
  address: z.string().min(1),
  addressDetail: z.string().min(1),
  directions: z.string().min(1),
  mapsEmbedUrl: z.string().url("URL embed maps tidak valid"),
  mapsUrl: z.string().url("URL maps tidak valid"),
  whatsappNumber: z.string().min(8, "Nomor WhatsApp tidak valid"),
  phoneDisplay: z.string().min(1),
  tourVideoUrl: z.string().url().optional().or(z.literal("")),
  tourVideoPosterUrl: z.string().url().optional().or(z.literal("")),
});

function parseForm(formData: FormData) {
  return schema.parse({
    name: formData.get("name"),
    tagline: formData.get("tagline"),
    city: formData.get("city"),
    address: formData.get("address"),
    addressDetail: formData.get("addressDetail"),
    directions: formData.get("directions"),
    mapsEmbedUrl: formData.get("mapsEmbedUrl"),
    mapsUrl: formData.get("mapsUrl"),
    whatsappNumber: formData.get("whatsappNumber"),
    phoneDisplay: formData.get("phoneDisplay"),
    tourVideoUrl: formData.get("tourVideoUrl") || "",
    tourVideoPosterUrl: formData.get("tourVideoPosterUrl") || "",
  });
}

export async function updateProperty(propertyId: number, slug: string, formData: FormData) {
  await requireAdmin();
  const data = parseForm(formData);
  await db
    .update(landingProperties)
    .set({ ...data, updatedAt: new Date().toISOString() })
    .where(eq(landingProperties.id, propertyId));
  revalidateProperty(slug);
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createProperty(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Nama properti wajib diisi");

  let slug = slugify(name);
  const existing = await db
    .select({ id: landingProperties.id })
    .from(landingProperties)
    .where(eq(landingProperties.slug, slug));
  if (existing.length > 0) slug = `${slug}-${Date.now().toString(36)}`;

  await db.insert(landingProperties).values({
    slug,
    name,
    tagline: "Tagline properti — edit di sini",
    city: "-",
    address: "-",
    addressDetail: "-",
    directions: "-",
    mapsEmbedUrl: "https://www.google.com/maps/embed",
    mapsUrl: "https://maps.google.com",
    whatsappNumber: "62",
    phoneDisplay: "-",
  });

  revalidatePathRoot();
  redirect(`/admin/${slug}/property`);
}

function revalidatePathRoot() {
  // properti baru mengubah daftar PropertySelector di semua halaman
  revalidateProperty("");
}

export async function deleteProperty(propertyId: number) {
  await requireAdmin();

  await db.delete(landingHighlights).where(eq(landingHighlights.propertyId, propertyId));
  await db.delete(landingGalleryPhotos).where(eq(landingGalleryPhotos.propertyId, propertyId));
  await db.delete(landingRooms).where(eq(landingRooms.propertyId, propertyId));
  await db.delete(landingFacilities).where(eq(landingFacilities.propertyId, propertyId));
  await db.delete(landingTestimonials).where(eq(landingTestimonials.propertyId, propertyId));
  await db.delete(landingFaqs).where(eq(landingFaqs.propertyId, propertyId));
  await db.delete(landingProperties).where(eq(landingProperties.id, propertyId));

  revalidatePathRoot();

  const remaining = await db.select({ slug: landingProperties.slug }).from(landingProperties).limit(1);
  redirect(remaining[0] ? `/admin/${remaining[0].slug}/property` : "/admin/login");
}
