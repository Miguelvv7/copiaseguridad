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
  /** aviso en la ficha cuando no hay web que visitar ni código que ver.
      Si falta, pone que es una aplicación privada sin demo pública */
  offlineNote?: string;
  /** portada en /public/images, SIEMPRE 16:9 (1920×1080): se enseña entera,
      sin recortes, en el móvil y en el ordenador */
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
    date: "Enero 2026",
    role: "Diseño, desarrollo Liquid, migración de catálogo y SEO",
    client: "LookVintage",
    location: "Écija, Sevilla",
    status: "live",
    featured: true,
    liveUrl: "https://www.lookvintage.es/",
    cover: "/images/project-lookvintage.jpg",
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
    slug: "opticaarenas",
    title: "Óptica Arenas",
    tagline: "Web para una óptica y centro auditivo que facilita pedir cita por WhatsApp",
    category: "Web · Tailwind",
    year: 2026,
    date: "Septiembre 2026",
    role: "Diseño, desarrollo, SEO local y AEO",
    client: "Óptica Arenas Audífonos",
    location: "Écija, Sevilla",
    status: "live",
    featured: true,
    liveUrl: "https://arenas-iota.vercel.app/",
    cover: "/images/project-optica.jpg",
    gallery: [
      "/images/screen-optica-lectura.jpg",
      "/images/screen-optica-cita.jpg",
      "/images/screen-optica-servicios.jpg",
    ],
    stack: ["HTML", "Tailwind", "JavaScript", "Web Audio", "SEO local", "Vercel"],
    goal:
      "Que cualquiera, tenga la edad que tenga, entienda qué hace la óptica y pida cita por WhatsApp en un minuto.",
    context:
      "Una óptica con gabinete de audiología propio, más de 20 años en Écija y pacientes de toda la vida, muchos de ellos mayores. Gran parte de las citas se siguen pidiendo en persona o por teléfono. La web tenía que servir a dos públicos a la vez: al que llega desde Google buscando una óptica y al que necesita la letra grande para leer.",
    summary: [
      "Es una web estática, sin gestor ni base de datos: páginas en HTML y Tailwind que cargan al momento y no hay nada que se pueda caer. Pedir cita tampoco necesita servidor: eliges si es para la vista o para el oído, pones tu nombre y se abre WhatsApp con el mensaje ya escrito. Solo queda darle a enviar.",
      "Como gran parte del público es gente mayor, la accesibilidad no podía ser un extra. Un botón «AA» en la cabecera deja agrandar la letra, subir el contraste y quitar las animaciones, y la web lo recuerda al cambiar de página. Para quien no sabe por dónde empezar hay un test de visión, un test de audición y un configurador de audífonos que te orientan en un minuto y acaban en una cita.",
    ],
    highlights: [
      "Cita por WhatsApp en tres pasos: el mensaje sale escrito con el servicio, el nombre, el teléfono y la hora preferida",
      "Botón «AA» de lectura fácil: tres tamaños de letra, más contraste y sin animaciones, guardado entre páginas",
      "Test de audición con tonos generados en el navegador, de grave a agudo, y test de visión con carta optométrica",
      "Configurador de audífonos que hace tres preguntas y manda la recomendación por WhatsApp",
      "Aviso en directo de si la óptica está abierta o cerrada según el horario",
      "Fotos reales del gabinete, sin casos clínicos ni diagnósticos: es una óptica, no una consulta médica",
      "SEO local con datos estructurados de óptica y preguntas frecuentes, y el mapa de Google solo se carga si lo pides",
    ],
    outcome:
      "La óptica tiene una web propia que explica todo lo que hace, de la vista al oído, y que puede usar cualquiera de sus pacientes, también quien necesita la letra grande. Pedir cita es escribir tu nombre y pulsar un botón.",
    facts: [
      { value: "3", label: "herramientas que acaban en cita" },
      { value: "AA", label: "lectura fácil en todas las páginas" },
      { value: "0", label: "cookies de publicidad" },
    ],
    accent: "#5fd4bc",
  },
  {
    slug: "raicesdelsur",
    title: "Raíces del Sur",
    tagline: "Tienda de aceite de oliva virgen extra que vende por packs y arranca en preventa",
    category: "Shopify · Ecommerce",
    year: 2026,
    date: "Octubre 2026",
    role: "Diseño, tema a medida y desarrollo Liquid",
    client: "Raíces del Sur",
    location: "Écija, Sevilla",
    status: "wip",
    featured: true,
    liveUrl: "https://raicesdelsuraove.com/",
    cover: "/images/project-raices.jpg",
    gallery: ["/images/screen-raices-inicio.jpg"],
    stack: ["Shopify", "Liquid", "JavaScript", "CSS"],
    goal: "Vender un aceite de edición limitada antes de que salga, con una tienda a la altura del producto.",
    context:
      "Una persona cercana lanzaba su propia marca de aceite de oliva virgen extra: una edición limitada del primer día de cosecha, en botella de 500 ml y caja de regalo. No había tienda, y la idea era abrir en preventa y vender por packs, no botella a botella.",
    summary: [
      "Monté la tienda en Shopify y adapté el tema a la marca: fondo oscuro, detalles dorados y una tipografía clásica, para que un aceite de edición limitada se vea como lo que es y no como uno más del supermercado.",
      "La clave está en cómo se vende. En la ficha del aceite eliges directamente el pack de 2, 4 o 6 botellas y ves al momento cuánto te sale cada una y cuánto te ahorras. El de seis lleva una de regalo, y ese descuento entra solo al pagar, sin códigos.",
    ],
    highlights: [
      "Tema de Shopify adaptado a la marca: oscuro, con detalles dorados y tipografía clásica",
      "Selector de packs en la ficha de producto: 2, 4 o 6 botellas, con el precio por botella y lo que te ahorras",
      "Etiquetas de «Más elegido» y «Mejor oferta» para guiar hacia los packs grandes",
      "Pack 5+1: la sexta botella se descuenta sola al pagar, sin que el cliente meta ningún código",
      "Textos de confianza junto al botón de compra: envío en 24–72 h, pago seguro y 30 días de devolución",
      "Página de eventos de la marca",
    ],
    outcome:
      "La tienda ya está publicada y en preventa: el aceite se puede reservar desde hoy. Sigo añadiéndole cosas antes del lanzamiento.",
    accent: "#cfae74",
  },
  {
    slug: "peluquerialafamilia",
    title: "Peluquería La Familia",
    tagline: "Web de reservas que sustituye a plataformas de pago en una peluquería de Écija",
    category: "Web app · Reservas",
    year: 2026,
    date: "Octubre 2026",
    role: "Planteamiento, especificación técnica y dirección del proyecto",
    client: "Peluquería La Familia",
    location: "Écija, Sevilla",
    status: "live",
    featured: true,
    offlineNote: "Web en uso por los clientes de la peluquería: no se enlaza para no generar reservas de prueba.",
    cover: "/images/project-familia.jpg",
    gallery: ["/images/screen-familia-reserva.jpg"],
    stack: ["Next.js", "Supabase", "Netlify", "Resend", "Claude Code"],
    goal: "Que los clientes reserven solos desde el móvil y la peluquería se ahorre suscripciones externas.",
    context:
      "La peluquería quería su propia web de reservas y llevar un mejor registro de su actividad. Tenía que ir perfecta en el iPhone y en cualquier móvil, y no dar nunca dos citas a la misma hora.",
    summary: [
      "Antes de escribir una línea de código lo dejé todo decidido en una especificación de seis páginas. Recoge los datos del negocio, el diseño, cada paso de la reserva, la base de datos, la seguridad y la privacidad. Al final va una lista de errores que no podían pasar, cada uno con su forma de comprobarlo.",
      "La web se construyó por fases con Claude Code siguiendo esa especificación. El resultado es una reserva en cuatro pasos pensada para el móvil: eliges servicio, día y hora, y la confirmación llega por email.",
    ],
    highlights: [
      "Los datos del negocio y una dirección visual propia, para que no pareciera una plantilla",
      "La reserva en cuatro pasos pensada para el iPhone, con el paso guardado en la dirección para poder volver atrás sin perder nada",
      "Citas abiertas con un mes de antelación, abriendo un día nuevo cada día",
      "Que nunca se puedan dar dos citas a la misma hora, ni aunque dos personas reserven a la vez",
      "Confirmación por email con Resend y recordatorios por WhatsApp",
      "Un panel para el peluquero desde el móvil: agenda, bloqueos de días y fichas de clientes",
      "Seguridad, privacidad y la lista de errores prohibidos con sus pruebas",
    ],
    outcome:
      "La web está publicada y ya se puede reservar desde el móvil. Las confirmaciones salen por email; los avisos por WhatsApp se activarán más adelante.",
    facts: [
      { value: "6", label: "páginas de especificación" },
      { value: "4", label: "pasos para reservar" },
      { value: "1 mes", label: "de citas abiertas, día a día" },
    ],
    accent: "#71c780",
  },
  {
    slug: "manuelinteriorismo",
    title: "Manuel Interiorismo",
    tagline: "Estudio de interiorismo con animaciones GSAP",
    category: "Shopify · Diseño",
    year: 2026,
    date: "En desarrollo",
    role: "Dirección visual, desarrollo y animación",
    client: "Manuel Interiorismo",
    location: "Écija, Sevilla",
    status: "wip",
    featured: true,
    liveUrl: "https://manuelinteriorismo.com/",
    cover: "/images/project-manuel.jpg",
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
    status: "archived",
    featured: true,
    offlineNote: "La tienda cerró al terminar el dropshipping: ya no se puede visitar.",
    cover: "/images/project-langford.jpg",
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
      "La tienda facturó 22.000 £ en sus dos primeros meses. El dropshipping duró tres meses y después se cerró, así que hoy la tienda ya no está activa.",
    facts: [
      { value: "22.000 £", label: "facturados en 2 meses" },
      { value: "3", label: "meses de dropshipping" },
      { value: "0", label: "tiendas previas: montada de cero" },
    ],
    accent: "#e8712b",
  },
];

