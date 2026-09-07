import { motion } from "framer-motion";
import * as ReactCountUp from "react-countup";
import SectionHeading from "./SectionHeading";
import { PERSONAL } from "../data/constants";

// react-countup ships as CommonJS; depending on the bundler's interop,
// the default import can resolve to the component itself OR to the
// whole module object ({ default, useCountUp }). This handles both.
const CountUp = ReactCountUp.default?.default || ReactCountUp.default;

const STATS = [
  { value: 200, suffix: "+", label: "LeetCode Problems" },
  { value: 5, suffix: "+", label: "Projects Shipped" },
  { value: 100, suffix: "%", label: "Responsive Builds" },
];

const JOURNEY = [
  { year: "2018 – 2022", title: "B.Tech, Computer Science & Engineering", detail: "HMFA Memorial Institute of Engineering & Technology, Prayagraj · AKTU" },
  { year: "2022 – 2023", title: "Full Stack Training & Internship", detail: "JSpiders · Core Java, J2EE, Spring Boot, Hibernate, MySQL, REST APIs" },
  { year: "2023 – 2025", title: "Deep, Focused Upskilling", detail: "Solved 200+ LeetCode problems and independently shipped four production applications" },
  { year: "2026", title: "Ready for Day One", detail: "Available immediately, open to relocation, looking for a team to build with" },
];

export default function About() {
  return (
    <section id="about" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading eyebrow="About Me" title="The developer behind the code" />

        <div className="grid lg:grid-cols-5 gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="relative max-w-sm mx-auto p-2.5 rounded-[1.6rem] glass shadow-[0_30px_60px_-20px_rgba(37,99,235,0.3)] aspect-square">
              <img
                src="/images/profile.jpg"
                alt={`${PERSONAL.name} portrait`}
                className="w-full h-full object-cover rounded-[1.3rem]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-10 max-w-sm mx-auto">
              {STATS.map((s) => (
                <div key={s.label} className="text-center p-5 rounded-[1.1rem] bg-primary/5 dark:bg-white/[0.04] border border-primary/10 dark:border-white/[0.08]">
                  <span className="font-heading font-extrabold text-3xl text-primary">
                    <CountUp end={s.value} duration={2} enableScrollSpy scrollSpyOnce suffix={s.suffix} />
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{s.label}</p>
                </div>
              ))}
              <div className="text-center p-5 rounded-[1.1rem] bg-primary/5 dark:bg-white/[0.04] border border-primary/10 dark:border-white/[0.08]">
                <p className="font-heading font-extrabold text-xl text-primary leading-tight">Immediate</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Joining Availability</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-10 text-lg">
              {PERSONAL.aboutSummary}
            </p>

            <div className="relative pl-8">
              <div className="absolute left-[6px] top-1.5 bottom-1.5 w-0.5 bg-gradient-to-b from-primary to-accent opacity-40" />
              <div className="space-y-9">
                {JOURNEY.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="relative"
                  >
                    <span className="absolute -left-8 top-1 w-3.5 h-3.5 rounded-full bg-primary shadow-[0_0_0_4px_rgba(37,99,235,0.15)]" />
                    <span className="inline-block font-heading text-[0.7rem] font-bold tracking-wide text-accent mb-1">
                      {item.year}
                    </span>
                    <h3 className="font-heading font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{item.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
