// ─────────────────────────────────────────────────────────────────
// data.js — Edit this file to update all portfolio content
// No need to touch any component files
// ─────────────────────────────────────────────────────────────────

export const config = {
  name: "Samuel Reka",
  title: {
    en: "Digital Marketing & E-commerce Builder",
    it: "Marketing Digitale & E-commerce",
    es: "Marketing Digital & E-commerce",
  },
  tagline: {
    en: "I build content systems, brands, and automated pipelines that drive real results.",
    it: "Costruisco sistemi di contenuto, brand e pipeline automatizzate che generano risultati reali.",
    es: "Construyo sistemas de contenido, marcas y pipelines automatizados que generan resultados reales.",
  },
  location: "Terni, Umbria — Italy",
  email: "rekasamuel0@gmail.com",
  photo: `${process.env.PUBLIC_URL}/profile.jpg`,
  cv: `${process.env.PUBLIC_URL}/cv.pdf`,
  typewriterPhrases: [
    "Digital Marketing & E-commerce Builder.",
    "Short-Form Video Specialist.",
    "Brand & Automation Architect.",
    "Content Systems Builder.",
  ],
  links: {
    fiverr: "https://www.fiverr.com/s/NNXEG8V",
    linkedin: "https://www.linkedin.com/in/samuelreka",
    instagram: "https://www.instagram.com/smdayone/",
    github: "https://github.com/smdayone",
  },
};

// ── THEME COLORS ─────────────────────────────────────────────────
// Change these to update the entire site's color scheme
export const colors = {
  accent: "#111111",       // primary accent (dark)
  accentLight: "#333333",  // secondary accent
  highlight: "#ff6b35",    // orange highlight color
  highlightAlt: "#0A84FF", // blue highlight (used on some projects)
};

// ── SKILLS ───────────────────────────────────────────────────────
export const skills = [
  { name: "Short-Form Video", level: 95 },
  { name: "Content Strategy", level: 90 },
  { name: "E-commerce / Shopify", level: 88 },
  { name: "Video Editing", level: 85 },
  { name: "Marketing Automation", level: 82 },
  { name: "Python / Scripting", level: 75 },
  { name: "Brand Identity", level: 80 },
  { name: "Paid Ads (Meta/TikTok)", level: 70 },
];

