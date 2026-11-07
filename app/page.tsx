import Image from "next/image";
import { Chrome } from "@/components/chrome";
import { CopyButton } from "@/components/copy-button";
import { HeroName } from "@/components/hero-name";
import { Motion } from "@/components/motion";
import { Roll } from "@/components/roll";
import { ProjectExplorer } from "@/components/project-explorer";
import { StackList } from "@/components/stack-list";
import { about, education, experience, links, projects, sections, site, stack } from "@/data/portfolio";

const sec: Record<string, { label: string; idx: string }> = {};
sections.forEach((s, i) => {
  sec[s.id] = { label: s.label, idx: String(i + 1).padStart(2, "0") };
});

const counts: Record<string, number> = {};
for (const p of projects) {
  for (const tech of p.stack) counts[tech] = (counts[tech] ?? 0) + 1;
}

function SectionHead({ id }: { id: string }) {
  return (
    <div className="section__head" data-reveal="head">
      <span className="section__idx" aria-hidden="true">
        {sec[id].idx}
      </span>
      <h2 id={`${id}-title`} className="section__title">
        <span className="mask">
          <span className="mask__in">{sec[id].label}</span>
        </span>
      </h2>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">
        Lewati ke konten
      </a>

      {site.isTemplate && (
        <p className="template-note" role="note">
          Konten contoh. Ganti isi <code>data/portfolio.ts</code>, lalu set{" "}
          <code>site.isTemplate</code> ke <code>false</code> untuk menghapus catatan ini.
        </p>
      )}

      <Motion />
      <Chrome
        name={site.name}
        email={site.email}
        sections={sections}
        projects={projects.map((p) => ({ slug: p.slug, title: p.title }))}
        links={links}
      />

      <main id="main" tabIndex={-1}>
        <section id="top" className="hero" aria-label="Perkenalan">
          <div className="wrap hero__row">
            <div className="hero__main">
              <h1 className="hero__name">
                <HeroName name={site.name} />
              </h1>
              <p className="hero__headline">{site.headline}</p>
              <div className="hero__actions">
                <a className="btn" href="#projects">
                  <Roll text="Lihat proyek" />
                </a>
                <a className="textlink" href={`mailto:${site.email}`}>
                  Kirim email
                </a>
              </div>
            </div>
            <dl className="spec">
              {site.facts.map((f, i) => (
                <div className="spec__row" key={f.label} style={{ "--i": i } as React.CSSProperties}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="about" className="section section--about" aria-labelledby="about-title">
          <div className="wrap">
            <SectionHead id="about" />
            <div className="about">
              <div className="about__photo" data-reveal="" style={{ "--i": 0 } as React.CSSProperties}>
                <Image
                  src="/profile.png"
                  alt={site.name}
                  fill
                  sizes="16rem"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="about__text">
                {about.map((p, i) => (
                  <p className="about__p" key={i} data-reveal="" style={{ "--i": i + 1 } as React.CSSProperties}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section section--projects" aria-labelledby="projects-title">
          <div className="wrap">
            <SectionHead id="projects" />
            <ProjectExplorer projects={projects} />
          </div>
        </section>

        <section id="stack" className="section section--stack" aria-labelledby="stack-title">
          <div className="wrap">
            <SectionHead id="stack" />
            <StackList groups={stack} counts={counts} />
          </div>
        </section>

        <section id="experience" className="section section--experience" aria-labelledby="experience-title">
          <div className="wrap">
            <SectionHead id="experience" />
            <ol className="timeline">
              {experience.map((e, ei) => (
                <li className="timeline__row" key={`${e.org}-${e.period}`} data-reveal="row" style={{ "--i": ei } as React.CSSProperties}>
                  <p className="timeline__period">{e.period}</p>
                  <div>
                    <h3 className="timeline__role">
                      {e.role}, <span className="timeline__org">{e.org}</span>
                    </h3>
                    <ul className="timeline__points">
                      {e.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="education" className="section section--education" aria-labelledby="education-title">
          <div className="wrap">
            <SectionHead id="education" />
            <ol className="timeline">
              {education.map((e, ei) => (
                <li className="timeline__row" key={`${e.org}-${e.period}`} data-reveal="row" style={{ "--i": ei } as React.CSSProperties}>
                  <p className="timeline__period">{e.period}</p>
                  <div>
                    <h3 className="timeline__role">
                      {e.role}, <span className="timeline__org">{e.org}</span>
                    </h3>
                    <ul className="timeline__points">
                      {e.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contact" className="section section--contact" data-reveal="slab" aria-labelledby="contact-title">
          <div className="wrap">
            <SectionHead id="contact" />
            <p className="contact__note" data-reveal style={{ "--i": 1 } as React.CSSProperties}>{site.contactNote}</p>
            <p data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              <a className="contact__email" href={`mailto:${site.email}`}>
                <Roll text={site.email} each />
              </a>
            </p>
            <div className="contact__actions" data-reveal style={{ "--i": 3 } as React.CSSProperties}>
              <CopyButton className="btn btn--quiet" text={site.email} label="Salin email" />
              <ul className="contact__links">
                {links.map((l) => (
                  <li key={l.label}>
                    <a className="textlink" href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.label}
                      <span className="visually-hidden"> (tab baru)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer__row">
          <p>{site.name}</p>
          <a className="textlink" href="#top">
            Kembali ke atas
          </a>
        </div>
      </footer>
    </>
  );
}
