import { MessageCircle, Phone } from "lucide-react";
import { Container } from "./container";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { CtaButton } from "./cta-button";
import { ContactForm } from "./contact-form";
import type { Property } from "@/lib/types";
import { fillCopy, type LandingCopy } from "@/lib/copy";
import { buildWhatsappLink } from "@/lib/utils";

export function CtaSection({ property, copy }: { property: Property; copy: LandingCopy }) {
  const whatsappLink = buildWhatsappLink(
    property.whatsappNumber,
    fillCopy(copy.wa_message, { name: property.name })
  );

  return (
    <section id="kontak" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={copy.cta_eyebrow}
          title={copy.cta_title}
          description={copy.cta_desc}
          align="center"
          className="mx-auto"
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="group flex h-full flex-col justify-between gap-6 rounded-md bg-primary p-8 text-on-primary transition-shadow duration-300 hover:shadow-lg">
              <div>
                <span className="relative inline-flex size-12 items-center justify-center rounded-full bg-on-primary/15 transition-transform duration-200 group-hover:scale-110">
                  <span className="absolute inset-0 rounded-full bg-on-primary/20 motion-safe:animate-ping" aria-hidden="true" />
                  <MessageCircle className="relative size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-heading text-xl font-bold">{copy.cta_whatsapp_title}</h3>
                <p className="mt-2 text-sm text-on-primary">{copy.cta_whatsapp_desc}</p>
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
                {copy.cta_whatsapp_button}
              </CtaButton>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-md border border-hairline bg-canvas p-8">
              <h3 className="font-heading text-xl font-bold text-ink">{copy.cta_form_title}</h3>
              <p className="mt-2 text-sm text-ink">{copy.cta_form_desc}</p>
              <div className="mt-6">
                <ContactForm copy={copy} />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
