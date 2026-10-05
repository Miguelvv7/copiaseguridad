/* ──────────────────────────────────────────────────────────────
   PORTFOLIO — fuente única de datos
   Para publicar un proyecto nuevo: copia un bloque de `projects`,
   cambia los campos y añade la portada en /public/images.
   El orden del array es el orden en el que se muestra.
   ────────────────────────────────────────────────────────────── */

export type ProjectStatus = "live" | "wip" | "archived";

export interface Project {
  /** identificador en la URL: /proyectos/<slug> */
  slug: string;
  title: string;
  /** frase corta que acompaña al título */
  tagline: string;
  /** etiqueta de disciplina, se muestra en mayúsculas */
  category: string;
  year: number;
  /** fecha con mes para la ficha, p. ej. "Mayo 2026". Si falta se usa `year` */
  date?: string;
  /** qué hiciste tú en el proyecto */
  role: string;
  client?: string;
  location: string;
  status: ProjectStatus;
  /** aparece en la portada (slider + índice). El resto solo en /proyectos */
  featured?: boolean;
  liveUrl?: string;
  repoUrl?: string;
  /** portada 4:3 o 16:9 en /public/images */
  cover: string;
  /** capturas adicionales para la ficha del proyecto */
  gallery?: string[];
  /** aviso bajo las capturas, p. ej. si los datos que se ven son inventados */
  galleryNote?: string;
  /** tecnologías, se pintan como chips */
  stack: string[];
  /** para qué existe la web: el objetivo del proyecto en una frase */
  goal: string;
  /** el punto de partida y por qué hacía falta */
  context: string;
  /** 1–2 párrafos para la ficha del proyecto */
  summary: string[];
  /** en qué se tradujo el trabajo */
  outcome: string;
  /** puntos concretos de lo que se construyó */
  highlights: string[];
  /** métricas o datos duros del proyecto (opcional) */
  facts?: { value: string; label: string }[];
  /** color de acento de la ficha */
  accent: string;
}

