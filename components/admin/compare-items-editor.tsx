"use client";

import { useState, useTransition } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { CtaButton } from "@/components/site/cta-button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type EditorItem = {
  id: string;
  label: string;
  keywords: string;
  enabled: boolean;
  custom: boolean;
  defaultLabel?: string;
  defaultKeywords?: string;
};

const splitKeywords = (s: string) => s.split(",").map((k) => k.trim()).filter(Boolean);

export function CompareItemsEditor({
  initial,
  suggestions,
  saveAction,
  resetAction,
}: {
  initial: EditorItem[];
  suggestions: string[];
  saveAction: (json: string) => Promise<void>;
  resetAction: () => Promise<void>;
}) {
  const [items, setItems] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  const patch = (id: string, change: Partial<EditorItem>) => {
    setMessage("");
    setItems((list) => list.map((i) => (i.id === id ? { ...i, ...change } : i)));
  };
  const move = (index: number, delta: number) => {
    setMessage("");
    setItems((list) => {
      const next = [...list];
      const j = index + delta;
      if (j < 0 || j >= next.length) return list;
      [next[index], next[j]] = [next[j], next[index]];
      return next;
    });
  };
  const add = (label = "", keywords = "") => {
    setMessage("");
    setItems((list) => [...list, { id: `c_${Date.now().toString(36)}`, label, keywords, enabled: true, custom: true }]);
  };

  function save() {
    const invalid = items.find((i) => i.custom && (!i.label.trim() || !splitKeywords(i.keywords).length));
    if (invalid) {
      setMessage("Item tambahan wajib punya nama dan minimal satu kata kunci.");
      return;
    }
    // Item bawaan hanya menyimpan bagian yang diubah, sisanya tetap mengikuti bawaan.
    const payload = items.map((i) => ({
      id: i.id,
      custom: i.custom || undefined,
      enabled: i.enabled,
      label: i.custom || i.label.trim() !== i.defaultLabel ? i.label.trim() : undefined,
      keywords: i.custom || i.keywords.trim() !== i.defaultKeywords ? splitKeywords(i.keywords) : undefined,
    }));
    setMessage("");
    startTransition(async () => {
      try {
        await saveAction(JSON.stringify(payload));
        setMessage("Tersimpan.");
      } catch {
        setMessage("Gagal menyimpan. Coba login ulang lalu simpan lagi.");
      }
    });
  }

  function reset() {
    if (!confirm("Kembalikan semua item ke pengaturan bawaan? Item tambahanmu akan terhapus.")) return;
    startTransition(async () => {
      try {
        await resetAction();
        window.location.reload();
      } catch {
        setMessage("Gagal mengembalikan. Coba login ulang.");
      }
    });
  }

  const used = new Set(items.flatMap((i) => splitKeywords(i.keywords).map((k) => k.toLowerCase())));
  const open = suggestions.filter((s) => !used.has(s.toLowerCase()));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "flex flex-col gap-3 rounded-md border border-hairline bg-canvas p-4 sm:flex-row sm:items-start",
              !item.enabled && "opacity-60"
            )}
          >
            <div className="flex shrink-0 items-center gap-1 sm:flex-col">
              <button
                type="button"
                aria-label="Naikkan urutan"
                disabled={index === 0}
                onClick={() => move(index, -1)}
                className="inline-flex size-8 cursor-pointer items-center justify-center rounded-sm text-ink hover:bg-surface-soft disabled:opacity-30"
              >
                <ChevronUp className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Turunkan urutan"
                disabled={index === items.length - 1}
                onClick={() => move(index, 1)}
                className="inline-flex size-8 cursor-pointer items-center justify-center rounded-sm text-ink hover:bg-surface-soft disabled:opacity-30"
              >
                <ChevronDown className="size-4" />
              </button>
            </div>

            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
                Nama baris
                <Input value={item.label} maxLength={40} onChange={(e) => patch(item.id, { label: e.target.value })} />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
                Kata kunci (pisah koma)
                <Input
                  value={item.keywords}
                  placeholder="contoh: kulkas, lemari es"
                  onChange={(e) => patch(item.id, { keywords: e.target.value })}
                />
              </label>
            </div>

            <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
              <button
                type="button"
                role="switch"
                aria-checked={item.enabled}
                aria-label={`Tampilkan ${item.label || "item"} di tabel`}
                onClick={() => patch(item.id, { enabled: !item.enabled })}
                className="inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-ink"
              >
                <span className={cn("relative inline-flex h-5 w-9 items-center rounded-full transition-colors", item.enabled ? "bg-primary" : "bg-hairline")}>
                  <span className={cn("inline-block size-4 rounded-full bg-canvas shadow transition-transform", item.enabled ? "translate-x-[18px]" : "translate-x-0.5")} />
                </span>
                {item.enabled ? "Tampil" : "Sembunyi"}
              </button>
              {item.custom ? (
                <button
                  type="button"
                  aria-label={`Hapus ${item.label || "item"}`}
                  onClick={() => {
                    setMessage("");
                    setItems((list) => list.filter((i) => i.id !== item.id));
                  }}
                  className="inline-flex size-8 cursor-pointer items-center justify-center rounded-sm text-primary-error-text hover:bg-surface-soft"
                >
                  <Trash2 className="size-4" />
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {open.length ? (
        <div className="rounded-md border border-dashed border-hairline p-4">
          <p className="text-sm font-medium text-ink">Spesifikasi kamar yang belum punya baris sendiri</p>
          <p className="mt-1 text-xs text-ink/70">Klik untuk menambahkannya sebagai item baru.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {open.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => add(s.replace(/\s*\(.*$/, "").slice(0, 40), s.replace(/\s*\(.*$/, "").slice(0, 40).toLowerCase())}
                className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-hairline px-3 py-1 text-xs text-ink hover:bg-surface-soft"
              >
                <Plus className="size-3" /> {s}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <CtaButton type="button" variant="secondary" size="md" className="text-sm" onClick={() => add()}>
          <Plus className="size-4" /> Tambah Item
        </CtaButton>
        <CtaButton type="button" variant="primary" size="md" disabled={pending} className="text-sm" onClick={save}>
          {pending ? "Menyimpan..." : "Simpan"}
        </CtaButton>
        <button
          type="button"
          onClick={reset}
          disabled={pending}
          className="cursor-pointer text-sm text-ink underline underline-offset-2 disabled:opacity-50"
        >
          Kembalikan ke bawaan
        </button>
        {message ? <span className="text-sm text-ink">{message}</span> : null}
      </div>
    </div>
  );
}
