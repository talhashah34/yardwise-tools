import {
  CUBIC_FEET_PER_CUBIC_YARD,
  clampNonNegative,
  cmToInches,
  cubicYardsToCubicMetres,
  isFiniteNumber,
  squareFeetToSquareMetres,
} from "@/lib/conversions/units";
import {
  applyWasteAllowance,
  calculateBagsRequired,
  calculateBedAreaInInputUnits,
  calculateCosts,
  calculateVolumeCubicYards,
  normalizeBedAreaToSquareFeet,
} from "@/lib/calculations/mulch";
import type {
  BedAreaResult,
  BedShape,
  GardenBed,
  MulchCostResult,
  UnitSystem,
  VolumeMaterialCalculationResult,
  VolumeMaterialCalculatorInput,
  WasteAllowance,
} from "@/types/calculator";

export interface VolumeMaterialConfig {
  materialName: string;
  /** Default bag size when input is null/invalid */
  defaultBagSizeCubicFeet: number;
  depthNoun?: string;
  /** Approximate US short tons per cubic yard (loose material) */
  tonsPerCubicYard?: number;
  /** Approximate metric tonnes per cubic metre */
  tonnesPerCubicMetre?: number;
  /** Volume (cu yd) at/above which bulk delivery is usually simpler */
  bulkVolumeThresholdCubicYards?: number;
}

export function recommendPurchaseOption(options: {
  volumeCubicYards: number;
  bagsRequired: number;
  costs: MulchCostResult;
  bulkVolumeThresholdCubicYards?: number;
  materialName: string;
}): { recommendation: "bagged" | "bulk" | "either"; reason: string } {
  const threshold = options.bulkVolumeThresholdCubicYards ?? 1;
  const { costs, volumeCubicYards, bagsRequired, materialName } = options;

  if (costs.cheaperOption === "bagged" && costs.savings !== null) {
    return {
      recommendation: "bagged",
      reason: `Based on the prices you entered, bagged ${materialName} looks lower cost for this job.`,
    };
  }
  if (costs.cheaperOption === "bulk" && costs.savings !== null) {
    return {
      recommendation: "bulk",
      reason: `Based on the prices you entered, bulk ${materialName} looks lower cost for this job.`,
    };
  }
  if (costs.cheaperOption === "same") {
    return {
      recommendation: "either",
      reason: "Bagged and bulk estimate to about the same total with the prices you entered.",
    };
  }

  if (volumeCubicYards >= threshold || bagsRequired >= 20) {
    return {
      recommendation: "bulk",
      reason: `At about ${volumeCubicYards.toFixed(2)} cubic yards, bulk delivery is usually simpler than hauling many bags.`,
    };
  }

  return {
    recommendation: "bagged",
    reason: `For smaller jobs like this, bagged ${materialName} is often easier to transport and store.`,
  };
}

function bedHasUsableDimensions(bed: GardenBed): boolean {
  switch (bed.shape as BedShape) {
    case "rectangle":
      return (bed.length ?? 0) > 0 && (bed.width ?? 0) > 0;
    case "circle":
      return (bed.diameter ?? 0) > 0;
    case "triangle":
      return (bed.length ?? 0) > 0 && (bed.height ?? 0) > 0;
    default:
      return false;
  }
}

export function calculateAdditionalMaterialDepthInches(
  desiredDepth: number,
  existingDepth: number,
  unitSystem: UnitSystem,
  materialName: string,
): {
  additionalDepthInches: number;
  desiredDepthInches: number;
  existingDepthInches: number;
  warning: string | null;
} {
  const desiredDepthInches =
    unitSystem === "metric"
      ? cmToInches(clampNonNegative(desiredDepth))
      : clampNonNegative(desiredDepth);
  const existingDepthInches =
    unitSystem === "metric"
      ? cmToInches(clampNonNegative(existingDepth))
      : clampNonNegative(existingDepth);

  const raw = desiredDepthInches - existingDepthInches;
  if (raw < 0) {
    return {
      additionalDepthInches: 0,
      desiredDepthInches,
      existingDepthInches,
      warning: `Your desired depth is less than the existing ${materialName} depth. No additional ${materialName} is required.`,
    };
  }

  return {
    additionalDepthInches: raw,
    desiredDepthInches,
    existingDepthInches,
    warning: null,
  };
}

