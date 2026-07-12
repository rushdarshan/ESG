import { describe, it, expect } from "vitest";
import { checkGRICompliance, GRI_DISCLOSURES } from "@/lib/compliance/gri";
import { checkCSRDCompliance, ESRS_TOPICS } from "@/lib/compliance/csrd";

describe("U7: Compliance Checkers", () => {
  describe("GRI Compliance", () => {
    it("defines GRI disclosures", () => {
      expect(GRI_DISCLOSURES.length).toBeGreaterThan(0);
    });

    it("returns 100% for fully covered metrics", () => {
      const result = checkGRICompliance(
        ["electricity", "natural_gas", "fuel", "diesel", "gasoline", "travel", "waste", "water"],
        10,
        5
      );
      expect(result.overallScore).toBeGreaterThan(0);
      expect(result.framework).toBe("GRI");
    });

    it("returns low score for empty metrics", () => {
      const result = checkGRICompliance([], 0, 0);
      expect(result.overallScore).toBe(0);
      expect(result.gaps.length).toBeGreaterThan(0);
      expect(result.recommendations.length).toBeGreaterThan(0);
    });

    it("calculates environmental score separately", () => {
      const result = checkGRICompliance(
        ["electricity", "natural_gas", "diesel"],
        0,
        0
      );
      expect(result.environmentalScore).toBeGreaterThan(0);
    });

    it("calculates social score separately", () => {
      const result = checkGRICompliance(
        ["employee_count", "training_hours"],
        10,
        0
      );
      expect(result.socialScore).toBeGreaterThan(0);
    });

    it("identifies gaps for missing metrics", () => {
      const result = checkGRICompliance(["electricity"], 0, 0);
      const gaps = result.gaps.join(" ");
      expect(gaps).toContain("missing");
    });

    it("provides recommendations for low scores", () => {
      const result = checkGRICompliance([], 0, 0);
      expect(result.recommendations.length).toBeGreaterThan(0);
    });
  });

  describe("CSRD Compliance", () => {
    it("defines ESRS topics", () => {
      expect(ESRS_TOPICS.length).toBeGreaterThan(0);
    });

    it("returns higher score with more data", () => {
      const sparse = checkCSRDCompliance([], false, false);
      const rich = checkCSRDCompliance(
        ["scope1_emissions", "scope2_emissions", "scope3_emissions", "energy_consumption", "employee_count", "training_hours"],
        true,
        true
      );
      expect(rich.overallScore).toBeGreaterThan(sparse.overallScore);
    });

    it("returns framework identifier", () => {
      const result = checkCSRDCompliance([], false, false);
      expect(result.framework).toBe("CSRD-ESRS");
    });

    it("scores environmental separately", () => {
      const result = checkCSRDCompliance(
        ["scope1_emissions", "scope2_emissions", "scope3_emissions", "energy_consumption"],
        true,
        true
      );
      expect(result.environmentalScore).toBeGreaterThan(0);
    });

    it("scores social separately", () => {
      const result = checkCSRDCompliance(
        ["employee_count", "training_hours"],
        false,
        false
      );
      expect(result.socialScore).toBeGreaterThan(0);
    });

    it("recommends evidence chain when invalid", () => {
      const result = checkCSRDCompliance([], false, false);
      const hasEvidenceRec = result.recommendations.some((r) =>
        r.includes("evidence")
      );
      expect(hasEvidenceRec).toBe(true);
    });

    it("recommends emission scopes when missing", () => {
      const result = checkCSRDCompliance([], true, false);
      const hasEmissionRec = result.recommendations.some((r) =>
        r.includes("Scope")
      );
      expect(hasEmissionRec).toBe(true);
    });
  });
});
