import { notFound } from "next/navigation";
import { asc } from "drizzle-orm";
import { db, pmsClient } from "@/lib/db/client";
import { landingKamarPhotos } from "@/lib/db/schema";
import { getLandingData } from "@/lib/data";
import {
  createKamarPhoto,
  updateKamarPhoto,
  deleteKamarPhoto,
  moveKamarPhoto,
} from "@/app/admin/_actions/kamar-photos";
import { AdminListEditor } from "@/components/admin/list-editor";
import type { FieldConfig } from "@/components/admin/field";

// Daftar nomor kamar diambil dari sistem kos; bila gagal, admin mengetik nomornya sendiri.
async function getKamarNumbers(): Promise<string[]> {
  try {
    const res = await pmsClient.execute("SELECT no_kamar FROM kamar ORDER BY no_kamar");
    return res.rows.map((r) => String(r.no_kamar));
  } catch {
    return [];
  }
}

export default async function KamarPhotosPage({
  params,
}: {
  params: Promise<{ propertySlug: string }>;
}) {
  const { propertySlug } = await params;
  const data = await getLandingData(propertySlug);
  if (!data) notFound();

  const [rows, numbers] = await Promise.all([
    db.select().from(landingKamarPhotos).orderBy(asc(landingKamarPhotos.noKamar), asc(landingKamarPhotos.order)),
    getKamarNumbers(),
  ]);

  const fields: FieldConfig[] = [
    numbers.length
      ? { name: "noKamar", label: "Nomor Kamar", type: "select", options: numbers }
      : { name: "noKamar", label: "Nomor Kamar", type: "number" },
    { name: "url", label: "URL Foto", type: "url", upload: "single" },
    { name: "alt", label: "Deskripsi Foto (alt text, opsional)", type: "text" },
    { name: "isCover", label: "Jadikan foto utama nomor kamar ini?", type: "select", options: ["Tidak", "Ya"] },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-ink">Foto Setiap Nomor Kamar</h1>
        <p className="mt-1 text-sm text-ink">
          Foto tiap kamar fisik. Section ini tampil di landing page begitu ada minimal satu foto. Urutan naik/turun
          berlaku di dalam satu nomor kamar. Judul section diedit di menu Galeri & Video.
        </p>
      </div>

      <AdminListEditor
        rows={rows.map((r) => ({
          id: r.id,
          values: { noKamar: String(r.noKamar), url: r.url, alt: r.alt ?? "", isCover: r.isCover === 1 ? "Ya" : "Tidak" },
          summary: (
            <span className="break-all">
              <strong>Kamar {r.noKamar}</strong>
              {r.isCover === 1 ? " · foto utama" : ""}
              {r.alt ? ` · ${r.alt}` : ""}
              <br />
              <span className="text-xs text-muted">{r.url}</span>
            </span>
          ),
        }))}
        fields={fields}
        createAction={createKamarPhoto.bind(null, propertySlug)}
        updateAction={updateKamarPhoto.bind(null, propertySlug)}
        deleteAction={deleteKamarPhoto.bind(null, propertySlug)}
        moveAction={moveKamarPhoto.bind(null, propertySlug)}
        addLabel="Tambah Foto Kamar"
      />
    </div>
  );
}
