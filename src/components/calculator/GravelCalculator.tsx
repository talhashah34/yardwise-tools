"use client";

import { VolumeMaterialCalculator } from "@/components/calculator/VolumeMaterialCalculator";
import { gravelCopy } from "@/config/materials";
import {
  GRAVEL_DEFAULT_BAG_SIZE_CU_FT,
  GRAVEL_DEFAULT_DEPTH_CM,
  GRAVEL_DEFAULT_DEPTH_INCHES,
  GRAVEL_DEFAULT_WASTE,
  calculateGravel,
} from "@/lib/calculations/gravel";

export function GravelCalculator() {
  return (
    <VolumeMaterialCalculator
      copy={gravelCopy}
      calculate={calculateGravel}
      defaults={{
        desiredDepthImperial: GRAVEL_DEFAULT_DEPTH_INCHES,
        desiredDepthMetric: GRAVEL_DEFAULT_DEPTH_CM,
        bagSizeCubicFeet: GRAVEL_DEFAULT_BAG_SIZE_CU_FT,
        wasteAllowance: GRAVEL_DEFAULT_WASTE,
        sampleLength: 10,
        sampleWidth: 10,
      }}
    />
  );
}
