import type {
  Property,
  Highlight,
  GalleryPhoto,
  RoomType,
  Facility,
  Testimonial,
  FaqItem,
} from "./types";

/**
 * Mockup placeholder — diganti foto asli properti pada tahap berikutnya.
 * Seed dibuat deterministik per aset supaya gambar konsisten di setiap render.
 */
export function placeholderPhoto(
  seed: string,
  width = 1200,
  height = 800
): GalleryPhoto {
  return {
    id: seed,
    src: `https://picsum.photos/seed/${seed}/${width}/${height}`,
    alt: "Foto mockup — akan diganti foto asli properti",
    width,
    height,
  };
}

export const property: Property = {
  id: "kost-tiga-dara",
  name: "Kost Tiga Dara",
  tagline: "Hunian kelas atas untuk profesional muda & mahasiswa",
  city: "Jakarta Selatan",
  address: "Jl. Jenderal Sudirman No. 45, RT 03/RW 05",
  addressDetail: "Kel. Karet Semanggi, Kec. Setiabudi, Jakarta Selatan, DKI Jakarta 12930",
  directions:
    "Dari Halte Transjakarta Karet Sudirman, jalan kaki 5 menit ke arah gang Masjid Al-Ikhlas. Kost berada di sisi kanan jalan, gerbang hitam dengan plang emas.",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Jl.+Jenderal+Sudirman,+Jakarta+Selatan&output=embed",
  mapsUrl: "https://maps.google.com/?q=Jl.+Jenderal+Sudirman,+Jakarta+Selatan",
  whatsappNumber: "6281234567890",
  phoneDisplay: "0812-3456-7890",
};

export const highlights: Highlight[] = [
  { id: "wifi", label: "WiFi Fiber 100 Mbps", icon: "wifi" },
  { id: "security", label: "Keamanan 24 Jam & CCTV", icon: "shield" },
  { id: "parking", label: "Parkir Motor & Mobil Luas", icon: "car" },
  { id: "clean", label: "Housekeeping Mingguan", icon: "sparkles" },
  { id: "kitchen", label: "Dapur Bersama Lengkap", icon: "utensils" },
  { id: "access", label: "Akses 24 Jam", icon: "clock" },
];

export const galleryPhotos: GalleryPhoto[] = [
  placeholderPhoto("kostku-facade", 1600, 1067),
  placeholderPhoto("kostku-lobby", 1600, 1067),
  placeholderPhoto("kostku-room-a", 1600, 1067),
  placeholderPhoto("kostku-room-b", 1600, 1067),
  placeholderPhoto("kostku-kitchen", 1600, 1067),
  placeholderPhoto("kostku-livingroom", 1600, 1067),
  placeholderPhoto("kostku-corridor", 1600, 1067),
  placeholderPhoto("kostku-rooftop", 1600, 1067),
];

export const tourVideo = {
  // Placeholder mockup video — diganti video tur asli properti.
  poster: placeholderPhoto("kostku-video-poster", 1600, 900),
  src: "",
};

export const rooms: RoomType[] = [
  {
    id: "tipe-a-superior",
    name: "Tipe A — Superior",
    price: 2500000,
    photo: placeholderPhoto("kostku-room-superior", 1200, 900),
    size: "3 x 4 m",
    bed: "Kasur queen 160x200",
    specs: [
      "AC",
      "Kamar mandi dalam (water heater)",
      "Meja & kursi kerja",
      "Lemari pakaian 2 pintu",
      "Jendela besar",
    ],
    note: "Belum termasuk listrik (token) & air ±Rp150.000/bulan",
  },
  {
    id: "tipe-b-deluxe",
    name: "Tipe B — Deluxe",
    price: 1900000,
    photo: placeholderPhoto("kostku-room-deluxe", 1200, 900),
    size: "3 x 3 m",
    bed: "Kasur single 120x200",
    specs: [
      "AC",
      "Kamar mandi dalam",
      "Meja & kursi kerja",
      "Lemari pakaian",
    ],
    note: "Belum termasuk listrik (token) & air ±Rp120.000/bulan",
  },
  {
    id: "tipe-c-standard",
    name: "Tipe C — Standard",
    price: 1400000,
    photo: placeholderPhoto("kostku-room-standard", 1200, 900),
    size: "2.5 x 3 m",
    bed: "Kasur single 120x200",
    specs: ["Kipas angin", "Kamar mandi luar (bersama)", "Meja belajar", "Lemari pakaian"],
    note: "Belum termasuk listrik (token) ±Rp80.000/bulan",
  },
];