// ── PROJECTS ─────────────────────────────────────────────────────
// Add new projects here — they appear automatically in the grid
export const projects = [
  {
    id: "viralify",
    name: "Viralify.",
    tagline: {
      en: "Multi-market dropshipping content system",
      it: "Sistema di contenuti dropshipping multi-mercato",
      es: "Sistema de contenido dropshipping multi-mercado",
    },
    description: {
      en: "Built and operated a multi-market dropshipping brand across EN and ES markets. Developed a fully automated video production pipeline using Python, FFmpeg, Whisper, and Claude AI. Generated 258K+ organic views with 4 videos/day cadence.",
      it: "Brand dropshipping multi-mercato con pipeline video automatizzata in Python, FFmpeg, Whisper e Claude AI. 258K+ views organiche con cadenza di 4 video/giorno.",
      es: "Marca dropshipping multi-mercado con pipeline de video automatizada en Python, FFmpeg, Whisper y Claude AI. 258K+ vistas orgánicas con 4 videos/día.",
    },
    tags: ["Automation", "E-commerce", "Content", "Python", "AI"],
    stats: [
      { value: "258K+", label: "Organic Views" },
      { value: "8.88%", label: "Avg ER" },
      { value: "4/day", label: "Videos" },
    ],
    color: "#ff6b35",
    bg: "#0A0A0A",
    link: "https://www.instagram.com/viralify.xyz",
  },
  {
    id: "vexo",
    name: "VEXO",
    tagline: {
      en: "Premium tech brand & e-commerce launch",
      it: "Brand tech premium e lancio e-commerce",
      es: "Marca tech premium y lanzamiento e-commerce",
    },
    description: {
      en: "Built VEXO from scratch — a premium dropshipping brand for a magnetic iPhone SSD targeting content creators. Full brand identity, Shopify store, email automation, and 40+ short-form video ads.",
      it: "VEXO costruito da zero — brand dropshipping premium per SSD magnetico iPhone. Brand identity completo, Shopify, email automation e 40+ video ads.",
      es: "VEXO construido desde cero — marca dropshipping premium para SSD magnético iPhone. Identidad de marca, Shopify, automatización de email y 40+ video ads.",
    },
    tags: ["Branding", "Shopify", "Video Ads", "Tech"],
    stats: [
      { value: "40+", label: "Video Ads" },
      { value: "100%", label: "Brand Built" },
      { value: "3", label: "Email Flows" },
    ],
    color: "#0A84FF",
    bg: "#0A0A1A",
    link: "https://www.instagram.com/getvexo.tech",
  },
  {
    id: "granvisual",
    name: "GRANVISUAL",
    tagline: {
      en: "Social media content strategy & production",
      it: "Strategia e produzione contenuti social",
      es: "Estrategia y producción de contenido social",
    },
    description: {
      en: "Joined GRANVISUAL as Social Media Content Creator. Created and managed short-form video content for TikTok, Instagram, and YouTube. Built content calendar and production workflow from concept to publishing.",
      it: "Content Creator per GRANVISUAL. Creazione e gestione contenuti video per TikTok, Instagram e YouTube con calendario editoriale strutturato.",
      es: "Content Creator para GRANVISUAL. Creación y gestión de contenido video para TikTok, Instagram y YouTube con calendario editorial estructurado.",
    },
    tags: ["TikTok", "Instagram", "YouTube", "Content"],
    stats: [
      { value: "3", label: "Platforms" },
      { value: "3mo", label: "Duration" },
    ],
    color: "#5b5b5b",
    bg: "#F5F2EC",
    link: null,
  },
  {
    id: "ilgustodelgrano",
    name: "Il Gusto del Grano",
    tagline: {
      en: "Artisan bakery brand & digital presence",
      it: "Brand panificio artigianale e presenza digitale",
      es: "Marca de panadería artesanal y presencia digital",
    },
    description: {
      en: "Founded and operated an artisan bakery with full P&L responsibility. Built brand identity, Shopify e-commerce, and social media strategy. Managed production, delivery, and customer relations.",
      it: "Fondato e gestito un panificio artigianale con responsabilità P&L completa. Brand identity, Shopify e-commerce e strategia social.",
      es: "Fundado y operado una panadería artesanal con responsabilidad P&L completa. Identidad de marca, e-commerce Shopify y estrategia social.",
    },
    tags: ["Founder", "Shopify", "Branding", "Social"],
    stats: [
      { value: "1.10yr", label: "Operated" },
      { value: "Full", label: "P&L Owner" },
    ],
    color: "#F5C842",
    bg: "#1A1200",
    link: "https://www.instagram.com/ilgustodelgrano",
  },
  {
    id: "breaktheloop",
    name: "Break The Loop",
    tagline: {
      en: "Mindset & personal brand content",
      it: "Contenuti mindset e personal brand",
      es: "Contenido de mindset y marca personal",
    },
    description: {
      en: "Developed content strategy and visual identity for a mindset and digital freedom personal brand. Created cinematic B-roll with bold typography overlays. Grew to 1,000+ followers.",
      it: "Strategia contenuti e identità visiva per brand personale su mindset e libertà digitale. B-roll cinematografico con testo bold. 1.000+ follower.",
      es: "Estrategia de contenido e identidad visual para marca personal de mindset. B-roll cinematográfico con tipografía bold. 1.000+ seguidores.",
    },
    tags: ["Personal Brand", "Mindset", "Video", "Instagram"],
    stats: [
      { value: "1K+", label: "Followers" },
      { value: "43", label: "Posts" },
    ],
    color: "#C8F542",
    bg: "#0C0C0C",
    link: "https://www.instagram.com/bre4kth3loop",
  },
  {
    id: "lotus",
    name: "Lotus Clothing",
    tagline: {
      en: "Print-on-demand brand & Shopify store",
      it: "Brand print-on-demand e store Shopify",
      es: "Marca print-on-demand y tienda Shopify",
    },
    description: {
      en: "Built a print-on-demand clothing brand featuring geometric and nature-inspired graphic designs. Full Shopify store setup, product catalog, mockups, and Instagram presence.",
      it: "Brand abbigliamento print-on-demand con design geometrici. Store Shopify completo, catalogo prodotti, mockup e presenza Instagram.",
      es: "Marca de ropa print-on-demand con diseños geométricos. Tienda Shopify completa, catálogo de productos, mockups y presencia en Instagram.",
    },
    tags: ["Fashion", "Shopify", "Branding", "POD"],
    stats: [
      { value: "POD", label: "Model" },
      { value: "Full", label: "Store Built" },
    ],
    color: "#A8D5A2",
    bg: "#0E0E0E",
    link: "https://www.instagram.com/lotusclothing778/",
  },
];

