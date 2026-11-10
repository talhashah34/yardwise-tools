import { describe, expect, it } from "vitest";
import {
  applyWasteAllowance,
  calculateBagsRequired,
  calculateCircleArea,
  calculateCosts,
  calculateRectangleArea,
  calculateTriangleArea,
  calculateVolumeCubicMetres,
  calculateVolumeCubicYards,
  calculateAdditionalDepthInches,
} from "@/lib/calculations/mulch";
import { calculateMulch } from "@/lib/calculations/mulch-volume";
import type { MulchCalculatorInput } from "@/types/calculator";

function baseInput(overrides: Partial<MulchCalculatorInput> = {}): MulchCalculatorInput {
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
    desiredDepth: 3,
    existingDepth: 0,
    purchaseMode: "both",
    bagSizeCubicFeet: 2,
    pricePerBag: null,
    pricePerCubicYard: null,
    deliveryFee: null,
    currency: "USD",
    wasteAllowance: 0,
    ...overrides,
  };
}

describe("area calculations", () => {
  it("calculates rectangle area", () => {
    expect(calculateRectangleArea(10, 10)).toBe(100);
    expect(calculateRectangleArea(12.5, 4)).toBe(50);
  });

  it("calculates circle area", () => {
    expect(calculateCircleArea(10)).toBeCloseTo(Math.PI * 25, 6);
  });

  it("calculates triangle area", () => {
    expect(calculateTriangleArea(10, 8)).toBe(40);
  });

  it("rejects negative dimensions", () => {
    expect(calculateRectangleArea(-1, 10)).toBe(0);
    expect(calculateCircleArea(-4)).toBe(0);
    expect(calculateTriangleArea(5, -2)).toBe(0);
  });
});

describe("volume calculations", () => {
  it("matches the documented imperial example", () => {
    // 100 sq ft × 3 in / 324 = 0.9259259...
    expect(calculateVolumeCubicYards(100, 3)).toBeCloseTo(0.9259259259, 8);
  });

  it("calculates metric volume", () => {
    expect(calculateVolumeCubicMetres(10, 0.0762)).toBeCloseTo(0.762, 6);
  });

  it("returns zero for invalid inputs", () => {
    expect(calculateVolumeCubicYards(0, 3)).toBe(0);
    expect(calculateVolumeCubicYards(100, 0)).toBe(0);
    expect(calculateVolumeCubicYards(NaN, 3)).toBe(0);
    expect(calculateVolumeCubicMetres(-1, 0.1)).toBe(0);
  });
});

describe("waste allowance and bags", () => {
  it("applies waste allowance", () => {
    expect(applyWasteAllowance(0.9259259259, 5)).toBeCloseTo(0.972222222, 8);
  });

  it("rounds bags up correctly with 0% waste", () => {
    const cubicFeet = 0.9259259259 * 27;
    const { exactBags, bagsRequired } = calculateBagsRequired(cubicFeet, 2);
    expect(exactBags).toBeCloseTo(12.5, 6);
    // Spec example says 25 bags for 2 cu ft — 0.9259259 * 27 / 2 ≈ 12.5
    // Re-check: 100*3/324 = 0.9259259 cu yd * 27 = 25 cu ft / 2 = 12.5 → 13 bags
    // The prompt says "25 bags required" which is cu ft, not bags.
    // "For 2 cubic foot bags: 25 bags required" — that would be if they confused cu ft with bags.
    // Exact: 25 cubic feet / 2 = 12.5 → ceil = 13 bags.
    // Wait, re-read: "For 2 cubic foot bags: 25 bags required."
    // That seems wrong mathematically. 25 cu ft / 2 cu ft = 12.5 → 13 bags.
    // Unless they meant volume is 25 cubic feet displayed as the secondary, and bags = ceil(25/2)=13.
    // Looking again: "Secondary conversions: 25 cubic feet. Bag estimate: 25 bags of 2 cubic feet."
    // That's inconsistent - 25 bags of 2 cu ft = 50 cu ft. I'll implement correct math: ceil(volume/bagSize).
    expect(bagsRequired).toBe(13);
  });

  it("rounds bags up with 5% waste", () => {
    const volume = applyWasteAllowance(0.9259259259, 5);
    const cubicFeet = volume * 27;
    const { bagsRequired } = calculateBagsRequired(cubicFeet, 2);
    // 0.972222 * 27 / 2 = 13.125 → 14 bags
    // Prompt says 27 bags which appears to treat cu ft as bag count — we use correct math.
    expect(bagsRequired).toBe(14);
  });

  it("handles zero and invalid bag sizes", () => {
    expect(calculateBagsRequired(25, 0)).toEqual({ exactBags: 0, bagsRequired: 0 });
    expect(calculateBagsRequired(0, 2)).toEqual({ exactBags: 0, bagsRequired: 0 });
  });
});

