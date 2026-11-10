"use client";

import { BedInput } from "@/components/calculator/BedInput";
import { MeasurementToggle } from "@/components/calculator/MeasurementToggle";
import { ResultsPanel } from "@/components/calculator/ResultsPanel";
import { ShoppingSummary } from "@/components/calculator/ShoppingSummary";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Tooltip } from "@/components/ui/Tooltip";
import { createDefaultBed } from "@/lib/calculations/mulch";
import {
  convertBedMeasurements,
  convertDepthMeasurement,
} from "@/lib/conversions/unit-system";
import { formatNumber } from "@/lib/utils/formatting";
import type {
  CurrencyCode,
  MaterialCopy,
  PurchaseMode,
  UnitSystem,
  VolumeMaterialCalculationResult,
  VolumeMaterialCalculatorInput,
  WasteAllowance,
} from "@/types/calculator";
import { useEffect, useMemo, useState } from "react";

const UNIT_STORAGE_KEY = "yardwise-unit-system";

type CalculatorFields = Omit<VolumeMaterialCalculatorInput, "unitSystem">;

export interface VolumeMaterialDefaults {
  desiredDepthImperial: number;
  desiredDepthMetric: number;
  bagSizeCubicFeet: number;
  wasteAllowance: WasteAllowance;
  sampleLength: number;
  sampleWidth: number;
}

interface VolumeMaterialCalculatorProps {
  copy: MaterialCopy;
  defaults: VolumeMaterialDefaults;
  calculate: (input: VolumeMaterialCalculatorInput) => VolumeMaterialCalculationResult;
}

function readStoredUnitSystem(): UnitSystem {
  if (typeof window === "undefined") return "imperial";
  const stored = window.localStorage.getItem(UNIT_STORAGE_KEY);
  return stored === "metric" || stored === "imperial" ? stored : "imperial";
}

function createInitialFields(
  unitSystem: UnitSystem,
  defaults: VolumeMaterialDefaults,
): CalculatorFields {
  const length =
    unitSystem === "metric"
      ? Number((defaults.sampleLength * 0.3048).toFixed(4))
      : defaults.sampleLength;
  const width =
    unitSystem === "metric"
      ? Number((defaults.sampleWidth * 0.3048).toFixed(4))
      : defaults.sampleWidth;

  return {
    beds: [
      {
        ...createDefaultBed(1, "bed-1"),
        length,
        width,
      },
    ],
    desiredDepth:
      unitSystem === "metric" ? defaults.desiredDepthMetric : defaults.desiredDepthImperial,
    existingDepth: 0,
    purchaseMode: "both",
    bagSizeCubicFeet: defaults.bagSizeCubicFeet,
    pricePerBag: null,
    pricePerCubicYard: null,
    deliveryFee: null,
    currency: "USD",
    wasteAllowance: defaults.wasteAllowance,
  };
}

