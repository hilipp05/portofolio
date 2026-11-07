"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { copyText } from "@/lib/clipboard";
import { filterStore, hashStore } from "@/lib/store";
import { Roll } from "@/components/roll";

type Props = {
  name: string;
  email: string;
  sections: { id: string; label: string }[];
  projects: { slug: string; title: string }[];
  links: { label: string; href: string }[];
};

type Command = {
  id: string;
  label: string;
  group: string;
  run: () => void | Promise<void>;
};

export function Chrome({ name, email, sections, projects, links }: Props) {
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [toast, setToast] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [toastOpen, setToastOpen] = useState(false);

  // Penanda bagian yang sedang dibaca di navigasi.
  useEffect(() => {
    const ids = ["top", ...sections.map((s) => s.id)];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  // Ctrl+K / Cmd+K membuka dan menutup palette.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // <dialog> modal memberi focus trap dan tombol Esc tanpa kode tambahan.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  function showToast(message: string) {
    setToast(message);
    setToastOpen(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastOpen(false), 2200);
  }

  function goToProject(slug: string) {
    filterStore.set(null);
    hashStore.replace(`project-${slug}`);
    window.requestAnimationFrame(() => {
      document.getElementById(`project-${slug}`)?.scrollIntoView({ block: "center" });
    });
  }

  const commands: Command[] = [
    ...sections.map((s) => ({
      id: `section-${s.id}`,
      label: `Ke ${s.label}`,
      group: "Bagian",
      run: () => {
        window.location.hash = s.id;
      },
    })),
    ...projects.map((p) => ({
      id: `project-${p.slug}`,
      label: p.title,
      group: "Proyek",
      run: () => goToProject(p.slug),
    })),
    {
      id: "copy-email",
      label: "Salin alamat email",
      group: "Aksi",
      run: async () => {
        const ok = await copyText(email);
        showToast(ok ? "Email disalin" : "Gagal menyalin email");
      },
    },
    ...links.map((l) => ({
      id: `link-${l.label}`,
      label: l.label,
      group: "Tautan",
      run: () => {
        window.open(l.href, "_blank", "noopener,noreferrer");
      },
    })),
  ];

  const q = query.trim().toLowerCase();
  const results = q
    ? commands.filter(
        (c) => c.label.toLowerCase().includes(q) || c.group.toLowerCase().includes(q),
      )
    : commands;
  const current = results.length > 0 ? Math.min(cursor, results.length - 1) : -1;
  const currentId = current >= 0 ? `cmd-${results[current].id}` : undefined;

  useEffect(() => {
    if (open && currentId) {
      document.getElementById(currentId)?.scrollIntoView({ block: "nearest" });
    }
  }, [open, currentId]);

  function run(command: Command) {
    dialogRef.current?.close();
    setOpen(false);
    window.setTimeout(() => {
      void command.run();
    }, 0);
  }

  function onInputKeyDown(e: ReactKeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (results.length) setCursor((current + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (results.length) setCursor((current - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (current >= 0) run(results[current]);
    }
  }

  return (
    <>
      <header className="site-header">
        <div className="wrap site-header__row">
          <a href="#top" className="brand">
            {name}
          </a>
          <nav aria-label="Navigasi utama">
            <ul className="nav">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="nav__link"
                    aria-current={active === s.id ? "location" : undefined}
                  >
                    <Roll text={s.label} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            className="palette-trigger"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-keyshortcuts="Control+K Meta+K"
          >
            Cari
            <kbd className="kbd">Ctrl K</kbd>
          </button>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        className="palette"
        aria-label="Perintah cepat"
        onClose={() => {
          setOpen(false);
          setQuery("");
          setCursor(0);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="palette__body">
          <input
            ref={inputRef}
            className="palette__input"
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-autocomplete="list"
            aria-activedescendant={currentId}
            aria-label="Cari bagian, proyek, atau tautan"
            placeholder="Cari bagian, proyek, atau tautan"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            onKeyDown={onInputKeyDown}
          />
          {results.length > 0 ? (
            <ul className="palette__list" id="palette-list" role="listbox">
              {results.map((c, i) => (
                <li
                  key={c.id}
                  id={`cmd-${c.id}`}
                  role="option"
                  aria-selected={i === current}
                  className="palette__item"
                  onMouseMove={() => setCursor(i)}
                  onClick={() => run(c)}
                >
                  <span>{c.label}</span>
                  <span className="palette__group">{c.group}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="palette__empty" id="palette-list">
              Tidak ada hasil untuk &ldquo;{query}&rdquo;. Coba nama bagian atau nama proyek.
            </p>
          )}
          <p className="palette__hint">↑ ↓ memilih · Enter menjalankan · Esc menutup</p>
        </div>
      </dialog>

      <div className="toast" role="status" data-open={toastOpen ? "" : undefined}>
        {toast}
      </div>
    </>
  );
}
