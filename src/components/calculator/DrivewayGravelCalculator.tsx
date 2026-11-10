"use client";

import { VolumeMaterialCalculator } from "@/components/calculator/VolumeMaterialCalculator";
import { drivewayGravelCopy } from "@/config/materials";
import {
  DRIVEWAY_GRAVEL_DEFAULT_DEPTH_CM,
  DRIVEWAY_GRAVEL_DEFAULT_DEPTH_INCHES,
  DRIVEWAY_GRAVEL_DEFAULT_WASTE,
  GRAVEL_DEFAULT_BAG_SIZE_CU_FT,
  calculateDrivewayGravel,
} from "@/lib/calculations/gravel";

export function DrivewayGravelCalculator() {
  return (
    <VolumeMaterialCalculator
      copy={drivewayGravelCopy}
      calculate={calculateDrivewayGravel}
      defaults={{
        desiredDepthImperial: DRIVEWAY_GRAVEL_DEFAULT_DEPTH_INCHES,
        desiredDepthMetric: DRIVEWAY_GRAVEL_DEFAULT_DEPTH_CM,
        bagSizeCubicFeet: GRAVEL_DEFAULT_BAG_SIZE_CU_FT,
        wasteAllowance: DRIVEWAY_GRAVEL_DEFAULT_WASTE,
        sampleLength: 40,
        sampleWidth: 10,
      }}
    />
  );
}
