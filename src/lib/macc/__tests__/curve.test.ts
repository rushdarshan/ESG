import { describe, expect, it } from "vitest";
import {
  generateCurve,
  getKnowledgeBase,
  calculatePaybackPeriod,
  calculateMarginalAbatementCost,
} from "../curve";

describe("getKnowledgeBase", () => {
  it("returns at least 10 measures", () => {
    const kb = getKnowledgeBase();
    expect(kb.length).toBeGreaterThanOrEqual(10);
  });

  it("each measure has required fields", () => {
    const kb = getKnowledgeBase();
    for (const m of kb) {
      expect(m.id).toBeTruthy();
      expect(m.name).toBeTruthy();
      expect(m.category).toBeTruthy();
      expect(typeof m.annualEmissionReduction).toBe("number");
      expect(typeof m.annualFinancialSavings).toBe("number");
      expect(typeof m.implementationCost).toBe("number");
      expect(typeof m.paybackPeriod).toBe("number");
      expect(typeof m.marginalAbatementCost).toBe("number");
      expect(m.source).toBeTruthy();
      expect(m.assumptions).toBeTruthy();
    }
  });
});

describe("generateCurve", () => {
  it("returns measures ranked by marginal abatement cost (lowest to highest)", () => {
    const curve = generateCurve();
    for (let i = 1; i < curve.measures.length; i++) {
      expect(curve.measures[i].costPerTonne).toBeGreaterThanOrEqual(
        curve.measures[i - 1].costPerTonne,
      );
    }
  });

  it("selects negative-cost measures by default", () => {
    const curve = generateCurve();
    const negativeCost = curve.measures.filter((m) => m.costPerTonne < 0);
    const selectedNegative = curve.measures.filter(
      (m) => m.costPerTonne < 0 && m.selected,
    );
    expect(selectedNegative.length).toBe(negativeCost.length);
  });

  it("does not select positive-cost measures by default", () => {
    const curve = generateCurve();
    const positiveCostSelected = curve.measures.filter(
      (m) => m.costPerTonne > 0 && m.selected,
    );
    expect(positiveCostSelected.length).toBe(0);
  });

  it("calculates cumulative reduction correctly", () => {
    const curve = generateCurve();
    let cumulative = 0;
    for (const m of curve.measures) {
      cumulative += m.reduction;
      expect(m.cumulativeReduction).toBeCloseTo(cumulative, 0);
    }
  });

  it("totalReduction sums selected measures only", () => {
    const curve = generateCurve();
    const expected = curve.measures
      .filter((m) => m.selected)
      .reduce((sum, m) => sum + m.reduction, 0);
    expect(curve.totalReduction).toBeCloseTo(expected, 0);
  });

  it("totalSavings sums selected measures only", () => {
    const curve = generateCurve();
    const expected = curve.measures
      .filter((m) => m.selected)
      .reduce((sum, m) => sum + m.annualFinancialSavings, 0);
    expect(curve.totalSavings).toBe(expected);
  });

  it("totalImplementationCost sums selected measures only", () => {
    const curve = generateCurve();
    const expected = curve.measures
      .filter((m) => m.selected)
      .reduce((sum, m) => sum + m.implementationCost, 0);
    expect(curve.totalImplementationCost).toBe(expected);
  });

  it("accepts custom baseline emissions", () => {
    const curve = generateCurve(1000);
    expect(curve.baselineEmissions).toBe(1000);
  });

  it("respects explicit selectedIds", () => {
    const curve = generateCurve(500, ["rooftop-solar", "led-retrofit"]);
    const solar = curve.measures.find((m) => m.id === "rooftop-solar");
    const led = curve.measures.find((m) => m.id === "led-retrofit");
    const insulation = curve.measures.find((m) => m.id === "building-insulation");
    expect(solar?.selected).toBe(true);
    expect(led?.selected).toBe(true);
    expect(insulation?.selected).toBe(false);
  });

  it("returns consistent shape for each measure", () => {
    const curve = generateCurve();
    for (const m of curve.measures) {
      expect(typeof m.id).toBe("string");
      expect(typeof m.name).toBe("string");
      expect(typeof m.costPerTonne).toBe("number");
      expect(typeof m.reduction).toBe("number");
      expect(typeof m.source).toBe("string");
      expect(typeof m.selected).toBe("boolean");
      expect(typeof m.annualFinancialSavings).toBe("number");
      expect(typeof m.implementationCost).toBe("number");
      expect(typeof m.paybackPeriod).toBe("number");
      expect(typeof m.category).toBe("string");
      expect(typeof m.assumptions).toBe("string");
      expect(typeof m.cumulativeReduction).toBe("number");
    }
  });
});

