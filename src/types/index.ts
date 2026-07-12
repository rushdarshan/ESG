// Shared types for EcoSphere ESG Platform
// All 3 workstreams import from here — do NOT duplicate these types.

// ─── Organization ───────────────────────────────────────

export interface Organization {
  id: string;
  name: string;
  industry: string;
  location: string;
  employeeCount: number;
}

export interface Department {
  id: string;
  name: string;
  organizationId: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  departmentId: string;
  role: "manager" | "employee" | "cfo";
  xp: number;
  level: number;
}

// ─── ESG Scores ────────────────────────────────────────

export interface ESGScore {
  id: string;
  organizationId: string;
  overall: number;        // 0-100
  environmental: number;  // 0-100
  social: number;         // 0-100
  governance: number;     // 0-100
  calculatedAt: Date;
}

// ─── Metrics ───────────────────────────────────────────

export type ScopeType = "scope_1" | "scope_2" | "scope_3";

export type MetricCategory =
  | "electricity"
  | "fleet"
  | "waste"
  | "water"
  | "travel"
  | "supply_chain"
  | "other";

export type EvidenceType =
  | "pdf"
  | "csv"
  | "image"
  | "photo"
  | "self_report"
  | "gps"
  | "receipt"
  | "certificate";

export interface ESGMetric {
  id: string;
  organizationId: string;
  category: MetricCategory;
  scope: ScopeType;
  value: number;
  unit: string;
  period: string;          // "2024-01"
  sourceDocumentId?: string;
  extractionConfidence: number;  // 0-1
  emissionFactorVersion: string;
  carbonEquivalent: number;      // tCO₂e
  createdAt: Date;
}

// ─── Document Upload ───────────────────────────────────

export type DocumentType =
  | "utility_bill"
  | "fleet_record"
  | "waste_receipt"
  | "invoice"
  | "certificate"
  | "other";

export interface UploadedDocument {
  id: string;
  organizationId: string;
  filename: string;
  type: DocumentType;
  size: number;
  mimeType: string;
  uploadedAt: Date;
}

export interface ExtractionResult {
  documentId: string;
  vendor?: string;
  amount?: number;
  date?: string;
  category: MetricCategory;
  quantity?: number;
  unit?: string;
  confidence: number;       // 0-1
  metrics: ESGMetric[];
}

// ─── Emission Factors ──────────────────────────────────

export interface EmissionFactor {
  source: string;           // "climatiq" | "iea" | "epa" | "manual"
  factor: number;           // kgCO₂e per unit
  unit: string;
  scope: ScopeType;
  version: string;
  validFrom: string;
  validTo?: string;
}

// ─── MACC ──────────────────────────────────────────────

export interface MACCMeasure {
  id: string;
  name: string;
  category: string;
  capex: number;            // USD
  opex: number;             // USD/year
  lifetime: number;         // years
  annualSavings: number;    // USD
  co2Reduction: number;     // tCO₂e/year
  costPerTonne: number;     // USD/tCO₂e
  source: string;           // "IEA" | "IRENA" | "NREL" | "McKinsey"
  description: string;
}

export interface MACCCurvePoint {
  measure: MACCMeasure;
  costPerTonne: number;
  cumulativeReduction: number;
}

export interface ReductionPlan {
  id: string;
  organizationId: string;
  selectedMeasures: string[];
  totalCost: number;
  totalReduction: number;
  trajectory: TrajectoryPoint[];
}

export interface TrajectoryPoint {
  year: number;
  baseline: number;         // tCO₂e if no action
  withMeasures: number;     // tCO₂e after selected measures
  sbtiTarget: number;       // 1.5°C aligned target
}

// ─── Employee Actions ──────────────────────────────────

export type ActionType =
  | "bike_commute"
  | "walking"
  | "public_transport"
  | "carpool"
  | "wfh"
  | "recycling"
  | "tree_planting"
  | "csr_volunteering"
  | "energy_suggestion"
  | "sustainability_training";

