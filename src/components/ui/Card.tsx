import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  className,
  padding = "md",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-[14px] shadow-[var(--shadow-sm)]",
        paddings[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
