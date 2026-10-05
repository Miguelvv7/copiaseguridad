"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface PreloaderProps { isLoaded: boolean; onFinish: () => void; }

const Preloader: React.FC<PreloaderProps> = ({ isLoaded, onFinish }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef      = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [display,  setDisplay]  = useState(true);

  /* ── Contador de progreso ── */
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (!isLoaded) {
      interval = setInterval(
        () => setProgress((p) => (p < 92 ? p + Math.random() * 7 : p)),
        70
      );
    } else {
      setProgress(100);
    }
    return () => clearInterval(interval);
  }, [isLoaded]);

  /* ── GSAP: SOLO salida cuando progress = 100 ── */
  useGSAP(() => {
    if (!isLoaded || progress < 100 || !containerRef.current) return;

    gsap
      .timeline({ delay: 0.15, onComplete: () => setDisplay(false) })
      .to(logoRef.current, { y: -28, opacity: 0, duration: 0.45, ease: "power2.in" })
      .to(
        ".pl-label-loading, .pl-label-percent, .pl-shadow-loading, .pl-shadow-percent",
        { opacity: 0, duration: 0.3, stagger: 0.03, ease: "power2.in" },
        "<"
      )
      .to(
        ".pl-bar",
        { scaleX: 1, duration: 0.35, ease: "power2.inOut" },
        "<"
      )
      .to(
        containerRef.current,
        { yPercent: -100, duration: 0.85, ease: "power4.inOut", onComplete: onFinish },
        "-=0.1"
      );
  }, { dependencies: [isLoaded, progress], scope: containerRef });

  if (!display) return null;

  const pct = String(Math.round(progress)).padStart(3, "0");

  return (
    <div ref={containerRef} className="pl-root">
      {/* ── Izquierda ── */}
      <div className="pl-left">
        <p className="pl-label-loading">cargando</p>
        <span className="pl-shadow-loading" aria-hidden>cargando</span>
      </div>

      {/* ── Logo centrado — visible desde el inicio ── */}
      <div ref={logoRef} className="pl-logo">
        MV<span style={{ color: "#60a5fa" }}>.</span>
      </div>

      <div className="pl-bar" />

      {/* ── Derecha ── */}
      <div className="pl-right">
        <p className="pl-label-percent">{pct}%</p>
        <span className="pl-shadow-percent" aria-hidden>{pct}%</span>
      </div>
    </div>
  );
};

export default Preloader;
