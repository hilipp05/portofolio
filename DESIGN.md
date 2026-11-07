# DESIGN.md

Dokumen ini mencatat alasan di balik tiap keputusan visual, supaya perubahan
berikutnya tidak kembali ke default.

## Tujuan halaman

Orang yang menilai kamu (rekruter teknis, engineer, calon klien) perlu menjawab
satu pertanyaan dalam beberapa menit: apa yang pernah dibangun orang ini, dan
bagaimana cara berpikirnya? Karena itu proyek adalah halamannya, bukan hero.
Urutan bagian mengikuti pertanyaan itu: proyek, stack yang dipakai di proyek,
pengalaman, kontak. Tidak ada testimoni, logo klien, atau angka karangan karena
tidak ada yang bisa dibuktikan di template ini.

## Dial

- MOTION 5 (dinaikkan dari 2 atas permintaan pemilik: "animasi jangan tanggung").
  Gerak sekarang sinematik, tetapi tiap gerak punya tujuan tertulis di bagian
  Gerak di bawah. Tetap tanpa loop, pulse, atau float. Semua gerak terjadi
  karena sesuatu terjadi: halaman dimuat, bagian masuk layar, kursor mendekat,
  pengguna memilih. Semua dimatikan oleh `prefers-reduced-motion`.
- RHYTHM 3: tiap bagian punya komposisi dan jarak berbeda: hero asimetris,
  proyek dua panel, stack berupa daftar tipografi besar, pengalaman dua kolom
  dengan tulang punggung, kontak berupa bidang terang dengan satu kalimat besar.

## Warna

Gelap, karena diminta dan karena audiensnya engineer yang membaca kode.
Dua warna inti plus satu aksen:

- Dasar: `#0e0f0d` (hitam dengan sedikit hijau-hangat, bukan biru-ungu)
- Teks: `#e9e7df` (putih hangat, bukan putih murni)
- Aksen: `#ff6a3d` (oranye sinyal). Hanya di tiga tempat: tombol utama,
  nomor proyek yang sedang dipilih, dan cincin fokus keyboard.

Tidak ada gradien, glow, glassmorphism, shadow, atau grid latar. Hierarki dibuat
dengan garis tipis (`--rule`) dan permukaan datar (`--surface`, `--raised`).
Kontras diperiksa: teks redup di atas permukaan 6.5:1, aksen di atas dasar 6.7:1,
batas komponen `--edge` minimal 3.4:1.

## Tipografi

- Bricolage Grotesque untuk teks dan judul: grotesk dengan karakter sendiri,
  supaya halaman terbaca sebagai milik orang tertentu, bukan template developer.
- IBM Plex Mono hanya untuk yang memang kode atau metadata: tahun, nama file,
  jumlah, potongan kode. Tidak dipakai untuk judul atau label huruf kapital.

## Bentuk

Radius 3 px di mana-mana (4 px untuk dialog). Tidak ada pill. Tidak ada
shadow: satu-satunya elemen yang "melayang" adalah palette, dan itu ditandai
backdrop gelap, bukan shadow.

## Interaksi (semua punya fungsi nyata)

- Daftar proyek adalah tab vertikal: klik atau panah atas/bawah, Home, End.
  Pilihan tersimpan di hash URL (`/#project-proyek-1`) sehingga bisa dibagikan.
- Filter teknologi: klik chip di proyek, atau klik teknologi di bagian Stack.
  Jumlah proyek dihitung dari data, bukan ditulis tangan.
- Command palette (Ctrl/Cmd + K, atau tombol Cari): lompat ke bagian, buka
  proyek, salin email, buka tautan. Memakai `<dialog>` modal sehingga fokus
  terkunci dan Esc menutup.
- Penanda bagian aktif di navigasi memakai IntersectionObserver.
- Potongan kode per proyek (opsional) dengan tombol salin.

## Gerak (tujuan tiap gerak)

- Nama di hero naik huruf demi huruf dengan gelombang ketebalan sekali jalan,
  dan menebal mendekati kursor (perangkat berkursor saja). Tujuan: halaman ini
  milik satu orang; nama adalah hal pertama yang hidup.
- Garis (`--rule`) adalah struktur halaman, jadi garis yang "digambar" adalah
  bahasa gerak utama: baris spec, stack, pengalaman, dan daftar proyek
  menggambar garisnya dulu, isinya menyusul. Tujuan: menuntun urutan baca.
- Judul bagian terbuka dari balik topeng. Tujuan: menandai bagian baru tiba.
- Garis bawah header terisi sesuai posisi baca. Tujuan: orientasi.
- Slab penanda proyek meluncur antar tab; panel detail masuk berurutan, kode
  muncul per baris; angka jumlah proyek berguling saat filter berubah.
  Tujuan: ganti proyek adalah momen utama halaman dan harus terasa sebagai
  satu perpindahan, bukan lompatan.
- Stack: tick di samping teknologi = jumlah proyek yang memakainya (dari data).
  Hover meredupkan yang lain. Tujuan: fokus dan bukti pemakaian.
- Pengalaman: tulang punggung vertikal dan penanda tergambar saat masuk layar.
- Kontak adalah satu-satunya bidang terang, naik dari bawah. Tujuan: akhir
  halaman terasa sebagai akhir. Email menggulung per huruf saat hover.
- Teks tombol dan navigasi berguling saat hover/fokus: tanda bisa diklik.
- Palette dan toast punya gerak masuk dan keluar yang sama. Tombol salin
  menggambar centang. Tujuan: konfirmasi aksi.
- Hero ikut pergi saat digulir (scroll-driven, hanya di browser yang mendukung).

## Yang sengaja tidak ada

Loop atau marquee, cursor kustom, preloader, glow/gradien sebagai efek,
Terminal palsu, badge "AI powered", pill di atas judul, ikon sparkle, bento grid,
"trusted by", tiga langkah bergambar, feed aktivitas, statistik karangan, form
kontak tanpa backend (diganti mailto dan tombol salin).
