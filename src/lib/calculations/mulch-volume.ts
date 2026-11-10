import { calculateVolumeMaterial } from "@/lib/calculations/volume-material";
import type {
  MulchCalculationResult,
  MulchCalculatorInput,
} from "@/types/calculator";

export function calculateMulch(input: MulchCalculatorInput): MulchCalculationResult {
  return calculateVolumeMaterial(input, {
    materialName: "mulch",
    defaultBagSizeCubicFeet: 2,
    bulkVolumeThresholdCubicYards: 1,
  });
}
