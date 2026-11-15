// Decorative background for the "What We Do" section: half-circle accents
// plus faint, slowly drifting technology icons. Purely visual (aria-hidden).

const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };

const ICONS = {
  code: <><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></>,
  chip: <><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" rx="1" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></>,
  cloud: <><path d="M7 18a5 5 0 0 1-.6-9.96A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z" /></>,
  database: <><ellipse cx="12" cy="5.5" rx="7" ry="2.5" /><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" /></>,
  terminal: <><rect x="2.5" y="4" width="19" height="16" rx="3" /><path d="M7 10l3 2.5L7 15M12.5 15H17" /></>,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>,
  signal: <><path d="M5 12.5a10 10 0 0 1 14 0M8 15.5a5.5 5.5 0 0 1 8 0" /><circle cx="12" cy="19" r="1.2" /></>,
  ai: <><rect x="4" y="4" width="16" height="16" rx="4" /><path d="M8.5 15.5l2-7 2 7M9.2 13.2h2.6M15.5 8.5v7" /></>,
  layers: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>,
  cursor: <><path d="M5 3l14 7-6 2-2 6z" /></>,
};

// [icon, top%, left%, size(px), rotation(deg), animation delay(s)]
const PLACEMENT = [
  ["code", 8, 6, 46, -8, 0],
  ["chip", 18, 88, 54, 10, 1.2],
  ["cloud", 40, 3, 50, 0, 2.4],
  ["database", 62, 92, 44, -6, .6],
  ["terminal", 84, 10, 48, 6, 1.8],
  ["gear", 30, 48, 38, 0, 3],
  ["signal", 74, 52, 40, 0, 2],
  ["ai", 6, 62, 42, 8, 1.5],
  ["layers", 52, 30, 36, -10, .9],
  ["cursor", 90, 78, 34, 14, 2.7],
];

// Half-disc: a circle cut along its diameter, tilted on the diagonal
function HalfCircle({ className, color }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M0 50a50 50 0 0 0 100 0z" fill={color} transform="rotate(-45 50 50)" />
    </svg>
  );
}

export default function TechBackdrop() {
  return (
    <div className="tech-backdrop" aria-hidden="true">
      <span className="tech-glow tg-1" />
      <span className="tech-glow tg-2" />
      <span className="tech-grid" />

      <HalfCircle className="half-circle hc-1" color="#F4CE86" />
      <HalfCircle className="half-circle hc-2" color="#ff4d00" />
      <HalfCircle className="half-circle hc-3" color="#F4CE86" />

      {PLACEMENT.map(([name, top, left, size, rot, delay]) => (
        <svg
          key={name}
          className="tech-icon"
          viewBox="0 0 24 24"
          width={size}
          height={size}
          style={{ top: `${top}%`, left: `${left}%`, "--rot": `${rot}deg`, animationDelay: `${delay}s` }}
          {...s}
        >
          {ICONS[name]}
        </svg>
      ))}
    </div>
  );
}
