// GreenForge Industries — Healthy Scenario Demo Data
// ESG Score: ~82 (E:78 / S:85 / G:83)
// Intentionally strong performer with minor gaps

export const HEALTHY_SCENARIO = {
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
  // Quarterly metrics (tCO2e)
  metrics: [
    // Q3 2024
    { period: "2024-Q3", scope: 1, value: 48.5, unit: "tCO2e", confidence: 0.95, category: "fuel", description: "Fleet diesel — Q3" },
    { period: "2024-Q3", scope: 2, value: 125.2, unit: "tCO2e", confidence: 0.93, category: "electricity", description: "Grid electricity Q3" },
    { period: "2024-Q3", scope: 3, value: 92.1, unit: "tCO2e", confidence: 0.78, category: "travel", description: "Business travel Q3" },
    { period: "2024-Q3", scope: 3, value: 18.4, unit: "tCO2e", confidence: 0.82, category: "waste", description: "Waste disposal Q3" },
    // Q4 2024 (improved)
    { period: "2024-Q4", scope: 1, value: 45.2, unit: "tCO2e", confidence: 0.95, category: "fuel", description: "Fleet diesel — Q4" },
    { period: "2024-Q4", scope: 2, value: 120.5, unit: "tCO2e", confidence: 0.92, category: "electricity", description: "Grid electricity — HQ + Plant A" },
    { period: "2024-Q4", scope: 3, value: 88.3, unit: "tCO2e", confidence: 0.78, category: "travel", description: "Business travel — flights + ground" },
    { period: "2024-Q4", scope: 3, value: 16.1, unit: "tCO2e", confidence: 0.85, category: "waste", description: "Waste disposal Q4 — improved recycling" },
  ],
  // Employee actions
  actions: [
    { employee: "alex@greenforge.com", actionType: "bike_commute", carbonSaved: 8.2, xpAwarded: 25, confidence: 0.95, evidenceType: "gps", status: "approved", notes: "Cycled 12km to HQ" },
    { employee: "alex@greenforge.com", actionType: "recycling", carbonSaved: 2.1, xpAwarded: 10, confidence: 0.90, evidenceType: "photo", status: "approved", notes: "Recycled office paper batch" },
    { employee: "alex@greenforge.com", actionType: "energy_saving", carbonSaved: 1.5, xpAwarded: 10, confidence: 0.88, evidenceType: "self_report", status: "approved", notes: "Installed LED fixtures in Conference Room B" },
    { employee: "sam@greenforge.com", actionType: "public_transport", carbonSaved: 5.1, xpAwarded: 15, confidence: 0.92, evidenceType: "receipt", status: "approved", notes: "Monthly transit pass" },
    { employee: "sam@greenforge.com", actionType: "work_from_home", carbonSaved: 3.2, xpAwarded: 12, confidence: 0.85, evidenceType: "self_report", status: "approved", notes: "Remote work — avoided 40km commute" },
    { employee: "maya@greenforge.com", actionType: "tree_planting", carbonSaved: 21.0, xpAwarded: 30, confidence: 0.98, evidenceType: "certificate", status: "approved", notes: "Planted 3 native trees at Plant A" },
    { employee: "maya@greenforge.com", actionType: "bike_commute", carbonSaved: 8.2, xpAwarded: 25, confidence: 0.94, evidenceType: "gps", status: "approved", notes: "Cycled to Plant A" },
    { employee: "raj@greenforge.com", actionType: "carpool", carbonSaved: 4.3, xpAwarded: 18, confidence: 0.88, evidenceType: "gps", status: "approved", notes: "Shared ride with 2 colleagues" },
    { employee: "raj@greenforge.com", actionType: "csr_volunteering", carbonSaved: 1.5, xpAwarded: 15, confidence: 0.95, evidenceType: "certificate", status: "approved", notes: "4-hour river cleanup event" },
    { employee: "lisa@greenforge.com", actionType: "sustainability_training", carbonSaved: 0.5, xpAwarded: 8, confidence: 0.92, evidenceType: "certificate", status: "approved", notes: "Completed碳核算 certification" },
    { employee: "lisa@greenforge.com", actionType: "energy_saving", carbonSaved: 2.0, xpAwarded: 10, confidence: 0.90, evidenceType: "photo", status: "approved", notes: "Smart thermostat installation" },
    { employee: "tom@greenforge.com", actionType: "recycling", carbonSaved: 2.5, xpAwarded: 10, confidence: 0.88, evidenceType: "photo", status: "approved", notes: "Sorted 15kg of e-waste" },
    { employee: "tom@greenforge.com", actionType: "public_transport", carbonSaved: 5.1, xpAwarded: 15, confidence: 0.91, evidenceType: "receipt", status: "approved", notes: "Monthly MAX pass" },
    { employee: "nina@greenforge.com", actionType: "work_from_home", carbonSaved: 3.2, xpAwarded: 12, confidence: 0.86, evidenceType: "self_report", status: "approved", notes: "Remote Friday" },
    { employee: "nina@greenforge.com", actionType: "bike_commute", carbonSaved: 8.2, xpAwarded: 25, confidence: 0.93, evidenceType: "gps", status: "approved", notes: "Biked to HR offsite" },
  ],
  esgScores: [
    { period: "2024-Q3", overall: 80, environmental: 76, social: 83, governance: 81 },
    { period: "2024-Q4", overall: 82, environmental: 78, social: 85, governance: 83 },
  ],
};
