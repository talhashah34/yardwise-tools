"use client";

import { VolumeMaterialCalculator } from "@/components/calculator/VolumeMaterialCalculator";
import { mulchCopy } from "@/config/materials";
import { calculateMulch } from "@/lib/calculations/mulch-volume";

export function MulchCalculator() {
  return (
    <VolumeMaterialCalculator
      copy={mulchCopy}
      calculate={calculateMulch}
      defaults={{
        desiredDepthImperial: 3,
        desiredDepthMetric: 7.5,
        bagSizeCubicFeet: 2,
        wasteAllowance: 5,
        sampleLength: 10,
        sampleWidth: 10,
      }}
    />
  );
}
