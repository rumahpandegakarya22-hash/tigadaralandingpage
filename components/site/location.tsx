import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { Container } from "./container";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { CopyAddressButton } from "./copy-address-button";
import { CtaButton } from "./cta-button";
import type { Property } from "@/lib/types";

export function Location({ property }: { property: Property }) {
  const fullAddress = `${property.address}, ${property.addressDetail}`;

  return (
    <section id="lokasi" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Lokasi"
          title="Mudah Dijangkau, Strategis untuk Aktivitas Harian"
          description="Cek jarak dan rute menuju kost sebelum berkunjung langsung."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-md border border-hairline sm:aspect-video">
              <iframe
                title={`Peta lokasi ${property.name}`}
                src={property.mapsEmbedUrl}
                className="size-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-5 rounded-md border border-hairline bg-canvas p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="font-heading text-base font-semibold text-ink">Alamat Lengkap</h3>
                  <p className="mt-1 text-sm text-ink">{fullAddress}</p>
                </div>
              </div>

              <CopyAddressButton address={fullAddress} />

              <div className="flex items-start gap-3 border-t border-hairline-soft pt-5">
                <Navigation className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="font-heading text-base font-semibold text-ink">Petunjuk Arah</h3>
                  <p className="mt-1 text-sm text-ink">{property.directions}</p>
                </div>
              </div>

              <CtaButton
                as="a"
                href={property.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="mt-auto w-full"
              >
                Buka di Google Maps
                <ExternalLink className="size-4" aria-hidden="true" />
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
