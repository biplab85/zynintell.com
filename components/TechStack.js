// "Our Tech Stack": two endlessly scrolling rows of round tech badges
// (top row drifts left, bottom row right), plus an AI card. Hovering a row
// pauses it; hovering a badge lifts it and shows a tooltip. Icons are simple
// line glyphs drawn for this site, not official brand logos.
// Styles: app/styles/sections/_tech.scss

const G = {
  react: <><circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" /><ellipse cx="12" cy="12" rx="9.2" ry="3.6" /><ellipse cx="12" cy="12" rx="9.2" ry="3.6" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="9.2" ry="3.6" transform="rotate(120 12 12)" /></>,
  next: <><circle cx="12" cy="12" r="9.2" /><path d="M9 16V8l7.5 9.5M15 8v4.5" /></>,
  vue: <><path d="M2.5 4.5L12 20.5l9.5-16" /><path d="M7 4.5l5 8.5 5-8.5" /></>,
  alpine: <><path d="M2.5 18.5L8 9l4 6.5 2.8-4 6.7 7z" /></>,
  laravel: <><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M4 7.5l8 4.5 8-4.5M12 12v9" /></>,
  codeigniter: <><path d="M12 21c-3.9 0-6.5-2.6-6.5-6 0-3 2-4.8 3.4-6.5.3 1.9 1.4 2.9 2.4 3.1C11.1 8.6 12.3 5.8 14.6 3c.4 3.6 3.9 5.6 3.9 10.4 0 4.3-2.9 7.6-6.5 7.6z" /></>,
  node: <><path d="M12 2.8l8 4.6v9.2l-8 4.6-8-4.6V7.4z" /><path d="M10 15v-5l4 5v-5" /></>,
  tailwind: <><path d="M3.5 10c1.6-3 3.6-4 6-3 2 .9 2.6 3 5 3 2 0 3.4-1 5-3" /><path d="M3.5 17c1.6-3 3.6-4 6-3 2 .9 2.6 3 5 3 2 0 3.4-1 5-3" /></>,
  typescript: <><rect x="3.4" y="3.4" width="17.2" height="17.2" rx="3.2" /><path d="M7.5 11h6M10.5 11v6.5M18 11.2c-.5-.5-1.1-.7-1.8-.7-1 0-1.7.6-1.7 1.4 0 1.9 3.6 1.2 3.6 3.3 0 .9-.8 1.5-1.9 1.5-.8 0-1.5-.3-2-.8" /></>,
  native: <><rect x="6.5" y="2.5" width="11" height="19" rx="2.8" /><ellipse cx="12" cy="11.5" rx="3.6" ry="1.5" /><ellipse cx="12" cy="11.5" rx="3.6" ry="1.5" transform="rotate(60 12 11.5)" /><ellipse cx="12" cy="11.5" rx="3.6" ry="1.5" transform="rotate(120 12 11.5)" /><path d="M10.5 18.5h3" /></>,
  flutter: <><path d="M14.5 2.5L4.5 12.5l3 3 13-13z" /><path d="M14.5 11.5l-6 6 3 3h6l-4.5-4.5 6-4.5z" /></>,
  postgres: <><ellipse cx="12" cy="5.5" rx="7" ry="2.6" /><path d="M5 5.5v13c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-13M5 12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6" /></>,
  mysql: <><rect x="3.5" y="4" width="17" height="16" rx="3" /><path d="M3.5 9.5h17M3.5 14.5h17M9.5 9.5V20" /></>,
  wordpress: <><circle cx="12" cy="12" r="9.2" /><path d="M6.8 9l2.6 7.5L12 10l2.6 6.5L17.2 9" /></>,
  sparkle: <><path d="M12 3c.6 4.8 2.2 6.4 7 7-4.8.6-6.4 2.2-7 7-.6-4.8-2.2-6.4-7-7 4.8-.6 6.4-2.2 7-7z" /><path d="M19 15.5c.2 1.6.9 2.3 2.5 2.5-1.6.2-2.3.9-2.5 2.5-.2-1.6-.9-2.3-2.5-2.5 1.6-.2 2.3-.9 2.5-2.5z" /></>,
  chip: <><rect x="6" y="6" width="12" height="12" rx="2.5" /><path d="M9.5 9.5h5v5h-5zM9 2.5v3M15 2.5v3M9 18.5v3M15 18.5v3M2.5 9h3M2.5 15h3M18.5 9h3M18.5 15h3" /></>,
  burst: <><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" /></>,
};

const ROW_TOP = [
  ["React", "react"], ["Next.js", "next"], ["Vue", "vue"], ["Alpine.js", "alpine"],
  ["Laravel", "laravel"], ["CodeIgniter", "codeigniter"], ["Node.js", "node"],
];
const ROW_BOTTOM = [
  ["Tailwind CSS", "tailwind"], ["TypeScript", "typescript"], ["React Native", "native"],
  ["Flutter", "flutter"], ["PostgreSQL", "postgres"], ["MySQL", "mysql"], ["WordPress", "wordpress"],
];
const AI = [["OpenAI", "chip"], ["Claude", "burst"], ["Google Gemini", "sparkle"]];

function Glyph({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {G[name]}
    </svg>
  );
}

// One row = the list repeated so the loop is seamless (track moves -50%)
function Row({ items, dir }) {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className={`tech-row tech-row--${dir}`} aria-hidden="true">
      <div className="tech-row-track">
        {[0, 1].map((half) => (
          <div key={half} className="tech-row-group">
            {loop.map(([label, icon], i) => (
              <span key={`${half}-${i}`} className="tech-badge">
                <span className="tech-badge-mark"><Glyph name={icon} /></span>
                <span className="tech-badge-tip">{label}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const all = [...ROW_TOP, ...ROW_BOTTOM].map(([label]) => label).join(", ");

  return (
    <section className="tech" id="stack" aria-labelledby="tech-title">
      <span className="tech-grid-lines" aria-hidden="true" />
      <div className="container">
        <div className="tech-head reveal">
          <p className="tech-eyebrow"><span className="tech-eyebrow-dot" />Our Tech Stack</p>
          <h2 className="tech-title" id="tech-title">The technology behind <em>every build.</em></h2>
          <p className="tech-intro">
            We pick proven tools around your features, your users and how your team will manage the product
            long after launch.
          </p>
        </div>

        {/* Rows sit inside the container width; their edges fade out */}
        <div className="tech-marquee reveal">
          <p className="sr-only">{all}</p>
          <Row items={ROW_TOP} dir="left" />
          <Row items={ROW_BOTTOM} dir="right" />
        </div>

        <div className="tech-ai reveal">
          <div className="tech-ai-copy">
            <span className="tech-ai-spark"><Glyph name="sparkle" /></span>
            <h3 className="tech-ai-title">AI, applied with intent.</h3>
            <p className="tech-ai-note">
              Where it genuinely helps, we build AI into research, content workflows and product features,
              always with a human reviewing the result.
            </p>
          </div>
          <ul className="tech-ai-chips">
            {AI.map(([label, icon]) => (
              <li key={label} className="tech-chip">
                <span className="tech-chip-mark"><Glyph name={icon} /></span>
                {label}
              </li>
            ))}
          </ul>
        </div>      </div>
    </section>
  );
}
