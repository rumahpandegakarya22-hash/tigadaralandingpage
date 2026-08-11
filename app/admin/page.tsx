import { redirect } from "next/navigation";
import { getAllProperties } from "@/lib/data";

export default async function AdminIndexPage() {
  const properties = await getAllProperties();
  if (!properties[0]) redirect("/admin/login");
  redirect(`/admin/${properties[0].slug}/property`);
}
