import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaPhone, FaWhatsapp, FaGithub, FaInstagram, FaLocationDot, FaPaperPlane, FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";
import { PERSONAL } from "../data/constants";
import { analytics } from "../utils/analytics";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const INFO_CARDS = [
  { icon: FaEnvelope, label: "Email", value: PERSONAL.email, href: `mailto:${PERSONAL.email}` },
  { icon: FaPhone, label: "Phone", value: PERSONAL.phone, href: `tel:${PERSONAL.phone.replace(/\s/g, "")}` },
  { icon: FaWhatsapp, label: "WhatsApp", value: "Chat instantly", href: PERSONAL.whatsapp },
  { icon: FaGithub, label: "GitHub", value: "sarafraj-navaz", href: PERSONAL.github },
  { icon: FaInstagram, label: "Instagram", value: "@sarafraj_navaz2000", href: PERSONAL.instagram },
  { icon: FaLocationDot, label: "Location", value: PERSONAL.location, href: null },
];

function Toast({ status }) {
  if (!status) return null;
  const isSuccess = status === "success";
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        className={`flex items-center gap-2 text-sm rounded-xl px-4 py-3 mt-2 ${
          isSuccess
            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
            : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
        }`}
      >
        {isSuccess ? <FaCircleCheck /> : <FaCircleExclamation />}
        <span>
          {isSuccess
            ? "Message sent successfully. Thank you for reaching out!"
            : "Something went wrong. Please email me directly instead."}
        </span>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ from_name: "", from_email: "", from_phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"

  function validate() {
    const e = {};
    if (!form.from_name.trim()) e.from_name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.from_email)) e.from_email = "Enter a valid email address.";
    if (form.from_phone.trim() && !/^[+\d][\d\s-]{7,}$/.test(form.from_phone.trim())) {
      e.from_phone = "Enter a valid phone number.";
    }
    if (!form.subject.trim()) e.subject = "Please add a subject.";
    if (form.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleChange(field) {
    return (ev) => setForm((f) => ({ ...f, [field]: ev.target.value }));
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      // Fallback so the form is never a dead end even if env vars are missing at build time
      const mailto = `mailto:${PERSONAL.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(
        `From: ${form.from_name} (${form.from_email})${form.from_phone ? `\nPhone: ${form.from_phone}` : ""}\n\n${form.message}`
      )}`;
      window.location.href = mailto;
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.from_name,
          from_email: form.from_email,
          from_phone: form.from_phone || "Not provided",
          subject: form.subject,
          message: form.message,
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("success");
      analytics.contactSubmit();
      setForm({ from_name: "", from_email: "", from_phone: "", subject: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something great"
          subtitle="Available for immediate joining. Reach out and let's talk about your team or project."
        />

        <div className="grid lg:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-2 space-y-4"
          >
            {INFO_CARDS.map((c) => {
              const content = (
                <>
                  <c.icon className="text-xl text-primary w-6 text-center shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400">{c.label}</p>
                    <p className="font-medium">{c.value}</p>
                  </div>
                </>
              );
              const classes =
                "flex items-center gap-4 p-4 rounded-2xl bg-primary/5 dark:bg-white/[0.04] border border-primary/10 dark:border-white/[0.08] transition-transform hover:translate-x-1.5";
              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  onClick={() => c.label !== "Email" && analytics.socialClick(c.label.toLowerCase())}
                  className={classes}
                >
                  {content}
                </a>
              ) : (
                <div key={c.label} className={`${classes} cursor-default`}>{content}</div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass rounded-[1.6rem] p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Your Name</label>
                  <input
                    value={form.from_name}
                    onChange={handleChange("from_name")}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-white/60 dark:bg-white/[0.04] text-sm focus:border-primary outline-none"
                    placeholder="John Doe"
                  />
                  {errors.from_name && <p className="text-red-500 text-xs mt-1">{errors.from_name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Your Email</label>
                  <input
                    value={form.from_email}
                    onChange={handleChange("from_email")}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-white/60 dark:bg-white/[0.04] text-sm focus:border-primary outline-none"
                    placeholder="john@company.com"
                  />
                  {errors.from_email && <p className="text-red-500 text-xs mt-1">{errors.from_email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">Your Phone <span className="text-slate-400 font-normal">(optional)</span></label>
                <input
                  type="tel"
                  value={form.from_phone}
                  onChange={handleChange("from_phone")}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-white/60 dark:bg-white/[0.04] text-sm focus:border-primary outline-none"
                  placeholder="+91 98765 43210"
                />
                {errors.from_phone && <p className="text-red-500 text-xs mt-1">{errors.from_phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">Subject</label>
                <input
                  value={form.subject}
                  onChange={handleChange("subject")}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-white/60 dark:bg-white/[0.04] text-sm focus:border-primary outline-none"
                  placeholder="Let's work together"
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">Message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={handleChange("message")}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-white/60 dark:bg-white/[0.04] text-sm focus:border-primary outline-none resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-gradient w-full py-3.5 text-sm disabled:opacity-60"
              >
                {status === "sending" ? (
                  "Sending..."
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </button>

              <Toast status={status === "sending" ? null : status} />
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
