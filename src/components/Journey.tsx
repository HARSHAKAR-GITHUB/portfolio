import { journey } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

export function Journey() {
  return (
    <section id="journey" className="scroll-mt-28 border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="06"
          eyebrow="JOURNEY"
          title="Corporate VAPT, research to engineering."
          lede="From Bugcrowd research to full-time security engineering — all entries from resume."
        />
        <ol className="relative ml-2 space-y-0 border-l border-line pl-0 sm:ml-4">
          {journey.map((j, i) => (
            <Reveal key={`${j.title}-${i}`} delay={i * 0.04}>
              <li className="relative pb-10 pl-8 last:pb-0">
                <span
                  aria-hidden
                  className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-paper bg-accent shadow-[0_0_0_1px_var(--accent)]"
                />
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-mono text-[12px] text-faint">{j.period}</span>
                  <h3 className="font-display text-lg font-semibold">{j.title}</h3>
                </div>
                <p className="mt-0.5 font-mono text-[12px] text-accent">{j.org}</p>
                <p className="mt-2 max-w-2xl text-[14px] leading-7 text-muted">{j.detail}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {j.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <p className="mt-8 rounded-xl border border-line bg-card p-4 font-mono text-[12px] leading-6 text-faint">
            → full details in resume.pdf — roles, dates and contributions match the source file.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
