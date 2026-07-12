import { describe, expect, it } from "vitest";
import { calculateEmissions } from "../calculator";
import type { ExtractedDocument } from "@/lib/ai/provider";

function makeExtraction(
  overrides: Partial<ExtractedDocument> = {},
): ExtractedDocument {
  return {
    vendor: "Test Vendor",
    amount: 100,
    currency: "USD",
    date: "2024-06-15",
    category: "electricity",
    quantity: 1000,
    unit: "kWh",
    description: "Test extraction",
    rawText: "raw",
    ...overrides,
  };
}

describe("calculateEmissions", () => {
  it("calculates Scope 2 for electricity", async () => {
    const result = await calculateEmissions(
      makeExtraction({ category: "electricity", quantity: 1000, unit: "kWh" }),
    );

    expect(result.transaction.scope).toBe(2);
    expect(result.transaction.emissions).toBeCloseTo(417, 0);
    expect(result.transaction.unit).toBe("kgCO2e");
    expect(result.transaction.confidence).toBeGreaterThan(0);
    expect(result.transaction.confidence).toBeLessThanOrEqual(1);
  });

  it("calculates Scope 1 for diesel", async () => {
    const result = await calculateEmissions(
      makeExtraction({ category: "diesel", quantity: 100, unit: "liter" }),
    );

    expect(result.transaction.scope).toBe(1);
    expect(result.transaction.emissions).toBeCloseTo(268, 0);
  });

  it("calculates Scope 3 for travel", async () => {
    const result = await calculateEmissions(
      makeExtraction({
        category: "travel",
        quantity: 500,
        unit: "km",
      }),
    );

    expect(result.transaction.scope).toBe(3);
    expect(result.transaction.emissions).toBeGreaterThan(0);
  });

  it("calculates Scope 1 for natural gas", async () => {
    const result = await calculateEmissions(
      makeExtraction({
        category: "natural_gas",
        quantity: 50,
        unit: "therm",
      }),
    );

    expect(result.transaction.scope).toBe(1);
    expect(result.transaction.emissions).toBeCloseTo(265, 0);
  });

  it("returns provenance with factor details", async () => {
    const result = await calculateEmissions(
      makeExtraction({ category: "electricity", quantity: 100, unit: "kWh" }),
    );

    expect(result.provenance.emissionFactorUsed).toBeTruthy();
    expect(result.provenance.emissionFactorVersion).toBeTruthy();
    expect(result.provenance.extractedAt).toBeTruthy();
    expect(result.provenance.confidence).toBeGreaterThan(0);
  });

  it("falls back for unknown category", async () => {
    const result = await calculateEmissions(
      makeExtraction({
        category: "unknown_category",
        quantity: 100,
        unit: "kg",
      }),
    );

    expect(result.transaction.emissions).toBeGreaterThan(0);
    expect(result.transaction.emissionFactor.source).toBe("fallback");
  });

  it("scales emissions proportionally with quantity", async () => {
    const small = await calculateEmissions(
      makeExtraction({ category: "electricity", quantity: 100, unit: "kWh" }),
    );
    const large = await calculateEmissions(
      makeExtraction({ category: "electricity", quantity: 1000, unit: "kWh" }),
    );

    expect(large.transaction.emissions).toBeCloseTo(
      small.transaction.emissions * 10,
      0,
    );
  });

  it("confidence accounts for extraction completeness", async () => {
    const full = await calculateEmissions(
      makeExtraction({
        vendor: "Real Vendor",
        amount: 500,
        date: "2024-01-01",
        quantity: 1000,
      }),
    );
    const minimal = await calculateEmissions(
      makeExtraction({
        vendor: "",
        amount: 0,
        date: "",
        quantity: 0,
      }),
    );

    expect(full.transaction.confidence).toBeGreaterThan(
      minimal.transaction.confidence,
    );
  });
});
