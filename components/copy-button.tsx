"use client";

import { useEffect, useRef, useState } from "react";
import { copyText } from "@/lib/clipboard";

type Props = {
  text: string;
  label: string;
  className?: string;
};

export function CopyButton({ text, label, className }: Props) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function onClick() {
    const ok = await copyText(text);
    setState(ok ? "done" : "failed");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }

  const visible =
    state === "done" ? "Tersalin" : state === "failed" ? "Gagal menyalin" : label;

  return (
    <button type="button" className={className} onClick={onClick}>
      {state === "done" && (
        <svg className="check" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path d="M3 8.5l3.2 3.2L13 4.8" fill="none" stroke="currentColor" strokeWidth="2" pathLength="1" />
        </svg>
      )}
      <span key={state} className="swap">{visible}</span>
      <span className="visually-hidden" role="status">
        {state === "done" ? "Tersalin ke clipboard" : state === "failed" ? "Gagal menyalin" : ""}
      </span>
    </button>
  );
}
