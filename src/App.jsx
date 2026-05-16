import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { config, colors, skills, projects, experience, education, testimonials, t } from "./data";
import { TypeAnimation } from "react-type-animation";
import toast, { Toaster } from "react-hot-toast";
import "./index.css";

// ── LANGUAGE HOOK ────────────────────────────────────────────────
function useLang() {
  const [lang, setLang] = useState("en");
  const tr = (obj) => (obj && obj[lang]) || obj?.en || "";
  return { lang, setLang, tr };
}

// ── THEME HOOK ───────────────────────────────────────────────────
function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);
  return { dark, setDark };
}

// ── FADE IN WRAPPER ──────────────────────────────────────────────
function FadeIn({ children, delay = 0, y = 30, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── SCRAMBLE TEXT ────────────────────────────────────────────────
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

function ScrambleText({ text, trigger }) {
  const [display, setDisplay] = useState(
    () => text.split("").map(c => c === " " ? " " : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]).join("")
  );

  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const total = text.length + 18;
    const animate = () => {
      setDisplay(
        text.split("").map((char, i) => {
          if (char === " ") return " ";
          if (frame > (i / text.length) * (total - 12)) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join("")
      );
      frame++;
      if (frame < total) requestAnimationFrame(animate);
      else setDisplay(text);
    };
    requestAnimationFrame(animate);
  }, [trigger, text]);

  return <>{display}</>;
}

// ── ANIMATED COUNTER ─────────────────────────────────────────────
function AnimatedCounter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) { setDisplay(value); return; }
    const num = parseFloat(match[1]);
    const suffix = match[2] || "";
    const isDecimal = match[1].includes(".");
    const decimals = isDecimal ? match[1].split(".")[1].length : 0;
    const duration = 2200;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = eased * num;
      setDisplay((isDecimal ? cur.toFixed(decimals) : Math.floor(cur)) + suffix);
      if (p < 1) requestAnimationFrame(tick);
      else setDisplay(value);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

// ── MAGNETIC CURSOR ──────────────────────────────────────────────
function MagneticCursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const [variant, setVariant] = useState("default");

  const dotX = useSpring(mx, { stiffness: 600, damping: 40 });
  const dotY = useSpring(my, { stiffness: 600, damping: 40 });
  const ringX = useSpring(mx, { stiffness: 140, damping: 18 });
  const ringY = useSpring(my, { stiffness: 140, damping: 18 });

  useEffect(() => {
    const move = (e) => { mx.set(e.clientX); my.set(e.clientY); };
    const over = (e) => { if (e.target.closest("a, button")) setVariant("hover"); };
    const out  = (e) => { if (e.target.closest("a, button")) setVariant("default"); };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, []);

  return (
    <>
      <motion.div className="cursor__dot" style={{ x: dotX, y: dotY }}
        animate={variant === "hover" ? { scale: 0 } : { scale: 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div className="cursor__ring" style={{ x: ringX, y: ringY }}
        animate={variant === "hover" ? { scale: 2.4, opacity: 0.5 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
      />
    </>
  );
}

// ── STAGGER ───────────────────────────────────────────────────────
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const staggerItemUp = {
  hidden: { opacity: 0, y: 56 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const staggerItemLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function StaggerReveal({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      variants={staggerContainer} initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ label, title, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="section__header" style={style}>
      <motion.span className="section__label"
        initial={{ opacity: 0, x: -24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {label}
      </motion.span>
      <div className="section__title-clip">
        <motion.h2 className="section__title"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
        >
          {title}
        </motion.h2>
      </div>
    </div>
  );
}

// ── PARTICLES ────────────────────────────────────────────────────
function ParticlesBg() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.4,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      o: Math.random() * 0.35 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,107,53,${p.o})`; ctx.fill();
      });
      pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 130) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(255,107,53,${0.07 * (1 - d / 130)})`; ctx.lineWidth = 0.5; ctx.stroke();
        }
      }));
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(animId); };
  }, []);
  return <canvas ref={canvasRef} className="particles-canvas" />;
}

// ── THEME REVEAL ─────────────────────────────────────────────────
function ThemeReveal({ x, y, targetDark, onComplete }) {
  return (
    <motion.div
      className="theme-reveal"
      style={{ background: targetDark ? "#0a0a0a" : "#ffffff" }}
      initial={{ clipPath: `circle(0px at ${x}px ${y}px)` }}
      animate={{ clipPath: `circle(200vmax at ${x}px ${y}px)` }}
      transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={onComplete}
    />
  );
}

