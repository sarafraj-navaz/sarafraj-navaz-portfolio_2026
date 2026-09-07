import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={center ? "text-center mb-16" : "mb-16"}
    >
      <span className="inline-block font-heading text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">
        {eyebrow}
      </span>
      <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-slate-500 dark:text-slate-400 mt-4 text-lg ${center ? "max-w-xl mx-auto" : "max-w-xl"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
