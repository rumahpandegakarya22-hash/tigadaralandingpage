import type { MetadataRoute } from "next";
import { getAllProperties } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getAllProperties();
  return properties.map((property) => ({
    url: `${SITE_URL}/${property.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
}