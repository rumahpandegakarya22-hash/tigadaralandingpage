import {
  Snowflake,
  ShowerHead,
  Table2,
  Shirt,
  Fan,
  BedDouble,
  PanelTop,
  Check,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const rules: Array<{ match: RegExp; icon: LucideIcon }> = [
  { match: /\bac\b/i, icon: Snowflake },
  { match: /kamar mandi|water heater/i, icon: ShowerHead },
  { match: /meja|kursi/i, icon: Table2 },
  { match: /lemari/i, icon: Shirt },
  { match: /kipas/i, icon: Fan },
  { match: /kasur|bed/i, icon: BedDouble },
  { match: /jendela/i, icon: PanelTop },
];

export function getSpecIcon(spec: string): LucideIcon {
  const rule = rules.find((r) => r.match.test(spec));
  return rule ? rule.icon : Check;
}
