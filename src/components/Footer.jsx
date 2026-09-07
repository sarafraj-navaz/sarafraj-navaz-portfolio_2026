import { Link as ScrollLink } from "react-scroll";
import { FaGithub, FaLinkedinIn, FaWhatsapp, FaEnvelope, FaInstagram } from "react-icons/fa6";
import { PERSONAL } from "../data/constants";
import { analytics } from "../utils/analytics";

const LINKS = ["about", "skills", "projects", "contact"];

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          <div>
            <ScrollLink to="home" smooth duration={500} offset={-90} className="flex items-center gap-2 mb-4 cursor-pointer">
              <img src="/images/logo.png" alt="logo" className="w-9 h-9 rounded-xl" />
              <span className="font-heading font-bold text-lg">
                Sarafraj<span className="text-accent">.</span>dev
              </span>
            </ScrollLink>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Java Full Stack Developer building modern, secure and scalable web applications from {PERSONAL.location}.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {LINKS.map((id) => (
                <li key={id}>
                  <ScrollLink to={id} smooth duration={500} offset={-90} className="capitalize cursor-pointer hover:text-accent hover:pl-1 transition-all">
                    {id}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Connect</h4>
            <p className="text-xs text-slate-500 mb-3">Instagram · @sarafraj_navaz2000</p>
            <div className="flex gap-3 flex-wrap">
              <a href={PERSONAL.github} target="_blank" rel="noreferrer" onClick={() => analytics.socialClick("github")} className="w-10 h-10 rounded-xl grid place-items-center bg-white/10 hover:bg-primary transition-colors">
                <FaGithub />
              </a>
              <a href={PERSONAL.linkedin} target="_blank" rel="noreferrer" onClick={() => analytics.socialClick("linkedin")} className="w-10 h-10 rounded-xl grid place-items-center bg-white/10 hover:bg-primary transition-colors">
                <FaLinkedinIn />
              </a>
              <a href={PERSONAL.instagram} target="_blank" rel="noreferrer" aria-label="Instagram @sarafraj_navaz2000" onClick={() => analytics.socialClick("instagram")} className="w-10 h-10 rounded-xl grid place-items-center bg-white/10 hover:bg-primary transition-colors">
                <FaInstagram />
              </a>
              <a href={PERSONAL.whatsapp} target="_blank" rel="noreferrer" onClick={() => analytics.socialClick("whatsapp")} className="w-10 h-10 rounded-xl grid place-items-center bg-white/10 hover:bg-primary transition-colors">
                <FaWhatsapp />
              </a>
              <a href={`mailto:${PERSONAL.email}`} onClick={() => analytics.socialClick("email")} className="w-10 h-10 rounded-xl grid place-items-center bg-white/10 hover:bg-primary transition-colors">
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} {PERSONAL.name}. All rights reserved.</p>
          <p>Designed &amp; built with care.</p>
        </div>
      </div>
    </footer>
  );
}
