import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle({ theme, toggle }) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="w-10 h-10 rounded-full grid place-items-center bg-slate-100 dark:bg-white/10 hover:scale-110 transition-transform"
    >
      {theme === "dark" ? <FaSun className="text-accent" /> : <FaMoon className="text-secondary" />}
    </button>
  );
}
