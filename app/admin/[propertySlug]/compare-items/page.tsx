import { notFound } from "next/navigation";
import { getLandingData } from "@/lib/data";
import { DEFAULT_COPY } from "@/lib/copy";
import { resolveCompareItems, unmatchedSpecs } from "@/lib/compare";
import { saveCompareItems, resetCompareItems } from "@/app/admin/_actions/compare-items";
import { CompareItemsEditor, type EditorItem } from "@/components/admin/compare-items-editor";

export default async function CompareItemsPage({
  params,
}: {
  params: Promise<{ propertySlug: string }>;
}) {
  const { propertySlug } = await params;
  const data = await getLandingData(propertySlug);
  if (!data) notFound();

  const copy = { ...DEFAULT_COPY, ...data.copy };
  const defaults = new Map(resolveCompareItems(DEFAULT_COPY).map((i) => [i.id, i]));

  const initial: EditorItem[] = resolveCompareItems(copy).map((i) => ({
    id: i.id,
    label: i.label,
    keywords: i.keywords.join(", "),
    enabled: i.enabled,
    custom: i.custom,
    defaultLabel: defaults.get(i.id)?.label,
    defaultKeywords: defaults.get(i.id)?.keywords.join(", "),
  }));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-ink">Item Perbandingan Kamar</h1>
        <p className="mt-1 text-sm text-ink">
          Baris yang tampil di tabel &quot;Bandingkan&quot;. Tiap baris mencocokkan <strong>kata kunci</strong> dengan
          teks spesifikasi kamar (menu Kamar &amp; Harga): bila ada kamar yang spesifikasinya memuat kata itu, kamar
          tersebut tampil &quot;Ya&quot;, selain itu &quot;Tidak&quot;. Baris hanya muncul bila ada kamar yang
          dibandingkan memilikinya.
        </p>
        <p className="mt-2 text-xs text-ink/70">
          Contoh: item &quot;Kulkas&quot; dengan kata kunci &quot;kulkas, lemari es&quot; cocok dengan spesifikasi
          &quot;Kulkas mini 100L&quot;. Urutan di sini = urutan di tabel.
        </p>
      </div>

      <CompareItemsEditor
        initial={initial}
        suggestions={unmatchedSpecs(data.rooms, copy)}
        saveAction={saveCompareItems.bind(null, propertySlug)}
        resetAction={resetCompareItems.bind(null, propertySlug)}
      />
    </div>
  );
}
