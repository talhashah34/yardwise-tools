import { calculateVolumeMaterial } from "@/lib/calculations/volume-material";
import type {
  VolumeMaterialCalculationResult,
  VolumeMaterialCalculatorInput,
} from "@/types/calculator";

/** Typical depth for garden paths and decorative gravel beds */
export const GRAVEL_DEFAULT_DEPTH_INCHES = 3;
export const GRAVEL_DEFAULT_DEPTH_CM = 7.5;
/** Consumer bagged gravel/pea gravel is often around 0.5 cubic feet */
export const GRAVEL_DEFAULT_BAG_SIZE_CU_FT = 0.5;
/** Compaction and uneven base make a moderate allowance useful */
export const GRAVEL_DEFAULT_WASTE: 0 | 5 | 10 | 15 = 10;

/** Loose gravel planning density — suppliers vary; confirm locally */
export const GRAVEL_TONS_PER_CUBIC_YARD = 1.4;
export const GRAVEL_TONNES_PER_CUBIC_METRE = 1.5;

export const PEA_GRAVEL_DEFAULT_DEPTH_INCHES = 2.5;
export const PEA_GRAVEL_DEFAULT_DEPTH_CM = 6.5;
export const PEA_GRAVEL_DEFAULT_WASTE: 0 | 5 | 10 | 15 = 10;

export const DRIVEWAY_GRAVEL_DEFAULT_DEPTH_INCHES = 4;
export const DRIVEWAY_GRAVEL_DEFAULT_DEPTH_CM = 10;
export const DRIVEWAY_GRAVEL_DEFAULT_WASTE: 0 | 5 | 10 | 15 = 15;

const gravelWeightConfig = {
  tonsPerCubicYard: GRAVEL_TONS_PER_CUBIC_YARD,
  tonnesPerCubicMetre: GRAVEL_TONNES_PER_CUBIC_METRE,
} as const;

export function calculateGravel(
  input: VolumeMaterialCalculatorInput,
): VolumeMaterialCalculationResult {
  return calculateVolumeMaterial(input, {
    materialName: "gravel",
    defaultBagSizeCubicFeet: GRAVEL_DEFAULT_BAG_SIZE_CU_FT,
    bulkVolumeThresholdCubicYards: 1,
    ...gravelWeightConfig,
  });
}

export function calculatePeaGravel(
  input: VolumeMaterialCalculatorInput,
): VolumeMaterialCalculationResult {
  return calculateVolumeMaterial(input, {
    materialName: "pea gravel",
    defaultBagSizeCubicFeet: GRAVEL_DEFAULT_BAG_SIZE_CU_FT,
    bulkVolumeThresholdCubicYards: 0.75,
    ...gravelWeightConfig,
  });
}

export function calculateDrivewayGravel(
  input: VolumeMaterialCalculatorInput,
): VolumeMaterialCalculationResult {
  return calculateVolumeMaterial(input, {
    materialName: "driveway gravel",
    defaultBagSizeCubicFeet: GRAVEL_DEFAULT_BAG_SIZE_CU_FT,
    bulkVolumeThresholdCubicYards: 0.5,
    ...gravelWeightConfig,
  });
}
