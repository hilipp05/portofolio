# Portofolio

Next.js 16 (App Router) + Tailwind v4. Tema gelap, teknis, tanpa gambar, dengan lapisan animasi (lihat bagian Gerak di `DESIGN.md`).

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Mengisi konten

Semua teks ada di `data/portfolio.ts`. Isinya placeholder jujur ("Nama Kamu",
"20XX"). Ganti satu per satu, lalu set `site.isTemplate` ke `false`.

- Tambah proyek: salin satu objek di `projects`. `slug` dipakai di URL.
- Nama teknologi di `projects[].stack` harus sama persis dengan di `stack`
  agar filter dan jumlah proyek berfungsi.
- Hapus field opsional (`demo`, `repo`, `snippet`) kalau tidak ada. Halaman
  tidak akan menampilkannya.

## Pintasan

- `Ctrl K` / `Cmd K`: command palette
- Panah atas/bawah pada daftar proyek: pindah proyek

Alasan keputusan desain ada di `DESIGN.md`.
