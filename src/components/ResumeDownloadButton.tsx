"use client";

import { contact } from "@/data/portfolio";
import { Download, Check } from "lucide-react";
import { useState } from "react";

// Pegtop Star SVG Gem Shape from Uiverse.io by andrew-manzyk
function PegtopStarSvg({ id, className }: { id?: string; className?: string }) {
  return (
    <svg
      id={id}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <defs>
        <filter id={`shine-${id || "base"}`}>
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <mask id={`mask-${id || "base"}`}>
          <path
            d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z"
            fill="white"
          />
        </mask>
        <radialGradient
          id={`gradient-1-${id || "base"}`}
          cx="50"
          cy="66"
          fx="50"
          fy="66"
          r="30"
          gradientTransform="translate(0 35) scale(1 0.5)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="black" stopOpacity="0.3" />
          <stop offset="50%" stopColor="black" stopOpacity="0.1" />
          <stop offset="100%" stopColor="black" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id={`gradient-2-${id || "base"}`}
          cx="55"
          cy="20"
          fx="55"
          fy="20"
          r="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="white" stopOpacity="0.3" />
          <stop offset="50%" stopColor="white" stopOpacity="0.1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id={`gradient-3-${id || "base"}`}
          cx="85"
          cy="50"
          fx="85"
          fy="50"
          xlinkHref={`#gradient-2-${id || "base"}`}
        />
        <radialGradient
          id={`gradient-4-${id || "base"}`}
          cx="50"
          cy="58"
          fx="50"
          fy="58"
          r="60"
          gradientTransform="translate(0 47) scale(1 0.2)"
          xlinkHref={`#gradient-3-${id || "base"}`}
        />
        <linearGradient
          id={`gradient-5-${id || "base"}`}
          x1="50"
          y1="90"
          x2="50"
          y2="10"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="black" stopOpacity="0.2" />
          <stop offset="40%" stopColor="black" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g>
        <path
          d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z"
          fill="currentColor"
        />
        <path
          d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z"
          fill={`url(#gradient-1-${id || "base"})`}
        />
        <path
          d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z"
          fill="none"
          stroke="white"
          opacity="0.3"
          strokeWidth="3"
          filter={`url(#shine-${id || "base"})`}
          mask={`url(#mask-${id || "base"})`}
        />
        <path
          d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z"
          fill={`url(#gradient-2-${id || "base"})`}
        />
        <path
          d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z"
          fill={`url(#gradient-3-${id || "base"})`}
        />
        <path
          d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z"
          fill={`url(#gradient-4-${id || "base"})`}
        />
        <path
          d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z"
          fill={`url(#gradient-5-${id || "base"})`}
        />
      </g>
    </svg>
  );
}

export function ResumeDownloadButton({
  className = "",
  label = "Harsh_Akar_Resume.pdf",
}: {
  className?: string;
  label?: string;
}) {
  const [downloaded, setDownloaded] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const rawPath = contact.resumePath || "/Harsh_Akar_Resume.pdf";
  const resumeHref = rawPath.startsWith("/") ? `${basePath}${rawPath}` : rawPath;

  const handleClick = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2400);
  };

  return (
    <a
      href={resumeHref}
      download="Harsh_Akar_Resume.pdf"
      onClick={handleClick}
      className={`group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full border border-line bg-card/90 px-5 font-mono text-[13px] font-medium text-ink shadow-sm backdrop-blur transition-all duration-300 hover:border-accent hover:shadow-[0_8px_30px_-12px_var(--accent)] ${className}`}
      title="Download Harsh Akar's Official Resume"
    >
      {/* Animated Uiverse Gem Star Loader */}
      <div className="pegtop-loader relative h-8 w-8 shrink-0 overflow-visible">
        <PegtopStarSvg id="pegtopone" className="pegtop-svg pegtop-one" />
        <PegtopStarSvg id="pegtoptwo" className="pegtop-svg pegtop-two" />
        <PegtopStarSvg id="pegtopthree" className="pegtop-svg pegtop-three" />
      </div>

      {/* Button Text */}
      <span className="flex items-center gap-1.5 transition group-hover:text-accent">
        <span>{downloaded ? "Downloading..." : label}</span>
        {downloaded ? (
          <Check size={14} className="text-[#65a30d] dark:text-[#d7ff3e]" />
        ) : (
          <Download size={14} className="transition group-hover:translate-y-0.5" />
        )}
      </span>

      {/* Subtle Shimmer Ray */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
    </a>
  );
}
