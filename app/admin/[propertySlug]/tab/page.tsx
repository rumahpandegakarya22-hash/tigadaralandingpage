import { notFound } from "next/navigation";
import { getLandingData } from "@/lib/data";
import { saveTabSettings } from "@/app/admin/_actions/tab";
import { buildPropertyTitle } from "@/lib/seo";
import { DEFAULT_ICON } from "@/lib/tab-icon";
import { UploadButton } from "@/components/admin/upload-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CtaButton } from "@/components/site/cta-button";

export default async function TabPage({
  params,
}: {
  params: Promise<{ propertySlug: string }>;
}) {
  const { propertySlug } = await params;
  const data = await getLandingData(propertySlug);
  if (!data) notFound();

  const icon = data.copy.tab_icon_url ?? "";
  const title = data.copy[`tab_title_${data.propertyId}`] ?? "";
  const action = saveTabSettings.bind(null, propertySlug, data.propertyId);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-ink">Tab Browser</h1>
        <p className="mt-1 text-sm text-ink">Ikon dan judul yang tampil di tab browser.</p>
      </div>

      {/* key: input tidak terkontrol, perlu di-mount ulang saat nilai tersimpan berubah */}
      <form key={`${icon}|${title}`} action={action} className="flex flex-col gap-4 rounded-md border border-hairline bg-canvas p-6">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="icon">Ikon tab dan logo header (berlaku untuk seluruh situs)</Label>
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon || DEFAULT_ICON} alt="Ikon yang tersimpan" className="size-8 shrink-0 object-contain" />
            <Input id="icon" name="icon" defaultValue={icon} placeholder="Kosong = ikon bawaan" />
            <UploadButton name="icon" />
          </div>
          <p className="text-xs text-muted">
            JPG, PNG, atau WebP berbentuk persegi. Gambar yang tidak persegi dipotong dari tengah. Preview berubah setelah
            disimpan.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="title">Judul tab (properti ini)</Label>
          <Input id="title" name="title" defaultValue={title} maxLength={120} placeholder={buildPropertyTitle(data.property)} />
          <p className="text-xs text-muted">
            Kosongkan untuk memakai judul otomatis. Judul ini juga tampil di Google dan preview link, idealnya sekitar 60
            karakter.
          </p>
        </div>

        <CtaButton type="submit" variant="primary" size="md" className="w-fit text-sm">
          Simpan
        </CtaButton>
      </form>
    </div>
  );
}
