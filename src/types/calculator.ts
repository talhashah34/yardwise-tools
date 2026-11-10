export type UnitSystem = "imperial" | "metric";

export type BedShape = "rectangle" | "circle" | "triangle";

export type CurrencyCode = "USD" | "GBP" | "CAD" | "AUD" | "EUR";

export type WasteAllowance = 0 | 5 | 10 | 15;

export type PurchaseMode = "bagged" | "bulk" | "both";

export interface GardenBed {
  id: string;
  name: string;
  shape: BedShape;
  /** Length (rectangle) or base (triangle) — imperial: feet, metric: metres */
  length: number | null;
  /** Width (rectangle) or unused for circle — imperial: feet, metric: metres */
  width: number | null;
  /** Diameter for circle — imperial: feet, metric: metres */
  diameter: number | null;
  /** Height for triangle — imperial: feet, metric: metres */
  height: number | null;
}

export interface VolumeMaterialCalculatorInput {
  unitSystem: UnitSystem;
  beds: GardenBed[];
  /** Desired material depth — imperial: inches, metric: centimetres */
  desiredDepth: number | null;
  /** Existing material depth — imperial: inches, metric: centimetres */
  existingDepth: number | null;
  purchaseMode: PurchaseMode;
  bagSizeCubicFeet: number | null;
  pricePerBag: number | null;
  pricePerCubicYard: number | null;
  deliveryFee: number | null;
  currency: CurrencyCode;
  wasteAllowance: WasteAllowance;
}

/** @deprecated Prefer VolumeMaterialCalculatorInput — kept for mulch-specific naming. */
export type MulchCalculatorInput = VolumeMaterialCalculatorInput;

export interface BedAreaResult {
  bedId: string;
  name: string;
  areaSquareFeet: number;
  areaSquareMetres: number;
}

export interface VolumeMaterialCostResult {
  baggedSubtotal: number | null;
  bulkSubtotal: number | null;
  deliveryFee: number;
  baggedTotal: number | null;
  bulkTotal: number | null;
  savings: number | null;
  cheaperOption: "bagged" | "bulk" | "same" | null;
}

export type MulchCostResult = VolumeMaterialCostResult;

export type PurchaseRecommendation = "bagged" | "bulk" | "either";

export interface VolumeMaterialCalculationResult {
  beds: BedAreaResult[];
  totalAreaSquareFeet: number;
  totalAreaSquareMetres: number;
  desiredDepthInches: number;
  existingDepthInches: number;
  additionalDepthInches: number;
  depthWarning: string | null;
  baseVolumeCubicYards: number;
  baseVolumeCubicFeet: number;
  baseVolumeCubicMetres: number;
  wasteAllowance: WasteAllowance;
  volumeCubicYards: number;
  volumeCubicFeet: number;
  volumeCubicMetres: number;
  /** Approximate short tons (US), when a density is configured */
  volumeTons: number | null;
  /** Approximate metric tonnes, when a density is configured */
  volumeTonnes: number | null;
  bagSizeCubicFeet: number;
  exactBags: number;
  bagsRequired: number;
  costs: VolumeMaterialCostResult;
  purchaseRecommendation: PurchaseRecommendation;
  purchaseRecommendationReason: string;
  hasValidBeds: boolean;
  errors: string[];
}

export type MulchCalculationResult = VolumeMaterialCalculationResult;

export interface MaterialCopy {
  id: string;
  name: string;
  title: string;
  description: string;
  requiredLabel: string;
  depthTooltip: string;
  wasteTooltip: string;
  bagSizeHint: string;
  summaryTitle: string;
  /** Short SEO/formula blurb shown near results */
  formulaBlurb: string;
  /** One-line buy guidance when prices are missing */
  buyHint: string;
}
