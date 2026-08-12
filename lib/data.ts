import { unstable_cache } from "next/cache";
import { asc, eq } from "drizzle-orm";
import { db, client } from "./db/client";
import {
  landingProperties,
  landingHighlights,
  landingGalleryPhotos,
  landingRooms,
  landingRoomPhotos,
  landingFacilities,
  landingTestimonials,
  landingFaqs,
  landingCopy,
} from "./db/schema";
import { mergeCopy, type LandingCopy } from "./copy";
import type {
  Property,
  Highlight,
  GalleryPhoto,
  RoomType,
  Facility,
  Testimonial,
  FaqItem,
} from "./types";

export type PropertySummary = { slug: string; name: string };

export type LandingData = {
  propertyId: number;
  property: Property;
  highlights: Highlight[];
  galleryPhotos: GalleryPhoto[];
  tourVideo: { poster: GalleryPhoto; src: string };
  rooms: RoomType[];
  facilities: Facility[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  copy: LandingCopy;
};

// Tipe kamar jarang berubah → cache lama (1 jam), tag "kamar-types".
export const getKamarTypes = unstable_cache(
  async (): Promise<string[]> => {
    const res = await client.execute(
      "SELECT DISTINCT tipe_kamar FROM kamar WHERE tipe_kamar IS NOT NULL ORDER BY tipe_kamar"
    );
    return res.rows.map((r) => r.tipe_kamar as string);
  },
  ["kamar-types"],
  { tags: ["kamar-types"], revalidate: 3600 }
);

// Daftar properti untuk nav/selector → dibatalkan lewat tag "properties" saat admin edit.
export const getAllProperties = unstable_cache(
  async (): Promise<PropertySummary[]> => {
    const rows = await db
      .select({ slug: landingProperties.slug, name: landingProperties.name })
      .from(landingProperties)
      .orderBy(asc(landingProperties.id));
    return rows;
  },
  ["all-properties"],
  { tags: ["properties"], revalidate: 3600 }
);

// Konten landing per-slug → cache, dibatalkan lewat tag "landing" saat admin edit.
export const getLandingData = unstable_cache(
  async (slug: string): Promise<LandingData | null> => {
  const [propertyRow] = await db
    .select()
    .from(landingProperties)
    .where(eq(landingProperties.slug, slug));

  if (!propertyRow) return null;

  const propertyId = propertyRow.id;

  const [highlightRows, galleryRows, roomRows, roomPhotoRows, facilityRows, testimonialRows, faqRows, copyRows] =
    await Promise.all([
      db
        .select()
        .from(landingHighlights)
        .where(eq(landingHighlights.propertyId, propertyId))
        .orderBy(asc(landingHighlights.order)),
      db
        .select()
        .from(landingGalleryPhotos)
        .where(eq(landingGalleryPhotos.propertyId, propertyId))
        .orderBy(asc(landingGalleryPhotos.order)),
      db
        .select()
        .from(landingRooms)
        .where(eq(landingRooms.propertyId, propertyId))
        .orderBy(asc(landingRooms.order)),
      db
        .select()
        .from(landingRoomPhotos)
        .orderBy(asc(landingRoomPhotos.order)),
      db
        .select()
        .from(landingFacilities)
        .where(eq(landingFacilities.propertyId, propertyId))
        .orderBy(asc(landingFacilities.order)),
      db
        .select()
        .from(landingTestimonials)
        .where(eq(landingTestimonials.propertyId, propertyId))
        .orderBy(asc(landingTestimonials.order)),
      db
        .select()
        .from(landingFaqs)
        .where(eq(landingFaqs.propertyId, propertyId))
        .orderBy(asc(landingFaqs.order)),
      db.select({ key: landingCopy.key, value: landingCopy.value }).from(landingCopy),
    ]);

  return {
    propertyId,
    property: {
      id: propertyRow.slug,
      name: propertyRow.name,
      tagline: propertyRow.tagline,
      city: propertyRow.city,
      address: propertyRow.address,
      addressDetail: propertyRow.addressDetail,
      directions: propertyRow.directions,
      mapsEmbedUrl: propertyRow.mapsEmbedUrl,
      mapsUrl: propertyRow.mapsUrl,
      whatsappNumber: propertyRow.whatsappNumber,
      phoneDisplay: propertyRow.phoneDisplay,
      heroPhotoUrl: propertyRow.heroPhotoUrl,
    },
    highlights: highlightRows.map((h) => ({
      id: String(h.id),
      label: h.label,
      icon: h.icon as Highlight["icon"],
    })),
    // Foto cover galeri dipimpin ke depan → jadi latar hero (bila hero_photo_url
    // kosong) sekaligus slide pertama; sisanya ikut urutan `order`.
    galleryPhotos: [...galleryRows]
      .sort((a, b) => (b.isCover ? 1 : 0) - (a.isCover ? 1 : 0))
      .map((p) => ({
        id: String(p.id),
        src: p.url,
        alt: p.alt,
      })),
    tourVideo: {
      poster: {
        id: "tour-poster",
        src: propertyRow.tourVideoPosterUrl || galleryRows[0]?.url || "",
        alt: `Poster video tur ${propertyRow.name}`,
      },
      src: propertyRow.tourVideoUrl,
    },
    rooms: roomRows.map((r) => {
      const own = roomPhotoRows.filter((p) => p.roomId === r.id);
      const photos: GalleryPhoto[] = own.length
        ? own.map((p) => ({ id: `roomphoto-${p.id}`, src: p.url, alt: p.alt ?? r.photoAlt }))
        : [{ id: `room-${r.id}`, src: r.photoUrl, alt: r.photoAlt }];
      const coverRow = own.find((p) => p.isCover === 1);
      const cover: GalleryPhoto = coverRow
        ? { id: `roomphoto-${coverRow.id}`, src: coverRow.url, alt: coverRow.alt ?? r.photoAlt }
        : photos[0];
      return {
        id: String(r.id),
        name: r.name,
        price: r.price,
        photo: cover,
        photos,
        size: r.size,
        bed: r.bed,
        specs: r.specs,
        note: r.note ?? undefined,
      };
    }),
    facilities: facilityRows.map((f) => ({
      id: String(f.id),
      name: f.name,
      description: f.description,
      icon: f.icon as Facility["icon"],
      photo: { id: `facility-${f.id}`, src: f.photoUrl, alt: f.photoAlt },
    })),
    testimonials: testimonialRows.map((t) => ({
      id: String(t.id),
      name: t.name,
      initials: t.initials,
      rating: t.rating as Testimonial["rating"],
      role: t.role,
      quote: t.quote,
    })),
    faqs: faqRows.map((f) => ({
      id: String(f.id),
      question: f.question,
      answer: f.answer,
    })),
    copy: mergeCopy(copyRows),
  };
  },
  ["landing-data"],
  { tags: ["landing"], revalidate: 300 }
);
