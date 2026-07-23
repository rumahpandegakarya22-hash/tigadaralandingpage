"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "./container";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { Lightbox } from "./lightbox";
import { VideoPlayer } from "./video-player";
import { galleryPhotos, tourVideo } from "@/lib/mock-data";

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="galeri" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Galeri"
          title="Foto & Video Suasana Kost"
          description="Lihat langsung kondisi setiap sudut properti — dari kamar, dapur, hingga ruang bersama."
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:grid-rows-2">
          {galleryPhotos.map((photo, index) => (
            <Reveal
              key={photo.id}
              delay={index * 0.04}
              className={index === 0 ? "col-span-2 row-span-2" : undefined}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Lihat foto ${index + 1} dari ${galleryPhotos.length}`}
                className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <div
                  className={
                    index === 0
                      ? "relative aspect-square w-full sm:aspect-[4/3] md:h-full md:aspect-auto"
                      : "relative aspect-square w-full"
                  }
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-scrim/0 transition-colors group-hover:bg-scrim/15" />
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10" delay={0.1}>
          <h3 className="mb-4 font-heading text-lg font-semibold text-ink">
            Video Tur Singkat
          </h3>
          <div className="mx-auto max-w-3xl">
            <VideoPlayer poster={tourVideo.poster} src={tourVideo.src} />
          </div>
        </Reveal>
      </Container>

      <Lightbox
        photos={galleryPhotos}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </section>
  );
}
