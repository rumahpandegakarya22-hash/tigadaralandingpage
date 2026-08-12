/* Teks statis landing (heading section, label tombol) yang bisa diedit dari
   Mini App lewat tabel `landing_copy`. DEFAULT_COPY = nilai bawaan + sumber
   kebenaran daftar key. data.ts menimpa default dg nilai dari DB. */

export type LandingCopy = Record<string, string>;

export const DEFAULT_COPY: LandingCopy = {
  // Hero
  hero_cta_primary: "Lihat Kamar & Harga",
  hero_cta_secondary: "Hubungi Kami",

  // Galeri
  gallery_eyebrow: "Galeri",
  gallery_title: "Foto & Video Suasana Kost",
  gallery_desc: "Lihat langsung kondisi setiap sudut properti — dari kamar, dapur, hingga ruang bersama.",
  gallery_video_title: "Video Tur Singkat",

  // Kamar & Harga
  rooms_eyebrow: "Kamar & Harga",
  rooms_title: "Pilih Tipe Kamar Sesuai Kebutuhan",
  rooms_desc: "Semua harga transparan, sudah termasuk kebersihan area umum. Bandingkan spesifikasi tiap tipe sebelum menghubungi kami.",
  rooms_card_cta: "Tanya Kamar Ini",

  // Cek Ketersediaan
  availability_eyebrow: "Cek Ketersediaan",
  availability_title: "Kamar Masih Tersedia?",
  availability_desc: "Masukkan rencana tanggal masuk dan tipe kamar untuk cek ketersediaan secara langsung dari data terkini.",
  availability_submit: "Cek Ketersediaan",

  // Fasilitas Umum
  facilities_eyebrow: "Fasilitas Umum",
  facilities_title: "Fasilitas Bersama untuk Semua Penghuni",
  facilities_desc: "Area umum yang lengkap dan terawat, bisa digunakan bebas oleh seluruh penghuni kost.",

  // Lokasi
  location_eyebrow: "Lokasi",
  location_title: "Mudah Dijangkau, Strategis untuk Aktivitas Harian",
  location_desc: "Cek jarak dan rute menuju kost sebelum berkunjung langsung.",
  location_address_label: "Alamat Lengkap",
  location_directions_label: "Petunjuk Arah",

  // Testimoni
  testimonials_eyebrow: "Testimoni",
  testimonials_title: "Apa Kata Penghuni",
  testimonials_desc: "Pengalaman nyata dari mereka yang sudah tinggal di sini.",

  // FAQ
  faq_eyebrow: "FAQ",
  faq_title: "Pertanyaan yang Sering Diajukan",
  faq_desc: "Masih ragu? Cek dulu jawaban dari pertanyaan yang paling sering ditanyakan.",

  // Hubungi Kami (CTA)
  cta_eyebrow: "Hubungi Kami",
  cta_title: "Siap Menempati Kamar Impian Anda?",
  cta_desc: "Chat langsung via WhatsApp, atau tinggalkan nomor Anda agar kami yang menghubungi balik.",
  cta_whatsapp_title: "Chat via WhatsApp",
  cta_form_title: "Minta Dihubungi Balik",
};

/** Gabung default + override DB. Nilai kosong di DB dianggap "pakai default". */
export function mergeCopy(rows: { key: string; value: string }[]): LandingCopy {
  const out: LandingCopy = { ...DEFAULT_COPY };
  for (const r of rows) {
    if (r.value != null && r.value.trim() !== "") out[r.key] = r.value;
  }
  return out;
}
