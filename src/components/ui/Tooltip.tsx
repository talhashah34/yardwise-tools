"use client";

import { cn } from "@/lib/utils/cn";
import { useId, useState } from "react";

interface TooltipProps {
  content: string;
  children?: React.ReactNode;
  className?: string;
}

export function Tooltip({ content, children, className }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span className={cn("relative inline-flex items-center", className)}>
      <button
        type="button"
        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-border bg-subtle text-[11px] font-semibold text-text-secondary hover:border-sage"
        aria-describedby={open ? id : undefined}
        aria-label="More information"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        {children ?? "?"}
      </button>
      {open ? (
        <span
          id={id}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-[8px] bg-deep-green px-3 py-2 text-left text-xs leading-relaxed text-white shadow-md"
        >
          {content}
        </span>
      ) : null}
    </span>
  );
}
