import PremiumCard from "./PremiumCard";

/** Backwards-compatible wrapper: every AnimatedCard is now a PremiumCard. */
export default function AnimatedCard({ children, delay = 0, className = "", hover = true }) {
  return (
    <PremiumCard delay={delay} hover={hover} tilt={hover ? 5 : 0} innerClassName={className}>
      {children}
    </PremiumCard>
  );
}
