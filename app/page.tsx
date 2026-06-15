"use client";

import { useEffect, useRef, useState } from "react";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(24px)",
      transition: `opacity 1.4s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.4s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

const D = {
  dark: {
    bg: "#080807",
    text: "#ddd8d0",
    gold: "#b8966e",
    dim: "#4a453f",
    rule: "#171614",
    sub: "#7a7268",
    faint: "#232019",
    ticker: "#1a1714",
  },
  light: {
    bg: "#f4f1ed",
    text: "#18160f",
    gold: "#8a6840",
    dim: "#9a9088",
    rule: "#dedad4",
    sub: "#7a7268",
    faint: "#e8e4de",
    ticker: "#ece8e2",
  },
};

const TICKER_ITEMS = [
  "Contemporary Art", "Cultural Communications", "Press & Editorial",
  "Paris · London · New York", "Private Mandates", "Institutional Relations",
  "Art Basel", "Venice Biennale", "Market Intelligence", "Selected Representation",
];

export default function Home() {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const [heroIn, setHeroIn] = useState(false);
  const t = D[mode];

  useEffect(() => {
    const stored = localStorage.getItem("goon-theme") as "dark" | "light" | null;
    if (stored) setMode(stored);
    else if (window.matchMedia("(prefers-color-scheme: light)").matches) setMode("light");
    setTimeout(() => setHeroIn(true), 80);
  }, []);

  function toggle() {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    localStorage.setItem("goon-theme", next);
  }

  const tr = "transition: color 0.5s, background 0.5s, border-color 0.5s";
  void tr;

  return (
    <main style={{ background: t.bg, color: t.text, fontFamily: "'Cormorant Garamond', Georgia, serif", overflowX: "hidden", transition: "background 0.5s, color 0.5s" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "2rem 2.8rem",
        background: mode === "dark"
          ? "linear-gradient(to bottom, rgba(8,8,7,0.9) 0%, transparent 100%)"
          : "linear-gradient(to bottom, rgba(244,241,237,0.9) 0%, transparent 100%)",
        backdropFilter: "blur(0px)",
        transition: "background 0.5s",
      }}>
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: t.sub, transition: "color 0.5s" }}>
          Go On PR
        </span>
        <button onClick={toggle} style={{
          background: "none", border: "none", cursor: "pointer", padding: 0,
          fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase",
          color: t.dim, fontFamily: "'Cormorant Garamond', Georgia, serif", transition: "color 0.4s",
        }}
          onMouseEnter={e => (e.currentTarget.style.color = t.sub)}
          onMouseLeave={e => (e.currentTarget.style.color = t.dim)}
        >
          {mode === "dark" ? "☽" : "○"}
        </button>
      </nav>

      {/* HERO */}
      <section style={{ height: "100svh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 2.8rem 3rem" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1 style={{
            fontSize: "clamp(5rem, 18vw, 20rem)",
            fontWeight: 300,
            lineHeight: 0.88,
            letterSpacing: "-0.02em",
            color: t.text,
            opacity: heroIn ? 1 : 0,
            transform: heroIn ? "none" : "translateY(50px)",
            transition: "opacity 2s cubic-bezier(0.16,1,0.3,1) 200ms, transform 2s cubic-bezier(0.16,1,0.3,1) 200ms, color 0.5s",
            userSelect: "none",
          }}>
            Go<br />
            <em style={{ color: t.gold, fontStyle: "italic", fontSize: "0.38em", letterSpacing: "0.05em", lineHeight: 1.8, display: "block", transition: "color 0.5s" }}>on</em>
            PR
          </h1>
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          opacity: heroIn ? 1 : 0, transition: "opacity 2.2s 1s",
        }}>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.24em", textTransform: "uppercase", color: t.dim, lineHeight: 2, transition: "color 0.5s" }}>
            Private communications<br />for artists & institutions
          </p>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.24em", textTransform: "uppercase", color: t.dim, textAlign: "right", transition: "color 0.5s" }}>
            Paris<br />Est. 2026
          </p>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ borderTop: `1px solid ${t.rule}`, borderBottom: `1px solid ${t.rule}`, overflow: "hidden", padding: "1rem 0", transition: "border-color 0.5s" }}>
        <div style={{
          display: "flex", gap: "4rem", whiteSpace: "nowrap",
          animation: "ticker 28s linear infinite",
        }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: t.dim, flexShrink: 0, transition: "color 0.5s" }}>
              {item} <span style={{ color: t.gold, marginLeft: "1rem", transition: "color 0.5s" }}>·</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      {/* STATEMENT */}
      <section style={{ padding: "14rem 2.8rem", maxWidth: "1200px" }}>
        <Reveal>
          <p style={{
            fontSize: "clamp(2rem, 5vw, 4.5rem)",
            fontWeight: 300,
            lineHeight: 1.2,
            letterSpacing: "0.005em",
            color: t.text,
            transition: "color 0.5s",
          }}>
            We represent the artists,<br />
            institutions, and collectors<br />
            who shape what culture becomes —<br />
            <em style={{ color: t.gold, transition: "color 0.5s" }}>
              not after the fact.
            </em>
          </p>
        </Reveal>
        <Reveal delay={150}>
          <p style={{ fontSize: "0.95rem", fontWeight: 300, lineHeight: 2.1, color: t.dim, marginTop: "5rem", maxWidth: "440px", letterSpacing: "0.02em", transition: "color 0.5s" }}>
            The practice of Dorian Batycka —
            writer, editor, and curator across Artforum,
            The Art Newspaper, Artnet, Hyperallergic,
            and crypto.news. A boutique of one,
            at the intersection of fine art,
            institutional culture, and emerging markets.
          </p>
        </Reveal>
      </section>

      <div style={{ borderTop: `1px solid ${t.rule}`, margin: "0 2.8rem", transition: "border-color 0.5s" }} />

      {/* SELECTED WORK */}
      <section style={{ padding: "10rem 2.8rem" }}>
        <Reveal>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: t.gold, marginBottom: "7rem", transition: "color 0.5s" }}>
            Selected Work
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 6rem", paddingTop: "3rem", paddingBottom: "3rem", borderTop: `1px solid ${t.rule}`, alignItems: "end", transition: "border-color 0.5s" }}>
            <p style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", fontWeight: 300, lineHeight: 0.95, letterSpacing: "-0.02em", color: t.text, transition: "color 0.5s" }}>
              Niclas<br />Castello
            </p>
            <div>
              <p style={{ fontSize: "clamp(1.3rem, 2.8vw, 2.4rem)", fontStyle: "italic", fontWeight: 300, color: t.gold, lineHeight: 1.15, marginBottom: "2rem", transition: "color 0.5s" }}>
                La diabolica commedia
              </p>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: t.dim, lineHeight: 2.2, transition: "color 0.5s" }}>
                Art Basel 2026<br />
                61st Venice Biennale<br />
                FàBRICA33 · May–Nov 2026
              </p>
            </div>
          </div>
        </Reveal>

        <div style={{ borderTop: `1px solid ${t.rule}`, transition: "border-color 0.5s" }} />

        <Reveal delay={80}>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: t.faint, marginTop: "2.5rem", transition: "color 0.5s" }}>
            Further mandates disclosed upon request
          </p>
        </Reveal>
      </section>

      <div style={{ borderTop: `1px solid ${t.rule}`, margin: "0 2.8rem", transition: "border-color 0.5s" }} />

      {/* MEDIA */}
      <section style={{ padding: "8rem 2.8rem" }}>
        <Reveal>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: t.gold, marginBottom: "4rem", transition: "color 0.5s" }}>
            Media
          </p>
        </Reveal>
        <Reveal delay={60}>
          <div style={{ display: "flex", flexWrap: "wrap", columnGap: "4rem", rowGap: "1.2rem" }}>
            {["Artforum", "The Art Newspaper", "Artnet", "Hyperallergic", "Decrypt", "crypto.news"].map(o => (
              <span key={o} style={{ fontSize: "1.2rem", fontWeight: 300, color: t.dim, letterSpacing: "0.03em", transition: "color 0.5s" }}>
                {o}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      <div style={{ borderTop: `1px solid ${t.rule}`, margin: "0 2.8rem", transition: "border-color 0.5s" }} />

      {/* CONTACT — no form, just an address */}
      <section style={{ padding: "10rem 2.8rem" }}>
        <Reveal>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: t.gold, marginBottom: "4rem", transition: "color 0.5s" }}>
            Contact
          </p>
        </Reveal>
        <Reveal delay={80}>
          <p style={{ fontSize: "clamp(1.6rem, 4vw, 3.5rem)", fontWeight: 300, lineHeight: 1.3, color: t.text, maxWidth: "700px", transition: "color 0.5s" }}>
            Introductions by referral<br />
            or direct invitation.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <a
            href="mailto:Dorian.batycka@gmail.com"
            style={{
              display: "inline-block",
              marginTop: "3.5rem",
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: t.sub,
              textDecoration: "none",
              borderBottom: `1px solid ${t.rule}`,
              paddingBottom: "3px",
              transition: "color 0.4s, border-color 0.4s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = t.gold;
              e.currentTarget.style.borderBottomColor = t.gold;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = t.sub;
              e.currentTarget.style.borderBottomColor = t.rule;
            }}
          >
            Dorian.batycka@gmail.com
          </a>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${t.rule}`, padding: "2.5rem 2.8rem", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "border-color 0.5s" }}>
        <span style={{ fontSize: "0.58rem", letterSpacing: "0.32em", textTransform: "uppercase", color: t.faint, transition: "color 0.5s" }}>
          © 2026 Go On PR
        </span>
        <span style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: t.faint, transition: "color 0.5s" }}>
          Paris
        </span>
      </footer>

    </main>
  );
}
