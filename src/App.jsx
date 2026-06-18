import { useState, useEffect, useRef } from "react";
import "./App.css";

const TITLES = [
  "Software Engineer",
  "Full-Stack Developer",
  "Problem Solver",
  "Open Source Contributor",
];

function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const skills = [
  {
    cat: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java", "Go"],
  },
  {
    cat: "Frontend",
    items: ["React", "Next.js", "Vue", "Tailwind CSS", "WebGL"],
  },
  {
    cat: "Backend",
    items: ["Node.js", "FastAPI", "Spring Boot", "GraphQL", "REST"],
  },
  {
    cat: "Cloud & DevOps",
    items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
  },
  {
    cat: "Databases",
    items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
  },
  { cat: "Tools", items: ["Git", "Linux", "Jest", "Figma", "Jira"] },
];

const projects = [
  {
    title: "CloudSync Platform",
    desc: "Distributed file-sync service handling 2M+ daily active users with sub-100ms latency, built on microservices with Kubernetes orchestration.",
    tags: ["Go", "Kubernetes", "AWS", "gRPC"],
    link: "#",
    metrics: "2M+ users · 99.98% uptime",
  },
  {
    title: "Analytix Dashboard",
    desc: "Real-time analytics platform processing 500K events/sec with WebSocket streaming, interactive charts, and role-based access control.",
    tags: ["React", "Node.js", "Kafka", "PostgreSQL"],
    link: "#",
    metrics: "500K events/sec · <50ms render",
  },
  {
    title: "DevFlow CLI",
    desc: "Open-source developer productivity toolkit automating PR reviews, changelog generation, and release tagging via GitHub Actions.",
    tags: ["TypeScript", "GitHub API", "CI/CD"],
    link: "#",
    metrics: "1.2K GitHub stars",
  },
  {
    title: "SecureVault API",
    desc: "Zero-knowledge secrets management service with AES-256 encryption, audit logging, and seamless Terraform provider integration.",
    tags: ["Python", "FastAPI", "Redis", "Vault"],
    link: "#",
    metrics: "SOC2 compliant",
  },
];

const experience = [
  {
    role: "Senior Software Engineer",
    company: "TechNova Inc.",
    period: "2022 – Present",
    bullets: [
      "Led migration of monolith to microservices, cutting deploy time by 70%.",
      "Mentored 4 junior engineers and drove quarterly tech-debt sprints.",
      "Architected real-time notification system serving 800K concurrent users.",
    ],
  },
  {
    role: "Software Engineer",
    company: "BuildStack Ltd.",
    period: "2020 – 2022",
    bullets: [
      "Built and shipped 6 product features used by 200K+ customers.",
      "Reduced API p99 latency from 1.2s to 180ms via query optimisation.",
      "Established frontend component library adopted across 3 product teams.",
    ],
  },
  {
    role: "Junior Developer",
    company: "CodeCraft Agency",
    period: "2018 – 2020",
    bullets: [
      "Delivered full-stack web apps for 12 client projects on time and on budget.",
      "Introduced automated test coverage, raising it from 12% to 78%.",
    ],
  },
];

