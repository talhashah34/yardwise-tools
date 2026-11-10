import { cmToInches, feetToMetres, inchesToCm, metresToFeet } from "@/lib/conversions/units";
import type { GardenBed, UnitSystem } from "@/types/calculator";

function convertOptional(
  value: number | null,
  convert: (n: number) => number,
): number | null {
  if (value === null || !Number.isFinite(value)) return value;
  return Number(convert(value).toFixed(4));
}

export function convertLinearMeasurement(
  value: number | null,
  from: UnitSystem,
  to: UnitSystem,
): number | null {
  if (from === to) return value;
  if (from === "imperial" && to === "metric") {
    return convertOptional(value, feetToMetres);
  }
  return convertOptional(value, metresToFeet);
}

export function convertDepthMeasurement(
  value: number | null,
  from: UnitSystem,
  to: UnitSystem,
): number | null {
  if (from === to) return value;
  if (from === "imperial" && to === "metric") {
    return convertOptional(value, inchesToCm);
  }
  return convertOptional(value, cmToInches);
}

export function convertBedMeasurements(
  bed: GardenBed,
  from: UnitSystem,
  to: UnitSystem,
): GardenBed {
  if (from === to) return bed;
  return {
    ...bed,
    length: convertLinearMeasurement(bed.length, from, to),
    width: convertLinearMeasurement(bed.width, from, to),
    diameter: convertLinearMeasurement(bed.diameter, from, to),
    height: convertLinearMeasurement(bed.height, from, to),
  };
}
