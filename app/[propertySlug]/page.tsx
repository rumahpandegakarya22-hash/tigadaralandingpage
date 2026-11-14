import type { Metadata } from "next";
import { getLandingData } from "@/lib/data";
import { renderPropertyPage } from "@/app/_property-page";
import { buildPropertyMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ propertySlug: string }>;
}): Promise<Metadata> {
  const { propertySlug } = await params;
  const data = await getLandingData(propertySlug);
  return data ? buildPropertyMetadata(data) : {};
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ propertySlug: string }>;
}) {
  const { propertySlug } = await params;
  return renderPropertyPage(propertySlug);
}
