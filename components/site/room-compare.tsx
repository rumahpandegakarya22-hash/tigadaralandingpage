"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import { Scale, X, Check, MessageCircle, Trash2 } from "lucide-react";
import { CtaButton } from "./cta-button";
import type { RoomType, Property } from "@/lib/types";
import type { LandingCopy } from "@/lib/copy";
import { formatRupiah, buildWhatsappLink, cn } from "@/lib/utils";

const MAX_COMPARE = 3;

type CompareCtx = {
  selected: string[];
  toggle: (id: string) => void;
  isSelected: (id: string) => boolean;
  canAdd: boolean;
  max: number;
};

const Ctx = createContext<CompareCtx | null>(null);

function useCompare() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCompare harus dipakai di dalam RoomCompareProvider");
  return ctx;
}

/** Checkbox "Bandingkan" untuk dipasang di kartu kamar. */
export function CompareToggle({ roomId }: { roomId: string }) {
  const { isSelected, toggle, canAdd, max } = useCompare();
  const active = isSelected(roomId);
  const disabled = !active && !canAdd;

  return (
    <button
      type="button"
      onClick={() => toggle(roomId)}
      disabled={disabled}
      aria-pressed={active}
      title={disabled ? `Maksimal ${max} kamar dibandingkan` : undefined}
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-hairline text-ink hover:bg-surface-soft/60",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <span
        className={cn(
          "flex size-4 items-center justify-center rounded-[3px] border",
          active ? "border-primary bg-primary text-on-primary" : "border-hairline"
        )}
        aria-hidden="true"
      >
        {active ? <Check className="size-3" /> : null}
      </span>
      Bandingkan
    </button>
  );
}

export function RoomCompareProvider({
  rooms,
  property,
  copy,
  children,
}: {
  rooms: RoomType[];
  property: Property;
  copy: LandingCopy;
  children: ReactNode;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const value = useMemo<CompareCtx>(
    () => ({
      selected,
      isSelected: (id) => selected.includes(id),
      canAdd: selected.length < MAX_COMPARE,
      max: MAX_COMPARE,
      toggle: (id) =>
        setSelected((prev) =>
          prev.includes(id)
            ? prev.filter((x) => x !== id)
            : prev.length < MAX_COMPARE
              ? [...prev, id]
              : prev
        ),
    }),
    [selected]
  );

  const selectedRooms = rooms.filter((r) => selected.includes(r.id));

  return (
    <Ctx.Provider value={value}>
      {children}
      <CompareBar
        count={selected.length}
        onClear={() => setSelected([])}
        onOpen={() => setOpen(true)}
        label={copy.rooms_compare_bar_cta ?? "Bandingkan"}
        hint={copy.rooms_compare_min_hint ?? "Pilih minimal 2 tipe kamar"}
      />
      {open && (
        <CompareModal
          rooms={selectedRooms}
          property={property}
          copy={copy}
          onClose={() => setOpen(false)}
          onRemove={(id) => setSelected((prev) => prev.filter((x) => x !== id))}
        />
      )}
    </Ctx.Provider>
  );
}

function CompareBar({
  count,
  onClear,
  onOpen,
  label,
  hint,
}: {
  count: number;
  onClear: () => void;
  onOpen: () => void;
  label: string;
  hint: string;
}) {
  if (count === 0) return null;
  const ready = count >= 2;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-canvas/95 backdrop-blur supports-[backdrop-filter]:bg-canvas/80 animate-in slide-in-from-bottom-4 duration-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2 text-sm text-ink">
          <Scale className="size-5 shrink-0 text-primary" aria-hidden="true" />
          <span>
            <strong>{count}</strong> tipe dipilih{ready ? "" : ` — ${hint}`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-sm font-medium text-ink hover:bg-surface-soft/60 cursor-pointer"
          >
            <Trash2 className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Kosongkan</span>
          </button>
          <CtaButton type="button" variant="primary" onClick={onOpen} disabled={!ready}>
            <Scale className="size-4" aria-hidden="true" />
            {label} ({count})
          </CtaButton>
        </div>
      </div>
    </div>
  );
}

function CompareModal({
  rooms,
  property,
  copy,
  onClose,
  onRemove,
}: {
  rooms: RoomType[];
  property: Property;
  copy: LandingCopy;
  onClose: () => void;
  onRemove: (id: string) => void;
}) {
  const rows: { label: string; render: (r: RoomType) => ReactNode }[] = [
    { label: "Harga", render: (r) => <span className="font-heading text-lg font-bold text-ink">{formatRupiah(r.price)}<span className="text-xs font-normal text-ink">/bln</span></span> },
    { label: "Ukuran", render: (r) => r.size },
    { label: "Kasur", render: (r) => r.bed },
    {
      label: "Spesifikasi",
      render: (r) => (
        <ul className="flex flex-col gap-1 text-left">
          {r.specs.map((s) => (
            <li key={s} className="flex items-start gap-1.5">
              <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      ),
    },
    { label: "Catatan", render: (r) => r.note ?? "—" },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={copy.rooms_compare_title ?? "Perbandingan Tipe Kamar"}
      className="fixed inset-0 z-50 flex items-center justify-center bg-scrim/90 p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-md border border-hairline bg-canvas animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <h2 className="font-heading text-lg font-bold text-ink">
            {copy.rooms_compare_title ?? "Perbandingan Tipe Kamar"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="inline-flex size-9 items-center justify-center rounded-full text-ink hover:bg-surface-soft/60 cursor-pointer"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-auto">
          <table className="w-full border-collapse text-sm text-ink">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 w-28 bg-canvas p-3 text-left align-bottom text-xs font-medium uppercase tracking-wide text-ink/60">
                  Tipe
                </th>
                {rooms.map((r) => (
                  <th key={r.id} className="min-w-[160px] border-l border-hairline p-3 align-top">
                    <div className="relative mb-2 aspect-[4/3] w-full overflow-hidden rounded-sm">
                      <Image src={r.photo.src} alt={r.photo.alt} fill sizes="200px" className="object-cover" />
                      <button
                        type="button"
                        onClick={() => onRemove(r.id)}
                        aria-label={`Hapus ${r.name} dari perbandingan`}
                        className="absolute right-1.5 top-1.5 inline-flex size-7 items-center justify-center rounded-full bg-canvas/90 text-ink hover:bg-canvas cursor-pointer"
                      >
                        <X className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                    <span className="font-heading text-sm font-semibold text-ink">{r.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-hairline align-top">
                  <th className="sticky left-0 z-10 bg-canvas p-3 text-left text-xs font-medium uppercase tracking-wide text-ink/60">
                    {row.label}
                  </th>
                  {rooms.map((r) => (
                    <td key={r.id} className="border-l border-hairline p-3">
                      {row.render(r)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-hairline">
                <th className="sticky left-0 z-10 bg-canvas p-3" />
                {rooms.map((r) => (
                  <td key={r.id} className="border-l border-hairline p-3">
                    <CtaButton
                      as="a"
                      href={buildWhatsappLink(
                        property.whatsappNumber,
                        `Halo, saya tertarik dengan ${r.name} di ${property.name} (${formatRupiah(r.price)}/bulan). Apakah masih tersedia?`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      className="w-full"
                    >
                      <MessageCircle className="size-4" aria-hidden="true" />
                      {copy.rooms_card_cta ?? "Tanya"}
                    </CtaButton>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