function SkillSection() {
  const [ref, visible] = useFadeIn();
  return (
    <section
      className={`section skills-section fade-block ${visible ? "visible" : ""}`}
      ref={ref}
      id="skills"
    >
      <div className="section-eyebrow">Expertise</div>
      <h2 className="section-title">Technical Skills</h2>
      <div className="skills-grid">
        {skills.map((s) => (
          <div className="skill-card" key={s.cat}>
            <div className="skill-cat">{s.cat}</div>
            <div className="skill-tags">
              {s.items.map((item) => (
                <span className="skill-tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [ref, visible] = useFadeIn();
  return (
    <section
      className={`section projects-section fade-block ${visible ? "visible" : ""}`}
      ref={ref}
      id="projects"
    >
      <div className="section-eyebrow">Work</div>
      <h2 className="section-title">Featured Projects</h2>
      <div className="projects-grid">
        {projects.map((p) => (
          <div className="project-card" key={p.title}>
            <div className="project-header">
              <h3 className="project-title">{p.title}</h3>
              <span className="project-metrics">{p.metrics}</span>
            </div>
            <p className="project-desc">{p.desc}</p>
            <div className="project-footer">
              <div className="project-tags">
                {p.tags.map((t) => (
                  <span className="proj-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <a href={p.link} className="proj-link">
                View →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  const [ref, visible] = useFadeIn();
  return (
    <section
      className={`section experience-section fade-block ${visible ? "visible" : ""}`}
      ref={ref}
      id="experience"
    >
      <div className="section-eyebrow">Career</div>
      <h2 className="section-title">Experience</h2>
      <div className="timeline">
        {experience.map((e, i) => (
          <div className="timeline-item" key={i}>
            <div className="timeline-dot" />
            <div className="timeline-body">
              <div className="timeline-meta">
                <span className="timeline-role">{e.role}</span>
                <span className="timeline-company">@ {e.company}</span>
                <span className="timeline-period">{e.period}</span>
              </div>
              <ul className="timeline-bullets">
                {e.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  const [ref, visible] = useFadeIn();
  const [copied, setCopied] = useState(false);
  const email = "alex.morgan@email.com";
  const copy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section
      className={`section contact-section fade-block ${visible ? "visible" : ""}`}
      ref={ref}
      id="contact"
    >
      <div className="section-eyebrow">Let's Talk</div>
      <h2 className="section-title">Get In Touch</h2>
      <p className="contact-sub">
        I'm open to senior / staff engineering roles, technical lead positions,
        <br />
        and impactful open-source collaborations.
      </p>
      <div className="contact-row">
        <button className="email-btn" onClick={copy}>
          <span>{email}</span>
          <span className="copy-label">{copied ? "Copied!" : "Copy"}</span>
        </button>
        <a
          href="https://linkedin.com"
          className="contact-link"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn ↗
        </a>
        <a
          href="https://github.com"
          className="contact-link"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>
        <a href="#" className="contact-link">
          Resume PDF ↗
        </a>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const title = useTypewriter(TITLES);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["skills", "projects", "experience", "contact"];

  return (
    <div className="portfolio">
      {/* NAV */}
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <a className="nav-logo" href="#">
          YA<span className="logo-dot">.</span>
        </a>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navLinks.map((l) => (
            <a
              key={l}
              className="nav-link"
              href={`#${l}`}
              onClick={() => setMenuOpen(false)}
            >
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </a>
          ))}
          <a className="nav-cta" href="#contact">
            Hire Me
          </a>
        </div>
        <button
          className="nav-burger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-badge">Available for opportunities</div>
          <h1 className="hero-name">Nawanka Thathsara</h1>
          <div className="hero-title-row">
            <span className="hero-title-static">// </span>
            <span className="hero-title-type">{title}</span>
            <span className="cursor">|</span>
          </div>
          <p className="hero-bio">
            6+ years crafting scalable systems that ship fast and last long. I
            bridge product thinking with engineering rigour— from distributed
            backends to polished UIs.
          </p>
          <div className="hero-actions">
            <a className="btn-primary" href="#projects">
              See My Work
            </a>
            <a className="btn-ghost" href="#contact">
              Contact Me
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">6+</span>
              <span className="stat-label">Years exp.</span>
            </div>
            <div className="stat-div" />
            <div className="stat">
              <span className="stat-num">40+</span>
              <span className="stat-label">Projects shipped</span>
            </div>
            <div className="stat-div" />
            <div className="stat">
              <span className="stat-num">3M+</span>
              <span className="stat-label">Users served</span>
            </div>
          </div>
        </div>

        {/* PROFILE PHOTO */}
        <div className="hero-photo-wrap">
          <div className="hex-ring hex-ring--outer" />
          <div className="hex-ring hex-ring--inner" />
          <div className="hex-photo">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
              alt="Alex Morgan"
              className="profile-img"
            />
          </div>
          <div className="photo-badge photo-badge--tl">React</div>
          <div className="photo-badge photo-badge--br">AWS</div>
        </div>

        <div className="hero-scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <SkillSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />

      <footer className="footer">
        <span>© 2025 Alex Morgan</span>
        <span className="footer-sep">·</span>
        <span>Built with React</span>
      </footer>
    </div>
  );
}
