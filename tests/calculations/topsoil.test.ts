import { describe, expect, it } from "vitest";
import { calculateTopsoil } from "@/lib/calculations/topsoil";
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
    desiredDepth: 6,
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

describe("calculateTopsoil", () => {
  it("uses the imperial volume formula for a 6-inch fill", () => {
    // 100 sq ft × 6 in / 324 ≈ 1.85185 cu yd
    const result = calculateTopsoil(baseInput());
    expect(result.totalAreaSquareFeet).toBe(100);
    expect(result.volumeCubicYards).toBeCloseTo(1.8518518519, 8);
    expect(result.volumeCubicFeet).toBeCloseTo(50, 5);
    expect(result.bagsRequired).toBe(50);
  });

  it("applies a 10% settling/waste allowance", () => {
    const result = calculateTopsoil(baseInput({ wasteAllowance: 10 }));
    expect(result.volumeCubicYards).toBeCloseTo(2.037037037, 8);
    expect(result.bagsRequired).toBe(55);
  });

  it("defaults invalid bag size to 1 cubic foot", () => {
    const result = calculateTopsoil(baseInput({ bagSizeCubicFeet: null }));
    expect(result.bagSizeCubicFeet).toBe(1);
    expect(result.bagsRequired).toBe(50);
  });

  it("warns when existing topsoil already exceeds desired depth", () => {
    const result = calculateTopsoil(
      baseInput({ desiredDepth: 4, existingDepth: 6 }),
    );
    expect(result.additionalDepthInches).toBe(0);
    expect(result.depthWarning).toMatch(/No additional topsoil is required/);
    expect(result.volumeCubicYards).toBe(0);
  });

  it("supports metric bed inputs", () => {
    const result = calculateTopsoil(
      baseInput({
        unitSystem: "metric",
        beds: [
          {
            id: "m1",
            name: "Metric Bed",
            shape: "rectangle",
            length: 4,
            width: 2,
            diameter: null,
            height: null,
          },
        ],
        desiredDepth: 15,
        wasteAllowance: 0,
      }),
    );
    expect(result.totalAreaSquareMetres).toBeCloseTo(8, 5);
    expect(result.volumeCubicYards).toBeGreaterThan(0);
  });
});
