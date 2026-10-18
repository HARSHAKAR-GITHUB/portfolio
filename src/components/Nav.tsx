"use client";

import { nav } from "@/data/portfolio";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["top", "about", "certs", "work", "toolkit", "lab", "journey", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const label = nav.find((n) => n.href === `#${e.target.id}`)?.label;
            if (label) setActive(label);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition ${
        scrolled
          ? "border-line bg-paper/90 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-ink font-mono text-[13px] font-bold text-paper transition group-hover:bg-accent group-hover:text-white">
            ha
          </span>
          <span className="hidden font-mono text-xs tracking-widest text-muted sm:block">
            HARSH.AKAR <span className="text-faint">~/portfolio</span>
          </span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className={`rounded-full px-3 py-2 text-[13px] transition ${
                active === n.label
                  ? "bg-ink text-paper dark:bg-paper dark:text-ink"
                  : "text-muted hover:bg-code hover:text-ink"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <span className="mr-1 hidden items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 font-mono text-[11px] text-muted lg:inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-[#84cc16] opacity-60" />
              <span className="h-2 w-2 rounded-full bg-[#65a30d] dark:bg-[#d7ff3e]" />
            </span>
            open to talk
          </span>
          <ThemeToggle />
        </div>
      </div>
      {/* mobile nav */}
      <nav
        aria-label="Mobile"
        className="flex gap-1 overflow-x-auto border-t border-line bg-paper/95 px-4 py-2 backdrop-blur md:hidden"
      >
        {nav.map((n) => (
          <a
            key={n.label}
            href={n.href}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] ${
              active === n.label ? "bg-ink text-paper dark:bg-paper dark:text-ink" : "text-muted"
            }`}
          >
            {n.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
