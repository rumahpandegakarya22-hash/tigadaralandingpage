"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogDescription, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import type { GalleryPhoto } from "@/lib/types";

type Rect = { top: number; left: number; width: number; height: number };
type Viewport = { w: number; h: number };
type Motion = { origin: Rect | null; vp: Viewport; closeTo: { current: Rect | null }; dir: number };

const EASE = [0.22, 1, 0.36, 1] as const; // ease-out: cepat di awal, melambat di akhir
const SWIPE_PX = 70;

/** Posisi elemen thumbnail di layar; null bila tidak terlihat (mis. slide di luar jangkauan). */
function rectOf(el: HTMLElement | null | undefined): Rect | null {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  const visible =
    r.width > 0 && r.height > 0 && r.bottom > 0 && r.right > 0 && r.top < window.innerHeight && r.left < window.innerWidth;
  return visible ? { top: r.top, left: r.left, width: r.width, height: r.height } : null;
}

const full = (vp: Viewport) => ({ top: 0, left: 0, width: vp.w, height: vp.h, borderRadius: 0, opacity: 1, scale: 1 });

// Kotak foto: tumbuh dari posisi thumbnail ke layar penuh, lalu kembali ke thumbnail saat ditutup.
const boxVariants = {
  initial: ({ origin, vp }: Motion) =>
    origin ? { ...origin, borderRadius: 8, opacity: 1, scale: 1 } : { ...full(vp), opacity: 0, scale: 0.96 },
  open: ({ vp }: Motion) => full(vp),
  exit: ({ closeTo }: Motion) =>
    closeTo.current ? { ...closeTo.current, borderRadius: 8, opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 },
};

