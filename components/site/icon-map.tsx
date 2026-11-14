import {
  Wifi, Zap, PlugZap, Tv, Phone, Droplets, Thermometer,
  BedDouble, DoorOpen, LampDesk, Armchair, PanelTop, Blinds, Lamp, Snowflake, Fan, ShowerHead, Bath, Toilet,
  UtensilsCrossed, CookingPot, Refrigerator, Microwave, GlassWater, Coffee, Utensils,
  WashingMachine, Shirt, Wind, Sparkles, Brush, Trash2,
  ShieldCheck, Cctv, Lock, KeyRound, CreditCard, UserCheck, FireExtinguisher,
  Clock, ParkingSquare, Bike, Car, Bus, MapPin, Footprints, GraduationCap, Hospital, ShoppingBag, Store,
  Sofa, Users, BookOpen, Laptop, Trees, Sun, Dumbbell, MoonStar, Package, Mail,
  PawPrint, CigaretteOff, Ban, Accessibility, Briefcase,
  House, Building2, Heart, BadgeCheck, Bell, Landmark,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { IconKey } from "@/lib/icon-options";

export const ICONS: Record<IconKey, { Icon: LucideIcon; label: string; alias?: true }> = {
  wifi: { Icon: Wifi, label: "WiFi" },
  electricity: { Icon: Zap, label: "Listrik" },
  plug: { Icon: PlugZap, label: "Colokan" },
  tv: { Icon: Tv, label: "TV" },
  phone: { Icon: Phone, label: "Telepon" },
  water: { Icon: Droplets, label: "Air" },
  heater: { Icon: Thermometer, label: "Air Panas" },

  bed: { Icon: BedDouble, label: "Kasur" },
  wardrobe: { Icon: DoorOpen, label: "Lemari" },
  desk: { Icon: LampDesk, label: "Meja Belajar" },
  chair: { Icon: Armchair, label: "Kursi" },
  window: { Icon: PanelTop, label: "Jendela" },
  curtain: { Icon: Blinds, label: "Gorden" },
  lamp: { Icon: Lamp, label: "Lampu" },
  ac: { Icon: Snowflake, label: "AC" },
  fan: { Icon: Fan, label: "Kipas" },
  shower: { Icon: ShowerHead, label: "Kamar Mandi" },
  bath: { Icon: Bath, label: "Bak Mandi" },
  toilet: { Icon: Toilet, label: "Toilet" },

  kitchen: { Icon: UtensilsCrossed, label: "Dapur" },
  stove: { Icon: CookingPot, label: "Kompor" },
  fridge: { Icon: Refrigerator, label: "Kulkas" },
  microwave: { Icon: Microwave, label: "Microwave" },
  dispenser: { Icon: GlassWater, label: "Dispenser" },
  coffee: { Icon: Coffee, label: "Pantry" },
  food: { Icon: Utensils, label: "Makan" },

  washer: { Icon: WashingMachine, label: "Mesin Cuci" },
  laundry: { Icon: Shirt, label: "Laundry" },
  jemuran: { Icon: Wind, label: "Jemuran" },
  cleaning: { Icon: Sparkles, label: "Kebersihan" },
  broom: { Icon: Brush, label: "Bersih-bersih" },
  trash: { Icon: Trash2, label: "Sampah" },

  security: { Icon: ShieldCheck, label: "Keamanan" },
  cctv: { Icon: Cctv, label: "CCTV" },
  lock: { Icon: Lock, label: "Pintu Terkunci" },
  key: { Icon: KeyRound, label: "Kunci Kamar" },
  card: { Icon: CreditCard, label: "Akses Kartu" },
  guard: { Icon: UserCheck, label: "Penjaga" },
  fire: { Icon: FireExtinguisher, label: "APAR" },

  clock: { Icon: Clock, label: "Akses 24 Jam" },
  parking: { Icon: ParkingSquare, label: "Parkir" },
  motor: { Icon: Bike, label: "Parkir Motor" },
  car: { Icon: Car, label: "Parkir Mobil" },
  bus: { Icon: Bus, label: "Transportasi" },
  location: { Icon: MapPin, label: "Lokasi" },
  walk: { Icon: Footprints, label: "Jalan Kaki" },
  campus: { Icon: GraduationCap, label: "Kampus" },
  hospital: { Icon: Hospital, label: "Klinik" },
  shop: { Icon: ShoppingBag, label: "Minimarket" },
  store: { Icon: Store, label: "Warung" },

  sofa: { Icon: Sofa, label: "Ruang Santai" },
  meeting: { Icon: Users, label: "Ruang Bersama" },
  study: { Icon: BookOpen, label: "Ruang Belajar" },
  laptop: { Icon: Laptop, label: "Co-working" },
  garden: { Icon: Trees, label: "Taman" },
  rooftop: { Icon: Sun, label: "Rooftop" },
  gym: { Icon: Dumbbell, label: "Gym" },
  prayer: { Icon: MoonStar, label: "Musala" },
  package: { Icon: Package, label: "Terima Paket" },
  mailbox: { Icon: Mail, label: "Surat" },
  pets: { Icon: PawPrint, label: "Hewan" },
  nosmoking: { Icon: CigaretteOff, label: "Dilarang Merokok" },
  ban: { Icon: Ban, label: "Larangan" },
  accessible: { Icon: Accessibility, label: "Aksesibel" },
  briefcase: { Icon: Briefcase, label: "Pekerja" },

  home: { Icon: House, label: "Rumah" },
  building: { Icon: Building2, label: "Gedung" },
  heart: { Icon: Heart, label: "Nyaman" },
  verified: { Icon: BadgeCheck, label: "Terverifikasi" },
  bell: { Icon: Bell, label: "Layanan" },
  landmark: { Icon: Landmark, label: "Landmark" },

  shield: { Icon: ShieldCheck, label: "Keamanan", alias: true },
  sparkles: { Icon: Sparkles, label: "Kebersihan", alias: true },
  utensils: { Icon: UtensilsCrossed, label: "Dapur", alias: true },
};

// Dipakai komponen yang membaca key dari DB; key tak dikenal dibiarkan undefined agar pemanggil bisa fallback.
export const iconMap: Record<string, LucideIcon> = Object.fromEntries(
  Object.entries(ICONS).map(([key, { Icon }]) => [key, Icon])
);
export const highlightIconMap = iconMap;
export const facilityIconMap = iconMap;
