import { motion } from "framer-motion";

export default function AnimatedCard({ children, delay = 0, className = "", hover = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      whileHover={hover ? { y: -6 } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
