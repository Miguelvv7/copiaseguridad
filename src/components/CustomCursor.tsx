"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Cursor en cruz. Solo se activa en dispositivos con ratón:
 * en táctil no se monta nada y el cursor del sistema queda intacto.
 * Sobre un elemento interactivo la cruz gira 45° y crece.
 */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const cross = ref.current;
    if (!fine || !cross) return;

    document.documentElement.classList.add("has-custom-cursor");

    const setX = gsap.quickSetter(cross, "x", "px");
    const setY = gsap.quickSetter(cross, "y", "px");

    let mouseX = -200;
    let mouseY = -200;
    let curX = -200;
    let curY = -200;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        curX = mouseX;
        curY = mouseY;
        gsap.to(cross, { autoAlpha: 1, duration: 0.25 });
      }
    };

    /* Un pelín de retardo: la cruz persigue al puntero en vez de pegarse */
    const tick = () => {
      curX += (mouseX - curX) * 0.35;
      curY += (mouseY - curY) * 0.35;
      setX(curX);
      setY(curY);
    };

    const INTERACTIVE =
      "a, button, [role='button'], input, textarea, select, .cursor-grow";

    const onOver = (e: MouseEvent) => {
      const activo = !!(e.target as HTMLElement)?.closest?.(INTERACTIVE);
      gsap.to(cross, {
        scale: activo ? 1.7 : 1,
        rotate: activo ? 45 : 0,
        duration: 0.35,
        ease: "power3.out",
      });
      cross.classList.toggle("is-active", activo);
    };

    const onDown = () => gsap.to(cross, { scale: 0.7, duration: 0.15 });
    const onUp = () => gsap.to(cross, { scale: 1, duration: 0.25 });
    const onLeave = () => {
      visible = false;
      gsap.to(cross, { autoAlpha: 0, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    gsap.ticker.add(tick);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div ref={ref} className="cursor-cross" aria-hidden>
      <span />
      <span />
    </div>
  );
}
