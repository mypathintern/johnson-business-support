import { useState, useEffect, useRef } from "react";

const SERVICES = [
  {
    icon: "🛡️",
    title: "IT Security Audits",
    subtitle: "GRC & Compliance",
    desc: "Comprehensive governance, risk, and compliance assessments tailored for small businesses. Identify vulnerabilities before they become breaches.",
    details: ["Risk Assessment & Gap Analysis", "Policy & Procedure Review", "Compliance Roadmapping", "Security Posture Evaluation"],
  },
  {
    icon: "⚙️",
    title: "General IT Support",
    subtitle: "Infrastructure & Systems",
    desc: "Reliable, responsive IT support that keeps your business running. From network troubleshooting to system administration — covered.",
    details: ["Network Configuration & Monitoring", "Hardware & Software Support", "Cloud Migration Assistance", "Vendor Management"],
  },
  {
    icon: "📋",
    title: "Staff Training",
    subtitle: "Development & Awareness",
    desc: "Human-centered training programs that transform your team into your strongest security asset. Built on behavioral science principles.",
    details: ["Security Awareness Training", "Phishing Simulation Programs", "Compliance Training Modules", "Custom Workshop Development"],
  },
  {
    icon: "🔍",
    title: "Vulnerability Assessment",
    subtitle: "Proactive Defense",
    desc: "Proactive scanning and assessment of your digital infrastructure to surface risks and prioritize remediation efforts.",
    details: ["Internal & External Scanning", "Remediation Priority Reports", "Ongoing Monitoring Setup", "Executive Risk Summaries"],
  },
];

const WHY_US = [
  { num: "01", title: "Human-Centered Approach", desc: "A psychology-informed methodology that bridges the gap between technical security and human behavior. Security isn't just systems — it's people." },
  { num: "02", title: "Small Business Focus", desc: "Purpose-built for organizations with 5–50 employees. Enterprise-grade security thinking, right-sized for your budget and operations." },
  { num: "03", title: "Local & Accountable", desc: "Based in St. Cloud, MN. You get a dedicated consultant who knows your business, not a rotating cast of anonymous analysts." },
  { num: "04", title: "Actionable Deliverables", desc: "Clear, prioritized recommendations you can actually implement — not 200-page reports that collect dust on a shelf." },
];

const NAV_LINKS = ["Services", "Why Us", "About", "Contact"];

