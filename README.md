# VELORA — International Thrift Market

VELORA adalah prototype front-end marketplace baju thrift internasional dengan tampilan modern, responsif, dan terinspirasi dari kemudahan marketplace populer. Desain, nama, warna, dan komponen dibuat mandiri; ini bukan salinan resmi Shopee.

## Isi folder
- `index.html` — struktur halaman, katalog, login, seller studio, keranjang, checkout.
- `style.css` — styling responsif untuk desktop dan ponsel.
- `script.js` — interaksi katalog, pencarian, filter kategori, sorting, wishlist, keranjang, login demo, listing seller, dan checkout simulasi.
- `README.md` — panduan ini.

## Menjalankan secara lokal
1. Ekstrak ZIP.
2. Buka `index.html` dengan browser, atau gunakan ekstensi **Live Server** di Visual Studio Code.
3. Internet diperlukan untuk Google Fonts dan gambar dari Unsplash. Kalau gambar tidak tampil, cek koneksi atau ganti URL gambar produk.

## Publikasi lewat GitHub Pages
1. Login ke GitHub dan buat repository baru, misalnya `velora-thrift`.
2. Upload `index.html`, `style.css`, `script.js`, dan `README.md` ke root repository.
3. Buka **Settings → Pages**.
4. Di bagian build/deployment, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/(root)`, lalu klik **Save**.
6. Tunggu deployment selesai. Link website akan muncul di halaman GitHub Pages pada bagian Pages.

## Fitur prototype
- Etalase produk, kategori, pencarian, dan urut harga.
- Tombol favorit/wishlist (interaksi demo).
- Keranjang dengan tambah/kurang jumlah dan hapus produk.
- Form masuk/daftar demo dengan pilihan Pembeli atau Seller.
- Seller Studio untuk menambahkan produk ke etalase saat ini.
- Checkout demo: nama penerima, telepon, alamat, pengiriman, metode pembayaran, dan ringkasan total.
- Newsletter demo dan layout responsif.

## Catatan penting sebelum dipakai sungguhan
Prototype ini hanya front-end. Login bukan autentikasi sungguhan, akun seller dan produk hanya disimpan sementara di browser/session halaman, dan checkout tidak mengirim pesanan atau menarik pembayaran. Jangan gunakan untuk mengumpulkan password atau data pelanggan nyata.

Agar siap produksi, tambahkan:
- Backend/API dan database untuk akun, listing, stok, pesanan, dan status transaksi.
- Autentikasi aman (misalnya session/token, hashing password di server, validasi dan rate limiting).
- Payment gateway resmi dan verifikasi pembayaran di server.
- Pengelolaan foto yang aman, validasi file/URL, moderasi produk, kebijakan retur, privasi, dan syarat layanan.
- Penghitungan ongkir dari layanan kurir serta dashboard seller/admin yang terhubung ke backend.

## Teknologi
HTML5, CSS3, JavaScript vanilla. File JavaScript bernama `script.js` (bukan Java).