export const projects: Project[] = [
  {
    slug: "lookvintage",
    title: "LookVintage",
    tagline: "Migración de PrestaShop a Shopify sin pagar por pasar el catálogo a mano",
    category: "Shopify · Ecommerce",
    year: 2026,
    date: "Mayo 2026",
    role: "Diseño, desarrollo Liquid, migración de catálogo y SEO",
    client: "LookVintage",
    location: "Écija, Sevilla",
    status: "live",
    featured: true,
    liveUrl: "https://www.lookvintage.es/",
    cover: "/images/project-lookvintage.webp",
    gallery: ["/images/screen-lookvintage.jpg"],
    stack: ["Shopify", "Liquid", "GraphQL", "JavaScript", "SEO"],
    goal: "Volver a vender muebles a medida online con una tienda que se pueda gestionar sin sufrir.",
    context:
      "Tenían una tienda en PrestaShop que llevaba un año sin recibir tráfico. Estaba anticuada y cambiar un producto era un infierno. Sabían que había que cambiarla, pero todas las empresas a las que preguntaban pedían una pasta: el problema eran los 350 productos, que había que pasar uno a uno o pagando una aplicación carísima.",
    summary: [
      "En vez de pasar el catálogo a mano, programé una herramienta que lo hizo por mí: productos, variantes, imágenes y precios, todo migrado a Shopify sin teclear nada. Eso es lo que lo hizo asequible.",
      "Con el catálogo dentro, monté la tienda entera: diseño nuevo, colecciones, fichas de producto, variantes y el SEO para que Google volviera a mandar visitas.",
    ],
    highlights: [
      "Programé un migrador propio para pasar los 350 productos con sus variantes e imágenes, sin apps de pago",
      "Diseño nuevo pensado para muebles a medida, con sus opciones y variantes en cada ficha",
      "Colecciones y fichas de producto montadas desde cero",
      "SEO trabajado para recuperar el tráfico que llevaban un año sin tener",
      "Cambiar un producto ahora se hace desde el móvil en un minuto"
    ],
    outcome:
      "Un 80 % más de visitas en la web y un aumento claro en las ventas, incluso con la empresa de vacaciones. Y cambiar un producto ya no es un castigo.",
    facts: [
      { value: "+80%", label: "de visitas en la web" },
      { value: "350+", label: "productos migrados con mi herramienta" },
      { value: "0 €", label: "en apps de migración" },
    ],
    accent: "#60a5fa",
  },
  {
    slug: "facturas",
    title: "Facturas",
    tagline: "App de facturación y control de gastos para autónomos",
    category: "Next.js · App · Supabase",
    year: 2026,
    date: "Agosto 2026",
    role: "Producto, diseño, desarrollo y modelo fiscal",
    client: "Un amigo autónomo y un familiar",
    location: "Écija, Sevilla",
    status: "live",
    featured: true,
    cover: "/images/project-facturas.jpg",
    gallery: [
      "/images/screen-facturas-panel.jpg",
      "/images/screen-facturas-informes.jpg",
    ],
    galleryNote:
      "El proyecto y los usuarios son reales; los datos de las capturas no. Están hechas con el juego de datos de ejemplo que trae la propia aplicación, así que el negocio, los clientes, los productos y todos los importes son inventados.",
    stack: ["Next.js", "TypeScript", "Supabase", "Postgres", "Tailwind", "jsPDF", "Vitest"],
    goal:
      "Que un autónomo pueda facturar bien y saber qué gana sin entender de fiscalidad ni pelearse con un Excel.",
    context:
      "Un amigo acababa de hacerse autónomo y quería quitarse de encima el lío de los trámites. Y un familiar llevaba las facturas de sus clientes en Excel: sabía lo que vendía, pero no lo que le quedaba ni cuánto tenía que apartar para Hacienda, y eso solo se descubría al llegar el trimestre.",
    summary: [
      "Es una aplicación web privada, con cuentas, para llevar el negocio entero: clientes, productos, gastos, facturas y los informes que dicen qué deja dinero de verdad.",
      "La idea de fondo es que la complejidad la coma el código. La app calcula el IVA por tipo, el recargo de equivalencia y el adelanto del IRPF, pero en pantalla solo aparece una frase: «aparta 1.661 € antes del 20 de octubre». La palabra «modelo 303» no sale nunca.",
    ],
    highlights: [
      "Calcula el IVA por tipos (4 %, 10 % y 21 %) y el recargo de equivalencia",
      "Las cuentas se llevan en céntimos enteros: una factura que no cuadra al céntimo es una factura que te pueden rechazar",
      "Una factura emitida no se puede tocar ni borrar; para corregir hay que hacer una rectificativa, como manda la ley",
      "Cada factura queda encadenada a la anterior con una huella, cumpliendo Verifactu antes de que sea obligatorio",
      "Genera el PDF con el logo y el color de la marca de cada usuario",
      "Avisa de qué producto deja más dinero, de qué clientes llevan tiempo sin comprar y de qué se está acabando",
      "Cada usuario ve solo sus datos, y la app también funciona en local sin cuenta para probarla"
    ],
    outcome:
      "El Excel desapareció. Los dos facturan desde el móvil con numeración correlativa correcta, tienen más control sobre lo que entra y sale, y saben en todo momento cuánto del dinero de la cuenta no es suyo.",
    facts: [
      { value: "2", label: "negocios usándola a diario" },
      { value: "65", label: "tests del motor fiscal" },
      { value: "Verifactu", label: "desde el día uno" },
    ],
    accent: "#7d9142",
  },
  {
    slug: "manuelinteriorismo",
    title: "Manuel Interiorismo",
    tagline: "Estudio de interiorismo con animaciones GSAP",
    category: "Shopify · Diseño",
    year: 2026,
    date: "Actualmente",
    role: "Dirección visual, desarrollo y animación",
    client: "Manuel Interiorismo",
    location: "Écija, Sevilla",
    status: "wip",
    featured: true,
    liveUrl: "https://manuelinteriorismo.com/",
    cover: "/images/project-manuel.webp",
    gallery: ["/images/screen-manuel.jpg"],
    stack: ["Shopify", "Liquid", "GSAP", "ScrollTrigger", "CSS"],
    goal: "Enseñar proyectos de interiorismo como si fueran una revista, y vender después.",
    context:
      "El estudio no necesitaba un escaparate de productos: necesitaba que se vieran sus proyectos. Las plantillas de ecommerce estándar hacían justo lo contrario.",
    summary: [
      "Un estudio de interiorismo no necesitaba un escaparate de productos: necesitaba que se vieran sus proyectos. Las plantillas de tienda hacen justo lo contrario.",
      "Está montada sobre Shopify pero con estructura de portfolio: mandan los proyectos, el producto viene después, y todo se va descubriendo conforme bajas.",
    ],
    highlights: [
      "Galerías de proyecto que se recorren en horizontal",
      "Las imágenes entran y se mueven a distinta velocidad según bajas",
      "Todo editable desde el panel, para que puedan publicar sin llamarme",
      "Las fotos pesadas se cargan cuando hacen falta, no todas de golpe"
    ],
    outcome:
      "Una web con estructura de portfolio sobre Shopify: los proyectos mandan, el producto acompaña, y el estudio publica sin tocar código.",
    facts: [
      { value: "GSAP", label: "motor de animación" },
      { value: "100%", label: "editable por el cliente" },
    ],
    accent: "#c9a227",
  },
  {
    slug: "londonlangford",
    title: "London Langford",
    tagline: "Tienda de moda para Londres que facturó 22.000 £ en dos meses",
    category: "Shopify · Dropshipping",
    year: 2026,
    date: "Junio 2026",
    role: "Investigación de mercado, diseño y montaje de tienda",
    client: "London Langford",
    location: "Londres · remoto",
    status: "live",
    featured: true,
    liveUrl: "https://londonlangford.com/",
    cover: "/images/langford.png",
    stack: ["Shopify", "Liquid", "CSS", "JavaScript"],
    goal: "Vender ropa en Londres desde España con una tienda que parezca de allí.",
    context:
      "Un amigo quería montar un negocio de dropshipping de ropa en Londres y me pidió la web. No había nada: ni tienda, ni catálogo, ni referencia de cómo tenía que ser. Y vender en otro país no es solo traducir la web.",
    summary: [
      "Antes de tocar nada me puse a investigar el mercado de Londres: qué tiendas funcionan allí, cómo se ven, cómo escriben, qué esperan sus clientes. Y monté la tienda adaptada a eso, no una tienda española en inglés.",
      "Con eso claro, monté la tienda entera en Shopify: tema, colecciones, fichas de producto, pagos y envíos al Reino Unido, todo listo para empezar a vender desde el primer día.",
    ],
    highlights: [
      "Investigación del mercado londinense y de sus tiendas de referencia antes de diseñar",
      "Tienda pensada para el cliente de allí: idioma, moneda, tono y estilo",
      "Tema, colecciones y fichas de producto montadas desde cero",
      "Pagos y envíos configurados para el Reino Unido",
      "Colecciones montadas para que el catálogo pueda crecer sin rehacerlo"
    ],
    outcome:
      "La tienda facturó 22.000 £ en sus dos primeros meses.",
    facts: [
      { value: "22.000 £", label: "facturados en 2 meses" },
      { value: "2", label: "meses desde el lanzamiento" },
      { value: "0", label: "tiendas previas: montada de cero" },
    ],
    accent: "#e8712b",
  },
];

