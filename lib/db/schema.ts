import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

const timestamps = {
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`),
};

/** Satu row = satu properti kost (multi-property). Video tur digabung di sini (1:1), bukan tabel terpisah. */
export const landingProperties = sqliteTable("landing_properties", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  city: text("city").notNull(),
  address: text("address").notNull(),
  addressDetail: text("address_detail").notNull(),
  directions: text("directions").notNull(),
  mapsEmbedUrl: text("maps_embed_url").notNull(),
  mapsUrl: text("maps_url").notNull(),
  whatsappNumber: text("whatsapp_number").notNull(),
  phoneDisplay: text("phone_display").notNull(),
  tourVideoUrl: text("tour_video_url").notNull().default(""),
  tourVideoPosterUrl: text("tour_video_poster_url").notNull().default(""),
  ...timestamps,
});

export const landingHighlights = sqliteTable("landing_highlights", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  propertyId: integer("property_id")
    .notNull()
    .references(() => landingProperties.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  icon: text("icon").notNull(),
  order: integer("order").notNull().default(0),
  ...timestamps,
});

export const landingGalleryPhotos = sqliteTable("landing_gallery_photos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  propertyId: integer("property_id")
    .notNull()
    .references(() => landingProperties.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  alt: text("alt").notNull(),
  order: integer("order").notNull().default(0),
  ...timestamps,
});

export const landingRooms = sqliteTable("landing_rooms", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  propertyId: integer("property_id")
    .notNull()
    .references(() => landingProperties.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  photoUrl: text("photo_url").notNull(),
  photoAlt: text("photo_alt").notNull(),
  size: text("size").notNull(),
  bed: text("bed").notNull(),
  specs: text("specs", { mode: "json" }).notNull().$type<string[]>(),
  note: text("note"),
  order: integer("order").notNull().default(0),
  ...timestamps,
});

export const landingFacilities = sqliteTable("landing_facilities", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  propertyId: integer("property_id")
    .notNull()
    .references(() => landingProperties.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  photoUrl: text("photo_url").notNull(),
  photoAlt: text("photo_alt").notNull(),
  order: integer("order").notNull().default(0),
  ...timestamps,
});

export const landingTestimonials = sqliteTable("landing_testimonials", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  propertyId: integer("property_id")
    .notNull()
    .references(() => landingProperties.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  initials: text("initials").notNull(),
  rating: integer("rating").notNull(),
  role: text("role").notNull(),
  quote: text("quote").notNull(),
  order: integer("order").notNull().default(0),
  ...timestamps,
});

export const landingFaqs = sqliteTable("landing_faqs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  propertyId: integer("property_id")
    .notNull()
    .references(() => landingProperties.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  order: integer("order").notNull().default(0),
  ...timestamps,
});
