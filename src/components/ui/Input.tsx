import { cn } from "@/lib/utils/cn";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string | null;
  hideLabel?: boolean;
}

export function Input({
  label,
  hint,
  error,
  hideLabel = false,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={inputId}
        className={cn(
          "block text-sm font-medium text-text",
          hideLabel && "sr-only",
        )}
      >
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          "w-full h-11 rounded-[8px] border bg-card px-3.5 text-text placeholder:text-text-muted transition-colors",
          error
            ? "border-clay focus:border-clay"
            : "border-border focus:border-forest",
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
        }
        {...props}
      />
      {hint && !error ? (
        <p id={`${inputId}-hint`} className="text-xs text-text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${inputId}-error`} className="text-xs text-clay" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
