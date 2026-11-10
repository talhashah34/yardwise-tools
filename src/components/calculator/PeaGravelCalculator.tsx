"use client";

import { VolumeMaterialCalculator } from "@/components/calculator/VolumeMaterialCalculator";
import { peaGravelCopy } from "@/config/materials";
import {
  GRAVEL_DEFAULT_BAG_SIZE_CU_FT,
  PEA_GRAVEL_DEFAULT_DEPTH_CM,
  PEA_GRAVEL_DEFAULT_DEPTH_INCHES,
  PEA_GRAVEL_DEFAULT_WASTE,
  calculatePeaGravel,
} from "@/lib/calculations/gravel";

export function PeaGravelCalculator() {
  return (
    <VolumeMaterialCalculator
      copy={peaGravelCopy}
      calculate={calculatePeaGravel}
      defaults={{
        desiredDepthImperial: PEA_GRAVEL_DEFAULT_DEPTH_INCHES,
        desiredDepthMetric: PEA_GRAVEL_DEFAULT_DEPTH_CM,
        bagSizeCubicFeet: GRAVEL_DEFAULT_BAG_SIZE_CU_FT,
        wasteAllowance: PEA_GRAVEL_DEFAULT_WASTE,
        sampleLength: 12,
        sampleWidth: 3,
      }}
    />
  );
}
