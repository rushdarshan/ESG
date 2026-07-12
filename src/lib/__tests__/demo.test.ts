import { describe, it, expect } from "vitest";
import { HEALTHY_SCENARIO } from "@/data/demo/greenforge-healthy/data";
import { POOR_SCENARIO } from "@/data/demo/greenforge-poor/data";

describe("U12: Demo Data Pack", () => {
  describe("Healthy Scenario", () => {
    it("has organization info", () => {
      expect(HEALTHY_SCENARIO.organization.name).toBeTruthy();
      expect(HEALTHY_SCENARIO.organization.industry).toBeTruthy();
    });

    it("has 5+ departments", () => {
      expect(HEALTHY_SCENARIO.departments.length).toBeGreaterThanOrEqual(5);
    });

    it("has unique employee emails", () => {
      const emails = HEALTHY_SCENARIO.employees.map((e) => e.email);
      expect(new Set(emails).size).toBe(emails.length);
    });

    it("has metrics for Q3 and Q4", () => {
      const periods = [...new Set(HEALTHY_SCENARIO.metrics.map((m) => m.period))];
      expect(periods).toContain("2024-Q3");
      expect(periods).toContain("2024-Q4");
    });

    it("has Scope 1, 2, and 3 metrics", () => {
      const scopes = new Set(HEALTHY_SCENARIO.metrics.map((m) => m.scope));
      expect(scopes.has(1)).toBe(true);
      expect(scopes.has(2)).toBe(true);
      expect(scopes.has(3)).toBe(true);
    });

    it("has employee actions with valid XP", () => {
      for (const action of HEALTHY_SCENARIO.actions) {
        expect(action.xpAwarded).toBeGreaterThan(0);
        expect(action.carbonSaved).toBeGreaterThan(0);
        expect(action.confidence).toBeGreaterThan(0);
        expect(action.confidence).toBeLessThanOrEqual(1);
      }
    });

    it("has ESG scores around 82", () => {
      const q4 = HEALTHY_SCENARIO.esgScores.find((s) => s.period === "2024-Q4");
      expect(q4?.overall).toBe(82);
    });

    it("Q4 shows improvement over Q3", () => {
      const q3 = HEALTHY_SCENARIO.esgScores.find((s) => s.period === "2024-Q3")!;
      const q4 = HEALTHY_SCENARIO.esgScores.find((s) => s.period === "2024-Q4")!;
      expect(q4.overall).toBeGreaterThan(q3.overall);
    });
  });

  describe("Poor Scenario", () => {
    it("has ESG scores around 41", () => {
      const q4 = POOR_SCENARIO.esgScores.find((s) => s.period === "2024-Q4");
      expect(q4?.overall).toBe(41);
    });

    it("has fuel anomaly (Q4 > Q3 by >30%)", () => {
      const q3Fuel = POOR_SCENARIO.metrics.filter(
        (m) => m.period === "2024-Q3" && m.category === "fuel"
      );
      const q4Fuel = POOR_SCENARIO.metrics.filter(
        (m) => m.period === "2024-Q4" && m.category === "fuel"
      );
      const q3Total = q3Fuel.reduce((sum, m) => sum + m.value, 0);
      const q4Total = q4Fuel.reduce((sum, m) => sum + m.value, 0);
      const change = (q4Total - q3Total) / q3Total;
      expect(change).toBeGreaterThan(0.3); // >30% increase
    });

    it("has fewer actions than healthy scenario", () => {
      expect(POOR_SCENARIO.actions.length).toBeLessThan(HEALTHY_SCENARIO.actions.length);
    });

    it("is missing waste data for Q4 (intentional gap)", () => {
      const q4Waste = POOR_SCENARIO.metrics.filter(
        (m) => m.period === "2024-Q4" && m.category === "waste"
      );
      expect(q4Waste.length).toBe(0);
    });

    it("has same employees as healthy scenario", () => {
      const healthyEmails = HEALTHY_SCENARIO.employees.map((e) => e.email).sort();
      const poorEmails = POOR_SCENARIO.employees.map((e) => e.email).sort();
      expect(poorEmails).toEqual(healthyEmails);
    });
  });

  describe("Scenario Comparison", () => {
    it("healthy score > poor score", () => {
      const healthyQ4 = HEALTHY_SCENARIO.esgScores.find((s) => s.period === "2024-Q4")!;
      const poorQ4 = POOR_SCENARIO.esgScores.find((s) => s.period === "2024-Q4")!;
      expect(healthyQ4.overall).toBeGreaterThan(poorQ4.overall);
    });

    it("healthy has higher environmental score", () => {
      const healthyQ4 = HEALTHY_SCENARIO.esgScores.find((s) => s.period === "2024-Q4")!;
      const poorQ4 = POOR_SCENARIO.esgScores.find((s) => s.period === "2024-Q4")!;
      expect(healthyQ4.environmental).toBeGreaterThan(poorQ4.environmental);
    });

    it("healthy has more employee actions", () => {
      expect(HEALTHY_SCENARIO.actions.length).toBeGreaterThan(POOR_SCENARIO.actions.length);
    });
  });
});
