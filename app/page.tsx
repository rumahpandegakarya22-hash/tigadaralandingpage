import { notFound } from "next/navigation";
import { getAllProperties } from "@/lib/data";
import { renderPropertyPage } from "./[propertySlug]/page";

export default async function Home() {
  const properties = await getAllProperties();
  const first = properties[0];
  if (!first) notFound();
  return renderPropertyPage(first.slug);
}
