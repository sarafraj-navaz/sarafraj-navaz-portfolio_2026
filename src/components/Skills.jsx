import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaLaptopCode, FaServer, FaDatabase } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";
import PremiumCard from "./PremiumCard";
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
          <span className="pc-level">{level >= 88 ? "Expert" : level >= 80 ? "Advanced" : "Proficient"} · {level}%</span>
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
      <div className="pc-skill-track">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="pc-skill-fill"
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
    <section id="skills" className="py-28 section-alt">
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
              <PremiumCard key={group.title} delay={gi * 0.08} accent={["blue","gold","violet","cyan"][gi % 4]}>
                <div className="pc-icon mb-5"><Icon /></div>
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
              </PremiumCard>
            );
          })}
        </div>

        <PremiumCard hover={false} tilt={0} accent="violet">
          <h3 className="font-heading font-semibold text-lg mb-4">Core Concepts</h3>
          <div className="flex flex-wrap gap-2">
            {CORE_CONCEPTS.map((c) => (
              <span key={c} className="pc-chip">{c}</span>
            ))}
          </div>
        </PremiumCard>
      </div>
    </section>
  );
}
