"use client";
import { site } from "@/data/portfolio";
import { useEffect, useState } from "react";

export function Footer() {
  const [year, setYear] = useState("");
  useEffect(() => {
    // client-only date: deferred to avoid Next.js prerender blocking value
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(String(new Date().getFullYear()));
  }, []);
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-mono text-[12px] text-faint">
          <span className="text-ink">© {year || "2026"} {site.name}</span> — {site.tagline}
        </p>
        <p className="font-mono text-[12px] text-faint">
          built by hand · next.js + tailwind · <a href="#top" className="underline decoration-dotted underline-offset-4 hover:text-accent">back to top ↑</a>
        </p>
      </div>
    </footer>
  );
}
