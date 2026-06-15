"use client";

import { useEffect, useRef, useState } from "react";

/* ── Custom cursor ── */
function Cursor({ color }: { color: string }) {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const lag = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

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
      <div ref={ring} style={{ position:"fixed", top:0, left:0, width:32, height:32, borderRadius:"50%", border:`1px solid ${color}`, opacity:0.35, pointerEvents:"none", zIndex:9998, transition:"background 0.5s" }} />
    </>
  );
}

/* ── Page curtain ── */
function Curtain({ bg }: { bg: string }) {
  const [out, setOut] = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => {
    setTimeout(() => setOut(true), 400);
    setTimeout(() => setDone(true), 2000);
  }, []);
  if (done) return null;
  return <div style={{ position:"fixed", inset:0, zIndex:9000, background:bg, opacity:out?0:1, transition:"opacity 1.6s cubic-bezier(0.16,1,0.3,1)", pointerEvents:"none" }} />;
}

/* ── Theme ── */
const D = {
  dark: {
    bg:     "#080807",
    text:   "#d8d3cb",
    accent: "#c4b49a",   // warm ivory — not gold, not shiny
    dim:    "#38332d",
    muted:  "#5a5248",
    rule:   "#141210",
  },
  light: {
    bg:     "#f2efe9",
    text:   "#141210",
    accent: "#7a6248",
    dim:    "#c0b8ae",
    muted:  "#8a8078",
    rule:   "#dedad2",
  },
};

const FONT = "var(--font-instrument), 'Instrument Serif', Georgia, serif";

export default function Home() {
  const [mode, setMode] = useState<"dark"|"light">("dark");
  const [in1, setIn1] = useState(false);
  const [gap, setGap] = useState(0.18);
  const t = D[mode];

  useEffect(() => {
    const s = localStorage.getItem("goon-theme") as "dark"|"light"|null;
    if (s) setMode(s);
    else if (window.matchMedia("(prefers-color-scheme: light)").matches) setMode("light");
    setTimeout(() => setIn1(true), 900);

    const onScroll = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.82), 1);
      setGap(0.18 - 0.17 * progress);
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

      <Cursor color={t.muted} />
      <Curtain bg={t.bg} />

      <main style={{ background:t.bg, color:t.text, fontFamily:FONT, minHeight:"100vh", transition:"background 0.5s, color 0.5s" }}>

        {/* ── Mode toggle ── */}
        <button onClick={toggle} style={{
          position:"fixed", top:"2rem", right:"2.8rem", zIndex:100,
          background:"none", border:"none", padding:0,
          fontSize:"0.58rem", letterSpacing:"0.2em", textTransform:"uppercase",
          color:t.dim, fontFamily:FONT, transition:"color 0.4s",
        }}
          onMouseEnter={e => e.currentTarget.style.color = t.muted}
          onMouseLeave={e => e.currentTarget.style.color = t.dim}
        >
          {mode === "dark" ? "☽" : "○"}
        </button>

        {/* ── Hero ── */}
        <section style={{ height:"100svh", display:"flex", alignItems:"flex-end", padding:"0 2.8rem 3.5rem" }}>
          <div style={{
            opacity: in1 ? 1 : 0,
            transition:"opacity 2.4s cubic-bezier(0.16,1,0.3,1)",
            userSelect:"none",
          }}>
            <div style={{ fontSize:"clamp(5.5rem, 19vw, 22rem)", fontWeight:400, lineHeight:0.88, letterSpacing:"-0.025em" }}>
              <div style={{ display:"flex", alignItems:"baseline" }}>
                <span style={{ color:t.text, marginRight:`${gap}em`, transition:"color 0.5s" }}>Go</span>
                <span style={{ color:t.accent, fontStyle:"italic", transition:"color 0.5s" }}>on</span>
              </div>
              <div style={{ fontSize:"0.22em", marginTop:"-0.05em", marginLeft:"0.35em", letterSpacing:"0.04em", color:t.text, transition:"color 0.5s" }}>PR</div>
            </div>
          </div>
        </section>

        {/* ── Manifesto ── */}
        <section style={{ padding:"16rem 2.8rem 16rem", maxWidth:"680px" }}>
          <p style={{
            fontSize:"clamp(1.05rem, 1.8vw, 1.4rem)",
            fontWeight:400,
            lineHeight:1.85,
            color:t.muted,
            letterSpacing:"0.01em",
            transition:"color 0.5s",
          }}>
            We work with artists, institutions, and collectors at the precise moment
            culture is being made, not after the fact. A boutique of one.
            Mandates are limited and by introduction only.
          </p>
        </section>

        {/* ── Work ── */}
        <section style={{ padding:"0 2.8rem 16rem" }}>
          <div style={{ borderTop:`1px solid ${t.rule}`, paddingTop:"4rem", transition:"border-color 0.5s" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 4rem", alignItems:"end" }}>
              <p style={{ fontSize:"clamp(2.2rem, 5vw, 4.5rem)", fontWeight:400, lineHeight:0.95, letterSpacing:"-0.02em", color:t.text, transition:"color 0.5s" }}>
                Niclas<br />Castello
              </p>
              <div>
                <p style={{ fontSize:"clamp(1rem, 2vw, 1.6rem)", fontStyle:"italic", color:t.accent, lineHeight:1.2, marginBottom:"1.5rem", transition:"color 0.5s" }}>
                  La diabolica commedia
                </p>
                <p style={{ fontSize:"0.6rem", letterSpacing:"0.18em", textTransform:"uppercase", color:t.dim, lineHeight:2.2, transition:"color 0.5s" }}>
                  Art Basel 2026<br />
                  61st Venice Biennale<br />
                  FàBRICA33 · May–Nov 2026
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section style={{ padding:"0 2.8rem 20rem" }}>
          <p style={{ fontSize:"clamp(1.6rem, 3.5vw, 3rem)", fontWeight:400, lineHeight:1.3, color:t.text, marginBottom:"3rem", transition:"color 0.5s" }}>
            Introductions by referral<br />or direct invitation.
          </p>
          <a href="mailto:Dorian@goonpr.com" style={{
            fontSize:"0.85rem", letterSpacing:"0.2em", textTransform:"uppercase",
            color:t.muted, textDecoration:"none", transition:"color 0.4s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = t.text}
            onMouseLeave={e => e.currentTarget.style.color = t.muted}
          >
            Dorian@goonpr.com
          </a>
        </section>

        {/* ── Footer ── */}
        <footer style={{ padding:"2rem 2.8rem", display:"flex", justifyContent:"space-between" }}>
          <span style={{ fontSize:"0.55rem", letterSpacing:"0.25em", textTransform:"uppercase", color:t.rule, transition:"color 0.5s" }}>
            © 2026 Go On PR
          </span>
          <span style={{ fontSize:"0.55rem", letterSpacing:"0.2em", textTransform:"uppercase", color:t.rule, transition:"color 0.5s" }}>
            Paris
          </span>
        </footer>

      </main>
    </>
  );
}
