import { motion } from "framer-motion";

export default function Timeline({ items, renderItem }) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-[6px] top-1.5 bottom-1.5 w-0.5 bg-gradient-to-b from-primary to-accent opacity-40" />
      <div className="space-y-9">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative"
          >
            <span className="absolute -left-8 top-1 w-3.5 h-3.5 rounded-full bg-primary shadow-[0_0_0_4px_rgba(37,99,235,0.15)]" />
            {renderItem(item)}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