export const featuredProjects = projects.filter((p) => p.featured !== false);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const statusLabel: Record<ProjectStatus, string> = {
  live: "En producción",
  wip: "En desarrollo",
  archived: "Archivado",
};

/* ── Qué hago — sin precios, enfoque portfolio ── */
export const capabilities = [
  {
    num: "01",
    title: "Tiendas online",
    kicker: "Shopify · Liquid",
    desc: "Monto la tienda entera: el diseño, los productos y todo lo que hay que tocar para que alguien pueda comprar y a ti te llegue el dinero. Si ya tienes una en otro sitio, me traigo el catálogo sin que pierdas las visitas que ya tenías.",
    items: [
      "Tienda montada de cero",
      "Traer el catálogo desde otra plataforma",
      "Pagos y envíos configurados",
      "Sin perder posiciones en Google",
    ],
  },
  {
    num: "02",
    title: "Webs y apps",
    kicker: "Next.js · React · GSAP",
    desc: "Desde una web que solo tiene que estar bien y cargar rápido, hasta una aplicación para llevar el negocio por dentro: facturas, gastos, clientes y lo que haga falta.",
    items: [
      "Webs rápidas, hechas para el móvil",
      "Aplicaciones a medida",
      "Animaciones cuidadas, sin marearte",
      "Textos y estructura pensados para vender",
    ],
  },
  {
    num: "03",
    title: "Automatizaciones",
    kicker: "n8n · Python",
    desc: "Si hay algo que estás haciendo a mano dos veces por semana, seguramente se puede automatizar. Subir productos, sacar datos de otra web, conectar dos programas que no se hablan entre ellos.",
    items: [
      "Subir catálogos sin teclear nada",
      "Sacar datos de otras webs",
      "Conectar plataformas entre sí",
      "Avisos y tareas en automático",
    ],
  },
  {
    num: "04",
    title: "Y después",
    kicker: "No desaparezco",
    desc: "Cuando la web ya está publicada sigo estando ahí. Un cambio, un producto nuevo, algo que se ha roto: me escribes y lo miro. Sin contratos ni cuotas mensuales.",
    items: [
      "Cambios y arreglos puntuales",
      "Añadir productos o secciones nuevas",
      "Me escribes a mí, no a un soporte",
      "Sin contrato mensual",
    ],
  },
];

export const stack = [
  "SHOPIFY", "LIQUID", "GRAPHQL", "NEXT.JS", "REACT",
  "TYPESCRIPT", "GSAP", "SUPABASE", "POSTGRES", "TAILWIND",
  "PYTHON", "PLAYWRIGHT", "N8N", "GIT", "VERCEL",
];

export const metrics = [
  { value: "4", label: "webs en producción" },
  { value: "2026", label: "aprendiendo" },
  { value: "Écija", label: "base · remoto" },
];

