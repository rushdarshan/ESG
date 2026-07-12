import type { ExtractedDocument } from "@/lib/ai/provider";
import { getEmissionFactor } from "./climatiq";
import type { EmissionFactor } from "./factors";

export interface CarbonTransaction {
  scope: 1 | 2 | 3;
  emissions: number;
  unit: string;
  confidence: number;
  category: string;
  emissionFactor: EmissionFactor;
}

export interface Provenance {
  sourceDocument: string;
  extractedAt: string;
  emissionFactorUsed: string;
  emissionFactorVersion: string;
  confidence: number;
  aiModel: string;
}

export interface CalculationResult {
  transaction: CarbonTransaction;
  provenance: Provenance;
}

function scopeForCategory(category: string): 1 | 2 | 3 {
  const scope1 = ["fuel", "natural_gas", "diesel", "gasoline", "refrigerant"];
  const scope2 = ["electricity"];
  if (scope1.includes(category)) return 1;
  if (scope2.includes(category)) return 2;
  return 3;
}

function baseConfidence(extraction: ExtractedDocument): number {
  let score = 0.7;
  if (extraction.vendor) score += 0.05;
  if (extraction.amount > 0) score += 0.05;
  if (extraction.date) score += 0.05;
  if (extraction.quantity > 0) score += 0.1;
  return Math.min(score, 1.0);
}

export async function calculateEmissions(
  extraction: ExtractedDocument,
): Promise<CalculationResult> {
  const scope = scopeForCategory(extraction.category);
  const factor = await getEmissionFactor(
    extraction.category,
    extraction.quantity,
    extraction.unit,
  );

  const emissions = extraction.quantity * factor.factor;
  const confidence = baseConfidence(extraction) * 0.9;

  const transaction: CarbonTransaction = {
    scope,
    emissions: Math.round(emissions * 1000) / 1000,
    unit: "kgCO2e",
    confidence: Math.round(confidence * 100) / 100,
    category: extraction.category,
    emissionFactor: factor,
  };

  const provenance: Provenance = {
    sourceDocument: extraction.vendor,
    extractedAt: new Date().toISOString(),
    emissionFactorUsed: factor.description,
    emissionFactorVersion: factor.version,
    confidence: transaction.confidence,
    aiModel: process.env.GEMINI_MODEL || "unknown",
  };

  return { transaction, provenance };
}
