import { notFound } from "next/navigation";
import { getLandingData } from "@/lib/data";
import { createFacility, updateFacility, deleteFacility, moveFacility } from "@/app/admin/_actions/facilities";
import { facilityIconOptions } from "@/lib/icon-options";
import { AdminListEditor } from "@/components/admin/list-editor";
import type { FieldConfig } from "@/components/admin/field";

export default async function FacilitiesPage({
  params,
}: {
  params: Promise<{ propertySlug: string }>;
}) {
  const { propertySlug } = await params;
  const data = await getLandingData(propertySlug);
  if (!data) notFound();

  const fields: FieldConfig[] = [
    { name: "name", label: "Nama Fasilitas", type: "text" },
    { name: "description", label: "Deskripsi", type: "textarea" },
    { name: "icon", label: "Ikon", type: "select", options: facilityIconOptions },
    { name: "photoUrl", label: "URL Foto", type: "url" },
    { name: "photoAlt", label: "Deskripsi Foto (alt text)", type: "text" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-ink">Fasilitas</h1>
        <p className="mt-1 text-sm text-ink">Fasilitas bersama yang tampil di section fasilitas.</p>
      </div>

      <AdminListEditor
        rows={data.facilities.map((f) => ({
          id: Number(f.id),
          values: {
            name: f.name,
            description: f.description,
            icon: f.icon,
            photoUrl: f.photo.src,
            photoAlt: f.photo.alt,
          },
          summary: (
            <span>
              <strong>{f.name}</strong> · {f.icon}
            </span>
          ),
        }))}
        fields={fields}
        createAction={createFacility.bind(null, data.propertyId, propertySlug)}
        updateAction={updateFacility.bind(null, propertySlug)}
        deleteAction={deleteFacility.bind(null, propertySlug)}
        moveAction={moveFacility.bind(null, data.propertyId, propertySlug)}
        addLabel="Tambah Fasilitas"
      />
    </div>
  );
}
