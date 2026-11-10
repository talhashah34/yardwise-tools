"use client";

import { VolumeMaterialCalculator } from "@/components/calculator/VolumeMaterialCalculator";
import { topsoilCopy } from "@/config/materials";
import {
  TOPSOIL_DEFAULT_BAG_SIZE_CU_FT,
  TOPSOIL_DEFAULT_DEPTH_CM,
  TOPSOIL_DEFAULT_DEPTH_INCHES,
  TOPSOIL_DEFAULT_WASTE,
  calculateTopsoil,
} from "@/lib/calculations/topsoil";

export function TopsoilCalculator() {
  return (
    <VolumeMaterialCalculator
      copy={topsoilCopy}
      calculate={calculateTopsoil}
      defaults={{
        desiredDepthImperial: TOPSOIL_DEFAULT_DEPTH_INCHES,
        desiredDepthMetric: TOPSOIL_DEFAULT_DEPTH_CM,
        bagSizeCubicFeet: TOPSOIL_DEFAULT_BAG_SIZE_CU_FT,
        wasteAllowance: TOPSOIL_DEFAULT_WASTE,
        sampleLength: 10,
        sampleWidth: 10,
      }}
    />
  );
}
