import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    const onMove = (e) => {
      if (el) el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="hidden md:block fixed top-0 left-0 w-[420px] h-[420px] -ml-[210px] -mt-[210px] rounded-full pointer-events-none z-[1] will-change-transform"
      style={{
        background:
          "radial-gradient(circle, rgba(37,99,235,0.14) 0%, rgba(124,58,237,0.07) 40%, transparent 70%)",
      }}
    />
  );
}
