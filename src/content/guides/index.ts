import { part0 } from "./part0";
import { part1 } from "./part1";
import { part2 } from "./part2";
import { part3 } from "./part3";
import { part4 } from "./part4";
import { part5 } from "./part5";
import type { Guide, GuideCategory } from "./types";

export type { Guide, GuideCategory } from "./types";
export { guideFaqs, type GuideFaq } from "./faqs";

export const guides: Guide[] = [...part0, ...part1, ...part2, ...part3, ...part4, ...part5];

const bySlug = new Map(guides.map((guide) => [guide.slug, guide]));

export function getGuide(slug: string) {
  return bySlug.get(slug);
}

export function getGuidesByCategory(category: GuideCategory) {
  return guides.filter((guide) => guide.category === category);
}

export function getFeaturedGuides(limit = 6) {
  return guides.slice(0, limit);
}

export function getComparisonGuides() {
  return guides.filter((guide) => guide.category === "comparisons");
}

export function getRelatedGuides(slug: string, limit = 4) {
  const current = bySlug.get(slug);
  if (!current) return guides.filter((g) => g.slug !== slug).slice(0, limit);

  const sameCategory = guides.filter(
    (g) => g.slug !== slug && g.category === current.category,
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const rest = guides.filter(
    (g) => g.slug !== slug && g.category !== current.category,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}
