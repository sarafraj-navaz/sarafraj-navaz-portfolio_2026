import { useRef, useCallback } from "react";
import { motion } from "framer-motion";

/**
 * PremiumCard
 * - scroll reveal (framer-motion)
 * - cursor spotlight + animated gradient border (CSS vars --mx/--my)
 * - subtle 3D tilt (rAF throttled, disabled on touch / reduced-motion)
 */
export default function PremiumCard({
  children,
  as = "div",
  delay = 0,
  tilt = 6,
  hover = true,
  className = "",
  innerClassName = "",
  accent = "blue",
  ...rest
}) {
  const inner = useRef(null);
  const raf = useRef(0);
  const Outer = motion[as] || motion.div;

  const move = useCallback((e) => {
    if (!hover || e.pointerType === "touch") return;
    const el = inner.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
      if (tilt) {
        el.style.transform = `perspective(1000px) rotateY(${(px - 0.5) * tilt}deg) rotateX(${(0.5 - py) * tilt}deg) translateY(-6px)`;
      }
    });
  }, [hover, tilt]);

  const leave = useCallback(() => {
    cancelAnimationFrame(raf.current);
    const el = inner.current;
    if (!el) return;
    el.style.transform = "";
  }, []);

  return (
    <Outer
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`pcard-wrap ${className}`}
      {...rest}
    >
      <div
        ref={inner}
        onPointerMove={move}
        onPointerLeave={leave}
        data-accent={accent}
        className={`pcard ${hover ? "pcard--hover" : ""} ${innerClassName}`}
      >
        <span className="pcard__orb" aria-hidden="true" />
        <span className="pcard__noise" aria-hidden="true" />
        <span className="pcard__spot" aria-hidden="true" />
        <span className="pcard__shine" aria-hidden="true" />
        <div className="pcard__body">{children}</div>
      </div>
    </Outer>
  );
}
