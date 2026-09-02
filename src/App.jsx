import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

/* ------------------------------------------------------------------
   CONTENT
   ------------------------------------------------------------------ */
const NAV_LINKS = [
  { id: "approach", label: "Approach" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const LIFECYCLE = [
  { id: "understand", n: "01", label: "Understand", note: "The business problem, not the tech." },
  { id: "analyse", n: "02", label: "Analyse", note: "Requirements, users, roles, data." },
  { id: "design", n: "03", label: "Design", note: "Architecture, schema, APIs, permissions." },
  { id: "build", n: "04", label: "Build", note: "Web, mobile, and serverless." },
  { id: "deploy", n: "05", label: "Deploy", note: "Into production, monitored." },
  { id: "train", n: "06", label: "Train", note: "Demos, guides, and onboarding." },
];

const PHASES = [
  {
    idx: "01",
    title: "Understand — the business problem first",
    text: "Every project starts with the question the business is actually trying to answer, not a feature list. I map who is involved, what breaks today, and what “fixed” looks like before any design work begins.",
    evidence: "Ariso Technologies — own features from requirement gathering onward",
  },
  {
    idx: "02",
    title: "Analyse — what the solution really has to do",
    text: "Requirements, user roles, workflows, the data model, and the constraints. On Smart Crew this is where “one worker, many companies” became a multi-tenant model; on the child-health record it fixed three roles and six record types.",
    evidence: "Smart Crew — a multi-tenant model driven straight from an access requirement",
  },
  {
    idx: "03",
    title: "Design — the right technical solution",
    text: "Architecture, database schema, the API surface, the permission model, and the user flows. I settle the shape — one request pipeline, one RBAC approach, clear service boundaries — so the build stays consistent as it grows.",
    evidence: "Curry King — one layered pattern holding 150+ endpoints together",
  },
  {
    idx: "04",
    title: "Build — working software across the stack",
    text: "Web dashboards, React Native apps, and serverless backends, plus the third-party integrations. The same patterns front to back, so the codebase reads the same at 5,000 lines and at 100,000.",
    evidence: "Curry King — 5 production apps from one codebase",
  },
  {
    idx: "05",
    title: "Deploy — into the hands of real users",
    text: "Serverless on Firebase and GCP, branch-based CI/CD with separate dev and prod projects, and the monitoring to know it is healthy. Sensitive endpoints locked down with JWT role-based access.",
    evidence: "Curry King — 150+ secure REST endpoints across 5 live production apps",
  },
  {
    idx: "06",
    title: "Train & support — so the business can run it",
    text: "Feature demos in review sessions, written user guides, and onboarding flows. Because I have worked the whole line, I can explain it in the language of the people who use it.",
    evidence: "Regular feature demonstrations in Agile review sessions",
  },
];

const SKILLS = [
  {
    group: "Core stack",
    items: ["Node.js", "Express.js", "TypeScript", "JavaScript", "Java", "React.js", "React Native", "HTML5", "CSS3", "Responsive UI"],
  },
  {
    group: "Cloud & databases",
    items: ["Google Cloud Platform", "Firebase", "Firestore", "Cloud Functions", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Serverless"],
  },
  {
    group: "Architecture & practice",
    items: ["REST API design", "RBAC & JWT", "Multi-tenant SaaS", "Layered service pattern", "Query optimisation", "CI/CD (GitHub Actions)", "Git", "Agile / Scrum", "Code reviews", "Postman", "Debugging", "Claude Code"],
  },
  {
    group: "Training & support",
    items: ["Technical presentations", "Feature demonstrations", "User guides", "Client support", "Software onboarding", "Documentation"],
  },
];

const EXPERIENCE = [
  {
    company: "Ariso Technologies (Pvt) Ltd",
    role: "Full-stack Engineer",
    period: "Oct 2024 — Present",
    bullets: [
      "Own features across the full lifecycle — requirement gathering, technical design, implementation, testing, and deployment — using tools such as Claude Code to speed up development and documentation.",
      "Work in Agile cross-functional teams to design, test, and ship features, and present functionality during review sessions.",
      "Designed and deployed serverless APIs on Firebase and GCP; optimised PostgreSQL queries and added Redis caching, cutting system response times by 25%.",
      "Integrated third-party ecosystem services and secured sensitive endpoints with JWT-based role-based access control.",
    ],
  },
];

const PROJECTS = [
  {
    name: "Smart Crew",
    kind: "Solo full-stack build — multi-tenant NFC attendance & inventory SaaS for field-operations crews",
    problem:
      "A field-operations company can't run on self-reported clock-ins — it needs evidence that a named worker was physically at a specific site during a scheduled shift, plus the stockroom those same crews draw from on one system.",
    link: "https://smartcrew-b491a.web.app/login",
    linkLabel: "Open the live app",
    stack: ["React + Vite", "React Native", "TypeScript", "Redux Toolkit", "Firebase Cloud Functions", "Cloud Firestore", "Firebase Auth", "Stripe"],
    points: [
      "Sole designer and builder — web dashboard, React Native worker app, and Cloud Functions backend for firms running crews across many sites. Multi-tenant from the first line of schema: every document carries a tenantId, and a worker switches company in-app without a second account.",
      "Built NFC check-in as proof of presence, not a self-reported clock-in — a tap only counts when four checks pass server-side: an NFC tag physically at the site, a GPS fix inside the geofence, an accepted job for that site, and the scheduled window. Every rejection returns a specific reason.",
      "Put every read and write behind Cloud Functions on the Admin SDK — Firestore rules guard only 5 of ~30 collections. ~119 admin endpoints, one file each, all four identical moves: authorize → resolve tenant → business logic over a repository interface → typed errors mapped to HTTP codes.",
      "Designed permission-string RBAC — endpoints gate on strings, not roles, so a tenant's custom role slots in with no endpoint change — and worked around Firebase's 1000-byte claims cap with a compact active-tenant claim, a trimmed membership list, full detail in Firestore, and a forced token refresh on every change.",
      "Added a full inventory domain on the same tenant spine — purchase orders, goods receipts, a running stock ledger, request-and-approve adjustments — gated behind the Pro plan. A goods receipt posts as one Firestore transaction: per-batch quantities, a signed ledger entry with running balance, and a PO audit trail.",
      "Drove Stripe billing end to end — checkout, portal, signature-verified webhooks, 3 plan tiers — enforced two ways: feature gates before an endpoint runs, and hard limits that count live rows (the 26th worker on Basic is refused with the plan it needs, not a bare 403).",
      "Ran a six-part UI/UX audit across web and mobile (~116 severity-ranked findings) and did the remediation — six drifting design systems consolidated into one token set, job-status colours canonicalised across every surface, and the navigation shell rebuilt on a custom drawer.",
    ],
    flowTitle: "NFC check-in — every check is server-side",
    flow: [
      "Tap · nfc_uid + GPS",
      "Resolve site",
      "Geofence check",
      "Match job + window",
      "Confirm job",
      "Record attendance",
    ],
    note: "Known debt, taken on purpose: no automated test suite yet (the repository seam was built to make it payable), and the permission model is hand-synced across backend, web, and mobile.",
  },
  {
    name: "Curry King (Pvt) Ltd",
    kind: "Production client project — multi-brand cloud-kitchen & mobile-cart food delivery platform",
    problem:
      "A multi-brand food-delivery operation ran customer apps, restaurant consoles, cart operations, and a WhatsApp channel that all needed the same backend, rules, and data — without four teams building four versions of it.",
    stack: ["TypeScript", "React", "Node.js", "Firebase Cloud Functions", "Firestore", "REST", "CyberSource", "Algolia", "RBAC"],
    points: [
      "Engineered a unified serverless backend on Firebase and GCP that powers 5 live production apps from one codebase — customer web, customer mobile, restaurant admin console, cart-operator app, and a WhatsApp ordering agent.",
      "Worked full-stack, not backend only — owned features end to end on the React admin, super-admin, and task-manager consoles, from screens and client state through to the Cloud Functions endpoints they call.",
      "Built and optimised 150+ secure REST endpoints organised by client, each following one layered pattern — authorize → validate → business logic → repository → data service — so a ~100k-line codebase stays readable as it grows.",
      "Modelled RBAC and administrative isolation across the platform: configurable roles, feature groups, and a permission matrix separating restaurant admins from platform super-admins, with JWT role-based access on sensitive endpoints.",
      "Implemented core order and payment workflows — a multi-status order state machine spanning kitchens, carts, and riders, plus CyberSource card payments, multi-wallet cash/card ledgers, platform commissions, payouts, and refund-approval flows.",
      "Integrated third-party services end to end — CyberSource / Visa Acceptance payments, Algolia search, Google Maps, Firebase Cloud Messaging, and Secret Manager.",
    ],
    flowTitle: "One request pipeline, every endpoint",
    flow: [
      "Client request",
      "Authorize · JWT + RBAC",
      "Validate payload",
      "Business logic",
      "Repository",
      "Data service · Firestore",
    ],
  },
  {
    name: "Child Health Development Record System",
    kind: "Final-year thesis project — a digital Child Health Development Record for Sri Lanka",
    problem:
      "Sri Lanka's paper Child Health Development Record — the “thakshalāwa” book — is easy to lose and hard to track across visits, and midwives, guardians, and health officials each need a different view of the same child's record.",
    stack: ["React 19", "TypeScript", "Tailwind CSS", "Firebase Cloud Functions", "Node 22", "Firestore", "Firebase Auth", "FCM"],
    points: [
      "Role-based platform for midwives (PHM), guardians, and MOH admins that digitises Sri Lanka's paper Child Health Development Record — birth registration, growth monitoring, immunisation tracking, clinic scheduling, and automated reminders across 6 record types.",
      "Wrote a WHO 2006 growth engine from scratch — L/M/S interpolation to z-scores and percentiles with a normal-CDF (erf) approximation, no statistics library.",
      "Built a configurable rule-based recommendation service — Firestore-overridable clinical rules parsed by a safe custom evaluator (no eval), unit-tested, producing BMI status, risk level, and nutrition and action guidance.",
      "Designed a dedupe-aware scheduled notification pipeline on Cloud Functions — daily FCM web push with email fallback, per-day idempotency keys, invalid-token cleanup, and per-user send caps.",
      "Enforced an area-scoped Firestore security model — role plus PHM-area access control on a default-deny base — over a layered backend (DTO → model → business logic → service).",
    ],
    note: "Final-year thesis prototype. Auth hardening, the MOH admin portal, and paper-chart OCR are partially implemented.",
  },
];

const EDUCATION = {
  school: "University of Jaffna",
  degree: "BSc in Information Technology",
  period: "Aug 2021 — Feb 2025",
  courses: ["Software Engineering", "Database Systems", "Computer Systems", "Web Application Development", "Technical Presentations"],
};

const CONTACT = [
  { k: "Email", v: "nawanka.t@gmail.com", href: "mailto:nawanka.t@gmail.com", copy: true },
  { k: "Phone", v: "076 6771782", href: "tel:+94766771782" },
  { k: "LinkedIn", v: "linkedin.com/in/thathsara", href: "https://linkedin.com/in/thathsara" },
  { k: "GitHub", v: "github.com/thathsara1999", href: "https://github.com/thathsara1999" },
];

const CV_FILE = "/Nawanka-Thathsara-CV.pdf";
const CV_DOWNLOAD_NAME = "Nawanka Thathsara CV.pdf";

/* ------------------------------------------------------------------
   HOOKS / SMALL COMPONENTS
   ------------------------------------------------------------------ */
function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`${className} reveal ${seen ? "is-in" : ""}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}

function SectionHead({ eyebrow, title, intro }) {
  return (
    <Reveal className="section__head">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section__title">{title}</h2>
      {intro && <p className="section__intro">{intro}</p>}
    </Reveal>
  );
}

/* ------------------------------------------------------------------
   PAGE
   ------------------------------------------------------------------ */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Track the collapsible-nav breakpoint (matches the 760px rule in App.css)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const sync = () => {
      setIsMobileNav(mq.matches);
      if (!mq.matches) setMenuOpen(false);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Highlight the nav link for whichever section is crossing the viewport middle
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActiveId(hit.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Close the mobile menu on Escape while it is open
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const copyEmail = useCallback(() => {
    navigator.clipboard?.writeText("nawanka.t@gmail.com").then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => {},
    );
  }, []);

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "is-scrolled" : ""}`} aria-label="Primary">
        <div className="wrap nav__inner">
          <a className="nav__brand" href="#top" onClick={closeMenu}>
            <span className="nav__logo">NT</span>
            <span className="nav__name">Nawanka Thathsara</span>
          </a>

          <div
            id="nav-links"
            className={`nav__links ${menuOpen ? "is-open" : ""}`}
            inert={isMobileNav && !menuOpen}
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                className={`nav__link ${activeId === l.id ? "is-active" : ""}`.trim()}
                href={`#${l.id}`}
                aria-current={activeId === l.id ? "page" : undefined}
                onClick={closeMenu}
              >
                {l.label}
              </a>
            ))}
            <a className="nav__cta" href="#contact" onClick={closeMenu}>
              Get in touch
            </a>
          </div>

          <button
            type="button"
            className={`nav__burger ${menuOpen ? "is-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="nav-links"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className="nav__progress" style={{ width: `${progress * 100}%` }} />
      </nav>

      <main id="main" tabIndex={-1}>
        {/* HERO */}
        <header className="hero" id="top">
          <div className="wrap hero__grid">
            <Reveal className="hero__intro">
              <span className="hero__status">Available · Kalutara, Sri Lanka</span>
              <h1 className="hero__title">
                From the business problem to a <em>production</em> solution — and the people who run it.
              </h1>
              <p className="hero__lead">
                I'm Nawanka Thathsara, a full-stack engineer at Ariso Technologies. I turn real business
                requirements into production software across web, mobile, and cloud — Node.js, React,
                React Native, TypeScript — owning each feature from the first question about the problem
                through to the team that has to run it.
              </p>
              <div className="hero__actions">
                <a className="btn btn--primary" href="#projects">
                  See my work
                </a>
                <a className="btn btn--ghost" href={CV_FILE} download={CV_DOWNLOAD_NAME}>
                  Download CV
                </a>
              </div>
              <div className="hero__marks">
                <div className="hero__mark">
                  <b>Oct 2024</b>
                  <span>at Ariso Technologies</span>
                </div>
                <div className="hero__mark">
                  <b>5</b>
                  <span>production apps shipped</span>
                </div>
                <div className="hero__mark">
                  <b>25%</b>
                  <span>faster response times</span>
                </div>
              </div>
            </Reveal>

            <Reveal className="hero__media">
              <img
                className="hero__photo"
                src="/profile.jpeg"
                alt="Nawanka Thathsara"
                width="280"
                height="336"
                loading="eager"
                fetchPriority="high"
              />
              <div className="hero__panel" aria-hidden="true" />
              <span className="hero__loc">KALUTARA · LK</span>
            </Reveal>
          </div>
        </header>

        {/* SPINE — signature */}
        <section className="spine" aria-label="How I work">
          <div className="wrap spine__inner">
            <div className="spine__fill" aria-hidden="true" />
            {LIFECYCLE.map((s) => (
              <a key={s.id} className="spine__step" href="#approach">
                <span className="spine__n">{s.n}</span>
                <span className="spine__l">{s.label}</span>
                <p>{s.note}</p>
              </a>
            ))}
          </div>
        </section>

        {/* APPROACH */}
        <section className="section" id="approach">
          <div className="wrap">
            <SectionHead
              eyebrow="How I work"
              title="From the business problem to the people who run the system."
              intro="Six steps, one continuous line — I don't hand off half a job. Each step below carries a piece of real work it came from."
            />
            {PHASES.map((p) => (
              <Reveal className="phase" key={p.idx}>
                <div className="phase__idx">{p.idx}</div>
                <div className="phase__body">
                  <h3 className="phase__title">{p.title}</h3>
                  <p className="phase__text">{p.text}</p>
                  <span className="phase__evidence">{p.evidence}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="section section--cream" id="skills">
          <div className="wrap">
            <SectionHead
              eyebrow="Toolkit"
              title="What I build with — and what I teach."
              intro="A full-stack core, a cloud and data layer, the patterns that keep a large codebase honest, and the communication skills to move all of it into someone else's hands."
            />
            <Reveal className="skills">
              {SKILLS.map((s) => (
                <div className="skillcard" key={s.group}>
                  <h3>{s.group}</h3>
                  <ul>
                    {s.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="section" id="experience">
          <div className="wrap">
            <SectionHead eyebrow="Where I work" title="Experience" />
            {EXPERIENCE.map((job) => (
              <Reveal className="job" key={job.company}>
                <div className="job__top">
                  <span className="job__co">{job.company}</span>
                  <span className="job__period">{job.period}</span>
                </div>
                <div className="job__role">{job.role}</div>
                <ul className="job__list">
                  {job.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section section--cream" id="projects">
          <div className="wrap">
            <SectionHead
              eyebrow="Selected work"
              title="Systems, from the business problem to production."
              intro="Each one starts with the problem the business had. What follows is how I understood it, designed it, built it, shipped it, and handed it over."
            />
            {PROJECTS.map((pr) => (
              <Reveal className="project" key={pr.name}>
                <div className="project__lead">
                  <h3 className="project__name">{pr.name}</h3>
                  <p className="project__kind">{pr.kind}</p>
                  {pr.problem && (
                    <p className="project__problem">
                      <span className="project__problem-label">The problem</span>
                      {pr.problem}
                    </p>
                  )}
                  <div className="project__stack">
                    {pr.stack.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  {pr.link && (
                    <a
                      className="project__link"
                      href={pr.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {pr.linkLabel || "Visit live site"}
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
                <ul className="project__points">
                  {pr.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
                {pr.flow && (
                  <figure
                    className="project__flow"
                    role="img"
                    aria-label={`${pr.flowTitle || "Request flow"}: ${pr.flow
                      .map((s) => s.replace(/ · /g, ", "))
                      .join(" then ")}`}
                  >
                    <figcaption className="project__flow-title">
                      {pr.flowTitle || "Request flow"}
                    </figcaption>
                    <ol className="flow" aria-hidden="true">
                      {pr.flow.map((step, i) => (
                        <li className="flow__step" key={step}>
                          <span className="flow__n">{String(i + 1).padStart(2, "0")}</span>
                          <span className="flow__label">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </figure>
                )}
                {pr.note && <p className="project__note">{pr.note}</p>}
              </Reveal>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section className="section" id="education">
          <div className="wrap">
            <SectionHead eyebrow="Foundation" title="Education" />
            <Reveal className="edu">
              <div>
                <div className="edu__school">{EDUCATION.school}</div>
                <div className="edu__degree">{EDUCATION.degree}</div>
              </div>
              <span className="edu__period">{EDUCATION.period}</span>
              <div className="edu__course">
                {EDUCATION.courses.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section contact" id="contact">
          <div className="wrap">
            <Reveal>
              <span className="eyebrow">Next step</span>
              <h2 className="contact__title">Have a system to build — or a team that needs to run one?</h2>
              <p className="contact__lead">
                I'm open to software engineering and software trainer roles. Tell me what you're
                working on and I'll get back to you.
              </p>
            </Reveal>
            <Reveal className="contact__grid">
              {CONTACT.map((c) =>
                c.copy ? (
                  <button type="button" className="contact__cell" key={c.k} onClick={copyEmail}>
                    <span className="k">{c.k}</span>
                    <span className="v">{c.v}</span>
                    <span className="contact__hint">{copied ? "Copied to clipboard" : "Click to copy"}</span>
                  </button>
                ) : (
                  <a
                    className="contact__cell"
                    key={c.k}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    <span className="k">{c.k}</span>
                    <span className="v">{c.v}</span>
                  </a>
                ),
              )}
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap footer__inner">
          <span>© {new Date().getFullYear()} Nawanka Thathsara</span>
          <span>
             <a href={CV_FILE} download={CV_DOWNLOAD_NAME}>Download CV</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
