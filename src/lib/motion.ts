"use client";

import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

/** Punto de corte único para todo el sitio. */
const MOBILE_MAX = 899;

export const MQ = {
  desktop: `(min-width: ${MOBILE_MAX + 1}px)`,
  mobile: `(max-width: ${MOBILE_MAX}px)`,
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia(MQ.reduced).matches;

/**
 * ScrollSmoother activo también en móvil (smoothTouch) para que las
 * animaciones con scrub se comporten igual en las dos plataformas.
 * Devuelve una función de limpieza.
 */
export function createSmoother() {
  if (typeof window === "undefined") return () => {};
  if (prefersReducedMotion()) return () => {};

  const existing = ScrollSmoother.get();
  if (existing) existing.kill();

  /* En táctil, los cambios de alto que provoca la barra de Safari no deben
     recalcular todo: con dos secciones con pin, cada recálculo en mitad del
     gesto era un tirón. Esta opción es de ScrollTrigger; dentro de
     ScrollSmoother.create, donde estaba antes, no hacía nada. */
  ScrollTrigger.config({ ignoreMobileResize: true });

  /* En móviles y tablets (solo táctil) el scroll lo lleva GSAP en vez del
     navegador. Así Safari no esconde ni enseña su barra a mitad de gesto: cada
     vez que lo hacía cambiaba el alto de la pantalla y daba un tirón (justo al
     empezar a bajar y la primera vez que se volvía a subir). allowNestedScroll
     deja que los bloques con scroll propio (el formulario, el menú) sigan
     funcionando con normalidad. */
  const soloTactil = ScrollTrigger.isTouch === 1;

  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.15,
    smoothTouch: 0.12,
    effects: true,
    normalizeScroll: soloTactil ? { allowNestedScroll: true, debounce: true } : false,
  });

  return () => smoother.kill();
}

/** Divide en caracteres y devuelve el split (o null si no hay elemento). */
export function splitChars(target: string | Element) {
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return null;
  return SplitText.create(el, { type: "chars,words", charsClass: "sp-char" });
}

/** Divide en líneas envueltas en máscara para reveals verticales. */
export function splitLines(target: string | Element) {
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return null;
  return SplitText.create(el, {
    type: "lines",
    linesClass: "sp-line",
    mask: "lines",
  });
}

const SCRAMBLE_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\*#$%&";

/** Efecto máquina de escribir aleatoria sobre caracteres ya divididos. */
export function scramble(chars: Element[], speed = 45) {
  const timers: ReturnType<typeof setInterval>[] = [];
  chars.forEach((char) => {
    const el = char as HTMLElement;
    const original = el.dataset.original ?? el.textContent ?? "";
    if (!original.trim()) return;
    el.dataset.original = original;

    let ticks = 0;
    const max = 4 + Math.floor(Math.random() * 6);
    const timer = setInterval(() => {
      el.textContent =
        SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)];
      if (++ticks >= max) {
        clearInterval(timer);
        el.textContent = original;
      }
    }, speed);
    timers.push(timer);
  });
  return () => timers.forEach(clearInterval);
}


type Objetivos = Element | Element[] | NodeListOf<Element> | null | undefined;

function comoLista(t: Objetivos): Element[] {
  if (!t) return [];
  if (t instanceof Element) return [t];
  return Array.from(t as ArrayLike<Element>);
}

/**
 * Aparición al entrar en pantalla, una sola vez.
 *
 * Usa IntersectionObserver en vez de ScrollTrigger a propósito: estas
 * animaciones no dependen del scroll, solo de que el elemento se vea. Con
 * ScrollTrigger quedaban a merced de las medidas de la página (secciones con
 * pin, imágenes que cargan tarde, el preloader que aplasta el contenido) y
 * cualquier medida mal tomada dejaba el bloque invisible para siempre.
 *
 * @param vigilar  elemento cuya visibilidad dispara la animación
 * @param objetivos elementos que se animan, en orden
 */
