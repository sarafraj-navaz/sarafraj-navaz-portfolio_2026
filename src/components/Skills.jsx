import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaLaptopCode, FaServer, FaDatabase } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";
import AnimatedCard from "./AnimatedCard";
import { SKILL_GROUPS, CORE_CONCEPTS } from "../data/skills";
import { subscribeToEndorsements, endorseSkill, hasEndorsed } from "../utils/endorsementsService";
import { isFirebaseConfigured } from "../firebase";

const ICONS = { FaCode, FaLaptopCode, FaServer, FaDatabase };

function SkillBar({ name, level, delay, endorsements, onEndorse }) {
  const [endorsed, setEndorsed] = useState(() => hasEndorsed(name));
  const [busy, setBusy] = useState(false);

  async function handleEndorse() {
    if (endorsed || busy || !isFirebaseConfigured) return;
    setBusy(true);
    const ok = await onEndorse(name);
    if (ok) setEndorsed(true);
    setBusy(false);
  }

  return (
    <div>
      <div className="flex justify-between items-center text-sm mb-1.5">
        <span className="font-medium">{name}</span>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-xs">{level}%</span>
          {isFirebaseConfigured && (
            <button
              type="button"
              onClick={handleEndorse}
              disabled={endorsed || busy}
              title={endorsed ? "You endorsed this skill" : `Endorse ${name}`}
              className={`flex items-center gap-1 text-[0.7rem] font-semibold px-2 py-1 rounded-md border transition-colors ${
                endorsed
                  ? "border-primary/40 text-primary bg-primary/10 cursor-default"
                  : "border-slate-200 dark:border-white/15 text-slate-400 hover:border-primary hover:text-primary"
              }`}
            >
              <FaThumbsUp className="text-[0.65rem]" />
              {endorsements ?? 0}
            </button>
          )}
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [endorsements, setEndorsements] = useState({});

  useEffect(() => {
    const unsub = subscribeToEndorsements(setEndorsements);
    return unsub;
  }, []);

  return (
    <section id="skills" className="py-28 bg-slate-50 dark:bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Technical Skills"
          title="Tools I build with"
          subtitle={isFirebaseConfigured ? "Worked with me? Tap the thumbs-up on any skill to endorse it." : undefined}
        />

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {SKILL_GROUPS.map((group, gi) => {
            const Icon = ICONS[group.icon];
            return (
              <AnimatedCard
                key={group.title}
                delay={gi * 0.08}
                className="p-8 rounded-[1.4rem] bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.08] shadow-[0_4px_20px_-8px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_40px_-16px_rgba(37,99,235,0.25)] hover:border-primary/25 transition-shadow"
              >
                <div className="w-12 h-12 rounded-2xl grid place-items-center bg-gradient-to-br from-primary/15 to-accent/15 text-primary text-xl mb-5">
                  <Icon />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-5">{group.title}</h3>
                <div className="space-y-4">
                  {group.skills.map((s, si) => (
                    <SkillBar
                      key={s.name}
                      {...s}
                      delay={si * 0.08}
                      endorsements={endorsements[s.name]}
                      onEndorse={endorseSkill}
                    />
                  ))}
                </div>
              </AnimatedCard>
            );
          })}
        </div>

        <AnimatedCard className="p-8 rounded-[1.4rem] bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.08]">
          <h3 className="font-heading font-semibold text-lg mb-4">Core Concepts</h3>
          <div className="flex flex-wrap gap-2">
            {CORE_CONCEPTS.map((c) => (
              <span key={c} className="pill">{c}</span>
            ))}
          </div>
        </AnimatedCard>
      </div>
    </section>
  );
}
