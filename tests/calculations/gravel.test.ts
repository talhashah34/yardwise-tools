import { describe, expect, it } from "vitest";
import {
  GRAVEL_TONS_PER_CUBIC_YARD,
  GRAVEL_TONNES_PER_CUBIC_METRE,
  calculateDrivewayGravel,
  calculateGravel,
  calculatePeaGravel,
} from "@/lib/calculations/gravel";
import type { VolumeMaterialCalculatorInput } from "@/types/calculator";

function baseInput(
  overrides: Partial<VolumeMaterialCalculatorInput> = {},
): VolumeMaterialCalculatorInput {
  return {
    unitSystem: "imperial",
    beds: [
      {
        id: "bed-1",
        name: "Path",
        shape: "rectangle",
        length: 10,
        width: 10,
        diameter: null,
        height: null,
      },
    ],
    desiredDepth: 3,
    existingDepth: 0,
    purchaseMode: "both",
    bagSizeCubicFeet: 0.5,
    pricePerBag: null,
    pricePerCubicYard: null,
    deliveryFee: null,
    currency: "USD",
    wasteAllowance: 0,
    ...overrides,
  };
}

describe("calculateGravel", () => {
  it("calculates a 3-inch gravel layer", () => {
    const result = calculateGravel(baseInput());
    expect(result.volumeCubicYards).toBeCloseTo(0.9259259259, 8);
    expect(result.volumeCubicFeet).toBeCloseTo(25, 5);
    expect(result.bagsRequired).toBe(50);
    expect(result.volumeTons).toBeCloseTo(0.9259259259 * GRAVEL_TONS_PER_CUBIC_YARD, 6);
    expect(result.volumeTonnes).toBeCloseTo(
      result.volumeCubicMetres * GRAVEL_TONNES_PER_CUBIC_METRE,
      6,
    );
  });

  it("applies compaction/waste allowance before bag rounding", () => {
    const result = calculateGravel(baseInput({ wasteAllowance: 10 }));
    expect(result.volumeCubicYards).toBeCloseTo(1.0185185185, 8);
    expect(result.bagsRequired).toBe(55);
  });

  it("defaults invalid bag size to 0.5 cubic feet", () => {
    const result = calculateGravel(baseInput({ bagSizeCubicFeet: null }));
    expect(result.bagSizeCubicFeet).toBe(0.5);
    expect(result.bagsRequired).toBe(50);
  });

  it("uses gravel-specific depth warning copy", () => {
    const result = calculateGravel(
      baseInput({ desiredDepth: 2, existingDepth: 4 }),
    );
    expect(result.additionalDepthInches).toBe(0);
    expect(result.depthWarning).toMatch(/No additional gravel is required/);
  });

  it("recommends bulk for larger gravel jobs", () => {
    const result = calculateGravel(baseInput({ desiredDepth: 6 }));
    expect(result.purchaseRecommendation).toBe("bulk");
  });
});

describe("calculatePeaGravel", () => {
  it("uses pea gravel naming in warnings and returns weight", () => {
    const result = calculatePeaGravel(
      baseInput({ desiredDepth: 2, existingDepth: 5 }),
    );
    expect(result.depthWarning).toMatch(/No additional pea gravel is required/);
  });

  it("calculates a shallow pea gravel path", () => {
    const result = calculatePeaGravel(baseInput({ desiredDepth: 2.5 }));
    expect(result.volumeCubicYards).toBeCloseTo((100 * 2.5) / 324, 8);
    expect(result.volumeTons).not.toBeNull();
  });
});

describe("calculateDrivewayGravel", () => {
  it("recommends bulk for typical driveway volumes", () => {
    const result = calculateDrivewayGravel(
      baseInput({
        beds: [
          {
            id: "drive",
            name: "Driveway",
            shape: "rectangle",
            length: 40,
            width: 10,
            diameter: null,
            height: null,
          },
        ],
        desiredDepth: 4,
        wasteAllowance: 15,
      }),
    );
    expect(result.volumeCubicYards).toBeGreaterThan(5);
    expect(result.purchaseRecommendation).toBe("bulk");
    expect(result.volumeTons).toBeGreaterThan(5);
  });
});
