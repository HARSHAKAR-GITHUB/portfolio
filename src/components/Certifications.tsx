"use client";

import { achievements, certifications } from "@/data/portfolio";
import { BadgeCheck, Trophy, ShieldCheck, Flame, Award } from "lucide-react";
import { useState } from "react";
import { Reveal, SectionHeading } from "./Reveal";

export function Certifications() {
  const [filter, setFilter] = useState<"all" | "certs" | "ctf">("all");

  const showCerts = filter === "all" || filter === "certs";
  const showCtf = filter === "all" || filter === "ctf";

  return (
    <section id="certs" className="scroll-mt-28 border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="CREDENTIALS & STANDINGS"
          title="Industry certifications & verified skills."
          lede="Offensive security, vulnerability analysis, and penetration testing competencies validated through EC-Council, CompTIA, QuickHeal, and global CTF rankings."
        />

        {/* Uiverse-Style Interactive Metric Banner */}
        <Reveal>
          <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-line bg-card p-4 transition-all duration-200 hover:border-accent">
              <span className="font-mono text-[11px] uppercase tracking-wider text-faint">Certifications</span>
              <p className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">6</p>
              <span className="mt-0.5 block font-mono text-[11.5px] text-accent">CEH & CompTIA Stack</span>
            </div>

            <div className="rounded-xl border border-line bg-card p-4 transition-all duration-200 hover:border-accent">
              <span className="font-mono text-[11px] uppercase tracking-wider text-faint">TryHackMe</span>
              <p className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">Top 2%</p>
              <span className="mt-0.5 block font-mono text-[11.5px] text-[#22c55e]">Global Ranking</span>
            </div>

            <div className="rounded-xl border border-line bg-card p-4 transition-all duration-200 hover:border-accent">
              <span className="font-mono text-[11px] uppercase tracking-wider text-faint">HackTheBox</span>
              <p className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">814th</p>
              <span className="mt-0.5 block font-mono text-[11.5px] text-[#06b6d4]">Global Standing</span>
            </div>

            <div className="rounded-xl border border-line bg-card p-4 transition-all duration-200 hover:border-accent">
              <span className="font-mono text-[11px] uppercase tracking-wider text-faint">CTF Standings</span>
              <p className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">5+</p>
              <span className="mt-0.5 block font-mono text-[11.5px] text-[#a855f7]">QuickHeal 6th (Solo)</span>
            </div>
          </div>
        </Reveal>

        {/* Uiverse-Style Filter Tabs */}
        <Reveal>
          <div className="mb-8 flex items-center justify-between border-b border-line pb-4">
            <div className="inline-flex items-center rounded-xl border border-line bg-card p-1">
              <button
                onClick={() => setFilter("all")}
                className={`rounded-lg px-3.5 py-1.5 font-mono text-[12px] font-medium transition ${
                  filter === "all"
                    ? "bg-ink text-paper dark:bg-paper dark:text-ink shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                ALL CREDENTIALS ({certifications.length + achievements.length})
              </button>
              <button
                onClick={() => setFilter("certs")}
                className={`rounded-lg px-3.5 py-1.5 font-mono text-[12px] font-medium transition ${
                  filter === "certs"
                    ? "bg-ink text-paper dark:bg-paper dark:text-ink shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                CERTIFICATIONS ({certifications.length})
              </button>
              <button
                onClick={() => setFilter("ctf")}
                className={`rounded-lg px-3.5 py-1.5 font-mono text-[12px] font-medium transition ${
                  filter === "ctf"
                    ? "bg-ink text-paper dark:bg-paper dark:text-ink shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                CTF & LABS ({achievements.length})
              </button>
            </div>

            <span className="hidden font-mono text-[11.5px] text-faint sm:inline-flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#65a30d] dark:text-[#d7ff3e]" />
              Verified via official certification authorities
            </span>
          </div>
        </Reveal>

        {/* Certifications Grid */}
        {showCerts && (
          <div className="mb-10">
            {filter === "all" && (
              <p className="mb-4 font-mono text-[11px] tracking-wider text-accent uppercase">
                # Verified Industry Certifications
              </p>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.04} className="h-full">
                  <div className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-card p-5 sm:p-6 transition-all duration-300 hover:border-accent hover:shadow-[0_12px_36px_-18px_var(--accent)]">
                    <div>
                      {/* Top Bar: Issuer & Credential Code */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-accent">
                            <BadgeCheck size={18} />
                          </span>
                          <span className="font-mono text-[11px] font-semibold tracking-wider text-faint">
                            {c.issuer.toUpperCase()}
                          </span>
                        </div>
                        <span className="rounded-md border border-line bg-paper px-2 py-0.5 font-mono text-[10.5px] text-muted">
                          {c.code}
                        </span>
                      </div>

                      {/* Certification Title */}
                      <h3 className="mt-4 font-display text-[16.5px] font-semibold leading-snug text-ink transition group-hover:text-accent">
                        {c.title}
                      </h3>

                      {/* Badge / Domain Focus */}
                      <div className="mt-2.5">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-line/70 bg-paper/60 px-2.5 py-0.5 font-mono text-[10.5px] text-muted">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          {c.badge}
                        </span>
                      </div>

                      {/* Skills List */}
                      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line/60 pt-3.5">
                        {c.skills.map((s) => (
                          <span
                            key={s}
                            className="rounded border border-line/60 bg-paper/40 px-2 py-0.5 font-mono text-[10.5px] text-muted transition hover:border-accent hover:text-ink"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Verified Status Footer */}
                    <div className="mt-5 flex items-center justify-between border-t border-line/60 pt-3 font-mono text-[11px] text-faint">
                      <span className="flex items-center gap-1.5 text-muted">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#65a30d] dark:bg-[#d7ff3e]" />
                        Verified Status
                      </span>
                      <span className="text-accent group-hover:underline">Credentialed</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* CTFs & Labs Showcase */}
        {showCtf && (
          <div>
            {filter === "all" && (
              <p className="mb-4 font-mono text-[11px] tracking-wider text-accent uppercase">
                # CTF Competitions & Offensive Labs Leaderboard
              </p>
            )}

            <div className="grid gap-4 lg:grid-cols-2">
              {/* Highlight Podium Card */}
              <Reveal delay={0.1} className="h-full">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-line bg-card p-6 transition-all duration-300 hover:border-accent">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-accent">
                        <Trophy size={16} />
                        <span>GLOBAL LAB RANKINGS</span>
                      </div>
                      <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[10.5px] font-semibold text-accent">
                        Verified Profiles
                      </span>
                    </div>

                    <h4 className="mt-3 font-display text-xl font-semibold">
                      Offensive Security Practice Platforms
                    </h4>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-muted">
                      Continuous hands-on exploitation, privilege escalation, and binary reversing across global competitive platforms.
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-line bg-paper/70 p-4 transition hover:border-[#22c55e]">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] font-bold text-[#22c55e]">TryHackMe</span>
                          <Award size={16} className="text-[#22c55e]" />
                        </div>
                        <p className="mt-2 font-display text-2xl font-bold text-ink">Top 2%</p>
                        <p className="mt-1 font-mono text-[11px] text-faint">Global Platform Ranking</p>
                      </div>

                      <div className="rounded-xl border border-line bg-paper/70 p-4 transition hover:border-[#06b6d4]">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] font-bold text-[#06b6d4]">HackTheBox</span>
                          <Flame size={16} className="text-[#06b6d4]" />
                        </div>
                        <p className="mt-2 font-display text-2xl font-bold text-ink">814th</p>
                        <p className="mt-1 font-mono text-[11px] text-faint">Global Rank Leaderboard</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-line pt-3 font-mono text-[11.5px] text-faint">
                    Real-world vulnerable machine rootings, active privilege escalations, and active threat modeling.
                  </div>
                </div>
              </Reveal>

              {/* CTF Events List Card */}
              <Reveal delay={0.15} className="h-full">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-line bg-card p-6 transition-all duration-300 hover:border-accent">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-accent">
                        <Flame size={16} />
                        <span>COMPETITIVE CTFs</span>
                      </div>
                      <span className="rounded-full bg-paper px-2.5 py-0.5 font-mono text-[10.5px] text-muted border border-line">
                        Official Rankings
                      </span>
                    </div>

                    <h4 className="mt-3 font-display text-xl font-semibold">
                      Capture The Flag Finishes
                    </h4>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-muted">
                      Competitive tournaments tackling web exploitation, cryptography, reverse engineering, and forensic challenges.
                    </p>

                    <div className="mt-4 space-y-2">
                      {achievements
                        .filter((a) => a.k === "CTF")
                        .map((a) => (
                          <div
                            key={a.t}
                            className={`flex items-center justify-between rounded-lg border p-2.5 text-[12.5px] transition ${
                              a.highlight
                                ? "border-accent/40 bg-accent-soft/30"
                                : "border-line bg-paper/50"
                            }`}
                          >
                            <span className="flex items-center gap-2 font-medium text-ink">
                              {a.highlight ? (
                                <Trophy size={14} className="text-accent shrink-0" />
                              ) : (
                                <span className="h-1.5 w-1.5 rounded-full bg-faint shrink-0" />
                              )}
                              <span>{a.t}</span>
                            </span>
                            <span className="font-mono text-[10.5px] text-accent">
                              {a.highlight ? "Podium" : "Ranked"}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-line pt-3 font-mono text-[11.5px] text-faint">
                    <span>QuickHeal LPU 6th Place achieved Solo</span>
                    <span className="text-accent">Offensive CTF Competitor</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