export const ACTION_CATALOG: Record<ActionType, {
  label: string;
  icon: string;
  baseXP: number;
  baseCarbon: number;       // kg CO₂e
  evidenceTypes: EvidenceType[];
}> = {
  bike_commute:            { label: "Bike Commute",           icon: "🚲", baseXP: 10, baseCarbon: 2.6,  evidenceTypes: ["gps", "photo"] },
  walking:                 { label: "Walking",                icon: "🚶", baseXP: 8,  baseCarbon: 2.1,  evidenceTypes: ["gps"] },
  public_transport:        { label: "Public Transport",       icon: "🚌", baseXP: 8,  baseCarbon: 1.8,  evidenceTypes: ["receipt", "gps"] },
  carpool:                 { label: "Carpool",                icon: "🚗", baseXP: 12, baseCarbon: 3.2,  evidenceTypes: ["gps", "photo"] },
  wfh:                     { label: "Work From Home",         icon: "🏠", baseXP: 5,  baseCarbon: 1.5,  evidenceTypes: ["self_report"] },
  recycling:               { label: "Recycling",              icon: "♻️", baseXP: 6,  baseCarbon: 1.2,  evidenceTypes: ["photo"] },
  tree_planting:           { label: "Tree Planting",          icon: "🌳", baseXP: 20, baseCarbon: 21.0, evidenceTypes: ["photo", "certificate"] },
  csr_volunteering:        { label: "CSR Volunteering",       icon: "🤝", baseXP: 15, baseCarbon: 5.0,  evidenceTypes: ["certificate"] },
  energy_suggestion:       { label: "Energy Suggestion",      icon: "💡", baseXP: 8,  baseCarbon: 0.0,  evidenceTypes: ["self_report"] },
  sustainability_training: { label: "Sustainability Training", icon: "📚", baseXP: 12, baseCarbon: 0.0,  evidenceTypes: ["certificate"] },
};

export interface EmployeeAction {
  id: string;
  employeeId: string;
  actionType: ActionType;
  carbonSaved: number;      // tCO₂e
  xpAwarded: number;
  confidence: number;       // 0-1
  evidence: EvidenceItem;
  validatedAt: Date;
  supersededBy?: string;    // for hash chain
}

export interface EvidenceItem {
  type: EvidenceType;
  data: string;             // file path, GPS coords, or text
  aiConfidence: number;     // 0-1
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  threshold: number;
  earnedAt?: Date;
}

// ─── Evidence Registry (Hash Chain) ────────────────────

export interface EvidenceRecord {
  id: string;
  contentHash: string;       // SHA-256
  previousHash: string;      // SHA-256 of previous record
  content: string;           // JSON payload
  source: string;            // "upload" | "action" | "report" | "manual"
  metricId?: string;
  createdAt: Date;
  supersededBy?: string;     // link to newer record
}

// ─── Compliance ────────────────────────────────────────

export type ComplianceFramework = "GRI" | "CSRD";

export interface ComplianceRequirement {
  id: string;
  framework: ComplianceFramework;
  disclosure: string;        // e.g., "GRI 302-1"
  description: string;
  status: "met" | "partial" | "gap";
  evidenceCount: number;
  recommendation?: string;
}

export interface ComplianceReport {
  framework: ComplianceFramework;
  overallStatus: "compliant" | "partial" | "non_compliant";
  requirements: ComplianceRequirement[];
  score: number;             // 0-100
}

// ─── Reports ───────────────────────────────────────────

export interface Report {
  id: string;
  organizationId: string;
  framework: ComplianceFramework;
  generatedAt: Date;
  executiveSummary: string;
  environmental: ReportSection;
  social: ReportSection;
  governance: ReportSection;
  compliance: ComplianceReport[];
  recommendations: string[];
  pdfUrl?: string;
  version: number;
}

export interface ReportSection {
  title: string;
  metrics: ESGMetric[];
  narrative: string;         // AI-generated
  citations: string[];       // EvidenceRegistry record IDs
}

// ─── Anomaly Detection ─────────────────────────────────

export interface Anomaly {
  id: string;
  metricCategory: MetricCategory;
  currentValue: number;
  previousValue: number;
  percentChange: number;
  detectedAt: Date;
  explanation?: string;      // AI-generated
}

// ─── API Responses ─────────────────────────────────────

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ─── Demo ──────────────────────────────────────────────

export type DemoScenario = "healthy" | "poor";

export interface DemoConfig {
  scenario: DemoScenario;
  organization: Organization;
  departments: Department[];
  employees: Employee[];
  metrics: ESGMetric[];
  actions: EmployeeAction[];
}
