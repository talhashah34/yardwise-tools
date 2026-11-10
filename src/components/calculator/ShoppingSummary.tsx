import { LogoMark } from "@/components/brand/Logo";
import { mulchCopy } from "@/config/materials";
import {
  formatArea,
  formatCurrency,
  formatDepth,
  formatNumber,
  formatVolume,
} from "@/lib/utils/formatting";
import type {
  MaterialCopy,
  VolumeMaterialCalculationResult,
  VolumeMaterialCalculatorInput,
} from "@/types/calculator";

interface ShoppingSummaryProps {
  input: VolumeMaterialCalculatorInput;
  result: VolumeMaterialCalculationResult;
  copy?: MaterialCopy;
}

export function ShoppingSummary({
  input,
  result,
  copy = mulchCopy,
}: ShoppingSummaryProps) {
  const primaryVolume =
    input.unitSystem === "metric"
      ? `${formatNumber(result.volumeCubicMetres, { maximumFractionDigits: 3 })} m³`
      : `${formatNumber(result.volumeCubicYards, { maximumFractionDigits: 2 })} cu yd`;

  const estimateRows: Array<{ label: string; value: string }> = [
    {
      label: "Total garden area",
      value: formatArea(
        result.totalAreaSquareFeet,
        result.totalAreaSquareMetres,
        input.unitSystem,
      ),
    },
    {
      label: `Additional ${copy.name} depth`,
      value: formatDepth(result.additionalDepthInches, input.unitSystem),
    },
    {
      label: "Waste allowance",
      value: `${result.wasteAllowance}%`,
    },
    {
      label: "Estimated volume",
      value: formatVolume(
        result.volumeCubicYards,
        result.volumeCubicMetres,
        input.unitSystem,
      ),
    },
    {
      label: "Volume (cubic feet)",
      value: `${formatNumber(result.volumeCubicFeet, { maximumFractionDigits: 2 })} cu ft`,
    },
  ];

  if (result.volumeTons !== null) {
    estimateRows.push({
      label: "Approx. weight (tons)",
      value: `${formatNumber(result.volumeTons, { maximumFractionDigits: 2 })} tons`,
    });
  }
  if (result.volumeTonnes !== null) {
    estimateRows.push({
      label: "Approx. weight (tonnes)",
      value: `${formatNumber(result.volumeTonnes, { maximumFractionDigits: 2 })} tonnes`,
    });
  }

  estimateRows.push({
    label: "Shopping recommendation",
    value:
      result.purchaseRecommendation === "bagged"
        ? "Bagged"
        : result.purchaseRecommendation === "bulk"
          ? "Bulk"
          : "Bagged or bulk",
  });

  if (result.costs.baggedTotal !== null) {
    estimateRows.push({
      label: "Estimated bagged total",
      value: formatCurrency(result.costs.baggedTotal, input.currency),
    });
  }
  if (result.costs.bulkTotal !== null) {
    estimateRows.push({
      label: "Estimated bulk total",
      value: formatCurrency(result.costs.bulkTotal, input.currency),
    });
  }

  const unitLabel = input.unitSystem === "metric" ? "Metric" : "Imperial";
  const printedOn = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  const bagLabel = `${result.bagsRequired} × ${formatNumber(result.bagSizeCubicFeet, { maximumFractionDigits: 2 })} cu ft bags`;

  return (
    <div id="shopping-summary" className="print-sheet">
      <div className="print-sheet__header">
        <div className="print-sheet__brand">
          <LogoMark className="h-10 w-10" />
          <div>
            <p className="print-sheet__brand-name">Yardwise</p>
            <p className="print-sheet__brand-tag">
              Smarter planning for better outdoor spaces
            </p>
          </div>
        </div>
        <div className="print-sheet__meta">
          <p>{unitLabel}</p>
          <p suppressHydrationWarning>{printedOn}</p>
        </div>
      </div>

      <div className="print-sheet__title-block">
        <p className="print-sheet__eyebrow">Shopping summary</p>
        <h2 className="print-sheet__title">
          {copy.summaryTitle.replace(/^Yardwise\s+/, "")}
        </h2>
        <p className="print-sheet__subtitle">
          Planning estimate — verify quantities with your supplier before you buy.
        </p>
      </div>

      <section className="print-sheet__hero" aria-label="Primary estimate">
        <div className="print-sheet__hero-main">
          <p className="print-sheet__hero-label">{copy.requiredLabel}</p>
          <p className="print-sheet__hero-value">{primaryVolume}</p>
          <p className="print-sheet__hero-note">
            {formatNumber(result.volumeCubicFeet, { maximumFractionDigits: 2 })}{" "}
            cu ft · {result.wasteAllowance}% waste allowance
          </p>
        </div>
        <div className="print-sheet__purchase">
          <p className="print-sheet__purchase-label">Buy this many bags</p>
          <p className="print-sheet__purchase-value">{result.bagsRequired}</p>
          <p className="print-sheet__purchase-note">{bagLabel}</p>
        </div>
      </section>

      <section className="print-sheet__section">
        <h3 className="print-sheet__section-title">Material estimate</h3>
        <dl className="print-sheet__rows">
          {estimateRows.map((row) => (
            <div key={row.label} className="print-sheet__row">
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="print-sheet__section">
        <h3 className="print-sheet__section-title">Garden beds</h3>
        <ul className="print-sheet__rows">
          {result.beds.map((bed) => (
            <li key={bed.bedId} className="print-sheet__row">
              <span>{bed.name}</span>
              <span>
                {formatArea(
                  bed.areaSquareFeet,
                  bed.areaSquareMetres,
                  input.unitSystem,
                )}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="print-sheet__footer">
        <p>
          Generated by Yardwise. Estimates depend on the measurements you entered
          and may differ from supplier coverage charts.
        </p>
      </div>
    </div>
  );
}
