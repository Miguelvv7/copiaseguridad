"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MQ } from "@/lib/motion";
import { capabilities } from "@/data/projects";

/**
 * Paneles apilados con pin. La versión móvil ya no es una lista estática:
 * ejecuta la misma secuencia de paneles con medidas reducidas.
 */
const CapabilitiesSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        { isDesktop: MQ.desktop, isMobile: MQ.mobile, reduce: MQ.reduced },
        (context) => {
          const { isDesktop, reduce } = context.conditions as Record<string, boolean>;
          const panels = gsap.utils.toArray<HTMLElement>(".cap-panel");
          if (!panels.length) return;

          if (reduce) {
            gsap.set(panels, { autoAlpha: 1, y: 0, position: "relative" });
            return;
          }

          gsap.set(panels.slice(1), { autoAlpha: 0, yPercent: 12 });
          gsap.set(panels[0], { autoAlpha: 1, yPercent: 0 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: `+=${panels.length * (isDesktop ? 105 : 90)}%`,
              pin: true,
              pinType: "transform",
              scrub: 0.85,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          panels.forEach((panel, i) => {
            if (i === panels.length - 1) return;
            /* Sin solape: uno se va del todo antes de que entre el siguiente.
               Cruzándose, los dos textos quedaban encima el uno del otro. */
            tl.to(panel, { autoAlpha: 0, yPercent: -10, duration: 0.45, ease: "power2.in" }, "+=0.45")
              .to(
                panels[i + 1],
                { autoAlpha: 1, yPercent: 0, duration: 0.55, ease: "power2.out" },
                "+=0.05"
              );
          });

          gsap.to(".cap-progress-bar", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: `+=${panels.length * (isDesktop ? 105 : 90)}%`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }
      );

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="capabilities-section">
      <header className="cap-header">
        <span className="cap-label">Qué hago</span>
        <div className="cap-progress-track">
          <div className="cap-progress-bar" />
        </div>
        <span className="cap-count">/ {String(capabilities.length).padStart(2, "0")}</span>
      </header>

      {capabilities.map((cap, i) => (
        <section
          key={cap.num}
          className="cap-panel"
          style={i > 0 ? { opacity: 0, visibility: "hidden" } : undefined}
        >
          <span className="cap-bg-num" aria-hidden>
            {cap.num}
          </span>

          <div className="cap-panel-inner">
            <div className="cap-title-block">
              <p className="cap-kicker">{cap.kicker}</p>
              <h2 className="cap-title">{cap.title}</h2>
            </div>

            <div className="cap-info-block">
              <p className="cap-desc">{cap.desc}</p>
              <ul className="cap-items">
                {cap.items.map((item) => (
                  <li key={item}>
                    <span aria-hidden>▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="cap-panel-line" />
        </section>
      ))}
    </div>
  );
};

export default CapabilitiesSection;
