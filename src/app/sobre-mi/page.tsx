"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import FooterSection from "@/sections/FooterSection";
import { gsap, MQ, splitChars, splitLines, scramble, revealOnView } from "@/lib/motion";
import { porqueYo, steps, stack, noHago, sectors } from "@/data/projects";

const BIO = [
  "Me llamo Miguel Victorio, tengo 21 años y vivo en Écija, Sevilla.",
  "No vengo de una carrera de informática — el curso lo empiezo ahora. Empecé haciendo una web para un amigo, luego otra para alguien que me escribió, y de ahí no he parado. Hoy hay cuatro negocios funcionando con cosas que he montado yo.",
  "La IA es mi herramienta principal y no lo escondo: es lo que me permite abrir proyectos que hace un año ni habría intentado. Lo que sí pongo yo son las horas, las ganas de que quede bien y la cara cuando algo hay que arreglarlo.",
  "Trabajo solo y de principio a fin: hablo contigo, lo monto, lo publicamos y sigo estando después. Y si me pides algo que no sé hacer, te lo digo antes de empezar.",
];

export default function SobreMi() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const limpiezas: Array<() => void> = [];
        const title = splitChars(".ab-title");
        const tl = gsap.timeline({ delay: 0.2 });

        tl.fromTo(
          ".ab-eyebrow",
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
              duration: 0.9,
              ease: "expo.out",
              onComplete: () => {
                scramble(title.chars);
              },
            },
            "-=0.45"
          );
        }

        tl.fromTo(
          ".ab-avatar",
          { clipPath: "inset(0 0 100% 0)", scale: 1.15 },
          { clipPath: "inset(0 0 0% 0)", scale: 1, duration: 1.1, ease: "expo.out" },
          "-=0.5"
        ).from(
          ".ab-hero-meta > *",
          { opacity: 0, y: 16, stagger: 0.08, duration: 0.6, ease: "power2.out" },
          "-=0.7"
        );

        /* El avatar flota y hace parallax */
        gsap.to(".ab-avatar", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: ".ab-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        /* Bio: las líneas se encienden con el scroll */
        const bio = splitLines(".ab-bio p");
        if (bio) {
          gsap.fromTo(
            bio.lines,
            { opacity: 0.14 },
            {
              opacity: 1,
              stagger: 0.35,
              ease: "none",
              scrollTrigger: {
                trigger: ".ab-bio",
                start: "top 78%",
                end: "bottom 62%",
                scrub: true,
              },
            }
          );
        }

        const raiz = ref.current;
        const q = (sel: string) => raiz?.querySelector(sel);
        const qs = (sel: string) => raiz?.querySelectorAll(sel);

        limpiezas.push(
          revealOnView(q(".ab-stack"), qs(".ab-chip"),
            { opacity: 0, y: 14, scale: 0.9 },
            { duration: 0.45, ease: "back.out(1.7)" }, { stagger: 0.025 })
        );

        limpiezas.push(
          revealOnView(q(".ab-principles"), qs(".ab-principle"),
            { opacity: 0, y: 34 }, { duration: 0.75 }, { stagger: 0.1 })
        );

        limpiezas.push(
          revealOnView(q(".ab-process"), qs(".ab-step"),
            { opacity: 0, x: -26 }, { duration: 0.7 }, { stagger: 0.12 })
        );

        limpiezas.push(
          revealOnView(q(".ab-process"), qs(".ab-line"),
            { scaleX: 0, transformOrigin: "left" }, { duration: 0.9 }, { stagger: 0.08 })
        );

        limpiezas.push(
          revealOnView(q(".ab-limits"), qs(".ab-limit"),
            { opacity: 0, y: 20 }, { duration: 0.6 }, { stagger: 0.09 })
        );

        gsap.to(".ab-watermark", {
          xPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: ".ab-principles",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        return () => {
          limpiezas.forEach((fn) => fn());
          title?.revert();
          bio?.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <main ref={ref}>
        <section className="ab-hero">
          <div className="hero-grid-bg" />

          <div className="ab-hero-text">
            <p className="ab-eyebrow" style={{ clipPath: "inset(0 100% 0 0)" }}>
              Sobre mí
            </p>
            <div style={{ overflow: "hidden" }}>
              <h1 className="ab-title">
                Soy
                <br />
                Miguel
              </h1>
            </div>
            <div className="ab-hero-meta">
              <p>21 años · Écija, Sevilla</p>
              <p>Tiendas, webs y automatizaciones</p>
              <a href="mailto:miguelvictorio72@gmail.com" className="ab-hero-cta">
                Hablemos <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          <div className="ab-avatar">
            <Image
              src="/images/miguel-avatar.png"
              alt="Miguel Victorio"
              width={520}
              height={620}
              priority
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </div>
        </section>

        <section className="ab-bio">
          {BIO.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </section>

        <section className="ab-stack">
          <p className="ab-label">Con lo que me manejo</p>
          <div className="ab-chips">
            {stack.map((item) => (
              <span key={item} className="ab-chip">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="ab-principles">
          <h2 className="ab-watermark" aria-hidden>
            CÓMO TRABAJO
          </h2>
          <div className="ab-principles-inner">
            <p className="ab-label">Cómo trabajo</p>
            <div className="ab-principles-grid">
              {porqueYo.map((item) => (
                <article key={item.num} className="ab-principle">
                  <span className="ab-principle-num">{item.num}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ab-process">
          <p className="ab-label">El proceso</p>
          {steps.map((step) => (
            <div key={step.num}>
              <div className="ab-line" />
              <div className="ab-step">
                <span className="ab-step-num">{step.num}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="ab-line" />
        </section>

        <section className="ab-limits">
          <div>
            <p className="ab-label">Para quién trabajo bien</p>
            <ul>
              {sectors.map((s) => (
                <li key={s} className="ab-limit">
                  <span aria-hidden>▸</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="ab-label">Lo que no hago</p>
            <ul>
              {noHago.map((s) => (
                <li key={s} className="ab-limit ab-limit-no">
                  <span aria-hidden>✕</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="ab-cta">
          <h2>¿Te cuento cómo lo haría?</h2>
          <div className="ab-cta-actions">
            <Link href="/proyectos" className="ab-cta-btn">
              Ver trabajo <span aria-hidden>→</span>
            </Link>
            <Link href="/contacto" className="ab-cta-btn ab-cta-btn-ghost">
              Contacto <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        <FooterSection />
    </main>
  );
}