export const steps = [
  {
    num: "1",
    title: "Me cuentas",
    desc: "Qué tienes ahora, qué te falta y para qué lo quieres. Una conversación por WhatsApp suele bastar — no hace falta reunión de hora y media.",
  },
  {
    num: "2",
    title: "Te digo precio y fecha",
    desc: "Antes de tocar nada sabes lo que cuesta y cuándo lo tienes. Si algo se sale de lo que sé hacer, te lo digo en este punto.",
  },
  {
    num: "3",
    title: "Lo montamos",
    desc: "Vas viendo cómo avanza y me vas diciendo. Cuando está como lo quieres, lo publicamos.",
  },
];

export const faqs = [
  {
    q: "¿Es verdad que usas IA?",
    a: "Sí, y no lo escondo. Es mi herramienta principal y es lo que me permite sacar adelante proyectos que hace un año no habría podido tocar. Las webs que hay en esta página están funcionando y las puedes visitar: júzgalas por cómo van, no por cómo se hicieron.",
  },
  {
    q: "¿Cuánto tarda?",
    a: "Depende del tamaño. Una web sencilla puede estar en un par de semanas; una tienda con catálogo grande lleva más. Te doy una fecha antes de empezar y si veo que no llego, te aviso — no te dejo esperando.",
  },
  {
    q: "¿Qué necesito tener listo?",
    a: "Textos, fotos y saber qué quieres conseguir. Si no tienes los textos, te ayudo a montarlos. El diseño lo propongo yo a partir de tu negocio y lo vamos ajustando.",
  },
  {
    q: "¿Trabajas fuera de Écija?",
    a: "Sí. La mayoría de la comunicación es por WhatsApp y videollamada, así que da igual dónde estés.",
  },
  {
    q: "¿Y si no me gusta el resultado?",
    a: "Lo cambiamos. No doy nada por cerrado hasta que lo veas y me digas que sí.",
  },
];

export const noHago = [
  "No hago logos ni identidad visual desde cero.",
  "No llevo redes sociales ni campañas de publicidad.",
  "No cojo dos proyectos a la vez.",
  "No te digo que sé hacer algo si no sé hacerlo.",
];

export const sectors = [
  "Tiendas y ecommerce",
  "Estudios de interiorismo",
  "Ópticas y centros de salud",
  "Negocios locales con catálogo",
];

export const porqueYo = [
  {
    num: "01",
    title: "Hablas conmigo y ya está.",
    desc: "No hay comercial, ni gestor de cuentas, ni nadie que te pase con otro. Te contesto yo, lo monto yo y respondo yo si algo falla después.",
  },
  {
    num: "02",
    title: "Un proyecto cada vez.",
    desc: "Cuando empiezo el tuyo es el único que tengo entre manos. No lo voy alternando con otros cinco a medio hacer.",
  },
  {
    num: "03",
    title: "Uso la IA y no lo escondo.",
    desc: "Es la herramienta que me deja llegar donde hace un año no llegaba. Lo que tienes que juzgar es la web, no con qué la hice — entra en las que hay aquí y decide.",
  },
  {
    num: "04",
    title: "Te digo lo que sé y lo que no.",
    desc: "Si me pides algo que no sé hacer, te lo digo antes de empezar en vez de aprender a tu costa y entregarte un apaño.",
  },
];


/* ──────────────────────────────────────────────────────────────
   PLANTILLA — copia este bloque dentro de `projects` para publicar
   un proyecto nuevo. Borra los campos opcionales que no uses.

   {
     slug: "mi-proyecto",
     title: "Mi Proyecto",
     tagline: "Una frase de qué es",
     category: "Shopify · Ecommerce",
     year: 2026,
     date: "Mayo 2026",         // opcional, se muestra en la ficha
     role: "Qué hiciste tú",
     client: "Nombre del cliente",
     location: "Écija, Sevilla",
     status: "live",              // live | wip | archived
     featured: true,              // aparece en la portada
     liveUrl: "https://...",
     repoUrl: "https://github.com/...",
     cover: "/images/mi-proyecto.webp",
     gallery: ["/images/mi-proyecto-1.jpg"],
     galleryNote: "Aviso opcional bajo las capturas (datos de ejemplo, etc.).",
     stack: ["Shopify", "Liquid"],
     goal: "Para qué existe esta web, en una frase.",
     context: "Cómo estaba la cosa antes y por qué hacía falta.",
     summary: ["Párrafo 1.", "Párrafo 2."],
     highlights: ["Cosa concreta que construiste", "Otra"],
     outcome: "En qué se tradujo el trabajo.",
     facts: [{ value: "350+", label: "productos" }],
     accent: "#60a5fa",
   },
   ────────────────────────────────────────────────────────────── */
