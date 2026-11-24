import type { RoomType } from "@/lib/types";
import type { LandingCopy } from "@/lib/copy";
import { formatRupiah } from "@/lib/utils";

/* Tabel perbandingan kamar: kolom kiri = item, kolom kanan = satu kamar per kolom.
   Item dibaca otomatis dari teks `specs` kamar (string bebas) lewat kata kunci, jadi data kamar tidak perlu diubah.
   Daftar item bisa diatur dari /admin (Item Perbandingan); pengaturannya disimpan sebagai JSON di
   `landing_copy` dengan key COMPARE_ITEMS_KEY, tanpa mengubah struktur tabel mana pun.
   Teks spesifikasi yang belum punya item tampil di baris "Fasilitas lainnya". */

export const COMPARE_ITEMS_KEY = "compare_items";

export type CompareCell =
  | { kind: "text"; text: string; strong?: boolean }
  | { kind: "yes"; detail?: string }
  | { kind: "no" }
  | { kind: "value"; text: string; detail?: string }
  | { kind: "list"; items: string[] }
  | { kind: "none" };

// `header`: baris judul grup (tanpa isi sel), mis. "Termasuk dalam harga".
export type CompareRow = { id: string; label: string; cells: CompareCell[]; differs: boolean; header?: boolean; group?: string };

/** Bentuk yang disimpan di DB: hanya yang diubah admin (item bawaan) atau item tambahan (custom). */
export type CompareItemConfig = { id: string; label?: string; keywords?: string[]; enabled?: boolean; custom?: boolean };

export type CompareItem = {
  id: string;
  label: string;
  keywords: string[];
  enabled: boolean;
  custom: boolean;
  type: "bool" | "bath" | "power" | "stove";
  detail?: (spec: string) => string | undefined;
};

const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const strip = (spec: string, re: RegExp) => cap(spec.replace(re, "").replace(/[.,\s]+$/, "").trim()) || undefined;
const parens = (spec: string) => {
  const m = /\(([^)]*)\)?/.exec(spec);
  return m ? cap(m[1].replace(/[.,\s]+$/, "").trim()) || undefined : undefined;
};

type Builtin = Pick<CompareItem, "id" | "type" | "keywords" | "detail"> & { labelKey: string };

// Urutan = urutan baris bawaan. Satu spesifikasi boleh memenuhi lebih dari satu item.
const BUILTINS: Builtin[] = [
  { id: "ac", labelKey: "cmp_ac", type: "bool", keywords: ["ac"] },
  { id: "fan", labelKey: "cmp_fan", type: "bool", keywords: ["kipas"] },
  { id: "bath", labelKey: "cmp_bath", type: "bath", keywords: ["kamar mandi"] },
  { id: "wc_sit", labelKey: "cmp_wc_sit", type: "bool", keywords: ["wc duduk", "kloset duduk", "toilet duduk"] },
  { id: "wc_squat", labelKey: "cmp_wc_squat", type: "bool", keywords: ["wc jongkok", "kloset jongkok", "toilet jongkok"] },
  { id: "shower", labelKey: "cmp_shower", type: "bool", keywords: ["shower"] },
  { id: "heater", labelKey: "cmp_heater", type: "bool", keywords: ["water heater", "air panas", "pemanas"] },
  { id: "desk", labelKey: "cmp_desk", type: "bool", keywords: ["meja", "kursi"] },
  { id: "wardrobe", labelKey: "cmp_wardrobe", type: "bool", keywords: ["lemari"], detail: (s) => strip(s, /^lemari( pakaian)?/i) },
  { id: "window", labelKey: "cmp_window", type: "bool", keywords: ["jendela"], detail: (s) => strip(s, /^jendela/i) },
  { id: "tv", labelKey: "cmp_tv", type: "bool", keywords: ["tv", "televisi"] },
  { id: "kitchen", labelKey: "cmp_kitchen", type: "bool", keywords: ["kitchen", "dapur"] },
  { id: "sink", labelKey: "cmp_sink", type: "bool", keywords: ["wastafel"] },
  { id: "stove", labelKey: "cmp_stove", type: "stove", keywords: ["kompor"] },
  { id: "power", labelKey: "cmp_power", type: "power", keywords: ["listrik"] },
];

