# Sarafraj Navaz — Portfolio (React + Vite)

A premium, animated developer portfolio built with React 19, Vite, Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

## What's already wired up

- **EmailJS** — `.env` is pre-filled with the service ID, template ID and public
  key you provided. `src/components/Contact.jsx` calls `emailjs.send()`
  directly with validation, loading state, and success/error toasts. If the
  env vars are ever missing at build time, the form falls back to opening the
  user's email client instead of failing silently.
- **Google Analytics 4** — open `src/utils/analytics.js` and paste your GA4
  Measurement ID into the `GA_MEASUREMENT_ID` constant (or set
  `VITE_GA_MEASUREMENT_ID` in `.env`). Once set, page views and these events
  start flowing automatically: `resume_download`, `project_click` (per
  project, per button — GitHub vs Live Demo), `hire_me_click`,
  `contact_form_submit`, and `social_click` (GitHub/LinkedIn/WhatsApp/Email).
- **Project hover depth** — each project card in `src/data/projects.js` has a
  `technicalSummary`, `architecture`, `challenges`, `features[]` and
  `stack[]`. Hovering a project card overlays this detail on top of the
  screenshot. Edit that file to adjust the depth/wording per project.

## Structure

```
src/
  components/   All UI building blocks (Navbar, Hero, Projects, Contact, etc.)
  pages/         Home.jsx composes all sections
  data/          Real content pulled from your resume — edit these, not the components
  hooks/         useTheme, useScrollSpy, useTilt
  utils/         analytics.js
  styles/        index.css (Tailwind v4 theme tokens + shared utility classes)
public/images/   All real photos, screenshots, resume.pdf, logo, favicon
```

## Notes on the tech stack

The original brief asked for a long list of libraries (GSAP, Lottie, react-tilt,
a dedicated particles package, etc.). To keep the app fast, dependency-light,
and easy for you to maintain, a few of those were implemented as small custom
hooks/components instead of extra packages:

- Tilt effect → `src/hooks/useTilt.js` (same visual result as react-tilt)
- Particle background → `src/components/Particles.jsx` (canvas-based, no extra lib)
- Cursor + mouse glow → `src/components/Cursor.jsx` / `MouseGlow.jsx`

Everything else (Framer Motion, React Icons, React Router, React Scroll,
EmailJS, React CountUp) is a real installed dependency in `package.json`.

A **Testimonials** section was intentionally left out — there's no real
client testimonial data to use yet, and inventing quotes would be dishonest.
Add a `Testimonials.jsx` component + a `data/testimonials.js` file the same
way the other sections are structured whenever you have real quotes to use.

## Enabling the admin dashboard, live analytics, endorsements & booking

These four features need a small free backend (Firebase) or a scheduling
account (Calendly) to work — the site builds and runs fine without them, but
the relevant section quietly shows a "not configured yet" message until you
add the credentials below.

### 1. Firebase (analytics dashboard · project CRUD · skill endorsements)

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project** (the free Spark plan is enough).
2. In your new project: **Build → Firestore Database → Create database** (start in production mode).
3. **Build → Authentication → Get started → Email/Password → Enable.**
4. Still in Authentication, **Users → Add user** — create yourself an admin login (this is the only account that can sign into `/admin`).
5. **Project settings (gear icon) → General → Your apps → Web (</>) → register app.** Copy the 6 config values into `.env`:
   ```
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   ```
6. **Firestore Database → Rules** — paste in the contents of `firestore.rules` (included in this repo) and publish.
7. Run the app, go to `/admin`, sign in with the user from step 4.

Once configured:
- **Analytics tab** — total visits, most-clicked projects, and a live feed of recent visitors/interactions. Every real visitor's page load and every GitHub/Live-Demo click on a project card is logged automatically (`src/utils/siteAnalytics.js`).
- **Projects tab** — add, edit, delete and categorize project entries. Click "Import sample projects" once to move your current 4 projects from `src/data/projects.js` into Firestore so you can start editing them; the public Projects section updates live, no redeploy needed.
- **Skill endorsements** — a thumbs-up button appears next to each skill in the Skills section once Firebase is live; each visitor can endorse a given skill once (tracked in their browser), and the count is shared across everyone.

Without Firebase configured, the public site still works normally — Projects and Skills just fall back to the static data in `src/data/`, and `/admin` shows a setup message instead of a login form.

### 2. Calendly (book a meeting)

Create a free account at [calendly.com](https://calendly.com), set up an event type (e.g. "Intro Call"), copy its scheduling link, and set:
```
VITE_CALENDLY_URL=https://calendly.com/your-handle/intro-call
```
The new **"Book a Call"** section (between Achievements and Contact) will then show a live embedded Calendly calendar. Prefer Cal.com instead? Swap the `<InlineWidget>` in `src/components/Booking.jsx` for Cal.com's embed script — everything else (the section, nav link, styling) stays the same.

### 3. Confirming the contact form actually emails you

The form itself was already wired to EmailJS before these changes. To make sure a submission lands in your inbox: log into [dashboard.emailjs.com](https://dashboard.emailjs.com) → **Email Templates** → open the template with ID `template_u2f6s8o` → confirm the **"To Email"** field is your real address. That's the only place the recipient is set — the code just sends `from_name`, `from_email`, `subject`, and `message` to whatever template/recipient you've configured there.

## Deploying

This is a static Vite app — deploy `dist/` to Vercel, Netlify, GitHub Pages,
or Render exactly like your previous projects.
