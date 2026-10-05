"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MQ, ScrollTrigger, skewOnVelocity } from "@/lib/motion";
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

        /* El scroll acelera la marquesina y la inclina ligeramente */
        const skew = skewOnVelocity(".mq-row", 6);

        const speedTrigger = ScrollTrigger.create({
          onUpdate: (self) => {
            const boost = Math.min(Math.abs(self.getVelocity()) / 900, 4);
            gsap.to([loopA, loopB], {
              timeScale: 1 + boost,
              duration: 0.3,
              overwrite: true,
              onComplete: () => {
                gsap.to([loopA, loopB], { timeScale: 1, duration: 1.4, ease: "power2.out" });
              },
            });
          },
        });

        return () => {
          loopA.kill();
          loopB.kill();
          skew.kill();
          speedTrigger.kill();
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
