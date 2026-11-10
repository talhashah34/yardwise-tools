import {
  IMPERIAL_VOLUME_DIVISOR,
  clampNonNegative,
  cmToInches,
  isFiniteNumber,
  squareMetresToSquareFeet,
} from "@/lib/conversions/units";
import type {
  GardenBed,
  MulchCostResult,
  UnitSystem,
  WasteAllowance,
} from "@/types/calculator";

export function calculateRectangleArea(length: number, width: number): number {
  if (!isFiniteNumber(length) || !isFiniteNumber(width) || length < 0 || width < 0) {
    return 0;
  }
  return length * width;
}

export function calculateCircleArea(diameter: number): number {
  if (!isFiniteNumber(diameter) || diameter < 0) return 0;
  const radius = diameter / 2;
  return Math.PI * radius * radius;
}

export function calculateTriangleArea(base: number, height: number): number {
  if (!isFiniteNumber(base) || !isFiniteNumber(height) || base < 0 || height < 0) {
    return 0;
  }
  return (base * height) / 2;
}

export function calculateBedAreaInInputUnits(bed: GardenBed): number {
  switch (bed.shape) {
    case "rectangle":
      return calculateRectangleArea(bed.length ?? 0, bed.width ?? 0);
    case "circle":
      return calculateCircleArea(bed.diameter ?? 0);
    case "triangle":
      return calculateTriangleArea(bed.length ?? 0, bed.height ?? 0);
    default:
      return 0;
  }
}

export function normalizeBedAreaToSquareFeet(
  area: number,
  unitSystem: UnitSystem,
): number {
  if (!isFiniteNumber(area) || area < 0) return 0;
  return unitSystem === "metric" ? squareMetresToSquareFeet(area) : area;
}

export function calculateAdditionalDepthInches(
  desiredDepth: number,
  existingDepth: number,
  unitSystem: UnitSystem,
): { additionalDepthInches: number; desiredDepthInches: number; existingDepthInches: number; warning: string | null } {
  const desiredDepthInches =
    unitSystem === "metric" ? cmToInches(clampNonNegative(desiredDepth)) : clampNonNegative(desiredDepth);
  const existingDepthInches =
    unitSystem === "metric" ? cmToInches(clampNonNegative(existingDepth)) : clampNonNegative(existingDepth);

  const raw = desiredDepthInches - existingDepthInches;
  if (raw < 0) {
    return {
      additionalDepthInches: 0,
      desiredDepthInches,
      existingDepthInches,
      warning:
        "Your desired depth is less than the existing mulch depth. No additional mulch is required.",
    };
  }

  return {
    additionalDepthInches: raw,
    desiredDepthInches,
    existingDepthInches,
    warning: null,
  };
}

/**
 * Volume in cubic yards from area (sq ft) and depth (inches).
 * Formula: area × depth / 324
 */
export function calculateVolumeCubicYards(areaSquareFeet: number, depthInches: number): number {
  if (!isFiniteNumber(areaSquareFeet) || !isFiniteNumber(depthInches)) return 0;
  if (areaSquareFeet <= 0 || depthInches <= 0) return 0;
  return (areaSquareFeet * depthInches) / IMPERIAL_VOLUME_DIVISOR;
}

/**
 * Volume in cubic metres from area (m²) and depth (metres).
 */
export function calculateVolumeCubicMetres(areaSquareMetres: number, depthMetres: number): number {
  if (!isFiniteNumber(areaSquareMetres) || !isFiniteNumber(depthMetres)) return 0;
  if (areaSquareMetres <= 0 || depthMetres <= 0) return 0;
  return areaSquareMetres * depthMetres;
}

export function applyWasteAllowance(volume: number, wastePercent: WasteAllowance): number {
  if (!isFiniteNumber(volume) || volume < 0) return 0;
  return volume * (1 + wastePercent / 100);
}

export function calculateBagsRequired(
  volumeCubicFeet: number,
  bagSizeCubicFeet: number,
): { exactBags: number; bagsRequired: number } {
  if (!isFiniteNumber(volumeCubicFeet) || !isFiniteNumber(bagSizeCubicFeet)) {
    return { exactBags: 0, bagsRequired: 0 };
  }
  if (volumeCubicFeet <= 0 || bagSizeCubicFeet <= 0) {
    return { exactBags: 0, bagsRequired: 0 };
  }
  const exactBags = volumeCubicFeet / bagSizeCubicFeet;
  // Snap near-integers before ceil so floating-point noise (e.g. 55.000000001)
  // does not inflate a mathematically whole bag count.
  const roundedExact = Number(exactBags.toFixed(10));
  return {
    exactBags,
    bagsRequired: Math.ceil(roundedExact - Number.EPSILON),
  };
}

export function calculateCosts({
  bagsRequired,
  volumeCubicYards,
  pricePerBag,
  pricePerCubicYard,
  deliveryFee,
}: {
  bagsRequired: number;
  volumeCubicYards: number;
  pricePerBag: number | null;
  pricePerCubicYard: number | null;
  deliveryFee: number | null;
}): MulchCostResult {
  const delivery = isFiniteNumber(deliveryFee) && deliveryFee > 0 ? deliveryFee : 0;
  const hasBagPrice = isFiniteNumber(pricePerBag) && pricePerBag >= 0;
  const hasBulkPrice = isFiniteNumber(pricePerCubicYard) && pricePerCubicYard >= 0;

  const baggedSubtotal = hasBagPrice ? bagsRequired * (pricePerBag as number) : null;
  const bulkSubtotal = hasBulkPrice ? volumeCubicYards * (pricePerCubicYard as number) : null;

  const baggedTotal = baggedSubtotal === null ? null : baggedSubtotal + delivery;
  const bulkTotal = bulkSubtotal === null ? null : bulkSubtotal + delivery;

  let savings: number | null = null;
  let cheaperOption: MulchCostResult["cheaperOption"] = null;

  if (baggedTotal !== null && bulkTotal !== null) {
    const diff = baggedTotal - bulkTotal;
    savings = Math.abs(diff);
    if (Math.abs(diff) < 0.005) cheaperOption = "same";
    else cheaperOption = diff > 0 ? "bulk" : "bagged";
  }

  return {
    baggedSubtotal,
    bulkSubtotal,
    deliveryFee: delivery,
    baggedTotal,
    bulkTotal,
    savings,
    cheaperOption,
  };
}

export function createDefaultBed(index = 1, stableId?: string): GardenBed {
  return {
    id: stableId ?? `bed-${index}-${Date.now().toString(36)}`,
    name: `Garden Bed ${index}`,
    shape: "rectangle",
    length: null,
    width: null,
    diameter: null,
    height: null,
  };
}
