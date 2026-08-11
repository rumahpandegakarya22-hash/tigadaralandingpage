import { redirect } from "next/navigation";

export default async function AdminPropertyIndex({
  params,
}: {
  params: Promise<{ propertySlug: string }>;
}) {
  const { propertySlug } = await params;
  redirect(`/admin/${propertySlug}/property`);
}
