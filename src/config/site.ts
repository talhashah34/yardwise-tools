export const siteConfig = {
  name: "Yardwise",
  tagline: "Plan home décor, DIY, and yard projects before you buy.",
  description:
    "Free calculators plus home décor and yard guides — rug sizes, curtains, paint, mulch, gravel, lawns, patios, and DIY comparisons with FAQs.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yardwise-app.netlify.app",
  locale: "en_US",
  creator: "Yardwise",
  keywords: [
    "mulch calculator",
    "mulch vs gravel",
    "fill dirt vs topsoil",
    "gravel vs asphalt driveway",
    "quartz vs granite",
    "hardwood vs laminate",
    "curtains vs blinds",
    "blackout curtains vs regular curtains",
    "paint vs wallpaper",
    "open shelving vs cabinets",
    "pantry organization",
    "how much mulch do I need for flower beds",
    "how deep should a gravel driveway be",
    "what size rug for living room",
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
      { label: "Mulch vs Gravel", href: "/guides/mulch-vs-gravel" },
      { label: "Quartz vs Granite", href: "/guides/quartz-vs-granite-countertops" },
      { label: "Gravel vs Asphalt Driveway", href: "/guides/gravel-vs-asphalt-driveway" },
      { label: "All Comparisons", href: "/guides/comparisons" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
