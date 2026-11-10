import { isFiniteNumber } from "@/lib/conversions/units";

export function parseOptionalNumber(raw: string): number | null {
  if (raw.trim() === "") return null;
  const value = Number(raw);
  if (!isFiniteNumber(value)) return null;
  return value;
}

export function isValidPositiveMeasurement(value: number | null | undefined): boolean {
  return isFiniteNumber(value) && value > 0;
}

export function isValidNonNegativeMeasurement(value: number | null | undefined): boolean {
  return isFiniteNumber(value) && value >= 0;
}

export function measurementError(
  value: number | null | undefined,
  label: string,
  { required = true, allowZero = false }: { required?: boolean; allowZero?: boolean } = {},
): string | null {
  if (value === null || value === undefined) {
    return required ? `Please enter a valid ${label}.` : null;
  }
  if (!isFiniteNumber(value)) {
    return `Please enter a valid ${label}.`;
  }
  if (value < 0) {
    return `${label.charAt(0).toUpperCase()}${label.slice(1)} cannot be negative.`;
  }
  if (!allowZero && value === 0 && required) {
    return `Please enter a valid ${label}.`;
  }
  return null;
}