export const BUILTIN_IDS = new Set(BUILTINS.map((b) => b.id));

function parseConfig(raw: string | undefined): CompareItemConfig[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter((x): x is CompareItemConfig => x && typeof x.id === "string");
  } catch {
    return [];
  }
}

/** Gabungkan item bawaan dengan pengaturan admin. Item nonaktif tetap ada di hasil (enabled=false). */
export function resolveCompareItems(copy: LandingCopy): CompareItem[] {
  const config = parseConfig(copy[COMPARE_ITEMS_KEY]);
  const byId = new Map(BUILTINS.map((b) => [b.id, b]));
  const items: CompareItem[] = [];
  const seen = new Set<string>();

  const fromBuiltin = (b: Builtin, c?: CompareItemConfig): CompareItem => ({
    id: b.id,
    type: b.type,
    detail: b.detail,
    custom: false,
    label: c?.label?.trim() || copy[b.labelKey],
    keywords: c?.keywords?.length ? c.keywords : b.keywords,
    enabled: c?.enabled !== false,
  });

  for (const c of config) {
    if (seen.has(c.id)) continue;
    seen.add(c.id);
    const b = byId.get(c.id);
    if (b) items.push(fromBuiltin(b, c));
    else if (c.custom && c.label?.trim())
      items.push({
        id: c.id,
        type: "bool",
        custom: true,
        label: c.label.trim(),
        keywords: c.keywords ?? [],
        enabled: c.enabled !== false,
        // Detail hanya bila teks spesifikasi lebih panjang dari nama item ("Kulkas" → tanpa detail).
        detail: (spec) => (spec.trim().toLowerCase() === c.label!.trim().toLowerCase() ? undefined : cap(spec)),
      });
  }
  for (const b of BUILTINS) if (!seen.has(b.id)) items.push(fromBuiltin(b));
  return items;
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Kata kunci cocok bila berdiri sendiri sebagai kata/frasa ("ac" tidak cocok dengan "space"). */
export function keywordRegex(keywords: string[]): RegExp {
  const list = keywords.map((k) => k.trim()).filter(Boolean).map(escapeRe);
  if (!list.length) return /(?!)/;
  return new RegExp(`(?<![\\p{L}\\p{N}])(?:${list.join("|")})(?![\\p{L}\\p{N}])`, "iu");
}

const tidy = (s: string) => cap(s.replace(/^[\s.,;:-]+|[\s.,;:-]+$/g, "").trim());

/**
 * Pecah catatan kamar menjadi daftar biaya yang termasuk ("Termasuk Biaya: Internet, Air dan Kebersihan Umum",
 * atau berpenomoran "1. Internet 2. Air ...") dan sisa catatan di luar kalimat itu.
 */
export function parseNote(note: string | null | undefined): { included: string[]; rest: string } {
  const text = (note ?? "").replace(/\s+/g, " ").trim();
  const m = /termasuk biaya\s*:?\s*(.*)$/i.exec(text);
  if (!m) return { included: [], rest: text };
  const included = m[1]
    .split(/\s*\d+\.\s*|,|\s+dan\s+/i)
    .map(tidy)
    .filter(Boolean);
  return { included, rest: tidy(text.slice(0, m.index)) };
}

/** Spesifikasi yang terpecah koma di tengah tanda kurung ("... (water heater", "WC Duduk ...)") digabung lagi. */
export function mergeSpecs(specs: string[]): string[] {
  const out: string[] = [];
  let buf = "";
  for (const raw of specs) {
    const s = raw.trim();
    if (!s) continue;
    buf = buf ? `${buf}, ${s}` : s;
    if ((buf.match(/\(/g) ?? []).length <= (buf.match(/\)/g) ?? []).length) {
      out.push(buf);
      buf = "";
    }
  }
  if (buf) out.push(buf);
  return out;
}

// Pembanding tidak membedakan huruf besar/kecil ("Kasur single" = "Kasur Single").
const cellKey = (c: CompareCell) =>
  (c.kind === "text" || c.kind === "value"
    ? `${c.kind}:${c.text}`
    : c.kind === "list"
      ? `list:${c.items.join("|")}`
      : c.kind
  ).toLowerCase();

export function buildCompareRows(rooms: RoomType[], copy: LandingCopy): CompareRow[] {
  const merged = rooms.map((r) => mergeSpecs(r.specs));
  const used = rooms.map(() => new Set<string>());
  const rows: CompareRow[] = [];

  const push = (id: string, label: string, cells: CompareCell[]) =>
    rows.push({ id, label, cells, differs: new Set(cells.map(cellKey)).size > 1 });

  push("price", copy.rooms_compare_price, rooms.map((r) => ({
    kind: "text", strong: true, text: `${formatRupiah(r.price)}${copy.rooms_per_month}`,
  })));
  push("size", copy.rooms_compare_size, rooms.map((r) => ({ kind: "text", text: r.size })));
  push("bed", copy.rooms_compare_bed, rooms.map((r) => ({ kind: "text", text: r.bed })));

  for (const item of resolveCompareItems(copy)) {
    // Spesifikasi dianggap "terpakai" walau itemnya dinonaktifkan: admin sengaja menyembunyikannya.
    const re = keywordRegex(item.keywords);
    const found = merged.map((list, i) => {
      const spec = list.find((s) => re.test(s));
      if (spec) used[i].add(spec);
      return spec;
    });
    if (!item.enabled || found.every((s) => !s)) continue;

    const cells: CompareCell[] = found.map((spec): CompareCell => {
      if (item.type === "bool") {
        return spec ? { kind: "yes", detail: item.detail?.(spec) } : { kind: "no" };
      }
      if (!spec) return item.type === "stove" ? { kind: "no" } : { kind: "none" };
      if (item.type === "bath") {
        const outside = /luar|bersama/i.test(spec);
        return { kind: "value", text: outside ? copy.cmp_bath_outside : copy.cmp_bath_inside };
      }
      if (item.type === "stove") {
        // "kompor terpisah" ditampilkan apa adanya, tanpa mengklaim kompor sudah tersedia di kamar.
        return /terpisah/i.test(spec) ? { kind: "value", text: copy.cmp_stove_separate } : { kind: "yes" };
      }
      const included = /include|termasuk/i.test(spec) && !/exclude|tidak termasuk/i.test(spec);
      return { kind: "value", text: included ? copy.cmp_power_included : copy.cmp_power_excluded, detail: parens(spec) };
    });
    push(item.id, item.label, cells);
  }

  const others = merged.map((list, i) => list.filter((s) => !used[i].has(s)));
  if (others.some((l) => l.length)) {
    push("others", copy.rooms_compare_other, others.map((items): CompareCell => (items.length ? { kind: "list", items } : { kind: "none" })));
  }

  const notes = rooms.map((r) => parseNote(r.note));

  // Biaya yang termasuk dalam harga: satu baris per jenis biaya, Ya bila kamar itu menyebutkannya.
  const names = new Map<string, string>();
  for (const n of notes) for (const item of n.included) if (!names.has(item.toLowerCase())) names.set(item.toLowerCase(), item);
  if (names.size) {
    rows.push({ id: "included_header", label: copy.rooms_compare_included, cells: [], differs: false, header: true, group: "included" });
    for (const [key, label] of names) {
      push(`included_${key}`, label, notes.map((n): CompareCell => (n.included.some((i) => i.toLowerCase() === key) ? { kind: "yes" } : { kind: "no" })));
      rows[rows.length - 1].group = "included";
    }
  }

  if (notes.some((n) => n.rest)) {
    push("note", copy.rooms_compare_note, notes.map((n): CompareCell => (n.rest ? { kind: "text", text: n.rest } : { kind: "none" })));
  }
  return rows;
}

/** Spesifikasi semua kamar yang belum cocok dengan item mana pun (untuk saran di admin). */
export function unmatchedSpecs(rooms: RoomType[], copy: LandingCopy): string[] {
  const regs = resolveCompareItems(copy).map((i) => keywordRegex(i.keywords));
  const out = new Set<string>();
  for (const r of rooms) for (const s of mergeSpecs(r.specs)) if (!regs.some((re) => re.test(s))) out.add(s);
  return [...out];
}
