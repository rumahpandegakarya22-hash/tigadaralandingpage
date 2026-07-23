---
version: alpha
name: Custom-Warm-Editorial-Design-System
description: A warm, editorial consumer marketplace anchored on a cream canvas (#F8F6F2) and a single accent — a saturated brick red (#C92D31, nicknamed "Ember" in this doc) — that carries every primary CTA, the search-button orb, and rating dots. Type splits across two families — Lora for every non-body moment (display, titles, buttons, nav, badges) and Poppins for all reading text (body, captions, inline links). Layout structure, component shapes, spacing, and elevation are unchanged from the source Airbnb-based reference; only color and typography were retheme'd. Pill-shaped search bars (`{rounded.full}`), softly rounded property cards (`{rounded.lg}` ~14px), and 32px button radii read as friendly and human — there is no hard corner anywhere except the body grid.

colors:
  # ── Primer / 60% — as given ──
  canvas: "#F8F6F2"
  surface-soft: "#E8DFD5"
  surface-card: "#F8F6F2"
  surface-strong: "#E8DFD5"
  ink: "#3A3635"
  body: "#3A3635"

  # ── Sekunder / 30% — as given ──
  hairline: "#F2D5CF"
  border-strong: "#8E8B87"

  # ── Tersier / Aksen / 10% — as given ──
  primary: "#C92D31"
  primary-soft: "#CF7B72"

  # ── Derived — disabled / inactive / interactive-state hierarchy (my design decision; see notes below) ──
  muted: "#908C8A"
  muted-soft: "#BFBCB9"
  hairline-soft: "#E8E6E2"
  primary-active: "#A52528"
  primary-disabled: "#ECC4C2"
  primary-error-text: "#A8451E"
  primary-error-text-hover: "#8F3B1A"
  on-primary: "#F8F6F2"
  on-dark: "#F8F6F2"
  legal-link: "#3A3635"
  star-rating: "#3A3635"
  scrim: "#3A3635"

typography:
  display-xl:
    fontFamily: "'Lora', Georgia, 'Times New Roman', serif"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.43
    letterSpacing: 0
  display-lg:
    fontFamily: "'Lora', Georgia, 'Times New Roman', serif"
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: -0.44px
  display-md:
    fontFamily: "'Lora', Georgia, 'Times New Roman', serif"
    fontSize: 21px
    fontWeight: 700
    lineHeight: 1.43
    letterSpacing: 0
  display-sm:
    fontFamily: "'Lora', Georgia, 'Times New Roman', serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.20
    letterSpacing: -0.18px
  title-md:
    fontFamily: "'Lora', Georgia, 'Times New Roman', serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0
  title-sm:
    fontFamily: "'Lora', Georgia, 'Times New Roman', serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: 0
  rating-display:
    fontFamily: "'Lora', Georgia, 'Times New Roman', serif"
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -1px
  body-md:
    fontFamily: "'Poppins', -apple-system, system-ui, 'Helvetica Neue', Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: "'Poppins', -apple-system, system-ui, 'Helvetica Neue', Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: 0
  caption:
    fontFamily: "'Poppins', -apple-system, system-ui, 'Helvetica Neue', Arial, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.29
    letterSpacing: 0
  caption-sm:
    fontFamily: "'Poppins', -apple-system, system-ui, 'Helvetica Neue', Arial, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.23
    letterSpacing: 0
  badge:
    fontFamily: "'Lora', Georgia, 'Times New Roman', serif"
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: 0
  micro-label:
    fontFamily: "'Lora', Georgia, 'Times New Roman', serif"
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.33
    letterSpacing: 0
  uppercase-tag:
    fontFamily: "'Lora', Georgia, 'Times New Roman', serif"
    fontSize: 8px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: 0.32px
    textTransform: uppercase
  button-md:
    fontFamily: "'Lora', Georgia, 'Times New Roman', serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: 0
  button-sm:
    fontFamily: "'Lora', Georgia, 'Times New Roman', serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.29
    letterSpacing: 0
  link:
    fontFamily: "'Poppins', -apple-system, system-ui, 'Helvetica Neue', Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: 0
  nav-link:
    fontFamily: "'Lora', Georgia, 'Times New Roman', serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0

rounded:
  none: 0px
  xs: 4px
  sm: 8px
  md: 14px
  lg: 20px
  xl: 32px
  full: 9999px

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  base: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 64px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.sm}"
    padding: 14px 24px
    height: 48px
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
  button-primary-disabled:
    backgroundColor: "{colors.primary-disabled}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.sm}"
    padding: 13px 23px
    height: 48px
  button-tertiary-text:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
  button-pill-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-sm}"
    rounded: "{rounded.full}"
    padding: 10px 20px
  search-orb:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    height: 48px
  icon-button-circle:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    height: 32px
  icon-button-outline:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    height: 40px
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 80px
  product-tab-active:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    rounded: "{rounded.none}"
  product-tab-inactive:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    typography: "{typography.nav-link}"
  search-bar-pill:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: 14px 24px
    height: 64px
  search-field-segment:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    padding: 8px 24px
  category-strip:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.muted}"
    typography: "{typography.button-sm}"
  category-tab-active:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button-sm}"
    rounded: "{rounded.none}"
  property-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
  property-card-photo:
    rounded: "{rounded.md}"
  experience-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.md}"
  city-link-block:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.title-sm}"
  rating-display-card:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.rating-display}"
  guest-favorite-badge:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.badge}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  new-tag:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.uppercase-tag}"
    rounded: "{rounded.full}"
    padding: 2px 6px
  amenity-row:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    padding: 12px 0
  reviews-card:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
  host-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 24px
  reservation-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 24px
  date-picker-day:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
  date-picker-day-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.full}"
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 14px 12px
    height: 56px
  footer-light:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    padding: 48px 80px
  footer-link:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
  legal-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.muted}"
    typography: "{typography.caption-sm}"
