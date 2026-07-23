import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "./container";
import { property } from "@/lib/mock-data";

const quickLinks = [
  { href: "#kamar", label: "Kamar & Harga" },
  { href: "#fasilitas", label: "Fasilitas" },
  { href: "#lokasi", label: "Lokasi" },
  { href: "#testimoni", label: "Testimoni" },
  { href: "#faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas">
      <Container className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-3">
        <div>
          <a href="#top" className="font-heading text-lg font-bold text-ink">
            Kost Tiga Dara<span className="text-primary">.</span>
          </a>
          <p className="mt-3 text-sm text-ink">{property.tagline}.</p>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold text-ink">Navigasi</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-ink hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold text-ink">Kontak</h3>
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
              halo@kosttigadara.id
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-hairline-soft py-5">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-ink sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {property.name}. Semua hak dilindungi.</p>
          <p>Dibangun dengan &hearts; untuk kenyamanan penghuni.</p>
        </Container>
      </div>
    </footer>
  );
}
