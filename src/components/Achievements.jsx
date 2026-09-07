import { FaTrophy, FaCodeBranch, FaMedal, FaLayerGroup } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";
import AnimatedCard from "./AnimatedCard";
import { ACHIEVEMENTS } from "../data/experience";

const ICONS = [FaTrophy, FaCodeBranch, FaMedal, FaLayerGroup];

export default function Achievements() {
  return (
    <section id="achievements" className="py-28 bg-slate-50 dark:bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading eyebrow="Achievements" title="Milestones along the way" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACHIEVEMENTS.map((a, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <AnimatedCard
                key={a.id}
                delay={i * 0.08}
                className="text-center p-7 rounded-[1.4rem] bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.08] shadow-[0_4px_20px_-8px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_40px_-16px_rgba(37,99,235,0.25)] hover:border-primary/25 transition-shadow"
              >
                <Icon className="text-3xl text-accent mb-3 mx-auto" />
                <h3 className="font-heading font-semibold text-sm mb-1">{a.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs">{a.detail}</p>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
