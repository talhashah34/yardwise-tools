import { formatCurrency, formatNumber } from "@/lib/utils/formatting";
import type {
  CurrencyCode,
  MulchCostResult,
  UnitSystem,
} from "@/types/calculator";

interface CostComparisonProps {
  costs: MulchCostResult;
  currency: CurrencyCode;
  bagsRequired: number;
  volumeCubicYards: number;
  volumeCubicMetres?: number;
  unitSystem?: UnitSystem;
}

export function CostComparison({
  costs,
  currency,
  bagsRequired,
  volumeCubicYards,
  volumeCubicMetres = 0,
  unitSystem = "imperial",
}: CostComparisonProps) {
  const hasBag = costs.baggedTotal !== null;
  const hasBulk = costs.bulkTotal !== null;

  if (!hasBag && !hasBulk) return null;

  const bulkVolumeLabel =
    unitSystem === "metric"
      ? `${formatNumber(volumeCubicMetres, { maximumFractionDigits: 3 })} m³`
      : `${formatNumber(volumeCubicYards, { maximumFractionDigits: 2 })} cu yd`;

  return (
    <section className="rounded-[14px] border border-border bg-subtle/50 p-4">
      <h3 className="font-[family-name:var(--font-manrope)] text-base font-semibold text-deep-green">
        Cost comparison
      </h3>
      <p className="mt-1 text-xs text-text-muted">
        Estimates only — based on the prices you entered (any currency).
      </p>

      <dl className="mt-4 space-y-3 text-sm">
        {hasBag ? (
          <div className="flex items-start justify-between gap-4">
            <dt className="text-text-secondary">
              Bagged ({bagsRequired} bags)
              {costs.deliveryFee > 0 ? (
                <span className="block text-xs">
                  Materials {formatCurrency(costs.baggedSubtotal ?? 0, currency)} +
                  delivery
                </span>
              ) : null}
            </dt>
            <dd className="font-semibold text-text">
              {formatCurrency(costs.baggedTotal ?? 0, currency)}
            </dd>
          </div>
        ) : null}

        {hasBulk ? (
          <div className="flex items-start justify-between gap-4">
            <dt className="text-text-secondary">
              Bulk ({bulkVolumeLabel})
              {costs.deliveryFee > 0 ? (
                <span className="block text-xs">
                  Materials {formatCurrency(costs.bulkSubtotal ?? 0, currency)} +
                  delivery
                </span>
              ) : null}
            </dt>
            <dd className="font-semibold text-text">
              {formatCurrency(costs.bulkTotal ?? 0, currency)}
            </dd>
          </div>
        ) : null}

        {costs.cheaperOption && costs.savings !== null ? (
          <div className="border-t border-border pt-3 text-sm">
            {costs.cheaperOption === "same" ? (
              <p className="text-text-secondary">
                Both options estimate to about the same total.
              </p>
            ) : (
              <p className="text-forest">
                {costs.cheaperOption === "bulk" ? "Bulk" : "Bagged"} looks lower by{" "}
                <span className="font-semibold">
                  {formatCurrency(costs.savings, currency)}
                </span>{" "}
                including delivery.
              </p>
            )}
          </div>
        ) : null}
      </dl>
    </section>
  );
}
