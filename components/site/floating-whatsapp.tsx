import { MessageCircle } from "lucide-react";
import type { Property } from "@/lib/types";
import { buildWhatsappLink } from "@/lib/utils";
import { fillCopy, type LandingCopy } from "@/lib/copy";

export function FloatingWhatsapp({ property, copy }: { property: Property; copy: LandingCopy }) {
  const whatsappLink = buildWhatsappLink(
    property.whatsappNumber,
    fillCopy(copy.wa_message, { name: property.name })
  );

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-card transition-transform hover:scale-105 sm:hidden animate-in fade-in zoom-in duration-300 relative"
    >
      <span className="absolute inset-0 rounded-full bg-primary/60 motion-safe:animate-ping" aria-hidden="true" />
      <MessageCircle className="relative size-6" aria-hidden="true" />
    </a>
  );
}
