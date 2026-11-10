export const siteConfig = {
  name: "Yardwise",
  tagline: "Smarter planning for better outdoor spaces.",
  description:
    "Global landscaping calculators for mulch, topsoil, compost, and gravel. Estimate quantities in imperial or metric units, compare bagged vs bulk, and plan outdoor projects with practical guides.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yardwise-app.netlify.app",
  locale: "en_US",
  creator: "Yardwise",
  keywords: [
    "mulch calculator",
    "how much mulch do I need",
    "mulch bags calculator",
    "cubic yards of mulch calculator",
    "mulch coverage calculator",
    "garden bed mulch calculator",
    "topsoil calculator",
    "how much topsoil do I need",
    "compost calculator",
    "how much compost do I need",
    "gravel calculator",
    "how much gravel do I need",
    "pea gravel calculator",
    "gravel driveway calculator",
    "how many tons of gravel",
    "landscaping calculator",
    "cubic metres mulch calculator",
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "Calculators", href: "/tools" },
    { label: "Guides", href: "/guides" },
    { label: "About", href: "/about" },
  ],
  footer: {
    calculators: [
      { label: "Mulch Calculator", href: "/tools/mulch-calculator" },
      { label: "Topsoil Calculator", href: "/tools/topsoil-calculator" },
      { label: "Compost Calculator", href: "/tools/compost-calculator" },
      { label: "Gravel Calculator", href: "/tools/gravel-calculator" },
      { label: "Pea Gravel Calculator", href: "/tools/pea-gravel-calculator" },
      {
        label: "Gravel Driveway Calculator",
        href: "/tools/gravel-driveway-calculator",
      },
    ],
    guides: [
      { label: "How Much Mulch Do I Need?", href: "/guides/how-much-mulch-do-i-need" },
      { label: "How Much Topsoil Do I Need?", href: "/guides/how-much-topsoil-do-i-need" },
      { label: "How Much Gravel Do I Need?", href: "/guides/how-much-gravel-do-i-need" },
      {
        label: "How Many Tons of Gravel?",
        href: "/guides/how-many-tons-of-gravel-do-i-need",
      },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
