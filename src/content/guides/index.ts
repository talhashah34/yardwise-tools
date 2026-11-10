export interface Guide {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  readingTime: string;
  updated: string;
  content: string;
}

export const guides: Guide[] = [
  {
    slug: "how-much-mulch-for-flower-beds",
    title: "How Much Mulch for Flower Beds? (U.S. Cubic Yards & Bags)",
    description:
      "U.S. homeowners guide to calculating mulch for flower beds: cubic yards formula, bag counts, depth tips, and what to buy before you spread.",
    keywords: [
      "how much mulch for flower beds",
      "mulch calculator flower bed",
      "how many bags of mulch for flower bed",
      "cubic yards of mulch flower bed",
      "mulch depth flower beds",
    ],
    readingTime: "8 min",
    updated: "2026-11-10",
    content: `
## The short answer

For most U.S. flower beds, plan on **2–3 inches** of mulch.

**Cubic yards = (area in square feet × depth in inches) ÷ 324**

Then convert to bags: multiply cubic yards by 27 for cubic feet, divide by bag size, and round up.

Use the [Mulch Calculator](/tools/mulch-calculator) for multi-bed estimates.
`.trim(),
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return guides.map((guide) => guide.slug);
}
