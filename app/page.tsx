"use client";

import { useEffect, useRef, useState } from "react";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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
      className={className}
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

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main style={{ background: "#0a0a0a", color: "#e2ddd6", fontFamily: "'Cormorant Garamond', Georgia, serif", overflowX: "hidden" }}>

      {/* HERO — full viewport, just the name */}
      <section style={{ height: "100svh", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "2.5rem 2.8rem" }}>
        <div style={{
          opacity: heroVisible ? 1 : 0,
          transition: "opacity 2s cubic-bezier(0.16,1,0.3,1) 200ms",
        }}>
          <span style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#9a8c7e" }}>
            Paris · Est. 2026
          </span>
        </div>

        <div>
          <h1 style={{
            fontSize: "clamp(4.5rem, 16vw, 18rem)",
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
            color: "#e2ddd6",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "none" : "translateY(40px)",
            transition: "opacity 1.8s cubic-bezier(0.16,1,0.3,1) 400ms, transform 1.8s cubic-bezier(0.16,1,0.3,1) 400ms",
          }}>
            Go<br />
            <em style={{ color: "#b8966e", fontStyle: "italic", fontWeight: 300 }}>On</em><br />
            PR
          </h1>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          opacity: heroVisible ? 1 : 0,
          transition: "opacity 2s cubic-bezier(0.16,1,0.3,1) 900ms",
        }}>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#5a5248", maxWidth: "280px", lineHeight: 1.8 }}>
            Private communications<br />for artists and institutions
          </p>
          <a href="#work" style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#9a8c7e", textDecoration: "none", borderBottom: "1px solid #3a3530" }}>
            Enter ↓
          </a>
        </div>
      </section>

      {/* RULE */}
      <div style={{ borderTop: "1px solid #1e1b18", margin: "0 2.8rem" }} />

      {/* MANIFESTO */}
      <section id="work" style={{ padding: "12rem 2.8rem", maxWidth: "1100px" }}>
        <Reveal>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#b8966e", marginBottom: "4rem" }}>
            On the work
          </p>
        </Reveal>
        <Reveal delay={100}>
          <p style={{
            fontSize: "clamp(1.8rem, 4.5vw, 4rem)",
            fontWeight: 300,
            lineHeight: 1.25,
            letterSpacing: "0.01em",
            color: "#c8c0b4",
            maxWidth: "900px",
          }}>
            We represent the artists, institutions, and collectors who shape what culture becomes —
            not after the fact, but{" "}
            <em style={{ color: "#e2ddd6", fontStyle: "italic" }}>at the precise moment it is being made.</em>
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p style={{
            fontSize: "1rem",
            fontWeight: 300,
            lineHeight: 2,
            color: "#5a5248",
            marginTop: "4rem",
            maxWidth: "520px",
            letterSpacing: "0.02em",
          }}>
            Go On PR is the practice of Dorian Batycka — journalist, curator, and editor
            across Artforum, The Art Newspaper, Artnet, and crypto.news. A boutique of one,
            working at the intersection of fine art, institutional culture, and emerging markets.
          </p>
        </Reveal>
      </section>

      {/* RULE */}
      <div style={{ borderTop: "1px solid #1e1b18", margin: "0 2.8rem" }} />

      {/* SELECTED WORK */}
      <section style={{ padding: "10rem 2.8rem" }}>
        <Reveal>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#b8966e", marginBottom: "6rem" }}>
            Selected Work
          </p>
        </Reveal>

        {/* Single project — Castello */}
        <Reveal delay={80}>
          <div style={{ borderTop: "1px solid #1e1b18", paddingTop: "3.5rem", paddingBottom: "3.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "end" }}>
            <div>
              <p style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", fontWeight: 300, lineHeight: 1, color: "#e2ddd6", letterSpacing: "-0.01em" }}>
                Niclas<br />Castello
              </p>
            </div>
            <div>
              <p style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)", fontStyle: "italic", fontWeight: 300, color: "#b8966e", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                La diabolica commedia
              </p>
              <p style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#3a3530", lineHeight: 2 }}>
                Art Basel 2026<br />
                Venice Biennale · 61st International Art Exhibition<br />
                FàBRICA33, Venice · May–November 2026
              </p>
            </div>
          </div>
        </Reveal>

        <div style={{ borderTop: "1px solid #1e1b18" }} />

        <Reveal delay={100}>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#2e2b28", marginTop: "3rem" }}>
            Further mandates disclosed upon request
          </p>
        </Reveal>
      </section>

      {/* RULE */}
      <div style={{ borderTop: "1px solid #1e1b18", margin: "0 2.8rem" }} />

      {/* MEDIA — just names, very small */}
      <section style={{ padding: "8rem 2.8rem" }}>
        <Reveal>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#b8966e", marginBottom: "3.5rem" }}>
            Media
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0 3.5rem", rowGap: "1rem" }}>
            {["Artforum", "The Art Newspaper", "Artnet", "Hyperallergic", "Decrypt", "crypto.news"].map((o) => (
              <span key={o} style={{ fontSize: "1.1rem", fontWeight: 300, color: "#3a3530", letterSpacing: "0.04em", lineHeight: 1.6 }}>
                {o}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* RULE */}
      <div style={{ borderTop: "1px solid #1e1b18", margin: "0 2.8rem" }} />

      {/* INQUIRE */}
      <section id="inquire" style={{ padding: "10rem 2.8rem", maxWidth: "640px" }}>
        <Reveal>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#b8966e", marginBottom: "4rem" }}>
            Inquire
          </p>
        </Reveal>
        <Reveal delay={80}>
          <p style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 300, lineHeight: 1.5, color: "#6b6158", marginBottom: "5rem", letterSpacing: "0.01em" }}>
            Go On PR accepts a limited number of mandates each year.
            Introductions by referral or direct invitation are preferred.
          </p>
        </Reveal>

        {submitted ? (
          <Reveal>
            <p style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 300, fontStyle: "italic", color: "#b8966e", lineHeight: 1.6 }}>
              Received.<br />We will be in touch.
            </p>
          </Reveal>
        ) : (
          <Reveal delay={120}>
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {[
                { val: name, set: setName, placeholder: "Name", type: "text" },
                { val: email, set: setEmail, placeholder: "Email", type: "email" },
              ].map(({ val, set, placeholder, type }) => (
                <input
                  key={placeholder}
                  type={type}
                  required
                  placeholder={placeholder}
                  value={val}
                  onChange={e => set(e.target.value)}
                  style={{
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid #1e1b18",
                    color: "#e2ddd6",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.15rem",
                    fontWeight: 300,
                    padding: "0.5rem 0",
                    outline: "none",
                    letterSpacing: "0.02em",
                    width: "100%",
                  }}
                />
              ))}
              <textarea
                required
                placeholder="Your project or inquiry"
                rows={3}
                value={note}
                onChange={e => setNote(e.target.value)}
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid #1e1b18",
                  color: "#e2ddd6",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.15rem",
                  fontWeight: 300,
                  padding: "0.5rem 0",
                  outline: "none",
                  resize: "none",
                  letterSpacing: "0.02em",
                  width: "100%",
                }}
              />
              <div>
                <button
                  type="submit"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#9a8c7e",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    padding: 0,
                    borderBottom: "1px solid #2e2b28",
                    paddingBottom: "2px",
                  }}
                >
                  Send →
                </button>
              </div>
            </form>
          </Reveal>
        )}
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1e1b18", padding: "3rem 2.8rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.62rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#2e2b28" }}>
          Go On PR
        </span>
        <a href="mailto:Dorian.batycka@gmail.com" style={{ fontSize: "0.62rem", letterSpacing: "0.16em", color: "#2e2b28", textDecoration: "none" }}>
          Dorian.batycka@gmail.com
        </a>
      </footer>

    </main>
  );
}
