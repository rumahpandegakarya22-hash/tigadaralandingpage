# Testimoni Penghuni

Ulasan dan rating dari penghuni yang sudah merasakan tinggal di kost.

## Spesifikasi

### Tujuan
Menampilkan ulasan dan rating dari penghuni kost yang sebenarnya untuk membangun kepercayaan calon penghuni dan memperkuat kredibilitas kost.
### Selesai bila
- Pengunjung dapat melihat kumpulan testimoni penghuni berupa kartu yang berisi teks ulasan singkat dan bintang rating.
- Setiap testimoni menampilkan nama atau inisial penghuni, teks ulasan asli, dan bintang penilaian dari 1 sampai 5.
- Tampilan responsif: di perangkat seluler muncul sebagai daftar vertikal, di layar lebih besar dapat diatur dalam grid atau carousel yang mudah digeser.
- Apabila belum ada testimoni sama sekali, bagian ini tidak ditampilkan atau hanya menampilkan placeholder singkat seperti "Segera hadir".

## Sub-fitur: Ulasan Tertulis

Testimoni asli dari penghuni yang sudah ada.

### Tujuan
Menampilkan kutipan asli dari penghuni yang pernah atau sedang tinggal di kost untuk memberikan gambaran pengalaman nyata tinggal di sana.
### Selesai bila
- Satu atau lebih ulasan tertulis ditampilkan di dalam elemen kartu yang bersih, masing-masing memuat teks pendek (1–3 kalimat) dan nama/inisial pemberi ulasan.
- Teks ulasan terbaca nyaman di semua ukuran layar, tanpa terpotong, dengan ukuran font dan kontras yang memadai.
- Kartu ulasan disusun dalam daftar vertikal pada ponsel; pada desktop, bisa diatur dalam dua kolom atau carousel horizontal untuk menghemat ruang tanpa kehilangan kejelasan.

## Sub-fitur: Rating Bintang

Skor penilaian untuk kredibilitas.

### Tujuan
Menampilkan skor penilaian dalam bentuk ikon bintang (1–5) untuk setiap testimoni, sehingga pengunjung dapat dengan cepat menilai kepuasan penghuni sebelumnya.
### Selesai bila
- Setiap kartu testimoni menyertakan representasi visual bintang yang sesuai dengan rating individu (misal, 4 bintang emas dan 1 bintang abu-abu untuk rating 4).
- Ikon bintang mudah dikenali di berbagai perangkat, dengan ukuran minimal yang tetap proporsional (contoh, tinggi 16–20px di ponsel).
- Warna bintang terisi (emas) kontras dengan bintang kosong (abu-abu) sehingga perbedaan langsung terlihat.

## Task

### 1. Buat halaman Testimoni dengan data tiruan dan layout vertikal

### 2. Buat komponen BintangRating dengan ikon bintang emas dan abu-abu

### 3. Integrasikan BintangRating ke kartu testimoni di halaman Testimoni

### 4. Buat tata letak responsif grid atau carousel untuk desktop

### 5. Tambahkan placeholder 'Segera hadir' jika tidak ada testimoni

### 6. Buat skema database dan migrasi untuk tabel testimoni

### 7. Buat endpoint API untuk mengambil daftar testimoni

### 8. Buat seeding data dummy untuk testimoni