---

## Catatan Modifikasi (baca dulu sebelum pakai)

File ini adalah hasil **retheme** dari `DESIGN-airbnb.md` — struktur layout, komponen, spacing, radius, dan elevation **tidak diubah** (kamu cuma minta warna dan font). Yang diganti: seluruh token `colors` dan `fontFamily` di `typography`, plus semua penyebutan warna/font literal di teks penjelasan.

**Yang saya ambil langsung dari brief kamu** (tidak saya modifikasi):
- `canvas` #F8F6F2, `surface-soft` #E8DFD5, `ink`/`body` #3A3635
- `hairline` #F2D5CF, `border-strong` #8E8B87
- `primary` #C92D31, `primary-soft` #CF7B72
- Font: Lora → semua token non-body (display, title, button, nav, badge, rating). Poppins → semua token body (body-md/sm, caption, caption-sm, link). Pembagian ini keputusan desain saya berdasarkan konvensi umum "non-body = heading-like", bukan sesuatu yang kamu spesifikkan token-per-token — kalau kamu maunya beda (misal caption pakai Lora juga), gampang diubah.

**Yang saya turunkan sendiri (disabled/inactive + state interaktif), sesuai instruksi kamu:**

| Token | Hex | Cara dapatnya |
|---|---|---|
| `muted` | `#908C8A` | ink 55% campur canvas 45% — teks sekunder (sub-label, tab nonaktif) |
| `muted-soft` | `#BFBCB9` | ink 30% campur canvas 70% — teks tersier (placeholder, link disabled) |
| `hairline-soft` | `#E8E6E2` | border-strong 15% campur canvas 85% — divider paling halus |
| `primary-active` | `#A52528` | primary digelapkan ~18% — state ditekan/hover |
| `primary-disabled` | `#ECC4C2` | primary 25% campur canvas 75% — fill CTA disabled |
| `primary-error-text` | `#A8451E` | warna rust terpisah dari primary, supaya teks error nggak ketuker sama warna CTA/brand |
| `primary-error-text-hover` | `#8F3B1A` | error text digelapkan ~15% |
| `on-primary` / `on-dark` | `#F8F6F2` | canvas dipakai lagi sebagai "hampir putih" untuk teks di atas fill gelap |
| `legal-link` | `#3A3635` | awalnya biru (#428bff) di file asli — saya lepas karena biru nggak ada di palet kamu; link legal sekarang pakai warna ink + underline, bukan warna terpisah |
| `star-rating` | `#3A3635` | tetap ink, sama seperti file asli (logikanya: bintang rating jangan kuning/emas, biar nggak kesan murahan) |
| `scrim` | `#3A3635` | awalnya hitam murni; saya pakai ink di 50% opacity biar overlay modal nggak terasa dingin, konsisten sama palet hangat |

**Token yang saya hapus:** `luxe` (#460479) dan `plus` (#92174d) — dua warna sub-brand khas Airbnb itu nggak punya padanan di palet kamu, dan kalau saya karang warna ungu/magenta baru, itu bukan bagian dari brief kamu. Kalau nanti butuh varian aksen kedua, pakai `primary-soft` (#CF7B72) dulu — itu sudah berfungsi sebagai aksen sekunder yang lebih lembut.

**Satu hal yang perlu kamu cek sendiri:** kombinasi teks putih/`on-primary` (#F8F6F2) di atas `primary-disabled` (#ECC4C2) kontrasnya rendah — ini saya pertahankan sama persis seperti perilaku file asli (Airbnb juga sengaja bikin kontras rendah di state disabled, sebagai sinyal visual "nggak bisa diklik"). Tapi kalau ini untuk produk yang perlu lolos audit aksesibilitas, worth di-double check — saya nggak menjalankan contrast checker beneran di sini, cuma mengikuti pola desain aslinya.

---

## Overview

Sistem ini berbasis kanvas krem (`{colors.canvas}` — #F8F6F2) dengan teks ink hampir-hitam (`{colors.ink}` — #3A3635) untuk semua judul dan body, dan satu aksen — brick red yang di sini saya sebut **"Ember"** (`{colors.primary}` — #C92D31, nama ini cuma nickname yang saya buat untuk memudahkan referensi di dokumen, bukan nama resmi apa pun) — yang membawa setiap CTA utama, orb tombol pencarian, dan state "disimpan" pada hati favorit. Tidak ada warna brand sekunder di alur utama; kalau butuh aksen kedua, `{colors.primary-soft}` (#CF7B72) tersedia sebagai varian yang lebih lembut.

Tipografi terbagi dua: **Lora** menjalankan semua momen non-body — display, judul kartu, tombol, navigasi, badge, dan angka rating raksasa di halaman listing. **Poppins** menjalankan semua teks bacaan — body copy, caption, meta kartu, dan link inline. Pembagian dua-font ini menggantikan sistem font tunggal (Lora VF) di file asli.

Bentuk (shape language) **tidak berubah** dari file asli — tombol tetap 8px radius (`{rounded.sm}`), kartu properti tetap ~14px (`{rounded.md}`), search bar tetap pill penuh (`{rounded.full}`), dan hati/orb tetap lingkaran. Tidak ada sudut tajam di mana pun kecuali grid halaman itu sendiri.

**Key Characteristics (setelah retheme):**
- Aksen tunggal: `{colors.primary}` (#C92D31 — "Ember") membawa setiap CTA utama, orb pencarian, state hati tersimpan, dan wordmark brand. Dipakai secukupnya — kebanyakan halaman 90% krem + ink dengan satu-dua momen Ember.
- Dua keluarga font: `Lora` (non-body) di weight 500–700, `Poppins` (body) di weight 400–500. Bobot tetap moderat — sistem masih mengandalkan fotografi untuk beban visual, bukan tipografi tebal.
- Nav produk tiga-tab (Homes / Experiences / Services) — tidak berubah dari struktur asli, cuma warnanya ikut palet baru.
- Search bar pill global: permukaan krem, radius penuh (`{rounded.full}`), dipisah hairline 1px (#F2D5CF) jadi segmen Where / When / Who, diakhiri orb Ember bundar (`{component.search-orb}`).
- Kartu listing tetap foto-dulu: rasio-aspek dengan potongan sudut `{rounded.md}`, badge "Guest favorite" mengambang, ikon hati di kanan atas (outline default, terisi Ember saat disimpan).
- Elevation tetap satu tingkat shadow (lihat bagian Elevation) — sekarang dengan warna shadow yang dihangatkan memakai `{colors.ink}` alih-alih hitam murni.
- Sistem spacing 8px basis tidak berubah, termasuk `{spacing.section}` (64px) untuk section utama.

## Colors

### Brand & Accent
- **Ember** (`{colors.primary}` — #C92D31): Warna brand tunggal. Dipakai untuk background CTA utama (Reserve, Continue), orb pencarian, state hati tersimpan di kartu properti, dan link brand inline.
- **Ember Active** (`{colors.primary-active}` — #A52528): Varian tekan/pointer-down — digelapkan ~18% dari primary. Dipakai di `{component.button-primary-active}`.
- **Ember Disabled** (`{colors.primary-disabled}` — #ECC4C2): Tint pucat dipakai di CTA disabled.
- **Ember Soft** (`{colors.primary-soft}` — #CF7B72): Aksen sekunder — dari brief kamu, dicadangkan untuk CTA alternatif atau highlight yang butuh warna lebih lembut dari Ember penuh.

### Surface
- **Canvas** (`{colors.canvas}` — #F8F6F2): Lantai halaman default untuk seluruh halaman publik.
- **Surface Soft** (`{colors.surface-soft}` — #E8DFD5): Fill sedikit lebih gelap — dipakai di field disabled, background hover sub-nav, dan filter band pencarian.
- **Surface Strong** (`{colors.surface-strong}` — #E8DFD5): Sama dengan surface-soft di palet ini (di file asli dua nilai ini beda tipis) — dipakai untuk permukaan icon-button bundar.

### Hairlines & Borders
- **Hairline** (`{colors.hairline}` — #F2D5CF): Warna border 1px default — divider search bar, pemisah tabel, pemisah kolom footer, border 1px kartu. Warna rose lembut ini sengaja dipertahankan sesuai brief kamu meski agak "berani" untuk peran divider — memberi sentuhan hangat yang khas.
- **Hairline Soft** (`{colors.hairline-soft}` — #E8E6E2): Divider paling halus, dipakai di pemisah body editorial yang panjang scroll-nya. *(Diturunkan — lihat catatan di atas.)*
- **Border Strong** (`{colors.border-strong}` — #8E8B87): Stroke lebih tebal, dipakai di tombol outline disabled dan outline form input setelah fokus.

### Text
- **Ink** (`{colors.ink}` — #3A3635): Warna teks dominan di semua permukaan terang. Sesuai brief kamu, satu warna ini dipakai untuk seluruh teks (display, body, nav, link) — tidak ada tingkatan gelap-terang terpisah seperti file asli (yang punya `ink` dan `body` beda tipis).
- **Body** (`{colors.body}` — #3A3635): Alias dari ink — brief kamu minta satu warna teks untuk semuanya.
- **Muted** (`{colors.muted}` — #908C8A): Sub-judul di blok tautan kota, label tab produk nonaktif, sub-label kategori footer, link "View all". *(Diturunkan.)*
- **Muted Soft** (`{colors.muted-soft}` — #BFBCB9): Teks link disabled. Dipakai sangat jarang. *(Diturunkan.)*
- **Star Rating** (`{colors.star-rating}` — #3A3635): Token ink yang sama — ikon bintang dan angka rating tetap render di ink, bukan kuning/emas (pilihan desain yang dipertahankan dari file asli).
- **On Primary** (`{colors.on-primary}` — #F8F6F2): Teks krem-hampir-putih di atas fill Ember.

### Semantic
- **Error** (`{colors.primary-error-text}` — #A8451E): Teks error inline untuk validasi form. Sengaja dibuat beda hue dari Ember (lebih ke arah rust/oranye) supaya teks error nggak ketuker secara visual dengan warna CTA/brand. *(Diturunkan.)*
- **Error Hover** (`{colors.primary-error-text-hover}` — #8F3B1A): Menggelap saat link di-hover. *(Diturunkan.)*
- **Legal Link** (`{colors.legal-link}` — #3A3635): File asli pakai biru (#428bff); di sini saya lepas karena biru bukan bagian dari palet kamu — link legal sekarang render pakai ink + underline, sama seperti pola `{component.footer-link}` dan `{component.button-tertiary-text}`.

### Scrim
- **Scrim** (`{colors.scrim}` — #3A3635 pada 50% opacity): Nada backdrop modal global — date picker, dialog login, pemilih bahasa. File asli pakai hitam murni; di sini saya pakai ink supaya overlay-nya terasa hangat, konsisten dengan palet krem-terracotta. Disimpan sebagai hex dasar; opacity diterapkan saat render.

## Typography

### Font Family
Sistem ini menjalankan **dua keluarga font** dengan pembagian tugas yang jelas:

- **Lora** — semua momen non-body: display headline, judul kartu/section, label tombol, label nav, badge, dan angka rating raksasa. Fallback: `Georgia, 'Times New Roman', serif`.
- **Poppins** — semua teks bacaan: body copy, caption, baris meta kartu, dan link inline. Fallback: `-apple-system, system-ui, 'Helvetica Neue', Arial, sans-serif`.

Keduanya adalah Google Fonts open-source, jadi tidak butuh rencana substitusi berbayar seperti pasangan Lora VF/Circular di file asli — fallback di atas murni jaga-jaga kalau font gagal dimuat, bukan pengganti karena lisensi.

### Hierarchy

| Token | Font | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|---|
| `{typography.rating-display}` | Lora | 64px | 700 | 1.1 | -1px | Angka rating listing detail ("4.81") |
| `{typography.display-xl}` | Lora | 28px | 700 | 1.43 | 0 | H1 homepage |
| `{typography.display-lg}` | Lora | 22px | 500 | 1.18 | -0.44px | H1 listing detail |
| `{typography.display-md}` | Lora | 21px | 700 | 1.43 | 0 | Judul section di listing detail |
| `{typography.display-sm}` | Lora | 20px | 600 | 1.20 | -0.18px | Judul sub-section |
| `{typography.title-md}` | Lora | 16px | 600 | 1.25 | 0 | Judul blok tautan kota |
| `{typography.title-sm}` | Lora | 16px | 500 | 1.25 | 0 | Judul kolom footer |
| `{typography.body-md}` | Poppins | 16px | 400 | 1.5 | 0 | Body copy default di listing |
| `{typography.body-sm}` | Poppins | 14px | 400 | 1.43 | 0 | Baris meta kartu, tanggal, harga |
| `{typography.caption}` | Poppins | 14px | 500 | 1.29 | 0 | Label segmen search field |
| `{typography.caption-sm}` | Poppins | 13px | 400 | 1.23 | 0 | Baris legal footer |
| `{typography.badge}` | Lora | 11px | 600 | 1.18 | 0 | Teks badge "Guest favorite" |
| `{typography.micro-label}` | Lora | 12px | 700 | 1.33 | 0 | Micro-label amenity kartu |
| `{typography.uppercase-tag}` | Lora | 8px | 700 | 1.25 | 0.32px (uppercase) | Badge "NEW" |
| `{typography.button-md}` | Lora | 16px | 500 | 1.25 | 0 | Label tombol CTA utama |
| `{typography.button-sm}` | Lora | 14px | 500 | 1.29 | 0 | Label tombol pill |
| `{typography.link}` | Poppins | 14px | 400 | 1.43 | 0 | Link inline di body |
| `{typography.nav-link}` | Lora | 16px | 600 | 1.25 | 0 | Label nav produk |

### Principles
Bobot display tetap moderat (nggak diubah dari file asli) — h1 homepage di 28px/700 tetap sengaja kecil, tucking di bawah search bar supaya fotografi dan grid kota yang bawa hierarki visual. **rating-display** (64px/700) tetap satu-satunya momen tipografi paling keras di seluruh sistem.

### Catatan Pemilihan Font
Lora adalah serif dengan letterform hangat dan sedikit editorial — cocok untuk kesan human/trustworthy di ukuran display tanpa terasa berat seperti slab serif. Poppins adalah sans geometris dengan x-height besar, menjaga keterbacaan di ukuran body kecil (13–14px) di atas background krem. Karena Lora secara proporsi lebih lebar dari Lora VF (font variable custom di file asli), headline display kemungkinan wrap satu kata lebih awal di lebar piksel yang sama — worth dicek langsung di h1 homepage dan h1 listing detail begitu konten asli sudah ada. *(Ini observasi desain, bukan hasil pengukuran — sebaiknya di-eyeball ulang begitu produksi.)*

## Layout

### Spacing System
Tidak diubah dari file asli.
- **Base unit:** 4px (dengan micro-step 2px).
- **Tokens:** `{spacing.xxs}` 2px · `{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.md}` 12px · `{spacing.base}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 64px.
- **Section padding (vertical):** `{spacing.section}` (64px) untuk band halaman utama.
- **Card internal padding:** `{spacing.lg}` (24px) untuk `{component.host-card}` dan `{component.reservation-card}`; `{spacing.base}` (16px) untuk blok meta property-card; `{spacing.sm}` (8px) untuk gutter caption/date-row.
- **Gutters:** `{spacing.base}` (16px) antar kartu di grid kota homepage; `{spacing.lg}` (24px) di dalam gutter kolom footer; `{spacing.xs}` (4px) di divider category-strip.

### Grid & Container
Tidak diubah dari file asli.
- **Max content width:** ~1280px di homepage dan halaman editorial. Listing detail lebih sempit, ~1080px.
- **City link grid (footer homepage):** grid 6-kolom di desktop.
- **Listing detail:** 2-kolom, foto/amenity di kiri (~64%), reservation card sticky di kanan (~32%).
- **Footer:** daftar link 3-kolom di desktop, jadi 1-kolom di mobile.

### Whitespace Philosophy
Tidak diubah — band editorial tetap 64px vertikal, grid kartu tetap rapat 16px. Kontras ini disengaja: halaman terasa "hero terbuka, marketplace padat di bawah."

## Elevation

Tetap **satu tingkat shadow** plus baseline flat, sama seperti file asli — hanya warnanya dihangatkan dari hitam murni ke `{colors.ink}`.

- **Flat (no shadow):** Body, hero, footer, semua band editorial — 95% permukaan.
- **Card hover float:** `box-shadow: rgba(58, 54, 53, 0.02) 0 0 0 1px, rgba(58, 54, 53, 0.04) 0 2px 6px 0, rgba(58, 54, 53, 0.1) 0 4px 8px 0` — dipakai di kartu properti saat hover, search bar saat rest, dan dropdown menu. *(Nilai rgba diturunkan dari `{colors.ink}` #3A3635 = rgb(58,54,53) menggantikan rgb(0,0,0) di file asli — perubahan kosmetik kecil biar shadow ikut nada hangat.)*
- **Modal scrim:** `{colors.scrim}` di-render pada 50% opacity — backdrop modal global.

## Components

Struktur, ukuran, dan padding komponen **tidak diubah** dari file asli — hanya deskripsi warna yang di-update.

### Buttons

**`button-primary`** — Fill Ember, teks krem (`{colors.on-primary}`), radius 8px, padding 14×24px, tinggi 48px, weight 500. CTA paling umum di sistem: "Reserve", "Continue", "Search", primary alur akun.

**`button-primary-active`** — State ditekan. Background berpindah ke `{colors.primary-active}`. Tanpa transform, tanpa perubahan shadow.

**`button-primary-disabled`** — Tint Ember pucat di `{colors.primary-disabled}` (#ECC4C2) dengan teks krem. Cursor not-allowed. *(Kontras rendah di sini disengaja — sama seperti file asli, jadi sinyal visual "tidak bisa diklik".)*

**`button-secondary`** — Fill canvas dengan teks ink dan outline ink 1px. Radius 8px. Dipakai untuk "Save", "Cancel", dan CTA inverse di atas permukaan Ember.

**`button-tertiary-text`** — Teks ink polos, tanpa permukaan, tanpa border. Underline saat hover. Dipakai untuk link "Show more" dan label close modal.

**`button-pill-primary`** — CTA Ember berbentuk pill di sel unggulan (mis. sub-CTA "Become a host") — radius 9999px, padding 10×20px, label 14px. *(Nama token diganti dari `button-pill-rausch` — karena nama lama merujuk warna brand Airbnb yang sudah tidak relevan di palet ini.)*

### Search Surface

**`search-bar-pill`** — Search bar global. Fill canvas, radius penuh, tinggi 64px, border hairline 1px + shadow tier 1px. Dibagi vertikal dengan hairline (`{colors.hairline}`) jadi sel `{component.search-field-segment}` (Where / When / Who).

**`search-orb`** — Orb Ember bundar di ujung kanan search bar. 48×48px, radius penuh, ikon kaca pembesar krem di tengah. Momen warna paling "panas" di homepage.

### Top Navigation

**`top-nav`** — Permukaan canvas, tinggi 80px, hairline bawah 1px. Struktur nav (wordmark, tiga tab produk, utilitas akun) tidak berubah dari file asli.

**`product-tab-active`** — Label ink di `{typography.nav-link}`, ikon 32px, garis underline ink 2px di bawah pasangan ikon-label.

**`product-tab-inactive`** — Label muted, ikon, tanpa underline.

**`new-tag`** — Badge pill kecil (`{rounded.full}`) di pojok kanan-atas ikon, label uppercase "NEW" di `{typography.uppercase-tag}` (8px/700, Lora, tracking 0.32px, uppercase).

### Listing Cards

**`property-card`** — Kartu foto-dulu. Gambar rasio 1:1 dengan potongan sudut `{rounded.md}`, overlay dot carousel, badge "Guest favorite" mengambang kiri-atas, ikon hati kanan-atas (outline default, fill Ember saat disimpan). Di bawah gambar: judul (`{typography.title-md}`), jarak/tanggal (`{typography.body-sm}` muted), harga rata kanan.

**`property-card-photo`** — Plate foto itu sendiri, token terpisah untuk reuse di wishlist/hasil pencarian.

**`experience-card`** — Kartu rasio lebih tinggi (4:5) untuk listing experience. Potongan sudut sama, badge "NEW" mengambang kiri-atas, hati kanan-atas.

**`guest-favorite-badge`** — Pill canvas (`{rounded.full}`) di 11px/600 (Lora). Ditempatkan di atas foto dengan shadow tier satu-satunya sistem untuk elevasi.

### Listing Detail

**`rating-display-card`** — Momen signature listing-detail. Angka rating 64px/700 ("4.81") diapit ornamen SVG kecil kiri-kanan. Di bawahnya: tagline "Guest favorite" dan baris kolom stat ink. Bobot tipografi terbesar di seluruh sistem.

**`amenity-row`** — Daftar 1-kolom ikon amenity + label ink di `{typography.body-md}` (Poppins). Padding baris 12px, tanpa border antar baris; section ditutup hairline 1px atas-bawah.

**`reviews-card`** — Grid 2-kolom kutipan review. Tiap kolom: baris author (avatar, nama, tanggal) di atas kutipan 3-baris dengan link tertiary "Show more".

**`host-card`** — Kartu canvas dengan rounding `{rounded.md}` dan padding 24px, berisi avatar host, nama, badge "Superhost", stat response-rate, dan `{component.button-secondary}` "Contact host".

**`reservation-card`** — Kartu sticky rail-kanan di listing detail. Permukaan canvas, rounding `{rounded.md}`, border hairline 1px, shadow tier 1px, padding 24px. Berisi: harga per malam (`{typography.display-md}` ink), pemilih rentang tanggal, stepper jumlah tamu, CTA "Reserve" full-width, dan breakdown biaya di `{typography.body-sm}`.

### Date Picker

**`date-picker-day`** — Sel bundar 40×40px dengan angka hari di `{typography.body-sm}`. State default transparan, teks ink.

**`date-picker-day-selected`** — Fill ink, teks krem, lingkaran penuh (`{rounded.full}`). State range antara dua hari terpilih pakai background lozenge `{colors.surface-soft}` yang menyambungkan keduanya.

### Forms

**`text-input`** — Permukaan canvas, outline hairline 1px, radius `{rounded.sm}` 8px, tinggi 56px, padding 14×12px. Label di atas (`{typography.caption}` muted), placeholder di `{typography.body-md}` muted. Saat fokus, border menebal jadi 2px dan warnanya berpindah ke `{colors.ink}` — tanpa glow, tanpa ring.

### Footer

**`footer-light`** — Permukaan canvas (sama dengan kanvas halaman — tanpa footer kontras), padding 48×80px. Tiga kolom blok link, dipisah gutter 24px. Tiap kolom diawali label ink `{typography.title-sm}` dan menyusun baris `{component.footer-link}` di `{typography.body-sm}` ink.

**`legal-band`** — Strip bawah di bawah kolom footer, berisi baris copyright, pemilih bahasa, pemilih mata uang, dan ikon sosial. Semua teks muted di `{typography.caption-sm}`.

## Responsive Behavior

Tidak diubah dari file asli.

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 744px | Top nav jadi logo + hamburger; tab produk sembunyi di sheet; search bar jadi satu pill tap; kartu properti stack 1-up; grid kota 1-kolom; reservation card jadi sticky bottom bar. |
| Tablet | 744–1128px | Tab produk tetap tampil tapi search bar menyempit; kartu properti 2-up; grid kota 2–3 kolom; reservation card tetap sticky rail-kanan lebih sempit. |
| Desktop | 1128–1440px | Top nav penuh dengan tiga tab produk di tengah; search bar full-width; kartu properti 4-up; grid kota 6-kolom; listing detail 2-kolom dengan reservation rail. |
| Wide | > 1440px | Lebar konten cap di 1440px untuk listing/search, ~1280px untuk editorial. |

### Touch Targets
Tidak diubah.
- CTA utama minimum 48×48px (di atas WCAG AAA).
- Search orb 48×48px bundar.
- Tombol save hati 32×32px bundar.
- Sel hari date-picker 40×40px bundar.

### Collapsing Strategy
Tidak diubah dari file asli.

## Known Gaps

- **Hover state colors:** sengaja tidak didokumentasikan sesuai kebijakan no-hover global.
- **Loading states / skeleton screens:** tidak terlihat di surface yang diekstrak.
- **Map view styling:** peta hasil pencarian pakai tile ber-tint dengan marker warna Ember custom; belum didokumentasikan detail.
- **Form input error states:** warna teks error (`{colors.primary-error-text}`) sudah didokumentasikan, tapi kombinasi lengkap outline input + helper-text saat validasi gagal belum terlihat di surface yang diekstrak.
- **Sub-brand palettes:** token `luxe` dan `plus` di file asli **dihapus** di versi ini — kedua hue itu (ungu, magenta) tidak punya padanan di palet kamu, dan saya tidak ingin mengarang warna baru di luar brief. Kalau butuh aksen sub-brand kedua nanti, mulai dari `{colors.primary-soft}` (#CF7B72) dulu.
