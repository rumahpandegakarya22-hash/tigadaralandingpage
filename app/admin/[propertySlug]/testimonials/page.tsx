import { notFound } from "next/navigation";
import { getLandingData } from "@/lib/data";
import { createTestimonial, updateTestimonial, deleteTestimonial, moveTestimonial } from "@/app/admin/_actions/testimonials";
import { AdminListEditor } from "@/components/admin/list-editor";
import type { FieldConfig } from "@/components/admin/field";

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ propertySlug: string }>;
}) {
  const { propertySlug } = await params;
  const data = await getLandingData(propertySlug);
  if (!data) notFound();

  const fields: FieldConfig[] = [
    { name: "name", label: "Nama", type: "text" },
    { name: "initials", label: "Inisial (maks 3 huruf)", type: "text" },
    { name: "rating", label: "Rating", type: "select", options: ["1", "2", "3", "4", "5"] },
    { name: "role", label: "Peran/Pekerjaan", type: "text" },
    { name: "quote", label: "Kutipan Testimoni", type: "textarea" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-ink">Testimoni</h1>
        <p className="mt-1 text-sm text-ink">Kartu testimoni penghuni di landing page.</p>
      </div>

      <AdminListEditor
        rows={data.testimonials.map((t) => ({
          id: Number(t.id),
          values: {
            name: t.name,
            initials: t.initials,
            rating: String(t.rating),
            role: t.role,
            quote: t.quote,
          },
          summary: (
            <span>
              <strong>{t.name}</strong> · {t.rating}★ · &ldquo;{t.quote.slice(0, 60)}
              {t.quote.length > 60 ? "…" : ""}&rdquo;
            </span>
          ),
        }))}
        fields={fields}
        createAction={createTestimonial.bind(null, data.propertyId, propertySlug)}
        updateAction={updateTestimonial.bind(null, propertySlug)}
        deleteAction={deleteTestimonial.bind(null, propertySlug)}
        moveAction={moveTestimonial.bind(null, data.propertyId, propertySlug)}
        addLabel="Tambah Testimoni"
      />
    </div>
  );
}
