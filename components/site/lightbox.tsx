"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryPhoto } from "@/lib/types";

export function Lightbox({
  photos,
  activeIndex,
  onClose,
  onNavigate,
}: {
  photos: GalleryPhoto[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const isOpen = activeIndex !== null;
  const total = photos.length;

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex - 1 + total) % total);
  }, [activeIndex, total, onNavigate]);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex + 1) % total);
  }, [activeIndex, total, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, goPrev, goNext]);

  if (!isOpen || activeIndex === null) return null;

  const photo = photos[activeIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pratinjau foto"
      className="fixed inset-0 z-50 flex items-center justify-center bg-scrim/90 p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup pratinjau"
        className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full bg-canvas/90 text-ink hover:bg-canvas cursor-pointer"
      >
        <X className="size-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        aria-label="Foto sebelumnya"
        className="absolute left-2 top-1/2 hidden -translate-y-1/2 sm:inline-flex size-11 items-center justify-center rounded-full bg-canvas/90 text-ink hover:bg-canvas cursor-pointer sm:left-4"
      >
        <ChevronLeft className="size-6" aria-hidden="true" />
      </button>

      <div
        className="relative flex max-h-[85vh] w-full max-w-4xl items-center justify-center animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[3/2] w-full">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="rounded-md object-contain"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        aria-label="Foto berikutnya"
        className="absolute right-2 top-1/2 hidden -translate-y-1/2 sm:inline-flex size-11 items-center justify-center rounded-full bg-canvas/90 text-ink hover:bg-canvas cursor-pointer sm:right-4"
      >
        <ChevronRight className="size-6" aria-hidden="true" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-canvas/90 px-3 py-1 text-xs font-medium text-ink">
        {activeIndex + 1} / {total}
      </div>

      <div className="absolute bottom-4 right-4 flex gap-3 sm:hidden">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Foto sebelumnya"
          className="inline-flex size-11 items-center justify-center rounded-full bg-canvas/90 text-ink cursor-pointer"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Foto berikutnya"
          className="inline-flex size-11 items-center justify-center rounded-full bg-canvas/90 text-ink cursor-pointer"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
