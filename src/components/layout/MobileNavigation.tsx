"use client";

import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { useEffect, useState } from "react";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-border bg-card text-deep-green"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          {open ? (
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M4 6h12M4 10h12M4 14h12"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-x-0 top-[var(--header-height)] z-40 border-b border-border bg-card shadow-md transition-all duration-200",
          open ? "visible opacity-100" : "invisible pointer-events-none opacity-0",
        )}
      >
        <nav className="container-yardwise flex flex-col gap-1 py-4" aria-label="Mobile">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[8px] px-3 py-3 text-base font-medium text-text hover:bg-soft-sage"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link href="/tools" onClick={() => setOpen(false)}>
              <Button className="w-full">Explore Tools</Button>
            </Link>
          </div>
        </nav>
      </div>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 top-[var(--header-height)] z-30 bg-deep-green/20"
          aria-label="Close menu overlay"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </div>
  );
}
