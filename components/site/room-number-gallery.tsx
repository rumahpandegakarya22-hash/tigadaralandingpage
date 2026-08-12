"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "./container";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { Lightbox } from "./lightbox";
import type { GalleryPhoto } from "@/lib/types";
import type { LandingCopy } from "@/lib/copy";

type Group = { noKamar: number; cover: GalleryPhoto; photos: GalleryPhoto[] };

/** Section "Foto Setiap Nomor Kamar": grid per nomor kamar, klik → lightbox
 *  slideshow foto kamar itu. Hanya dirender bila ada datanya (lihat _property-page). */
export function RoomNumberGallery({ groups, copy }: { groups: Group[]; copy: LandingCopy }) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [index, setIndex] = useState<number | null>(null);

  function open(g: Group) {
    setPhotos(g.photos);
    setIndex(0);
  }

  return (
    <section id="foto-kamar" className="bg-surface-soft/40 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={copy.kamar_photos_eyebrow ?? "Foto Kamar"}
          title={copy.kamar_photos_title ?? "Foto Setiap Nomor Kamar"}
          description={copy.kamar_photos_desc ?? "Lihat kondisi tiap kamar secara langsung sebelum memilih."}
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {groups.map((g) => (
            <Reveal key={g.noKamar}>
              <button
                type="button"
                onClick={() => open(g)}
                aria-label={`Lihat foto kamar ${g.noKamar}`}
                className="group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-md border border-hairline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <Image
                  src={g.cover.src}
                  alt={g.cover.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 300px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-2 top-2 rounded-full bg-canvas/90 px-2.5 py-1 text-xs font-bold text-ink">
                  Kamar {g.noKamar}
                </span>
                {g.photos.length > 1 && (
                  <span className="absolute bottom-2 right-2 rounded-full bg-scrim/70 px-2 py-0.5 text-[11px] font-semibold text-on-primary">
                    {g.photos.length} foto
                  </span>
                )}
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      <Lightbox
        photos={photos}
        activeIndex={index}
        onClose={() => setIndex(null)}
        onNavigate={setIndex}
      />
    </section>
  );
}
