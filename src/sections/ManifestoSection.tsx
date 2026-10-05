"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MQ, revealOnView } from "@/lib/motion";

const LINE_1 = "Nadie entra en una tienda a".split(" ");
const LINE_2 = "preguntar quién la hizo.".split(" ");
const LINE_3 = "Entran a comprar.".split(" ");

const ManifestoSection = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /* Mismo efecto en las dos plataformas: las palabras se "encienden"
         conforme avanza el scroll. En móvil el rango es más corto. */
      mm.add(
        { isDesktop: MQ.desktop, isMobile: MQ.mobile, reduce: MQ.reduced },
        (context) => {
          const { isDesktop, reduce } = context.conditions as Record<string, boolean>;
          const words = gsap.utils.toArray<HTMLElement>(".mf-word");
          const limpiezas: Array<() => void> = [];

          if (reduce) {
            gsap.set(words, { color: "#0c1829" });
            gsap.set(".mf-badge", { clipPath: "inset(0 0% 0 0%)" });
            gsap.set(".mf-support", { opacity: 1, y: 0 });
            return;
          }

          gsap.to(words, {
            color: "#0c1829",
            ease: "none",
            stagger: 0.4,
            scrollTrigger: {
              trigger: ref.current,
              start: isDesktop ? "top 70%" : "top 85%",
              end: isDesktop ? "bottom 65%" : "bottom 75%",
              scrub: true,
            },
          });

          const raiz = ref.current;
          limpiezas.push(
            revealOnView(raiz, raiz?.querySelector(".mf-badge"),
              { clipPath: "inset(0 50% 0 50%)" }, { duration: 0.9, ease: "expo.out" })
          );
          limpiezas.push(
            revealOnView(raiz?.querySelector(".mf-support"), raiz?.querySelector(".mf-support"),
              { opacity: 0, y: 18 }, { duration: 0.7, ease: "power2.out" })
          );

          gsap.to(".mf-noise", {
            yPercent: -18,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });

          return () => limpiezas.forEach((fn) => fn());
        }
      );

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="manifesto-section">
      <div className="mf-noise" aria-hidden />

      <div className="mf-inner">
        <div className="mf-badge">
          <span>lo que importa</span>
        </div>

        <h2 className="mf-headline">
          {LINE_1.map((w, i) => (
            <span key={`a${i}`} className="mf-word">
              {w}{" "}
            </span>
          ))}
          <br />
          {LINE_2.map((w, i) => (
            <span key={`b${i}`} className="mf-word">
              {w}{" "}
            </span>
          ))}
          <br />
          {LINE_3.map((w, i) => (
            <span key={`c${i}`} className="mf-word">
              {w}{" "}
            </span>
          ))}
        </h2>

        <p className="mf-support">
          Por eso no me obsesiono con el método, sino con que funcione,
          <br className="solo-escritorio" />{" "}
          cargue rápido y venda.
        </p>
      </div>
    </section>
  );
};

export default ManifestoSection;