/* ── Retos personales ──
   Proyectos propios que no son encargos en marcha. Salen en su propio
   apartado de /proyectos y tienen ficha, pero no aparecen en la portada. */
export const personalProjects: Project[] = [
  {
    slug: "facturas",
    title: "Facturas",
    tagline: "App de facturación y control de gastos para autónomos",
    category: "Next.js · App · Supabase",
    year: 2026,
    date: "Agosto 2026",
    role: "Producto, diseño, desarrollo y modelo fiscal",
    location: "Écija, Sevilla",
    status: "archived",
    cover: "/images/project-facturas.jpg",
    gallery: [
      "/images/screen-facturas-panel.jpg",
      "/images/screen-facturas-informes.jpg",
    ],
    galleryNote:
      "El proyecto es real y llegó a usarse; los datos de las capturas no. Están hechas con el juego de datos de ejemplo que trae la propia aplicación, así que el negocio, los clientes, los productos y todos los importes son inventados.",
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
      "Un amigo autónomo y un familiar la usaron para dejar el Excel y facturar desde el móvil. Ahora mismo no la usa nadie, y por eso está aquí y no entre los trabajos para clientes. Me la quedo como el reto con el que más he aprendido: base de datos, cuentas de usuario, tests y una normativa fiscal que no perdona ni un céntimo.",
    facts: [
      { value: "65", label: "tests del motor fiscal" },
      { value: "Verifactu", label: "desde el día uno" },
      { value: "0,00 €", label: "de descuadre: todo en céntimos" },
    ],
    accent: "#7d9142",
  },
];

/** Clientes + retos: para rutas, sitemap y la navegación entre fichas */
export const allProjects: Project[] = [...projects, ...personalProjects];

export const isPersonalProject = (slug: string) =>
  personalProjects.some((p) => p.slug === slug);

export const featuredProjects = projects.filter((p) => p.featured !== false);

export const getProject = (slug: string) => allProjects.find((p) => p.slug === slug);

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
  { value: "5", label: "webs publicadas" },
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
   un proyecto nuevo. Si es un proyecto propio o un reto que no es
   un encargo, pégalo en `personalProjects`: saldrá en el apartado
   «Retos personales» de /proyectos y no en la portada.
   Borra los campos opcionales que no uses.

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
     cover: "/images/mi-proyecto.jpg",   // 16:9, 1920×1080
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
