"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function PropertySelector({
  properties,
  activeName,
}: {
  properties: string[];
  activeName: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
        className="flex items-center gap-2 rounded-full border border-hairline bg-canvas px-3 py-1.5 text-sm cursor-pointer transition-colors hover:bg-surface-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <Building2 className="size-4 shrink-0 text-primary" aria-hidden="true" />
        <span className="font-medium text-ink max-w-[10rem] truncate sm:max-w-none">
          {activeName}
        </span>
        <ChevronDown
          className={cn("size-4 shrink-0 text-muted transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div
          role="listbox"
          className="absolute left-0 top-[calc(100%+8px)] z-30 min-w-[16rem] rounded-md border border-hairline bg-canvas p-1.5 shadow-card"
        >
          {properties.map((name) => (
            <div
              key={name}
              role="option"
              aria-selected={name === activeName}
              className="flex items-center justify-between gap-2 rounded-sm px-3 py-2.5 text-sm text-ink hover:bg-surface-soft"
            >
              <span className="font-medium">{name}</span>
              {name === activeName ? (
                <Check className="size-4 text-primary" aria-hidden="true" />
              ) : null}
            </div>
          ))}
          <div className="mt-1 border-t border-hairline-soft px-3 py-2 text-xs text-ink">
            Properti lain akan segera hadir
          </div>
        </div>
      ) : null}
    </div>
  );
}
