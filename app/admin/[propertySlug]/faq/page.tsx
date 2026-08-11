import { notFound } from "next/navigation";
import { getLandingData } from "@/lib/data";
import { createFaq, updateFaq, deleteFaq, moveFaq } from "@/app/admin/_actions/faq";
import { AdminListEditor } from "@/components/admin/list-editor";
import type { FieldConfig } from "@/components/admin/field";

export default async function FaqPage({
  params,
}: {
  params: Promise<{ propertySlug: string }>;
}) {
  const { propertySlug } = await params;
  const data = await getLandingData(propertySlug);
  if (!data) notFound();

  const fields: FieldConfig[] = [
    { name: "question", label: "Pertanyaan", type: "text" },
    { name: "answer", label: "Jawaban", type: "textarea" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-ink">FAQ</h1>
        <p className="mt-1 text-sm text-ink">Pertanyaan yang sering diajukan di landing page.</p>
      </div>

      <AdminListEditor
        rows={data.faqs.map((f) => ({
          id: Number(f.id),
          values: { question: f.question, answer: f.answer },
          summary: <span>{f.question}</span>,
        }))}
        fields={fields}
        createAction={createFaq.bind(null, data.propertyId, propertySlug)}
        updateAction={updateFaq.bind(null, propertySlug)}
        deleteAction={deleteFaq.bind(null, propertySlug)}
        moveAction={moveFaq.bind(null, data.propertyId, propertySlug)}
        addLabel="Tambah FAQ"
      />
    </div>
  );
}
