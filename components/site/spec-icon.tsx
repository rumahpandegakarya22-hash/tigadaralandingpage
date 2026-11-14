import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ICONS } from "./icon-map";
import type { IconKey } from "@/lib/icon-options";

// Ikon spesifikasi kamar dicocokkan dari teks (specs berupa string bebas). Urutan penting: aturan spesifik dulu.
const rules: Array<{ match: RegExp; key: IconKey }> = [
  { match: /\bac\b|air conditioner/i, key: "ac" },
  { match: /water heater|air panas|pemanas/i, key: "heater" },
  { match: /kamar mandi|shower/i, key: "shower" },
  { match: /toilet|wc|kloset/i, key: "toilet" },
  { match: /kulkas|lemari es|refrigerator/i, key: "fridge" },
  { match: /microwave/i, key: "microwave" },
  { match: /kompor|mini kitchen|dapur/i, key: "stove" },
  { match: /dispenser|galon/i, key: "dispenser" },
  { match: /wifi|internet|wi-fi/i, key: "wifi" },
  { match: /\btv\b|televisi/i, key: "tv" },
  { match: /listrik|token|pln/i, key: "electricity" },
  { match: /colokan|stop kontak/i, key: "plug" },
  { match: /\bair\b|pdam/i, key: "water" },
  { match: /meja/i, key: "desk" },
  { match: /kursi/i, key: "chair" },
  { match: /lemari/i, key: "wardrobe" },
  { match: /kipas/i, key: "fan" },
  { match: /kasur|bed|ranjang|spring ?bed/i, key: "bed" },
  { match: /jendela|ventilasi/i, key: "window" },
  { match: /gorden|tirai/i, key: "curtain" },
  { match: /lampu/i, key: "lamp" },
  { match: /cctv/i, key: "cctv" },
  { match: /kunci|smart ?lock|selot/i, key: "key" },
  { match: /kebersihan|bersih/i, key: "cleaning" },
  { match: /laundry|setrika|cuci/i, key: "laundry" },
  { match: /parkir/i, key: "parking" },
];

export function getSpecIcon(spec: string): LucideIcon {
  const rule = rules.find((r) => r.match.test(spec));
  return rule ? ICONS[rule.key].Icon : Check;
}
