import { AnimatePresence, motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa6";

export default function BackToTop({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full btn-gradient grid place-items-center z-40"
        >
          <FaArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
