# Proses Sewa

Alur pemesanan kamar mulai dari pemilihan hingga pembayaran.

## Spesifikasi

### Tujuan
Memungkinkan calon penghuni memilih kamar, mengisi data diri, dan menyelesaikan pembayaran sewa secara mandiri melalui website.

### Selesai bila
- Pengunjung dapat memilih tipe kamar dari daftar yang tersedia.
- Formulir data diri dapat diisi dan divalidasi dengan benar.
- Ringkasan pesanan menampilkan detail kamar dan harga sebelum pembayaran.
- Metode pembayaran ditampilkan dan pengunjung dapat menyelesaikan transaksi.
- Setelah pembayaran, muncul konfirmasi pemesanan sukses.

## Sub-fitur: Pilih Kamar

Memilih tipe kamar yang diinginkan.

### Tujuan
Memberikan kemampuan kepada pengunjung untuk memilih tipe kamar yang ingin disewa.

### Selesai bila
- Daftar kamar ditampilkan dengan foto, nama tipe, harga, dan spesifikasi singkat.
- Pengunjung dapat memilih satu kamar dan melihatnya ditandai sebagai pilihan.
- Tombol lanjutkan muncul dan mengarah ke formulir data diri.

## Sub-fitur: Formulir Data Diri

Input data penyewa.

### Tujuan
Mengumpulkan data pribadi penyewa yang diperlukan untuk proses pemesanan.

### Selesai bila
- Formulir menampilkan kolom: nama lengkap, nomor telepon/WhatsApp, email (opsional), dan pesan tambahan.
- Validasi mencegah pengiriman jika nomor telepon tidak sesuai format.
- Setelah data terisi, pengunjung dapat melanjutkan ke langkah konfirmasi.

## Sub-fitur: Konfirmasi & Pembayaran

Ringkasan pesanan dan metode pembayaran.

### Tujuan
Menampilkan ringkasan pesanan dan instruksi pembayaran agar penyewa dapat menyelesaikan transaksi.

### Selesai bila
- Ringkasan menampilkan tipe kamar yang dipilih, harga sewa, dan data diri yang diisi.
- Metode pembayaran (misal transfer bank) disertai nomor rekening dan jumlah yang harus dibayar.
- Tombol konfirmasi memproses pesanan, menyimpan data, dan menampilkan pesan sukses beserta detail pesanan.

## Task

### 1. Buat halaman pilih kamar dengan data tiruan

### 2. Implementasi state pemilihan kamar dan tombol lanjut

### 3. Buat halaman formulir data diri dengan validasi

### 4. Buat halaman ringkasan pesanan dan metode pembayaran statis

### 5. Implementasi navigasi dan alur antar langkah sewa

### 6. Buat halaman konfirmasi sukses dengan data tiruan

### 7. Polishing responsivitas dan animasi transisi halaman

### 8. Buat skema database untuk pesanan dan penyewa

### 9. Buat API endpoint untuk daftar tipe kamar

### 10. Buat API endpoint submit pesanan sewa

### 11. Tambahkan validasi server untuk nomor telepon

### 12. Simulasikan integrasi status pembayaran
