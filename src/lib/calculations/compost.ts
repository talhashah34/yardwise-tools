import { calculateVolumeMaterial } from "@/lib/calculations/volume-material";
import type {
  VolumeMaterialCalculationResult,
  VolumeMaterialCalculatorInput,
} from "@/types/calculator";

/** Typical amendment layer for garden beds */
export const COMPOST_DEFAULT_DEPTH_INCHES = 2;
export const COMPOST_DEFAULT_DEPTH_CM = 5;
/** Consumer bagged compost is often sold around 1 cubic foot */
export const COMPOST_DEFAULT_BAG_SIZE_CU_FT = 1;
export const COMPOST_DEFAULT_WASTE: 0 | 5 | 10 | 15 = 5;

export function calculateCompost(
  input: VolumeMaterialCalculatorInput,
): VolumeMaterialCalculationResult {
  return calculateVolumeMaterial(input, {
    materialName: "compost",
    defaultBagSizeCubicFeet: COMPOST_DEFAULT_BAG_SIZE_CU_FT,
  });
}
