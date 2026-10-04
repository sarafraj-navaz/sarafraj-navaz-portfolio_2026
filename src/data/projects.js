export const PROJECTS = [
  {
    id: "jcart",
    title: "J-Cart — Carpets & Rugs Marketplace",
    image: "/images/project-jcart.jpg",
    summary:
      "Multi-role e-commerce platform (Admin, Product Owner, Buyer) with product verification, inventory management and a WhatsApp-integrated ordering flow.",
    technicalSummary:
      "Session-based RBAC across three roles, JDBC data access layer, and an automated owner-verification pipeline that cut manual review effort by 60%. Custom design system with 3D hover interactions on the storefront.",
    architecture: "Servlet/JSP MVC, JDBC → MySQL, session-filter-based auth, deployed on Render.",
    challenges:
      "Coordinating three distinct permission levels without a framework like Spring Security meant hand-rolling session filters and guarding every endpoint manually.",
    features: [
      "Multi-role access: Admin, Owner, Buyer",
      "WhatsApp-integrated ordering flow",
      "Automated product-verification workflow",
      "3D hover product cards",
    ],
    stack: ["Java", "JDBC", "Servlet", "JSP", "MySQL", "HTML/CSS/JS"],
    github: "https://github.com/sarafraj-navaz/jcart-ecommerce-platform",
    live: "https://jcart-ecommerce.onrender.com/app-home.jsp",
  },
  {
    id: "school",
    title: "Shree Laxmi Narayan Shikshan Sansthan — School Website",
    image: "/images/project-school.jpg",
    summary:
      "A responsive school website with an admissions-focused hero, a 'why choose us' highlight panel, and clear contact and location details for parents.",
    technicalSummary:
      "Component-driven React build with a glassmorphism info card layered over a full-bleed campus photograph, tuned for fast readability of admissions info on mobile.",
    architecture: "React + Vite frontend, deployed on Vercel.",
    challenges:
      "Balancing a rich, photo-heavy hero section with fast load times and legible text contrast across both the image backdrop and the glass panel.",
    features: [
      "Admissions-focused hero section",
      "'Why Parents Choose Us' highlight panel",
      "Click-to-call and WhatsApp contact buttons",
      "Fully responsive, mobile-first layout",
    ],
    stack: ["React", "Vite", "JavaScript", "CSS", "Vercel"],
    github: "https://github.com/sarafraj-navaz",
    live: "https://sarafraj-navaz-school-project.vercel.app",
  },
  {
    id: "portfolio",
    title: "Personal Portfolio Website",
    image: "/images/project-portfolio.jpg",
    summary:
      "A responsive portfolio with dark/light theme toggle and smooth navigation, tuned for performance.",
    technicalSummary:
      "Hand-tuned vanilla JS with no build step, focusing on minimal payload and render-blocking resources to hit a 98% Lighthouse performance score.",
    architecture: "Static HTML5/CSS3/JS, deployed via GitHub Pages.",
    challenges:
      "Balancing visual richness (animations, theme toggle) against strict performance budgets to protect the Lighthouse score.",
    features: [
      "Dark / light theme toggle",
      "98% Google Lighthouse performance",
      "Smooth section navigation",
    ],
    stack: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/sarafraj-navaz",
    live: "https://sarafraj-navaz.github.io/sarafraj-navaz-portfolio/",
  },
  {
    id: "therapist",
    title: "Sachin Chaudhary — Therapist Profile Website",
    image: "/images/project-therapist.jpg",
    summary:
      "Responsive dark/light-theme profile site with an integrated contact form, shipped end-to-end to a custom domain.",
    technicalSummary:
      "Full production infrastructure: GitHub → Vercel deployment pipeline, DNS (A/CNAME) on GoDaddy, and a resolved SSL issuance failure on the apex domain to achieve fully secured HTTPS.",
    architecture: "Static site, Web3Forms for contact handling, Vercel hosting, GoDaddy DNS.",
    challenges:
      "Diagnosing an SSL certificate issuance failure on the apex domain — required correcting DNS records and re-triggering certificate provisioning.",
    features: [
      "Dark / light theme",
      "Integrated contact form (Web3Forms)",
      "Custom domain with HTTPS",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "Web3Forms", "Vercel"],
    github: "https://github.com/sarafraj-navaz",
    live: "https://mindtalkswithsachin.in",
  },
  {
    id: "wedding",
    title: "Sister Wedding Website",
    image: "/images/project-wedding.jpg",
    summary:
      "A responsive event website with photo gallery, RSVP form and countdown timer.",
    technicalSummary:
      "RSVP submissions and a live countdown timer built in vanilla JS, optimized for mobile guests sharing the link over WhatsApp.",
    architecture: "Static HTML5/CSS3/JS, deployed on Netlify.",
    challenges:
      "Keeping the gallery lightweight enough for guests on slow mobile connections while still feeling premium.",
    features: [
      "Photo gallery",
      "RSVP form — 40+ responses",
      "Live countdown timer",
      "500+ visitors",
    ],
    stack: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/sarafraj-navaz",
    live: "https://alsifa-arshad-wed-website.netlify.app",
  },
];
