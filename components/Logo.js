"use client";

import { useId } from "react";

// Zynintell logo: dark tile with a geometric "Z" (white bars, orange diagonal)
// and an orange "intelligence node". Strokes draw in on load, a sheen sweeps
// the tile every few seconds, and the node glows on hover. The mark is the same
// everywhere; `light` only makes the wordmark white for dark backgrounds
// (footer). Styles live in app/styles/components/_logo.scss.
export default function Logo({ light = false }) {
  // Unique ids so the header and footer logos don't share gradients
  const uid = useId().replace(/:/g, "");
  const tile = `tile-${uid}`;
  const rim = `rim-${uid}`;
  const diag = `diag-${uid}`;
  const shine = `shine-${uid}`;
  const clip = `clip-${uid}`;

  return (
    <a href="#home" className={`logo ${light ? "logo--light" : ""}`} aria-label="Zynintell home">
      <svg className="logo-mark" width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        <defs>
          <linearGradient id={tile} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2d2a31" />
            <stop offset="1" stopColor="#121014" />
          </linearGradient>
          <linearGradient id={rim} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity=".28" />
            <stop offset=".5" stopColor="#ffffff" stopOpacity=".04" />
            <stop offset="1" stopColor="#ff4d00" stopOpacity=".55" />
          </linearGradient>
          <linearGradient id={diag} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffa36b" />
            <stop offset="1" stopColor="#ff4d00" />
          </linearGradient>
          <linearGradient id={shine} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset=".5" stopColor="#fff" stopOpacity=".22" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id={clip}>
            <rect width="40" height="40" rx="11" />
          </clipPath>
        </defs>

        <rect width="40" height="40" rx="11" fill={`url(#${tile})`} />
        <rect x=".5" y=".5" width="39" height="39" rx="10.5" fill="none" stroke={`url(#${rim})`} />

        {/* Z: top bar, diagonal, bottom bar (pathLength=1 for the draw-in) */}
        <g fill="none" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
          <path className="logo-stroke s1" d="M12 13H26" stroke="#fff" pathLength="1" />
          <path className="logo-stroke s2" d="M26.5 13.5L13.5 26.5" stroke={`url(#${diag})`} pathLength="1" />
          <path className="logo-stroke s3" d="M14 27H28" stroke="#fff" pathLength="1" />
        </g>

        <circle className="logo-node-glow" cx="30" cy="10" r="4.5" fill="#ff4d00" />
        <circle className="logo-node" cx="30" cy="10" r="2.3" fill="#ff7a3d" />

        <g clipPath={`url(#${clip})`}>
          <rect className="logo-shine" x="-24" y="-10" width="16" height="60" fill={`url(#${shine})`} transform="rotate(20 20 20)" />
        </g>
      </svg>

      <span className="logo-word">
        <span className="logo-zyn">zyn</span>
        <span className="logo-intell">intell</span>
        <span className="logo-dot">.</span>
      </span>
    </a>
  );
}
