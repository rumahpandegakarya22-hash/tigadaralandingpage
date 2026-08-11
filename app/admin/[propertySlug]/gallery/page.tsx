import { notFound } from "next/navigation";
import { getLandingData } from "@/lib/data";
import { createGalleryPhoto, updateGalleryPhoto, deleteGalleryPhoto, moveGalleryPhoto } from "@/app/admin/_actions/gallery";
import { AdminListEditor } from "@/components/admin/list-editor";
import type { FieldConfig } from "@/components/admin/field";

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ propertySlug: string }>;
}) {
  const { propertySlug } = await params;
  const data = await getLandingData(propertySlug);
  if (!data) notFound();

  const fields: FieldConfig[] = [
    { name: "url", label: "URL Foto", type: "url" },
    { name: "alt", label: "Deskripsi Foto (alt text)", type: "text" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-ink">Galeri Foto</h1>
        <p className="mt-1 text-sm text-ink">
          Foto pertama otomatis dipakai sebagai foto hero. Tempel URL foto (upload dulu ke layanan hosting gambar
          pilihan Anda, lalu salin link-nya ke sini).
        </p>
      </div>

      <AdminListEditor
        rows={data.galleryPhotos.map((p) => ({
          id: Number(p.id),
          values: { url: p.src, alt: p.alt },
          summary: (
            <span className="break-all">
              <strong>{p.alt}</strong>
              <br />
              <span className="text-xs text-muted">{p.src}</span>
            </span>
          ),
        }))}
        fields={fields}
        createAction={createGalleryPhoto.bind(null, data.propertyId, propertySlug)}
        updateAction={updateGalleryPhoto.bind(null, propertySlug)}
        deleteAction={deleteGalleryPhoto.bind(null, propertySlug)}
        moveAction={moveGalleryPhoto.bind(null, data.propertyId, propertySlug)}
        addLabel="Tambah Foto"
      />
    </div>
  );
}
