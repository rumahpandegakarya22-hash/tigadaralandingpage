import Image from "next/image";
import { Container } from "./container";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { facilityIconMap } from "./icon-map";
import type { Facility } from "@/lib/types";
import type { LandingCopy } from "@/lib/copy";

export function Facilities({ facilities, copy }: { facilities: Facility[]; copy: LandingCopy }) {
  return (
    <section id="fasilitas" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={copy.facilities_eyebrow}
          title={copy.facilities_title}
          description={copy.facilities_desc}
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((facility, index) => {
            const Icon = facilityIconMap[facility.icon];
            return (
              <Reveal key={facility.id} delay={index * 0.05}>
                <div className="group flex h-full flex-col overflow-hidden rounded-md border border-hairline bg-canvas transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={facility.photo.src}
                      alt={facility.photo.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <span className="inline-flex size-9 items-center justify-center rounded-full bg-surface-soft text-primary transition-all duration-200 group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary">
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
