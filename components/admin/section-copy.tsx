import { notFound } from "next/navigation";
import { COPY_SECTIONS, DEFAULT_COPY, type LandingCopy } from "@/lib/copy";
import { saveCopy } from "@/app/admin/_actions/copy";
import { CopyForm } from "./copy-form";

/** Form teks untuk satu section; dipakai di halaman konten maupun halaman teks khusus. */
export function SectionCopy({ slug, sectionId, copy }: { slug: string; sectionId: string; copy: LandingCopy }) {
  const section = COPY_SECTIONS.find((s) => s.id === sectionId);
  if (!section) notFound();
  return <CopyForm section={section} values={{ ...DEFAULT_COPY, ...copy }} action={saveCopy.bind(null, slug, sectionId)} />;
}
