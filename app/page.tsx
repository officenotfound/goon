"use client";

import { useEffect, useRef, useState } from "react";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const THEMES = {
  dark: {
    bg: "#0a0a0a",
    text: "#e2ddd6",
    gold: "#b8966e",
    muted: "#5a5248",
    faint: "#2e2b28",
    rule: "#1e1b18",
    sub: "#9a8c7e",
    media: "#3a3530",
    toggle: "#3a3530",
    toggleHover: "#9a8c7e",
  },
  light: {
    bg: "#f5f2ee",
    text: "#1a1714",
    gold: "#8a6840",
    muted: "#8a7e74",
    faint: "#c8bfb4",
    rule: "#ddd8d0",
    sub: "#6b6158",
    media: "#b8b0a4",
    toggle: "#b8b0a4",
    toggleHover: "#6b6158",
  },
};

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [heroVisible, setHeroVisible] = useState(false);
  const [mode, setMode] = useState<"dark" | "light">("dark");

  const t = THEMES[mode];

  useEffect(() => {
    const stored = localStorage.getItem("goon-theme") as "dark" | "light" | null;
    if (stored) setMode(stored);
    else if (window.matchMedia("(prefers-color-scheme: light)").matches) setMode("light");
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  function toggleMode() {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    localStorage.setItem("goon-theme", next);
  }

  const inputStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${t.rule}`,
    color: t.text,
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "1.15rem",
    fontWeight: 300,
    padding: "0.5rem 0",
    outline: "none",
    letterSpacing: "0.02em",
    width: "100%",
  };

  return (
    <main style={{ background: t.bg, color: t.text, fontFamily: "'Cormorant Garamond', Georgia, serif", overflowX: "hidden", transition: "background 0.6s, color 0.6s" }}>

      {/* HERO */}
      <section style={{ height: "100svh", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "2.5rem 2.8rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{
            fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: t.sub,
            opacity: heroVisible ? 1 : 0, transition: "opacity 2s 200ms",
          }}>
            Paris · Est. 2026
          </span>
          <button
            onClick={toggleMode}
            aria-label="Toggle light/dark"
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase",
              color: t.toggle, fontFamily: "'Cormorant Garamond', Georgia, serif",
              opacity: heroVisible ? 1 : 0, transition: "opacity 2s 400ms, color 0.4s",
              padding: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = t.toggleHover)}
            onMouseLeave={e => (e.currentTarget.style.color = t.toggle)}
          >
            {mode === "dark" ? "Light" : "Dark"}
          </button>
        </div>

        <h1 style={{
          fontSize: "clamp(4.5rem, 16vw, 18rem)",
          fontWeight: 300,
          lineHeight: 0.9,
          letterSpacing: "-0.01em",
          color: t.text,
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "none" : "translateY(40px)",
          transition: "opacity 1.8s cubic-bezier(0.16,1,0.3,1) 400ms, transform 1.8s cubic-bezier(0.16,1,0.3,1) 400ms, color 0.6s",
        }}>
          Go<br />
          <em style={{ color: t.gold, fontStyle: "italic", fontWeight: 300, transition: "color 0.6s" }}>On</em><br />
          PR
        </h1>

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          opacity: heroVisible ? 1 : 0, transition: "opacity 2s 900ms",
        }}>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: t.muted, maxWidth: "280px", lineHeight: 1.8 }}>
            Private communications<br />for artists and institutions
          </p>
          <a href="#work" style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: t.sub, textDecoration: "none", borderBottom: `1px solid ${t.rule}` }}>
            Enter ↓
          </a>
        </div>
      </section>

      <div style={{ borderTop: `1px solid ${t.rule}`, margin: "0 2.8rem", transition: "border-color 0.6s" }} />

      {/* MANIFESTO */}
      <section id="work" style={{ padding: "12rem 2.8rem", maxWidth: "1100px" }}>
        <Reveal>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: t.gold, marginBottom: "4rem", transition: "color 0.6s" }}>
            On the work
          </p>
        </Reveal>
        <Reveal delay={100}>
          <p style={{ fontSize: "clamp(1.8rem, 4.5vw, 4rem)", fontWeight: 300, lineHeight: 1.25, letterSpacing: "0.01em", color: t.muted, maxWidth: "900px", transition: "color 0.6s" }}>
            We represent the artists, institutions, and collectors who shape what culture becomes —
            not after the fact, but{" "}
            <em style={{ color: t.text, fontStyle: "italic", transition: "color 0.6s" }}>at the precise moment it is being made.</em>
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p style={{ fontSize: "1rem", fontWeight: 300, lineHeight: 2, color: t.muted, marginTop: "4rem", maxWidth: "520px", letterSpacing: "0.02em", transition: "color 0.6s" }}>
            Go On PR is the practice of Dorian Batycka — journalist, curator, and editor
            across Artforum, The Art Newspaper, Artnet, and crypto.news. A boutique of one,
            working at the intersection of fine art, institutional culture, and emerging markets.
          </p>
        </Reveal>
      </section>

      <div style={{ borderTop: `1px solid ${t.rule}`, margin: "0 2.8rem", transition: "border-color 0.6s" }} />

      {/* SELECTED WORK */}
      <section style={{ padding: "10rem 2.8rem" }}>
        <Reveal>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: t.gold, marginBottom: "6rem", transition: "color 0.6s" }}>
            Selected Work
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div style={{ borderTop: `1px solid ${t.rule}`, paddingTop: "3.5rem", paddingBottom: "3.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "end", transition: "border-color 0.6s" }}>
            <div>
              <p style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", fontWeight: 300, lineHeight: 1, color: t.text, letterSpacing: "-0.01em", transition: "color 0.6s" }}>
                Niclas<br />Castello
              </p>
            </div>
            <div>
              <p style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)", fontStyle: "italic", fontWeight: 300, color: t.gold, lineHeight: 1.2, marginBottom: "1.5rem", transition: "color 0.6s" }}>
                La diabolica commedia
              </p>
              <p style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: t.faint, lineHeight: 2, transition: "color 0.6s" }}>
                Art Basel 2026<br />
                Venice Biennale · 61st International Art Exhibition<br />
                FàBRICA33, Venice · May–November 2026
              </p>
            </div>
          </div>
        </Reveal>
        <div style={{ borderTop: `1px solid ${t.rule}`, transition: "border-color 0.6s" }} />
        <Reveal delay={100}>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: t.faint, marginTop: "3rem", transition: "color 0.6s" }}>
            Further mandates disclosed upon request
          </p>
        </Reveal>
      </section>

      <div style={{ borderTop: `1px solid ${t.rule}`, margin: "0 2.8rem", transition: "border-color 0.6s" }} />

      {/* MEDIA */}
      <section style={{ padding: "8rem 2.8rem" }}>
        <Reveal>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: t.gold, marginBottom: "3.5rem", transition: "color 0.6s" }}>
            Media
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0 3.5rem", rowGap: "1rem" }}>
            {["Artforum", "The Art Newspaper", "Artnet", "Hyperallergic", "Decrypt", "crypto.news"].map((o) => (
              <span key={o} style={{ fontSize: "1.1rem", fontWeight: 300, color: t.media, letterSpacing: "0.04em", lineHeight: 1.6, transition: "color 0.6s" }}>
                {o}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      <div style={{ borderTop: `1px solid ${t.rule}`, margin: "0 2.8rem", transition: "border-color 0.6s" }} />

      {/* INQUIRE */}
      <section id="inquire" style={{ padding: "10rem 2.8rem", maxWidth: "640px" }}>
        <Reveal>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: t.gold, marginBottom: "4rem", transition: "color 0.6s" }}>
            Inquire
          </p>
        </Reveal>
        <Reveal delay={80}>
          <p style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 300, lineHeight: 1.5, color: t.muted, marginBottom: "5rem", letterSpacing: "0.01em", transition: "color 0.6s" }}>
            Go On PR accepts a limited number of mandates each year.
            Introductions by referral or direct invitation are preferred.
          </p>
        </Reveal>

        {submitted ? (
          <Reveal>
            <p style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 300, fontStyle: "italic", color: t.gold, lineHeight: 1.6, transition: "color 0.6s" }}>
              Received.<br />We will be in touch.
            </p>
          </Reveal>
        ) : (
          <Reveal delay={120}>
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              <input type="text" required placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
              <input type="email" required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
              <textarea required placeholder="Your project or inquiry" rows={3} value={note} onChange={e => setNote(e.target.value)} style={{ ...inputStyle, resize: "none" }} />
              <div>
                <button type="submit" style={{
                  background: "none", border: "none", color: t.sub,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase",
                  cursor: "pointer", padding: 0, borderBottom: `1px solid ${t.faint}`,
                  paddingBottom: "2px", transition: "color 0.4s",
                }}>
                  Send →
                </button>
              </div>
            </form>
          </Reveal>
        )}
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${t.rule}`, padding: "3rem 2.8rem", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "border-color 0.6s" }}>
        <span style={{ fontSize: "0.62rem", letterSpacing: "0.32em", textTransform: "uppercase", color: t.faint, transition: "color 0.6s" }}>
          Go On PR
        </span>
        <a href="mailto:Dorian.batycka@gmail.com" style={{ fontSize: "0.62rem", letterSpacing: "0.16em", color: t.faint, textDecoration: "none", transition: "color 0.6s" }}>
          Dorian.batycka@gmail.com
        </a>
      </footer>

    </main>
  );
}