const slideVariants = {
  enter: ({ dir }: Motion) => ({ x: dir * 64, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: ({ dir }: Motion) => ({ x: dir * -64, opacity: 0 }),
};

/** Lapisan kasar (sama dengan thumbnail, sudah ter-cache) tampil dulu; versi tajam memudar masuk setelah termuat. */
function PhotoLayers({ photo }: { photo: GalleryPhoto }) {
  const [sharp, setSharp] = useState(false);
  return (
    <>
      <Image
        src={photo.src}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        className="object-contain"
        draggable={false}
        aria-hidden="true"
      />
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="100vw"
        quality={90}
        onLoad={() => setSharp(true)}
        className={`object-contain transition-opacity duration-300 ${sharp ? "opacity-100" : "opacity-0"}`}
        draggable={false}
      />
    </>
  );
}

export function Lightbox({
  photos,
  activeIndex,
  onClose,
  onNavigate,
  getOrigin,
}: {
  photos: GalleryPhoto[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
  /** Elemen thumbnail untuk foto ke-i; dipakai sebagai titik awal dan tujuan animasi. */
  getOrigin?: (index: number) => HTMLElement | null;
}) {
  const reduceMotion = useReducedMotion();
  const open = activeIndex !== null;
  const total = photos.length;

  // `present` menahan Dialog tetap terbuka sampai animasi keluar selesai.
  const [present, setPresent] = useState(false);
  const [origin, setOrigin] = useState<Rect | null>(null);
  const [vp, setVp] = useState<Viewport>({ w: 0, h: 0 });
  const [dir, setDir] = useState(1);
  const closeTo = useRef<Rect | null>(null);

  // Pola "sesuaikan state saat prop berubah": titik awal animasi dibaca saat pratinjau baru dibuka,
  // sebelum frame pertama digambar.
  if (open && !present) {
    setVp({ w: window.innerWidth, h: window.innerHeight });
    setOrigin(reduceMotion ? null : rectOf(getOrigin?.(activeIndex)));
    setPresent(true);
  }

  useEffect(() => {
    if (!present) return;
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [present]);

  const go = useCallback(
    (delta: number) => {
      if (activeIndex === null || total < 2) return;
      setDir(delta);
      onNavigate((activeIndex + delta + total) % total);
    },
    [activeIndex, total, onNavigate]
  );

  // Titik tujuan animasi tutup dibaca sebelum state berubah, selagi thumbnail masih ada di layar.
  const requestClose = useCallback(() => {
    closeTo.current = reduceMotion || activeIndex === null ? null : rectOf(getOrigin?.(activeIndex));
    onClose();
  }, [activeIndex, getOrigin, onClose, reduceMotion]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, go]);

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x <= -SWIPE_PX) go(1);
    else if (info.offset.x >= SWIPE_PX) go(-1);
  }

  const index = activeIndex ?? 0;
  const photo = photos[index];
  const m: Motion = { origin, vp, closeTo, dir };
  const t = reduceMotion ? { duration: 0.15 } : { duration: 0.45, ease: EASE };

  return (
    <Dialog open={present} onOpenChange={(next) => !next && requestClose()}>
      <DialogPortal>
        <DialogPrimitive.Popup className="fixed inset-0 z-50 outline-none" onClick={requestClose}>
          <DialogTitle className="sr-only">Pratinjau foto</DialogTitle>
          <DialogDescription className="sr-only">
            {photo ? `${photo.alt}. Foto ${index + 1} dari ${total}.` : ""}
          </DialogDescription>

          <AnimatePresence
            custom={m}
            onExitComplete={() => {
              setPresent(false);
              setOrigin(null);
              closeTo.current = null;
            }}
          >
            {open && photo ? (
              <Fragment key="viewer">
                <motion.div
                  key="backdrop"
                  className="absolute inset-0 bg-black/95"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0.15 : 0.3 }}
                  aria-hidden="true"
                />

                <motion.div
                  key="box"
                  custom={m}
                  variants={boxVariants}
                  initial="initial"
                  animate="open"
                  exit="exit"
                  transition={t}
                  className="fixed overflow-hidden bg-black will-change-[top,left,width,height]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <AnimatePresence initial={false} custom={m} mode="popLayout">
                    <motion.div
                      key={photo.id}
                      custom={m}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      drag={total > 1 ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.25}
                      onDragEnd={onDragEnd}
                      className="absolute inset-0 touch-pan-y"
                    >
                      <PhotoLayers photo={photo} />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  key="controls"
                  className="pointer-events-none absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: reduceMotion ? 0 : 0.2, duration: 0.25 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      requestClose();
                    }}
                    aria-label="Tutup pratinjau"
                    className="pointer-events-auto absolute right-4 top-4 inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-canvas/90 text-ink backdrop-blur transition-colors hover:bg-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary"
                  >
                    <X className="size-5" aria-hidden="true" />
                  </button>

                  {total > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          go(-1);
                        }}
                        aria-label="Foto sebelumnya"
                        className="pointer-events-auto absolute left-4 top-1/2 hidden size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-canvas/90 text-ink backdrop-blur transition-colors hover:bg-canvas sm:inline-flex"
                      >
                        <ChevronLeft className="size-6" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          go(1);
                        }}
                        aria-label="Foto berikutnya"
                        className="pointer-events-auto absolute right-4 top-1/2 hidden size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-canvas/90 text-ink backdrop-blur transition-colors hover:bg-canvas sm:inline-flex"
                      >
                        <ChevronRight className="size-6" aria-hidden="true" />
                      </button>
                    </>
                  ) : null}

                  <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 bg-gradient-to-t from-black/70 to-transparent px-4 pb-5 pt-12 text-center">
                    {photo.alt ? <p className="max-w-2xl text-sm text-white/90 text-balance">{photo.alt}</p> : null}
                    {total > 1 ? (
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            go(-1);
                          }}
                          aria-label="Foto sebelumnya"
                          className="pointer-events-auto inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-canvas/90 text-ink sm:hidden"
                        >
                          <ChevronLeft className="size-5" aria-hidden="true" />
                        </button>
                        <span className="rounded-full bg-canvas/90 px-3 py-1 text-xs font-medium text-ink">
                          {index + 1} / {total}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            go(1);
                          }}
                          aria-label="Foto berikutnya"
                          className="pointer-events-auto inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-canvas/90 text-ink sm:hidden"
                        >
                          <ChevronRight className="size-5" aria-hidden="true" />
                        </button>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              </Fragment>
            ) : null}
          </AnimatePresence>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  );
}
