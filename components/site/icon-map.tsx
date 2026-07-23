import {
  Wifi,
  ShieldCheck,
  Car,
  Sparkles,
  UtensilsCrossed,
  Clock,
  Sofa,
  WashingMachine,
  ParkingSquare,
  MoonStar,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const highlightIconMap: Record<string, LucideIcon> = {
  wifi: Wifi,
  shield: ShieldCheck,
  car: Car,
  sparkles: Sparkles,
  utensils: UtensilsCrossed,
  clock: Clock,
};

export const facilityIconMap: Record<string, LucideIcon> = {
  kitchen: UtensilsCrossed,
  sofa: Sofa,
  washer: WashingMachine,
  parking: ParkingSquare,
  wifi: Wifi,
  security: ShieldCheck,
  cleaning: Sparkles,
  prayer: MoonStar,
};
