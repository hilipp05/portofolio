import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/data/portfolio";
import "./globals.css";

// Teks dan judul: grotesk dengan karakter sendiri, bukan sans netral bawaan.
const body = Bricolage_Grotesque({
  variable: "--font-body",
  subsets: ["latin"],
  // opsz: judul besar memakai bentuk display, teks kecil bentuk teks.
  axes: ["opsz"],
  display: "swap",
});

// Mono hanya untuk yang memang kode atau metadata: tahun, nama file, jumlah.
const code = IBM_Plex_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} | ${site.role}`,
  description: site.headline,
};

export const viewport: Viewport = {
  themeColor: "#0e0f0d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.lang}
      className={`${body.variable} ${code.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Menandai JS aktif sebelum paint pertama, supaya keadaan awal animasi
            masuk tidak berkedip dan konten tetap terlihat bila JS mati. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
