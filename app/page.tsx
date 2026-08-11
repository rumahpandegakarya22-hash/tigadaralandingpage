import { notFound } from "next/navigation";
import { getAllProperties } from "@/lib/data";
import { renderPropertyPage } from "@/app/_property-page";

export const dynamic = "force-dynamic";

export default async function Home() {
  const properties = await getAllProperties();
  const first = properties[0];
  if (!first) notFound();
  return renderPropertyPage(first.slug);
}
