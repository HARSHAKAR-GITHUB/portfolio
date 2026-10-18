import { Reveal, SectionHeading } from "./Reveal";

const interests = [
  { k: "01", t: "Web, API & Network VAPT", d: "Corporate pentests & manual exploit validation." },
  { k: "02", t: "Android & Mobile Security", d: "OWASP MASVS, Frida runtime instrumentation." },
  { k: "03", t: "SIEM & Detection Ops", d: "Wazuh monitoring, log triage, custom rules." },
  { k: "04", t: "Malware & RE Analysis", d: "Real infected systems — QuickHeal certified." },
  { k: "05", t: "CTFs & Offensive Labs", d: "Top 2% THM global, 814th HTB global." },
  { k: "06", t: "AI & LLM App Security", d: "Prompt injection & red-teaming research." },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="ABOUT"
          title="Offensive security & VAPT analyst."
          lede="Corporate application security and offensive pentesting foundation built on rigorous manual validation, CTFs, and security research."
        />
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="space-y-5 text-[15.5px] leading-8 text-muted">
              <p>
                I&apos;m a <strong className="text-ink">Security Engineer & VAPT Analyst</strong> with corporate
                experience across Web, API, Android, Network pentesting, and SIEM monitoring — currently
                Security Engineer at SDET Tech, previously Information Security Engineer (L-2)
                at Codec Networks. Certified Ethical Hacker (CEH) and CompTIA certified.
              </p>
              <p>
                My base comes from years of CTFs, hands-on labs and security research, plus malware
                analysis on real systems. I work with Linux, Burp Suite, Nmap, Metasploit and
                methodical manual validation — then write it up clearly for stakeholders.
              </p>
              <p className="rounded-xl border border-line bg-card p-4 font-mono text-[13px] leading-6">
                <span className="text-faint">{"// how I work"}</span>
                <br />
                <span className="text-ink">test → validate → risk-rate → report → retest</span>
              </p>
            </div>
          </Reveal>
          <div className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {interests.map((c, i) => (
              <Reveal key={c.k} delay={i * 0.04} className="h-full">
                <div className="group flex h-full flex-col justify-between rounded-xl border border-line bg-card p-4 transition hover:border-accent hover:shadow-[0_8px_30px_-18px_var(--accent)]">
                  <div>
                    <p className="font-mono text-[11px] text-faint group-hover:text-accent">{c.k}</p>
                    <p className="mt-1.5 text-[14px] font-semibold leading-6">{c.t}</p>
                  </div>
                  <p className="mt-1 text-[13px] leading-6 text-muted">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