export function calculateVolumeMaterial(
  input: VolumeMaterialCalculatorInput,
  config: VolumeMaterialConfig,
): VolumeMaterialCalculationResult {
  const materialName = config.materialName;
  const errors: string[] = [];
  const usableBeds = input.beds.filter(bedHasUsableDimensions);

  if (usableBeds.length === 0) {
    errors.push("Add at least one garden bed to calculate your material requirements.");
  }

  const bedResults: BedAreaResult[] = input.beds.map((bed) => {
    const areaInputUnits = calculateBedAreaInInputUnits(bed);
    const areaSquareFeet = normalizeBedAreaToSquareFeet(areaInputUnits, input.unitSystem);
    return {
      bedId: bed.id,
      name: bed.name,
      areaSquareFeet,
      areaSquareMetres: squareFeetToSquareMetres(areaSquareFeet),
    };
  });

  const totalAreaSquareFeet = bedResults.reduce((sum, bed) => sum + bed.areaSquareFeet, 0);
  const totalAreaSquareMetres = squareFeetToSquareMetres(totalAreaSquareFeet);

  const desiredDepth = input.desiredDepth ?? 0;
  const existingDepth = input.existingDepth ?? 0;

  if (input.desiredDepth === null || input.desiredDepth < 0 || !isFiniteNumber(desiredDepth)) {
    errors.push(`Please enter a valid desired ${materialName} depth.`);
  }

  const depth = calculateAdditionalMaterialDepthInches(
    desiredDepth,
    existingDepth,
    input.unitSystem,
    materialName,
  );

  const baseVolumeCubicYards = calculateVolumeCubicYards(
    totalAreaSquareFeet,
    depth.additionalDepthInches,
  );
  const wasteAllowance = input.wasteAllowance as WasteAllowance;
  const volumeCubicYards = applyWasteAllowance(baseVolumeCubicYards, wasteAllowance);
  const volumeCubicFeet = volumeCubicYards * CUBIC_FEET_PER_CUBIC_YARD;
  const volumeCubicMetres = cubicYardsToCubicMetres(volumeCubicYards);
  const baseVolumeCubicFeet = baseVolumeCubicYards * CUBIC_FEET_PER_CUBIC_YARD;
  const baseVolumeCubicMetres = cubicYardsToCubicMetres(baseVolumeCubicYards);

  const bagSizeCubicFeet =
    isFiniteNumber(input.bagSizeCubicFeet) && (input.bagSizeCubicFeet as number) > 0
      ? (input.bagSizeCubicFeet as number)
      : config.defaultBagSizeCubicFeet;

  if (
    input.bagSizeCubicFeet !== null &&
    (input.bagSizeCubicFeet <= 0 || !isFiniteNumber(input.bagSizeCubicFeet))
  ) {
    errors.push("Please enter a valid bag size.");
  }

  const { exactBags, bagsRequired } = calculateBagsRequired(volumeCubicFeet, bagSizeCubicFeet);

  const costs: MulchCostResult = calculateCosts({
    bagsRequired,
    volumeCubicYards,
    pricePerBag: input.pricePerBag,
    pricePerCubicYard: input.pricePerCubicYard,
    deliveryFee: input.deliveryFee,
  });

  const volumeTons =
    typeof config.tonsPerCubicYard === "number"
      ? volumeCubicYards * config.tonsPerCubicYard
      : null;
  const volumeTonnes =
    typeof config.tonnesPerCubicMetre === "number"
      ? volumeCubicMetres * config.tonnesPerCubicMetre
      : null;

  const purchase = recommendPurchaseOption({
    volumeCubicYards,
    bagsRequired,
    costs,
    bulkVolumeThresholdCubicYards: config.bulkVolumeThresholdCubicYards,
    materialName,
  });

  return {
    beds: bedResults,
    totalAreaSquareFeet,
    totalAreaSquareMetres,
    desiredDepthInches: depth.desiredDepthInches,
    existingDepthInches: depth.existingDepthInches,
    additionalDepthInches: depth.additionalDepthInches,
    depthWarning: depth.warning,
    baseVolumeCubicYards,
    baseVolumeCubicFeet,
    baseVolumeCubicMetres,
    wasteAllowance,
    volumeCubicYards,
    volumeCubicFeet,
    volumeCubicMetres,
    volumeTons,
    volumeTonnes,
    bagSizeCubicFeet,
    exactBags,
    bagsRequired,
    costs,
    purchaseRecommendation: purchase.recommendation,
    purchaseRecommendationReason: purchase.reason,
    hasValidBeds: usableBeds.length > 0,
    errors,
  };
}
