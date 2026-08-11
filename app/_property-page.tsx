import { notFound } from "next/navigation";
import { getLandingData, getAllProperties, getKamarTypes } from "@/lib/data";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { HighlightsStrip } from "@/components/site/highlights-strip";
import { Gallery } from "@/components/site/gallery";
import { Rooms } from "@/components/site/rooms";
import { AvailabilityChecker } from "@/components/site/availability-checker";
import { Facilities } from "@/components/site/facilities";
import { Location } from "@/components/site/location";
import { Testimonials } from "@/components/site/testimonials";
import { Faq } from "@/components/site/faq";
import { CtaSection } from "@/components/site/cta-section";
import { Footer } from "@/components/site/footer";
import { FloatingWhatsapp } from "@/components/site/floating-whatsapp";

export async function renderPropertyPage(slug: string) {
  const [data, properties, kamarTypes] = await Promise.all([
    getLandingData(slug),
    getAllProperties(),
    getKamarTypes(),
  ]);
  if (!data) notFound();

  // Foto hero: pakai slot khusus bila diisi, jika kosong fallback ke foto galeri pertama.
  const heroPhoto = data.property.heroPhotoUrl
    ? { id: "hero", src: data.property.heroPhotoUrl, alt: `Foto ${data.property.name}` }
    : data.galleryPhotos[0];
  if (!heroPhoto) notFound();

  return (
    <>
      <Header property={data.property} properties={properties} activeSlug={slug} />
      <main className="flex-1">
        <Hero property={data.property} heroPhoto={heroPhoto} />
        <HighlightsStrip highlights={data.highlights} />
        <Gallery galleryPhotos={data.galleryPhotos} tourVideo={data.tourVideo} />
        <Rooms rooms={data.rooms} property={data.property} />
        <AvailabilityChecker property={data.property} kamarTypes={kamarTypes} />
        <Facilities facilities={data.facilities} />
        <Location property={data.property} />
        <Testimonials testimonials={data.testimonials} />
        <Faq faqs={data.faqs} />
        <CtaSection property={data.property} />
      </main>
      <Footer property={data.property} />
      <FloatingWhatsapp property={data.property} />
    </>
  );
}