describe("calculatePaybackPeriod", () => {
  it("calculates payback correctly", () => {
    expect(calculatePaybackPeriod(10000, 5000)).toBeCloseTo(2, 5);
  });

  it("returns Infinity when annual savings is zero", () => {
    expect(calculatePaybackPeriod(10000, 0)).toBe(Infinity);
  });

  it("returns Infinity when annual savings is negative", () => {
    expect(calculatePaybackPeriod(10000, -1000)).toBe(Infinity);
  });

  it("returns 0 for negative implementation cost", () => {
    expect(calculatePaybackPeriod(-5000, 1000)).toBe(0);
  });
});

describe("calculateMarginalAbatementCost", () => {
  it("calculates cost per tonne correctly", () => {
    expect(calculateMarginalAbatementCost(100000, 500)).toBeCloseTo(200, 5);
  });

  it("returns Infinity when lifetime reduction is zero", () => {
    expect(calculateMarginalAbatementCost(100000, 0)).toBe(Infinity);
  });

  it("returns Infinity when lifetime reduction is negative", () => {
    expect(calculateMarginalAbatementCost(100000, -100)).toBe(Infinity);
  });

  it("returns negative cost for negative implementation cost", () => {
    expect(calculateMarginalAbatementCost(-5000, 100)).toBeCloseTo(-50, 5);
  });
});

describe("zero-emission reduction edge case", () => {
  it("measures with zero reduction still appear in curve", () => {
    const kb = getKnowledgeBase();
    const zeroReduction = kb.filter((m) => m.annualEmissionReduction === 0);
    if (zeroReduction.length > 0) {
      const curve = generateCurve();
      for (const m of zeroReduction) {
        expect(curve.measures.find((cm) => cm.id === m.id)).toBeDefined();
      }
    }
  });
});

describe("invalid inputs", () => {
  it("handles negative baseline gracefully", () => {
    const curve = generateCurve(-100);
    expect(curve.baselineEmissions).toBe(-100);
    expect(curve.measures.length).toBeGreaterThan(0);
  });

  it("handles empty selectedIds array", () => {
    const curve = generateCurve(500, []);
    const selected = curve.measures.filter((m) => m.selected);
    expect(selected.length).toBe(0);
  });

  it("handles nonexistent selectedIds gracefully", () => {
    const curve = generateCurve(500, ["nonexistent-id"]);
    const selected = curve.measures.filter((m) => m.selected);
    expect(selected.length).toBe(0);
  });
});

describe("negative-cost actions", () => {
  it("negative-cost measures have costPerTonne < 0", () => {
    const curve = generateCurve();
    const negativeCost = curve.measures.filter((m) => m.costPerTonne < 0);
    for (const m of negativeCost) {
      expect(m.costPerTonne).toBeLessThan(0);
    }
  });

  it("negative-cost measures represent net savings", () => {
    const curve = generateCurve();
    const negativeCost = curve.measures.filter((m) => m.costPerTonne < 0);
    for (const m of negativeCost) {
      expect(m.annualFinancialSavings).toBeGreaterThan(0);
    }
  });

  it("all negative-cost measures are selected by default", () => {
    const curve = generateCurve();
    const negativeCost = curve.measures.filter((m) => m.costPerTonne < 0);
    for (const m of negativeCost) {
      expect(m.selected).toBe(true);
    }
  });
});