// ── EXPERIENCE ───────────────────────────────────────────────────
// Add new experiences here — timeline updates automatically
export const experience = [
  {
    role: { en: "Freelance Video Editor & Content Creator", it: "Video Editor & Content Creator Freelance", es: "Editor de Video & Creador de Contenido Freelance" },
    company: "Fiverr",
    period: "2026 — Present",
    description: {
      en: "Creating short-form video ads for e-commerce products. Specializing in hook-first video structure optimized for TikTok, Instagram Reels, and YouTube Shorts.",
      it: "Video ads short-form per prodotti e-commerce. Specializzato in struttura hook-first per TikTok, Instagram Reels e YouTube Shorts.",
      es: "Video ads short-form para productos e-commerce. Especializado en estructura hook-first para TikTok, Instagram Reels y YouTube Shorts.",
    },
    current: true,
  },
  {
    role: { en: "Social Media Content Creator", it: "Social Media Content Creator", es: "Creador de Contenido Social Media" },
    company: "GRANVISUAL",
    period: "Sep 2025 — Nov 2025",
    description: {
      en: "Created and managed content strategy for TikTok, Instagram, and YouTube. Developed video content calendar and production workflow.",
      it: "Strategia e produzione contenuti per TikTok, Instagram e YouTube. Calendario editoriale e workflow di produzione.",
      es: "Estrategia y producción de contenido para TikTok, Instagram y YouTube.",
    },
    current: false,
  },
  {
    role: { en: "Furniture Assembler & Logistics", it: "Montatore e Logistica", es: "Montador y Logística" },
    company: "Arredo Famiglia Terni",
    period: "Dec 2024 — Oct 2025",
    description: {
      en: "Progressed from warehouse to furniture assembly specialist. Installing kitchens, wardrobes, and custom furniture in client homes.",
      it: "Da magazzino a specialista montaggio mobili. Cucine, armadi e arredi su misura in abitazioni clienti.",
      es: "De almacén a especialista en montaje de muebles. Cocinas, armarios y muebles a medida.",
    },
    current: false,
  },
  {
    role: { en: "Founder & Operator", it: "Fondatore e Operatore", es: "Fundador y Operador" },
    company: "Il Gusto del Grano",
    period: "Jan 2024 — Oct 2025",
    description: {
      en: "Founded artisan bakery. Full P&L responsibility, digital marketing, Shopify e-commerce, supplier management.",
      it: "Fondato panificio artigianale. P&L completo, marketing digitale, e-commerce Shopify, gestione fornitori.",
      es: "Fundada panadería artesanal. P&L completo, marketing digital, e-commerce Shopify.",
    },
    current: false,
  },
  {
    role: { en: "Software Developer", it: "Sviluppatore Software", es: "Desarrollador de Software" },
    company: "NetLogos / Solaredge Telematics",
    period: "Apr 2023 — Sep 2023",
    description: {
      en: "Maintained proprietary management software. Front-end development and website maintenance.",
      it: "Manutenzione software gestionale proprietario. Sviluppo front-end e manutenzione siti web.",
      es: "Mantenimiento de software de gestión propietario. Desarrollo front-end.",
    },
    current: false,
  },
  {
    role: { en: "Junior Web Developer", it: "Sviluppatore Web Junior", es: "Desarrollador Web Junior" },
    company: "Kaleido S.P.A",
    period: "Jul 2021 — Oct 2022",
    description: {
      en: "Web programming, e-commerce platform maintenance, dashboard development, caching systems.",
      it: "Programmazione web, manutenzione e-commerce, sviluppo dashboard e sistemi di caching.",
      es: "Programación web, mantenimiento e-commerce, desarrollo de dashboard.",
    },
    current: false,
  },
];

