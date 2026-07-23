import { MessageCircle, Phone } from "lucide-react";
import { Container } from "./container";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { CtaButton } from "./cta-button";
import { ContactForm } from "./contact-form";
import { property } from "@/lib/mock-data";
import { buildWhatsappLink } from "@/lib/utils";

export function CtaSection() {
  const whatsappLink = buildWhatsappLink(
    property.whatsappNumber,
    `Halo, saya tertarik dengan ${property.name}. Boleh minta info lebih lanjut?`
  );

  return (
    <section id="kontak" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Hubungi Kami"
          title="Siap Menempati Kamar Impian Anda?"
          description="Chat langsung via WhatsApp, atau tinggalkan nomor Anda agar kami yang menghubungi balik."
          align="center"
          className="mx-auto"
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col justify-between gap-6 rounded-md bg-primary p-8 text-on-primary">
              <div>
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-on-primary/15">
                  <MessageCircle className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-heading text-xl font-bold">Chat via WhatsApp</h3>
                <p className="mt-2 text-sm text-on-primary">
                  Tanya ketersediaan kamar, jadwal survei, atau nego harga langsung dengan pemilik.
                  Respon cepat setiap hari.
                </p>
                <p className="mt-4 flex items-center gap-2 text-sm text-on-primary">
                  <Phone className="size-4" aria-hidden="true" />
                  {property.phoneDisplay}
                </p>
              </div>
              <CtaButton
                as="a"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="w-full !border-on-primary !text-ink"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Chat Sekarang
              </CtaButton>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-md border border-hairline bg-canvas p-8">
              <h3 className="font-heading text-xl font-bold text-ink">Minta Dihubungi Balik</h3>
              <p className="mt-2 text-sm text-ink">
                Tinggalkan nama dan nomor Anda, tim kami akan segera menghubungi.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