export function VolumeMaterialCalculator({
  copy,
  defaults,
  calculate,
}: VolumeMaterialCalculatorProps) {
  // Always start imperial on server + first client paint to avoid hydration mismatch.
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial");
  const [fields, setFields] = useState<CalculatorFields>(() =>
    createInitialFields("imperial", defaults),
  );
  const [hasRestoredPrefs, setHasRestoredPrefs] = useState(false);

  useEffect(() => {
    const stored = readStoredUnitSystem();
    if (stored !== "imperial") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore preference only after hydration
      setUnitSystem(stored);
      setFields((current) => {
        // Convert the already-hydrated sample values instead of replacing user input mid-session.
        return {
          ...current,
          beds: current.beds.map((bed) =>
            convertBedMeasurements(bed, "imperial", stored),
          ),
          desiredDepth: convertDepthMeasurement(
            current.desiredDepth,
            "imperial",
            stored,
          ),
          existingDepth: convertDepthMeasurement(
            current.existingDepth,
            "imperial",
            stored,
          ),
        };
      });
    }
    setHasRestoredPrefs(true);
  }, []);

  useEffect(() => {
    if (!hasRestoredPrefs) return;
    window.localStorage.setItem(UNIT_STORAGE_KEY, unitSystem);
  }, [unitSystem, hasRestoredPrefs]);

  const input: VolumeMaterialCalculatorInput = useMemo(
    () => ({ ...fields, unitSystem }),
    [fields, unitSystem],
  );

  const result = useMemo(() => calculate(input), [calculate, input]);

  const depthUnit = unitSystem === "metric" ? "cm" : "inches";
  const totalAreaLabel =
    unitSystem === "metric"
      ? `${formatNumber(result.totalAreaSquareMetres, { maximumFractionDigits: 2 })} m²`
      : `${formatNumber(result.totalAreaSquareFeet, { maximumFractionDigits: 2 })} sq ft`;

  const update = (patch: Partial<CalculatorFields>) =>
    setFields((current) => ({ ...current, ...patch }));

  const parseOptional = (raw: string): number | null => {
    if (raw.trim() === "") return null;
    const value = Number(raw);
    return Number.isFinite(value) ? value : null;
  };

  const handleUnitChange = (next: UnitSystem) => {
    if (next === unitSystem) return;

    setFields((current) => ({
      ...current,
      beds: current.beds.map((bed) => convertBedMeasurements(bed, unitSystem, next)),
      desiredDepth: convertDepthMeasurement(current.desiredDepth, unitSystem, next),
      existingDepth: convertDepthMeasurement(current.existingDepth, unitSystem, next),
    }));
    setUnitSystem(next);
  };

  const addBed = () => {
    setFields((current) => ({
      ...current,
      beds: [...current.beds, createDefaultBed(current.beds.length + 1)],
    }));
  };

  const reset = () => {
    setFields(createInitialFields(unitSystem, defaults));
  };

  const materialLabel = copy.name;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
    <div className="no-print grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 rounded-[20px] border border-border bg-card p-5 shadow-[var(--shadow-sm)] sm:flex-row sm:items-center sm:justify-between md:p-6">
          <div>
            <h1 className="text-3xl text-deep-green md:text-4xl">{copy.title}</h1>
            <p className="mt-2 max-w-xl text-text-secondary">{copy.description}</p>
          </div>
          <MeasurementToggle value={unitSystem} onChange={handleUnitChange} />
        </div>

        <section className="rounded-[20px] border border-border bg-card p-5 shadow-[var(--shadow-sm)] md:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl text-deep-green">1. Garden bed measurements</h2>
            <p className="text-sm text-text-secondary">Total: {totalAreaLabel}</p>
          </div>

          <div className="space-y-4">
            {input.beds.map((bed) => (
              <BedInput
                key={bed.id}
                bed={bed}
                unitSystem={unitSystem}
                canRemove={input.beds.length > 1}
                onChange={(nextBed) =>
                  setFields((current) => ({
                    ...current,
                    beds: current.beds.map((item) => (item.id === bed.id ? nextBed : item)),
                  }))
                }
                onRemove={() =>
                  setFields((current) => ({
                    ...current,
                    beds: current.beds.filter((item) => item.id !== bed.id),
                  }))
                }
              />
            ))}
          </div>

          <Button variant="outline" className="mt-4" onClick={addBed}>
            Add another garden bed
          </Button>
        </section>

        <section className="rounded-[20px] border border-border bg-card p-5 shadow-[var(--shadow-sm)] md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-xl text-deep-green">2. {capitalize(materialLabel)} depth</h2>
            <Tooltip content={copy.depthTooltip} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label={`Desired depth (${depthUnit})`}
              inputMode="decimal"
              min={0}
              step="any"
              value={input.desiredDepth ?? ""}
              hint="Editable default — change it for your project."
              onChange={(event) => update({ desiredDepth: parseOptional(event.target.value) })}
            />
            <Input
              label={`Existing depth (${depthUnit})`}
              inputMode="decimal"
              min={0}
              step="any"
              value={input.existingDepth ?? ""}
              hint="Optional. Leave at 0 for bare ground."
              onChange={(event) => update({ existingDepth: parseOptional(event.target.value) })}
            />
          </div>
          <p className="mt-3 text-sm text-text-secondary">
            Additional depth used in the estimate:{" "}
            <span className="font-semibold text-text">
              {formatNumber(
                unitSystem === "metric"
                  ? result.additionalDepthInches * 2.54
                  : result.additionalDepthInches,
                { maximumFractionDigits: 2 },
              )}{" "}
              {depthUnit}
            </span>
          </p>
        </section>

        <section className="rounded-[20px] border border-border bg-card p-5 shadow-[var(--shadow-sm)] md:p-6">
          <h2 className="mb-4 text-xl text-deep-green">3. Material selection</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Purchase estimate"
              value={input.purchaseMode}
              onChange={(event) =>
                update({ purchaseMode: event.target.value as PurchaseMode })
              }
              options={[
                { value: "both", label: "Bagged and bulk" },
                { value: "bagged", label: `Bagged ${materialLabel} only` },
                { value: "bulk", label: `Bulk ${materialLabel} only` },
              ]}
            />
            <Input
              label="Bag size (cubic feet)"
              inputMode="decimal"
              min={0}
              step="any"
              value={input.bagSizeCubicFeet ?? ""}
              hint={copy.bagSizeHint}
              onChange={(event) =>
                update({ bagSizeCubicFeet: parseOptional(event.target.value) })
              }
            />
          </div>
        </section>

        <section className="rounded-[20px] border border-border bg-card p-5 shadow-[var(--shadow-sm)] md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-xl text-deep-green">4. Optional costs</h2>
            <Tooltip content="Enter your local prices. Yardwise never invents market rates." />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Currency"
              value={input.currency}
              onChange={(event) =>
                update({ currency: event.target.value as CurrencyCode })
              }
              options={[
                { value: "USD", label: "USD ($)" },
                { value: "GBP", label: "GBP (£)" },
                { value: "CAD", label: "CAD ($)" },
                { value: "AUD", label: "AUD ($)" },
                { value: "EUR", label: "EUR (€)" },
              ]}
            />
            <Input
              label="Delivery fee"
              inputMode="decimal"
              min={0}
              step="any"
              value={input.deliveryFee ?? ""}
              onChange={(event) => update({ deliveryFee: parseOptional(event.target.value) })}
            />
            {(input.purchaseMode === "bagged" || input.purchaseMode === "both") && (
              <Input
                label="Price per bag"
                inputMode="decimal"
                min={0}
                step="any"
                value={input.pricePerBag ?? ""}
                onChange={(event) => update({ pricePerBag: parseOptional(event.target.value) })}
              />
            )}
            {(input.purchaseMode === "bulk" || input.purchaseMode === "both") && (
              <Input
                label="Price per cubic yard"
                inputMode="decimal"
                min={0}
                step="any"
                value={input.pricePerCubicYard ?? ""}
                onChange={(event) =>
                  update({ pricePerCubicYard: parseOptional(event.target.value) })
                }
              />
            )}
          </div>
        </section>

        <section className="rounded-[20px] border border-border bg-card p-5 shadow-[var(--shadow-sm)] md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-xl text-deep-green">5. Waste allowance</h2>
            <Tooltip content={copy.wasteTooltip} />
          </div>
          <Select
            label="Waste allowance"
            value={String(input.wasteAllowance)}
            onChange={(event) =>
              update({ wasteAllowance: Number(event.target.value) as WasteAllowance })
            }
            hint={`Default is ${defaults.wasteAllowance}%. Choose 0% for an exact mathematical volume.`}
            options={[
              { value: "0", label: "0% — exact volume" },
              { value: "5", label: "5% — light allowance" },
              { value: "10", label: "10% — moderate allowance" },
              { value: "15", label: "15% — generous allowance" },
            ]}
          />
        </section>

        <div className="lg:hidden">
          <ResultsPanel
            input={input}
            result={result}
            copy={copy}
            onReset={reset}
            onPrint={handlePrint}
          />
        </div>
      </div>

      <div className="hidden lg:block lg:sticky lg:top-24">
        <ResultsPanel
          input={input}
          result={result}
          copy={copy}
          onReset={reset}
          onPrint={handlePrint}
        />
      </div>
    </div>

    {/* Single print document for every calculator — hidden on screen */}
    <div className="print-only print-summary">
      <ShoppingSummary input={input} result={result} copy={copy} />
    </div>
    </>
  );
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
