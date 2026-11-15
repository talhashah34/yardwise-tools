export type { Guide, GuideCategory, GuideFaq } from "./types";
import { part0 } from "./part0";
import { part1 } from "./part1";
import { part2 } from "./part2";
import { part3 } from "./part3";
import { part4 } from "./part4";
import { part5 } from "./part5";
import { guideFaqs } from "./faqs";

function withFaqs<T extends { slug: string; faqs?: import("./types").GuideFaq[] }>(guide: T): T {
  if (guide.faqs?.length) return guide;
  const faqs = guideFaqs[guide.slug];
  return faqs ? { ...guide, faqs } : guide;
}

export const guides = [...part0, ...part1, ...part2, ...part3, ...part4, ...part5].map(withFaqs);

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return guides.map((guide) => guide.slug);
}

export function getGuidesByCategory(category: import("./types").GuideCategory) {
  return guides.filter((guide) => guide.category === category);
}

export function getRelatedGuides(slug: string, limit = 6) {
  const current = getGuide(slug);
  if (!current) return [];
  const sameCategory = guides.filter(
    (guide) => guide.slug !== slug && guide.category === current.category,
  );
  const others = guides.filter(
    (guide) => guide.slug !== slug && guide.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
