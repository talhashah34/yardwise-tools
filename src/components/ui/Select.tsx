import { cn } from "@/lib/utils/cn";
import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  hint?: string;
  hideLabel?: boolean;
  options: Array<{ value: string; label: string }>;
}

export function Select({
  label,
  hint,
  hideLabel = false,
  options,
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={selectId}
        className={cn(
          "block text-sm font-medium text-text",
          hideLabel && "sr-only",
        )}
      >
        {label}
      </label>
      <select
        id={selectId}
        className={cn(
          "w-full h-11 rounded-[8px] border border-border bg-card px-3.5 text-text transition-colors focus:border-forest",
          className,
        )}
        aria-describedby={hint ? `${selectId}-hint` : undefined}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint ? (
        <p id={`${selectId}-hint`} className="text-xs text-text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
