export default function Background({ children, className = "" }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 -z-20 opacity-[0.4] dark:opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.15) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
      {children}
    </div>
  );
}