export function revealOnView(
  vigilar: Element | null | undefined,
  objetivos: Objetivos,
  desde: gsap.TweenVars,
  hasta: gsap.TweenVars = {},
  opciones: { stagger?: number } = {}
): () => void {
  const els = comoLista(objetivos);
  if (!vigilar || !els.length) return () => {};

  const final: gsap.TweenVars = {
    opacity: 1,
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    scale: 1,
    scaleX: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    duration: 0.75,
    ease: "power3.out",
    ...hasta,
  };

  /* Solo devolvemos al estado neutro las propiedades que se tocaron */
  Object.keys(final).forEach((k) => {
    if (!(k in desde) && !(k in hasta) && k !== "duration" && k !== "ease") {
      delete final[k];
    }
  });

  if (prefersReducedMotion()) {
    gsap.set(els, { ...final, duration: 0, delay: 0 });
    return () => {};
  }

  gsap.set(els, desde);

  const { stagger = 0.08 } = opciones;
  let hecho = false;
  let reintento = 0;
  let temporizador = 0;

  const revelar = () => {
    if (hecho) return;
    hecho = true;
    io.disconnect();
    window.clearTimeout(temporizador);
    gsap.to(els, { ...final, stagger });
  };

  /* Sin margen negativo a propósito: recortar la parte de abajo dejaba sin
     revelar cualquier bloque que termine pegado al pie de la página, porque
     nunca llega a entrar en la zona reducida. */
  const io = new IntersectionObserver(
    (entradas) => {
      if (entradas.some((e) => e.isIntersecting)) revelar();
    },
    { rootMargin: "0px", threshold: 0 }
  );

  io.observe(vigilar);

  /* Red de seguridad: si el observador no llegara a dispararse, se comprueba
     unas cuantas veces si el elemento está a la vista y se muestra igual. */
  const comprobar = () => {
    if (hecho) return;
    const r = vigilar.getBoundingClientRect();
    const visible = r.top < window.innerHeight && r.bottom > 0 && r.height > 0;
    if (visible) return revelar();
    if (++reintento < 12) temporizador = window.setTimeout(comprobar, 1200);
  };
  temporizador = window.setTimeout(comprobar, 1500);

  return () => {
    io.disconnect();
    window.clearTimeout(temporizador);
  };
}

/**
 * Inclina los elementos indicados según la velocidad de scroll.
 * Funciona igual con rueda y con gesto táctil.
 */
export function skewOnVelocity(selector: string, max = 12) {
  const proxy = { skew: 0 };
  const setter = gsap.quickSetter(selector, "skewY", "deg");
  const clamp = gsap.utils.clamp(-max, max);

  return ScrollTrigger.create({
    onUpdate: (self) => {
      const velocity = clamp(self.getVelocity() / -220);
      if (Math.abs(velocity) > Math.abs(proxy.skew)) {
        proxy.skew = velocity;
        gsap.to(proxy, {
          skew: 0,
          duration: 0.75,
          ease: "power3",
          overwrite: true,
          onUpdate: () => setter(proxy.skew),
        });
      }
    },
  });
}

/**
 * Pausa animaciones infinitas (marquesinas) mientras su bloque no se ve, y las
 * reanuda al volver. Con IntersectionObserver y no con ScrollTrigger, por lo
 * mismo que revealOnView: no depende de medidas de la página.
 */
export function pauseWhenHidden(
  el: Element | null | undefined,
  animaciones: Array<gsap.core.Animation>
): () => void {
  if (!el || typeof IntersectionObserver === "undefined") return () => {};
  const io = new IntersectionObserver(
    ([entrada]) => {
      animaciones.forEach((a) => (entrada.isIntersecting ? a.resume() : a.pause()));
    },
    { rootMargin: "120px 0px" }
  );
  io.observe(el);
  return () => io.disconnect();
}

/**
 * Recalcula las medidas de ScrollTrigger sin dar tirones.
 * ScrollTrigger.refresh() lo recalcula todo al momento aunque el usuario esté
 * en mitad de un scroll, y en el iPhone eso se nota como un parón seco. Esta
 * versión, si se está haciendo scroll, espera a que pare.
 */
let refrescoPendiente = false;
export function refrescar() {
  if (typeof window === "undefined") return;
  if (!ScrollTrigger.isScrolling()) {
    ScrollTrigger.refresh();
    return;
  }
  if (refrescoPendiente) return;
  refrescoPendiente = true;
  const alParar = () => {
    ScrollTrigger.removeEventListener("scrollEnd", alParar);
    refrescoPendiente = false;
    ScrollTrigger.refresh();
  };
  ScrollTrigger.addEventListener("scrollEnd", alParar);
}

/** Refresca ScrollTrigger cuando cambian imágenes/fuentes. */
export function refreshOnLoad() {
  if (typeof window === "undefined") return () => {};
  const refresh = () => refrescar();
  window.addEventListener("load", refresh);
  document.fonts?.ready.then(refresh).catch(() => {});
  return () => window.removeEventListener("load", refresh);
}

export { gsap, ScrollTrigger, ScrollSmoother };
