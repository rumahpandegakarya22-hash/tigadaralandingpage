import { Container } from "./container";
import { Reveal } from "./reveal";
import { highlightIconMap } from "./icon-map";
import { highlights } from "@/lib/mock-data";

export function HighlightsStrip() {
  return (
    <section id="keunggulan" className="border-b border-hairline bg-canvas py-10 sm:py-12">
      <Container>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {highlights.map((item, index) => {
            const Icon = highlightIconMap[item.icon];
            return (
              <Reveal key={item.id} delay={index * 0.05}>
                <div className="flex flex-col items-center gap-2.5 text-center sm:flex-row sm:text-left">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-soft text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-ink">{item.label}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
