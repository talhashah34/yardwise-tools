export type GuideCategory =
  | "materials"
  | "outdoor"
  | "lawn"
  | "comparisons"
  | "home-decor"
  | "kitchen"
  | "planning";

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: GuideCategory;
  readingTime: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
  relatedTools?: { label: string; href: string }[];
};
