import knowledgeBase from "./knowledge-base.json";

export interface MACCMeasure {
  id: string;
  name: string;
  category: string;
  annualEmissionReduction: number;
  annualFinancialSavings: number;
  implementationCost: number;
  paybackPeriod: number;
  marginalAbatementCost: number;
  source: string;
  assumptions: string;
}

export interface MACCResult {
  id: string;
  name: string;
  costPerTonne: number;
  reduction: number;
  source: string;
  selected: boolean;
  annualFinancialSavings: number;
  implementationCost: number;
  paybackPeriod: number;
  category: string;
  assumptions: string;
  cumulativeReduction: number;
}

export interface MACCCurveData {
  measures: MACCResult[];
  totalReduction: number;
  totalSavings: number;
  totalImplementationCost: number;
  baselineEmissions: number;
}

function sortByMarginalAbatementCost(measures: MACCMeasure[]): MACCMeasure[] {
  return [...measures].sort((a, b) => a.marginalAbatementCost - b.marginalAbatementCost);
}

export function getKnowledgeBase(): MACCMeasure[] {
  return knowledgeBase as MACCMeasure[];
}

export function generateCurve(
  baselineEmissions: number = 500,
  selectedIds?: string[],
): MACCCurveData {
  const sorted = sortByMarginalAbatementCost(getKnowledgeBase());

  let cumulativeReduction = 0;
  const measures: MACCResult[] = sorted.map((m) => {
    cumulativeReduction += m.annualEmissionReduction;
    const isSelected = selectedIds ? selectedIds.includes(m.id) : m.marginalAbatementCost <= 0;
    return {
      id: m.id,
      name: m.name,
      costPerTonne: m.marginalAbatementCost,
      reduction: m.annualEmissionReduction,
      source: m.source,
      selected: isSelected,
      annualFinancialSavings: m.annualFinancialSavings,
      implementationCost: m.implementationCost,
      paybackPeriod: m.paybackPeriod,
      category: m.category,
      assumptions: m.assumptions,
      cumulativeReduction,
    };
  });

  const selectedMeasures = measures.filter((m) => m.selected);
  const totalReduction = selectedMeasures.reduce((sum, m) => sum + m.reduction, 0);
  const totalSavings = selectedMeasures.reduce((sum, m) => sum + m.annualFinancialSavings, 0);
  const totalImplementationCost = selectedMeasures.reduce(
    (sum, m) => sum + m.implementationCost,
    0,
  );

  return {
    measures,
    totalReduction,
    totalSavings,
    totalImplementationCost,
    baselineEmissions,
  };
}

export function calculatePaybackPeriod(
  implementationCost: number,
  annualSavings: number,
): number {
  if (annualSavings <= 0) return Infinity;
  if (implementationCost < 0) return 0;
  return implementationCost / annualSavings;
}

export function calculateMarginalAbatementCost(
  implementationCost: number,
  lifetimeEmissionsReduction: number,
): number {
  if (lifetimeEmissionsReduction <= 0) return Infinity;
  return implementationCost / lifetimeEmissionsReduction;
}
