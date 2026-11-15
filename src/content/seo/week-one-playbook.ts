export type DailyOffpageTask = {
  day: number;
  title: string;
  tasks: string[];
};

export const weekOneOffpagePlaybook: DailyOffpageTask[] = [
  {
    day: 1,
    title: "Deploy + Search Console",
    tasks: [
      "Push/deploy the new guides batch when Netlify credits allow",
      "Submit https://yardwise-app.netlify.app/sitemap.xml in Google Search Console",
      "Request indexing for top 10 comparison URLs",
      "Verify GA4 realtime hits on 2–3 new pages",
    ],
  },
  {
    day: 2,
    title: "Pinterest distribution (comparisons)",
    tasks: [
      "Create 10 pins for mulch vs gravel, gravel vs asphalt, curtains vs blinds, quartz vs granite",
      "Use long-tail titles in pin descriptions",
      "Link each pin to the exact comparison URL",
    ],
  },
  {
    day: 3,
    title: "Pinterest distribution (kitchen + decor)",
    tasks: [
      "Pin pantry organization, drawer organizers, rug size, blackout curtains",
      "Join 5 relevant group boards if available on business account",
      "Schedule 5–10 pins/day cadence",
    ],
  },
  {
    day: 4,
    title: "Internal + external mentions",
    tasks: [
      "From old calculators, click-test related comparison links",
      "Update any social bios to feature 1 comparison + 1 calculator",
      "Share 3 comparisons in relevant Facebook/home DIY groups (value-first, no spam)",
    ],
  },
  {
    day: 5,
    title: "Refresh winners",
    tasks: [
      "Check Search Console impressions for new slugs",
      "Add FAQ tweaks to any page getting impressions but no clicks",
      "Create 5 alternate pin creatives for the top 3 clicked pins",
    ],
  },
  {
    day: 6,
    title: "Comparison hub push",
    tasks: [
      "Pin the /guides comparisons section as a hub graphic",
      "Interlink any thin pages to 2 stronger comparisons",
      "Submit another 10 URLs for indexing if crawl quota allows",
    ],
  },
  {
    day: 7,
    title: "Measure + double down",
    tasks: [
      "Export GA4 landing pages for the week",
      "Keep only formats that earned saves/clicks on Pinterest",
      "Plan next 5 comparisons from queries showing impressions",
    ],
  },
];

export const priorityPinTitles = [
  "Mulch vs Gravel: Which Is Better for Beds and Paths?",
  "Gravel vs Asphalt Driveway Cost Comparison",
  "Blackout Curtains vs Regular Curtains for Bedrooms",
  "Quartz vs Granite Countertops: Pros and Cons",
  "Open Shelving vs Cabinets in the Kitchen",
  "Hardwood vs Laminate Flooring: Which Should You Choose?",
  "Fill Dirt vs Topsoil for Leveling and Planting",
  "Pantry Bins vs Baskets for Real Organization",
  "River Rock vs Pea Gravel for Landscaping",
  "Paint vs Wallpaper for Accent Walls",
];