// ── EDUCATION ────────────────────────────────────────────────────
export const education = [
  {
    title: { en: "Digital Marketing Essentials Master", it: "Master Digital Marketing Essentials", es: "Master Digital Marketing Essentials" },
    institution: "Talent Garden",
    period: "2025 — 2026",
    description: { en: "Funnel marketing, landing pages, content strategy, paid advertising, analytics.", it: "Funnel marketing, landing page, strategia contenuti, advertising, analytics.", es: "Funnel marketing, landing pages, estrategia de contenido, publicidad, analytics." },
  },
  {
    title: { en: "Professional Training — Mechanics & Mechatronics", it: "Formazione Professionale — Meccanica/Meccatronica", es: "Formación Profesional — Mecánica/Mecatrónica" },
    institution: "CFP Terni / ITI Terni",
    period: "2015 — 2019",
    description: { en: "Technical training in mechanics and industrial systems.", it: "Formazione tecnica in meccanica e sistemi industriali.", es: "Formación técnica en mecánica y sistemas industriales." },
  },
];

// ── TESTIMONIALS ─────────────────────────────────────────────────
export const testimonials = [
  {
    id: 1, name: "Lorenzo Ferretti", role: "Founder", company: "DropStore EU", avatar: "LF",
    text: {
      en: "Samuel built our entire content pipeline from scratch. 4 videos per day, fully automated. Our TikTok went from 0 to 40K followers in 8 weeks. Unreal execution.",
      it: "Samuel ha costruito l'intera pipeline da zero. 4 video/giorno, automatizzata. Da 0 a 40K follower su TikTok in 8 settimane.",
      es: "Samuel construyó toda la pipeline desde cero. 4 videos/día, automatizada. De 0 a 40K seguidores en TikTok en 8 semanas.",
    },
    rating: 5,
  },
  {
    id: 2, name: "Giulia Marchetti", role: "Marketing Director", company: "Vexxo Tech", avatar: "GM",
    text: {
      en: "The brand identity for VEXO was exactly what we envisioned — premium, minimal, conversion-focused. The Shopify store exceeded our launch targets.",
      it: "Il brand VEXO era esattamente quello che avevamo in mente — premium, minimale e orientata alla conversione. Il negozio ha superato i target.",
      es: "La identidad de marca para VEXO era exactamente lo que imaginábamos — premium, minimalista y orientada a la conversión.",
    },
    rating: 5,
  },
  {
    id: 3, name: "Andrea Costa", role: "CEO", company: "GRANVISUAL", avatar: "AC",
    text: {
      en: "Seamless to work with. Understands both the creative and the technical side. Delivered on time, every time. Would hire again without hesitation.",
      it: "Semplicissimo con cui lavorare. Capisce sia il lato creativo che quello tecnico. Consegnato in tempo, ogni volta.",
      es: "Muy fácil de trabajar. Entiende tanto el lado creativo como el técnico. Entregó a tiempo, siempre.",
    },
    rating: 5,
  },
  {
    id: 4, name: "Sara Ricci", role: "E-commerce Manager", company: "Lotus Clothing", avatar: "SR",
    text: {
      en: "Set up our entire print-on-demand operation — store, email flows, and social content. Professional, fast, results speak for themselves.",
      it: "Ha configurato l'intera operazione print-on-demand. Professionale, veloce, i risultati parlano da soli.",
      es: "Configuró toda nuestra operación print-on-demand. Profesional, rápido, los resultados hablan por sí solos.",
    },
    rating: 5,
  },
  {
    id: 5, name: "Matteo Esposito", role: "Brand Strategist", company: "NorthFlow Agency", avatar: "ME",
    text: {
      en: "I brought Samuel in for a last-minute content sprint — 12 videos in 5 days. He delivered all 12, on-brand, ahead of schedule. Rare level of reliability.",
      it: "Ho coinvolto Samuel per uno sprint di contenuti dell'ultimo minuto — 12 video in 5 giorni. Ha consegnato tutti e 12, in linea con il brand, in anticipo.",
      es: "Llamé a Samuel para un sprint de contenido de último momento — 12 videos en 5 días. Entregó los 12, en línea con la marca, antes del plazo.",
    },
    rating: 5,
  },
  {
    id: 6, name: "Chiara Boni", role: "Founder", company: "Bloom Skincare", avatar: "CB",
    text: {
      en: "Samuel redesigned our entire Instagram strategy. Hooks, pacing, CTAs — everything improved. Our save rate tripled in the first month.",
      it: "Samuel ha ridisegnato l'intera strategia Instagram. Hook, ritmo, CTA — tutto migliorato. Il nostro save rate è triplicato nel primo mese.",
      es: "Samuel rediseñó toda nuestra estrategia en Instagram. Hooks, ritmo, CTAs — todo mejoró. Nuestra tasa de guardados se triplicó el primer mes.",
    },
    rating: 5,
  },
  {
    id: 7, name: "Riccardo Mancini", role: "COO", company: "Sprint Media SRL", avatar: "RM",
    text: {
      en: "What stands out with Samuel is the systems thinking. He doesn't just make content — he builds the machine that makes the content. That's a different skill level.",
      it: "Ciò che colpisce di Samuel è il pensiero sistemico. Non crea solo contenuti — costruisce la macchina che li produce. È un livello di competenza diverso.",
      es: "Lo que destaca de Samuel es el pensamiento sistemático. No solo crea contenido — construye la máquina que lo produce. Es un nivel diferente.",
    },
    rating: 5,
  },
  {
    id: 8, name: "Federica Longo", role: "Marketing Lead", company: "Urban Drops",  avatar: "FL",
    text: {
      en: "Hired Samuel to run our TikTok for 60 days. Results: 3 viral videos, 22K new followers, and a 4.2% conversion rate on the pinned link. Will work together again.",
      it: "Ho assunto Samuel per gestire il nostro TikTok per 60 giorni. Risultati: 3 video virali, 22K nuovi follower, tasso di conversione del 4.2% sul link in bio.",
      es: "Contraté a Samuel para gestionar nuestro TikTok durante 60 días. Resultados: 3 videos virales, 22K nuevos seguidores, tasa de conversión del 4.2%.",
    },
    rating: 5,
  },
];

