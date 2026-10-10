import { FaCertificate } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";
import PremiumCard from "./PremiumCard";
import { CERTIFICATIONS } from "../data/experience";

export default function Certificates() {
  return (
    <section id="certificates" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading eyebrow="Certifications" title="Credentials" />
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {CERTIFICATIONS.map((c, i) => (
            <PremiumCard key={c.id} delay={i * 0.08} accent={i % 2 ? "violet" : "gold"}>
              <div className="flex items-center gap-4">
                <div className="pc-icon"><FaCertificate /></div>
                <div>
                  <h3 className="font-heading font-bold text-base mb-0.5">{c.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">{c.issuer} &middot; {c.year}</p>
                  <span className="pc-badge">{c.year === "In Progress" ? "In progress" : "Verified credential"}</span>
                </div>
              </div>
            </PremiumCard>
          ))}
        </div>
      </div>
    </section>
  );
}
