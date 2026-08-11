import { notFound } from "next/navigation";
import { getLandingData } from "@/lib/data";
import { updateProperty, deleteProperty } from "@/app/admin/_actions/property";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CtaButton } from "@/components/site/cta-button";
import { DeletePropertyButton } from "./delete-button";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ propertySlug: string }>;
}) {
  const { propertySlug } = await params;
  const data = await getLandingData(propertySlug);
  if (!data) notFound();

  const p = data.property;
  const action = updateProperty.bind(null, data.propertyId, propertySlug);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-ink">Info Properti</h1>
        <p className="mt-1 text-sm text-ink">Data dasar yang tampil di hero, kontak, dan footer landing page.</p>
      </div>

      <form action={action} className="flex flex-col gap-4 rounded-md border border-hairline bg-canvas p-6">
        {([
          ["name", "Nama Properti", p.name],
          ["tagline", "Tagline", p.tagline],
          ["city", "Kota", p.city],
          ["address", "Alamat", p.address],
          ["addressDetail", "Detail Alamat (kecamatan/kode pos)", p.addressDetail],
          ["directions", "Petunjuk Arah", p.directions],
          ["mapsEmbedUrl", "URL Embed Google Maps", p.mapsEmbedUrl],
          ["mapsUrl", "URL Google Maps", p.mapsUrl],
          ["whatsappNumber", "Nomor WhatsApp (format 62...)", p.whatsappNumber],
          ["phoneDisplay", "Nomor Telepon (tampilan)", p.phoneDisplay],
          ["tourVideoUrl", "URL Video Tur (opsional)", data.tourVideo.src],
          ["tourVideoPosterUrl", "URL Poster Video Tur (opsional)", data.tourVideo.poster.src],
        ] as const).map(([name, label, value]) => (
          <div key={name} className="flex flex-col gap-1.5">
            <Label htmlFor={name}>{label}</Label>
            <Input id={name} name={name} defaultValue={value} />
          </div>
        ))}
        <CtaButton type="submit" variant="primary" size="md" className="w-fit text-sm">
          Simpan Perubahan
        </CtaButton>
      </form>

      <div className="rounded-md border border-primary-error-text/30 bg-canvas p-6">
        <h2 className="font-heading text-base font-semibold text-ink">Zona Berbahaya</h2>
        <p className="mt-1 text-sm text-ink">
          Hapus properti ini beserta seluruh konten (galeri, kamar, fasilitas, testimoni, FAQ). Tidak bisa dibatalkan.
        </p>
        <DeletePropertyButton propertyId={data.propertyId} deleteAction={deleteProperty} />
      </div>
    </div>
  );
}
