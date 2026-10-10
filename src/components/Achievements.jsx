import { FaTrophy, FaCodeBranch, FaMedal, FaLayerGroup } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";
import PremiumCard from "./PremiumCard";
import { ACHIEVEMENTS } from "../data/experience";

const ICONS = [FaTrophy, FaCodeBranch, FaMedal, FaLayerGroup];

export default function Achievements() {
  return (
    <section id="achievements" className="py-28 section-alt">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading eyebrow="Achievements" title="Milestones along the way" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACHIEVEMENTS.map((a, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <PremiumCard key={a.id} delay={i * 0.08} accent={["gold","blue","violet","cyan"][i % 4]}>
                <span className="pc-watermark" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div className="pc-icon mb-4"><Icon /></div>
                <h3 className="font-heading font-bold text-sm mb-1.5 leading-snug">{a.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs">{a.detail}</p>
              </PremiumCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
