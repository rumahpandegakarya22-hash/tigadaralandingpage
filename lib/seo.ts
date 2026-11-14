import type { Metadata } from "next";
import type { LandingData } from "@/lib/data";
import type { Property, RoomType, Facility } from "@/lib/types";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tigadaralandingpage.vercel.app";

export const REGION = "Daerah Istimewa Yogyakarta";

export function absoluteUrl(src: string | undefined): string | undefined {
  if (!src) return undefined;
  return src.startsWith("http") ? src : `${SITE_URL}${src}`;
}

export function formatPriceId(n: number) {
  return `Rp${n.toLocaleString("id-ID")}`;
}

// "Kel. Caturtunggal, Kec. Depok, ..." → "Caturtunggal"
export function getKelurahan(property: Property) {
  return /Kel\.?\s*([^,]+)/i.exec(property.addressDetail)?.[1]?.trim();
}

export function getPostalCode(property: Property) {
  return /\b\d{5}\b/.exec(property.addressDetail)?.[0];
}

// Koordinat diambil dari URL embed Google Maps (!2d<lng>!3d<lat>), jadi tidak perlu kolom baru di DB.
export function getGeo(property: Property) {
  const m = /!2d(-?\d+\.\d+)!3d(-?\d+\.\d+)/.exec(property.mapsEmbedUrl);
  return m ? { latitude: Number(m[2]), longitude: Number(m[1]) } : undefined;
}

export function buildPropertyTitle(property: Property) {
  return `${property.name} | Kost Putri Dekat UGM ${property.city} Jogja`;
}

export function buildPropertyDescription(
  property: Property,
  rooms: RoomType[],
  facilities: Facility[] = []
) {
  const area = [getKelurahan(property), property.city].filter(Boolean).join(", ");
  const minPrice = rooms.length ? Math.min(...rooms.map((r) => r.price)) : null;
  const price = minPrice ? ` Kamar mulai ${formatPriceId(minPrice)}/bulan` : "";
  const facs = facilities
    .slice(0, 2)
    .map((f) => f.name.toLowerCase())
    .join(", ");
  const text = `Kost putri dekat UGM di ${area}, Jogja.${price}${
    facs ? ` dengan ${facs}` : ""
  }. Cek kamar kosong.`;
  return text.length <= 165 ? text : `${text.slice(0, 162).replace(/\s+\S*$/, "")}...`;
}

export function buildPropertyMetadata(data: LandingData): Metadata {
  const { property, rooms, facilities } = data;
  const title = buildPropertyTitle(property);
  const description = buildPropertyDescription(property, rooms, facilities);
  const path = `/${property.id}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Kost Tiga Dara",
      locale: "id_ID",
      title,
      description,
      url: path,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
