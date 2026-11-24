"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import { Scale, X, Check, Minus, MessageCircle, Trash2 } from "lucide-react";
import { CtaButton } from "./cta-button";
import type { RoomType, Property } from "@/lib/types";
import type { LandingCopy } from "@/lib/copy";
import { formatRupiah, buildWhatsappLink, cn } from "@/lib/utils";
import { fillCopy } from "@/lib/copy";
import { buildCompareRows, type CompareCell } from "@/lib/compare";

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

function Cell({ cell, copy }: { cell: CompareCell; copy: LandingCopy }) {
  switch (cell.kind) {
    case "yes":
      return (
        <div className="flex items-start gap-2">
          <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <span className="font-semibold text-ink">{copy.rooms_compare_yes}</span>
            {cell.detail ? <p className="mt-0.5 text-xs text-ink/70">{cell.detail}</p> : null}
          </div>
        </div>
      );
    case "no":
      return (
        <div className="flex items-center gap-2 text-ink/70">
          <Minus className="size-4 shrink-0" aria-hidden="true" />
          <span>{copy.rooms_compare_no}</span>
        </div>
      );
    case "value":
      return (
        <div>
          <span className="font-semibold text-ink">{cell.text}</span>
          {cell.detail ? <p className="mt-0.5 text-xs text-ink/70">{cell.detail}</p> : null}
        </div>
      );
    case "list":
      return (
        <ul className="flex flex-col gap-1 text-left">
          {cell.items.map((s) => (
            <li key={s} className="flex items-start gap-1.5">
              <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      );
    case "text":
      return cell.strong ? (
        <span className="font-heading text-lg font-bold text-ink">{cell.text}</span>
      ) : (
        <span>{cell.text}</span>
      );
    default:
      return <span className="text-ink/50">—</span>;
  }
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
  const [onlyDiff, setOnlyDiff] = useState(false);
  const allRows = buildCompareRows(rooms, copy);
  const dataRows = allRows.filter((row) => !row.header);
  // Judul grup ikut tampil hanya bila ada baris di bawahnya yang berbeda.
  const rows = onlyDiff
    ? allRows.filter((row) =>
        row.header ? allRows.some((g) => !g.header && g.group === row.group && g.differs) : row.differs
      )
    : allRows;

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

        <div className="flex items-center justify-between gap-3 border-b border-hairline px-5 py-2.5">
          <span className="text-xs text-ink/70">
            {dataRows.filter((r) => r.differs).length} / {dataRows.length} {copy.rooms_compare_diff_mark.toLowerCase()}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={onlyDiff}
            onClick={() => setOnlyDiff((v) => !v)}
            className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-ink"
          >
            <span
              className={cn(
                "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors",
                onlyDiff ? "bg-primary" : "bg-hairline"
              )}
            >
              <span
                className={cn(
                  "inline-block size-4 rounded-full bg-canvas shadow transition-transform",
                  onlyDiff ? "translate-x-[18px]" : "translate-x-0.5"
                )}
              />
            </span>
            {copy.rooms_compare_only_diff}
          </button>
        </div>

        <div className="overflow-auto">
          <table
            className="w-full table-fixed border-collapse text-sm text-ink"
            style={{ minWidth: 128 + rooms.length * 170 }}
          >
            <thead>
              <tr>
                <th className="sticky left-0 top-0 z-30 w-28 bg-canvas p-3 text-left align-bottom text-xs font-medium uppercase tracking-wide text-ink/60">
                  Tipe
                </th>
                {rooms.map((r) => (
                  <th key={r.id} className="sticky top-0 z-20 border-l border-hairline bg-canvas p-3 align-top">
                    <div className="relative mb-2 h-24 w-full overflow-hidden rounded-sm sm:h-28">
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
              {rows.map((row) =>
                row.header ? (
                  <tr key={row.id} className="border-t border-hairline">
                    <th
                      colSpan={rooms.length + 1}
                      scope="colgroup"
                      className="sticky left-0 bg-surface-soft px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink"
                    >
                      {row.label}
                    </th>
                  </tr>
                ) : (
                <tr key={row.id} className="border-t border-hairline align-top">
                  <th
                    scope="row"
                    className={cn(
                      "sticky left-0 z-10 p-3 text-left text-xs font-semibold uppercase tracking-wide text-ink/70",
                      row.differs ? "bg-surface-soft" : "bg-canvas"
                    )}
                  >
                    {row.label}
                    {row.differs ? (
                      <span className="mt-1 block w-fit rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold normal-case tracking-normal text-primary">
                        {copy.rooms_compare_diff_mark}
                      </span>
                    ) : null}
                  </th>
                  {row.cells.map((cell, i) => (
                    <td
                      key={rooms[i].id}
                      className={cn("border-l border-hairline p-3", row.differs && "bg-surface-soft/60")}
                    >
                      <Cell cell={cell} copy={copy} />
                    </td>
                  ))}
                </tr>
                )
              )}
              <tr className="border-t border-hairline">
                <th className="sticky left-0 z-10 bg-canvas p-3" />
                {rooms.map((r) => (
                  <td key={r.id} className="border-l border-hairline p-3">
                    <CtaButton
                      as="a"
                      href={buildWhatsappLink(
                        property.whatsappNumber,
                        fillCopy(copy.wa_room_message, { room: r.name, name: property.name, price: formatRupiah(r.price) })
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
