import Image from "next/image";
import { Container } from "./container";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { facilityIconMap } from "./icon-map";
import { facilities } from "@/lib/mock-data";

export function Facilities() {
  return (
    <section id="fasilitas" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Fasilitas Umum"
          title="Fasilitas Bersama untuk Semua Penghuni"
          description="Area umum yang lengkap dan terawat, bisa digunakan bebas oleh seluruh penghuni kost."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((facility, index) => {
            const Icon = facilityIconMap[facility.icon];
            return (
              <Reveal key={facility.id} delay={index * 0.05}>
                <div className="flex h-full flex-col overflow-hidden rounded-md border border-hairline bg-canvas">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={facility.photo.src}
                      alt={`Foto ${facility.name} — mockup, foto asli menyusul`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <span className="inline-flex size-9 items-center justify-center rounded-full bg-surface-soft text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-heading text-base font-semibold text-ink">
                      {facility.name}
                    </h3>
                    <p className="text-sm text-ink">{facility.description}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
