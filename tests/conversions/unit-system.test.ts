import { describe, expect, it } from "vitest";
import {
  convertBedMeasurements,
  convertDepthMeasurement,
  convertLinearMeasurement,
} from "@/lib/conversions/unit-system";

describe("unit system conversions", () => {
  it("converts linear feet to metres and back", () => {
    const metres = convertLinearMeasurement(10, "imperial", "metric");
    expect(metres).toBeCloseTo(3.048, 3);
    expect(convertLinearMeasurement(metres, "metric", "imperial")).toBeCloseTo(10, 3);
  });

  it("converts depth inches to centimetres and back", () => {
    const cm = convertDepthMeasurement(3, "imperial", "metric");
    expect(cm).toBeCloseTo(7.62, 2);
    expect(convertDepthMeasurement(cm, "metric", "imperial")).toBeCloseTo(3, 3);
  });

  it("converts all bed dimensions together", () => {
    const metricBed = convertBedMeasurements(
      {
        id: "1",
        name: "Bed",
        shape: "rectangle",
        length: 12,
        width: 4,
        diameter: null,
        height: null,
      },
      "imperial",
      "metric",
    );
    expect(metricBed.length).toBeCloseTo(3.6576, 3);
    expect(metricBed.width).toBeCloseTo(1.2192, 3);
  });

  it("leaves values unchanged when systems match", () => {
    expect(convertDepthMeasurement(6, "imperial", "imperial")).toBe(6);
  });
});
