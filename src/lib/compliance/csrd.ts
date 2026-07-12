// CSRD / ESRS (European Sustainability Reporting Standards) compliance checker

export interface ESRSTopic {
  code: string;
  title: string;
  category: "environmental" | "social" | "governance";
  materialityRequired: boolean;
  requiredData: string[];
  description: string;
}

export interface CSRDComplianceStatus {
  topic: ESRSTopic;
  covered: boolean;
  coveragePercent: number;
  missingData: string[];
  availableData: string[];
}

export interface CSRDComplianceReport {
  framework: "CSRD-ESRS";
  overallScore: number;
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  topics: CSRDComplianceStatus[];
  gaps: string[];
  recommendations: string[];
}

// ESRS topical standards (subset relevant to ESG data)
export const ESRS_TOPICS: ESRSTopic[] = [
  // Environmental (E)
  {
    code: "ESRS E1",
    title: "Climate Change",
    category: "environmental",
    materialityRequired: true,
    requiredData: ["scope1_emissions", "scope2_emissions", "scope3_emissions", "energy_consumption", "energy_mix"],
    description: "GHG emissions, energy consumption, and transition plans.",
  },
  {
    code: "ESRS E2",
    title: "Pollution",
    category: "environmental",
    materialityRequired: false,
    requiredData: ["air_pollutants", "water_pollutants", "soil_pollutants"],
    description: "Pollution of air, water, and soil.",
  },
  {
    code: "ESRS E3",
    title: "Water and Marine Resources",
    category: "environmental",
    materialityRequired: false,
    requiredData: ["water_consumption", "water_recycling"],
    description: "Water consumption and withdrawal.",
  },
  {
    code: "ESRS E4",
    title: "Biodiversity and Ecosystems",
    category: "environmental",
    materialityRequired: false,
    requiredData: ["biodiversity_impact", "land_use"],
    description: "Impacts on biodiversity and ecosystems.",
  },
  {
    code: "ESRS E5",
    title: "Resource Use and Circular Economy",
    category: "environmental",
    materialityRequired: false,
    requiredData: ["waste_generated", "waste_recycled", "material_recycled"],
    description: "Resource inflows, outflows, and circular economy practices.",
  },
  // Social (S)
  {
    code: "ESRS S1",
    title: "Own Workforce",
    category: "social",
    materialityRequired: true,
    requiredData: ["employee_count", "training_hours", "workplace_safety", "living_wage"],
    description: "Workforce conditions, health, safety, and training.",
  },
  {
    code: "ESRS S2",
    title: "Workers in the Value Chain",
    category: "social",
    materialityRequired: false,
    requiredData: ["supply_chain_labor"],
    description: "Impacts on value chain workers.",
  },
  {
    code: "ESRS S3",
    title: "Affected Communities",
    category: "social",
    materialityRequired: false,
    requiredData: ["community_impact"],
    description: "Impacts on affected communities.",
  },
  {
    code: "ESRS S4",
    title: "Consumers and End-Users",
    category: "social",
    materialityRequired: false,
    requiredData: ["product_impact"],
    description: "Impacts on consumers and end-users.",
  },
  // Governance (G)
  {
    code: "ESRS G1",
    title: "Business Conduct",
    category: "governance",
    materialityRequired: true,
    requiredData: ["anti_corruption", "political_contributions", "whistleblower"],
    description: "Business ethics, anti-corruption, and tax practices.",
  },
];

export function checkCSRDCompliance(
  availableData: string[],
  hasEvidenceChain: boolean,
  hasEmissionScopes: boolean,
): CSRDComplianceReport {
  const topics = ESRS_TOPICS.map((topic) => {
    const available = topic.requiredData.filter((d) =>
      availableData.includes(d)
    );
    const missing = topic.requiredData.filter(
      (d) => !availableData.includes(d)
    );
    const coveragePercent =
      topic.requiredData.length > 0
        ? Math.round((available.length / topic.requiredData.length) * 100)
        : 0;

    return {
      topic,
      covered: coveragePercent >= 50,
      coveragePercent,
      missingData: missing,
      availableData: available,
    };
  });

  const envTopics = topics.filter((t) => t.topic.category === "environmental");
  const socialTopics = topics.filter((t) => t.topic.category === "social");
  const govTopics = topics.filter((t) => t.topic.category === "governance");

  const avg = (arr: CSRDComplianceStatus[]) =>
    arr.length > 0
      ? Math.round(arr.reduce((sum, t) => sum + t.coveragePercent, 0) / arr.length)
      : 0;

  const environmentalScore = avg(envTopics);
  const socialScore = avg(socialTopics);
  const governanceScore = avg(govTopics);
  const overallScore = avg(topics);

  const gaps: string[] = [];
  for (const t of topics) {
    if (!t.covered) {
      gaps.push(
        `${t.topic.code} (${t.topic.title}): missing ${t.missingData.join(", ")}`
      );
    }
  }

  const recommendations: string[] = [];
  if (!hasEmissionScopes) {
    recommendations.push(
      "Upload utility bills and fuel receipts to establish Scope 1/2/3 emissions baseline (ESRS E1)."
    );
  }
  if (!hasEvidenceChain) {
    recommendations.push(
      "Ensure evidence records are linked via hash chain for audit trail integrity."
    );
  }
  if (environmentalScore < 50) {
    recommendations.push(
      "Address ESRS E1-E5 topics by uploading environmental data sources."
    );
  }
  if (socialScore < 50) {
    recommendations.push(
      "Log employee training, safety metrics, and workforce data for ESRS S1."
    );
  }
  if (governanceScore < 50) {
    recommendations.push(
      "Document anti-corruption policies and governance structures for ESRS G1."
    );
  }

  return {
    framework: "CSRD-ESRS",
    overallScore,
    environmentalScore,
    socialScore,
    governanceScore,
    topics,
    gaps,
    recommendations,
  };
}
