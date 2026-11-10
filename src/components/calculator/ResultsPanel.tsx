"use client";

import { CostComparison } from "@/components/calculator/CostComparison";
import { Button } from "@/components/ui/Button";
import { mulchCopy } from "@/config/materials";
import {
  formatArea,
  formatDepth,
  formatNumber,
  formatVolume,
} from "@/lib/utils/formatting";
import type {
  MaterialCopy,
  VolumeMaterialCalculationResult,
  VolumeMaterialCalculatorInput,
} from "@/types/calculator";
import { useState } from "react";

interface ResultsPanelProps {
  input: VolumeMaterialCalculatorInput;
  result: VolumeMaterialCalculationResult;
  onReset: () => void;
  onPrint?: () => void;
  copy?: MaterialCopy;
}

export function ResultsPanel({
  input,
  result,
  onReset,
  onPrint,
  copy = mulchCopy,
}: ResultsPanelProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  const primaryVolume =
    input.unitSystem === "metric"
      ? `${formatNumber(result.volumeCubicMetres, { maximumFractionDigits: 3 })} m³`
      : `${formatNumber(result.volumeCubicYards, { maximumFractionDigits: 2 })} cu yd`;

  const weightLabel =
    input.unitSystem === "metric"
      ? result.volumeTonnes !== null
        ? `${formatNumber(result.volumeTonnes, { maximumFractionDigits: 2 })} tonnes`
        : null
      : result.volumeTons !== null
        ? `${formatNumber(result.volumeTons, { maximumFractionDigits: 2 })} tons`
        : null;

  const recommendationLabel =
    result.purchaseRecommendation === "bagged"
      ? "Buy bagged"
      : result.purchaseRecommendation === "bulk"
        ? "Buy bulk"
        : "Bagged or bulk";

  const handleCopy = async () => {
    const summary = buildPlainTextSummary(input, result, copy);
    try {
      await navigator.clipboard.writeText(summary);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      setCopyStatus("error");
      window.setTimeout(() => setCopyStatus("idle"), 2500);
    }
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
      return;
    }
    window.print();
  };

  return (
    <aside
      className="rounded-[20px] border border-border bg-card p-5 shadow-[var(--shadow-md)] md:p-6"
      aria-live="polite"
    >
      <div className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-clay">
            {copy.requiredLabel}
          </p>
          <p className="mt-2 font-[family-name:var(--font-manrope)] text-4xl font-bold tracking-tight text-deep-green">
            {result.hasValidBeds ? primaryVolume : "—"}
          </p>
          <p className="mt-2 text-sm text-text-secondary">
            Exact calculated quantity before purchase rounding.
          </p>
        </div>

        {result.hasValidBeds ? (
          <div className="rounded-[14px] border border-forest/20 bg-[#eef4ef] px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-forest">
              Shopping recommendation
            </p>
            <p className="mt-1 font-[family-name:var(--font-manrope)] text-lg font-bold text-deep-green">
              {recommendationLabel}
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              {result.purchaseRecommendationReason || copy.buyHint}
            </p>
          </div>
        ) : null}

        {result.errors.length > 0 ? (
          <div
            className="rounded-[8px] border border-clay/30 bg-[#fdf6f1] px-3 py-2 text-sm text-[#8a4b2d]"
            role="status"
          >
            {result.errors[0]}
          </div>
        ) : null}

        {result.depthWarning ? (
          <div
            className="rounded-[8px] border border-gold/40 bg-sand/60 px-3 py-2 text-sm text-text"
            role="status"
          >
            {result.depthWarning}
          </div>
        ) : null}

        <dl className="grid gap-3 rounded-[14px] bg-subtle/70 p-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-text-secondary">Cubic feet</dt>
            <dd className="font-semibold text-text">
              {formatNumber(result.volumeCubicFeet, { maximumFractionDigits: 2 })} cu ft
            </dd>
          </div>
          {weightLabel ? (
            <div className="flex justify-between gap-4">
              <dt className="text-text-secondary">Approx. weight</dt>
              <dd className="font-semibold text-text">{weightLabel}</dd>
            </div>
          ) : null}
          <div className="flex justify-between gap-4">
            <dt className="text-text-secondary">
              Bags to buy (
              {formatNumber(result.bagSizeCubicFeet, { maximumFractionDigits: 2 })} cu ft)
            </dt>
            <dd className="font-semibold text-text">{result.bagsRequired}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-text-secondary">Exact bag quantity</dt>
            <dd className="text-text-secondary">
              {formatNumber(result.exactBags, { maximumFractionDigits: 2 })}
            </dd>
          </div>
        </dl>

        <p className="text-xs leading-relaxed text-text-muted">{copy.formulaBlurb}</p>

        <section aria-label="Calculation breakdown">
          <h3 className="mb-3 font-[family-name:var(--font-manrope)] text-base font-semibold text-deep-green">
            Breakdown
          </h3>
          <ul className="space-y-3">
            <BreakdownRow
              label="Total garden area"
              value={formatArea(
                result.totalAreaSquareFeet,
                result.totalAreaSquareMetres,
                input.unitSystem,
              )}
              fill={Math.min(100, result.totalAreaSquareFeet / 2)}
            />
            <BreakdownRow
              label={`Desired ${copy.name} depth`}
              value={formatDepth(result.desiredDepthInches, input.unitSystem)}
              fill={Math.min(100, result.desiredDepthInches * 12)}
            />
            <BreakdownRow
              label="Calculated volume"
              value={formatVolume(
                result.volumeCubicYards,
                result.volumeCubicMetres,
                input.unitSystem,
              )}
              fill={Math.min(100, result.volumeCubicYards * 40)}
            />
            <BreakdownRow
              label="Waste allowance"
              value={`${result.wasteAllowance}%`}
              fill={result.wasteAllowance * (100 / 15)}
            />
          </ul>
        </section>

        <CostComparison
          costs={result.costs}
          currency={input.currency}
          bagsRequired={result.bagsRequired}
          volumeCubicYards={result.volumeCubicYards}
          volumeCubicMetres={result.volumeCubicMetres}
          unitSystem={input.unitSystem}
        />

        <div
          className="hidden min-h-[90px] rounded-[14px] border border-dashed border-border/60"
          aria-hidden="true"
          data-ad-slot="calculator-results"
        />

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" className="flex-1" onClick={handleCopy}>
            {copyStatus === "copied"
              ? "Copied"
              : copyStatus === "error"
                ? "Copy failed"
                : "Copy results"}
          </Button>
          <Button variant="secondary" className="flex-1" onClick={handlePrint}>
            Print summary
          </Button>
          <Button variant="ghost" className="flex-1" onClick={onReset}>
            Reset
          </Button>
        </div>
      </div>
    </aside>
  );
}

