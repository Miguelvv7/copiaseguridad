"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import FooterSection from "@/sections/FooterSection";
import { gsap, MQ, splitChars, scramble, revealOnView } from "@/lib/motion";
import { faqs } from "@/data/projects";

const EMAIL = "miguelvictorio72@gmail.com";

const TIPOS = [
  "Una tienda online",
  "Una web",
  "Una aplicación a medida",
  "Automatizar algo que hago a mano",
  "Arreglar o cambiar algo que ya tengo",
  "Todavía no lo tengo claro",
];

export default function ContactoPage() {
  const ref = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState({
    nombre: "",
    negocio: "",
    tipo: "",
    mensaje: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const mailto = () => {
    const body = [
      `Nombre: ${form.nombre || "—"}`,
      `Negocio: ${form.negocio || "—"}`,
      `Tipo de proyecto: ${form.tipo || "—"}`,
      "",
      form.mensaje,
    ].join("\n");
    return `mailto:${EMAIL}?subject=${encodeURIComponent(
      `Proyecto — ${form.nombre || "nuevo contacto"}`
    )}&body=${encodeURIComponent(body)}`;
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const limpiezas: Array<() => void> = [];
        const title = splitChars(".ct-title");
        const tl = gsap.timeline({ delay: 0.2 });

        tl.fromTo(
          ".ct-eyebrow",
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

        tl.from(
          ".ct-hero-sub",
          { yPercent: 100, opacity: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        ).from(
          ".ct-channel",
          { opacity: 0, y: 18, stagger: 0.09, duration: 0.6, ease: "power2.out" },
          "-=0.35"
        );

        const raiz = ref.current;
        limpiezas.push(
          revealOnView(raiz?.querySelector(".ct-form"), raiz?.querySelectorAll(".ct-field"),
            { opacity: 0, y: 24 }, { duration: 0.65 }, { stagger: 0.08 })
        );
        limpiezas.push(
          revealOnView(raiz?.querySelector(".ct-faqs"), raiz?.querySelectorAll(".ct-faq-item"),
            { opacity: 0, y: 22 }, { duration: 0.6 }, { stagger: 0.08 })
        );

        gsap.to(".ct-watermark", {
          xPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: ".ct-faqs",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        return () => {
          limpiezas.forEach((fn) => fn());
          title?.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <main ref={ref}>
        <section className="ct-hero">
          <div className="hero-grid-bg" />
          <p className="ct-eyebrow" style={{ clipPath: "inset(0 100% 0 0)" }}>
            Contacto · sin compromiso
          </p>
          <div style={{ overflow: "hidden" }}>
            <h1 className="ct-title">Hablamos</h1>
          </div>
          <div style={{ overflow: "hidden" }}>
            <p className="ct-hero-sub">
              Cuéntame qué necesitas y te digo tres cosas: si sé hacerlo, cuánto cuesta y
              cuándo lo tendrías. Si no es lo mío, te lo digo también.
            </p>
          </div>

          <div className="ct-channels">
            <a href={`mailto:${EMAIL}`} className="ct-channel">
              <span>Email</span>
              <strong>{EMAIL}</strong>
            </a>
            <div className="ct-channel">
              <span>Dónde</span>
              <strong>Écija, Sevilla · remoto</strong>
            </div>
            <div className="ct-channel">
              <span>Ahora mismo</span>
              <strong>Con hueco para un proyecto</strong>
            </div>
          </div>
        </section>

        <section className="ct-form">
          <p className="ct-label">Cuéntamelo</p>

          <div className="ct-field">
            <label htmlFor="nombre">Tu nombre</label>
            <input
              id="nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Miguel"
              autoComplete="name"
            />
          </div>

          <div className="ct-field">
            <label htmlFor="negocio">Negocio o proyecto</label>
            <input
              id="negocio"
              name="negocio"
              value={form.negocio}
              onChange={handleChange}
              placeholder="Nombre de la marca"
            />
          </div>

          <div className="ct-field">
            <label htmlFor="tipo">Qué necesitas</label>
            <select id="tipo" name="tipo" value={form.tipo} onChange={handleChange}>
              <option value="">Elige una opción</option>
              {TIPOS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="ct-field">
            <label htmlFor="mensaje">Detalles</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={5}
              value={form.mensaje}
              onChange={handleChange}
              placeholder="Qué tienes ahora, qué te falta y para cuándo lo necesitas. Cuanto más me cuentes, mejor te puedo responder."
            />
          </div>

          <a href={mailto()} className="ct-submit">
            Enviar por email <span aria-hidden>→</span>
          </a>
          <p className="ct-form-note">
            Se abre tu correo con el mensaje ya escrito, para que lo revises antes de
            enviarlo. Nada de formularios que se pierden por el camino.
          </p>
        </section>

        <section className="ct-faqs">
          <h2 className="ct-watermark" aria-hidden>
            PREGUNTAS
          </h2>
          <div className="ct-faqs-inner">
            <p className="ct-label">Lo que suelen preguntarme</p>
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                className={`ct-faq-item ${openFaq === i ? "is-open" : ""}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  {faq.q}
                  <span aria-hidden>{openFaq === i ? "−" : "+"}</span>
                </button>
                <div className="ct-faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <FooterSection />
    </main>
  );
}
