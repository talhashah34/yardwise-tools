"use client";

import { cn } from "@/lib/utils/cn";
import type { BedShape } from "@/types/calculator";

const shapes: Array<{ value: BedShape; label: string }> = [
  { value: "rectangle", label: "Rectangle" },
  { value: "circle", label: "Circle" },
  { value: "triangle", label: "Triangle" },
];

interface ShapeSelectorProps {
  value: BedShape;
  onChange: (value: BedShape) => void;
  id?: string;
}

export function ShapeSelector({ value, onChange, id }: ShapeSelectorProps) {
  return (
    <div>
      <p className="mb-1.5 text-sm font-medium text-text" id={id}>
        Shape
      </p>
      <div
        className="grid grid-cols-3 gap-2"
        role="radiogroup"
        aria-labelledby={id}
      >
        {shapes.map((shape) => (
          <button
            key={shape.value}
            type="button"
            role="radio"
            aria-checked={value === shape.value}
            onClick={() => onChange(shape.value)}
            className={cn(
              "rounded-[8px] border px-2 py-2.5 text-sm font-medium transition-colors",
              value === shape.value
                ? "border-forest bg-soft-sage text-deep-green"
                : "border-border bg-card text-text-secondary hover:border-sage",
            )}
          >
            {shape.label}
          </button>
        ))}
      </div>
    </div>
  );
}