const THEMES = {
  light: {
    accent: "#0fa97a",
    accent2: "#0c8a63",
    accentGlow: "rgba(15,169,122,0.10)",
    accentGlow2: "rgba(15,169,122,0.05)",
    accentBorder: "rgba(15,169,122,0.25)",
    accentBg: "rgba(15,169,122,0.06)",
    accentShadow: "rgba(15,169,122,0.15)",
    bgMain: "#f7f7f5",
    bgCard: "#ffffff",
    bgCardHover: "#f0f2f0",
    bgNav: "rgba(247,247,245,0.88)",
    textPrimary: "#1a1d24",
    textMuted: "#5c6170",
    border: "#e0e2e6",
    btnPrimaryText: "#ffffff",
    grain: 0.018,
    selectionBg: "#0fa97a",
    selectionText: "#ffffff",
  },
  dark: {
    accent: "#3ee8b5",
    accent2: "#1bb88a",
    accentGlow: "rgba(62,232,181,0.08)",
    accentGlow2: "rgba(62,232,181,0.04)",
    accentBorder: "rgba(62,232,181,0.2)",
    accentBg: "rgba(62,232,181,0.08)",
    accentShadow: "rgba(62,232,181,0.2)",
    bgMain: "#0a0c10",
    bgCard: "#12151c",
    bgCardHover: "#181c26",
    bgNav: "rgba(10,12,16,0.88)",
    textPrimary: "#e8e6e1",
    textMuted: "#8a8d96",
    border: "#1e222d",
    btnPrimaryText: "#0a0c10",
    grain: 0.028,
    selectionBg: "#3ee8b5",
    selectionText: "#0a0c10",
  },
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s` }}>
      {children}
    </div>
  );
}

function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: "relative",
        width: 56,
        height: 30,
        borderRadius: 15,
        border: "none",
        cursor: "pointer",
        background: isDark ? "rgba(62,232,181,0.18)" : "rgba(15,169,122,0.12)",
        transition: "background 0.4s",
        display: "flex",
        alignItems: "center",
        padding: 3,
        flexShrink: 0,
        outline: "none",
      }}
    >
      {/* Track icons */}
      <span style={{ position: "absolute", left: 8, fontSize: 11, opacity: isDark ? 0.3 : 0.8, transition: "opacity 0.3s", lineHeight: 1 }}>☀️</span>
      <span style={{ position: "absolute", right: 8, fontSize: 11, opacity: isDark ? 0.8 : 0.3, transition: "opacity 0.3s", lineHeight: 1 }}>🌙</span>
      {/* Thumb */}
      <div style={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: isDark ? "#3ee8b5" : "#0fa97a",
        transform: isDark ? "translateX(26px)" : "translateX(0)",
        transition: "transform 0.35s cubic-bezier(.22,1,.36,1), background 0.4s",
        boxShadow: isDark ? "0 2px 10px rgba(62,232,181,0.35)" : "0 2px 10px rgba(15,169,122,0.3)",
        position: "relative",
        zIndex: 2,
      }} />
    </button>
  );
}

export default function JohnsonIndustries() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [isDark, setIsDark] = useState(false);

  const t = isDark ? THEMES.dark : THEMES.light;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: t.bgMain, color: t.textPrimary, minHeight: "100vh", overflowX: "hidden", transition: "background 0.5s, color 0.5s" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />

      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${t.selectionBg}; color: ${t.selectionText}; }
        .nav-blur { backdrop-filter: blur(16px) saturate(1.4); -webkit-backdrop-filter: blur(16px) saturate(1.4); }
        .service-card { transition: all 0.4s cubic-bezier(.22,1,.36,1); border: 1px solid ${t.border}; }
        .service-card:hover { border-color: ${t.accent}; transform: translateY(-4px); background: ${t.bgCardHover}; }
        .service-card.active { border-color: ${t.accent}; background: ${t.bgCardHover}; }
        .btn-primary { background: ${t.accent}; color: ${t.btnPrimaryText}; font-weight: 600; border: none; padding: 14px 32px; border-radius: 6px; cursor: pointer; font-size: 15px; letter-spacing: 0.02em; transition: all 0.3s; font-family: 'DM Sans', sans-serif; }
        .btn-primary:hover { background: ${t.accent2}; transform: translateY(-1px); box-shadow: 0 8px 30px ${t.accentShadow}; }
        .btn-outline { background: transparent; color: ${t.accent}; font-weight: 500; border: 1.5px solid ${t.accent}; padding: 13px 30px; border-radius: 6px; cursor: pointer; font-size: 15px; transition: all 0.3s; font-family: 'DM Sans', sans-serif; }
        .btn-outline:hover { background: ${t.accentBg}; }
        .why-card { border-left: 2px solid ${t.border}; padding-left: 24px; transition: border-color 0.4s; }
        .why-card:hover { border-left-color: ${t.accent}; }
        .grain { position: fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:9999; opacity:${t.grain}; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
        .hero-glow { position: absolute; top: -200px; right: -200px; width: 700px; height: 700px; background: radial-gradient(circle, ${t.accentGlow} 0%, transparent 70%); pointer-events: none; }
        .hero-glow-2 { position: absolute; bottom: -300px; left: -200px; width: 600px; height: 600px; background: radial-gradient(circle, ${t.accentGlow2} 0%, transparent 70%); pointer-events: none; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .anim-1 { animation: fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.1s both; }
        .anim-2 { animation: fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.25s both; }
        .anim-3 { animation: fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.4s both; }
        .anim-4 { animation: fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.55s both; }
        .stat-box { text-align:center; }
        .stat-num { font-family:'Instrument Serif',serif; font-size:48px; color:${t.accent}; line-height:1; }
        .divider { width:100%; height:1px; background:${t.border}; }
        a { color: ${t.accent}; text-decoration:none; }
        .footer-link { color: ${t.textMuted}; text-decoration:none; transition:color 0.2s; cursor:pointer; }
        .footer-link:hover { color: ${t.accent}; }
        @media(max-width:768px) {
          .hero-title { font-size: 40px !important; }
          .section-title { font-size: 32px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr !important; }
          .stats-row { flex-direction: column !important; gap: 32px !important; }
          .hero-buttons { flex-direction: column !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .nav-links-desktop { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        @media(min-width:769px) {
          .mobile-toggle { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      <div className="grain" />

      {/* NAV */}
      <nav className="nav-blur" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? t.bgNav : "transparent", borderBottom: scrolled ? `1px solid ${t.border}` : "1px solid transparent", transition: "all 0.4s", padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scrollTo("hero")}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: t.accent, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: t.btnPrimaryText, fontSize: 18, fontFamily: "'Instrument Serif', serif", transition: "background 0.4s" }}>J</div>
            <span style={{ fontWeight: 600, fontSize: 17, letterSpacing: "-0.02em" }}>Johnson Industries</span>
          </div>
          <div className="nav-links-desktop" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {NAV_LINKS.map((l) => (
              <span key={l} onClick={() => scrollTo(l.toLowerCase().replace(" ", "-"))} style={{ color: t.textMuted, cursor: "pointer", fontSize: 14, fontWeight: 500, letterSpacing: "0.02em", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = t.textPrimary} onMouseLeave={e => e.target.style.color = t.textMuted}>{l}</span>
            ))}
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
            <button className="btn-primary" style={{ padding: "10px 24px", fontSize: 14 }} onClick={() => scrollTo("contact")}>Get Started</button>
          </div>
          <div className="mobile-toggle" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: t.textPrimary, fontSize: 24, cursor: "pointer", display: "flex", alignItems: "center" }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-menu" style={{ background: t.bgCard, borderTop: `1px solid ${t.border}`, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20, transition: "background 0.4s" }}>
            {NAV_LINKS.map((l) => (
              <span key={l} onClick={() => scrollTo(l.toLowerCase().replace(" ", "-"))} style={{ color: t.textMuted, cursor: "pointer", fontSize: 16, fontWeight: 500 }}>{l}</span>
            ))}
            <button className="btn-primary" onClick={() => scrollTo("contact")}>Get Started</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 24px 80px", overflow: "hidden" }}>
        <div className="hero-glow" />
        <div className="hero-glow-2" />
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 2 }}>
          <div className="anim-1" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: t.accentBg, border: `1px solid ${t.accentBorder}`, borderRadius: 100, padding: "8px 18px 8px 12px", marginBottom: 32 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.accent, display: "inline-block" }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: t.accent, letterSpacing: "0.04em" }}>Serving Central Minnesota Small Businesses</span>
          </div>
          <h1 className="hero-title anim-2" style={{ fontFamily: "'Instrument Serif', serif", fontSize: 68, fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.03em", maxWidth: 800, marginBottom: 24 }}>
            Secure Your Business.<br />
            <span style={{ color: t.accent }}>Empower</span> Your People.
          </h1>
          <p className="anim-3" style={{ fontSize: 18, color: t.textMuted, maxWidth: 560, lineHeight: 1.7, marginBottom: 40 }}>
            IT security audits, infrastructure support, and human-centered training for small businesses in the St. Cloud area. Enterprise-grade protection, built for your scale.
          </p>
          <div className="hero-buttons anim-4" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => scrollTo("contact")}>Schedule a Consultation</button>
            <button className="btn-outline" onClick={() => scrollTo("services")}>Explore Services</button>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div style={{ borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, padding: "48px 24px", transition: "border-color 0.4s" }}>
        <FadeIn>
          <div className="stats-row" style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "space-around", alignItems: "center", gap: 48 }}>
            {[
              { num: "GRC", label: "Compliance Expertise" },
              { num: "4+", label: "Years Audit Experience" },
              { num: "100%", label: "Client-Focused" },
              { num: "MN", label: "Locally Based" },
            ].map((s, i) => (
              <div key={i} className="stat-box">
                <div className="stat-num">{s.num}</div>
                <div style={{ fontSize: 13, color: t.textMuted, marginTop: 8, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* SERVICES */}
      <section id="services" style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontSize: 13, fontWeight: 600, color: t.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Our Services</p>
          <h2 className="section-title" style={{ fontFamily: "'Instrument Serif', serif", fontSize: 44, fontWeight: 400, letterSpacing: "-0.02em", marginBottom: 16, lineHeight: 1.15 }}>Security Solutions Tailored<br />for Small Business</h2>
          <p style={{ fontSize: 16, color: t.textMuted, maxWidth: 560, lineHeight: 1.7, marginBottom: 56 }}>
            From risk assessment to staff development, a full spectrum of IT services designed to protect and empower organizations with 5–50 employees.
          </p>
        </FadeIn>

        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {SERVICES.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                className={`service-card ${activeService === i ? "active" : ""}`}
                onClick={() => setActiveService(i)}
                style={{ background: t.bgCard, borderRadius: 12, padding: 36, cursor: "pointer", minHeight: 280, display: "flex", flexDirection: "column", transition: "background 0.4s, border-color 0.4s, transform 0.4s, box-shadow 0.4s", boxShadow: isDark ? "none" : "0 1px 3px rgba(0,0,0,0.04)" }}
              >
                <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: t.accent, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{s.subtitle}</div>
                <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12, letterSpacing: "-0.01em" }}>{s.title}</h3>
                <p style={{ fontSize: 15, color: t.textMuted, lineHeight: 1.65, marginBottom: 20, flex: 1 }}>{s.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {s.details.map((d, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: t.textMuted }}>
                      <span style={{ color: t.accent, fontSize: 10 }}>●</span>
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" style={{ padding: "100px 24px", background: t.bgCard, transition: "background 0.5s" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontSize: 13, fontWeight: 600, color: t.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Why Johnson Industries</p>
            <h2 className="section-title" style={{ fontFamily: "'Instrument Serif', serif", fontSize: 44, fontWeight: 400, letterSpacing: "-0.02em", marginBottom: 56, lineHeight: 1.15, maxWidth: 600 }}>
              Not Just Another IT Vendor.<br />Your Strategic Partner.
            </h2>
          </FadeIn>
          <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            {WHY_US.map((w, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="why-card">
                  <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 36, color: t.accent, opacity: 0.4, marginBottom: 12 }}>{w.num}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, letterSpacing: "-0.01em" }}>{w.title}</h3>
                  <p style={{ fontSize: 15, color: t.textMuted, lineHeight: 1.7 }}>{w.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <FadeIn>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: t.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>About</p>
              <h2 className="section-title" style={{ fontFamily: "'Instrument Serif', serif", fontSize: 44, fontWeight: 400, letterSpacing: "-0.02em", marginBottom: 24, lineHeight: 1.15 }}>
                Meet Steven Johnson
              </h2>
              <p style={{ fontSize: 16, color: t.textMuted, lineHeight: 1.8, marginBottom: 20 }}>
                With a B.A. in Psychology and over four years of program management and compliance auditing experience, Steven brings a uniquely human-centered perspective to IT security.
              </p>
              <p style={{ fontSize: 16, color: t.textMuted, lineHeight: 1.8, marginBottom: 20 }}>
                His background in 245D regulatory compliance and behavioral analysis means he doesn't just find technical vulnerabilities — he understands the human factors that create them, and builds training programs that actually change behavior.
              </p>
              <p style={{ fontSize: 16, color: t.textMuted, lineHeight: 1.8, marginBottom: 32 }}>
                Johnson Industries LLC was founded to bring enterprise-caliber IT security services to the small businesses of Central Minnesota — the organizations that need it most but are often underserved by large consulting firms.
              </p>
              <button className="btn-outline" onClick={() => scrollTo("contact")}>Let's Connect →</button>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: 48, display: "flex", flexDirection: "column", gap: 28, transition: "background 0.4s, border-color 0.4s", boxShadow: isDark ? "none" : "0 1px 4px rgba(0,0,0,0.05)" }}>
              {[
                { label: "Compliance & Auditing", value: "4+ Years" },
                { label: "Regulatory Framework", value: "245D Expertise" },
                { label: "Education", value: "B.A. Psychology" },
                { label: "Core Focus", value: "GRC & Training" },
                { label: "Service Area", value: "St. Cloud, MN" },
                { label: "Business Entity", value: "Johnson Industries LLC" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: i < 5 ? 20 : 0, borderBottom: i < 5 ? `1px solid ${t.border}` : "none" }}>
                  <span style={{ fontSize: 14, color: t.textMuted, fontWeight: 500 }}>{item.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: t.textPrimary }}>{item.value}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA / CONTACT */}
      <section id="contact" style={{ padding: "100px 24px", background: t.bgCard, transition: "background 0.5s" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: t.accentBg, border: `1px solid ${t.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", fontSize: 28 }}>🔒</div>
            <h2 className="section-title" style={{ fontFamily: "'Instrument Serif', serif", fontSize: 44, fontWeight: 400, letterSpacing: "-0.02em", marginBottom: 20, lineHeight: 1.15 }}>
              Ready to Secure Your Business?
            </h2>
            <p style={{ fontSize: 17, color: t.textMuted, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 40px" }}>
              Schedule a free initial consultation. We'll assess your current security posture and build a roadmap tailored to your organization.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
              <button className="btn-primary" style={{ padding: "16px 36px", fontSize: 16 }}>Schedule Consultation</button>
              <button className="btn-outline" style={{ padding: "15px 34px", fontSize: 16 }}>info@johnsonindustries.com</button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
              {[
                { icon: "📍", text: "St. Cloud, MN" },
                { icon: "📧", text: "info@johnsonindustries.com" },
                { icon: "📞", text: "(320) 555-0100" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: t.textMuted }}>
                  <span>{c.icon}</span>
                  <span>{c.text}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${t.border}`, padding: "64px 24px 40px", transition: "border-color 0.4s" }}>
        <div className="footer-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 64 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: t.accent, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: t.btnPrimaryText, fontSize: 15, fontFamily: "'Instrument Serif', serif", transition: "background 0.4s" }}>J</div>
              <span style={{ fontWeight: 600, fontSize: 15 }}>Johnson Industries LLC</span>
            </div>
            <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7, maxWidth: 280 }}>
              Enterprise-grade IT security and consulting, purpose-built for Central Minnesota small businesses.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: t.textMuted, marginBottom: 20 }}>Services</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Security Audits", "IT Support", "Staff Training", "Vulnerability Assessment"].map((s) => (
                <span key={s} className="footer-link" style={{ fontSize: 14 }}>{s}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: t.textMuted, marginBottom: 20 }}>Company</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["About", "Contact", "Blog", "Resources"].map((s) => (
                <span key={s} className="footer-link" style={{ fontSize: 14 }}>{s}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: t.textMuted, marginBottom: 20 }}>Connect</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["LinkedIn", "Email", "Phone"].map((s) => (
                <span key={s} className="footer-link" style={{ fontSize: 14 }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="divider" style={{ margin: "40px auto 24px", maxWidth: 1200, background: t.border }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 13, color: t.textMuted }}>© 2026 Johnson Industries LLC. All rights reserved.</span>
          <span style={{ fontSize: 13, color: t.textMuted }}>St. Cloud, Minnesota</span>
        </div>
      </footer>
    </div>
  );
}
