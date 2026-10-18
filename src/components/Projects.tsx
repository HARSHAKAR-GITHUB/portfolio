import { projects, securityTools } from "@/data/portfolio";
import { ArrowUpRight, FolderGit2, Smartphone, MessageSquare, Terminal } from "lucide-react";
import { GithubIcon } from "./icons";
import { Reveal, SectionHeading } from "./Reveal";

export function Projects() {
  return (
    <section id="work" className="scroll-mt-28 border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="ENGINEERING & APPLICATIONS"
          title="Featured software & security builds."
          lede="Native mobile applications, real-time communication architectures, and open-source security utilities developed with clean code and defense-in-depth principles."
        />

        {/* Featured Flagship Applications */}
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => {
            const isChat = p.id.includes("chat");
            return (
              <Reveal key={p.id} delay={i * 0.08} className="h-full">
                <article className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-card p-6 sm:p-8 transition-all duration-300 hover:border-accent hover:shadow-[0_16px_40px_-20px_var(--accent)]">
                  <div>
                    {/* Header bar */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 font-mono text-[11px] tracking-wider text-muted">
                        {isChat ? (
                          <MessageSquare size={13} className="text-accent" />
                        ) : (
                          <Smartphone size={13} className="text-accent" />
                        )}
                        <span>{p.type.toUpperCase()}</span>
                      </div>
                      <span className="font-mono text-[12px] text-faint">{p.year}</span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight transition group-hover:text-accent">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">
                      {p.description}
                    </p>

                    {/* Key Highlights */}
                    {p.highlights && (
                      <ul className="mt-4 space-y-2 border-t border-line/60 pt-4 text-[13px] text-muted">
                        {p.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2.5">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            <span className="leading-snug">{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Card Bottom / Stack & CTA */}
                  <div className="mt-6 border-t border-line pt-5">
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-line bg-paper px-2 py-0.5 font-mono text-[11px] text-muted"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between pt-1">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-muted">
                        <span className="h-2 w-2 rounded-full bg-[#7F52FF]" />
                        {p.language || "Kotlin"}
                      </span>

                      <a
                        href={p.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="shimmer-button inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 font-mono text-[12px] font-medium text-ink transition hover:border-accent hover:bg-accent hover:text-white"
                      >
                        <GithubIcon size={14} />
                        <span>Source Code</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Security Tooling & Open Source Section */}
        <Reveal delay={0.2} className="mt-8">
          <div className="rounded-2xl border border-line bg-card p-6 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-accent">
                  <Terminal size={14} />
                  SECURITY TOOLING & OPEN SOURCE
                </p>
                <h4 className="mt-1 font-display text-xl font-semibold">
                  Automation scripts & vulnerability testing tools
                </h4>
              </div>
              <a
                href="https://github.com/Harshakar-official"
                target="_blank"
                rel="noreferrer"
                className="shimmer-button inline-flex items-center gap-2 self-start rounded-full bg-ink px-5 py-2.5 font-mono text-[12px] font-medium text-paper transition hover:bg-accent hover:text-white dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-[#0e100e] sm:self-center shadow-sm"
              >
                <GithubIcon size={15} />
                <span>github.com/Harshakar-official</span>
                <ArrowUpRight size={13} />
              </a>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {securityTools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col justify-between rounded-xl border border-line bg-paper/60 p-4 transition-all duration-200 hover:border-accent hover:bg-paper"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-medium text-accent">
                        {tool.language}
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="text-faint transition group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                    <p className="mt-2 font-display text-[15px] font-semibold text-ink group-hover:text-accent">
                      {tool.name}
                    </p>
                    <p className="mt-1 text-[12.5px] leading-5 text-muted">
                      {tool.description}
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {tool.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-line/70 px-1.5 py-0.5 font-mono text-[10px] text-faint"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-4 font-mono text-[12px] text-faint">
              <span className="flex items-center gap-2">
                <FolderGit2 size={14} className="text-accent" />
                Repositories actively maintained with MIT open-source licensing.
              </span>
              <a
                href="https://github.com/Harshakar-official?tab=repositories"
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-accent"
              >
                View all repositories →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
