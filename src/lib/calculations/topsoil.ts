import { calculateVolumeMaterial } from "@/lib/calculations/volume-material";
import type {
  VolumeMaterialCalculationResult,
  VolumeMaterialCalculatorInput,
} from "@/types/calculator";

export const TOPSOIL_DEFAULT_DEPTH_INCHES = 6;
export const TOPSOIL_DEFAULT_DEPTH_CM = 15;
export const TOPSOIL_DEFAULT_BAG_SIZE_CU_FT = 1;
export const TOPSOIL_DEFAULT_WASTE: 0 | 5 | 10 | 15 = 10;

/**
 * Topsoil volume uses the same area × depth formulas as mulch.
 * Defaults differ: deeper typical fills and smaller bag sizes are common.
 */
export function calculateTopsoil(
  input: VolumeMaterialCalculatorInput,
): VolumeMaterialCalculationResult {
  return calculateVolumeMaterial(input, {
    materialName: "topsoil",
    defaultBagSizeCubicFeet: TOPSOIL_DEFAULT_BAG_SIZE_CU_FT,
  });
}
