"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import TechBackdrop from "@/components/TechBackdrop";
import MockSite from "@/components/MockSite";
import CtaBanner from "@/components/CtaBanner";
import TechStack from "@/components/TechStack";
import {
  IconHome, IconGrid, IconLayers, IconBook, IconChat, IconArrow,
  IconStar, IconMenu, IconQuote, IconSpark, IconUsers, IconFacebook, IconPhone, IconChart, IconPen, IconAI, IconCloud, IconWhatsApp, IconArrowUp,
} from "@/components/Icons";

// Local photos (free Unsplash licence) in /public/images, named after the seed without "zyn-"
const img = (seed) => `/images/${seed.replace(/^zyn-/, "")}.jpg`;

// Hero photo mask (900x1000 box): arched top, rounded notch bottom-left for the
// reviews card. Keep in sync with $hero-shape in sections/_hero.scss.
const HERO_SHAPE =
  "M0 450A450 450 0 0 1 900 450V940Q900 1000 840 1000H560Q500 1000 500 940V870Q500 810 440 810H60Q0 810 0 750Z";

// WhatsApp contact (header + footer)
const WHATSAPP = { display: "+358 41 5725918", link: "https://wa.me/358415725918" };

// Blog is hidden for now: set to true to bring back the section and its menu link
const SHOW_BLOG = false;

const NAV = [
  { id: "home", label: "Home", icon: IconHome },
  { id: "work", label: "Work", icon: IconGrid },
  { id: "services", label: "Services", icon: IconLayers },
  { id: "team", label: "Team", icon: IconUsers },
  { id: "blog", label: "Blog", icon: IconBook },
  { id: "contact", label: "Contact", icon: IconChat },
].filter((n) => SHOW_BLOG || n.id !== "blog");

// From content.txt
const TEAM = [
  { name: "Arup Scikit", role: "CEO", photo: "arup.png", facebook: "https://www.facebook.com/arup.muet", hue: 18 },
  { name: "Ismail Hosen", role: "CTO", photo: "ismail.jpg", facebook: "https://www.facebook.com/eng.ismail21", hue: 220 },
  { name: "Engr Sazzad Hossian", role: "Lead Software Engineer", photo: "sazzad.png", facebook: "https://www.facebook.com/sazzad.hosian.5", hue: 260 },
  { name: "Khairullah", role: "Senior Software Developer", photo: "khairullah.jpg", facebook: "https://www.facebook.com/khairullahnayan", hue: 200 },
  { name: "Hafiza", role: "Web Developer", photo: "hafiza.jpg", pos: "47% 30%", facebook: "https://www.facebook.com/hafiza.khanam.rima", hue: 330 },
  { name: "Fahamina", role: "Web Developer", photo: "fahamina.jpg", facebook: "https://www.facebook.com/fahaminarbt", hue: 160 },
  { name: "Nayan", role: "SEO Manager", photo: "nayan.jpg", facebook: "https://www.facebook.com/NayanMajumder2", hue: 40 },
  { name: "Biplab", role: "Senior UI/UX Designer", photo: "biplab.jpg", facebook: "https://www.facebook.com/biplab.c.s", hue: 290 },
];

// "Engr Sazzad Hossian" -> "SH" (skips the Engr title), "Nayan" -> "N"
const initials = (name) =>
  name.replace(/^Engr\.?\s+/i, "").split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

// Bottom app bar order: Contact sits in the middle as the raised action button
// (Blog stays reachable from the top-right menu sheet)
const BAR_ORDER = ["home", "work", "contact", "services", "team"];

const STATS = [
  { value: 97, suffix: "%", label: "Client retention" },
  { value: 60, suffix: "+", label: "Team specialists" },
  { value: 180, suffix: "+", label: "Projects shipped" },
  { value: 12, suffix: "+", label: "Years in practice" },
];

// Full-page screenshots (900x2400) in public/images/recent -work/. A project
// without a shot falls back to a mock site drawn by components/MockSite.js (needs a theme).
const SHOT_DIR = encodeURI("/images/recent -work/");
const PROJECTS = [
  { title: "MedXpertsHub", type: "Website design & build", url: "medxpertshub.com", shot: SHOT_DIR + "p1.webp" },
  { title: "Get Takaful", type: "Website design & build", url: "gettakaful.com", shot: SHOT_DIR + "p2.webp" },
  { title: "Popup Together", type: "Website design & build", url: "popuptogether.com", shot: SHOT_DIR + "p3.webp" },
  { title: "SKLENTR", type: "Website design & build", url: "sklentr.com", shot: SHOT_DIR + "p4.webp" },
];

