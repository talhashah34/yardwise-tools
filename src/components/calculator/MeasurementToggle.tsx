"use client";

import { cn } from "@/lib/utils/cn";
import type { UnitSystem } from "@/types/calculator";

interface MeasurementToggleProps {
  value: UnitSystem;
  onChange: (value: UnitSystem) => void;
}

export function MeasurementToggle({ value, onChange }: MeasurementToggleProps) {
  return (
    <div
      className="inline-flex rounded-[8px] border border-border bg-subtle p-1"
      role="group"
      aria-label="Measurement system"
    >
      <ToggleButton
        active={value === "imperial"}
        onClick={() => onChange("imperial")}
      >
        Imperial
      </ToggleButton>
      <ToggleButton
        active={value === "metric"}
        onClick={() => onChange("metric")}
      >
        Metric
      </ToggleButton>
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-[6px] px-3.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-card text-deep-green shadow-sm"
          : "text-text-secondary hover:text-text",
      )}
    >
      {children}
    </button>
  );
}
