import { renderPropertyPage } from "@/app/_property-page";

export const dynamic = "force-dynamic";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ propertySlug: string }>;
}) {
  const { propertySlug } = await params;
  return renderPropertyPage(propertySlug);
}
