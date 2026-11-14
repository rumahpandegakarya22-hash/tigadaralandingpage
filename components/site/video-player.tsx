"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { GalleryPhoto } from "@/lib/types";

export function VideoPlayer({
  poster,
  src,
  soonLabel,
}: {
  poster: GalleryPhoto;
  src: string;
  soonLabel: string;
}) {
  const [playing, setPlaying] = useState(false);
  const hasSource = Boolean(src);

  if (playing && hasSource) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-md bg-scrim">
        <video
          src={src}
          controls
          autoPlay
          className="size-full object-cover"
        >
          Browser Anda tidak mendukung pemutaran video.
        </video>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-md bg-scrim">
      <Image
        src={poster.src}
        alt={poster.alt}
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        className="object-cover opacity-80"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-scrim/30">
        <button
          type="button"
          onClick={() => hasSource && setPlaying(true)}
          disabled={!hasSource}
          aria-label={hasSource ? "Putar video tur" : "Video tur segera hadir"}
          className="inline-flex size-16 items-center justify-center rounded-full bg-canvas text-primary shadow-card transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
        >
          <Play className="size-7 translate-x-0.5" aria-hidden="true" fill="currentColor" />
        </button>
        {!hasSource ? (
          <span className="rounded-full bg-canvas/90 px-3 py-1 text-xs font-semibold text-ink">
            {soonLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
}
