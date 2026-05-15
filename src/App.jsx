import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
  const [dark, setDark] = useState(false);
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
function Hero({ tr }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const letters = config.name.split("");

  return (
    <section id="top" className="hero">
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

        <h1 className="hero__name">
          {letters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.04, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={char === " " ? "hero__name-space" : ""}
            >
              {char}
            </motion.span>
          ))}
        </h1>

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
        <FadeIn>
          <div className="section__header">
            <span className="section__label">02</span>
            <h2 className="section__title">{tr(t.sections.skills)}</h2>
          </div>
        </FadeIn>

        <div className="skills__grid">
          {skills.map((skill, i) => (
            <FadeIn key={skill.name} delay={i * 0.06}>
              <div className="skill__item">
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
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PROJECT CARD ─────────────────────────────────────────────────
function ProjectCard({ project, index, tr }) {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={index * 0.1}>
      <motion.div
        className="project-card"
        style={{ "--card-color": project.color, "--card-bg": project.bg }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
      >
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
                <div className="project-card__stat-val">{s.value}</div>
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
    </FadeIn>
  );
}

// ── PROJECTS ─────────────────────────────────────────────────────
function Projects({ tr }) {
  return (
    <section id="projects" className="section section--alt">
      <div className="container">
        <FadeIn>
          <div className="section__header">
            <span className="section__label">03</span>
            <h2 className="section__title">{tr(t.sections.projects)}</h2>
          </div>
        </FadeIn>

        <div className="projects__grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} tr={tr} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── EXPERIENCE ───────────────────────────────────────────────────
function Experience({ tr }) {
  return (
    <section id="experience" className="section">
      <div className="container">
        <FadeIn>
          <div className="section__header">
            <span className="section__label">04</span>
            <h2 className="section__title">{tr(t.sections.experience)}</h2>
          </div>
        </FadeIn>

        <div className="timeline">
          {experience.map((exp, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="timeline__item">
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
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="section__header" style={{ marginTop: "5rem" }}>
            <span className="section__label">05</span>
            <h2 className="section__title">{tr(t.sections.education)}</h2>
          </div>
        </FadeIn>

        <div className="timeline">
          {education.map((edu, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="timeline__item">
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
              </div>
            </FadeIn>
          ))}
        </div>
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

  return (
    <div className="app">
      <Nav lang={lang} setLang={setLang} dark={dark} setDark={setDark} tr={tr} />
      <Hero tr={tr} />
      <Skills tr={tr} />
      <Projects tr={tr} />
      <Experience tr={tr} />
      <Contact tr={tr} />
      <Footer />
    </div>
  );
}
