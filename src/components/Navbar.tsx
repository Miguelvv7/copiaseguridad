"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

const LINKS = [
  { href: "/proyectos", label: "Proyectos" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" },
];

const EMAIL = "miguelvictorio72@gmail.com";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  /* Entrada de la barra */
  useEffect(() => {
    if (!navRef.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        y: -18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.15,
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  /* La barra se compacta al bajar y se esconde al seguir bajando */
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const compact = gsap.to(el, {
      backgroundColor: "rgba(12,24,41,0.82)",
      backdropFilter: "blur(14px)",
      borderBottomColor: "rgba(96,165,250,0.18)",
      paddingTop: "0.85rem",
      paddingBottom: "0.85rem",
      duration: 0.3,
      paused: true,
      ease: "power2.out",
    });

    const trigger = ScrollTrigger.create({
      start: "top -80",
      end: 99999,
      onUpdate: (self) => {
        if (self.direction === 1 && self.scroll() > 400 && !open) {
          gsap.to(el, { yPercent: -140, duration: 0.4, ease: "power3.out" });
        } else {
          gsap.to(el, { yPercent: 0, duration: 0.4, ease: "power3.out" });
        }
      },
      onToggle: (self) => (self.isActive ? compact.play() : compact.reverse()),
    });

    return () => {
      trigger.kill();
      compact.kill();
    };
  }, [open]);

  /* Apertura del menú móvil a pantalla completa */
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    if (open) {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline();
      tl.set(el, { display: "flex" })
        .fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.65, ease: "expo.out" }
        )
        .from(
          el.querySelectorAll(".menu-link"),
          { yPercent: 120, opacity: 0, stagger: 0.07, duration: 0.6, ease: "expo.out" },
          "-=0.3"
        )
        .from(
          el.querySelectorAll(".menu-meta"),
          { opacity: 0, y: 14, stagger: 0.08, duration: 0.45, ease: "power2.out" },
          "-=0.35"
        );
      return () => {
        tl.kill();
      };
    }

    document.body.style.overflow = "";
    gsap.to(el, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.45,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(el, { display: "none" });
      },
    });
  }, [open]);

  /* Cierra al navegar */
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <nav ref={navRef} className="mv-nav">
        <Link href="/" className="nav-item nav-logo" aria-label="Inicio">
          MV<span>.</span>
        </Link>

        <div className="nav-links">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-item nav-link ${pathname.startsWith(l.href) ? "is-active" : ""}`}
            >
              <span className="nav-link-inner">
                <span>{l.label}</span>
                <span aria-hidden>{l.label}</span>
              </span>
            </Link>
          ))}
          <a href={`mailto:${EMAIL}`} className="nav-item nav-cta">
            Hablamos <span aria-hidden>→</span>
          </a>
        </div>

        <button
          className="nav-item nav-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          <span className={`nav-burger ${open ? "is-open" : ""}`}>
            <i />
            <i />
          </span>
          <span className="nav-toggle-label">{open ? "Cerrar" : "Menú"}</span>
        </button>
      </nav>

      <div ref={menuRef} className="nav-overlay" style={{ display: "none" }}>
        <div className="nav-overlay-inner">
          <p className="menu-meta nav-overlay-eyebrow">Navegación</p>
          <ul>
            {LINKS.map((l, i) => (
              <li key={l.href}>
                <Link href={l.href} className="menu-link" onClick={() => setOpen(false)}>
                  <span className="menu-link-num">0{i + 1}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="menu-meta nav-overlay-footer">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <p>Écija, Sevilla · Remoto</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
