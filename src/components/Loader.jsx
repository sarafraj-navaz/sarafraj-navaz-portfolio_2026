import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[999] bg-secondary flex flex-col items-center justify-center gap-6"
        >
          <motion.div
            className="w-16 h-16 rounded-full border-[3px] border-accent/15"
            style={{ borderTopColor: "#38BDF8", borderRightColor: "#2563EB" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          />
          <p className="font-heading text-white/80 tracking-[0.3em] text-xs uppercase">
            Compiling Experience
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
