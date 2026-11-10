"use client";

import { VolumeMaterialCalculator } from "@/components/calculator/VolumeMaterialCalculator";
import { compostCopy } from "@/config/materials";
import {
  COMPOST_DEFAULT_BAG_SIZE_CU_FT,
  COMPOST_DEFAULT_DEPTH_CM,
  COMPOST_DEFAULT_DEPTH_INCHES,
  COMPOST_DEFAULT_WASTE,
  calculateCompost,
} from "@/lib/calculations/compost";

export function CompostCalculator() {
  return (
    <VolumeMaterialCalculator
      copy={compostCopy}
      calculate={calculateCompost}
      defaults={{
        desiredDepthImperial: COMPOST_DEFAULT_DEPTH_INCHES,
        desiredDepthMetric: COMPOST_DEFAULT_DEPTH_CM,
        bagSizeCubicFeet: COMPOST_DEFAULT_BAG_SIZE_CU_FT,
        wasteAllowance: COMPOST_DEFAULT_WASTE,
        sampleLength: 10,
        sampleWidth: 10,
      }}
    />
  );
}
