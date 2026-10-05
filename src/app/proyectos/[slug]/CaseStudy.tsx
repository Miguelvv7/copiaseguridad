"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import FooterSection from "@/sections/FooterSection";
import { gsap, MQ, splitChars, splitLines, scramble, revealOnView } from "@/lib/motion";
import { statusLabel, type Project } from "@/data/projects";

interface CaseStudyProps {
  project: Project;
  next: Project;
}

export default function CaseStudy({ project, next }: CaseStudyProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const limpiezas: Array<() => void> = [];
        const title = splitChars(".cs-title");
        const summary = splitLines(".cs-summary p");

        const tl = gsap.timeline({ delay: 0.2 });

        tl.fromTo(
          ".cs-eyebrow",
          { clipPath: "inset(0 100% 0 0)", opacity: 1 },
          { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power3.out" }
        );

        if (title) {
          tl.from(
            title.chars,
            {
              yPercent: 118,
              opacity: 0,
              stagger: 0.02,
              duration: 0.85,
              ease: "expo.out",
              onComplete: () => {
                scramble(title.chars);
              },
            },
            "-=0.45"
          );
        }

        tl.from(
          ".cs-tagline",
          { yPercent: 100, opacity: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        )
          .from(
            ".cs-fact",
            { opacity: 0, y: 18, stagger: 0.08, duration: 0.55, ease: "power2.out" },
            "-=0.35"
          )
          .fromTo(
            ".cs-cover",
            { clipPath: "inset(12% 8% 12% 8%)", scale: 1.12 },
            { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.2, ease: "expo.out" },
            "-=0.6"
          );

        /* Parallax de la portada */
        gsap.to(".cs-cover img", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: ".cs-cover",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        const raiz = ref.current;
        const q = (sel: string) => raiz?.querySelector(sel);
        const qs = (sel: string) => raiz?.querySelectorAll(sel);

        if (summary) {
          limpiezas.push(
            revealOnView(q(".cs-summary"), summary.lines,
              { yPercent: 110, opacity: 0 },
              { duration: 0.8, ease: "expo.out" }, { stagger: 0.08 })
          );
        }

        const goal = splitLines(".cs-goal-text");
        if (goal) {
          limpiezas.push(
            revealOnView(q(".cs-goal"), goal.lines,
              { yPercent: 110, opacity: 0 },
              { duration: 0.85, ease: "expo.out" }, { stagger: 0.07 })
          );
        }

        limpiezas.push(
          revealOnView(q(".cs-goal"), q(".cs-context"),
            { opacity: 0, y: 22 }, { duration: 0.7, delay: 0.25 })
        );

        limpiezas.push(
          revealOnView(q(".cs-outcome"), q(".cs-outcome"),
            { opacity: 0, y: 26 }, { duration: 0.7 })
        );

        limpiezas.push(
          revealOnView(q(".cs-specs"), qs(".cs-spec-row"),
            { opacity: 0, x: -20 }, { duration: 0.6 }, { stagger: 0.07 })
        );

        limpiezas.push(
          revealOnView(q(".cs-stack"), qs(".cs-chip"),
            { opacity: 0, scale: 0.85, y: 10 },
            { duration: 0.45, ease: "back.out(1.7)" }, { stagger: 0.04 })
        );

        limpiezas.push(
          revealOnView(q(".cs-highlights"), qs(".cs-highlight"),
            { opacity: 0, y: 26 }, { duration: 0.65 }, { stagger: 0.09 })
        );

        raiz?.querySelectorAll<HTMLElement>(".cs-shot").forEach((shot) => {
          limpiezas.push(
            revealOnView(shot, shot,
              { clipPath: "inset(0 0 100% 0)" },
              { duration: 1, ease: "expo.out" }, { stagger: 0 })
          );
          gsap.fromTo(
            shot.querySelector("img"),
            { scale: 1.2 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: shot, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });

        limpiezas.push(
          revealOnView(q(".cs-gallery-note"), q(".cs-gallery-note"),
            { opacity: 0, y: 16 }, { duration: 0.6 })
        );

        const nextTitle = splitChars(".cs-next-title");
        if (nextTitle) {
          limpiezas.push(
            revealOnView(q(".cs-next"), nextTitle.chars,
              { yPercent: 115, opacity: 0 },
              { duration: 0.8, ease: "expo.out" }, { stagger: 0.02 })
          );
        }

        return () => {
          limpiezas.forEach((fn) => fn());
          title?.revert();
          summary?.revert();
          goal?.revert();
          nextTitle?.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [project.slug] }
  );

  return (
    <main ref={ref} style={{ ["--accent" as string]: project.accent }}>
        <article className="case-study">
          <header className="cs-hero">
            <div className="hero-grid-bg" />
            <p className="cs-eyebrow" style={{ clipPath: "inset(0 100% 0 0)" }}>
              <Link href="/proyectos">Proyectos</Link>
              <span aria-hidden> / </span>
              {project.category}
            </p>

            <div style={{ overflow: "hidden" }}>
              <h1 className="cs-title">{project.title}</h1>
            </div>

            <div style={{ overflow: "hidden" }}>
              <p className="cs-tagline">{project.tagline}</p>
            </div>

            {project.facts && (
              <div className="cs-facts">
                {project.facts.map((f) => (
                  <div key={f.label} className="cs-fact">
                    <span className="cs-fact-value">{f.value}</span>
                    <span className="cs-fact-label">{f.label}</span>
                  </div>
                ))}
              </div>
            )}
          </header>

          <div className="cs-cover">
            <Image
              src={project.cover}
              alt={`Portada del proyecto ${project.title}`}
              fill
              sizes="100vw"
              priority
              style={{ objectFit: "cover" }}
            />
          </div>

          <section className="cs-goal">
            <p className="cs-section-label">Finalidad</p>
            <p className="cs-goal-text">{project.goal}</p>
            <p className="cs-context">{project.context}</p>
          </section>

          <section className="cs-body">
            <div className="cs-summary">
              {project.summary.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <aside className="cs-specs">
              {[
                { label: "Cliente", value: project.client ?? "Proyecto propio" },
                { label: "Rol", value: project.role },
                { label: "Fecha", value: project.date ?? String(project.year) },
                { label: "Lugar", value: project.location },
                { label: "Estado", value: statusLabel[project.status] },
              ].map((row) => (
                <div key={row.label} className="cs-spec-row">
                  <span>{row.label}</span>
                  <span>{row.value}</span>
                </div>
              ))}

              <div className="cs-stack">
                {project.stack.map((s) => (
                  <span key={s} className="cs-chip">
                    {s}
                  </span>
                ))}
              </div>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-visit"
                >
                  Visitar web <span aria-hidden>→</span>
                </a>
              )}
              {!project.liveUrl && !project.repoUrl && (
                <p className="cs-private">
                  Aplicación privada con cuentas de usuario: no hay demo pública.
                </p>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-visit cs-visit-ghost"
                >
                  Ver código <span aria-hidden>→</span>
                </a>
              )}
            </aside>
          </section>

          <section className="cs-highlights">
            <p className="cs-section-label">Qué construí</p>
            <ul>
              {project.highlights.map((item, i) => (
                <li key={i} className="cs-highlight">
                  <span className="cs-highlight-num">{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="cs-outcome">
              <p className="cs-section-label">Resultado</p>
              <p>{project.outcome}</p>
            </div>
          </section>

          {project.gallery && project.gallery.length > 0 && (
            <section className="cs-gallery">
              {project.gallery.map((src) => (
                <div key={src} className="cs-shot">
                  <Image
                    src={src}
                    alt={`Captura de ${project.title}`}
                    width={1600}
                    height={1000}
                    sizes="(max-width: 899px) 92vw, 78vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              ))}
              {project.galleryNote && (
                <p className="cs-gallery-note">{project.galleryNote}</p>
              )}
            </section>
          )}

          <Link href={`/proyectos/${next.slug}`} className="cs-next">
            <p className="cs-section-label">Siguiente proyecto</p>
            <div style={{ overflow: "hidden" }}>
              <h2 className="cs-next-title">{next.title}</h2>
            </div>
            <span className="cs-next-tagline">{next.tagline}</span>
          </Link>
        </article>

        <FooterSection />
    </main>
  );
}