const SERVICES = [
  { n: "01", title: "Brand Strategy", image: "work-2", icon: IconPen, text: "Positioning, naming and identity systems that make you instantly recognisable.", points: ["Brand audits", "Visual identity", "Voice & messaging"] },
  { n: "02", title: "UI/UX Design", image: "step-2", icon: IconLayers, text: "Interfaces people enjoy using, grounded in research and tested with real users.", points: ["User research", "Wireframes", "Design systems"] },
  { n: "03", title: "Web Development", image: "step-3", icon: IconGrid, text: "Fast, accessible websites built on modern stacks and easy for your team to edit.", points: ["Next.js & CMS", "Performance", "SEO-ready"], tech: ["React", "Next.js", "Vue", "Alpine.js", "Laravel", "CodeIgniter", "Node.js", "Tailwind CSS"] },
  { n: "04", title: "SaaS Application Development", image: "saas", icon: IconCloud, text: "We have hands-on experience building SaaS products end to end, from MVP to scalable, subscription-ready platforms.", points: ["Multi-tenant architecture", "Subscriptions & billing", "Admin dashboards"], tech: ["Laravel", "React", "Vue", "REST & GraphQL APIs", "Stripe", "AWS"] },
  { n: "05", title: "AI-Powered Solutions", image: "ai", icon: IconAI, text: "Practical AI built into your product: smart assistants, automation and insights that save your team real time.", points: ["AI chatbots & assistants", "Workflow automation", "Data insights"], tech: ["OpenAI", "Claude", "LangChain", "RAG", "Python"] },
  { n: "06", title: "Mobile Apps", image: "blog-2", icon: IconPhone, text: "Native-feel apps for iOS and Android, from first prototype to store launch.", points: ["Prototyping", "Cross-platform", "App store launch"] },
  { n: "07", title: "Growth Marketing", image: "work-1", icon: IconChart, text: "Campaigns and analytics that turn attention into measurable revenue.", points: ["Paid social", "Content", "Conversion tuning"] },
];

// Bento placement for What We Do (grid-template-areas in sections/_services.scss)
const SVC_AREA = { "01": "brand", "02": "ui", "03": "web", "04": "saas", "05": "ai", "06": "mob", "07": "grow" };

const STEPS = [
  { n: "01", title: "Discover & Plan Strategy", text: "We dig into your goals, audience and competitors to define what success looks like.", seed: "zyn-step-1" },
  { n: "02", title: "Design & Prototype Ideas", text: "Concepts become polished designs through quick, collaborative feedback loops.", seed: "zyn-step-2" },
  { n: "03", title: "Build, Launch & Grow", text: "We build, test and launch — then keep improving with real performance data.", seed: "zyn-step-3" },
];

const TESTIMONIALS = [
  { name: "Amelia Brooks", role: "Founder, Fernway", text: "They understood our vision from day one. The new site doubled our inbound leads within a quarter.", seed: "zyn-p1" },
  { name: "Daniel Reyes", role: "CMO, Northline", text: "Clear communication, sharp design and zero missed deadlines. A genuine extension of our team.", seed: "zyn-p2" },
  { name: "Priya Shah", role: "Product Lead, Kova", text: "Our app's onboarding finally feels effortless. Retention went up the very first month.", seed: "zyn-p3" },
];

const POSTS = [
  { title: "Five signs your brand has outgrown its identity", tag: "Branding", date: "Nov 02, 2026", seed: "zyn-blog-1" },
  { title: "Designing mobile-first without losing desktop polish", tag: "Design", date: "Oct 18, 2026", seed: "zyn-blog-2" },
  { title: "What makes a landing page actually convert", tag: "Growth", date: "Sep 29, 2026", seed: "zyn-blog-3" },
];

