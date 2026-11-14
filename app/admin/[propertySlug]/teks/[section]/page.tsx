import { notFound } from "next/navigation";
import Link from "next/link";
import { getLandingData } from "@/lib/data";
import { COPY_SECTIONS } from "@/lib/copy";
import { SectionCopy } from "@/components/admin/section-copy";

// Section yang tidak punya halaman konten sendiri (hanya teks).
const TEXT_ONLY = ["hero", "availability", "location", "contact", "navigation"];

export default async function TextSectionPage({
  params,
}: {
  params: Promise<{ propertySlug: string; section: string }>;
}) {
  const { propertySlug, section } = await params;
  if (!TEXT_ONLY.includes(section) || !COPY_SECTIONS.some((s) => s.id === section)) notFound();
  const data = await getLandingData(propertySlug);
  if (!data) notFound();

  return (
    <div className="flex flex-col gap-6">
      <SectionCopy slug={propertySlug} sectionId={section} copy={data.copy} />
      {section === "contact" || section === "location" || section === "hero" ? (
        <p className="text-sm text-ink">
          Nomor WhatsApp, telepon, alamat, peta, dan tagline ada di{" "}
          <Link href={`/admin/${propertySlug}/property`} className="underline underline-offset-2">
            Info Properti
          </Link>
          .
        </p>
      ) : null}
    </div>
  );
}
