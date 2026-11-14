import { Container } from "./container";
import { Reveal } from "./reveal";
import { highlightIconMap } from "./icon-map";
import type { Highlight } from "@/lib/types";

// Jumlah kolom per baris agar item tersebar rata: satu baris bila muat, selebihnya dibagi dua baris seimbang.
const perRow = (n: number, max: number) => (n <= max ? n : Math.ceil(n / 2));

export function HighlightsStrip({ highlights }: { highlights: Highlight[] }) {
  const n = highlights.length;
  const cols = { "--c-sm": Math.max(1, perRow(n, 4)), "--c-lg": Math.max(1, perRow(n, 6)) } as React.CSSProperties;

  return (
    <section id="keunggulan" className="border-b border-hairline bg-canvas py-10 sm:py-12">
      <Container>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-6" style={cols}>
          {highlights.map((item, index) => {
            const Icon = highlightIconMap[item.icon];
            return (
              <Reveal key={item.id} delay={index * 0.05} className="w-[calc((100%_-_1rem)_/_2)] sm:w-[calc((100%_-_(var(--c-sm)_-_1)_*_1rem)_/_var(--c-sm))] lg:w-[calc((100%_-_(var(--c-lg)_-_1)_*_1rem)_/_var(--c-lg))]">
                <div className="group flex flex-col items-center justify-center gap-2.5 text-center sm:flex-row sm:text-left">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-soft text-primary transition-all duration-200 group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary">
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
