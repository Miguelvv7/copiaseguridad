"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, MQ, ScrollTrigger, splitChars, revealOnView } from "@/lib/motion";
import { featuredProjects, statusLabel } from "@/data/projects";

/**
 * Galería horizontal con pin. Antes solo existía en escritorio;
 * ahora se ejecuta también en móvil con medidas adaptadas.
 */
const ShowcaseSection = () => {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        { isDesktop: MQ.desktop, isMobile: MQ.mobile, reduce: MQ.reduced },
        (context) => {
          const { isDesktop, reduce } = context.conditions as Record<string, boolean>;
          const track = trackRef.current;
          const section = ref.current;
          if (!track || !section || reduce) return;

          const distance = () => track.scrollWidth - window.innerWidth;
          const seguros: number[] = [];

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance() + window.innerHeight * 0.6}`,
              pin: true,
              scrub: isDesktop ? 0.8 : 0.5,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to(track, { x: () => -distance(), ease: "none" });

          /* Barra y contador siguen el mismo recorrido */
          gsap.to(".sc-progress-bar", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance() + window.innerHeight * 0.6}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          /* Parallax interno: la imagen se mueve dentro de la card */
          gsap.utils.toArray<HTMLElement>(".sc-card").forEach((card) => {
            const img = card.querySelector(".sc-card-img");
            if (!img) return;
            gsap.fromTo(
              img,
              { xPercent: isDesktop ? -8 : -5, scale: 1.14 },
              {
                xPercent: isDesktop ? 8 : 5,
                scale: 1.02,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: tl,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              }
            );

            /* Esta sí necesita ScrollTrigger: el recorrido es horizontal
               dentro de la sección con pin, y eso solo lo sabe la timeline. */
            const textos = card.querySelectorAll<HTMLElement>(".sc-card-reveal");
            gsap.set(textos, { yPercent: 60, opacity: 0 });

            const mostrar = () =>
              gsap.to(textos, {
                yPercent: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.08,
                ease: "power3.out",
                overwrite: "auto",
              });

            ScrollTrigger.create({
              trigger: card,
              containerAnimation: tl,
              start: "left 78%",
              once: true,
              onEnter: mostrar,
            });

            /* Red de seguridad: si por lo que sea el disparador no llega a
               saltar, el texto de la tarjeta se muestra igualmente. */
            seguros.push(
              window.setTimeout(() => {
                if (getComputedStyle(textos[0]).opacity === "0") mostrar();
              }, 6000)
            );
          });

          return () => seguros.forEach((id) => window.clearTimeout(id));
        }
      );

      /* Título de la sección */
      mm.add(MQ.motion, () => {
        const raiz = ref.current;
        const limpiezas: Array<() => void> = [];
        const split = splitChars(".sc-title");
        if (split) {
          limpiezas.push(
            revealOnView(raiz, split.chars,
              { yPercent: 115, opacity: 0 },
              { duration: 0.8, ease: "expo.out" }, { stagger: 0.02 })
          );
        }
        limpiezas.push(
          revealOnView(raiz, raiz?.querySelector(".sc-title-badge"),
            { clipPath: "inset(0 100% 0 0)" }, { duration: 0.8, ease: "expo.out" })
        );
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
    <section ref={ref} className="showcase-section">
      <header className="sc-header">
        <div className="sc-header-left">
          <span className="sc-label">Lo que he hecho</span>
          <span className="sc-count">
            {String(featuredProjects.length).padStart(2, "0")} proyectos
          </span>
        </div>
        <div className="sc-progress-track">
          <div className="sc-progress-bar" />
        </div>
      </header>

      <div ref={trackRef} className="sc-track">
        <div className="sc-intro">
          <div style={{ overflow: "hidden" }}>
            <h2 className="sc-title">Proyectos</h2>
          </div>
          <div className="sc-title-badge">
            <span>2026</span>
          </div>
          <p className="sc-intro-note">
            <span className="solo-tactil">Desliza para recorrerlos</span>
            <span className="solo-raton">Baja para recorrerlos</span>{" "}
            <span aria-hidden>→</span>
          </p>
        </div>

        {featuredProjects.map((project, i) => (
          <article key={project.slug} className="sc-card">
            <Link href={`/proyectos/${project.slug}`} className="sc-card-link">
              <div className="sc-card-media">
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  className="sc-card-img"
                  sizes="(max-width: 899px) 84vw, 46vw"
                  priority={i === 0}
                />
                <div className="sc-card-overlay" />
                <span
                  className="sc-card-status"
                  data-status={project.status}
                  style={{ borderColor: project.accent, color: project.accent }}
                >
                  {statusLabel[project.status]}
                </span>
                <span className="sc-card-num">{String(i + 1).padStart(2, "0")}</span>
              </div>

              <div className="sc-card-info">
                <p className="sc-card-meta sc-card-reveal">
                  {project.category} · {project.year}
                </p>
                <h3 className="sc-card-title sc-card-reveal">{project.title}</h3>
                <p className="sc-card-tagline sc-card-reveal">{project.tagline}</p>
                <p className="sc-card-goal sc-card-reveal">{project.goal}</p>
                <ul className="sc-card-stack sc-card-reveal">
                  {project.stack.slice(0, 4).map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <span className="sc-card-cta sc-card-reveal">
                  Ver ficha <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </article>
        ))}

        <div className="sc-outro">
          <p className="sc-outro-eyebrow">Siguiente</p>
          <h3 className="sc-outro-title">
            El siguiente
            <br />
            puede ser
            <br />
            el tuyo.
          </h3>
          <a href="mailto:miguelvictorio72@gmail.com" className="sc-outro-cta">
            Cuéntame tu proyecto <span aria-hidden>→</span>
          </a>
          <Link href="/proyectos" className="sc-outro-link">
            Ver el archivo completo <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
