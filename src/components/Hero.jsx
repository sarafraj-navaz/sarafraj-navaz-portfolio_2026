import { useEffect, useRef, useState, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaWhatsapp, FaEnvelope, FaInstagram, FaEye, FaGraduationCap } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";
import Particles from "./Particles";
import FloatingShapes from "./FloatingShapes";
import { GradientButton, OutlineButton, IconButton } from "./Buttons";
import { PERSONAL } from "../data/constants";
import { analytics } from "../utils/analytics";
const VisitorCounter = lazy(() => import("./VisitorCounter"));

const ROLES = PERSONAL.taglineRoles;

/** Lightweight typewriter — rotates through ROLES without extra dependencies. */
function useTypewriter(words, typeSpeed = 55, backSpeed = 30, pause = 1600) {
  const [text, setText] = useState("");
  const wordIndex = useRef(0);
  const charIndex = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timeout;
    const tick = () => {
      const word = words[wordIndex.current % words.length];
      if (!deleting.current) {
        charIndex.current++;
        setText(word.slice(0, charIndex.current));
        if (charIndex.current === word.length) {
          deleting.current = true;
          timeout = setTimeout(tick, pause);
          return;
        }
        timeout = setTimeout(tick, typeSpeed);
      } else {
        charIndex.current--;
        setText(word.slice(0, charIndex.current));
        if (charIndex.current === 0) {
          deleting.current = false;
          wordIndex.current++;
        }
        timeout = setTimeout(tick, backSpeed);
      }
    };
    timeout = setTimeout(tick, 300);
    return () => clearTimeout(timeout);
  }, [words, typeSpeed, backSpeed, pause]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <Particles className="opacity-60 dark:opacity-100" />
      </div>
      <div className="absolute inset-0 hero-bg -z-20" />
      <FloatingShapes />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Currently Teaching · BCA Faculty
          </div>

          <h1 className="hero-title font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] mb-5">
            Hi, I'm <span className="gradient-text">{PERSONAL.name}</span>
          </h1>

          <p className="flex items-center gap-2 text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium mb-3"><FaGraduationCap className="text-primary" /> {PERSONAL.currentCollege} · {PERSONAL.locationNote}</p>

          <div className="font-heading text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-2 h-9">
            <span className="text-primary">{typed}</span>
            <span className="text-accent animate-pulse">|</span>
          </div>

          <p className="hero-intro text-slate-500 dark:text-slate-400 text-lg mb-8 max-w-xl leading-relaxed">
            {PERSONAL.heroSummary}
          </p>

          <div className="flex flex-wrap gap-4 mb-7">
            <GradientButton href="#projects">View My Work</GradientButton>
            <OutlineButton href={PERSONAL.resumeUrl} target="_blank">
              <FaEye /> View Resume
            </OutlineButton>
          </div>

          <div className="current-role-card mb-9">
            <div className="current-role-card__icon"><FaGraduationCap /></div>
            <div className="min-w-0">
              <span>Current Position</span>
              <strong>{PERSONAL.currentPosition}</strong>
              <b>{PERSONAL.currentCollege} · {PERSONAL.currentCollegeHindi}</b>
              <small>{PERSONAL.currentAffiliation}</small>
              <small>{PERSONAL.currentAddress}</small>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <Suspense fallback={null}><VisitorCounter /></Suspense>
            <div className="h-8 w-px bg-slate-200 dark:bg-white/10 hidden sm:block" />
            <span className="text-xs uppercase tracking-widest text-slate-400">Find me</span>
            <div className="flex gap-3">
              <IconButton href={PERSONAL.github} ariaLabel="GitHub" onClick={() => analytics.socialClick("github")}>
                <FaGithub />
              </IconButton>
              <IconButton href={PERSONAL.linkedin} ariaLabel="LinkedIn" onClick={() => analytics.socialClick("linkedin")}>
                <FaLinkedinIn />
              </IconButton>
              <IconButton href={PERSONAL.instagram} ariaLabel="Instagram @sarafraj_navaz2000" onClick={() => analytics.socialClick("instagram")}>
                <FaInstagram />
              </IconButton>
              <IconButton href={PERSONAL.whatsapp} ariaLabel="WhatsApp" onClick={() => analytics.socialClick("whatsapp")}>
                <FaWhatsapp />
              </IconButton>
              <IconButton href={`mailto:${PERSONAL.email}`} target="_self" ariaLabel="Email" onClick={() => analytics.socialClick("email")}>
                <FaEnvelope />
              </IconButton>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="hero-portrait-wrap relative w-[min(420px,80vw)] aspect-[4/5]">
            <div
              className="absolute -inset-[18px] rounded-[2rem] opacity-35 blur-[2px] animate-[spin_8s_linear_infinite]"
              style={{ background: "conic-gradient(from 0deg, #6366F1, #22D3EE, #E5C07B, #A78BFA, #6366F1)" }}
            />
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="hero-portrait relative w-full h-full p-2.5 rounded-[1.9rem] glass shadow-[0_30px_60px_-20px_rgba(99,102,241,0.4)]"
            >
              <img
                src="/images/profile-professional.webp"
                fetchpriority="high"
                width="1000"
                height="1000"
                alt={`${PERSONAL.name} — Engineer and Java Full Stack Developer`}
                className="w-full h-full object-cover rounded-[1.75rem]"
              />
            </motion.div>

            {[
              { icon: "☕", label: "Java", pos: "top-[6%] -left-[10%]", delay: 0 },
              { icon: "🌱", label: "Spring Boot", pos: "bottom-[18%] -right-[12%]", delay: 1.2 },
              { icon: "🗄️", label: "MySQL", pos: "-bottom-[4%] left-[8%]", delay: 2 },
            ].map((b) => (
              <motion.div
                key={b.label}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, delay: b.delay, ease: "easeInOut" }}
                className={`absolute ${b.pos} flex items-center gap-2 font-heading font-semibold text-sm px-4 py-2.5 rounded-2xl glass shadow-[0_12px_30px_-8px_rgba(15,23,42,0.25)]`}
              >
                <span>{b.icon}</span> {b.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <ScrollLink
        to="about"
        smooth
        duration={500}
        offset={-90}
        className="cursor-pointer absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-500 animate-bounce"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </ScrollLink>
    </section>
  );
}
