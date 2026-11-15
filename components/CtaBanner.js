"use client";

import { useEffect, useRef } from "react";
import { IconArrow } from "@/components/Icons";

// Full-bleed CTA. As it scrolls in, the inset rounded frame widens to the
// screen edges and its corners square off; the photo drifts inside the frame.
// Values are eased towards their scroll target each frame for a smooth scrub.

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (v) => Math.min(1, Math.max(0, v));

export default function CtaBanner() {
  const frameRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    const photo = imgRef.current;
    if (!frame || !photo) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)");
    let raf = 0;
    let expand = 0; // 0 = inset + rounded, 1 = full width + square
    let drift = 0;  // photo offset in % of its height

    const targets = () => {
      const r = frame.getBoundingClientRect();
      const vh = window.innerHeight;
      // Expand between "top at 90% of viewport" and "top at 25%"
      const e = clamp01((vh * 0.9 - r.top) / (vh * 0.65));
      // Parallax across the whole time the frame is on screen: -7.2% → +7.2%
      const p = clamp01((vh - r.top) / (vh + r.height));
      return { e, d: (p - 0.5) * 14.4 };
    };

    const apply = () => {
      // Gutter that lines the frame up with the page container
      const gutter = Math.max(24, (window.innerWidth - 1240) / 2 + 24);
      const inset = mobile.matches ? 0 : gutter * (1 - expand);
      const radius = mobile.matches ? 28 : 28 * (1 - expand);
      frame.style.setProperty("--inset", `${inset}px`);
      frame.style.setProperty("--radius", `${radius}px`);
      photo.style.transform = `translate3d(0, ${drift}%, 0)`;
    };

    const tick = () => {
      const { e, d } = targets();
      expand = reduce ? e : lerp(expand, e, 0.12);
      drift = reduce ? 0 : lerp(drift, d, 0.12);
      apply();
      // Keep animating until the eased values settle
      if (Math.abs(expand - e) > 0.001 || Math.abs(drift - d) > 0.01) raf = requestAnimationFrame(tick);
      else raf = 0;
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };

    const init = targets();
    expand = init.e;
    drift = reduce ? 0 : init.d;
    apply();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="cta-banner" aria-labelledby="cta-title">
      <div className="cta-frame" ref={frameRef}>
        <img ref={imgRef} className="cta-img" src="/images/cta.jpg" alt="" loading="lazy" />
        <div className="cta-inner">
          <div className="cta-copy reveal">
            <p className="cta-label"><span className="cta-dot" />Ready to start?</p>
            <h2 className="cta-title" id="cta-title">
              Let&apos;s build something <em>remarkable.</em>
            </h2>
          </div>
          <div className="cta-side reveal">
            <p className="cta-text">
              Book a free consultation with our team. No pressure, no obligation, just an honest
              conversation about where your brand could go next.
            </p>
            <a href="mailto:hello@zynintell.com" className="roll-btn roll-btn--light">
              <span className="roll-btn-label">
                <span>Book a free consultation</span>
                <span aria-hidden="true">Book a free consultation</span>
              </span>
              <span className="roll-btn-icon" aria-hidden="true"><IconArrow size={16} /></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
