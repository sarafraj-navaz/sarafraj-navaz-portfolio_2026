import { FaCertificate } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";
import AnimatedCard from "./AnimatedCard";
import { CERTIFICATIONS } from "../data/experience";

export default function Certificates() {
  return (
    <section id="certificates" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading eyebrow="Certifications" title="Credentials" />
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {CERTIFICATIONS.map((c, i) => (
            <AnimatedCard
              key={c.id}
              delay={i * 0.08}
              className="p-6 rounded-[1.4rem] glass flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/10 grid place-items-center shrink-0">
                <FaCertificate className="text-xl text-accent" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-base mb-0.5">{c.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{c.issuer} &middot; {c.year}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
