"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Building2, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PropertySummary } from "@/lib/data";

export function PropertySelector({
  properties,
  activeSlug,
}: {
  properties: PropertySummary[];
  activeSlug: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const activeName = properties.find((p) => p.slug === activeSlug)?.name ?? activeSlug;

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        disabled={properties.length <= 1}
        className="flex items-center gap-2 rounded-full border border-hairline bg-canvas px-3 py-1.5 text-sm cursor-pointer transition-colors hover:bg-surface-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-default disabled:hover:bg-canvas"
      >
        <Building2 className="size-4 shrink-0 text-primary" aria-hidden="true" />
        <span className="font-medium text-ink max-w-[10rem] truncate sm:max-w-none">
          {activeName}
        </span>
        {properties.length > 1 ? (
          <ChevronDown
            className={cn("size-4 shrink-0 text-muted transition-transform", open && "rotate-180")}
            aria-hidden="true"
          />
        ) : null}
      </button>

      {open && properties.length > 1 ? (
        <div
          role="listbox"
          className="absolute left-0 top-[calc(100%+8px)] z-30 min-w-[16rem] rounded-md border border-hairline bg-canvas p-1.5 shadow-card animate-in fade-in zoom-in-95 slide-in-from-top-1 duration-150"
        >
          {properties.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              role="option"
              aria-selected={p.slug === activeSlug}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-2 rounded-sm px-3 py-2.5 text-sm text-ink hover:bg-surface-soft"
            >
              <span className="font-medium">{p.name}</span>
              {p.slug === activeSlug ? (
                <Check className="size-4 text-primary" aria-hidden="true" />
              ) : null}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
