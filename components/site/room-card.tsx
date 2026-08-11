"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, Maximize2 } from "lucide-react";
import { CtaButton } from "./cta-button";
import { Lightbox } from "./lightbox";
import { getSpecIcon } from "./spec-icon";
import type { RoomType, Property } from "@/lib/types";
import { formatRupiah, buildWhatsappLink } from "@/lib/utils";

export function RoomCard({ room, property }: { room: RoomType; property: Property }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const whatsappLink = buildWhatsappLink(
    property.whatsappNumber,
    `Halo, saya tertarik dengan ${room.name} di ${property.name} (${formatRupiah(room.price)}/bulan). Apakah masih tersedia?`
  );

  return (
    <div className="group flex flex-col overflow-hidden rounded-md border border-hairline bg-canvas shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        aria-label={`Perbesar foto ${room.name}`}
        className="group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <Image
          src={room.photo.src}
          alt={room.photo.alt}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-canvas/90 text-ink">
          <Maximize2 className="size-4" aria-hidden="true" />
        </span>
      </button>

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
        photos={[room.photo]}
        activeIndex={lightboxOpen ? 0 : null}
        onClose={() => setLightboxOpen(false)}
        onNavigate={() => {}}
      />
    </div>
  );
}
