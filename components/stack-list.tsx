"use client";

import { filterStore } from "@/lib/store";

type Props = {
  groups: { group: string; items: string[] }[];
  /** Jumlah proyek yang memakai tiap teknologi, dihitung dari data proyek. */
  counts: Record<string, number>;
};

function showProjects(tech: string) {
  filterStore.set(tech);
  document.getElementById("projects")?.scrollIntoView();
}

export function StackList({ groups, counts }: Props) {
  return (
    <div className="stack">
      {groups.map(({ group, items }, gi) => (
        <div className="stack__row" key={group} data-reveal="row" style={{ "--i": gi } as React.CSSProperties}>
          <h3 className="stack__group">{group}</h3>
          <ul className="stack__items">
            {items.map((item) => {
              const n = counts[item] ?? 0;
              return (
                <li key={item}>
                  {n > 0 ? (
                    <button
                      type="button"
                      className="stack__item stack__item--used"
                      onClick={() => showProjects(item)}
                      aria-label={`${item}, dipakai di ${n} proyek. Tampilkan proyeknya.`}
                    >
                      {item}
                      <span className="stack__ticks" aria-hidden="true">
                        {Array.from({ length: n }, (_, t) => (
                          <i key={t} style={{ "--t": t } as React.CSSProperties} />
                        ))}
                      </span>
                    </button>
                  ) : (
                    <span className="stack__item">{item}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
