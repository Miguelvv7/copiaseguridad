"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import FooterSection from "@/sections/FooterSection";
import { gsap, MQ, splitChars, scramble, revealOnView, ScrollSmoother } from "@/lib/motion";
import { projects, personalProjects, statusLabel } from "@/data/projects";

export default function ProyectosPage() {
  const ref = useRef<HTMLDivElement>(null);

  /* Enlaces a /proyectos#retos: con ScrollSmoother el salto nativo al ancla
     no funciona, así que se hace a mano cuando ya se ha subido arriba del todo
     y están medidas las secciones. */
  useEffect(() => {
    if (window.location.hash !== "#retos") return;
    const id = window.setTimeout(() => {
      const destino = document.getElementById("retos");
      if (!destino) return;
      const smoother = ScrollSmoother.get();
      if (smoother) smoother.scrollTo(destino, true, "top 70px");
      else destino.scrollIntoView({ behavior: "smooth" });
    }, 700);
    return () => window.clearTimeout(id);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, isDesktop: MQ.desktop }, (context) => {
        const { motion, isDesktop } = context.conditions as Record<string, boolean>;
        if (!motion) return;
        const split = splitChars(".archive-title");
        if (split) {
          gsap.from(split.chars, {
            yPercent: 118,
            opacity: 0,
            stagger: 0.02,
            duration: 0.9,
            delay: 0.25,
            ease: "expo.out",
            onComplete: () => {
              scramble(split.chars);
            },
          });
        }

        gsap.fromTo(
          ".archive-eyebrow",
          { clipPath: "inset(0 100% 0 0)", opacity: 1 },
          { clipPath: "inset(0 0% 0 0)", duration: 0.8, delay: 0.15, ease: "power3.out" }
        );

        gsap.from(".archive-meta > *", {
          opacity: 0,
          y: 14,
          stagger: 0.08,
          duration: 0.6,
          delay: 0.5,
          ease: "power2.out",
        });

        /* Tarjetas: entrada por columnas con máscara */
        const limpiezas: Array<() => void> = [];
        gsap.utils.toArray<HTMLElement>(".archive-card, .reto-card").forEach((card, i) => {
          limpiezas.push(
            revealOnView(
              card,
              card,
              { yPercent: 14, opacity: 0, clipPath: "inset(0 0 100% 0)" },
              { duration: 0.9, ease: "expo.out", delay: (i % 2) * 0.08 },
              { stagger: 0 }
            )
          );

          /* En el móvil la foto se queda quieta y entera */
          const img = card.querySelector(".archive-card-img, .reto-card-img");
          if (img && isDesktop) {
            gsap.fromTo(
              img,
              { yPercent: -8, scale: 1.16 },
              {
                yPercent: 8,
                scale: 1.04,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          }
        });

        const raiz = ref.current;
        limpiezas.push(
          revealOnView(
            raiz?.querySelector(".retos-head"),
            raiz?.querySelectorAll(".retos-head > *"),
            { opacity: 0, y: 24 },
            { duration: 0.7 },
            { stagger: 0.08 }
          )
        );

        gsap.to(".archive-hero", {
          yPercent: 16,
          opacity: 0.25,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".archive-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        return () => {
          limpiezas.forEach((fn) => fn());
          split?.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <main ref={ref}>
        <section className="archive-hero">
          <div className="hero-grid-bg" />
          <p className="archive-eyebrow" style={{ clipPath: "inset(0 100% 0 0)" }}>
            Archivo · {projects.length} proyectos · {personalProjects.length}{" "}
            {personalProjects.length === 1 ? "reto" : "retos"}
          </p>
          <div style={{ overflow: "hidden" }}>
            <h1 className="archive-title">Trabajo</h1>
          </div>
          <div className="archive-meta">
            <p>Tiendas, interfaces y automatizaciones construidas de principio a fin.</p>
            <p>Cada ficha explica qué había, qué hice y con qué.</p>
          </div>
        </section>

        <section className="archive-grid">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/proyectos/${project.slug}`}
              className="archive-card"
            >
              <div className="archive-card-media">
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  sizes="(max-width: 899px) 92vw, 46vw"
                  className="archive-card-img"
                />
                <span
                  className="archive-card-status"
                  style={{ borderColor: project.accent, color: project.accent }}
                >
                  {statusLabel[project.status]}
                </span>
              </div>

              <div className="archive-card-body">
                <span className="archive-card-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="archive-card-title">{project.title}</h2>
                  <p className="archive-card-tagline">{project.tagline}</p>
                  <p className="archive-card-goal">{project.goal}</p>
                  <ul className="archive-card-stack">
                    {project.stack.slice(0, 4).map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <span className="archive-card-arrow" aria-hidden>
                  →
                </span>
              </div>
            </Link>
          ))}
        </section>

        {personalProjects.length > 0 && (
          <section id="retos" className="retos">
            <header className="retos-head">
              <p className="retos-eyebrow">Fuera de clientes</p>
              <h2 className="retos-title">Retos personales</h2>
              <p className="retos-intro">
                Proyectos que me propuse para aprender o para resolver algo concreto. Alguno
                llegó a usarse; ninguno es un encargo en marcha.
              </p>
            </header>

            <div className="retos-list">
              {personalProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/proyectos/${project.slug}`}
                  className="reto-card"
                  style={{ ["--accent" as string]: project.accent }}
                >
                  <div className="reto-card-media">
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      sizes="(max-width: 899px) 92vw, 40vw"
                      className="reto-card-img"
                    />
                  </div>

                  <div className="reto-card-body">
                    <p className="reto-card-meta">
                      {project.category} · {project.year} · {statusLabel[project.status]}
                    </p>
                    <h3 className="reto-card-title">{project.title}</h3>
                    <p className="reto-card-tagline">{project.tagline}</p>
                    <p className="reto-card-goal">{project.goal}</p>
                    <ul className="archive-card-stack">
                      {project.stack.slice(0, 5).map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                    <span className="reto-card-cta">
                      Ver el reto <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="archive-cta">
          <div>
            <p className="archive-cta-eyebrow">Hueco libre</p>
            <h3 className="archive-cta-title">Tu proyecto, el siguiente</h3>
          </div>
          <a href="mailto:miguelvictorio72@gmail.com" className="archive-cta-btn">
            Hablamos <span aria-hidden>→</span>
          </a>
        </section>

        <FooterSection />
    </main>
  );
}
