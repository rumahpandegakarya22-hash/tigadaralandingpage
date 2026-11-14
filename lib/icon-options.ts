// Daftar key ikon valid, dipisah dari file "use server" karena file itu cuma boleh export async function.
// Gambar & labelnya ada di components/site/icon-map.tsx (Record<IconKey, ...> memaksa keduanya sinkron).
export const iconKeys = [
  // Konektivitas & utilitas
  "wifi", "electricity", "plug", "tv", "phone", "water", "heater",
  // Kamar
  "bed", "wardrobe", "desk", "chair", "window", "curtain", "lamp", "ac", "fan", "shower", "bath", "toilet",
  // Dapur & makan
  "kitchen", "stove", "fridge", "microwave", "dispenser", "coffee", "food",
  // Cuci & kebersihan
  "washer", "laundry", "jemuran", "cleaning", "broom", "trash",
  // Keamanan
  "security", "cctv", "lock", "key", "card", "guard", "fire",
  // Akses & lokasi
  "clock", "parking", "motor", "car", "bus", "location", "walk", "campus", "hospital", "shop", "store",
  // Area bersama & aturan
  "sofa", "meeting", "study", "laptop", "garden", "rooftop", "gym", "prayer", "package", "mailbox",
  "pets", "nosmoking", "ban", "accessible", "briefcase",
  // Umum
  "home", "building", "heart", "verified", "bell", "landmark",
  // Key lama di DB (alias, disembunyikan dari pemilih)
  "shield", "sparkles", "utensils",
] as const;

export type IconKey = (typeof iconKeys)[number];

export const highlightIconOptions = iconKeys;
export const facilityIconOptions = iconKeys;
