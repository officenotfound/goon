"use client";

import { useState } from "react";

const SELECTED_WORK = [
  {
    client: "Niclas Castello",
    project: "La diabolica commedia",
    context: "Art Basel 2026 · Venice Biennale 2026",
  },
];

const PRESS_OUTLETS = [
  "Artforum",
  "The Art Newspaper",
  "Artnet",
  "Hyperallergic",
  "Decrypt",
  "crypto.news",
];

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", organization: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main style={{ background: "var(--black)", color: "var(--off-white)" }} className="min-h-screen">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-7"
        style={{ background: "linear-gradient(to bottom, rgba(12,12,12,0.95) 0%, transparent 100%)" }}>
        <span className="label" style={{ letterSpacing: "0.3em" }}>GO ON PR</span>
        <a href="#inquire" className="label" style={{ color: "var(--gold)", letterSpacing: "0.2em" }}>
          Inquire
        </a>
      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6"
        style={{ minHeight: "100vh", paddingTop: "10rem", paddingBottom: "8rem" }}>
        <p className="label mb-8" style={{ letterSpacing: "0.25em" }}>Paris · Est. 2026</p>
        <hr className="rule mb-10" />
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(3rem, 8vw, 7rem)",
          fontWeight: 300,
          lineHeight: 1.05,
          letterSpacing: "0.02em",
          color: "var(--off-white)",
          maxWidth: "820px",
        }}>
          Private communications<br />
          <em style={{ fontWeight: 400, color: "var(--gold-light)" }}>for those who shape culture.</em>
        </h1>
        <hr className="rule mt-10 mb-12" />
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
          fontWeight: 300,
          color: "var(--muted)",
          maxWidth: "540px",
          lineHeight: 1.8,
          letterSpacing: "0.02em",
        }}>
          Go On PR is a boutique communications agency at the intersection of contemporary art,
          institutional culture, and emerging markets. We represent artists, collectors, and
          cultural institutions whose work demands discretion and precision.
        </p>
        <a href="#inquire" style={{
          display: "inline-block",
          marginTop: "3.5rem",
          padding: "0.85rem 2.5rem",
          border: "1px solid var(--gold)",
          color: "var(--gold)",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "0.7rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          textDecoration: "none",
          transition: "background 0.3s, color 0.3s",
        }}
          onMouseEnter={e => {
            (e.target as HTMLElement).style.background = "var(--gold)";
            (e.target as HTMLElement).style.color = "var(--black)";
          }}
          onMouseLeave={e => {
            (e.target as HTMLElement).style.background = "transparent";
            (e.target as HTMLElement).style.color = "var(--gold)";
          }}>
          Request Introduction
        </a>
      </section>

      {/* DIVIDER */}
      <div className="px-10"><hr className="rule-full" /></div>

      {/* SELECTED WORK */}
      <section className="px-10 py-28 max-w-4xl mx-auto">
        <p className="label mb-12" style={{ letterSpacing: "0.25em" }}>Selected Work</p>
        {SELECTED_WORK.map((item, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-16 py-10"
            style={{ borderTop: "1px solid var(--rule)" }}>
            <div style={{ minWidth: "180px" }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.5rem",
                fontWeight: 400,
                color: "var(--off-white)",
                lineHeight: 1.2,
              }}>{item.client}</p>
            </div>
            <div>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.5rem",
                fontStyle: "italic",
                fontWeight: 300,
                color: "var(--gold-light)",
                marginBottom: "0.4rem",
              }}>{item.project}</p>
              <p className="label" style={{ color: "var(--muted)", letterSpacing: "0.15em" }}>{item.context}</p>
            </div>
          </div>
        ))}
        <div style={{ borderTop: "1px solid var(--rule)" }} />
      </section>

      {/* DIVIDER */}
      <div className="px-10"><hr className="rule-full" /></div>

      {/* APPROACH */}
      <section className="px-10 py-28 max-w-4xl mx-auto">
        <p className="label mb-12" style={{ letterSpacing: "0.25em" }}>Approach</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {[
            {
              label: "Press & Editorial",
              body: "Placements in leading art, culture, and market publications. Relationships built over years across legacy and emerging media.",
            },
            {
              label: "Private Communications",
              body: "Bespoke correspondence to collectors, curators, and institutional figures. Direct, personal, and properly addressed.",
            },
            {
              label: "Market Intelligence",
              body: "Active monitoring of the cultural landscape. We identify the right moment, the right interlocutor, and the right message.",
            },
          ].map((item, i) => (
            <div key={i}>
              <p className="label mb-5" style={{ letterSpacing: "0.2em" }}>{item.label}</p>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.15rem",
                fontWeight: 300,
                color: "var(--muted)",
                lineHeight: 1.9,
              }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div className="px-10"><hr className="rule-full" /></div>

      {/* PRESS */}
      <section className="px-10 py-20 max-w-4xl mx-auto">
        <p className="label mb-10 text-center" style={{ letterSpacing: "0.25em" }}>Media</p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {PRESS_OUTLETS.map((outlet, i) => (
            <span key={i} style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.05rem",
              fontWeight: 400,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}>{outlet}</span>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div className="px-10"><hr className="rule-full" /></div>

      {/* INQUIRE */}
      <section id="inquire" className="px-10 py-28 max-w-xl mx-auto text-center">
        <p className="label mb-4" style={{ letterSpacing: "0.25em" }}>Inquire</p>
        <hr className="rule mb-10" />
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "1.15rem",
          fontWeight: 300,
          color: "var(--muted)",
          lineHeight: 1.9,
          marginBottom: "2.5rem",
        }}>
          Go On PR accepts a limited number of mandates per year. Introductions are by referral or direct invitation. We will respond to all qualified inquiries.
        </p>

        {submitted ? (
          <div>
            <hr className="rule mb-8" />
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.3rem",
              fontWeight: 300,
              color: "var(--gold-light)",
              letterSpacing: "0.03em",
            }}>
              Your inquiry has been received.<br />
              <em>We will be in touch.</em>
            </p>
            <hr className="rule mt-8" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
            {[
              { key: "name", label: "Name", type: "text", placeholder: "Your full name" },
              { key: "organization", label: "Organization", type: "text", placeholder: "Gallery, institution, or studio" },
              { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="label block mb-2" style={{ letterSpacing: "0.2em" }}>{label}</label>
                <input
                  type={type}
                  required
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid var(--rule)",
                    color: "var(--off-white)",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.05rem",
                    fontWeight: 300,
                    padding: "0.6rem 0",
                    outline: "none",
                    letterSpacing: "0.02em",
                  }}
                />
              </div>
            ))}
            <div>
              <label className="label block mb-2" style={{ letterSpacing: "0.2em" }}>Message</label>
              <textarea
                required
                rows={4}
                placeholder="Briefly describe your project or inquiry"
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid var(--rule)",
                  color: "var(--off-white)",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.05rem",
                  fontWeight: 300,
                  padding: "0.6rem 0",
                  outline: "none",
                  resize: "none",
                  letterSpacing: "0.02em",
                }}
              />
            </div>
            <div className="text-center mt-4">
              <button type="submit" style={{
                display: "inline-block",
                padding: "0.85rem 2.5rem",
                border: "1px solid var(--gold)",
                color: "var(--gold)",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                background: "transparent",
                cursor: "pointer",
                transition: "background 0.3s, color 0.3s",
              }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.background = "var(--gold)";
                  (e.target as HTMLElement).style.color = "var(--black)";
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.background = "transparent";
                  (e.target as HTMLElement).style.color = "var(--gold)";
                }}>
                Submit Inquiry
              </button>
            </div>
          </form>
        )}
      </section>

      {/* FOOTER */}
      <footer className="px-10 py-12 text-center" style={{ borderTop: "1px solid var(--rule)" }}>
        <p className="label" style={{ letterSpacing: "0.35em", color: "var(--muted)" }}>
          GO ON PR
        </p>
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "0.85rem",
          color: "var(--muted)",
          marginTop: "0.75rem",
          letterSpacing: "0.05em",
        }}>
          Paris · <a href="mailto:Dorian.batycka@gmail.com" style={{ color: "var(--muted)", textDecoration: "none" }}>
            Dorian.batycka@gmail.com
          </a>
        </p>
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "0.75rem",
          color: "rgba(107, 101, 96, 0.4)",
          marginTop: "2rem",
          letterSpacing: "0.1em",
        }}>
          © 2026 Go On PR. All rights reserved.
        </p>
      </footer>

    </main>
  );
}
