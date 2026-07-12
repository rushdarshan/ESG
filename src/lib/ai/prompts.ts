export function extractDocumentPrompt(): string {
  return `You are an ESG data extraction specialist. Extract structured data from the provided document.

Return a JSON object with these fields:
- vendor: string (company/organization name)
- amount: number (numeric value)
- currency: string (e.g., "USD")
- date: string (ISO date, e.g., "2024-03-15")
- category: string (one of: "fuel", "electricity", "travel", "waste", "water", "materials", "other")
- quantity: number (numeric quantity)
- unit: string (e.g., "kWh", "liters", "km", "kg")
- description: string (brief description of the transaction)

Only return valid JSON. No markdown, no explanation.`;
}

export function validateActionPrompt(
  actionType: string,
  evidenceDescription: string,
): string {
  return `You are an ESG action validator. Evaluate whether the described sustainability action is legitimate and estimate its carbon impact.

Action type: ${actionType}
Evidence provided: ${evidenceDescription}

Return a JSON object with these fields:
- valid: boolean (whether the action is legitimate based on the evidence)
- confidence: number (0.0-1.0, how confident you are in the validation)
- carbonSaved: number (estimated CO2 equivalent saved in kg)
- reasons: string[] (list of reasons for your assessment)

Consider: Is the evidence consistent with the action type? Are the claimed savings realistic?
Only return valid JSON. No markdown, no explanation.`;
}

export function explainMetricPrompt(
  metricName: string,
  value: number,
  unit: string,
  context: Record<string, unknown>,
): string {
  const contextStr = JSON.stringify(context, null, 2);
  return `You are an ESG analytics expert. Explain the following metric in plain language for a sustainability manager.

Metric: ${metricName}
Value: ${value} ${unit}
Context: ${contextStr}

Return a JSON object with these fields:
- explanation: string (2-3 sentence plain-language explanation of what this metric means)
- insights: string[] (2-3 key insights about this metric)
- recommendations: string[] (2-3 actionable recommendations based on this data)

Be specific and actionable. Only return valid JSON. No markdown, no explanation.`;
}

export function generateReportPrompt(data: {
  organizationName: string;
  period: string;
  environmental: {
    totalEmissions: number;
    scope1: number;
    scope2: number;
    scope3: number;
  };
  social: {
    totalActions: number;
  };
  governance: {
    complianceScore: number;
  };
}): string {
  return `You are an ESG report writer. Generate a professional executive summary for a board-ready ESG report.

Organization: ${data.organizationName}
Period: ${data.period}
Total Emissions: ${data.environmental.totalEmissions} tCO2e
  Scope 1: ${data.environmental.scope1} tCO2e
  Scope 2: ${data.environmental.scope2} tCO2e
  Scope 3: ${data.environmental.scope3} tCO2e
Employee Actions Logged: ${data.social.totalActions}
Compliance Score: ${data.governance.complianceScore}%

Write a concise executive summary (3-5 paragraphs) covering:
1. Overall ESG performance summary
2. Environmental highlights and concerns
3. Social engagement highlights
4. Governance and compliance status
5. Key recommendations for next quarter

Use professional, board-ready language. Be factual and data-driven.`;
}

export function detectAnomalyPrompt(
  metrics: Array<{
    name: string;
    current: number;
    previous: number;
    unit: string;
  }>,
): string {
  const metricList = metrics
    .map(
      (m) =>
        `- ${m.name}: ${m.previous} ${m.unit} → ${m.current} ${m.unit} (${(((m.current - m.previous) / (m.previous || 1)) * 100).toFixed(1)}% change)`,
    )
    .join("\n");

  return `You are an ESG anomaly detection specialist. Analyze these metric changes and identify significant anomalies.

Metrics:
${metricList}

An anomaly is a change greater than 30% month-over-month. For each anomaly found, return a JSON array with objects containing:
- metric: string (metric name)
- currentValue: number
- previousValue: number
- percentChange: number
- severity: "low" | "medium" | "high" (based on magnitude and direction)
- explanation: string (brief explanation of possible causes)

If no anomalies are found, return an empty array [].
Only return valid JSON. No markdown, no explanation.`;
}