function BreakdownRow({
  label,
  value,
  fill,
}: {
  label: string;
  value: string;
  fill: number;
}) {
  return (
    <li>
      <div className="mb-1 flex items-center justify-between gap-3 text-sm">
        <span className="text-text-secondary">{label}</span>
        <span className="font-medium text-text">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-border/70" aria-hidden="true">
        <div
          className="h-full rounded-full bg-forest/80 transition-[width] duration-300"
          style={{ width: `${Math.max(4, fill)}%` }}
        />
      </div>
    </li>
  );
}

function buildPlainTextSummary(
  input: VolumeMaterialCalculatorInput,
  result: VolumeMaterialCalculationResult,
  copy: MaterialCopy,
): string {
  const lines = [
    copy.summaryTitle,
    "--------------------------------",
    `Total area: ${formatArea(result.totalAreaSquareFeet, result.totalAreaSquareMetres, input.unitSystem)}`,
    `Additional depth: ${formatDepth(result.additionalDepthInches, input.unitSystem)}`,
    `Waste allowance: ${result.wasteAllowance}%`,
    `Estimated volume: ${formatVolume(result.volumeCubicYards, result.volumeCubicMetres, input.unitSystem)}`,
    `Cubic feet: ${formatNumber(result.volumeCubicFeet, { maximumFractionDigits: 2 })}`,
    `Bags to buy: ${result.bagsRequired} × ${formatNumber(result.bagSizeCubicFeet, { maximumFractionDigits: 2 })} cu ft`,
    `Recommendation: ${result.purchaseRecommendation}`,
  ];

  if (result.volumeTons !== null) {
    lines.push(`Approx. tons: ${formatNumber(result.volumeTons, { maximumFractionDigits: 2 })}`);
  }
  if (result.volumeTonnes !== null) {
    lines.push(
      `Approx. tonnes: ${formatNumber(result.volumeTonnes, { maximumFractionDigits: 2 })}`,
    );
  }

  if (result.costs.baggedTotal !== null) {
    lines.push(`Bagged total estimate: ${result.costs.baggedTotal.toFixed(2)} ${input.currency}`);
  }
  if (result.costs.bulkTotal !== null) {
    lines.push(`Bulk total estimate: ${result.costs.bulkTotal.toFixed(2)} ${input.currency}`);
  }

  lines.push("", "Garden beds:");
  for (const bed of result.beds) {
    lines.push(
      `- ${bed.name}: ${formatArea(bed.areaSquareFeet, bed.areaSquareMetres, input.unitSystem)}`,
    );
  }

  lines.push("", "Estimates are for planning only. Confirm with your supplier.");
  return lines.join("\n");
}
