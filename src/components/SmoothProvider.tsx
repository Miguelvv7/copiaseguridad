"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import {
  createSmoother,
  refreshOnLoad,
  ScrollTrigger,
  ScrollSmoother,
} from "@/lib/motion";

/**
 * Envuelve toda la aplicación desde el layout raíz.
 *
 * El ScrollSmoother se crea UNA sola vez y sobrevive a los cambios de página.
 * Cuando cada página lo creaba por su cuenta, las animaciones de sus secciones
 * se registraban antes que él y se quedaban enganchadas al smoother anterior:
 * al navegar por enlace el contenido no llegaba a aparecer nunca.
 *
 * La barra y el cursor van fuera de #smooth-wrapper a propósito: dentro de un
 * elemento con transform, `position: fixed` deja de referirse a la ventana.
 */
export default function SmoothProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const primeraCarga = useRef(true);

  useEffect(() => {
    const matarSmoother = createSmoother();
    const quitarListeners = refreshOnLoad();
    return () => {
      matarSmoother();
      quitarListeners();
    };
  }, []);

  /* En cada cambio de página: arriba del todo y recalcular medidas.
     Este efecto corre después de los de las secciones hijas, así que para
     entonces sus ScrollTrigger ya existen y el refresh los coloca bien. */
  useEffect(() => {
    if (primeraCarga.current) {
      primeraCarga.current = false;
      return;
    }

    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(0, false);
    else window.scrollTo(0, 0);

    ScrollTrigger.refresh();

    /* Segunda pasada cuando ya han entrado imágenes y fuentes */
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">{children}</div>
      </div>
    </>
  );
}
