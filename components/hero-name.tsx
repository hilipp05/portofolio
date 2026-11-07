"use client";

import { useEffect, useRef } from "react";

const BASE = 600;
const PEAK = 800;
const RADIUS = 260;

/**
 * Nama di hero. Masuk huruf demi huruf dari balik topeng, dengan gelombang
 * ketebalan sekali jalan. Di perangkat dengan kursor, huruf mendekati kursor
 * menebal (Bricolage punya sumbu weight). Tujuannya satu: halaman ini milik
 * satu orang, dan namanya adalah hal pertama yang terasa hidup.
 */
export function HeroName({ name }: { name: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    const ok = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!root || !ok.matches) return;
    const letters = [...root.querySelectorAll<HTMLElement>("[data-l]")];
    const cur = letters.map(() => BASE);
    let tx = -9999, ty = -9999, raf = 0;

    function frame() {
      let moving = false;
      letters.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const d = Math.hypot(tx - (r.left + r.width / 2), ty - (r.top + r.height / 2));
        const target = BASE + (PEAK - BASE) * Math.max(0, 1 - d / RADIUS) ** 2;
        cur[i] += (target - cur[i]) * 0.14;
        if (Math.abs(target - cur[i]) > 0.5) moving = true;
        el.style.setProperty("--w", cur[i].toFixed(0));
      });
      raf = moving ? requestAnimationFrame(frame) : 0;
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const move = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; kick(); };
    const leave = () => { tx = ty = -9999; kick(); };
    const hero = root.closest("section") ?? root;
    hero.addEventListener("pointermove", move as EventListener);
    hero.addEventListener("pointerleave", leave);
    return () => {
      hero.removeEventListener("pointermove", move as EventListener);
      hero.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  let k = 0;
  return (
    <span ref={ref}>
      <span className="visually-hidden">{name}</span>
      <span aria-hidden="true">
        {name.split(" ").map((word, wi) => (
          <span key={wi}>
            {wi > 0 && " "}
            <span className="hero__word">
              {[...word].map((c, ci) => (
                <span className="hero__l" data-l style={{ "--k": k++ } as React.CSSProperties} key={ci}>
                  {c}
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
