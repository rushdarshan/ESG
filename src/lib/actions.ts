// Single source of truth for U5 action types and badge logic

export interface ActionTypeDef {
  id: string;
  name: string;
  icon: string;
  description: string;
  baseXP: number;
  baseCarbon: number;
  unit: string;
  category: "commute" | "energy" | "waste" | "community" | "learning";
}

export const ACTION_TYPES: ActionTypeDef[] = [
  { id: "bike_commute", name: "Bike Commute", icon: "\ud83d\udeb2", description: "Cycled to work instead of driving", baseXP: 25, baseCarbon: 8.2, unit: "trip", category: "commute" },
  { id: "walking", name: "Walking", icon: "\ud83d\udeb6", description: "Walked to work or for errands", baseXP: 20, baseCarbon: 6.5, unit: "trip", category: "commute" },
  { id: "public_transport", name: "Public Transport", icon: "\ud83d\ude8c", description: "Used bus, train, or metro", baseXP: 15, baseCarbon: 5.1, unit: "trip", category: "commute" },
  { id: "carpool", name: "Carpool", icon: "\ud83d\ude97", description: "Shared a ride with colleagues", baseXP: 18, baseCarbon: 4.3, unit: "trip", category: "commute" },
  { id: "work_from_home", name: "Work From Home", icon: "\ud83c\udfe0", description: "Worked remotely to avoid commute", baseXP: 12, baseCarbon: 3.2, unit: "day", category: "energy" },
  { id: "recycling", name: "Recycling", icon: "\u267b\ufe0f", description: "Recycled materials at work", baseXP: 10, baseCarbon: 2.1, unit: "kg", category: "waste" },
  { id: "tree_planting", name: "Tree Planting", icon: "\ud83c\udf33", description: "Planted trees for carbon offset", baseXP: 30, baseCarbon: 21.0, unit: "tree", category: "community" },
  { id: "csr_volunteering", name: "CSR Volunteering", icon: "\ud83e\udd1d", description: "Volunteered for sustainability initiative", baseXP: 15, baseCarbon: 1.5, unit: "hour", category: "community" },
  { id: "energy_saving", name: "Energy Saving", icon: "\ud83d\udd0b", description: "Suggested or implemented energy savings", baseXP: 10, baseCarbon: 1.0, unit: "action", category: "energy" },
  { id: "sustainability_training", name: "Sustainability Training", icon: "\ud83d\udcda", description: "Completed sustainability training", baseXP: 8, baseCarbon: 0.5, unit: "hour", category: "learning" },
];

export const ACTION_MAP = Object.fromEntries(ACTION_TYPES.map((a) => [a.id, a])) as Record<string, ActionTypeDef>;

// ── XP Calculation ──────────────────────────────────────────────

export function calculateXP(baseXP: number, confidencePercent: number): number {
  return Math.round(baseXP * (confidencePercent / 100));
}

export function calculateLevel(totalXP: number): number {
  return Math.floor(totalXP / 100) + 1;
}

// ── Badge Logic ─────────────────────────────────────────────────

export interface BadgeThreshold {
  type: string;
  name: string;
  icon: string;
  description: string;
  condition: (actionCount: number, totalCarbon: number, actionCounts: Record<string, number>) => boolean;
}

export const BADGE_THRESHOLDS: BadgeThreshold[] = [
  { type: "first_action", name: "First Step", icon: "\ud83c\udf1f", description: "Logged your first sustainable action", condition: (c) => c >= 1 },
  { type: "5_actions", name: "Getting Started", icon: "\ud83d\ude80", description: "Logged 5 sustainable actions", condition: (c) => c >= 5 },
  { type: "10_actions", name: "Eco Warrior", icon: "\ud83c\udf1f", description: "Logged 10 sustainable actions", condition: (c) => c >= 10 },
  { type: "25_actions", name: "Green Machine", icon: "\ud83d\udee1\ufe0f", description: "Logged 25 sustainable actions", condition: (c) => c >= 25 },
  { type: "50_actions", name: "Planet Defender", icon: "\ud83c\udf0d", description: "Logged 50 sustainable actions", condition: (c) => c >= 50 },
  { type: "100kg_saved", name: "Carbon Cutter", icon: "\u2728", description: "Saved 100 kg CO\u2082e", condition: (_, tc) => tc >= 100 },
  { type: "250kg_saved", name: "Climate Hero", icon: "\ud83c\udf19", description: "Saved 250 kg CO\u2082e", condition: (_, tc) => tc >= 250 },
  { type: "500kg_saved", name: "Earth Guardian", icon: "\ud83c\udf0e", description: "Saved 500 kg CO\u2082e", condition: (_, tc) => tc >= 500 },
  { type: "green_commuter", name: "Green Commuter", icon: "\ud83d\udeb2", description: "5 low-carbon commutes", condition: (_, __, ac) => (ac.bike_commute || 0) + (ac.walking || 0) + (ac.public_transport || 0) >= 5 },
  { type: "eco_champion", name: "Eco Champion", icon: "\ud83c\udfc6", description: "Tried 5 different action types", condition: (_, __, ac) => Object.values(ac).filter((v) => v > 0).length >= 5 },
];

export function checkNewBadge(
  actionCount: number,
  totalCarbon: number,
  actionCounts: Record<string, number>,
  existingBadgeTypes: Set<string>
): string | null {
  for (const threshold of BADGE_THRESHOLDS) {
    if (!existingBadgeTypes.has(threshold.type) && threshold.condition(actionCount, totalCarbon, actionCounts)) {
      return threshold.type;
    }
  }
  return null;
}

// ── Evidence Options ────────────────────────────────────────────

export const EVIDENCE_OPTIONS = [
  { type: "photo", label: "Photo", icon: "\ud83d\udcf7" },
  { type: "receipt", label: "Receipt", icon: "\ud83d\udcc4" },
  { type: "certificate", label: "Certificate", icon: "\ud83c\udfc6" },
  { type: "gps", label: "GPS Location", icon: "\ud83d\udccd" },
  { type: "self_report", label: "Self Report", icon: "\ud83d\udcdd" },
] as const;
