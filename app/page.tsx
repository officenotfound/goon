"use client";

import { useEffect, useRef, useState } from "react";

/* ── Custom cursor ── */
function Cursor({ color }: { color: string }) {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos  = useRef({ x: -100, y: -100 });
  const lag  = useRef({ x: -100, y: -100 });
  const raf  = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    const tick = () => {
      lag.current.x += (pos.current.x - lag.current.x) * 0.1;
      lag.current.y += (pos.current.y - lag.current.y) * 0.1;
      if (dot.current)  dot.current.style.transform  = `translate(${pos.current.x - 2}px,${pos.current.y - 2}px)`;
      if (ring.current) ring.current.style.transform = `translate(${lag.current.x - 16}px,${lag.current.y - 16}px)`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <>
      <div ref={dot}  style={{ position:"fixed", top:0, left:0, width:4,  height:4,  borderRadius:"50%", background:color, pointerEvents:"none", zIndex:9999, transition:"background 0.5s" }} />
      <div ref={ring} style={{ position:"fixed", top:0, left:0, width:32, height:32, borderRadius:"50%", border:`1px solid ${color}`, opacity:0.3, pointerEvents:"none", zIndex:9998 }} />
    </>
  );
}

/* ── Page curtain ── */
function Curtain({ bg }: { bg: string }) {
  const [out,  setOut]  = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => {
    setTimeout(() => setOut(true),  400);
    setTimeout(() => setDone(true), 2200);
  }, []);
  if (done) return null;
  return <div style={{ position:"fixed", inset:0, zIndex:9000, background:bg, opacity:out?0:1, transition:"opacity 1.8s cubic-bezier(0.16,1,0.3,1)", pointerEvents:"none" }} />;
}

/* ── Theme ── */
const D = {
  dark: {
    bg:     "#000000",
    text:   "#c8c8c8",
    accent: "#ffffff",
    muted:  "#2a2a2a",
    dim:    "#4a4a4a",
    rule:   "#111111",
  },
  light: {
    bg:     "#f0f0f0",
    text:   "#111111",
    accent: "#000000",
    muted:  "#d0d0d0",
    dim:    "#888888",
    rule:   "#e0e0e0",
  },
};

const SERIF = "var(--font-serif), 'Instrument Serif', Georgia, serif";
const MONO  = "var(--font-sans), 'Josefin Sans', Futura, 'Century Gothic', sans-serif";

export default function Home() {
  const [mode,    setMode]    = useState<"dark"|"light">("dark");
  const [in1,     setIn1]     = useState(false);
  const [gap,     setGap]     = useState(0.18);
  const [flashed, setFlashed] = useState(false);
  const merged = useRef(false);
  const t = D[mode];

  useEffect(() => {
    const s = localStorage.getItem("goon-theme") as "dark"|"light"|null;
    if (s) setMode(s);
    setTimeout(() => setIn1(true), 900);

    const onScroll = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.82), 1);
      setGap(0.18 - 0.17 * progress);
      if (progress === 1 && !merged.current) {
        merged.current = true;
        setFlashed(true);
        setTimeout(() => setFlashed(false), 2000);
      }
      if (progress < 1) merged.current = false;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggle() {
    const n = mode === "dark" ? "light" : "dark";
    setMode(n);
    localStorage.setItem("goon-theme", n);
  }

  return (
    <>
      <Cursor color={t.accent} />
      <Curtain bg={t.bg} />

      <main style={{ background:t.bg, color:t.text, fontFamily:SERIF, minHeight:"100vh", transition:"background 0.6s, color 0.6s", textAlign:"left" }}>

        {/* ── Toggle ── */}
        <button onClick={toggle} style={{
          position:"fixed", top:"2rem", right:"2.8rem", zIndex:100,
          background:"none", border:"none", padding:0,
          fontFamily:MONO, fontSize:"0.55rem", letterSpacing:"0.12em",
          color:t.dim, transition:"color 0.4s",
        }}
          onMouseEnter={e => e.currentTarget.style.color = t.text}
          onMouseLeave={e => e.currentTarget.style.color = t.dim}
        >
          {mode === "dark" ? "[ light ]" : "[ dark ]"}
        </button>

        {/* ── Hero ── */}
        <section style={{ height:"100svh", display:"flex", alignItems:"flex-end", padding:"0 2.8rem 3.5rem" }}>
          <div style={{ opacity:in1?1:0, transition:"opacity 2.4s cubic-bezier(0.16,1,0.3,1)", userSelect:"none" }}>
            <div style={{ fontSize:"clamp(5.5rem, 19vw, 22rem)", fontWeight:400, lineHeight:0.88, letterSpacing:"-0.025em" }}>

              <div style={{ display:"flex", alignItems:"baseline" }}>
                <span style={{ color:t.text, marginRight:`${gap}em`, transition:"color 0.6s" }}>Go</span>
                <span style={{ color:t.accent, fontStyle:"italic", transition:"color 0.6s" }}>on</span>
              </div>

              <div style={{
                fontFamily:MONO,
                fontSize:"0.18em",
                marginTop:"0.1em",
                marginLeft:"3vw",
                letterSpacing:"0.25em",
                color:t.muted,
                textTransform:"uppercase",
                animation: flashed ? "pr-flash 1.8s cubic-bezier(0.16,1,0.3,1) forwards" : "none",
              }}>PR</div>

            </div>
          </div>
        </section>

        {/* ── Manifesto ── */}
        <section style={{ padding:"16rem 2.8rem 16rem", maxWidth:"620px" }}>
          <p style={{
            fontSize:"clamp(1rem, 1.6vw, 1.3rem)",
            fontFamily:SERIF,
            fontWeight:400,
            lineHeight:1.9,
            color:t.dim,
            letterSpacing:"0.01em",
            transition:"color 0.6s",
          }}>
            We work with artists, institutions, and collectors at the precise moment
            culture is being made, not after the fact. A boutique of one.
            Mandates are limited and by introduction only.
          </p>
        </section>


        {/* ── Contact ── */}
        <section style={{ padding:"0 2.8rem 6rem" }}>
          <p style={{ fontFamily:SERIF, fontSize:"clamp(1.6rem, 3.5vw, 3rem)", fontWeight:400, lineHeight:1.3, color:t.text, marginBottom:"3rem", transition:"color 0.6s" }}>
            Introductions by referral<br />or direct invitation.
          </p>
          <a href="mailto:Dorian@goonpr.com" style={{
            fontFamily:MONO,
            fontSize:"0.78rem",
            letterSpacing:"0.08em",
            color:t.dim,
            textDecoration:"none",
            transition:"color 0.4s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = t.accent}
            onMouseLeave={e => e.currentTarget.style.color = t.dim}
          >
            Dorian@goonpr.com
          </a>
        </section>

        {/* ── Footer ── */}
        <footer style={{ padding:"2rem 2.8rem", display:"flex", justifyContent:"space-between" }}>
          <span style={{ fontFamily:MONO, fontSize:"0.5rem", letterSpacing:"0.15em", color:t.dim, transition:"color 0.6s" }}>
            © 2026 GO ON PR
          </span>
          <span style={{ fontFamily:MONO, fontSize:"0.5rem", letterSpacing:"0.15em", color:t.dim, transition:"color 0.6s" }}>
            PARIS
          </span>
        </footer>

      </main>
    </>
  );
}
