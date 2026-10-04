import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { FaBars, FaXmark } from "react-icons/fa6";
import ThemeToggle from "./ThemeToggle";
import { PERSONAL } from "../data/constants";
import { analytics } from "../utils/analytics";

const NAV_ITEMS = [
  "home", "about", "skills", "projects", "services",
  "education", "experience", "achievements", "booking", "bca", "contact",
];
// Note: the "certificates" section sits between experience/achievements but is
// left out of the nav to keep the menu concise — still reachable by scrolling.

// Override the default capitalized-id label for items that need custom text.
const NAV_LABELS = { bca: "BCA Notes" };

export default function Navbar({ theme, toggleTheme, active, scrolled }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/75 dark:bg-secondary/75 backdrop-blur-xl shadow-[0_1px_24px_rgba(15,23,42,0.06)]"
          : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-4">
        <ScrollLink to="home" smooth duration={500} offset={-90} className="flex items-center gap-2 cursor-pointer group">
          <img src="/images/logo.png" alt="logo" className="w-9 h-9 rounded-xl shadow-lg group-hover:scale-105 transition-transform" />
          <span className="font-heading font-bold text-lg tracking-tight">
            Sarafraj Navaz <span className="text-primary">Portfolio</span>
          </span>
        </ScrollLink>

        <ul className="hidden lg:flex items-center gap-7 font-medium text-sm">
          {NAV_ITEMS.map((id) => (
            <li key={id} className="relative">
              <ScrollLink
                to={id}
                smooth
                duration={600}
                easing="easeInOutQuart"
                offset={-90}
                className={`relative capitalize cursor-pointer transition-colors ${
                  active === id ? "text-primary" : "opacity-70 hover:opacity-100"
                }`}
              >
                {NAV_LABELS[id] ?? id}
                {active === id && (
                  <motion.span
                    layoutId="nav-glide-indicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-primary to-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </ScrollLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} toggle={toggleTheme} />
          <ScrollLink
            to="contact"
            smooth
            duration={500}
            offset={-90}
            onClick={() => analytics.hireMeClick()}
            className="hidden md:inline-flex btn-gradient px-5 py-2.5 text-sm cursor-pointer"
          >
            Hire Me
          </ScrollLink>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="lg:hidden w-10 h-10 rounded-full grid place-items-center bg-slate-100 dark:bg-white/10"
          >
            <FaBars />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="lg:hidden fixed inset-0 top-0 bg-white/98 dark:bg-secondary/98 backdrop-blur-xl z-50 flex flex-col"
          >
            <div className="flex justify-between items-center px-6 py-4">
              <span className="font-heading font-bold text-lg">{PERSONAL.name}</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="w-10 h-10 rounded-full grid place-items-center bg-slate-100 dark:bg-white/10">
                <FaXmark />
              </button>
            </div>
            <ul className="flex flex-col gap-1 p-6 font-heading text-xl font-medium">
              {NAV_ITEMS.map((id) => (
                <li key={id} className="border-b border-slate-100 dark:border-white/10">
                  <ScrollLink
                    to={id}
                    smooth
                    duration={500}
                    offset={-90}
                    onClick={() => setOpen(false)}
                    className="block py-3 capitalize cursor-pointer"
                  >
                    {NAV_LABELS[id] ?? id}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