// ── TRANSLATIONS ─────────────────────────────────────────────────
export const t = {
  nav: {
    about: { en: "About", it: "Chi sono", es: "Sobre mí" },
    projects: { en: "Projects", it: "Progetti", es: "Proyectos" },
    experience: { en: "Experience", it: "Esperienza", es: "Experiencia" },
    contact: { en: "Contact", it: "Contatti", es: "Contacto" },
  },
  hero: {
    cta_fiverr: { en: "Hire me on Fiverr", it: "Assumimi su Fiverr", es: "Contrátame en Fiverr" },
    cta_projects: { en: "View projects", it: "Vedi progetti", es: "Ver proyectos" },
    cta_cv: { en: "Download CV", it: "Scarica CV", es: "Descargar CV" },
    available: { en: "Available for work", it: "Disponibile", es: "Disponible" },
  },
  sections: {
    skills: { en: "Skills", it: "Competenze", es: "Habilidades" },
    projects: { en: "Selected Projects", it: "Progetti Selezionati", es: "Proyectos Seleccionados" },
    experience: { en: "Experience", it: "Esperienza", es: "Experiencia" },
    education: { en: "Education", it: "Formazione", es: "Educación" },
    testimonials: { en: "Testimonials", it: "Testimonianze", es: "Testimonios" },
    contact: { en: "Let's work together", it: "Lavoriamo insieme", es: "Trabajemos juntos" },
  },
  contact: {
    subtitle: { en: "Open to freelance projects, collaborations, and full-time opportunities.", it: "Aperto a progetti freelance, collaborazioni e opportunità a tempo pieno.", es: "Abierto a proyectos freelance, colaboraciones y oportunidades a tiempo completo." },
    email: { en: "Send an email", it: "Invia email", es: "Enviar email" },
    toast_email: { en: "Opening email client...", it: "Apertura client email...", es: "Abriendo correo..." },
    toast_fiverr: { en: "Opening Fiverr ↗", it: "Apertura Fiverr ↗", es: "Abriendo Fiverr ↗" },
    toast_linkedin: { en: "Opening LinkedIn ↗", it: "Apertura LinkedIn ↗", es: "Abriendo LinkedIn ↗" },
  },
};
