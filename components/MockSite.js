// A tall, full-page website mock drawn in code, used inside the Recent Work
// browser frames in place of real screenshots. Sized with container query
// units (cqw) so it scales with the card. Page ratio matches a 900x2400 capture.

const img = (name) => `/images/${name}.jpg`;

function Bars({ widths, color, h = 1.6, gap = 1.4 }) {
  return (
    <div style={{ display: "grid", gap: `${gap}cqw` }}>
      {widths.map((w, i) => (
        <span key={i} style={{ display: "block", width: `${w}%`, height: `${h}cqw`, borderRadius: "1cqw", background: color }} />
      ))}
    </div>
  );
}

export default function MockSite({ theme }) {
  const { bg, surface, ink, muted, accent, name, photos } = theme;
  const block = { background: surface, borderRadius: "2.4cqw" };

  return (
    <div className="mock-site" style={{ background: bg, color: ink }}>
      {/* Nav */}
      <div className="ms-nav">
        <strong style={{ color: ink }}>
          <span style={{ background: accent }} className="ms-logo" />{name}
        </strong>
        <span className="ms-links">
          {[0, 1, 2, 3].map((i) => <i key={i} style={{ background: muted }} />)}
        </span>
        <span className="ms-cta" style={{ background: accent }} />
      </div>

      {/* Hero */}
      <div className="ms-hero">
        <div>
          <span className="ms-chip" style={{ background: surface, color: accent }}>● New</span>
          <Bars widths={[92, 78, 60]} color={ink} h={4.2} gap={1.8} />
          <div style={{ height: "3cqw" }} />
          <Bars widths={[88, 70]} color={muted} h={1.4} />
          <div className="ms-btns">
            <span style={{ background: accent }} />
            <span style={{ border: `0.3cqw solid ${muted}` }} />
          </div>
        </div>
        <img src={img(photos[0])} alt="" />
      </div>

      {/* Logo strip */}
      <div className="ms-logos">
        {[0, 1, 2, 3, 4].map((i) => <i key={i} style={{ background: muted }} />)}
      </div>

      {/* Feature cards */}
      <div className="ms-section">
        <Bars widths={[46, 34]} color={ink} h={3} gap={1.6} />
        <div className="ms-cards">
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ ...block, padding: "3cqw" }}>
              <span className="ms-icon" style={{ background: i === 1 ? accent : bg }} />
              <Bars widths={[70, 90, 60]} color={i === 1 ? ink : muted} h={1.2} />
            </div>
          ))}
        </div>
      </div>

      {/* Photo band */}
      <div className="ms-band">
        <img src={img(photos[1])} alt="" />
        <div style={{ ...block, padding: "4cqw" }}>
          <Bars widths={[80, 64]} color={ink} h={2.6} gap={1.6} />
          <div style={{ height: "2.4cqw" }} />
          <Bars widths={[92, 86, 70]} color={muted} h={1.2} />
        </div>
      </div>

      {/* Stats */}
      <div className="ms-stats" style={{ background: ink }}>
        {["98%", "4.9", "120+"].map((s) => (
          <div key={s}><b style={{ color: accent }}>{s}</b><span style={{ background: bg, opacity: .35 }} /></div>
        ))}
      </div>

      {/* Gallery */}
      <div className="ms-section">
        <Bars widths={[40]} color={ink} h={3} />
        <div className="ms-gallery">
          <img src={img(photos[2])} alt="" />
          <img src={img(photos[3])} alt="" />
        </div>
      </div>

      {/* Testimonial */}
      <div className="ms-section">
        <div style={{ ...block, padding: "5cqw", textAlign: "center" }}>
          <span className="ms-quote" style={{ color: accent }}>“</span>
          <div style={{ display: "grid", justifyItems: "center" }}>
            <Bars widths={[90, 80, 56]} color={ink} h={1.8} gap={1.6} />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ms-cta-band" style={{ background: accent }}>
        <Bars widths={[70, 50]} color="rgba(255,255,255,.95)" h={3.4} gap={1.8} />
        <span className="ms-cta-btn" style={{ background: ink }} />
      </div>

      {/* Footer */}
      <div className="ms-footer">
        {[0, 1, 2, 3].map((i) => <Bars key={i} widths={[60, 80, 50, 70]} color={muted} h={1} gap={1.6} />)}
      </div>
    </div>
  );
}
