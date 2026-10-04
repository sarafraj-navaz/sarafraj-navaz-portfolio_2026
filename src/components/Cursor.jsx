import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const onOver = (e) => {
      const interactive = e.target.closest("a, button, .cursor-hover");
      if (ringRef.current) {
        ringRef.current.style.transform += interactive ? " scale(1.8)" : "";
      }
      document.body.classList.toggle("cursor-active", !!interactive);
    };

    let raf;
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        const scale = document.body.classList.contains("cursor-active") ? 1.8 : 1;
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) scale(${scale})`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-primary pointer-events-none z-[200] -ml-[3px] -mt-[3px]"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent/60 pointer-events-none z-[200] -ml-4 -mt-4 transition-[width,height] duration-200"
      />
    </>
  );
}
