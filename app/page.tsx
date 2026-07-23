import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { HighlightsStrip } from "@/components/site/highlights-strip";
import { Gallery } from "@/components/site/gallery";
import { Rooms } from "@/components/site/rooms";
import { Facilities } from "@/components/site/facilities";
import { Location } from "@/components/site/location";
import { Testimonials } from "@/components/site/testimonials";
import { Faq } from "@/components/site/faq";
import { CtaSection } from "@/components/site/cta-section";
import { Footer } from "@/components/site/footer";
import { FloatingWhatsapp } from "@/components/site/floating-whatsapp";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <HighlightsStrip />
        <Gallery />
        <Rooms />
        <Facilities />
        <Location />
        <Testimonials />
        <Faq />
        <CtaSection />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}
