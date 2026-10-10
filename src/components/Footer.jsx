import { Link as ScrollLink } from "react-scroll";
import { FaGithub, FaLinkedinIn, FaWhatsapp, FaEnvelope, FaInstagram, FaCode, FaGraduationCap, FaLightbulb, FaBriefcase, FaUser, FaGear, FaFolderOpen } from "react-icons/fa6";
import { PERSONAL } from "../data/constants";
import { analytics } from "../utils/analytics";
import { Suspense, lazy } from "react";
const VisitorCounter = lazy(() => import("./VisitorCounter"));
const LINKS = ["about", "skills", "projects", "contact"];
const LINK_ICONS = { about: FaUser, skills: FaGear, projects: FaFolderOpen, contact: FaEnvelope };

export default function Footer() {
  return (
    <footer className="portfolio-footer relative overflow-hidden">
      <div className="footer-glow footer-glow--left" aria-hidden="true" />
      <div className="footer-glow footer-glow--right" aria-hidden="true" />
      <div className="footer-inner max-w-7xl mx-auto px-5 sm:px-7 lg:px-10 relative">
        <div className="footer-grid">
          <section className="footer-about">
            <ScrollLink to="home" smooth duration={500} offset={-90} className="footer-brand cursor-pointer">
              <span className="footer-logo"><img src="/images/logo.png" alt="" /></span>
              <span className="footer-brand-copy">
                <strong>Engg. Sarafraj Navaz</strong>
                <small>BUILD <i>•</i> CODE <i>•</i> CREATE</small>
              </span>
            </ScrollLink>
            <p className="footer-description">Java Full Stack Developer &amp; BCA Faculty at {PERSONAL.currentCollege}, {PERSONAL.location}.</p>
            <div className="footer-expertise">
              <span><FaCode />Full Stack Development</span>
              <span><FaGraduationCap />Teaching &amp; Mentoring</span>
              <span><FaLightbulb />Building Future Tech</span>
            </div>
          </section>

          <nav className="footer-links" aria-label="Footer navigation">
            <h4><span className="footer-heading-icon"><FaCode /></span>Quick Links</h4>
            <ul>{LINKS.map(id => { const Icon = LINK_ICONS[id]; return <li key={id}><ScrollLink to={id} smooth duration={500} offset={-90} className="cursor-pointer"><Icon /><span className="capitalize">{id}</span><b>›</b></ScrollLink></li>; })}</ul>
          </nav>

          <section className="footer-position">
            <h4><span className="footer-heading-icon"><FaBriefcase /></span>Current Position</h4>
            <div className="footer-position-card">
              <strong>{PERSONAL.currentPosition}</strong>
              <span className="footer-college">{PERSONAL.currentCollege}</span>
              <p>{PERSONAL.currentAddress}</p>
              <div className="footer-availability"><span />Available for Opportunities <b>›</b></div>
            </div>
            <div className="footer-visitors"><Suspense fallback={null}><VisitorCounter compact /></Suspense></div>
          </section>

          <section className="footer-connect">
            <h4><span className="footer-heading-icon"><FaInstagram /></span>Connect</h4>
            <p className="footer-handle">Instagram <span>·</span> @sarafraj_navaz2000</p>
            <div className="footer-socials">
              <a href={PERSONAL.github} aria-label="GitHub" target="_blank" rel="noreferrer" onClick={() => analytics.socialClick("github")} className="footer-social"><FaGithub /></a>
              <a href={PERSONAL.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer" onClick={() => analytics.socialClick("linkedin")} className="footer-social"><FaLinkedinIn /></a>
              <a href={PERSONAL.instagram} aria-label="Instagram" target="_blank" rel="noreferrer" onClick={() => analytics.socialClick("instagram")} className="footer-social"><FaInstagram /></a>
              <a href={PERSONAL.whatsapp} aria-label="WhatsApp" target="_blank" rel="noreferrer" onClick={() => analytics.socialClick("whatsapp")} className="footer-social"><FaWhatsapp /></a>
              <a href={`mailto:${PERSONAL.email}`} aria-label="Email" onClick={() => analytics.socialClick("email")} className="footer-social"><FaEnvelope /></a>
            </div>
            <p className="footer-signoff">Let’s build something great<span>.</span></p>
          </section>
        </div>
        <div className="footer-bottom">
          <p>© 2026 <strong>Engg. Sarafraj Navaz.</strong> All rights reserved.</p>
          <span className="footer-code-mark"><i />&lt;/&gt;<i /></span>
          <p className="footer-built"><span>♥</span> Designed &amp; built with care.</p>
        </div>
      </div>
    </footer>
  );
}
