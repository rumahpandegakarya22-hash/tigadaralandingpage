import { Quote } from "lucide-react";
import { Container } from "./container";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { StarRating } from "./star-rating";
import type { Testimonial } from "@/lib/types";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) {
    return (
      <section id="testimoni" className="bg-surface-soft/40 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Testimoni"
            title="Apa Kata Penghuni"
            align="center"
          />
          <p className="mt-8 text-center text-ink">Segera hadir.</p>
        </Container>
      </section>
    );
  }

  return (
    <section id="testimoni" className="bg-surface-soft/40 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Testimoni"
          title="Apa Kata Penghuni"
          description="Pengalaman nyata dari mereka yang sudah tinggal di sini."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 0.06}>
              <figure className="group flex h-full flex-col gap-4 rounded-md border border-hairline bg-canvas p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg">
                <Quote
                  className="size-6 text-hairline transition-transform duration-300 group-hover:scale-110 group-hover:text-primary/40"
                  aria-hidden="true"
                  fill="currentColor"
                />
                <blockquote className="flex-1 text-sm leading-relaxed text-ink">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t border-hairline-soft pt-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-semibold text-primary">
                    {testimonial.initials}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
                    <p className="text-xs text-ink">{testimonial.role}</p>
                  </div>
                  <StarRating rating={testimonial.rating} />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
