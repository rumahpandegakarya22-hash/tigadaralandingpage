import { notFound } from "next/navigation";
import { getLandingData } from "@/lib/data";
import { createRoom, updateRoom, deleteRoom, moveRoom } from "@/app/admin/_actions/rooms";
import { formatRupiah } from "@/lib/utils";
import { AdminListEditor } from "@/components/admin/list-editor";
import type { FieldConfig } from "@/components/admin/field";

export default async function RoomsPage({
  params,
}: {
  params: Promise<{ propertySlug: string }>;
}) {
  const { propertySlug } = await params;
  const data = await getLandingData(propertySlug);
  if (!data) notFound();

  const fields: FieldConfig[] = [
    { name: "name", label: "Nama Tipe Kamar", type: "text" },
    { name: "price", label: "Harga per Bulan (angka saja)", type: "number" },
    { name: "photoUrl", label: "URL Foto", type: "url" },
    { name: "photoAlt", label: "Deskripsi Foto (alt text)", type: "text" },
    { name: "size", label: "Ukuran (contoh: 3 x 4 m)", type: "text" },
    { name: "bed", label: "Kasur (contoh: Kasur queen 160x200)", type: "text" },
    { name: "specs", label: "Spesifikasi (pisah pakai koma)", type: "textarea" },
    { name: "note", label: "Catatan (opsional)", type: "text" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-ink">Kamar & Harga</h1>
        <p className="mt-1 text-sm text-ink">Tipe kamar yang tampil di section pemilihan kamar.</p>
      </div>

      <AdminListEditor
        rows={data.rooms.map((r) => ({
          id: Number(r.id),
          values: {
            name: r.name,
            price: String(r.price),
            photoUrl: r.photo.src,
            photoAlt: r.photo.alt,
            size: r.size,
            bed: r.bed,
            specs: r.specs.join(", "),
            note: r.note ?? "",
          },
          summary: (
            <span>
              <strong>{r.name}</strong> · {formatRupiah(r.price)}/bulan · {r.specs.length} spesifikasi
            </span>
          ),
        }))}
        fields={fields}
        createAction={createRoom.bind(null, data.propertyId, propertySlug)}
        updateAction={updateRoom.bind(null, propertySlug)}
        deleteAction={deleteRoom.bind(null, propertySlug)}
        moveAction={moveRoom.bind(null, data.propertyId, propertySlug)}
        addLabel="Tambah Tipe Kamar"
      />
    </div>
  );
}
