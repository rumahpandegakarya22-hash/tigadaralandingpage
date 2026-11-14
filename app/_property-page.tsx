import { notFound } from "next/navigation";
import { getLandingData, getAllProperties, getKamarTypes } from "@/lib/data";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { HighlightsStrip } from "@/components/site/highlights-strip";
import { Gallery } from "@/components/site/gallery";
import { Rooms } from "@/components/site/rooms";
import { RoomNumberGallery } from "@/components/site/room-number-gallery";
import { AvailabilityChecker } from "@/components/site/availability-checker";
import { Facilities } from "@/components/site/facilities";
import { Location } from "@/components/site/location";
import { Testimonials } from "@/components/site/testimonials";
import { Faq } from "@/components/site/faq";
import { CtaSection } from "@/components/site/cta-section";
import { Footer } from "@/components/site/footer";
import { FloatingWhatsapp } from "@/components/site/floating-whatsapp";
import { JsonLd } from "@/components/site/json-ld";
import { DEFAULT_COPY } from "@/lib/copy";

export async function renderPropertyPage(slug: string) {
  const [data, properties, kamarTypes] = await Promise.all([
    getLandingData(slug),
    getAllProperties(),
    getKamarTypes(),
  ]);
  if (!data) notFound();

  // Data Cache bisa menyimpan copy lama (tanpa key baru) setelah deploy; default digabung ulang di luar cache.
  const copy = { ...DEFAULT_COPY, ...data.copy };

  // Hero = slideshow foto galeri (menu Galeri Foto & Video, maks 6), terakhir placeholder.
  // Jangan pernah notFound() cuma karena foto belum diisi — halaman harus tetap tampil.
  const heroPhotos = data.galleryPhotos.length
    ? data.galleryPhotos.slice(0, 6)
    : [
        {
          id: "hero-placeholder",
          src: `https://picsum.photos/seed/${encodeURIComponent(slug)}-hero/1600/1067`,
          alt: `Foto ${data.property.name}`,
        },
      ];

  return (
    <>
      <JsonLd data={data} />
      <Header property={data.property} properties={properties} activeSlug={slug} copy={copy} />
      <main className="flex-1">
        <Hero property={data.property} photos={heroPhotos} copy={copy} />
        <HighlightsStrip highlights={data.highlights} />
        {(data.galleryPhotos.length > 0 || data.tourVideo.src) && (
          <Gallery galleryPhotos={data.galleryPhotos} tourVideo={data.tourVideo} copy={copy} />
        )}
        {data.rooms.length > 0 && <Rooms rooms={data.rooms} property={data.property} copy={copy} />}
        {data.kamarPhotos.length > 0 && <RoomNumberGallery groups={data.kamarPhotos} copy={copy} />}
        <AvailabilityChecker property={data.property} kamarTypes={kamarTypes} copy={copy} />
        <Facilities facilities={data.facilities} copy={copy} />
        <Location property={data.property} copy={copy} />
        <Testimonials testimonials={data.testimonials} copy={copy} />
        <Faq faqs={data.faqs} copy={copy} />
        <CtaSection property={data.property} copy={copy} />
      </main>
      <Footer property={data.property} copy={copy} />
      <FloatingWhatsapp property={data.property} copy={copy} />
    </>
  );
}
