"use client";

import { useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { Container } from "./container";
import { PropertySelector } from "./property-selector";
import { CtaButton } from "./cta-button";
import type { Property } from "@/lib/types";
import type { PropertySummary } from "@/lib/data";
import { buildWhatsappLink } from "@/lib/utils";

const navLinks = [
  { href: "#kamar", label: "Kamar & Harga" },
  { href: "#fasilitas", label: "Fasilitas" },
  { href: "#lokasi", label: "Lokasi" },
  { href: "#testimoni", label: "Testimoni" },
  { href: "#faq", label: "FAQ" },
];

export function Header({
  property,
  properties,
  activeSlug,
}: {
  property: Property;
  properties: PropertySummary[];
  activeSlug: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const whatsappLink = buildWhatsappLink(
    property.whatsappNumber,
    `Halo, saya tertarik dengan ${property.name}. Boleh minta info lebih lanjut?`
  );

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/95 backdrop-blur supports-[backdrop-filter]:bg-canvas/80">
      <Container className="flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-6">
          <a
            href="#top"
            className="font-heading text-lg font-bold text-ink shrink-0 transition-transform duration-200 hover:scale-105"
          >
            Kost Tiga Dara<span className="text-primary">.</span>
          </a>
          <div className="hidden md:block">
            <PropertySelector properties={properties} activeSlug={activeSlug} />
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Navigasi utama">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative font-heading text-sm font-semibold text-ink/80 hover:text-ink transition-colors"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CtaButton
            as="a"
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="hidden sm:inline-flex h-11 px-5 text-sm"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Hubungi Kami
          </CtaButton>

          <button
            type="button"
            className="lg:hidden inline-flex size-11 items-center justify-center rounded-sm border border-hairline text-ink cursor-pointer transition-transform duration-200 active:scale-90"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {menuOpen ? (
        <div className="lg:hidden border-t border-hairline bg-canvas animate-in fade-in slide-in-from-top-2 duration-200">
          <Container className="flex flex-col gap-1 py-4">
            <div className="mb-2 md:hidden">
              <PropertySelector properties={properties} activeSlug={activeSlug} />
            </div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-heading text-base font-semibold text-ink py-3 border-b border-hairline-soft last:border-0"
              >
                {link.label}
              </a>
            ))}
            <CtaButton
              as="a"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="mt-4 w-full"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Hubungi via WhatsApp
            </CtaButton>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
