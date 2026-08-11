import { notFound } from "next/navigation";
import { getLandingData } from "@/lib/data";
import { createHighlight, updateHighlight, deleteHighlight, moveHighlight } from "@/app/admin/_actions/highlights";
import { highlightIconOptions } from "@/lib/icon-options";
import { AdminListEditor } from "@/components/admin/list-editor";
import type { FieldConfig } from "@/components/admin/field";

export default async function HighlightsPage({
  params,
}: {
  params: Promise<{ propertySlug: string }>;
}) {
  const { propertySlug } = await params;
  const data = await getLandingData(propertySlug);
  if (!data) notFound();

  const fields: FieldConfig[] = [
    { name: "label", label: "Label", type: "text" },
    { name: "icon", label: "Ikon", type: "select", options: highlightIconOptions },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-ink">Keunggulan</h1>
        <p className="mt-1 text-sm text-ink">Strip ikon+label di bawah hero (WiFi, keamanan, dst).</p>
      </div>

      <AdminListEditor
        rows={data.highlights.map((h) => ({
          id: Number(h.id),
          values: { label: h.label, icon: h.icon },
          summary: (
            <span>
              <strong>{h.label}</strong> · {h.icon}
            </span>
          ),
        }))}
        fields={fields}
        createAction={createHighlight.bind(null, data.propertyId, propertySlug)}
        updateAction={updateHighlight.bind(null, propertySlug)}
        deleteAction={deleteHighlight.bind(null, propertySlug)}
        moveAction={moveHighlight.bind(null, data.propertyId, propertySlug)}
        addLabel="Tambah Keunggulan"
      />
    </div>
  );
}
