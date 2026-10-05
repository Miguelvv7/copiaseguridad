# mvictorio.es

Mi portfolio. Aquí publico las webs que voy montando.

---

## Quién hay detrás

Me llamo Miguel Victorio, tengo 21 años y vivo en Écija, Sevilla.

No vengo de una carrera de informática — el curso lo empiezo ahora. Empecé
haciendo una web para un amigo, luego otra para alguien que me escribió, y de
ahí no he parado. Hoy hay cuatro negocios funcionando con cosas que he montado
yo: dos tiendas online, la web de un estudio de interiorismo y una aplicación de
facturación para una distribuidora de aceite.

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

1. **Sube la portada** a `public/images/` (apaisada, ~1600 px de ancho).
   Si tienes capturas extra, súbelas también y ponlas en `gallery`.
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
  data/projects.ts              ← el contenido
  lib/motion.ts                 helpers de GSAP compartidos
```

---

## Las animaciones

Son las mismas en el ordenador y en el móvil; lo que cambia son las medidas.
Se orquestan con `gsap.matchMedia()` desde `src/lib/motion.ts`:

- `MQ.desktop` / `MQ.mobile` — misma animación, distintas distancias y escalas.
- `MQ.motion` — lo que solo corre si el usuario no ha pedido menos movimiento.
- `MQ.reduced` — versión estática para quien tiene activado *reducir movimiento*.

`ScrollSmoother` está activo también en táctil (`smoothTouch`), y es lo que
permite que el scroll horizontal con pin y los efectos con `scrub` se comporten
igual en el móvil que en el ordenador.

Tres reglas para no romperlo:

- Dentro de un `useGSAP({ scope: ref })` los selectores solo buscan
  **descendientes**. Para apuntar al propio elemento raíz hay que usar
  `ref.current`, no su clase.
- Todo `ScrollTrigger` con medidas calculadas lleva `invalidateOnRefresh: true`.
- Las fuentes se cargan con `next/font`, así `SplitText` mide sobre la
  tipografía definitiva y no sobre la de reserva.

---

© 2026 Miguel Victorio — Écija, Sevilla
