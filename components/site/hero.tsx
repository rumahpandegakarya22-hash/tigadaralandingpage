"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, ChevronDown } from "lucide-react";
import { Container } from "./container";
import { CtaButton } from "./cta-button";
import type { Property, GalleryPhoto } from "@/lib/types";
import { buildWhatsappLink } from "@/lib/utils";

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Hero({ property, heroPhoto }: { property: Property; heroPhoto: GalleryPhoto }) {
  const shouldReduceMotion = useReducedMotion();
  const whatsappLink = buildWhatsappLink(
    property.whatsappNumber,
    `Halo, saya tertarik dengan ${property.name}. Boleh minta info lebih lanjut?`
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
          <Image
            src={heroPhoto.src}
            alt={heroPhoto.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
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
              {property.tagline}. Fasilitas lengkap, lokasi strategis, dan kenyamanan
              setara hunian bintang — tanpa perlu survei langsung.
            </motion.p>

            <motion.div
              variants={heroItem}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <CtaButton as="a" href="#kamar" variant="primary" size="lg">
                Lihat Kamar &amp; Harga
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
                Hubungi Kami
              </CtaButton>
            </motion.div>
          </motion.div>
        </Container>

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
