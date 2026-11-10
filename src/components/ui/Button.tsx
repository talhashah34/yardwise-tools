import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-forest text-white hover:bg-deep-green shadow-sm border border-transparent",
  secondary:
    "bg-sand text-deep-green hover:bg-[#e5d9c4] border border-transparent",
  ghost: "bg-transparent text-forest hover:bg-soft-sage border border-transparent",
  outline:
    "bg-card text-forest border border-border hover:border-sage hover:bg-soft-sage/60",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm rounded-[8px]",
  md: "h-11 px-5 text-sm rounded-[8px]",
  lg: "h-12 px-6 text-base rounded-[8px]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
