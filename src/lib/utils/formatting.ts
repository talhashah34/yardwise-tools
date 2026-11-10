import type { CurrencyCode, UnitSystem } from "@/types/calculator";

export function formatNumber(
  value: number,
  options: { maximumFractionDigits?: number; minimumFractionDigits?: number } = {},
): string {
  if (!Number.isFinite(value)) return "—";
  const { maximumFractionDigits = 2, minimumFractionDigits = 0 } = options;
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(value);
}

const CURRENCY_LOCALES: Record<CurrencyCode, string> = {
  USD: "en-US",
  GBP: "en-GB",
  CAD: "en-CA",
  AUD: "en-AU",
  EUR: "en-IE",
};

export function formatCurrency(value: number, currency: CurrencyCode): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat(CURRENCY_LOCALES[currency] ?? "en", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatArea(sqFt: number, sqM: number, unitSystem: UnitSystem): string {
  if (unitSystem === "metric") {
    return `${formatNumber(sqM, { maximumFractionDigits: 2 })} m²`;
  }
  return `${formatNumber(sqFt, { maximumFractionDigits: 2 })} sq ft`;
}

export function formatDepth(inches: number, unitSystem: UnitSystem): string {
  if (unitSystem === "metric") {
    const cm = inches * 2.54;
    return `${formatNumber(cm, { maximumFractionDigits: 1 })} cm`;
  }
  return `${formatNumber(inches, { maximumFractionDigits: 2 })} in`;
}

export function formatVolume(
  cubicYards: number,
  cubicMetres: number,
  unitSystem: UnitSystem,
): string {
  if (unitSystem === "metric") {
    return `${formatNumber(cubicMetres, { maximumFractionDigits: 3 })} m³`;
  }
  return `${formatNumber(cubicYards, { maximumFractionDigits: 2 })} cu yd`;
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return count === 1 ? singular : plural;
}
