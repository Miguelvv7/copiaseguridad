"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, MQ, splitChars, revealOnView } from "@/lib/motion";
import { projects, statusLabel } from "@/data/projects";

/**
 * Índice tipo archivo. En escritorio la portada sigue al cursor;
 * en móvil cada fila revela su propia miniatura al entrar en pantalla.
 */
const ProjectIndexSection = () => {
  const ref = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [montado, setMontado] = useState(false);

  /* La vista previa se pinta en <body>, fuera de #smooth-content: dentro de un
     elemento con transform, `position: fixed` deja de referirse a la ventana y
     la miniatura se iba a miles de píxeles de distancia. */
  useEffect(() => setMontado(true), []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const raiz = ref.current;
        const q = (sel: string) => raiz?.querySelectorAll(sel);
        const limpiezas: Array<() => void> = [];

        const split = splitChars(".idx-title");
        if (split) {
          limpiezas.push(
            revealOnView(
              raiz?.querySelector(".idx-head"),
              split.chars,
              { yPercent: 115, opacity: 0 },
              { duration: 0.75, ease: "expo.out" },
              { stagger: 0.02 }
            )
          );
        }

        limpiezas.push(
          revealOnView(
            raiz?.querySelector(".idx-list"),
            q(".idx-line"),
            { scaleX: 0, transformOrigin: "left" },
            { duration: 0.8 },
            { stagger: 0.08 }
          )
        );

        limpiezas.push(
          revealOnView(
            raiz?.querySelector(".idx-list"),
            q(".idx-row-inner"),
            { yPercent: 60, opacity: 0 },
            { duration: 0.7 },
            { stagger: 0.09 }
          )
        );

        gsap.to(".idx-watermark", {
          xPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        return () => {
          limpiezas.forEach((fn) => fn());
          split?.revert();
        };
      });

      /* Vista previa que sigue al puntero — solo con ratón */
      mm.add("(pointer: fine) and (min-width: 900px)", () => {
        const preview = previewRef.current;
        if (!preview) return;

        const setX = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3" });
        const setY = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3" });
        const rows = gsap.utils.toArray<HTMLElement>(".idx-row");

        const onMove = (e: MouseEvent) => {
          setX(e.clientX + 28);
          setY(e.clientY - 110);
        };

        const cleanups = rows.map((row) => {
          const index = Number(row.dataset.index ?? 0);
          const enter = () => {
            gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power3.out" });
            /* preview vive en <body>, así que se consulta desde él y no por
               selector con ámbito, que solo mira dentro de la sección */
            gsap.to(preview.querySelectorAll(".idx-preview-img"), {
              autoAlpha: 0,
              duration: 0.2,
            });
            const activa = preview.querySelector(`.idx-preview-img-${index}`);
            if (activa) gsap.to(activa, { autoAlpha: 1, duration: 0.25 });
          };
          const leave = () =>
            gsap.to(preview, { autoAlpha: 0, scale: 0.9, duration: 0.3, ease: "power2.out" });

          row.addEventListener("mouseenter", enter);
          row.addEventListener("mouseleave", leave);
          return () => {
            row.removeEventListener("mouseenter", enter);
            row.removeEventListener("mouseleave", leave);
          };
        });

        window.addEventListener("mousemove", onMove, { passive: true });

        return () => {
          window.removeEventListener("mousemove", onMove);
          cleanups.forEach((fn) => fn());
        };
      });

      /* Miniatura inline en móvil */
      mm.add(`${MQ.mobile} and ${MQ.motion}`, () => {
        const limpiezas: Array<() => void> = [];
        ref.current?.querySelectorAll<HTMLElement>(".idx-row-thumb").forEach((thumb) => {
          limpiezas.push(
            revealOnView(
              thumb,
              thumb,
              { clipPath: "inset(0 100% 0 0)" },
              { duration: 0.8, ease: "expo.out" },
              { stagger: 0 }
            )
          );
          gsap.fromTo(
            thumb.querySelector("img"),
            { scale: 1.25 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: thumb, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });
        return () => limpiezas.forEach((fn) => fn());
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [montado] }
  );

  return (
    <section ref={ref} className="index-section">
      <h2 className="idx-watermark" aria-hidden>
        ARCHIVO
      </h2>

      <div className="idx-inner">
        <div className="idx-head">
          <p className="idx-eyebrow">Los cuatro</p>
          <div style={{ overflow: "hidden" }}>
            <h2 className="idx-title">Todo lo que hay</h2>
          </div>
        </div>

        <div className="idx-list">
          {projects.map((project, i) => (
            <div key={project.slug}>
              <div className="idx-line" />
              <Link
                href={`/proyectos/${project.slug}`}
                className="idx-row"
                data-index={i}
              >
                <div className="idx-row-inner">
                  <span className="idx-row-num">{String(i + 1).padStart(2, "0")}</span>

                  <div className="idx-row-main">
                    <h3 className="idx-row-title">{project.title}</h3>
                    <p className="idx-row-tagline">{project.tagline}</p>
                    <p className="idx-row-goal">{project.goal}</p>

                    <div className="idx-row-thumb">
                      <Image
                        src={project.cover}
                        alt={project.title}
                        fill
                        sizes="90vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>

                  <div className="idx-row-meta">
                    <span className="idx-row-cat" style={{ color: project.accent }}>
                      {project.category}
                    </span>
                    <span className="idx-row-year">{project.year}</span>
                    <span className="idx-row-status">{statusLabel[project.status]}</span>
                  </div>

                  <span className="idx-row-arrow" aria-hidden>
                    →
                  </span>
                </div>
              </Link>
            </div>
          ))}
          <div className="idx-line" />
        </div>
      </div>

      {montado &&
        createPortal(
          <div ref={previewRef} className="idx-preview" aria-hidden>
            {projects.map((project, i) => (
              <Image
                key={project.slug}
                src={project.cover}
                alt=""
                fill
                sizes="340px"
                className={`idx-preview-img idx-preview-img-${i}`}
                style={{ objectFit: "cover" }}
              />
            ))}
          </div>,
          document.body
        )}
    </section>
  );
};

export default ProjectIndexSection;
