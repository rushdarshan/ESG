// GreenForge Industries — Poor Scenario Demo Data
// ESG Score: ~41 (E:35 / S:48 / G:40)
// Intentional anomalies: fuel spike, missing waste records, low engagement

export const POOR_SCENARIO = {
  organization: {
    name: "GreenForge Industries",
    industry: "Manufacturing",
  },
  departments: ["Operations", "Human Resources", "Finance", "Engineering", "Sales"],
  employees: [
    { name: "Alex Rivera", email: "alex@greenforge.com", role: "sustainability_manager", department: "Operations" },
    { name: "Sam Chen", email: "sam@greenforge.com", role: "employee", department: "Human Resources" },
    { name: "Jordan Patel", email: "jordan@greenforge.com", role: "cfo", department: "Finance" },
    { name: "Maya Johnson", email: "maya@greenforge.com", role: "employee", department: "Engineering" },
    { name: "Raj Kumar", email: "raj@greenforge.com", role: "employee", department: "Sales" },
    { name: "Lisa Wang", email: "lisa@greenforge.com", role: "employee", department: "Engineering" },
    { name: "Tom Brown", email: "tom@greenforge.com", role: "employee", department: "Operations" },
    { name: "Nina Patel", email: "nina@greenforge.com", role: "employee", department: "Human Resources" },
  ],
  locations: [
    { name: "HQ — Portland, OR", type: "office" },
    { name: "Plant A — Salem, OR", type: "manufacturing" },
  ],
  // Quarterly metrics with anomalies
  metrics: [
    // Q3 2024 (baseline)
    { period: "2024-Q3", scope: 1, value: 52.0, unit: "tCO2e", confidence: 0.90, category: "fuel", description: "Fleet diesel — Q3" },
    { period: "2024-Q3", scope: 2, value: 135.8, unit: "tCO2e", confidence: 0.91, category: "electricity", description: "Grid electricity Q3" },
    { period: "2024-Q3", scope: 3, value: 98.5, unit: "tCO2e", confidence: 0.75, category: "travel", description: "Business travel Q3" },
    // Q4 2024 (ANOMALY: fuel spike +38%, missing waste data)
    { period: "2024-Q4", scope: 1, value: 71.8, unit: "tCO2e", confidence: 0.88, category: "fuel", description: "Fleet diesel — Q4 ANOMALY: spike" },
    { period: "2024-Q4", scope: 2, value: 142.3, unit: "tCO2e", confidence: 0.89, category: "electricity", description: "Grid electricity Q4 — increased usage" },
    { period: "2024-Q4", scope: 3, value: 105.2, unit: "tCO2e", confidence: 0.72, category: "travel", description: "Business travel Q4 — high" },
    // Missing waste records for Q4 (intentional gap)
  ],
  // Very few employee actions (low engagement)
  actions: [
    { employee: "alex@greenforge.com", actionType: "energy_saving", carbonSaved: 1.0, xpAwarded: 10, confidence: 0.85, evidenceType: "self_report", status: "approved", notes: "Turned off unused equipment" },
    { employee: "sam@greenforge.com", actionType: "public_transport", carbonSaved: 5.1, xpAwarded: 15, confidence: 0.90, evidenceType: "receipt", status: "approved", notes: "Monthly transit pass" },
    { employee: "maya@greenforge.com", actionType: "recycling", carbonSaved: 2.1, xpAwarded: 10, confidence: 0.88, evidenceType: "photo", status: "approved", notes: "Recycled lab materials" },
  ],
  esgScores: [
    { period: "2024-Q3", overall: 45, environmental: 40, social: 52, governance: 44 },
    { period: "2024-Q4", overall: 41, environmental: 35, social: 48, governance: 40 },
  ],
};
