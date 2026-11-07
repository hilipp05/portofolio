/**
 * SEMUA ISI PORTOFOLIO ADA DI FILE INI.
 *
 * Aturan yang dipakai di seluruh file:
 * - Jangan isi angka, klien, atau testimoni yang tidak bisa dibuktikan.
 * - Kalau sebuah field tidak ada (mis. demo langsung), hapus field-nya.
 *   Halaman otomatis tidak menampilkannya.
 */

export type Project = {
  /** Huruf kecil, angka, dan tanda hubung. Dipakai di URL: /#project-<slug> */
  slug: string;
  title: string;
  year: string;
  role: string;
  /** Satu atau dua kalimat: masalah yang dipecahkan. */
  summary: string;
  /** Keputusan teknis atau hasil yang bisa kamu pertanggungjawabkan. */
  highlights: string[];
  /** Pakai nama yang sama persis dengan di `stack` agar filter berfungsi. */
  stack: string[];
  repo?: string;
  demo?: string;
  /** Potongan kode asli yang menunjukkan keputusan teknis (opsional). */
  snippet?: { file: string; code: string };
};

export const site = {
  isTemplate: false,
  lang: "id",
  name: "Philipp Carley Siregar",
  role: "Mahasiswa Teknik Informatika & Web Developer",
  headline:
    "Mahasiswa Teknik Informatika yang tertarik pada pengembangan aplikasi web, teknologi digital, dan solusi perangkat lunak yang fungsional serta mudah digunakan.",
  email: "philipcarley05@gmail.com",
  contactNote:
    "Tertarik untuk bekerja sama atau berdiskusi mengenai sebuah proyek? Silakan hubungi saya. Saya terbuka untuk belajar, berkolaborasi, dan menjajaki peluang baru di bidang teknologi.",
  facts: [
    { label: "Peran", value: "Mahasiswa Teknik Informatika & Web Developer" },
    { label: "Lokasi", value: "Medan, Indonesia" },
    { label: "Fokus", value: "Web, Frontend, dan Backend Development" },
    { label: "Tersedia untuk", value: "Belajar, kolaborasi, dan peluang baru" },
  ],
};

/** Paragraf "Tentang Saya", ditampilkan satu per satu. */
export const about: string[] = [
  "Halo! Saya Philipp Carley Siregar, mahasiswa Teknik Informatika di Universitas Methodist Indonesia.",
  "Saya memiliki ketertarikan dalam bidang pengembangan perangkat lunak, khususnya web development, frontend development, dan backend development.",
  "Saya terbiasa mengeksplorasi berbagai teknologi seperti PHP, JavaScript, TypeScript, Laravel, Next.js, React, MySQL, dan Supabase.",
  "Melalui berbagai proyek pribadi dan akademik, saya terus mengembangkan kemampuan dalam membangun aplikasi yang fungsional, responsif, dan mudah digunakan.",
  "Saya senang mempelajari teknologi baru, menyelesaikan permasalahan melalui pemrograman, serta mengembangkan ide menjadi aplikasi yang bermanfaat.",
];

/** Urutan di sini menentukan urutan di navigasi dan penomoran bagian. */
export const sections = [
  { id: "about", label: "Tentang" },
  { id: "projects", label: "Proyek" },
  { id: "stack", label: "Keahlian" },
  { id: "experience", label: "Pengalaman" },
  { id: "education", label: "Pendidikan" },
  { id: "contact", label: "Kontak" },
];

export const projects: Project[] = [
  {
    slug: "indrfood",
    title: "Indrfood",
    year: "2026",
    role: "Web Developer",
    summary:
      "Aplikasi pemesanan makanan berbasis web yang memudahkan pengguna melihat pilihan makanan dan melakukan pemesanan secara digital.",
    highlights: [
      "Mengembangkan aplikasi pemesanan makanan berbasis web.",
      "Membangun antarmuka aplikasi menggunakan Next.js.",
      "Mengembangkan pengalaman pengguna dalam proses pemesanan makanan.",
    ],
    stack: ["Next.js", "TypeScript"],
    repo: "https://github.com/hilipp05/indrfood",
    demo: "https://indrfood.vercel.app",
  },
  {
    slug: "inventory-management-system",
    title: "Inventory Management System",
    year: "2026",
    role: "Full Stack Web Developer",
    summary:
      "Aplikasi manajemen inventaris berbasis web untuk mengelola data barang, kategori, supplier, pengguna, serta pengaturan hak akses sistem.",
    highlights: [
      "Pengelolaan produk.",
      "Pengelolaan kategori.",
      "Pengelolaan supplier.",
      "Manajemen pengguna.",
      "Role-Based Access Control (RBAC).",
      "Integrasi frontend dan backend aplikasi.",
    ],
    stack: ["Laravel", "Next.js", "TypeScript", "MySQL"],
    repo: "https://github.com/hilipp05/inventory-app",
  },
  {
    slug: "website-pemasaran-produk",
    title: "Website Pemasaran Produk",
    year: "2026",
    role: "Web Developer",
    summary:
      "Website pemasaran produk yang dilengkapi sistem tunggakan pelanggan untuk mengelola informasi pemasaran dan memantau kewajiban pembayaran.",
    highlights: [
      "Website pemasaran produk.",
      "Pengelolaan data tunggakan pelanggan.",
      "Pemantauan informasi pembayaran pelanggan.",
      "Pengelolaan informasi pelanggan.",
    ],
    // Teknologi proyek ini belum dikonfirmasi, jadi stack dibiarkan kosong
    // agar tidak menampilkan teknologi yang tidak bisa dipertanggungjawabkan.
    stack: [],
    repo: "https://github.com/hilipp05/pemasaran",
  },
];

/** Kelompok dan isinya bebas. Item yang dipakai proyek jadi bisa diklik sebagai filter. */
export const stack = [
  { group: "Bahasa Pemrograman", items: ["PHP", "JavaScript", "TypeScript"] },
  { group: "Frontend", items: ["HTML", "CSS", "React", "Next.js"] },
  { group: "Backend", items: ["Laravel"] },
  { group: "Database", items: ["MySQL", "Supabase"] },
];

export const experience = [
  {
    period: "2026 – sekarang",
    role: "Student Developer",
    org: "Academic & Personal Projects",
    points: [
      "Mengembangkan aplikasi web melalui proyek akademik dan pribadi.",
      "Membangun aplikasi menggunakan Laravel, Next.js, React, dan TypeScript.",
      "Mengelola serta mengembangkan database menggunakan MySQL dan Supabase.",
      "Menggunakan GitHub untuk pengelolaan source code proyek.",
    ],
  },
];

/** Pendidikan. Memakai pola yang sama dengan pengalaman (timeline). */
export const education = [
  {
    period: "S1 · berjalan",
    role: "Teknik Informatika",
    org: "Universitas Methodist Indonesia",
    points: [
      "Mahasiswa Sarjana (S1), sedang menempuh pendidikan di Medan, Indonesia.",
    ],
  },
];

export const links = [
  { label: "GitHub", href: "https://github.com/hilipp05" },
];
