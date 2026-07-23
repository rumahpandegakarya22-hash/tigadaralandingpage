# Tur Virtual

Pengalaman menjelajah kost secara virtual 360° tanpa harus datang langsung.

## Spesifikasi

### Tujuan
Memberikan pengalaman menjelajah kost secara virtual 360° tanpa harus datang langsung, agar calon penghuni bisa melihat seluruh interior dengan leluasa.

### Selesai bila
- Halaman tur virtual dapat diakses dari menu atau tombol di landing page, menampilkan tampilan 360° dari dalam kost.
- Pengunjung bisa memutar pandangan ke segala arah (360°) di dalam satu ruangan menggunakan mouse atau sentuhan layar.
- Terdapat penanda interaktif (hotspot) yang bisa diklik untuk berpindah ke ruangan lain.
- Tampilan tur virtual berfungsi dengan baik di ponsel, tablet, dan desktop tanpa kehilangan kualitas visual.
- Animasi perpindahan antar ruangan terasa mulus dan tidak membuat pengunjung kehilangan arah.

## Sub-fitur: Navigasi 360°

Pengalaman berjalan virtual di dalam kost.

### Tujuan
Memberikan kemampuan melihat-lihat ke segala arah di dalam satu ruangan secara interaktif, layaknya sedang berada di lokasi.

### Selesai bila
- Tampilan panorama 360° ruangan dimuat dengan cepat dan ditampilkan memenuhi area konten.
- Pengunjung dapat menggeser (drag) atau menyentuh layar untuk memutar pandangan 360° horizontal dan vertikal.
- Gerakan kamera responsif, tanpa jeda atau patah-patah, sehingga terasa alami.
- Terdapat kontrol zoom (perbesar/perkecil) yang mudah dijangkau untuk melihat detail dekorasi atau fasilitas.
- Kualitas gambar tetap tajam di berbagai ukuran layar, dari ponsel hingga layar lebar.

## Sub-fitur: Penjelajahan Ruangan

Bisa berpindah antar ruangan secara interaktif.

### Tujuan
Memungkinkan pengunjung berpindah dari satu ruangan ke ruangan lain dalam tur virtual, menjelajahi seluruh bagian kost dengan mudah.

### Selesai bila
- Di dalam tampilan 360° muncul titik hotspot (ikon panah atau lingkaran) yang menandakan ruangan lain yang dapat dikunjungi.
- Pengunjung bisa mengeklik hotspot untuk langsung berpindah ke ruangan tujuan dengan animasi transisi (misal: fade atau geser halus).
- Terdapat daftar ruangan atau peta mini yang selalu terlihat, menunjukkan posisi saat ini dan ruangan lain yang tersedia.
- Perpindahan antar ruangan tetap berfungsi stabil di perangkat sentuh dan mouse, tanpa merusak tata letak atau pengalaman.

## Task

### 1. Buat halaman utama tur virtual dengan layout responsif dan data tiruan

### 2. Integrasikan penampil gambar 360° interaktif menggunakan pustaka pilihan dengan panorama statis lokal

### 3. Implementasikan kontrol putar 360° (drag/touch) dan zoom (pinch/scroll) yang responsif

### 4. Tambahkan komponen hotspot interaktif di atas penampil 360° berdasarkan data koordinat tiruan

### 5. Implementasikan animasi transisi perpindahan ruangan saat hotspot diklik (fade atau geser)

### 6. Bangun panel peta mini atau daftar ruangan yang menampilkan posisi pengguna saat ini dan navigasi

### 7. Optimalkan performa penampil 360° untuk berbagai perangkat (desktop, tablet, ponsel)

### 8. Rancang skema basis data untuk ruangan (nama, gambar panorama, koordinat hotspot) dan hotspot

### 9. Buat API endpoint untuk mendapatkan daftar ruangan beserta hotspot terkait

### 10. Integrasikan penyimpanan dan pengelolaan gambar panorama ke backend (upload/static serving)
