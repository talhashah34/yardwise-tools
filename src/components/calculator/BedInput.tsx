"use client";

import { ShapeSelector } from "@/components/calculator/ShapeSelector";
import { Input } from "@/components/ui/Input";
import { calculateBedAreaInInputUnits } from "@/lib/calculations/mulch";
import { formatNumber } from "@/lib/utils/formatting";
import { measurementError } from "@/lib/utils/validation";
import type { BedShape, GardenBed, UnitSystem } from "@/types/calculator";

interface BedInputProps {
  bed: GardenBed;
  unitSystem: UnitSystem;
  canRemove: boolean;
  onChange: (bed: GardenBed) => void;
  onRemove: () => void;
}

function lengthLabel(unitSystem: UnitSystem, shape: BedShape): string {
  const unit = unitSystem === "metric" ? "metres" : "feet";
  if (shape === "triangle") return `Base (${unit})`;
  return `Length (${unit})`;
}

export function BedInput({
  bed,
  unitSystem,
  canRemove,
  onChange,
  onRemove,
}: BedInputProps) {
  const unit = unitSystem === "metric" ? "metres" : "feet";
  const area = calculateBedAreaInInputUnits(bed);
  const areaLabel = unitSystem === "metric" ? "m²" : "sq ft";

  const update = (patch: Partial<GardenBed>) => onChange({ ...bed, ...patch });

  const parseField = (raw: string): number | null => {
    if (raw.trim() === "") return null;
    const value = Number(raw);
    return Number.isFinite(value) ? value : null;
  };

  return (
    <fieldset className="rounded-[14px] border border-border bg-subtle/40 p-4">
      <legend className="sr-only">{bed.name}</legend>

      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex-1">
          <Input
            id={`${bed.id}-name`}
            label="Bed name"
            value={bed.name}
            onChange={(event) => update({ name: event.target.value })}
          />
        </div>
        {canRemove ? (
          <button
            type="button"
            onClick={onRemove}
            className="mt-7 text-sm font-medium text-clay hover:text-[#b56d48]"
          >
            Remove
          </button>
        ) : null}
      </div>

      <ShapeSelector
        id={`shape-${bed.id}`}
        value={bed.shape}
        onChange={(shape) => update({ shape })}
      />

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {bed.shape === "rectangle" ? (
          <>
            <Input
              id={`${bed.id}-length`}
              label={lengthLabel(unitSystem, "rectangle")}
              inputMode="decimal"
              min={0}
              step="any"
              value={bed.length ?? ""}
              error={
                bed.length !== null
                  ? measurementError(bed.length, "length", { allowZero: false })
                  : null
              }
              onChange={(event) => update({ length: parseField(event.target.value) })}
            />
            <Input
              id={`${bed.id}-width`}
              label={`Width (${unit})`}
              inputMode="decimal"
              min={0}
              step="any"
              value={bed.width ?? ""}
              error={
                bed.width !== null
                  ? measurementError(bed.width, "width", { allowZero: false })
                  : null
              }
              onChange={(event) => update({ width: parseField(event.target.value) })}
            />
          </>
        ) : null}

        {bed.shape === "circle" ? (
          <Input
            id={`${bed.id}-diameter`}
            label={`Diameter (${unit})`}
            inputMode="decimal"
            min={0}
            step="any"
            value={bed.diameter ?? ""}
            error={
              bed.diameter !== null
                ? measurementError(bed.diameter, "diameter", { allowZero: false })
                : null
            }
            onChange={(event) => update({ diameter: parseField(event.target.value) })}
          />
        ) : null}

        {bed.shape === "triangle" ? (
          <>
            <Input
              id={`${bed.id}-base`}
              label={lengthLabel(unitSystem, "triangle")}
              inputMode="decimal"
              min={0}
              step="any"
              value={bed.length ?? ""}
              error={
                bed.length !== null
                  ? measurementError(bed.length, "base", { allowZero: false })
                  : null
              }
              onChange={(event) => update({ length: parseField(event.target.value) })}
            />
            <Input
              id={`${bed.id}-height`}
              label={`Height (${unit})`}
              inputMode="decimal"
              min={0}
              step="any"
              value={bed.height ?? ""}
              error={
                bed.height !== null
                  ? measurementError(bed.height, "height", { allowZero: false })
                  : null
              }
              onChange={(event) => update({ height: parseField(event.target.value) })}
            />
          </>
        ) : null}
      </div>

      <p className="mt-3 text-sm text-text-secondary">
        Bed area:{" "}
        <span className="font-semibold text-text">
          {formatNumber(area, { maximumFractionDigits: 2 })} {areaLabel}
        </span>
      </p>
    </fieldset>
  );
}
