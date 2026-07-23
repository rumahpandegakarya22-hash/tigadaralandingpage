import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Container } from "./container";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { faqs } from "@/lib/mock-data";

export function Faq() {
  return (
    <section id="faq" className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Pertanyaan yang Sering Diajukan"
          description="Masih ragu? Cek dulu jawaban dari pertanyaan yang paling sering ditanyakan."
          align="center"
        />

        <Reveal className="mt-10">
          <Accordion>
            {faqs.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="font-heading text-base font-semibold text-ink py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-ink">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  );
}
