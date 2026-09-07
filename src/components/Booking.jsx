import { InlineWidget } from "react-calendly";
import { FaCalendarCheck } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";
import { trackEvent } from "../utils/analytics";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL;
const CALCOM_URL = import.meta.env.VITE_CALCOM_URL;

export default function Booking() {
  return (
    <section id="booking" className="py-28 bg-slate-50 dark:bg-white/[0.02]">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Book a Call"
          title="Let's talk, live"
          subtitle="Pick a slot that works for you — no back-and-forth emails needed."
        />

        {CALCOM_URL ? (
          <div className="glass rounded-[1.6rem] overflow-hidden">
            <iframe
              src={`${CALCOM_URL}${CALCOM_URL.includes("?") ? "&" : "?"}embed=true&theme=auto`}
              title="Book a call"
              style={{ width: "100%", height: "700px", border: "none" }}
              onLoad={() => trackEvent("meeting_booked")}
            />
          </div>
        ) : CALENDLY_URL ? (
          <div className="glass rounded-[1.6rem] overflow-hidden">
            <InlineWidget
              url={CALENDLY_URL}
              styles={{ height: "700px" }}
              onEventScheduled={() => trackEvent("meeting_booked")}
            />
          </div>
        ) : (
          <div className="glass rounded-[1.6rem] p-10 text-center space-y-3">
            <FaCalendarCheck className="text-3xl text-primary mx-auto" />
            <h3 className="font-heading font-bold text-lg">Booking isn't set up yet</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto">
              Add your Cal.com link as <code className="text-primary">VITE_CALCOM_URL</code> (e.g.{" "}
              <code className="text-primary">https://cal.com/your-handle/intro-call</code>) or your Calendly
              link as <code className="text-primary">VITE_CALENDLY_URL</code> in{" "}
              <code className="text-primary">.env</code>, and this section will show a live booking calendar
              automatically.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
