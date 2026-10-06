"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MQ, ScrollTrigger, skewOnVelocity, pauseWhenHidden } from "@/lib/motion";
import { stack } from "@/data/projects";

/**
 * Doble marquesina. El desplazamiento va con GSAP (no con CSS) para poder
 * reaccionar a la velocidad de scroll igual en ratón y en táctil.
 */
const StackMarquee = () => {
  const ref = useRef<HTMLDivElement>(null);
  const doubled = [...stack, ...stack];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const loopA = gsap.to(".mq-track-a", {
          xPercent: -50,
          duration: 24,
          ease: "none",
          repeat: -1,
        });
        const loopB = gsap.fromTo(
          ".mq-track-b",
          { xPercent: -50 },
          { xPercent: 0, duration: 30, ease: "none", repeat: -1 }
        );

        /* El scroll acelera la marquesina y la inclina ligeramente.
           Antes se creaba un tween nuevo en cada actualización de scroll
           (60 por segundo): en el iPhone eso acaba en pausas del recolector
           de basura, que se notan como tirones sueltos. Ahora un solo
           quickTo reutilizable, y vuelta a velocidad normal al parar. */
        const skew = skewOnVelocity(".mq-row", 6);

        const velocidad = { escala: 1 };
        const aplicar = () => {
          loopA.timeScale(velocidad.escala);
          loopB.timeScale(velocidad.escala);
        };
        const irA = gsap.quickTo(velocidad, "escala", {
          duration: 0.4,
          ease: "power2.out",
          onUpdate: aplicar,
        });

        const speedTrigger = ScrollTrigger.create({
          onUpdate: (self) => {
            irA(1 + Math.min(Math.abs(self.getVelocity()) / 900, 4));
          },
        });
        const alParar = () => {
          irA(1);
        };
        ScrollTrigger.addEventListener("scrollEnd", alParar);

        /* Fuera de pantalla no se anima: menos trabajo por fotograma */
        const dejarDeVigilar = pauseWhenHidden(ref.current, [loopA, loopB]);

        return () => {
          loopA.kill();
          loopB.kill();
          skew.kill();
          speedTrigger.kill();
          dejarDeVigilar();
          ScrollTrigger.removeEventListener("scrollEnd", alParar);
        };
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="stack-marquee">
      <div className="mq-row">
        <div className="mq-track mq-track-a">
          {doubled.map((item, i) => (
            <span key={i} className="mq-item">
              {item}
              <i aria-hidden>·</i>
            </span>
          ))}
        </div>
      </div>

      <div className="mq-row">
        <div className="mq-track mq-track-b">
          {doubled.map((item, i) => (
            <span key={i} className="mq-item mq-item-dim">
              {item}
              <i aria-hidden>·</i>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StackMarquee;
