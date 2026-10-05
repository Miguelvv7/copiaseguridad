"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, splitChars, scramble, MQ } from "@/lib/motion";
import { metrics, stack } from "@/data/projects";

interface HeroSectionProps {
  triggerAnimation: boolean;
}

const TAGS = ["Shopify", "Next.js", "IA", "Automatización"];

const DESC = [
  "En mis ratos libres hago webs para amigos y para",
  "gente que me escribe porque lo necesita. La IA es mi",
  "gran aliada: con ella saco adelante proyectos que",
  "hace un año ni habría tocado.",
];

const HeroSection: React.FC<HeroSectionProps> = ({ triggerAnimation }) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!triggerAnimation) return;

      const mm = gsap.matchMedia();

      /* ── Coreografía de entrada: idéntica en móvil y escritorio ── */
      mm.add(MQ.motion, () => {
        const split = splitChars(".hero-title");
        const tl = gsap.timeline({ delay: 0.15 });

        tl.fromTo(
          ".hero-eyebrow",
          { clipPath: "inset(0 100% 0 0)", opacity: 1 },
          { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power3.out" }
        )
          .from(
            ".hero-deco-line",
            { scaleX: 0, transformOrigin: "left", duration: 0.55, ease: "power2.out" },
            "-=0.5"
          );

        if (split) {
          tl.from(
            split.chars,
            {
              yPercent: 118,
              stagger: 0.014,
              ease: "expo.out",
              duration: 0.8,
              onComplete: () => {
                scramble(split.chars);
              },
            },
            "-=0.35"
          );
        }

        tl.from(
          ".hero-desc-line",
          { yPercent: 110, stagger: 0.09, duration: 0.65, ease: "power3.out" },
          "-=0.35"
        )
          .from(
            ".hero-sector-tag",
            { opacity: 0, x: -14, stagger: 0.06, duration: 0.45, ease: "power2.out" },
            "-=0.3"
          )
          .from(
            ".hero-metrics-line",
            { scaleX: 0, transformOrigin: "left", duration: 0.5, ease: "power2.out" },
            "-=0.25"
          )
          .fromTo(
            ".hero-metrics",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
            "-=0.3"
          )
          .from(
            ".hero-cta-btn",
            { opacity: 0, y: 14, scale: 0.93, duration: 0.5, ease: "back.out(1.6)" },
            "-=0.2"
          )
          .from(
            ".hero-cta-email",
            { opacity: 0, x: 12, duration: 0.4, ease: "power2.out" },
            "-=0.3"
          )
          .from(
            ".hero-bg-word",
            { opacity: 0, scale: 0.92, duration: 1.3, ease: "power2.out" },
            "-=1.5"
          )
          .from(
            ".hero-location",
            { opacity: 0, y: 10, duration: 0.5, stagger: 0.1, ease: "power2.out" },
            "-=0.8"
          );

        /* Marquesina inferior de stack */
        gsap.to(".hero-ticker-track", {
          xPercent: -50,
          duration: 26,
          ease: "none",
          repeat: -1,
        });

        return () => {
          split?.revert();
        };
      });

      /* ── Scrub: inclinación al salir + parallax. Ahora también en móvil ── */
      mm.add(
        {
          isDesktop: MQ.desktop,
          isMobile: MQ.mobile,
          reduce: MQ.reduced,
        },
        (context) => {
          const { isDesktop, reduce } = context.conditions as Record<string, boolean>;
          if (reduce) return;

          gsap.to(".hero-inner", {
            rotate: isDesktop ? 3 : 1.5,
            scale: isDesktop ? 0.9 : 0.94,
            yPercent: isDesktop ? 18 : 10,
            opacity: 0.35,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: ref.current,
              start: "1% top",
              end: "bottom top",
              scrub: true,
            },
          });

          gsap.to(".hero-bg-word", {
            yPercent: isDesktop ? 25 : 14,
            xPercent: isDesktop ? -6 : -12,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          gsap.to(".hero-grid-bg", {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      );

      return () => mm.revert();
    },
    { dependencies: [triggerAnimation], scope: ref }
  );

  return (
    <section ref={ref} className="hero-outer">
      <div className="hero-grid-bg" />
      <div className="hero-bg-word" aria-hidden>
        MV.
      </div>
      <div className="hero-gradient-mask" />

      <div className="hero-inner">
        <div className="hero-content">
          <p className="hero-eyebrow" style={{ clipPath: "inset(0 100% 0 0)" }}>
            21 años · Écija, Sevilla · 2026
          </p>
          <div className="hero-deco-line" />

          <div style={{ overflow: "hidden", marginBottom: "1.6rem" }}>
            <h1 className="hero-title">
              Miguel
              <br />
              Victorio
            </h1>
          </div>

          <div>
            {DESC.map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <p className="hero-desc-line hero-desc">{line}</p>
              </div>
            ))}
          </div>

          <div className="hero-tags">
            {TAGS.map((s) => (
              <span key={s} className="hero-sector-tag">
                {s}
              </span>
            ))}
          </div>

          <div className="hero-metrics-line" />
          <div className="hero-metrics" style={{ opacity: 0 }}>
            {metrics.map((m) => (
              <div key={m.label} className="hero-metric-item">
                <p className="hero-metric-value">{m.value}</p>
                <p className="hero-metric-label">{m.label}</p>
              </div>
            ))}
          </div>

          <div className="hero-cta">
            <Link href="/proyectos" className="hero-cta-btn">
              Ver proyectos <span aria-hidden>→</span>
            </Link>
            <a href="mailto:miguelvictorio72@gmail.com" className="hero-cta-email">
              miguelvictorio72@gmail.com
            </a>
          </div>

          <p className="hero-location">Trabajo remoto en toda España</p>
        </div>
      </div>

      <div className="hero-ticker" aria-hidden>
        <div className="hero-ticker-track">
          {[...stack, ...stack].map((item, i) => (
            <span key={i}>
              {item}
              <i>/</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
