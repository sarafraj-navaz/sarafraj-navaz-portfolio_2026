import { FaGraduationCap } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";
import Timeline from "./Timeline";
import PremiumCard from "./PremiumCard";
import { EDUCATION } from "../data/education";

export default function Education() {
  return (
    <section id="education" className="py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading eyebrow="Education" title="Academic foundation" />

        <div className="max-w-3xl mx-auto">
          <Timeline
            items={EDUCATION}
            renderItem={(item) => (
              <PremiumCard tilt={3} accent="violet"><div className="flex items-start gap-5">
                <div className="pc-icon"><FaGraduationCap /></div>
                <div>
                  <span className="inline-block font-heading text-[0.7rem] font-bold tracking-wide text-accent mb-1">
                    {item.period}
                  </span>
                  <h3 className="font-heading font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">{item.place}</p>
                  <p className="text-primary text-sm font-medium">{item.meta}</p>
                </div>
              </div></PremiumCard>
            )}
          />
        </div>
      </div>
    </section>
  );
}