// ── PROJECT MODAL ─────────────────────────────────────────────────
function ProjectModal({ project, onClose, tr }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div className="modal-backdrop" onClick={onClose}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="modal"
        layoutId={`card-${project.id}`}
        onClick={e => e.stopPropagation()}
        style={{ "--card-color": project.color }}
      >
        <button className="modal__close" onClick={onClose}>✕</button>
        <div className="modal__top">
          <div>
            <div className="modal__name">{project.name}</div>
            <div className="project-card__tagline">{tr(project.tagline)}</div>
          </div>
          <div className="project-card__tags">
            {project.tags.map(tag => <span key={tag} className="project-card__tag">{tag}</span>)}
          </div>
        </div>
        <p className="modal__desc">{tr(project.description)}</p>
        {project.stats && (
          <div className="project-card__stats">
            {project.stats.map(s => (
              <div key={s.label} className="project-card__stat">
                <div className="project-card__stat-val"><AnimatedCounter value={s.value} /></div>
                <div className="project-card__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        )}
        {project.link && (
          <a href={project.link} target="_blank" rel="noreferrer" className="btn btn--primary modal__link">
            View project ↗
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────────
const duplicatedTestimonials = [...testimonials, ...testimonials];

function Testimonials({ tr }) {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader label="06" title={tr(t.sections.testimonials)} />
      </div>
      <div className="testimonials__track-wrap">
        <div className="testimonials__track">
          {duplicatedTestimonials.map((item, i) => (
            <div key={`${item.id}-${i}`} className="testimonial__card">
              <div className="testimonial__stars">
                {"★".repeat(item.rating)}
              </div>
              <p className="testimonial__text">"{tr(item.text)}"</p>
              <div className="testimonial__author">
                <div className="testimonial__avatar">{item.avatar}</div>
                <div>
                  <div className="testimonial__name">{item.name}</div>
                  <div className="testimonial__role">{item.role} · {item.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── NAV ──────────────────────────────────────────────────────────
function Nav({ lang, setLang, dark, setDark, tr }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [
    { href: "#about", label: tr(t.nav.about) },
    { href: "#projects", label: tr(t.nav.projects) },
    { href: "#experience", label: tr(t.nav.experience) },
    { href: "#contact", label: tr(t.nav.contact) },
  ];

  return (
    <motion.nav
      className={`nav ${scrolled ? "nav--scrolled" : ""}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#top" className="nav__logo">SR</a>

      <div className="nav__links">
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} className="nav__link">{l.label}</a>
        ))}
      </div>

      <div className="nav__controls">
        <div className="lang-switcher">
          {["en", "it", "es"].map((l) => (
            <button key={l} onClick={() => setLang(l)} className={`lang-btn ${lang === l ? "active" : ""}`}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <motion.button
          className="theme-btn"
          onClick={() => setDark(!dark)}
          aria-label="Toggle theme"
          whileTap={{ scale: 0.85 }}
        >
          <motion.span
            key={dark ? "sun" : "moon"}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            {dark ? "☀" : "☾"}
          </motion.span>
        </motion.button>
      </div>
    </motion.nav>
  );
}

// ── HERO ─────────────────────────────────────────────────────────
function Hero({ tr, loaderDone }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="top" className="hero">
      <ParticlesBg />
      <div className="container hero__layout">
        <motion.div
          className="hero__photo-wrap"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero__photo-frame">
            <img src={config.photo} alt={config.name} className="hero__photo" />
            <div className="hero__photo-overlay" />
          </div>
          <div className="hero__photo-tag">
            <span>{config.location}</span>
          </div>
        </motion.div>

        <motion.div className="hero__inner" style={{ y, opacity }}>
          <motion.div
            className="hero__available"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="hero__dot" />
            {tr(t.hero.available)}
          </motion.div>

          <div className="hero__name-clip">
            <motion.h1
              className="hero__name"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            >
              {config.name}
            </motion.h1>
          </div>

          <motion.p
            className="hero__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            <TypeAnimation
              sequence={config.typewriterPhrases.flatMap(p => [p, 2200])}
              wrapper="span"
              speed={60}
              deletionSpeed={80}
              repeat={Infinity}
            />
          </motion.p>

          <motion.p
            className="hero__tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            {tr(config.tagline)}
          </motion.p>

          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <a href={config.links.fiverr} target="_blank" rel="noreferrer" className="btn btn--primary">
              {tr(t.hero.cta_fiverr)} ↗
            </a>
            <a href="#projects" className="btn btn--outline">
              {tr(t.hero.cta_projects)}
            </a>
            <a href={config.cv} download="Samuel_Reka_CV.pdf" className="btn btn--outline">
              {tr(t.hero.cta_cv)} ↓
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="hero__scroll-line" />
        <span>scroll</span>
      </motion.div>
    </section>
  );
}

// ── SKILL BUBBLE ─────────────────────────────────────────────────
const FLOAT_PARAMS = [
  { y: [0, -14, 0], dur: 3.2 }, { y: [0, -8, 0],  dur: 2.7 },
  { y: [0, -18, 0], dur: 3.8 }, { y: [0, -10, 0], dur: 2.4 },
  { y: [0, -12, 0], dur: 3.5 }, { y: [0, -16, 0], dur: 2.9 },
  { y: [0, -9, 0],  dur: 3.1 }, { y: [0, -13, 0], dur: 2.6 },
];

function SkillBubble({ skill, index }) {
  const { y, dur } = FLOAT_PARAMS[index % FLOAT_PARAMS.length];
  const delay = (index * 0.18) % 2;
  const t = (skill.level - 65) / 35;
  const fontSize = `${13 + t * 11}px`;
  const px = `${16 + t * 16}px`;
  const py = `${9 + t * 8}px`;

  return (
    <motion.div
      variants={staggerItemUp}
      style={{ "--lvl": skill.level }}
    >
      <motion.div
        className="skill__bubble"
        style={{ fontSize, padding: `${py} ${px}` }}
        animate={{ y }}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
        whileHover={{ scale: 1.12, y: -16 }}
      >
        <span className="skill__bubble-name">{skill.name}</span>
        <span className="skill__bubble-level">{skill.level}%</span>
      </motion.div>
    </motion.div>
  );
}

// ── SKILLS ───────────────────────────────────────────────────────
function Skills({ tr }) {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader label="02" title={tr(t.sections.skills)} />
        <StaggerReveal className="skills__bubbles">
          {skills.map((skill, i) => (
            <SkillBubble key={skill.name} skill={skill} index={i} />
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

// ── PROJECT CARD ─────────────────────────────────────────────────
function ProjectCard({ project, tr, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const springRotX = useSpring(rotX, { stiffness: 200, damping: 25 });
  const springRotY = useSpring(rotY, { stiffness: 200, damping: 25 });
  const glowBg = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, ${project.color}28 0%, transparent 65%)`;

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rotY.set((x - 0.5) * 14);
    rotX.set((0.5 - y) * 14);
    glowX.set(x * 100);
    glowY.set(y * 100);
  };

  const onMouseLeave = () => {
    rotX.set(0); rotY.set(0);
    glowX.set(50); glowY.set(50);
  };

  return (
    <motion.div
      ref={cardRef}
      layoutId={`card-${project.id}`}
      variants={staggerItemUp}
      className="project-card"
      style={{ "--card-color": project.color, "--card-bg": project.bg, rotateX: springRotX, rotateY: springRotY, transformPerspective: 1000 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onOpen}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div className="project-card__glow" style={{ background: glowBg }} />

      <div className="project-card__header">
        <div className="project-card__name">{project.name}</div>
        <div className="project-card__tags">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="project-card__tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="project-card__tagline">{tr(project.tagline)}</div>

      <p className="project-card__desc">{tr(project.description)}</p>

      {project.stats && (
        <div className="project-card__stats">
          {project.stats.map((s) => (
            <div key={s.label} className="project-card__stat">
              <div className="project-card__stat-val">
                <AnimatedCounter value={s.value} />
              </div>
              <div className="project-card__stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {project.link && (
        <motion.a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="project-card__link"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.2 }}
        >
          View ↗
        </motion.a>
      )}

      <motion.div
        className="project-card__accent"
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

// ── PROJECTS ─────────────────────────────────────────────────────
function Projects({ tr }) {
  const [selected, setSelected] = useState(null);
  return (
    <section id="projects" className="section section--alt">
      <div className="container">
        <SectionHeader label="03" title={tr(t.sections.projects)} />
        <StaggerReveal className="projects__grid">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} tr={tr} onOpen={() => setSelected(p)} />
          ))}
        </StaggerReveal>
      </div>
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} tr={tr} />}
      </AnimatePresence>
    </section>
  );
}

// ── TIMELINE ITEM ────────────────────────────────────────────────
function TimelineItem({ item, tr, isEducation }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isActive = useInView(ref, { once: false, margin: "-38% 0px -38% 0px" });

  return (
    <motion.div
      ref={ref}
      className={`timeline__item${isActive ? " timeline__item--active" : ""}`}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="timeline__dot">
        {item.current && <div className="timeline__dot-pulse" />}
      </div>
      <div className="timeline__card">
        <div className="timeline__top">
          <div>
            <div className="timeline__role">
              {tr(isEducation ? item.title : item.role)}
            </div>
            <div className="timeline__company">
              {isEducation ? item.institution : item.company}
            </div>
          </div>
          <div className="timeline__period">
            {item.current && <span className="timeline__current">Now</span>}
            {item.period}
          </div>
        </div>
        <p className="timeline__desc">{tr(item.description)}</p>
      </div>
    </motion.div>
  );
}

// ── TIMELINE SECTION ─────────────────────────────────────────────
function TimelineSection({ items, tr, isEducation = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.15"],
  });
  const lineScaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.001 });

  return (
    <div className="timeline" ref={ref}>
      <motion.div className="timeline__progress" style={{ scaleY: lineScaleY }} />
      {items.map((item, i) => (
        <TimelineItem key={i} item={item} tr={tr} isEducation={isEducation} />
      ))}
    </div>
  );
}

// ── EXPERIENCE ───────────────────────────────────────────────────
function Experience({ tr }) {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeader label="04" title={tr(t.sections.experience)} />
        <TimelineSection items={experience} tr={tr} />

        <SectionHeader label="05" title={tr(t.sections.education)} style={{ marginTop: "5rem" }} />
        <TimelineSection items={education} tr={tr} isEducation />
      </div>
    </section>
  );
}

// ── CONTACT ──────────────────────────────────────────────────────
function Contact({ tr }) {
  return (
    <section id="contact" className="section section--contact">
      <div className="container">
        <FadeIn>
          <h2 className="contact__title">{tr(t.sections.contact)}</h2>
          <p className="contact__sub">{tr(t.contact.subtitle)}</p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="contact__links">
            <a
              href={`mailto:${config.email}`}
              className="btn btn--primary"
              onClick={() => toast(tr(t.contact.toast_email), { icon: "✉️" })}
            >
              {tr(t.contact.email)} ↗
            </a>
            <a
              href={config.links.fiverr} target="_blank" rel="noreferrer"
              className="btn btn--outline"
              onClick={() => toast(tr(t.contact.toast_fiverr), { icon: "🚀" })}
            >
              Fiverr ↗
            </a>
            <a
              href={config.links.linkedin} target="_blank" rel="noreferrer"
              className="btn btn--outline"
              onClick={() => toast(tr(t.contact.toast_linkedin), { icon: "💼" })}
            >
              LinkedIn ↗
            </a>
            <a href={config.cv} download="Samuel_Reka_CV.pdf" className="btn btn--outline"
              onClick={() => toast("Downloading CV... ↓", { icon: "📄" })}
            >
              {tr(t.hero.cta_cv)} ↓
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="contact__social">
            <a href={config.links.instagram} target="_blank" rel="noreferrer">@smdayone</a>
            <span>·</span>
            <a href={config.links.github} target="_blank" rel="noreferrer">github/smdayone</a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── FOOTER ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>© {new Date().getFullYear()} Samuel Reka</span>
        <span>Built with React + Framer Motion</span>
      </div>
    </footer>
  );
}

// ── APP ──────────────────────────────────────────────────────────
export default function App() {
  const { lang, setLang, tr } = useLang();
  const { dark, setDark } = useTheme();

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="app">
      <Toaster position="bottom-right" toastOptions={{ style: { background: "var(--bg-card)", color: "var(--text)", border: "1px solid var(--border)" }, duration: 2000 }} />
      <MagneticCursor />
      <Nav lang={lang} setLang={setLang} dark={dark} setDark={setDark} tr={tr} />
      <Hero tr={tr} loaderDone={true} />
      <Skills tr={tr} />
      <Projects tr={tr} />
      <Experience tr={tr} />
      <Testimonials tr={tr} />
      <Contact tr={tr} />
      <Footer />
    </div>
  );
}
