import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { config, colors, skills, projects, experience, education, t } from "./data";
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

// ── LOADER ───────────────────────────────────────────────────────
function Loader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    let current = 0;
    const tick = () => {
      current += Math.random() * 6 + 2;
      if (current >= 100) {
        setCount(100);
        setTimeout(() => setExit(true), 400);
      } else {
        setCount(Math.floor(current));
        setTimeout(tick, 16);
      }
    };
    setTimeout(tick, 120);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!exit && (
        <motion.div
          className="loader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            className="loader__count"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {count}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
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
    const duration = 1400;
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
      <motion.h2 className="section__title"
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>
    </div>
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
        <button className="theme-btn" onClick={() => setDark(!dark)} aria-label="Toggle theme">
          {dark ? "☀" : "☾"}
        </button>
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

          <motion.h1
            className="hero__name"
            initial={{ opacity: 0, y: 40 }}
            animate={loaderDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <ScrambleText text={config.name} trigger={loaderDone} />
          </motion.h1>

          <motion.p
            className="hero__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            {tr(config.title)}
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

// ── SKILLS ───────────────────────────────────────────────────────
function Skills({ tr }) {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader label="02" title={tr(t.sections.skills)} />

        <StaggerReveal className="skills__grid">
          {skills.map((skill, i) => (
            <motion.div key={skill.name} variants={staggerItemUp} className="skill__item">
              <div className="skill__top">
                <span className="skill__name">{skill.name}</span>
                <span className="skill__pct">{skill.level}%</span>
              </div>
              <div className="skill__bar">
                <motion.div
                  className="skill__fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

// ── PROJECT CARD ─────────────────────────────────────────────────
function ProjectCard({ project, tr }) {
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
      variants={staggerItemUp}
      className="project-card"
      style={{ "--card-color": project.color, "--card-bg": project.bg, rotateX: springRotX, rotateY: springRotY, transformPerspective: 1000 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
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
  return (
    <section id="projects" className="section section--alt">
      <div className="container">
        <SectionHeader label="03" title={tr(t.sections.projects)} />

        <StaggerReveal className="projects__grid">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} tr={tr} />
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

// ── EXPERIENCE ───────────────────────────────────────────────────
function Experience({ tr }) {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeader label="04" title={tr(t.sections.experience)} />

        <StaggerReveal className="timeline">
          {experience.map((exp, i) => (
            <motion.div key={i} variants={staggerItemLeft} className="timeline__item">
              <div className="timeline__dot">
                {exp.current && <div className="timeline__dot-pulse" />}
              </div>
              <div className="timeline__content">
                <div className="timeline__top">
                  <div>
                    <div className="timeline__role">{tr(exp.role)}</div>
                    <div className="timeline__company">{exp.company}</div>
                  </div>
                  <div className="timeline__period">
                    {exp.current && <span className="timeline__current">Now</span>}
                    {exp.period}
                  </div>
                </div>
                <p className="timeline__desc">{tr(exp.description)}</p>
              </div>
            </motion.div>
          ))}
        </StaggerReveal>

        <SectionHeader label="05" title={tr(t.sections.education)} style={{ marginTop: "5rem" }} />

        <StaggerReveal className="timeline">
          {education.map((edu, i) => (
            <motion.div key={i} variants={staggerItemLeft} className="timeline__item">
              <div className="timeline__dot" />
              <div className="timeline__content">
                <div className="timeline__top">
                  <div>
                    <div className="timeline__role">{tr(edu.title)}</div>
                    <div className="timeline__company">{edu.institution}</div>
                  </div>
                  <div className="timeline__period">{edu.period}</div>
                </div>
                <p className="timeline__desc">{tr(edu.description)}</p>
              </div>
            </motion.div>
          ))}
        </StaggerReveal>
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
            <a href={`mailto:${config.email}`} className="btn btn--primary">
              {tr(t.contact.email)} ↗
            </a>
            <a href={config.links.fiverr} target="_blank" rel="noreferrer" className="btn btn--outline">
              Fiverr ↗
            </a>
            <a href={config.links.linkedin} target="_blank" rel="noreferrer" className="btn btn--outline">
              LinkedIn ↗
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
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    if (!loaderDone) return;
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [loaderDone]);

  return (
    <div className="app">
      <Loader onComplete={() => setLoaderDone(true)} />
      <MagneticCursor />
      <Nav lang={lang} setLang={setLang} dark={dark} setDark={setDark} tr={tr} />
      <Hero tr={tr} loaderDone={loaderDone} />
      <Skills tr={tr} />
      <Projects tr={tr} />
      <Experience tr={tr} />
      <Contact tr={tr} />
      <Footer />
    </div>
  );
}
