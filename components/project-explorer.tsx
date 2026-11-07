"use client";

import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import type { Project } from "@/data/portfolio";
import { filterStore, hashStore } from "@/lib/store";
import { CopyButton } from "@/components/copy-button";

const PREFIX = "project-";
const serverFilter = () => null;

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const filter = useSyncExternalStore(filterStore.subscribe, filterStore.get, serverFilter);
  const hash = useSyncExternalStore(hashStore.subscribe, hashStore.get, hashStore.getServer);

  // Teknologi yang dipakai proyek, urut dari yang paling sering.
  const tally = new Map<string, number>();
  for (const p of projects) {
    for (const tech of p.stack) tally.set(tech, (tally.get(tech) ?? 0) + 1);
  }
  const tags = [...tally.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  const visible = filter ? projects.filter((p) => p.stack.includes(filter)) : projects;
  const hashSlug = hash.startsWith(`#${PREFIX}`) ? hash.slice(PREFIX.length + 1) : "";
  const selected = visible.find((p) => p.slug === hashSlug) ?? visible[0] ?? null;

  // Slab penanda proyek terpilih meluncur antar tab, bukan loncat.
  const tabsRef = useRef<HTMLDivElement>(null);
  const [slab, setSlab] = useState<{ y: number; h: number } | null>(null);
  const selectedSlug = selected?.slug;
  useLayoutEffect(() => {
    const box = tabsRef.current;
    if (!box || !selectedSlug) return;
    const measure = () => {
      const el = box.querySelector<HTMLElement>('[aria-selected="true"]');
      if (el) setSlab({ y: el.offsetTop, h: el.offsetHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    return () => ro.disconnect();
  }, [selectedSlug, visible.length]);

  function select(slug: string) {
    hashStore.replace(`${PREFIX}${slug}`);
  }

  function onKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (!selected || visible.length === 0) return;
    const i = visible.findIndex((p) => p.slug === selected.slug);
    let next = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % visible.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + visible.length) % visible.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = visible.length - 1;
    else return;
    e.preventDefault();
    const target = visible[next];
    select(target.slug);
    document.getElementById(`${PREFIX}${target.slug}`)?.focus();
  }

  if (projects.length === 0) {
    return (
      <p className="empty">
        Belum ada proyek. Tambahkan entri ke <code>projects</code> di{" "}
        <code>data/portfolio.ts</code>.
      </p>
    );
  }

  const lines = selected?.snippet ? selected.snippet.code.split("\n") : [];

  return (
    <div className="explorer">
      <div className="explorer__filters">
        <div className="chips" role="group" aria-label="Saring proyek menurut teknologi">
          <button
            type="button"
            className="chip"
            aria-pressed={filter === null}
            onClick={() => filterStore.set(null)}
          >
            Semua
          </button>
          {tags.map(([tech, n]) => (
            <button
              type="button"
              className="chip"
              key={tech}
              aria-pressed={filter === tech}
              onClick={() => filterStore.set(filter === tech ? null : tech)}
            >
              {tech}
              <span className="chip__n" aria-hidden="true">
                {n}
              </span>
            </button>
          ))}
        </div>
        <p className="explorer__count" aria-live="polite">
          <span key={visible.length} className="roll-in">{visible.length}</span> dari {projects.length} proyek
          {filter ? ` memakai ${filter}` : ""}
        </p>
      </div>

      {selected ? (
        <div className="explorer__body">
          <div
            className="tabs"
            ref={tabsRef}
            data-slab={slab ? "" : undefined}
            role="tablist"
            aria-label="Daftar proyek"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
          >
            {slab && (
              <span
                className="tabs__slab"
                aria-hidden="true"
                style={{ transform: `translateY(${slab.y}px)`, height: slab.h }}
              />
            )}
            {visible.map((p, vi) => {
              const isSelected = p.slug === selected.slug;
              return (
                <button
                  type="button"
                  role="tab"
                  key={p.slug}
                  id={`${PREFIX}${p.slug}`}
                  className="tab"
                  data-reveal="tab"
                  style={{ "--i": vi } as React.CSSProperties}
                  aria-selected={isSelected}
                  aria-controls="project-panel"
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => select(p.slug)}
                >
                  <span className="tab__idx" aria-hidden="true">
                    {String(projects.indexOf(p) + 1).padStart(2, "0")}
                  </span>
                  <span className="tab__title">{p.title}</span>
                  <span className="tab__year">{p.year}</span>
                </button>
              );
            })}
          </div>

          <div
            className="detail"
            role="tabpanel"
            id="project-panel"
            aria-labelledby={`${PREFIX}${selected.slug}`}
            key={selected.slug}
          >
            <h3 className="detail__title">
              <span className="mask">
                <span className="mask__in">{selected.title}</span>
              </span>
            </h3>
            <p className="detail__summary" style={{ "--i": 1 } as React.CSSProperties}>{selected.summary}</p>

            <dl className="detail__meta" style={{ "--i": 2 } as React.CSSProperties}>
              <div>
                <dt>Peran</dt>
                <dd>{selected.role}</dd>
              </div>
              <div>
                <dt>Stack</dt>
                <dd className="detail__stack">{selected.stack.join(", ")}</dd>
              </div>
            </dl>

            {selected.highlights.length > 0 && (
              <ul className="detail__points" style={{ "--i": 3 } as React.CSSProperties}>
                {selected.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}

            {selected.snippet && (
              <figure className="snippet" style={{ "--i": 4 } as React.CSSProperties}>
                <figcaption className="snippet__bar">
                  <span className="snippet__file">{selected.snippet.file}</span>
                  <CopyButton
                    className="snippet__copy"
                    text={selected.snippet.code}
                    label="Salin kode"
                  />
                </figcaption>
                <pre className="code" tabIndex={0} aria-label={`Kode dari ${selected.snippet.file}`}>
                  <code>
                    {lines.map((line, i) => (
                      <span className="code__line" key={i} style={{ "--l": Math.min(i, 16) } as React.CSSProperties}>
                        {line}
                      </span>
                    ))}
                  </code>
                </pre>
              </figure>
            )}

            {(selected.repo || selected.demo) && (
              <ul className="detail__links" style={{ "--i": 5 } as React.CSSProperties}>
                {selected.repo && (
                  <li>
                    <a href={selected.repo} target="_blank" rel="noopener noreferrer">
                      Kode sumber<span className="visually-hidden"> (tab baru)</span>
                    </a>
                  </li>
                )}
                {selected.demo && (
                  <li>
                    <a href={selected.demo} target="_blank" rel="noopener noreferrer">
                      Demo langsung<span className="visually-hidden"> (tab baru)</span>
                    </a>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <div className="empty">
          <p>Tidak ada proyek yang memakai {filter}.</p>
          <button type="button" className="textbtn" onClick={() => filterStore.set(null)}>
            Tampilkan semua proyek
          </button>
        </div>
      )}
    </div>
  );
}