function Counter({ value, suffix }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf, start;
    const tick = (t) => {
      start ??= t;
      const p = Math.min((t - start) / 1400, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{n}{suffix}</>;
}

// Shows /images/team/<photo>.jpg when it exists, otherwise the coloured initials tile
function TeamAvatar({ member, className = "" }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef(null);
  // The image may already have failed before React attached onError
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  if (failed) {
    return <span className={`initials ${className}`} style={{ "--h": member.hue }}>{initials(member.name)}</span>;
  }
  return (
    <img
      ref={ref}
      className={`initials member-photo ${className}`}
      style={{ "--h": member.hue, objectPosition: member.pos || "center 25%" }}
      src={`/images/team/${member.photo}`}
      alt={member.name}
      onError={() => setFailed(true)}
    />
  );
}

function SectionHead({ eyebrow, title, light }) {
  return (
    <div className={`section-head ${light ? "light" : ""}`}>
      <span className="eyebrow"><IconSpark size={14} /> {eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [barHidden, setBarHidden] = useState(false);

  // Cursor position inside the hovered service card, for its border spotlight
  const onSpotlight = (e) => {
    const card = e.target.closest(".svc-card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      // Tuck the app bar away while scrolling down, bring it back on scroll up
      if (Math.abs(y - lastY) > 8) {
        setBarHidden(y > lastY && y > 300);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });

    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));

    return () => { window.removeEventListener("scroll", onScroll); obs.disconnect(); reveal.disconnect(); };
  }, []);

  return (
    <>
      {/* ---------- Header ---------- */}
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="container header-inner">
          <Logo />
          <nav className="desktop-nav">
            {NAV.map(({ id, label, icon: Icon }) => (
              <a key={id} href={`#${id}`} className={active === id ? "active" : ""} aria-current={active === id ? "page" : undefined}>
                <span className="nav-icon"><Icon /></span>
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <a href={WHATSAPP.link} target="_blank" rel="noopener noreferrer" className="header-phone desktop-only">
              <span className="header-phone-icon"><IconWhatsApp size={16} /></span>
              {WHATSAPP.display}
            </a>
            <a href="#contact" className="btn btn-primary desktop-only">Let&apos;s Talk <IconArrow /></a>
            <a href={WHATSAPP.link} target="_blank" rel="noopener noreferrer" className="icon-btn icon-btn--call mobile-only" aria-label={"WhatsApp " + WHATSAPP.display}><IconWhatsApp size={20} /></a>
            <button className="icon-btn mobile-only" aria-label="Menu" onClick={() => setMenuOpen(true)}><IconMenu /></button>
          </div>
        </div>
      </header>

      {/* Mobile sheet menu */}
      <div className={`sheet-backdrop ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} />
      <div className={`sheet ${menuOpen ? "open" : ""}`} role="dialog" aria-label="Menu">
        <div className="sheet-handle" />
        {NAV.map((n) => (
          <a key={n.id} href={`#${n.id}`} onClick={() => setMenuOpen(false)}>
            <span>{n.label}</span><IconArrow />
          </a>
        ))}
        <a href="#contact" className="btn btn-primary block" onClick={() => setMenuOpen(false)}>Start a project</a>
      </div>

      <main>
        {/* ---------- Hero ---------- */}
        <section id="home" className="hero">
          <svg className="hero-lines" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 420 C 300 300, 500 560, 800 380 S 1100 200, 1200 260" />
            <path d="M0 480 C 320 360, 520 620, 820 440 S 1120 260, 1200 320" />
          </svg>
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <h1 className="hero-title">
                Building <span className="accent">bold</span> digital brands that grow.
              </h1>
              <p className="lead">
                Zynintell is a creative studio blending strategy, design and engineering to launch
                brands, websites and apps people remember.
              </p>
              <div className="hero-actions">
                <a href="#contact" className="btn btn-primary">Start a Project <IconArrow /></a>
                <a href="#work" className="btn btn-ghost">See our work</a>
              </div>
              <div className="hero-metric">
                <strong>3X</strong>
                <span>Average growth in qualified leads for our clients</span>
              </div>
            </div>
            <div className="hero-media reveal">
              {/* Offset outline of the mask shape, sitting behind the photo */}
              <svg className="hero-outline" viewBox="0 0 900 1000" preserveAspectRatio="none" aria-hidden="true">
                <path d={HERO_SHAPE} vectorEffect="non-scaling-stroke" />
              </svg>
              <svg className="hero-half" viewBox="0 0 100 100" aria-hidden="true">
                <path d="M0 50a50 50 0 0 0 100 0z" fill="#F4CE86" transform="rotate(-45 50 50)" />
              </svg>
              <div className="hero-mask">
                <img src={img("zyn-hero")} alt="Team collaborating in the studio" />
              </div>
              <div className="float-card">
                <div className="avatars">
                  {["a", "b", "c"].map((s) => <img key={s} src={img(`zyn-av-${s}`, 80, 80)} alt="" />)}
                </div>
                <div><strong>4.9/5</strong><small>from 200+ reviews</small></div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- About ---------- */}
        <section className="about section">
          <div className="container about-grid">
            <div className="reveal">
              <SectionHead eyebrow="About Us" title="We shape brands for the digital world." />
              <p className="muted">
                From early-stage startups to established companies, we partner closely with teams to
                turn ideas into products with clarity, character and measurable results.
              </p>
              <div className="stats">
                {STATS.map((s) => (
                  <div key={s.label} className="stat">
                    <strong><Counter value={s.value} suffix={s.suffix} /></strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
              <a href="#contact" className="btn btn-dark">More about us <IconArrow /></a>
            </div>
            <div className="about-media reveal">
              <span className="about-dots" aria-hidden="true" />
              <div className="about-mask">
                <img src={img("zyn-about")} alt="Designers reviewing work" />
              </div>
              {/* Rotating text badge sitting in the mask's top-right cut-out */}
              <div className="about-badge" aria-hidden="true">
                <svg className="about-badge-text" viewBox="0 0 120 120">
                  <defs>
                    <path id="about-badge-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
                  </defs>
                  <text>
                    <textPath href="#about-badge-circle" textLength="289">
                      STRATEGY • DESIGN • CODE • GROWTH •
                    </textPath>
                  </text>
                </svg>
                <span className="about-badge-core"><IconSpark size={22} /></span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Work ---------- */}
        <section id="work" className="section work">
          <div className="work-bg" aria-hidden="true" />
          <div className="container">
            <div className="work-head reveal">
              <p className="work-label">Selected work</p>
              <h2 className="work-title">Our Recent <em>Work</em></h2>
              <div className="work-head-side">
                <p className="work-count"><span>{String(PROJECTS.length).padStart(2, "0")}</span> recent projects</p>
                <a href="#contact" className="roll-btn">
                  <span className="roll-btn-label">
                    <span>View all projects</span>
                    <span aria-hidden="true">View all projects</span>
                  </span>
                  <span className="roll-btn-icon" aria-hidden="true"><IconArrow size={16} /></span>
                </a>
              </div>
            </div>

            <ul className="work-grid">
              {PROJECTS.map((p, i) => (
                <li key={p.title} className="work-item reveal">
                  <a href="#contact" className="work-card">
                    <div className="work-frame">
                      <div className="browser">
                        <div className="browser-bar" aria-hidden="true">
                          <span className="browser-dots"><i /><i /><i /></span>
                          <span className="browser-url">{p.url}</span>
                        </div>
                        <div className="browser-view">
                          <div className="browser-shot">
                            {p.shot ? <img src={p.shot} alt={`${p.title} website`} /> : <MockSite theme={p.theme} />}
                          </div>
                        </div>
                      </div>
                      <span className="work-hint" aria-hidden="true">Hover to preview</span>
                    </div>
                    <div className="work-caption">
                      <span className="work-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                      <span className="work-meta">
                        <span className="work-name">{p.title}</span>
                        <span className="work-type">{p.type}</span>
                      </span>
                      <span className="work-go" aria-hidden="true"><IconArrow size={18} /></span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Services ---------- */}
        <section id="services" className="section services">
          <TechBackdrop />
          <div className="container">
            <div className="services-head reveal">
              <div>
                <p className="svc-eyebrow"><span className="svc-eyebrow-dot" />Services</p>
                <h2 className="svc-heading">What We <em>Do.</em></h2>
              </div>
              <div className="services-head-side">
                <p className="muted">Everything you need to launch, grow and stand out online, under one roof.</p>
                <p className="svc-count">
                  <span>{String(SERVICES.length).padStart(2, "0")}</span> services · one dedicated team
                </p>
              </div>
            </div>

            {/* Bento grid. A light follows the cursor along each card's border (see onSpotlight). */}
            <div className="svc-grid" onMouseMove={onSpotlight}>
              {SERVICES.map(({ n, title, text, points, tech, image, icon: Icon }) => {
                const area = SVC_AREA[n];
                return (
                  <article key={n} className={`svc-card svc-card--${area} reveal`} style={{ gridArea: area }}>
                    <div className="svc-card-media">
                      <img src={img(`zyn-${image}`)} alt="" loading="lazy" />
                    </div>
                    <div className="svc-card-body">
                      <div className="svc-card-top">
                        <span className="svc-card-icon"><Icon /></span>
                        <span className="svc-card-index">{n} / {String(SERVICES.length).padStart(2, "0")}</span>
                      </div>
                      <h3 className="svc-card-title">{title}</h3>
                      <p className="svc-card-text">{text}</p>
                      <ul className="svc-card-tags">
                        {points.map((pt) => <li key={pt}>{pt}</li>)}
                      </ul>
                      {tech && (
                        <ul className="svc-card-tech" aria-label={`${title} technologies`}>
                          {tech.map((t) => <li key={t}>{t}</li>)}
                        </ul>
                      )}
                    </div>
                    <span className="svc-card-go" aria-hidden="true"><IconArrow size={18} /></span>
                  </article>
                );
              })}

              <article className="svc-card svc-card--cta reveal" style={{ gridArea: "cta" }}>
                <div className="svc-card-body">
                  <span className="svc-card-icon"><IconSpark size={20} /></span>
                  <h3 className="svc-card-title">Not sure where to start?</h3>
                  <p className="svc-card-text">Tell us your goal and we&apos;ll map the right mix of services for it.</p>
                  <a href="#contact" className="roll-btn roll-btn--light">
                    <span className="roll-btn-label">
                      <span>Book a free call</span>
                      <span aria-hidden="true">Book a free call</span>
                    </span>
                    <span className="roll-btn-icon" aria-hidden="true"><IconArrow size={16} /></span>
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ---------- Tech stack ---------- */}
        <TechStack />

        {/* ---------- Process ---------- */}
        <section className="process">
          <div className="process-wrap">
            {/* Left: heading + fanned step cards */}
            <div className="process-left">
              <div className="process-head reveal">
                <SectionHead eyebrow="How We Work" title="Our Process." light />
              </div>

              <div className="process-cards">
                {STEPS.map((s, i) => (
                  <article key={s.n} className={`p-card p-card--${i + 1} reveal`} style={{ transitionDelay: `${i * 0.15}s` }}>
                    {i === 2 && <img className="p-card-photo" src={img(s.seed)} alt="" />}
                    <div className="p-card-content">
                      <span className="p-step">Step <b>{s.n}</b></span>
                      <h3 className="p-title">{s.title}</h3>
                    </div>
                    {i < 2 && <span className="p-link" aria-hidden="true"><IconArrow size={16} /></span>}
                  </article>
                ))}
              </div>
            </div>

            {/* Right: quote panel */}
            <div className="process-right reveal">
              <svg className="process-arrow" viewBox="0 0 120 60" aria-hidden="true">
                <path d="M4 50 C 30 6, 70 4, 104 30" />
                <path d="M92 18 L106 31 L88 36" />
              </svg>
              <p className="process-quote">
                Great work happens when strategy and craft sit at the same table. That&apos;s how we run every project.
              </p>
              <div className="process-author">
                <strong>Team Zynintell</strong>
                <span>How we work</span>
              </div>
              <svg className="process-half" viewBox="0 0 100 100" aria-hidden="true">
                <path d="M0 50a50 50 0 0 0 100 0z" fill="#F4CE86" transform="rotate(-45 50 50)" />
              </svg>
              <div className="process-photo">
                <img src={img("zyn-step-1")} alt="Team planning a project" />
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Team ---------- */}
        <section id="team" className="section team">
          <span className="team-glow g1" aria-hidden="true" />
          <span className="team-glow g2" aria-hidden="true" />
          <div className="container">
            <div className="team-head">
              <SectionHead eyebrow="Our Team" title={<>The minds behind <span className="accent">Zynintell.</span></>} light />
              <div className="team-summary reveal">
                <div className="team-stack">
                  {TEAM.map((m) => <TeamAvatar key={m.name} member={m} className="stack-avatar" />)}
                </div>
                <p><strong>{TEAM.length} specialists.</strong> One team that plans, builds and grows every project.</p>
              </div>
            </div>

            {/* Leadership */}
            <div className="leaders">
              {TEAM.slice(0, 2).map((m) => (
                <article key={m.name} className="leader reveal">
                  <div className="leader-photo">
                    <TeamAvatar member={m} className="fill" />
                  </div>
                  <div className="leader-body">
                    <span className="leader-badge"><IconSpark size={12} /> Leadership</span>
                    <h3>{m.name}</h3>
                    <span className="leader-role">{m.role}</span>
                    <a href={m.facebook} target="_blank" rel="noopener noreferrer" className="fb-btn" aria-label={`${m.name} on Facebook`}>
                      <IconFacebook /> Connect
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* Members */}
            <div className="members scroll-x">
              {TEAM.slice(2).map((m) => (
                <article key={m.name} className="person reveal">
                  <TeamAvatar member={m} className="fill" />
                  <div className="person-shade" />
                  <a href={m.facebook} target="_blank" rel="noopener noreferrer" className="person-fb" aria-label={`${m.name} on Facebook`}>
                    <IconFacebook />
                  </a>
                  <div className="person-info">
                    <h3>{m.name}</h3>
                    <span>{m.role}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Testimonials ---------- */}
        <section className="section testimonials">
          <div className="container">
            <div className="row-head">
              <SectionHead eyebrow="Testimonials" title="Clients Love Us." />
              <div className="rating">
                <div className="stars">{[...Array(5)].map((_, i) => <IconStar key={i} />)}</div>
                <span><strong>4.9</strong> average · 200+ reviews</span>
              </div>
            </div>
            <div className="t-grid scroll-x">
              {TESTIMONIALS.map((t) => (
                <article key={t.name} className="t-card reveal">
                  <IconQuote />
                  <p>{t.text}</p>
                  <footer>
                    <img src={img(t.seed, 120, 120)} alt="" />
                    <div><strong>{t.name}</strong><small>{t.role}</small></div>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Blog ---------- */}
        {SHOW_BLOG && (
          <section id="blog" className="section blog">
            <div className="container">
              <div className="row-head">
                <SectionHead eyebrow="Insights" title="Latest Articles." />
                <a href="#blog" className="link-arrow desktop-only">View all posts <IconArrow /></a>
              </div>
              <div className="blog-grid">
                {POSTS.map((p) => (
                  <article key={p.title} className="post reveal">
                    <div className="post-img"><img src={img(p.seed, 800, 560)} alt="" /></div>
                    <div className="post-body">
                      <div className="post-meta"><span className="tag">{p.tag}</span><span>{p.date}</span></div>
                      <h3>{p.title}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ---------- CTA banner ---------- */}
        <CtaBanner />
      </main>

      {/* ---------- Footer ---------- */}
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-cta">
            <h2>Have a project in mind?</h2>
            <a href="mailto:arupmuet@gmail.com" className="btn btn-primary">arupmuet@gmail.com <IconArrow /></a>
          </div>
          <div className="footer-grid">
            <div>
              <Logo light />
              <p className="f-muted">A digital studio crafting brands, websites and products that grow.</p>
              <a href={WHATSAPP.link} target="_blank" rel="noopener noreferrer" className="footer-phone">
                <span className="footer-phone-icon"><IconWhatsApp size={16} /></span>
                {WHATSAPP.display}
              </a>
            </div>
            <div>
              <h4>Company</h4>
              <a href="#home">About</a><a href="#work">Work</a>{SHOW_BLOG && <a href="#blog">Blog</a>}<a href="#contact">Careers</a>
            </div>
            <div>
              <h4>Services</h4>
              {SERVICES.slice(0, 4).map((s) => <a key={s.n} href="#services">{s.title}</a>)}
            </div>
            <div>
              <h4>Newsletter</h4>
              <p className="f-muted">Monthly ideas on design and growth. No spam.</p>
              <form className="newsletter" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your email" aria-label="Email" required />
                <button type="submit" aria-label="Subscribe"><IconArrow /></button>
              </form>
            </div>
          </div>
          <p className="footer-watermark" aria-hidden="true">
            {"zynintell".split("").map((ch, i) => <span key={i}>{ch}</span>)}
          </p>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Zynintell. All rights reserved.</span>
            <a href="#home" className="back-top" aria-label="Back to top">
              <span className="back-top-label">Back to top</span>
              <span className="back-top-icon"><IconArrowUp /></span>
            </a>
          </div>
        </div>
      </footer>

      {/* ---------- Mobile bottom app bar ---------- */}
      <nav className={`bottom-bar ${barHidden ? "hidden" : ""}`} aria-label="Primary">
        <span
          className="bb-indicator"
          style={{ transform: `translateX(${BAR_ORDER.indexOf(active) * 100}%)`, opacity: active === "contact" || !BAR_ORDER.includes(active) ? 0 : 1 }}
          aria-hidden="true"
        />
        {BAR_ORDER.map((id) => {
          const { label, icon: Icon } = NAV.find((n) => n.id === id);
          if (id === "contact") {
            return (
              <a key={id} href="#contact" className={`bb-fab ${active === id ? "active" : ""}`} aria-label="Contact us">
                <span className="bb-fab-btn"><Icon /></span>
                <span className="bb-label">Talk</span>
              </a>
            );
          }
          return (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""} aria-current={active === id ? "page" : undefined}>
              <span className="bb-icon"><Icon /></span>
              <span className="bb-label">{label}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
