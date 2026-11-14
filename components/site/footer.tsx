import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import type { Property } from "@/lib/types";
import type { LandingCopy } from "@/lib/copy";

export function Footer({ property, copy }: { property: Property; copy: LandingCopy }) {
  const quickLinks = [
    { href: "#kamar", label: copy.nav_rooms },
    { href: "#fasilitas", label: copy.nav_facilities },
    { href: "#lokasi", label: copy.nav_location },
    { href: "#testimoni", label: copy.nav_testimonials },
    { href: "#faq", label: copy.nav_faq },
  ];

  return (
    <footer className="border-t border-hairline bg-canvas">
      <Container className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-3">
        <Reveal>
          <a href="#top" className="font-heading text-lg font-bold text-ink">
            {copy.brand_name}<span className="text-primary">.</span>
          </a>
          <p className="mt-3 text-sm text-ink">{property.tagline}.</p>
        </Reveal>

        <Reveal delay={0.06}>
          <h3 className="font-heading text-sm font-semibold text-ink">{copy.footer_nav_title}</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-ink hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.12}>
          <h3 className="font-heading text-sm font-semibold text-ink">{copy.footer_contact_title}</h3>
          <ul className="mt-4 flex flex-col gap-3">
            <li className="flex items-start gap-2 text-sm text-ink">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              {property.address}
            </li>
            <li className="flex items-center gap-2 text-sm text-ink">
              <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
              {property.phoneDisplay}
            </li>
            <li className="flex items-center gap-2 text-sm text-ink">
              <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
              {copy.contact_email}
            </li>
          </ul>
        </Reveal>
      </Container>

      <div className="border-t border-hairline-soft py-5">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-ink sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {property.name}. {copy.footer_rights}</p>
          <p>{copy.footer_credit}</p>
        </Container>
      </div>
    </footer>
  );
}
