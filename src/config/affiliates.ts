/**
 * Amazon Associates config for Yardwise.
 * Tag: yardwise20-20
 * Replace any ASIN/URL anytime from Associates Central without redesigning the UI.
 */
export const AMAZON_ASSOCIATE_TAG = "yardwise20-20";

export type AffiliateProduct = {
  id: string;
  name: string;
  blurb: string;
  asin: string;
  collections?: Array<"mulch" | "soil" | "gravel" | "general">;
};

export const affiliateProducts: AffiliateProduct[] = [
  {
    id: "landscape-fabric",
    name: "ECOgardener Landscape Fabric (4ft \u00d7 50ft)",
    blurb: "Weed barrier under mulch beds so coverage lasts longer between top-ups.",
    asin: "B06W2J76W3",
    collections: ["mulch", "gravel", "general"],
  },
  {
    id: "fabric-pins",
    name: "Landscape Fabric Pins Kit (150 Pack)",
    blurb: "Secure weed barrier and edging fabric before you spread mulch or gravel.",
    asin: "B0FCRZXFHW",
    collections: ["mulch", "gravel", "general"],
  },
  {
    id: "soil-test-kit",
    name: "Luster Leaf Rapitest Soil Test Kit",
    blurb: "Quick pH and nutrient checks before you buy topsoil, compost, or fill.",
    asin: "B00BMAXMRA",
    collections: ["soil", "mulch", "general"],
  },
  {
    id: "measuring-wheel",
    name: "Zozen Measuring Wheel (feet & inches)",
    blurb: "Measure beds, paths, patios, and driveway lengths for accurate calculator inputs.",
    asin: "B07R9S71J7",
    collections: ["mulch", "soil", "gravel", "general"],
  },
];

export function amazonProductUrl(asin: string) {
  const url = new URL(`https://www.amazon.com/dp/${asin}`);
  url.searchParams.set("tag", AMAZON_ASSOCIATE_TAG);
  return url.toString();
}

export function productsForCollection(
  collection: NonNullable<AffiliateProduct["collections"]>[number],
) {
  return affiliateProducts.filter((product) =>
    product.collections?.includes(collection),
  );
}
