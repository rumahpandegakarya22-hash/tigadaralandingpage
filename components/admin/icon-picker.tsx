"use client";

import { useState } from "react";
import { ICONS } from "@/components/site/icon-map";
import { iconKeys, type IconKey } from "@/lib/icon-options";

// Key alias (key lama di DB) disembunyikan, kecuali sedang terpilih.
export function IconPicker({ name, defaultValue }: { name: string; defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue ?? "");
  const options = iconKeys.filter((k) => !ICONS[k].alias || k === value) as readonly IconKey[];

  return (
    <div>
      <input type="hidden" name={name} value={value} />
      <div
        role="radiogroup"
        aria-label="Pilih ikon"
        className="grid max-h-64 grid-cols-4 gap-1.5 overflow-y-auto rounded-lg border border-input p-2 sm:grid-cols-6"
      >
        {options.map((key) => {
          const { Icon, label } = ICONS[key];
          const selected = key === value;
          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={selected}
              title={label}
              onClick={() => setValue(key)}
              className={`flex flex-col items-center gap-1 rounded-md border p-2 text-[11px] leading-tight text-ink hover:bg-surface-soft ${
                selected ? "border-primary bg-surface-soft ring-2 ring-primary/40" : "border-transparent"
              }`}
            >
              <Icon className="size-5" aria-hidden="true" />
              <span className="text-center">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
