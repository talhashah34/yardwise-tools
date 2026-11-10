import { describe, expect, it } from "vitest";
import { calculateCompost } from "@/lib/calculations/compost";
import type { VolumeMaterialCalculatorInput } from "@/types/calculator";

function baseInput(
  overrides: Partial<VolumeMaterialCalculatorInput> = {},
): VolumeMaterialCalculatorInput {
  return {
    unitSystem: "imperial",
    beds: [
      {
        id: "bed-1",
        name: "Main Bed",
        shape: "rectangle",
        length: 10,
        width: 10,
        diameter: null,
        height: null,
      },
    ],
    desiredDepth: 2,
    existingDepth: 0,
    purchaseMode: "both",
    bagSizeCubicFeet: 1,
    pricePerBag: null,
    pricePerCubicYard: null,
    deliveryFee: null,
    currency: "USD",
    wasteAllowance: 0,
    ...overrides,
  };
}

describe("calculateCompost", () => {
  it("calculates a 2-inch amendment layer", () => {
    // 100 × 2 / 324 ≈ 0.61728 cu yd ≈ 16.666 cu ft → 17 bags of 1 cu ft
    const result = calculateCompost(baseInput());
    expect(result.volumeCubicYards).toBeCloseTo(0.61728395, 6);
    expect(result.volumeCubicFeet).toBeCloseTo(16.666666, 5);
    expect(result.bagsRequired).toBe(17);
  });

  it("applies waste allowance before bag rounding", () => {
    const result = calculateCompost(baseInput({ wasteAllowance: 5 }));
    expect(result.volumeCubicYards).toBeCloseTo(0.648148148, 8);
    expect(result.bagsRequired).toBe(18);
  });

  it("uses compost-specific messaging for depth warnings", () => {
    const result = calculateCompost(
      baseInput({ desiredDepth: 1, existingDepth: 3 }),
    );
    expect(result.additionalDepthInches).toBe(0);
    expect(result.depthWarning).toMatch(/No additional compost is required/);
  });
});
