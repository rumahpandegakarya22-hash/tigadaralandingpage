/* Teks statis landing (heading section, label tombol) yang bisa diedit dari
   Mini App lewat tabel `landing_copy`. DEFAULT_COPY = nilai bawaan + sumber
   kebenaran daftar key. data.ts menimpa default dg nilai dari DB. */

export type LandingCopy = Record<string, string>;

export const DEFAULT_COPY: LandingCopy = {
  // Hero
  hero_cta_primary: "Lihat Kamar & Harga",
  hero_cta_secondary: "Hubungi Kami",
  hero_desc: "{tagline}. Kost putri dekat UGM di {city}, Jogja, dengan fasilitas lengkap dan lokasi strategis — tanpa perlu survei langsung.",

  // Galeri
  gallery_eyebrow: "Galeri",
  gallery_title: "Foto & Video Suasana Kost",
  gallery_desc: "Lihat langsung kondisi setiap sudut properti — dari kamar, dapur, hingga ruang bersama.",
  gallery_video_title: "Video Tur Singkat",
  gallery_video_soon: "Mockup — video tur asli menyusul",

  // Foto Setiap Nomor Kamar
  kamar_photos_eyebrow: "Foto Kamar",
  kamar_photos_title: "Foto Setiap Nomor Kamar",
  kamar_photos_desc: "Lihat kondisi tiap kamar secara langsung sebelum memilih.",

  // Kamar & Harga
  rooms_eyebrow: "Kamar & Harga",
  rooms_title: "Kamar Kost Putri: Pilih Tipe Sesuai Kebutuhan",
  rooms_desc: "Semua harga transparan, sudah termasuk kebersihan area umum. Bandingkan spesifikasi tiap tipe sebelum menghubungi kami.",
  rooms_card_cta: "Tanya Kamar Ini",
  rooms_compare_bar_cta: "Bandingkan",
  rooms_compare_title: "Perbandingan Tipe Kamar",
  rooms_compare_min_hint: "pilih minimal 2 tipe kamar",
  rooms_per_month: "/bulan",
  rooms_compare_price: "Harga",
  rooms_compare_size: "Ukuran",
  rooms_compare_bed: "Kasur",
  rooms_compare_specs: "Spesifikasi",
  rooms_compare_note: "Catatan",

  // Cek Ketersediaan
  availability_eyebrow: "Cek Ketersediaan",
  availability_title: "Kamar Masih Tersedia?",
  availability_desc: "Masukkan rencana tanggal masuk dan tipe kamar untuk cek ketersediaan secara langsung dari data terkini.",
  availability_submit: "Cek Ketersediaan",
  availability_date_label: "Rencana Tanggal Masuk",
  availability_type_label: "Tipe Kamar",
  availability_loading: "Mengecek...",
  availability_available: "{n} kamar tersedia",
  availability_full: "Kamar penuh untuk tanggal ini",
  availability_available_detail: "{tipe} · {n} dari {total} unit kosong per {tanggal}",
  availability_full_detail: "Semua {total} unit {tipe} sudah terisi atau dipesan",
  availability_book_cta: "Pesan Sekarang via WA",
  availability_waitlist_cta: "Daftar Waiting List",

  // Fasilitas Umum
  facilities_eyebrow: "Fasilitas Umum",
  facilities_title: "Fasilitas Bersama untuk Semua Penghuni",
  facilities_desc: "Area umum yang lengkap dan terawat, bisa digunakan bebas oleh seluruh penghuni kost.",

  // Lokasi
  location_eyebrow: "Lokasi",
  location_title: "Lokasi Kost Putri Dekat UGM, Mudah Dijangkau",
  location_desc: "Cek jarak dan rute menuju kost sebelum berkunjung langsung.",
  location_address_label: "Alamat Lengkap",
  location_directions_label: "Petunjuk Arah",
  location_maps_cta: "Buka di Google Maps",
  location_copy_cta: "Salin alamat",
  location_copied: "Alamat disalin",

  // Testimoni
  testimonials_eyebrow: "Testimoni",
  testimonials_title: "Apa Kata Penghuni",
  testimonials_desc: "Pengalaman nyata dari mereka yang sudah tinggal di sini.",
  testimonials_empty: "Segera hadir.",

  // FAQ
  faq_eyebrow: "FAQ",
  faq_title: "FAQ Kost Putri: Pertanyaan yang Sering Diajukan",
  faq_desc: "Masih ragu? Cek dulu jawaban dari pertanyaan yang paling sering ditanyakan.",

  // Hubungi Kami (CTA)
  cta_eyebrow: "Hubungi Kami",
  cta_title: "Siap Menempati Kamar Impian Anda?",
  cta_desc: "Chat langsung via WhatsApp, atau tinggalkan nomor Anda agar kami yang menghubungi balik.",
  cta_whatsapp_title: "Chat via WhatsApp",
  cta_form_title: "Minta Dihubungi Balik",
  cta_whatsapp_desc: "Tanya ketersediaan kamar, jadwal survei, atau nego harga langsung dengan pemilik. Respon cepat setiap hari.",
  cta_whatsapp_button: "Chat Sekarang",
  cta_form_desc: "Tinggalkan nama dan nomor Anda, tim kami akan segera menghubungi.",
  form_name_label: "Nama",
  form_name_placeholder: "Nama lengkap Anda",
  form_phone_label: "Nomor HP / WhatsApp",
  form_phone_placeholder: "08123456789",
  form_submit: "Hubungi Saya",
  form_sending: "Mengirim...",
  form_error_name: "Nama minimal 2 karakter.",
  form_error_phone: "Masukkan nomor HP/WhatsApp yang valid, contoh 08123456789.",
  form_error_server: "Maaf, pesan belum terkirim. Coba lagi atau hubungi kami lewat WhatsApp.",
  form_type_label: "Tipe Kamar yang Diminati (opsional)",
  form_type_placeholder: "Belum tahu, pilih nanti",
  form_date_label: "Rencana Tanggal Masuk (opsional)",
  form_message_label: "Pesan (opsional)",
  form_message_placeholder: "Contoh: ingin survei hari Sabtu",
  form_success_title: "Terima kasih, {name}!",
  form_success_desc: "Pesan Anda sudah kami terima. Tim kami akan segera menghubungi Anda ke nomor {phone}.",

  // Pesan WhatsApp otomatis
  wa_message: "Halo, saya tertarik dengan {name}. Boleh minta info lebih lanjut?",
  wa_room_message: "Halo, saya tertarik dengan {room} di {name} ({price}/bulan). Apakah masih tersedia?",
  wa_book_message: "Halo, saya ingin memesan kamar {tipe} di {name}. Rencana masuk tanggal {tanggal}. Apakah bisa diproses?",
  wa_waitlist_message: "Halo, saya tertarik kamar {tipe} di {name} tapi sepertinya penuh. Apakah ada daftar tunggu?",

  // Menu atas & footer
  brand_name: "Kost Tiga Dara",
  nav_rooms: "Kamar & Harga",
  nav_availability: "Cek Ketersediaan",
  nav_facilities: "Fasilitas",
  nav_location: "Lokasi",
  nav_testimonials: "Testimoni",
  nav_faq: "FAQ",
  header_cta: "Hubungi Kami",
  header_cta_mobile: "Hubungi via WhatsApp",
  footer_nav_title: "Navigasi",
  footer_contact_title: "Kontak",
  contact_email: "halo@kosttigadara.id",
  footer_rights: "Semua hak dilindungi.",
  footer_credit: "Dibangun dengan ♥ untuk kenyamanan penghuni.",
};

