export default function ScrollProgress({ progress }) {
  return (
    <div className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-primary via-accent to-violet z-[100] transition-[width] duration-150" style={{ width: `${progress}%` }} />
  );
}