export const facilities: Facility[] = [
  {
    id: "dapur",
    name: "Dapur Bersama",
    description: "Dapur lengkap dengan kompor, kulkas, dan peralatan masak untuk seluruh penghuni.",
    icon: "kitchen",
    photo: placeholderPhoto("facility-kitchen", 1000, 750),
  },
  {
    id: "ruang-tamu",
    name: "Ruang Tamu & Bersantai",
    description: "Area santai ber-AC dengan sofa nyaman dan smart TV, cocok untuk menerima tamu.",
    icon: "sofa",
    photo: placeholderPhoto("facility-livingroom", 1000, 750),
  },
  {
    id: "laundry",
    name: "Laundry & Jemuran",
    description: "Mesin cuci otomatis dan area jemuran yang bersih serta selalu tersedia.",
    icon: "washer",
    photo: placeholderPhoto("facility-laundry", 1000, 750),
  },
  {
    id: "parkir",
    name: "Area Parkir Luas",
    description: "Parkir motor dan mobil yang aman dengan atap pelindung dari hujan dan panas.",
    icon: "parking",
    photo: placeholderPhoto("facility-parking", 1000, 750),
  },
  {
    id: "wifi",
    name: "WiFi Fiber Kencang",
    description: "Internet fiber 100 Mbps yang stabil di seluruh area, cocok untuk kerja dan kuliah online.",
    icon: "wifi",
    photo: placeholderPhoto("facility-wifi", 1000, 750),
  },
  {
    id: "keamanan",
    name: "Keamanan 24 Jam",
    description: "CCTV di titik strategis, akses kartu, dan penjaga kost yang siaga sepanjang hari.",
    icon: "security",
    photo: placeholderPhoto("facility-security", 1000, 750),
  },
  {
    id: "housekeeping",
    name: "Housekeeping Mingguan",
    description: "Layanan bersih-bersih area umum rutin setiap minggu tanpa biaya tambahan.",
    icon: "cleaning",
    photo: placeholderPhoto("facility-cleaning", 1000, 750),
  },
  {
    id: "musholla",
    name: "Musholla",
    description: "Ruang ibadah bersih dan nyaman yang tersedia untuk seluruh penghuni.",
    icon: "prayer",
    photo: placeholderPhoto("facility-musholla", 1000, 750),
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Dinda Ayu Lestari",
    initials: "DA",
    rating: 5,
    role: "Karyawan Swasta",
    quote:
      "Kostnya bersih banget dan keamanannya oke, jadi tenang tinggal sendiri di Jakarta. Wifi juga kencang buat kerja WFH.",
  },
  {
    id: "t2",
    name: "Muhammad Rizky",
    initials: "MR",
    rating: 5,
    role: "Mahasiswa",
    quote:
      "Lokasinya strategis, deket kampus dan banyak transportasi umum. Kamar mandi dalam bikin nyaman banget.",
  },
  {
    id: "t3",
    name: "Siti Nur Halimah",
    initials: "SN",
    rating: 4,
    role: "Freelancer",
    quote:
      "Fasilitas dapur bersama lengkap, jadi hemat karena bisa masak sendiri. Cuma parkir motor kadang penuh pas weekend.",
  },
  {
    id: "t4",
    name: "Andra Wijaya",
    initials: "AW",
    rating: 5,
    role: "Karyawan BUMN",
    quote:
      "Pemiliknya responsif dan ramah, kalau ada kerusakan cepat ditangani. Worth it banget untuk harga segini.",
  },
];

export const faqs: FaqItem[] = [
  {
    id: "f1",
    question: "Apakah boleh membawa tamu menginap?",
    answer:
      "Tamu boleh berkunjung hingga pukul 21.00 WIB. Untuk tamu menginap, wajib lapor ke pengelola kost maksimal 1x24 jam sebelumnya dan dikenakan biaya tambahan.",
  },
  {
    id: "f2",
    question: "Bagaimana aturan parkir kendaraan?",
    answer:
      "Setiap penghuni mendapat 1 slot parkir motor gratis. Untuk mobil tersedia area terbatas dengan biaya tambahan Rp150.000/bulan, silakan konfirmasi ketersediaan ke pengelola.",
  },
  {
    id: "f3",
    question: "Apakah ada jam malam (curfew)?",
    answer:
      "Tidak ada jam malam. Akses masuk-keluar kost 24 jam menggunakan kartu akses pribadi, namun harap menjaga ketenangan di atas pukul 22.00 WIB.",
  },
  {
    id: "f4",
    question: "Apa saja yang sudah termasuk dalam harga sewa?",
    answer:
      "Harga sewa sudah termasuk kebersihan area umum mingguan, WiFi, dan akses seluruh fasilitas bersama. Listrik kamar dan air dihitung terpisah sesuai pemakaian (lihat catatan di tiap tipe kamar).",
  },
  {
    id: "f5",
    question: "Berapa minimal masa sewa?",
    answer:
      "Minimal sewa adalah 1 bulan. Tersedia diskon khusus untuk kontrak 6 bulan dan 12 bulan — tanyakan promo terbaru saat menghubungi kami.",
  },
  {
    id: "f6",
    question: "Apakah khusus putra atau putri, atau campur?",
    answer:
      "Kost ini menerapkan sistem lantai terpisah: putra dan putri memiliki area kamar berbeda, namun berbagi fasilitas umum seperti dapur dan ruang tamu.",
  },
];
