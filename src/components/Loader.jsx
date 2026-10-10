import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1850);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.025, filter: "blur(10px)" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="premium-loader fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          role="status"
          aria-label="Loading portfolio"
        >
          <div className="premium-loader__aurora premium-loader__aurora--one" />
          <div className="premium-loader__aurora premium-loader__aurora--two" />
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="premium-loader__content relative z-10 flex flex-col items-center"
          >
            <div className="premium-loader__monogram" aria-hidden="true">
              <span>S</span><i>N</i>
              <motion.div
                className="premium-loader__orbit"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              ><span /></motion.div>
            </div>
            <p className="premium-loader__eyebrow"><span /> DIGITAL CRAFT · PERSONAL PORTFOLIO <span /></p>
            <h2 className="premium-loader__name">Sarafraj <em>Navaz</em></h2>
            <p className="premium-loader__caption">Designing <em>thoughtful</em> digital experiences</p>
            <div className="premium-loader__track" aria-hidden="true">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
            <div className="premium-loader__meta"><span className="premium-loader__status">PREPARING YOUR EXPERIENCE</span><span className="premium-loader__percent">01 <i>/</i> 01</span></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
