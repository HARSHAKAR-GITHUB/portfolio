"use client";

import { contact, site } from "@/data/portfolio";
import { ArrowDown, ArrowUpRight, Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { ResumeDownloadButton } from "./ResumeDownloadButton";

function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  }
  return { copied, copy };
}

export function Hero() {
  const email = useCopy(contact.email);
  const [today, setToday] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    // client-only date: must run after mount (Next.js prerender rule)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(
      new Date().toLocaleDateString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    );
    setYear(String(new Date().getFullYear()));
  }, []);

  const hasGithub = contact.github.length > 0;
  const hasLinkedin = contact.linkedin.length > 0;
  const hasResume = contact.resumePath.length > 0;

  return (
    <section id="top" className="relative overflow-hidden pt-36 sm:pt-40">
      <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] text-muted">
                <span className="text-accent">●</span>
                CYBERSECURITY · BUILDING · EXPLORING
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-6 font-display text-[clamp(2.4rem,6vw,4.6rem)] font-semibold leading-[1.02] tracking-tight text-balance">
                I break things to
                <br />
                understand them.
                <br />
                <span className="text-muted">Then I build</span>{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">better ones.</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-1 z-0 h-[0.35em] bg-accent/20 dark:bg-accent/30"
                  />
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-[16px] leading-8 text-muted">
                I&apos;m <strong className="font-semibold text-ink">Harsh Akar</strong>, a Security
                Engineer & VAPT Analyst doing corporate penetration testing across Web, API, Android,
                Network, and SIEM monitoring — currently at SDET Tech, previously Codec Networks (L-2).
                Certified Ethical Hacker (CEH) & CompTIA CySA+.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#certs"
                  className="shimmer-button group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[14px] font-medium text-paper transition hover:bg-accent hover:text-white dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-[#0e100e] shadow-sm"
                >
                  View Certifications
                  <ArrowDown size={16} className="transition group-hover:translate-y-0.5" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-ink/20 px-6 text-[14px] font-medium transition hover:border-accent hover:text-accent"
                >
                  Get in Touch
                  <ArrowUpRight size={16} />
                </a>
                {hasResume ? (
                  <ResumeDownloadButton label="Harsh_Akar_Resume.pdf" />
                ) : null}
              </div>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[13px] text-muted">
                <span className="text-faint">$ whoami</span>
                <span className="text-ink">harsh — security engineer / ceh / vapt</span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-[14px]">
                {hasGithub ? (
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted hover:text-accent transition"
                  >
                    <GithubIcon size={16} /> GitHub <ArrowUpRight size={13} />
                  </a>
                ) : null}
                {hasLinkedin ? (
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted hover:text-accent transition"
                  >
                    <LinkedinIcon size={16} /> LinkedIn <ArrowUpRight size={13} />
                  </a>
                ) : null}
                {contact.email ? (
                  <button
                    onClick={email.copy}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 font-mono text-[12px] text-muted hover:border-accent hover:text-ink transition"
                    title="Copy email"
                  >
                    {email.copied ? <Check size={13} className="text-[#65a30d]" /> : <Copy size={13} />}
                    {email.copied ? "copied to clipboard!" : contact.email}
                  </button>
                ) : null}
              </div>
            </Reveal>
          </div>

          {/* side card — abstract system diagram, no fake photo */}
          <Reveal delay={0.15} className="hidden lg:block">
            <aside
              aria-label="System sketch"
              className="rounded-2xl border border-line bg-card p-5 shadow-[0_1px_0_var(--line)]"
            >
              <div className="flex items-center justify-between font-mono text-[11px] text-faint">
                <span>~/harsh/status</span>
                <span className="inline-flex items-center gap-1.5 text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#65a30d] dark:bg-[#d7ff3e]" />
                  {site.status.toLowerCase()}.
                </span>
              </div>
              <svg viewBox="0 0 320 220" className="mt-4 w-full" role="img" aria-label="Abstract connection diagram">
                <g stroke="currentColor" className="text-line" strokeWidth="1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <line key={`v${i}`} x1={20 + i * 46} y1={10} x2={20 + i * 46} y2={210} />
                  ))}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <line key={`h${i}`} x1={10} y1={20 + i * 44} x2={310} y2={20 + i * 44} />
                  ))}
                </g>
                <g className="text-accent" stroke="currentColor" strokeWidth="1.5" fill="none">
                  <path d="M40 170 C 90 170, 80 110, 130 110 S 180 140, 220 90 S 270 60, 285 60" strokeDasharray="5 5" />
                </g>
                <g fontFamily="monospace" fontSize="9" fill="currentColor" className="text-muted">
                  <rect x="24" y="150" width="72" height="28" rx="6" fill="var(--code-bg)" stroke="var(--line)" />
                  <text x="34" y="168">client</text>
                  <rect x="124" y="94" width="72" height="28" rx="6" fill="var(--code-bg)" stroke="var(--line)" />
                  <text x="140" y="112">api</text>
                  <rect x="214" y="70" width="82" height="28" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" />
                  <text x="228" y="88">auth?</text>
                </g>
                <g fill="var(--accent)">
                  <circle cx="40" cy="170" r="4" />
                  <circle cx="130" cy="110" r="4" />
                  <circle cx="220" cy="90" r="4" />
                  <circle cx="285" cy="60" r="4" />
                </g>
              </svg>
              <div className="mt-4 space-y-2 border-t border-line pt-4 font-mono text-[12px] leading-6">
                <p className="text-faint">
                  <span className="text-accent">$</span> curiosity --trace trust
                </p>
                <p className="text-muted">client → api → auth? <span className="text-faint"># where it breaks</span></p>
                <p className="flex items-center justify-between text-faint">
                  <span>{today || "—"}</span>
                  <span>{site.localTimeNote}</span>
                </p>
              </div>
            </aside>
          </Reveal>
        </div>

        <div className="mt-14 flex items-center gap-4 border-t border-line py-5 font-mono text-[11px] tracking-wider text-faint">
          <span>SCROLL</span>
          <span aria-hidden className="h-px flex-1 bg-line" />
          <span>PORTFOLIO — {year || "2026"}</span>
        </div>
      </div>
    </section>
  );
}
