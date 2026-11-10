"use client";

import { adsConfig, isAdSenseEnabled } from "@/config/ads";
import { useEffect, useRef } from "react";

type AdSlotName = keyof typeof adsConfig.slots;

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdUnitProps {
  slot: AdSlotName;
  className?: string;
}

/**
 * Display unit. Renders nothing until both publisher ID and slot ID are set.
 * Keep out of the homepage hero — place after calculator/guide content only.
 */
export function AdUnit({ slot, className = "" }: AdUnitProps) {
  const pushed = useRef(false);
  const slotId = adsConfig.slots[slot];

  useEffect(() => {
    if (!isAdSenseEnabled() || !slotId || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // Ad blockers or missing script — fail silently.
    }
  }, [slotId]);

  if (!isAdSenseEnabled() || !slotId) return null;

  return (
    <aside
      className={`no-print overflow-hidden ${className}`}
      aria-label="Advertisement"
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsConfig.client}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