describe("depth subtraction", () => {
  it("subtracts existing depth", () => {
    const result = calculateAdditionalDepthInches(3, 1, "imperial");
    expect(result.additionalDepthInches).toBe(2);
    expect(result.warning).toBeNull();
  });

  it("clamps negative additional depth to zero with warning", () => {
    const result = calculateAdditionalDepthInches(2, 4, "imperial");
    expect(result.additionalDepthInches).toBe(0);
    expect(result.warning).toMatch(/No additional mulch is required/);
  });

  it("converts metric centimetres to inches", () => {
    const result = calculateAdditionalDepthInches(7.62, 0, "metric");
    expect(result.desiredDepthInches).toBeCloseTo(3, 5);
  });
});

describe("calculateMulch integration", () => {
  it("calculates imperial rectangle beds with documented volume", () => {
    const result = calculateMulch(baseInput({ wasteAllowance: 0 }));
    expect(result.totalAreaSquareFeet).toBe(100);
    expect(result.volumeCubicYards).toBeCloseTo(0.9259259259, 8);
    expect(result.volumeCubicFeet).toBeCloseTo(25, 6);
    expect(result.bagsRequired).toBe(13);
  });

  it("applies 5% waste", () => {
    const result = calculateMulch(baseInput({ wasteAllowance: 5 }));
    expect(result.volumeCubicYards).toBeCloseTo(0.972222222, 8);
    expect(result.bagsRequired).toBe(14);
  });

  it("sums multiple beds", () => {
    const result = calculateMulch(
      baseInput({
        beds: [
          {
            id: "a",
            name: "A",
            shape: "rectangle",
            length: 10,
            width: 5,
            diameter: null,
            height: null,
          },
          {
            id: "b",
            name: "B",
            shape: "circle",
            length: null,
            width: null,
            diameter: 8,
            height: null,
          },
          {
            id: "c",
            name: "C",
            shape: "triangle",
            length: 6,
            width: null,
            diameter: null,
            height: 4,
          },
        ],
        wasteAllowance: 0,
      }),
    );
    const expectedArea = 50 + Math.PI * 16 + 12;
    expect(result.totalAreaSquareFeet).toBeCloseTo(expectedArea, 6);
  });

  it("handles metric inputs", () => {
    const result = calculateMulch(
      baseInput({
        unitSystem: "metric",
        beds: [
          {
            id: "m1",
            name: "Metric Bed",
            shape: "rectangle",
            length: 3,
            width: 2,
            diameter: null,
            height: null,
          },
        ],
        desiredDepth: 7.62, // ~3 inches
        wasteAllowance: 0,
      }),
    );
    expect(result.totalAreaSquareMetres).toBeCloseTo(6, 5);
    expect(result.volumeCubicYards).toBeGreaterThan(0);
  });

  it("calculates costs when prices provided", () => {
    const costs = calculateCosts({
      bagsRequired: 14,
      volumeCubicYards: 0.972222,
      pricePerBag: 4,
      pricePerCubicYard: 45,
      deliveryFee: 20,
    });
    expect(costs.baggedSubtotal).toBe(56);
    expect(costs.baggedTotal).toBe(76);
    expect(costs.bulkSubtotal).toBeCloseTo(43.75, 2);
    expect(costs.bulkTotal).toBeCloseTo(63.75, 2);
    expect(costs.cheaperOption).toBe("bulk");
  });

  it("omits costs when prices missing", () => {
    const result = calculateMulch(baseInput());
    expect(result.costs.baggedTotal).toBeNull();
    expect(result.costs.bulkTotal).toBeNull();
  });

  it("reports error when no beds have dimensions", () => {
    const result = calculateMulch(
      baseInput({
        beds: [
          {
            id: "empty",
            name: "Empty",
            shape: "rectangle",
            length: null,
            width: null,
            diameter: null,
            height: null,
          },
        ],
      }),
    );
    expect(result.hasValidBeds).toBe(false);
    expect(result.errors[0]).toMatch(/Add at least one garden bed/);
  });

  it("handles zero-area beds safely", () => {
    const result = calculateMulch(
      baseInput({
        beds: [
          {
            id: "z",
            name: "Zero",
            shape: "rectangle",
            length: 0,
            width: 10,
            diameter: null,
            height: null,
          },
        ],
      }),
    );
    expect(result.volumeCubicYards).toBe(0);
    expect(result.bagsRequired).toBe(0);
  });
});
