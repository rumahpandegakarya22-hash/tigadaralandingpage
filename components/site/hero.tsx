"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, ChevronDown } from "lucide-react";
import { Container } from "./container";
import { CtaButton } from "./cta-button";
import type { Property, GalleryPhoto } from "@/lib/types";
import { fillCopy, type LandingCopy } from "@/lib/copy";
import { buildWhatsappLink } from "@/lib/utils";

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const SLIDE_MS = 5000;

export function Hero({ property, photos, copy }: { property: Property; photos: GalleryPhoto[]; copy: LandingCopy }) {
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const multi = photos.length > 1 && !shouldReduceMotion;

  // `active` ikut jadi dependency agar timer mulai ulang setelah klik titik indikator.
  useEffect(() => {
    if (!multi) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % photos.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [multi, active, photos.length]);

  const whatsappLink = buildWhatsappLink(
    property.whatsappNumber,
    fillCopy(copy.wa_message, { name: property.name })
  );

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="relative h-[88svh] min-h-[560px] w-full sm:h-[92svh]">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {photos.map((photo, i) => (
            <Image
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              fill
              priority={i === 0}
              quality={90}
              sizes="100vw"
              aria-hidden={i !== active}
              className={`object-cover transition-opacity duration-1000 ${i === active ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </motion.div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-scrim/85 via-scrim/35 to-scrim/10"
          aria-hidden="true"
        />

        <Container className="relative flex h-full flex-col justify-end pb-16 sm:pb-20">
          <motion.div
            initial={shouldReduceMotion ? undefined : "hidden"}
            animate={shouldReduceMotion ? undefined : "show"}
            transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          >
            <motion.span
              variants={heroItem}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-4 inline-flex w-fit items-center rounded-full border border-on-primary/30 bg-canvas/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32px] text-on-primary backdrop-blur-sm"
            >
              {property.city}
            </motion.span>
            <motion.h1
              variants={heroItem}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-2xl font-heading text-4xl font-bold leading-[1.1] text-on-primary text-balance sm:text-5xl lg:text-6xl"
            >
              {property.name}
            </motion.h1>
            <motion.p
              variants={heroItem}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-4 max-w-xl text-base text-on-primary sm:text-lg text-balance"
            >
              {fillCopy(copy.hero_desc, { tagline: property.tagline, city: property.city })}
            </motion.p>

            <motion.div
              variants={heroItem}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <CtaButton as="a" href="#kamar" variant="primary" size="lg">
                {copy.hero_cta_primary}
              </CtaButton>
              <CtaButton
                as="a"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                className="!bg-canvas/95"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                {copy.hero_cta_secondary}
              </CtaButton>
            </motion.div>
          </motion.div>
        </Container>

        {multi ? (
          <div className="absolute bottom-6 right-6 flex gap-2 sm:right-10" role="group" aria-label="Pilih foto">
            {photos.map((photo, i) => (
              <button
                key={photo.id}
                type="button"
                aria-label={`Foto ${i + 1}`}
                aria-current={i === active}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-on-primary" : "w-2 bg-on-primary/50 hover:bg-on-primary/80"}`}
              />
            ))}
          </div>
        ) : null}

        <a
          href="#keunggulan"
          aria-label="Gulir ke bawah"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-on-primary/80 hover:text-on-primary sm:block motion-safe:animate-bounce"
        >
          <ChevronDown className="size-7" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
