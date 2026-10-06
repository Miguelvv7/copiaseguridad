# mvictorio.es

Mi portfolio. Aquí publico las webs que voy montando.

---

## Quién hay detrás

Me llamo Miguel Victorio, tengo 21 años y vivo en Écija, Sevilla.

No vengo de una carrera de informática — el curso lo empiezo ahora. Empecé
haciendo una web para un amigo, luego otra para alguien que me escribió, y de
ahí no he parado. Hoy hay cinco negocios con webs que he montado yo:
dos tiendas online, la web de un estudio de interiorismo, la de una óptica
con gabinete de audiología y la de reservas de una peluquería.

La IA es mi herramienta principal y no lo escondo. Es lo que me permite abrir
proyectos que hace un año ni habría intentado. Lo que pongo yo son las horas, el
criterio de que quede bien y la cara cuando algo hay que arreglarlo.

Esta web la he hecho igual: diseñada y montada desde cero para enseñar lo que
hago, no como escaparate de servicios.

---

## Con qué está hecha

| | |
|---|---|
| **Framework** | Next.js 15 (App Router) con TypeScript |
| **Animaciones** | GSAP — ScrollTrigger, ScrollSmoother y SplitText |
| **Estilos** | CSS propio con variables, más Tailwind para utilidades sueltas |
| **Tipografías** | Antonio y Proxima Nova, cargadas con `next/font` |
| **Despliegue** | Vercel |

Cinco dependencias en total. Nada de librerías de componentes ni plantillas: el
diseño, la estructura y las animaciones están escritos para esta web.

---

## Arrancarla

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
```

---

## Publicar un proyecto nuevo

Todo el contenido está en un único archivo: **`src/data/projects.ts`**.
No hay que tocar componentes ni crear páginas — la ficha `/proyectos/<slug>` se
genera sola, y el proyecto aparece automáticamente en la portada, en el archivo,
en el índice y en el sitemap.

1. **Sube la portada** a `public/images/`. Tiene que ser **16:9 (1920×1080)**:
   se enseña entera, sin recortes, en el móvil y en el ordenador. Las portadas
   actuales son una ventana de navegador con la web y, cuando hay captura del
   móvil, un teléfono encima con la versión móvil.
   Si tienes capturas extra, súbelas también y ponlas en `gallery` (esas pueden
   tener cualquier proporción).
2. **Copia la plantilla** que hay comentada al final de `src/data/projects.ts` y
   pégala dentro del array `projects`, donde quieras que aparezca.
3. Rellena los campos. Los que cuentan la historia son estos:

   | Campo | Qué va aquí |
   |---|---|
   | `goal` | Para qué existe la web, en una frase |
   | `context` | Cómo estaba la cosa antes y por qué hacía falta |
   | `summary` | Uno o dos párrafos explicando el proyecto |
   | `highlights` | Lista de lo que construiste, concreto |
   | `outcome` | En qué se tradujo el trabajo |
   | `facts` | Datos duros opcionales, se pintan grandes en la ficha |
   | `galleryNote` | Aviso bajo las capturas, por si los datos que salen son de ejemplo |

4. `featured: true` lo saca además en la galería horizontal de la portada.
   `status` acepta `"live"`, `"wip"` o `"archived"`.

### Retos personales

Los proyectos propios que no son encargos (o que ya no usa nadie) van en
`personalProjects`, en el mismo archivo, en vez de en `projects`. Salen en el
apartado **Retos personales** al final de `/proyectos`, tienen su ficha y entran
en el sitemap, pero no aparecen en la portada ni cuentan como proyectos de
cliente. Ahora mismo ahí está la app de facturas.

---

## Estructura

```
src/
  app/
    page.tsx                    portada
    proyectos/page.tsx          archivo de proyectos
    proyectos/[slug]/           ficha de cada proyecto, generada desde los datos
    sobre-mi/ · contacto/
    globals.css                 todos los estilos
    sitemap.ts · robots.ts
  components/
    PageShell.tsx               scroll suave + cursor + navegación
    Navbar · Preloader · CustomCursor · StackMarquee
  sections/
    HeroSection · ManifestoSection · ShowcaseSection
    CapabilitiesSection · ProjectIndexSection · FooterSection
  data/projects.ts              ← el contenido (proyectos + retos personales)
  lib/motion.ts                 helpers de GSAP compartidos
```

---

## Las animaciones

Son las mismas en el ordenador y en el móvil; lo que cambia son las medidas.
Hay una excepción: en el móvil las fotos de los proyectos no hacen zoom ni
parallax, para que se vean siempre enteras, y las etiquetas de estado van sin
desenfoque de fondo, que es lo que más le cuesta a Safari en el iPhone.
Se orquestan con `gsap.matchMedia()` desde `src/lib/motion.ts`:

- `MQ.desktop` / `MQ.mobile` — misma animación, distintas distancias y escalas.
- `MQ.motion` — lo que solo corre si el usuario no ha pedido menos movimiento.
- `MQ.reduced` — versión estática para quien tiene activado *reducir movimiento*.

`ScrollSmoother` está activo también en táctil (`smoothTouch`), y es lo que
permite que el scroll horizontal con pin y los efectos con `scrub` se comporten
igual en el móvil que en el ordenador.

Cuatro reglas para no romperlo:

- Dentro de un `useGSAP({ scope: ref })` los selectores solo buscan
  **descendientes**. Para apuntar al propio elemento raíz hay que usar
  `ref.current`, no su clase.
- Todo `ScrollTrigger` con medidas calculadas lleva `invalidateOnRefresh: true`.
- Las fuentes se cargan con `next/font`, así `SplitText` mide sobre la
  tipografía definitiva y no sobre la de reserva.
- Las alturas de pantalla completa van en `svh`, nunca en `dvh`. En el iPhone,
  `dvh` cambia cada vez que Safari esconde o enseña su barra, y las secciones
  con pin se descolocan en mitad del scroll.

Para que el iPhone vaya fino:

- Para recalcular medidas se usa `refrescar()` de `src/lib/motion.ts`, nunca
  `ScrollTrigger.refresh()` a pelo: si el usuario está haciendo scroll, espera
  a que pare. Un recálculo en mitad del gesto es un tirón seco en el iPhone.
- En pantallas solo táctiles el scroll lo lleva GSAP (`normalizeScroll`), así
  Safari no esconde ni enseña su barra a mitad de gesto.
- Las marquesinas se pausan cuando no se ven (`pauseWhenHidden`) y las fotos de
  la galería horizontal se cargan de antemano.

---

© 2026 Miguel Victorio — Écija, Sevilla
