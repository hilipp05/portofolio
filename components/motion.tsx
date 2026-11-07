"use client";

import { useEffect } from "react";

/**
 * Satu-satunya pengatur animasi masuk di halaman.
 * - Elemen [data-reveal] diberi data-in sekali, saat masuk layar.
 * - MutationObserver menangkap elemen yang muncul belakangan (hasil filter proyek).
 * - Garis di bawah header terisi sesuai posisi baca (--p).
 * Tujuan: memberi tahu mata ke mana harus melihat saat bagian baru tiba.
 */
export function Motion() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.in = "";
          io.unobserve(e.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    const seen = new WeakSet<Element>();
    const scan = (root: ParentNode) =>
      root.querySelectorAll("[data-reveal]").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
      });
    scan(document);
    const mo = new MutationObserver((list) =>
      list.forEach((m) => m.addedNodes.forEach((n) => n instanceof Element && scan(n))),
    );
    mo.observe(document.body, { childList: true, subtree: true });

    let raf = 0;
    const progress = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--p", String(max > 0 ? window.scrollY / max : 0));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(progress); };
    progress();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
