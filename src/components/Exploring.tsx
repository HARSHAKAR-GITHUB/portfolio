import { exploringNow } from "@/data/portfolio";
import { FlaskConical } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

export function Exploring() {
  return (
    <section aria-label="Currently exploring" className="border-t border-line py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading
              index="07"
              eyebrow="NOW"
              title="On my radar."
              lede="What I'm actively poking at. Updated by hand — this is the alive part of the site."
            />
            <Reveal>
              <div className="rounded-2xl border border-line bg-card p-5">
                <p className="flex items-center gap-2 font-mono text-[12px] text-muted">
                  <FlaskConical size={15} className="text-accent" />
                  lab notes / experiments
                </p>
                <p className="mt-3 text-[14px] leading-7 text-muted">
                  Notes and experiments coming as I publish them. The structure is ready —
                  Markdown posts drop in with zero redesign.
                </p>
                <p className="mt-3 font-mono text-[12px] text-faint">
                  ideas queued: web testing workflow · lessons from tooling · LLM security 101
                </p>
              </div>
            </Reveal>
          </div>
          <ul className="content-start grid gap-3 sm:grid-cols-2">
            {exploringNow.map((e, i) => (
              <Reveal key={e} delay={i * 0.04} className="h-full">
                <li className="group flex h-full items-start gap-3 rounded-xl border border-line bg-card p-4 transition hover:border-accent">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft font-mono text-[11px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[14px] font-medium leading-6">{e}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
