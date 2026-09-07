import { useRef } from "react";
import { motion } from "framer-motion";

/** Magnetic wrapper: nudges its child toward the cursor within a small radius. */
function useMagnetic(strength = 0.3) {
  const ref = useRef(null);
  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  return { ref, onMouseMove, onMouseLeave };
}

export function GradientButton({ children, onClick, href, download, target, className = "", ...rest }) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.15);
  const Tag = href ? "a" : "button";
  return (
    <Tag
      ref={ref}
      href={href}
      download={download}
      target={target}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`btn-gradient px-7 py-3.5 text-sm transition-transform duration-150 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function OutlineButton({ children, onClick, href, download, target, className = "", ...rest }) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.15);
  const Tag = href ? "a" : "button";
  return (
    <Tag
      ref={ref}
      href={href}
      download={download}
      target={target}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`btn-outline px-7 py-3.5 text-sm transition-transform duration-150 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function IconButton({ children, href, target = "_blank", onClick, ariaLabel, className = "" }) {
  return (
    <motion.a
      href={href}
      target={target}
      rel="noreferrer"
      onClick={onClick}
      aria-label={ariaLabel}
      whileHover={{ y: -3, backgroundColor: "var(--color-primary)", color: "#fff" }}
      className={`w-10 h-10 rounded-xl grid place-items-center bg-primary/10 text-primary transition-colors ${className}`}
    >
      {children}
    </motion.a>
  );
}
