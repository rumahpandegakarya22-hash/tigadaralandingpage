"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { MessageCircle, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { CtaButton } from "./cta-button";
import { Lightbox } from "./lightbox";
import { getSpecIcon } from "./spec-icon";
import type { RoomType, Property } from "@/lib/types";
import { formatRupiah, buildWhatsappLink, cn } from "@/lib/utils";

export function RoomCard({ room, property }: { room: RoomType; property: Property }) {
  const photos = room.photos.length ? room.photos : [room.photo];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const whatsappLink = buildWhatsappLink(
    property.whatsappNumber,
    `Halo, saya tertarik dengan ${room.name} di ${property.name} (${formatRupiah(room.price)}/bulan). Apakah masih tersedia?`
  );

  function handleScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  }

  function scrollTo(i: number) {
    const el = scrollerRef.current;
    if (!el) return;
    const next = (i + photos.length) % photos.length;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  }

  const multiple = photos.length > 1;

  return (
    <div className="group flex flex-col overflow-hidden rounded-md border border-hairline bg-canvas shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {/* Slideshow: geser langsung (swipe/scroll) tanpa perlu klik dulu. */}
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((photo, i) => (
            <div key={photo.id} className="relative h-full w-full shrink-0 snap-center">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
                draggable={false}
                priority={i === 0 ? false : undefined}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setLightboxIndex(index)}
          aria-label={`Perbesar foto ${room.name}`}
          className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-canvas/90 text-ink transition-transform hover:scale-105 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <Maximize2 className="size-4" aria-hidden="true" />
        </button>

        {multiple && (
          <>
            <button
              type="button"
              onClick={() => scrollTo(index - 1)}
              aria-label="Foto sebelumnya"
              className="absolute left-2 top-1/2 hidden -translate-y-1/2 size-9 items-center justify-center rounded-full bg-canvas/80 text-ink opacity-0 transition-opacity hover:bg-canvas group-hover:opacity-100 sm:inline-flex cursor-pointer"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo(index + 1)}
              aria-label="Foto berikutnya"
              className="absolute right-2 top-1/2 hidden -translate-y-1/2 size-9 items-center justify-center rounded-full bg-canvas/80 text-ink opacity-0 transition-opacity hover:bg-canvas group-hover:opacity-100 sm:inline-flex cursor-pointer"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {photos.map((photo, i) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => scrollTo(i)}
                  aria-label={`Ke foto ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-5 bg-canvas" : "w-1.5 bg-canvas/60 hover:bg-canvas/80"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="font-heading text-lg font-semibold text-ink">{room.name}</h3>
          <p className="mt-1 text-sm text-ink">
            {room.size} &middot; {room.bed}
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {room.specs.map((spec) => {
            const Icon = getSpecIcon(spec);
            return (
              <li key={spec} className="flex items-center gap-1.5 text-sm text-ink">
                <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                {spec}
              </li>
            );
          })}
        </ul>

        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading text-2xl font-bold text-ink">
              {formatRupiah(room.price)}
            </span>
            <span className="text-sm text-ink">/bulan</span>
          </div>
          {room.note ? <p className="mt-1 text-xs text-ink">{room.note}</p> : null}

          <CtaButton
            as="a"
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="mt-4 w-full"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Tanya Kamar Ini
          </CtaButton>
        </div>
      </div>

      <Lightbox
        photos={photos}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
