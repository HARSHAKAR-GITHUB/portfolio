"use client";

import { toolkit } from "@/data/portfolio";
import { useState } from "react";
import { Reveal, SectionHeading } from "./Reveal";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

export function Toolkit() {
  // Allow multiple open accordions, default first two open
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]);

  function toggleIndex(idx: number) {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  }

  const allOpen = openIndices.length === toolkit.length;

  return (
    <section id="toolkit" className="scroll-mt-28 border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeading
            index="04"
            eyebrow="TOOLKIT & SKILLS"
            title="Technical competencies & security tooling."
            lede="Grouped by assessment domain — from web/API pentesting and mobile instrumentation (Frida, MobSF) to Wazuh SIEM detection engineering."
          />

          <button
            onClick={() => setOpenIndices(allOpen ? [] : toolkit.map((_, i) => i))}
            className="mb-8 inline-flex items-center gap-1.5 self-start sm:self-auto rounded-lg border border-line bg-card px-3.5 py-1.5 font-mono text-[11.5px] text-muted hover:border-accent hover:text-accent transition"
          >
            <SlidersHorizontal size={13} />
            <span>{allOpen ? "Collapse All" : "Expand All Categories"}</span>
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {toolkit.map((cat, i) => {
            const isOpen = openIndices.includes(i);
            return (
              <Reveal key={cat.category} delay={i * 0.03} className="h-full">
                <div
                  className={`rounded-2xl border bg-card transition-all duration-200 ${
                    isOpen ? "border-accent/70 shadow-sm" : "border-line hover:border-line/80"
                  }`}
                >
                  <button
                    onClick={() => toggleIndex(i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <div>
                      <span className="font-mono text-[11px] tracking-widest text-faint">
                        {String(i + 1).padStart(2, "0")} — {cat.note.toUpperCase()}
                      </span>
                      <span className="mt-1 block font-display text-lg font-semibold text-ink">
                        {cat.category}
                      </span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-muted transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-accent" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <ul className="flex flex-wrap gap-2 border-t border-line p-5">
                      {cat.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-line bg-paper px-3 py-1.5 font-mono text-[12px] text-muted transition hover:border-accent hover:text-ink hover:bg-paper/80"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <p className="mt-6 max-w-2xl font-mono text-[12px] leading-6 text-faint">
            <span className="text-accent">*</span> All security tooling, detection rules, and offensive testing frameworks reflect verified hands-on corporate and lab experience.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
