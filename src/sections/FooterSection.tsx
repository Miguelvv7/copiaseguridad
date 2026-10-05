"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, MQ, splitChars, revealOnView } from "@/lib/motion";

const EMAIL = "miguelvictorio72@gmail.com";

const LINKS = [
  { href: "/proyectos", label: "Proyectos" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" },
];

const FooterSection = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const raiz = ref.current;
        const q = (sel: string) => raiz?.querySelector(sel);
        const qs = (sel: string) => raiz?.querySelectorAll(sel);
        const limpiezas: Array<() => void> = [];

        gsap.to(".footer-watermark", {
          yPercent: -22,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        });

        limpiezas.push(
          revealOnView(raiz, q(".footer-top-line"),
            { scaleX: 0, transformOrigin: "left" }, { duration: 1 })
        );

        limpiezas.push(
          revealOnView(q(".footer-cta-block"), q(".footer-eyebrow"),
            { clipPath: "inset(0 100% 0 0)", opacity: 1 }, { duration: 0.9 })
        );

        const split = splitChars(".footer-email");
        if (split) {
          limpiezas.push(
            revealOnView(q(".footer-email"), split.chars,
              { yPercent: 110, opacity: 0 },
              { duration: 0.7, ease: "expo.out" }, { stagger: 0.018 })
          );
        }

        limpiezas.push(
          revealOnView(q(".footer-email"), q(".footer-note"),
            { opacity: 0, y: 12 }, { duration: 0.6, delay: 0.35 })
        );

        limpiezas.push(
          revealOnView(q(".footer-nav"), qs(".footer-link"),
            { opacity: 0, y: 12 }, { duration: 0.5 }, { stagger: 0.07 })
        );

        limpiezas.push(
          revealOnView(q(".footer-legal"), q(".footer-legal"),
            { opacity: 0, y: 8 }, { duration: 0.5 })
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
    <footer ref={ref} className="footer-section">
      <div className="footer-top-line" />

      <div className="footer-body">
        <h2 className="footer-watermark" aria-hidden>
          VICTORIO
        </h2>

        <div className="footer-cta-block">
          <p className="footer-eyebrow" style={{ clipPath: "inset(0 100% 0 0)" }}>
            ¿Tienes algo entre manos?
          </p>

          <div style={{ overflow: "hidden" }}>
            <a href={`mailto:${EMAIL}`} className="footer-email">
              {EMAIL} →
            </a>
          </div>

          <p className="footer-note" style={{ opacity: 0 }}>
            Escríbeme y te contesto, normalmente el mismo día
          </p>
        </div>

        <nav className="footer-nav">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="footer-link">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="footer-legal">
          <p>Miguel Victorio — Écija, Sevilla</p>
          <p>© 2026 mvictorio.es</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
