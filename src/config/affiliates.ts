export const AMAZON_ASSOCIATE_TAG = "yardwise20-20";

export type AffiliateCollection =
  | "mulch"
  | "soil"
  | "gravel"
  | "decor"
  | "kitchen"
  | "paint"
  | "general";

export type AffiliateProduct = {
  id: string;
  name: string;
  blurb: string;
  /** Amazon ASIN when available; otherwise a search keyword is used. */
  asin?: string;
  search?: string;
  collections: AffiliateCollection[];
};

export function amazonProductUrl(asin: string) {
  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_ASSOCIATE_TAG}`;
}

export function amazonSearchUrl(keyword: string) {
  return `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}&tag=${AMAZON_ASSOCIATE_TAG}`;
}

export function affiliateHref(product: AffiliateProduct) {
  if (product.asin) return amazonProductUrl(product.asin);
  return amazonSearchUrl(product.search ?? product.name);
}

export const affiliateProducts: AffiliateProduct[] = [
  {
    id: "landscape-fabric",
    name: "Landscape Fabric Weed Barrier",
    blurb: "Useful under rock or in static shrub beds before mulch goes down.",
    asin: "B06W2J76W3",
    collections: ["mulch", "gravel", "general"],
  },
  {
    id: "fabric-pins",
    name: "Landscape Fabric Pins",
    blurb: "Secure weed barrier and edging fabric so it stays put.",
    asin: "B0FCRZXFHW",
    collections: ["mulch", "gravel", "general"],
  },
  {
    id: "soil-test-kit",
    name: "Soil Test Kit",
    blurb: "Quick pH and nutrient checks before you buy topsoil or compost.",
    asin: "B00BMAXMRA",
    collections: ["soil", "mulch", "general"],
  },
  {
    id: "measuring-wheel",
    name: "Measuring Wheel",
    blurb: "Measure beds, paths, and driveway lengths for calculator inputs.",
    asin: "B07R9S71J7",
    collections: ["mulch", "soil", "gravel", "general"],
  },
  {
    id: "drawer-organizers",
    name: "Expandable Kitchen Drawer Organizers",
    blurb: "Create clean zones for utensils, gadgets, and junk-drawer chaos.",
    search: "expandable kitchen drawer organizer set",
    collections: ["kitchen", "general"],
  },
  {
    id: "clear-pantry-bins",
    name: "Clear Pantry Storage Bins",
    blurb: "Group snacks, baking supplies, and packets so shelves stay readable.",
    search: "clear pantry storage bins set",
    collections: ["kitchen", "general"],
  },
  {
    id: "turntable",
    name: "Lazy Susan Turntable",
    blurb: "Reach oils, sauces, and spices at the back of deep cabinets.",
    search: "kitchen lazy susan turntable organizer",
    collections: ["kitchen", "general"],
  },
  {
    id: "under-sink-caddy",
    name: "Under-Sink Sliding Organizer",
    blurb: "Use vertical space around plumbing for cleaners and sponges.",
    search: "under sink sliding cabinet organizer",
    collections: ["kitchen", "general"],
  },
  {
    id: "spice-rack",
    name: "Spice Rack / Drawer Insert",
    blurb: "Keep spices visible and labeled instead of stacked in a dark cabinet.",
    search: "spice rack organizer for cabinet or drawer",
    collections: ["kitchen", "general"],
  },
  {
    id: "shelf-risers",
    name: "Cabinet Shelf Risers",
    blurb: "Double vertical space for plates, mugs, and canned goods.",
    search: "kitchen cabinet shelf organizer riser",
    collections: ["kitchen", "general"],
  },
  {
    id: "curtain-rods",
    name: "Curtain Rods & Hardware",
    blurb: "Hang panels higher and wider for a taller-looking window.",
    search: "curtain rods for living room windows",
    collections: ["decor", "general"],
  },
  {
    id: "rug-pad",
    name: "Non-Slip Rug Pad",
    blurb: "Keeps area rugs safer and flatter under furniture traffic.",
    search: "non slip rug pad 8x10",
    collections: ["decor", "general"],
  },
  {
    id: "throw-pillows",
    name: "Throw Pillow Inserts & Covers",
    blurb: "Build layered sofa and bed arrangements without buying whole new pillows.",
    search: "throw pillow inserts and covers set",
    collections: ["decor", "general"],
  },
  {
    id: "picture-ledge",
    name: "Picture Ledges / Gallery Frames",
    blurb: "Plan gallery walls with flexible ledges or matching frame sets.",
    search: "picture ledge shelf and gallery frames",
    collections: ["decor", "general"],
  },
  {
    id: "paint-supplies",
    name: "Paint Roller & Tray Kit",
    blurb: "Basic kit for accent walls and room refreshes.",
    search: "paint roller tray kit interior walls",
    collections: ["paint", "decor", "general"],
  },
  {
    id: "painter-tape",
    name: "Painter’s Tape",
    blurb: "Cleaner accent-wall and trim lines with less touch-up work.",
    search: "painters tape blue interior",
    collections: ["paint", "decor", "general"],
  },
];

export function productsForCollection(collection: AffiliateCollection, limit = 3) {
  return affiliateProducts
    .filter((product) => product.collections.includes(collection))
    .slice(0, limit);
}

export function affiliateCollectionForGuide(slug: string, category: string): AffiliateCollection {
  if (category === "kitchen" || slug.includes("kitchen") || slug.includes("pantry") || slug.includes("spice") || slug.includes("fridge") || slug.includes("under-sink")) {
    return "kitchen";
  }
  if (category === "home-decor" || slug.includes("rug") || slug.includes("curtain") || slug.includes("pillow") || slug.includes("gallery") || slug.includes("bookshelf") || slug.includes("lighting") || slug.includes("coffee-table") || slug.includes("living-room")) {
    return "decor";
  }
  if (slug.includes("paint") || slug.includes("accent-wall")) return "paint";
  if (slug.includes("gravel") || slug.includes("driveway") || slug.includes("paver") || slug.includes("crushed") || slug.includes("pea")) {
    return "gravel";
  }
  if (slug.includes("topsoil") || slug.includes("compost") || slug.includes("soil") || slug.includes("fill-dirt") || slug.includes("sod") || slug.includes("raised")) {
    return "soil";
  }
  if (slug.includes("mulch") || slug.includes("fabric") || slug.includes("weed")) return "mulch";
  return "general";
}
