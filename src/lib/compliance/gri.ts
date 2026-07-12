// GRI Standards compliance checker
// Maps ESGMetric categories to GRI disclosure requirements

export interface GRIDisclosure {
  code: string;
  title: string;
  category: "environmental" | "social" | "governance";
  requiredMetrics: string[];
  description: string;
}

export interface ComplianceStatus {
  disclosure: GRIDisclosure;
  covered: boolean;
  coveragePercent: number;
  missingMetrics: string[];
  availableMetrics: string[];
}

export interface ComplianceReport {
  framework: "GRI";
  overallScore: number;
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  disclosures: ComplianceStatus[];
  gaps: string[];
  recommendations: string[];
}

// GRI 300+ disclosures mapped to our metric categories
export const GRI_DISCLOSURES: GRIDisclosure[] = [
  // Environmental
  {
    code: "GRI 302-1",
    title: "Energy consumption within the organization",
    category: "environmental",
    requiredMetrics: ["electricity", "natural_gas"],
    description: "Report energy consumption, including fuel type and total energy consumed.",
  },
  {
    code: "GRI 302-3",
    title: "Energy intensity",
    category: "environmental",
    requiredMetrics: ["electricity"],
    description: "Report energy intensity ratios.",
  },
  {
    code: "GRI 305-1",
    title: "Direct (Scope 1) GHG emissions",
    category: "environmental",
    requiredMetrics: ["fuel", "natural_gas", "diesel", "gasoline", "refrigerant"],
    description: "Report gross Scope 1 GHG emissions.",
  },
  {
    code: "GRI 305-2",
    title: "Energy indirect (Scope 2) GHG emissions",
    category: "environmental",
    requiredMetrics: ["electricity"],
    description: "Report gross Scope 2 GHG emissions.",
  },
  {
    code: "GRI 305-3",
    title: "Other indirect (Scope 3) GHG emissions",
    category: "environmental",
    requiredMetrics: ["travel", "waste", "water", "flight"],
    description: "Report gross Scope 3 GHG emissions.",
  },
  {
    code: "GRI 305-5",
    title: "Emissions reduction",
    category: "environmental",
    requiredMetrics: ["reduction_target", "reduction_actual"],
    description: "Report GHG emissions reduction targets and progress.",
  },
  {
    code: "GRI 306-3",
    title: "Waste generated and performance",
    category: "environmental",
    requiredMetrics: ["waste"],
    description: "Report waste generation and disposal methods.",
  },
  // Social
  {
    code: "GRI 401-1",
    title: "New employee hires and turnover",
    category: "social",
    requiredMetrics: ["employee_count"],
    description: "Report new employee hires and turnover rates.",
  },
  {
    code: "GRI 404-1",
    title: "Average hours of training",
    category: "social",
    requiredMetrics: ["training_hours"],
    description: "Report average hours of training per employee.",
  },
  {
    code: "GRI 405-1",
    title: "Diversity of governance bodies and employees",
    category: "social",
    requiredMetrics: ["diversity_data"],
    description: "Report diversity metrics for governance bodies and employees.",
  },
  // Governance
  {
    code: "GRI 102-12",
    title: "Mission and values",
    category: "governance",
    requiredMetrics: ["mission_statement"],
    description: "Report the organization's mission, vision, and values.",
  },
  {
    code: "GRI 102-16",
    title: "Governance structure",
    category: "governance",
    requiredMetrics: ["governance_structure"],
    description: "Report the governance structure and its role.",
  },
];

export function checkGRICompliance(
  availableMetrics: string[],
  actionCount: number,
  evidenceCount: number,
): ComplianceReport {
  const disclosures = GRI_DISCLOSURES.map((disclosure) => {
    const available = disclosure.requiredMetrics.filter((m) =>
      availableMetrics.includes(m)
    );
    const missing = disclosure.requiredMetrics.filter(
      (m) => !availableMetrics.includes(m)
    );
    const coveragePercent =
      disclosure.requiredMetrics.length > 0
        ? Math.round((available.length / disclosure.requiredMetrics.length) * 100)
        : 0;

    return {
      disclosure,
      covered: coveragePercent >= 50,
      coveragePercent,
      missingMetrics: missing,
      availableMetrics: available,
    };
  });

  const envDisclosures = disclosures.filter(
    (d) => d.disclosure.category === "environmental"
  );
  const socialDisclosures = disclosures.filter(
    (d) => d.disclosure.category === "social"
  );
  const govDisclosures = disclosures.filter(
    (d) => d.disclosure.category === "governance"
  );

  const avg = (arr: ComplianceStatus[]) =>
    arr.length > 0
      ? Math.round(arr.reduce((sum, d) => sum + d.coveragePercent, 0) / arr.length)
      : 0;

  const environmentalScore = avg(envDisclosures);
  const socialScore = avg(socialDisclosures);
  const governanceScore = avg(govDisclosures);
  const overallScore = avg(disclosures);

  const gaps = disclosures
    .filter((d) => !d.covered)
    .map(
      (d) =>
        `${d.disclosure.code} (${d.disclosure.title}): missing ${d.missingMetrics.join(", ")}`
    );

  const recommendations: string[] = [];
  if (environmentalScore < 50) {
    recommendations.push(
      "Upload utility bills and fuel receipts to improve Environmental compliance."
    );
  }
  if (socialScore < 50) {
    recommendations.push(
      "Log employee sustainability actions and training hours to improve Social compliance."
    );
  }
  if (governanceScore < 50) {
    recommendations.push(
      "Document governance structures and mission statements for Governance compliance."
    );
  }
  if (evidenceCount === 0) {
    recommendations.push(
      "Upload supporting evidence documents to strengthen audit trail."
    );
  }
  if (actionCount < 5) {
    recommendations.push(
      "Encourage more employee sustainability actions to boost Social metrics."
    );
  }

  return {
    framework: "GRI",
    overallScore,
    environmentalScore,
    socialScore,
    governanceScore,
    disclosures,
    gaps,
    recommendations,
  };
}
