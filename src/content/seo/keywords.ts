export type KeywordCluster = {
  pillar: string;
  shortTail: string[];
  longTail: string[];
  primarySlug?: string;
};

/** High-intent clusters for Yardwise on-page targeting + off-page pin/copy. */
export const keywordClusters: KeywordCluster[] = [
  {
    pillar: "Mulch planning",
    shortTail: ["mulch calculator", "how much mulch", "mulch vs gravel", "mulch vs rocks"],
    longTail: [
      "how much mulch do I need for flower beds",
      "mulch vs gravel for landscaping",
      "bark mulch vs wood chips which is better",
      "how deep should mulch be in garden beds",
    ],
    primarySlug: "mulch-vs-gravel",
  },
  {
    pillar: "Soil & fill",
    shortTail: ["fill dirt vs topsoil", "topsoil calculator", "compost vs topsoil"],
    longTail: [
      "fill dirt vs topsoil for leveling yard",
      "compost vs topsoil vs potting mix differences",
      "how much topsoil do I need for a new lawn",
    ],
    primarySlug: "fill-dirt-vs-topsoil",
  },
  {
    pillar: "Gravel & driveway",
    shortTail: ["gravel calculator", "gravel vs asphalt", "pea gravel vs river rock"],
    longTail: [
      "gravel vs asphalt driveway cost comparison",
      "how deep should a gravel driveway be",
      "crushed stone vs pea gravel for walkway",
      "river rock vs pea gravel which is better",
    ],
    primarySlug: "gravel-vs-asphalt-driveway",
  },
  {
    pillar: "Window treatments",
    shortTail: ["curtains vs blinds", "blackout curtains", "window treatments"],
    longTail: [
      "blackout curtains vs regular curtains for bedroom",
      "curtains vs blinds for living room privacy",
      "how long should curtains be for 8 foot ceilings",
    ],
    primarySlug: "blackout-curtains-vs-regular-curtains",
  },
  {
    pillar: "Rugs & flooring",
    shortTail: ["rug size", "area rug vs carpet", "hardwood vs laminate"],
    longTail: [
      "what size rug for living room sofa",
      "hardwood vs laminate flooring pros and cons",
      "area rug vs wall to wall carpet for bedroom",
    ],
    primarySlug: "hardwood-vs-laminate-flooring",
  },
  {
    pillar: "Kitchen organization",
    shortTail: ["pantry organization", "kitchen drawer organizers", "kitchen cabinets"],
    longTail: [
      "pantry organization bins vs baskets",
      "kitchen drawer organizers vs dividers",
      "open shelving vs cabinets in kitchen",
      "best way to organize pots and pans in cabinets",
    ],
    primarySlug: "open-shelving-vs-cabinets",
  },
  {
    pillar: "Paint & walls",
    shortTail: ["accent wall", "paint vs wallpaper", "how much paint"],
    longTail: [
      "paint vs wallpaper for living room accent wall",
      "how much paint do I need for a 12x12 room",
      "warm vs cool paint colors for north facing room",
    ],
    primarySlug: "paint-vs-wallpaper",
  },
  {
    pillar: "Outdoor surfaces",
    shortTail: ["gravel vs pavers", "sod vs seed", "fence post spacing"],
    longTail: [
      "gravel vs pavers for patio cost and maintenance",
      "sod vs seed which is cheaper for new lawn",
      "cedar vs pressure treated fence posts which lasts longer",
    ],
    primarySlug: "cedar-vs-pressure-treated-fence",
  },
];
