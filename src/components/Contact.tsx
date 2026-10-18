"use client";

import { contact } from "@/data/portfolio";
import { Check, Copy, Mail, Send, ShieldCheck, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { Reveal, SectionHeading } from "./Reveal";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const emailAddress = contact.email || "harshakar.official@gmail.com";

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard fallback */
    }
  }

  return (
    <section id="contact" className="scroll-mt-28 border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="08"
          eyebrow="CONTACT"
          title="Get in touch directly."
          lede="Have an assessment inquiry, corporate penetration testing project, or technical question? Email is my primary and direct channel."
        />

        <Reveal>
          <div className="grid gap-8 rounded-2xl border border-line bg-card p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:items-stretch">
            {/* Left Column: Direct Email Action */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 font-mono text-[11px] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#65a30d] dark:bg-[#d7ff3e]" />
                  <span>DIRECT CHANNEL</span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  Let&apos;s discuss your security needs<span className="text-accent">.</span>
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
                  For corporate VAPT assessments, mobile or API testing engagements, or security
                  consultations, please reach out directly via email. Every inquiry receives a
                  prompt, direct response.
                </p>

                {/* Main Email Action Box */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${emailAddress}`}
                    className="shimmer-button inline-flex h-12 items-center gap-2.5 rounded-full bg-ink px-6 text-[14px] font-medium text-paper transition hover:bg-accent hover:text-white dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-[#0e100e] shadow-sm"
                  >
                    <Mail size={16} />
                    <span>{emailAddress}</span>
                  </a>

                  <button
                    onClick={copyEmail}
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-paper px-5 text-[14px] font-medium text-ink transition hover:border-accent hover:text-accent"
                    title="Copy email to clipboard"
                  >
                    {copied ? <Check size={16} className="text-[#65a30d] dark:text-[#d7ff3e]" /> : <Copy size={16} />}
                    <span>{copied ? "Copied!" : "Copy Address"}</span>
                  </button>
                </div>
              </div>

              {/* Status & SLA Indicators */}
              <div className="mt-8 border-t border-line/70 pt-5 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2.5 font-mono text-[12px] text-muted">
                  <Clock size={14} className="text-accent shrink-0" />
                  <span>Response time: &lt; 24h</span>
                </div>
                <div className="flex items-center gap-2.5 font-mono text-[12px] text-muted">
                  <ShieldCheck size={14} className="text-accent shrink-0" />
                  <span>Encrypted mail on request</span>
                </div>
                <div className="flex items-center gap-2.5 font-mono text-[12px] text-muted">
                  <MapPin size={14} className="text-accent shrink-0" />
                  <span>Noida, India (IST / UTC+5:30)</span>
                </div>
                <div className="flex items-center gap-2.5 font-mono text-[12px] text-muted">
                  <Send size={14} className="text-accent shrink-0" />
                  <span>Corporate VAPT & Pentesting</span>
                </div>
              </div>
            </div>

            {/* Right Column: Sleek Terminal Card */}
            <div className="flex flex-col justify-between rounded-xl border border-line bg-code p-5 sm:p-6 font-mono text-[12.5px] leading-relaxed text-muted">
              <div>
                <div className="flex items-center justify-between border-b border-line/70 pb-3 text-faint text-[11px]">
                  <span>~/contact/session</span>
                  <span className="flex items-center gap-1.5 text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    verified
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-[12px]">
                  <p className="text-faint">
                    <span className="text-accent">$</span> contact --channel direct
                  </p>
                  <p className="text-ink">
                    <span className="text-faint">Target :</span> {emailAddress}
                  </p>
                  <p>
                    <span className="text-faint">Role   :</span> VAPT Analyst · Security Engineer
                  </p>
                  <p>
                    <span className="text-faint">Focus  :</span> Web, API, Android & Network
                  </p>
                  <p>
                    <span className="text-faint">Cert   :</span> CEH, CySA+, Sec+, Net+, Linux+, QuickHeal
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-line/70 pt-4">
                <p className="text-[11.5px] text-faint">
                  # click email button to open client, or copy address
                </p>
                <p className="mt-1 text-[12px] text-ink">
                  mailto:<span className="text-accent">{emailAddress}</span>
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
