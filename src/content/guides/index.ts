export type { Guide } from "./types";
import { guidePart0 } from "./part0";
import { guidePart1 } from "./part1";
import { guidePart2 } from "./part2";

export const guides = [...guidePart0, ...guidePart1, ...guidePart2];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return guides.map((guide) => guide.slug);
}
