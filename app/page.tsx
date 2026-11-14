import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProperties, getLandingData } from "@/lib/data";
import { renderPropertyPage } from "@/app/_property-page";
import { buildPropertyMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const first = (await getAllProperties())[0];
  if (!first) return {};
  const data = await getLandingData(first.slug);
  return data ? buildPropertyMetadata(data) : {};
}

export default async function Home() {
  const first = (await getAllProperties())[0];
  if (!first) notFound();
  return renderPropertyPage(first.slug);
}
