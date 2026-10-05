"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/motion";
import Preloader from "@/components/Preloader";
import StackMarquee from "@/components/StackMarquee";
import HeroSection from "@/sections/HeroSection";
import ManifestoSection from "@/sections/ManifestoSection";
import ShowcaseSection from "@/sections/ShowcaseSection";
import CapabilitiesSection from "@/sections/CapabilitiesSection";
import ProjectIndexSection from "@/sections/ProjectIndexSection";
import FooterSection from "@/sections/FooterSection";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    let cancelled = false;
    const finish = () => !cancelled && setIsLoaded(true);

    /* Espera a las fuentes (evita reventar los SplitText) con tope de 1,6 s */
    const timeout = setTimeout(finish, 1600);
    document.fonts?.ready.then(finish).catch(finish);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  /* Mientras el preloader está puesto, el contenido vive aplastado a la altura
     de la ventana y con overflow oculto: los ScrollTrigger que se crean en ese
     momento miden mal y sus secciones no llegaban a aparecer nunca. En cuanto
     el preloader se va, se recalculan todas las medidas. */
  useEffect(() => {
    if (!isPreloaderDone) return;
    const refrescar = () => ScrollTrigger.refresh();
    refrescar();
    const t1 = window.setTimeout(refrescar, 200);
    const t2 = window.setTimeout(refrescar, 800);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [isPreloaderDone]);

  return (
    <main>
      <Preloader isLoaded={isLoaded} onFinish={() => setIsPreloaderDone(true)} />

      <div className={isPreloaderDone ? "page-ready" : "page-hidden"}>
          <HeroSection triggerAnimation={isPreloaderDone} />
          <StackMarquee />
          <ManifestoSection />
          <ShowcaseSection />
          <CapabilitiesSection />
          <ProjectIndexSection />
          <FooterSection />
      </div>
    </main>
  );
}
