/** Conversion constants used across landscaping material calculators. */

export const SQ_FT_PER_SQ_M = 1 / 0.09290304;
export const SQ_M_PER_SQ_FT = 0.09290304;
export const INCHES_PER_FOOT = 12;
export const CM_PER_INCH = 2.54;
export const CM_PER_METRE = 100;
export const CUBIC_FEET_PER_CUBIC_YARD = 27;
export const LITRES_PER_CUBIC_METRE = 1000;

/** Imperial rule of thumb: sq ft × depth inches / 324 = cubic yards */
export const IMPERIAL_VOLUME_DIVISOR = 324;

export function feetToMetres(feet: number): number {
  return feet * 0.3048;
}

export function metresToFeet(metres: number): number {
  return metres / 0.3048;
}

export function inchesToCm(inches: number): number {
  return inches * CM_PER_INCH;
}

export function cmToInches(cm: number): number {
  return cm / CM_PER_INCH;
}

export function inchesToMetres(inches: number): number {
  return inches * CM_PER_INCH / CM_PER_METRE;
}

export function metresToInches(metres: number): number {
  return (metres * CM_PER_METRE) / CM_PER_INCH;
}

export function squareFeetToSquareMetres(sqFt: number): number {
  return sqFt * SQ_M_PER_SQ_FT;
}

export function squareMetresToSquareFeet(sqM: number): number {
  return sqM * SQ_FT_PER_SQ_M;
}

export function cubicYardsToCubicFeet(cubicYards: number): number {
  return cubicYards * CUBIC_FEET_PER_CUBIC_YARD;
}

export function cubicFeetToCubicYards(cubicFeet: number): number {
  return cubicFeet / CUBIC_FEET_PER_CUBIC_YARD;
}

export function cubicMetresToCubicYards(cubicMetres: number): number {
  return cubicMetres / 0.764554857984;
}

export function cubicYardsToCubicMetres(cubicYards: number): number {
  return cubicYards * 0.764554857984;
}

export function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export function clampNonNegative(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return value;
}
