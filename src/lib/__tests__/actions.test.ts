import { describe, it, expect } from "vitest";
import {
  ACTION_TYPES,
  ACTION_MAP,
  calculateXP,
  calculateLevel,
  checkNewBadge,
  BADGE_THRESHOLDS,
} from "@/lib/actions";

describe("U5: Employee Action System", () => {
  describe("Action Type Definitions", () => {
    it("defines all 10 action types", () => {
      expect(ACTION_TYPES).toHaveLength(10);
    });

    it("has unique IDs for each action type", () => {
      const ids = ACTION_TYPES.map((a) => a.id);
      expect(new Set(ids).size).toBe(10);
    });

    it("ACTION_MAP provides O(1) lookup by ID", () => {
      expect(ACTION_MAP.bike_commute).toBeDefined();
      expect(ACTION_MAP.bike_commute.baseCarbon).toBe(8.2);
      expect(ACTION_MAP.tree_planting.baseCarbon).toBe(21.0);
    });

    it("each action type has required fields", () => {
      for (const action of ACTION_TYPES) {
        expect(action.id).toBeTruthy();
        expect(action.name).toBeTruthy();
        expect(action.icon).toBeTruthy();
        expect(action.baseXP).toBeGreaterThan(0);
        expect(action.baseCarbon).toBeGreaterThan(0);
        expect(action.unit).toBeTruthy();
        expect(action.category).toMatch(/^(commute|energy|waste|community|learning)$/);
      }
    });
  });

  describe("XP Calculation", () => {
    it("calculates XP with confidence multiplier", () => {
      expect(calculateXP(25, 94)).toBe(24);
    });

    it("returns base XP at 100% confidence", () => {
      expect(calculateXP(25, 100)).toBe(25);
    });

    it("returns 0 at 0% confidence", () => {
      expect(calculateXP(25, 0)).toBe(0);
    });

    it("rounds to nearest integer", () => {
      expect(calculateXP(15, 87)).toBe(13);
    });
  });

  describe("Level Calculation", () => {
    it("starts at level 1", () => {
      expect(calculateLevel(0)).toBe(1);
    });

    it("levels up every 100 XP", () => {
      expect(calculateLevel(99)).toBe(1);
      expect(calculateLevel(100)).toBe(2);
      expect(calculateLevel(250)).toBe(3);
    });
  });

  describe("Badge Thresholds", () => {
    it("defines 10 badge types", () => {
      expect(BADGE_THRESHOLDS).toHaveLength(10);
    });

    it("each badge has a unique type", () => {
      const types = BADGE_THRESHOLDS.map((b) => b.type);
      expect(new Set(types).size).toBe(10);
    });
  });

  describe("Badge Eligibility", () => {
    // Pre-award all badges that come before the one we're testing
    const ALL_COUNT_BADGES = new Set(["first_action", "5_actions", "10_actions", "25_actions", "50_actions"]);
    const ALL_CARBON_BADGES = new Set(["first_action", "5_actions", "10_actions", "25_actions", "50_actions", "100kg_saved", "250kg_saved"]);

    it("awards first_action badge at 1 action", () => {
      expect(checkNewBadge(1, 0, {}, new Set())).toBe("first_action");
    });

    it("does not re-award first_action if already earned", () => {
      expect(checkNewBadge(5, 0, {}, new Set(["first_action"]))).toBe("5_actions");
    });

    it("awards 100kg_saved when earlier badges are earned", () => {
      expect(checkNewBadge(10, 100, {}, ALL_COUNT_BADGES)).toBe("100kg_saved");
    });

    it("does not award 100kg_saved below 100 kg", () => {
      expect(checkNewBadge(10, 99, {}, ALL_COUNT_BADGES)).toBeNull();
    });

    it("awards green_commuter when low-carbon commutes >= 5", () => {
      const counts = { bike_commute: 3, walking: 2 };
      expect(checkNewBadge(5, 0, counts, ALL_CARBON_BADGES)).toBe("green_commuter");
    });

    it("does not award green_commuter at 4 commutes", () => {
      const counts = { bike_commute: 2, walking: 2 };
      expect(checkNewBadge(4, 0, counts, ALL_CARBON_BADGES)).toBeNull();
    });

    it("awards eco_champion when 5 different action types used", () => {
      const counts = { bike_commute: 1, walking: 1, recycling: 1, tree_planting: 1, energy_saving: 1 };
      expect(checkNewBadge(5, 0, counts, ALL_CARBON_BADGES)).toBe("eco_champion");
    });

    it("returns null when no new badge earned", () => {
      expect(checkNewBadge(0, 0, {}, new Set())).toBeNull();
    });

    it("skips already-earned badges and finds next eligible", () => {
      const existing = new Set(["first_action", "5_actions"]);
      expect(checkNewBadge(10, 0, {}, existing)).toBe("10_actions");
    });

    it("awards 500kg_saved at 500 kg", () => {
      expect(checkNewBadge(50, 500, {}, ALL_CARBON_BADGES)).toBe("500kg_saved");
    });
  });
});
