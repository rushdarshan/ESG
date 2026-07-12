export interface ExtractedDocument {
  vendor: string;
  amount: number;
  currency: string;
  date: string;
  category: string;
  quantity: number;
  unit: string;
  description: string;
  rawText: string;
}

export interface ActionValidation {
  actionType: string;
  confidence: number;
  carbonSaved: number;
  valid: boolean;
  reasons: string[];
}

export interface MetricExplanation {
  metric: string;
  value: number;
  unit: string;
  explanation: string;
  insights: string[];
  recommendations: string[];
}

export interface ReportData {
  organizationName: string;
  period: string;
  environmental: {
    totalEmissions: number;
    scope1: number;
    scope2: number;
    scope3: number;
    breakdown: Record<string, number>;
  };
  social: {
    totalActions: number;
    topContributors: Array<{ name: string; carbonSaved: number }>;
    departmentRankings: Array<{ name: string; totalSaved: number }>;
  };
  governance: {
    evidenceCount: number;
    complianceScore: number;
  };
}

export interface AnomalyResult {
  metric: string;
  currentValue: number;
  previousValue: number;
  percentChange: number;
  severity: "low" | "medium" | "high";
  explanation: string;
}

export interface AIProvider {
  extractDocument(file: Buffer, mimeType: string): Promise<ExtractedDocument>;
  validateAction(
    actionType: string,
    evidenceDescription: string,
  ): Promise<ActionValidation>;
  explainMetric(
    metricName: string,
    value: number,
    unit: string,
    context: Record<string, unknown>,
  ): Promise<MetricExplanation>;
  generateReport(data: ReportData): Promise<string>;
  detectAnomaly(
    metrics: Array<{
      name: string;
      current: number;
      previous: number;
      unit: string;
    }>,
  ): Promise<AnomalyResult[]>;
}