/** Isi placeholder {kunci} pada teks copy, mis. fillCopy("Halo {name}", { name: "Dara" }). */
export function fillCopy(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

export type CopyField = { key: string; label: string; multiline?: boolean };
export type CopySection = { id: string; title: string; description?: string; fields: CopyField[] };

const heading = (prefix: string): CopyField[] => [
  { key: `${prefix}_eyebrow`, label: "Label kecil di atas judul" },
  { key: `${prefix}_title`, label: "Judul section" },
  { key: `${prefix}_desc`, label: "Deskripsi section", multiline: true },
];

/** Daftar field yang bisa diedit di /admin, dikelompokkan per section. Key harus ada di DEFAULT_COPY. */
export const COPY_SECTIONS: CopySection[] = [
  {
    id: "hero",
    title: "Hero (Header)",
    fields: [
      { key: "hero_desc", label: "Paragraf hero. Placeholder: {tagline} dan {city}", multiline: true },
      { key: "hero_cta_primary", label: "Tombol utama" },
      { key: "hero_cta_secondary", label: "Tombol WhatsApp" },
    ],
  },
  {
    id: "gallery",
    title: "Teks Galeri & Foto Kamar",
    fields: [
      ...heading("gallery"),
      { key: "gallery_video_title", label: "Judul video tur" },
      { key: "gallery_video_soon", label: "Teks saat video belum ada" },
      ...heading("kamar_photos"),
    ],
  },
  {
    id: "rooms",
    title: "Teks Kamar & Harga",
    fields: [
      ...heading("rooms"),
      { key: "rooms_per_month", label: "Satuan harga" },
      { key: "rooms_card_cta", label: "Tombol di kartu kamar" },
      { key: "rooms_compare_bar_cta", label: "Tombol Bandingkan" },
      { key: "rooms_compare_title", label: "Judul tabel perbandingan" },
      { key: "rooms_compare_min_hint", label: "Petunjuk minimal pilihan" },
      { key: "rooms_compare_price", label: "Baris: Harga" },
      { key: "rooms_compare_size", label: "Baris: Ukuran" },
      { key: "rooms_compare_bed", label: "Baris: Kasur" },
      { key: "rooms_compare_specs", label: "Baris: Spesifikasi" },
      { key: "rooms_compare_note", label: "Baris: Catatan" },
    ],
  },
  {
    id: "availability",
    title: "Cek Ketersediaan",
    description: "Placeholder dalam kurung kurawal diisi otomatis, mis. {n} jumlah kamar, {tipe} tipe kamar.",
    fields: [
      ...heading("availability"),
      { key: "availability_submit", label: "Tombol cek" },
      { key: "availability_date_label", label: "Label tanggal masuk" },
      { key: "availability_type_label", label: "Label tipe kamar" },
      { key: "availability_loading", label: "Teks saat mengecek" },
      { key: "availability_available", label: "Hasil: tersedia. Placeholder: {n}" },
      { key: "availability_available_detail", label: "Detail tersedia. Placeholder: {tipe} {n} {total} {tanggal}" },
      { key: "availability_full", label: "Hasil: penuh" },
      { key: "availability_full_detail", label: "Detail penuh. Placeholder: {total} {tipe}" },
      { key: "availability_book_cta", label: "Tombol pesan (kamar tersedia)" },
      { key: "availability_waitlist_cta", label: "Tombol waiting list (kamar penuh)" },
      { key: "wa_book_message", label: "Pesan WA pesan kamar. Placeholder: {tipe} {name} {tanggal}", multiline: true },
      { key: "wa_waitlist_message", label: "Pesan WA waiting list. Placeholder: {tipe} {name}", multiline: true },
    ],
  },
  { id: "facilities", title: "Teks Fasilitas", fields: heading("facilities") },
  {
    id: "location",
    title: "Lokasi",
    description: "Alamat, petunjuk arah, dan peta diedit di Info Properti.",
    fields: [
      ...heading("location"),
      { key: "location_address_label", label: "Judul kotak alamat" },
      { key: "location_directions_label", label: "Judul kotak petunjuk arah" },
      { key: "location_copy_cta", label: "Tombol salin alamat" },
      { key: "location_copied", label: "Teks setelah alamat disalin" },
      { key: "location_maps_cta", label: "Tombol Google Maps" },
    ],
  },
  {
    id: "testimonials",
    title: "Teks Testimoni",
    fields: [...heading("testimonials"), { key: "testimonials_empty", label: "Teks saat belum ada testimoni" }],
  },
  { id: "faq", title: "Teks FAQ", fields: heading("faq") },
  {
    id: "contact",
    title: "Kontak",
    description: "Nomor WhatsApp, telepon, dan alamat diedit di Info Properti. Email dan teks kontak diedit di sini.",
    fields: [
      ...heading("cta"),
      { key: "contact_email", label: "Email kontak (tampil di footer)" },
      { key: "cta_whatsapp_title", label: "Kotak WhatsApp: judul" },
      { key: "cta_whatsapp_desc", label: "Kotak WhatsApp: deskripsi", multiline: true },
      { key: "cta_whatsapp_button", label: "Kotak WhatsApp: tombol" },
      { key: "cta_form_title", label: "Formulir: judul" },
      { key: "cta_form_desc", label: "Formulir: deskripsi", multiline: true },
      { key: "form_name_label", label: "Formulir: label nama" },
      { key: "form_name_placeholder", label: "Formulir: contoh isi nama" },
      { key: "form_phone_label", label: "Formulir: label nomor HP" },
      { key: "form_phone_placeholder", label: "Formulir: contoh isi nomor HP" },
      { key: "form_submit", label: "Formulir: tombol kirim" },
      { key: "form_sending", label: "Formulir: teks saat mengirim" },
      { key: "form_error_name", label: "Formulir: error nama" },
      { key: "form_error_phone", label: "Formulir: error nomor HP" },
      { key: "form_error_server", label: "Formulir: error gagal kirim" },
      { key: "form_type_label", label: "Formulir: label tipe kamar" },
      { key: "form_type_placeholder", label: "Formulir: pilihan tipe kamar kosong" },
      { key: "form_date_label", label: "Formulir: label tanggal masuk" },
      { key: "form_message_label", label: "Formulir: label pesan" },
      { key: "form_message_placeholder", label: "Formulir: contoh isi pesan" },
      { key: "form_success_title", label: "Formulir sukses: judul. Placeholder: {name}" },
      { key: "form_success_desc", label: "Formulir sukses: deskripsi. Placeholder: {phone}", multiline: true },
      { key: "wa_message", label: "Pesan WA umum. Placeholder: {name}", multiline: true },
      { key: "wa_room_message", label: "Pesan WA per kamar. Placeholder: {room} {name} {price}", multiline: true },
    ],
  },
  {
    id: "navigation",
    title: "Menu & Footer",
    fields: [
      { key: "brand_name", label: "Nama brand (logo di menu & footer)" },
      { key: "nav_rooms", label: "Menu: Kamar & Harga" },
      { key: "nav_availability", label: "Menu: Cek Ketersediaan" },
      { key: "nav_facilities", label: "Menu: Fasilitas" },
      { key: "nav_location", label: "Menu: Lokasi" },
      { key: "nav_testimonials", label: "Menu: Testimoni" },
      { key: "nav_faq", label: "Menu: FAQ" },
      { key: "header_cta", label: "Tombol WhatsApp di menu" },
      { key: "header_cta_mobile", label: "Tombol WhatsApp di menu HP" },
      { key: "footer_nav_title", label: "Footer: judul navigasi" },
      { key: "footer_contact_title", label: "Footer: judul kontak" },
      { key: "footer_rights", label: "Footer: hak cipta" },
      { key: "footer_credit", label: "Footer: kredit" },
    ],
  },
];

/** Gabung default + override DB. Nilai kosong di DB dianggap "pakai default". */
export function mergeCopy(rows: { key: string; value: string }[]): LandingCopy {
  const out: LandingCopy = { ...DEFAULT_COPY };
  for (const r of rows) {
    if (r.value != null && r.value.trim() !== "") out[r.key] = r.value;
  }
  return out;
}
