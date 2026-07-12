import { GoogleGenerativeAI } from "@google/generative-ai";

import type {
  AIProvider,
  ExtractedDocument,
  ActionValidation,
  MetricExplanation,
  AnomalyResult,
} from "./provider";

import {
  extractDocumentPrompt,
  validateActionPrompt,
  explainMetricPrompt,
  generateReportPrompt,
  detectAnomalyPrompt,
} from "./prompts";

const DEFAULT_GEMINI_MODEL = "gemini-3.5-flash";

function getApiKey(): string | undefined {
  return process.env.GEMINI_API_KEY;
}

function getModelName(): string {
  return process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL;
}

function parseJsonResponse<T>(text: string): T {
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned) as T;
  } catch {
    throw new Error(
      `Gemini returned invalid JSON: ${cleaned.slice(0, 300)}`,
    );
  }
}

function mockExtractDocument(): ExtractedDocument {
  return {
    vendor: "GreenForge Energy Co.",
    amount: 1250,
    currency: "USD",
    date: "2024-06-15",
    category: "electricity",
    quantity: 8500,
    unit: "kWh",
    description: "Monthly electricity bill for HQ office",
    rawText: "[Mock extraction — set GEMINI_API_KEY for live AI]",
  };
}

function mockValidateAction(
  actionType: string,
  evidenceDescription: string,
): ActionValidation {
  const carbonMap: Record<string, number> = {
    bike_commute: 8.2,
    walking: 6.5,
    public_transport: 5.1,
    carpool: 4.3,
    work_from_home: 3.2,
    recycling: 2.1,
    tree_planting: 21,
    csr_volunteering: 1.5,
    energy_saving: 1,
    sustainability_training: 0.5,
  };

  return {
    actionType,
    confidence: 0.85,
    carbonSaved: carbonMap[actionType] ?? 5,
    valid: true,
    reasons: [
      "Mock validation — set GEMINI_API_KEY for live AI",
      `Evidence description: ${evidenceDescription}`,
    ],
  };
}

function mockExplainMetric(
  metricName: string,
  value: number,
  unit: string,
): MetricExplanation {
  return {
    metric: metricName,
    value,
    unit,
    explanation:
      `${metricName} is currently at ${value} ${unit}. ` +
      "This is a mock explanation — set GEMINI_API_KEY for AI-powered insights.",
    insights: [
      "Mock insight — configure GEMINI_API_KEY for real analysis",
    ],
    recommendations: [
      "Mock recommendation — configure GEMINI_API_KEY for AI suggestions",
    ],
  };
}

function mockGenerateReport(data: {
  organizationName: string;
  period: string;
  environmental: {
    totalEmissions: number;
  };
}): string {
  return [
    `ESG Executive Summary — ${data.organizationName} (${data.period})`,
    "",
    `Total emissions: ${data.environmental.totalEmissions} tCO2e.`,
    "This is a mock report — set GEMINI_API_KEY for AI-generated executive summaries.",
  ].join("\n");
}

function mockDetectAnomaly(
  metrics: Array<{
    name: string;
    current: number;
    previous: number;
    unit: string;
  }>,
): AnomalyResult[] {
  return metrics
    .filter((metric) => {
      const denominator = metric.previous || 1;
      const change =
        (metric.current - metric.previous) / denominator;

      return Math.abs(change) > 0.3;
    })
    .map((metric) => {
      const denominator = metric.previous || 1;
      const percentChange =
        ((metric.current - metric.previous) / denominator) * 100;

      return {
        metric: metric.name,
        currentValue: metric.current,
        previousValue: metric.previous,
        percentChange: Number(percentChange.toFixed(1)),
        severity: "medium" as const,
        explanation:
          "Mock anomaly — set GEMINI_API_KEY for AI analysis",
      };
    });
}

export function createGeminiProvider(): AIProvider {
  const apiKey = getApiKey();

  if (!apiKey) {
    return {
      extractDocument: async () => mockExtractDocument(),

      validateAction: async (
        actionType,
        evidenceDescription,
      ) => mockValidateAction(actionType, evidenceDescription),

      explainMetric: async (
        metricName,
        value,
        unit,
      ) => mockExplainMetric(metricName, value, unit),

      generateReport: async (data) =>
        mockGenerateReport(data),

      detectAnomaly: async (metrics) =>
        mockDetectAnomaly(metrics),
    };
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: getModelName(),
  });

  return {
    async extractDocument(
      file: Buffer,
      mimeType: string,
    ): Promise<ExtractedDocument> {
      const normalizedMimeType =
        mimeType.split(";")[0]?.trim().toLowerCase() ||
        "application/octet-stream";

      const isTextFile =
        normalizedMimeType.startsWith("text/") ||
        normalizedMimeType === "application/csv" ||
        normalizedMimeType === "application/json";

      let responseText: string;

      if (isTextFile) {
        const documentText = file.toString("utf8");

        const result = await model.generateContent([
          extractDocumentPrompt(),
          `Document MIME type: ${normalizedMimeType}`,
          `Document contents:\n\n${documentText}`,
        ]);

        responseText = result.response.text();
      } else {
        const result = await model.generateContent([
          extractDocumentPrompt(),
          {
            inlineData: {
              mimeType: normalizedMimeType,
              data: file.toString("base64"),
            },
          },
        ]);

        responseText = result.response.text();
      }

      return parseJsonResponse<ExtractedDocument>(
        responseText,
      );
    },

    async validateAction(
      actionType: string,
      evidenceDescription: string,
    ): Promise<ActionValidation> {
      const result = await model.generateContent(
        validateActionPrompt(
          actionType,
          evidenceDescription,
        ),
      );

      return parseJsonResponse<ActionValidation>(
        result.response.text(),
      );
    },

    async explainMetric(
      metricName: string,
      value: number,
      unit: string,
      context: Record<string, unknown>,
    ): Promise<MetricExplanation> {
      const result = await model.generateContent(
        explainMetricPrompt(
          metricName,
          value,
          unit,
          context,
        ),
      );

      return parseJsonResponse<MetricExplanation>(
        result.response.text(),
      );
    },

    async generateReport(data: {
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
        topContributors: Array<{
          name: string;
          carbonSaved: number;
        }>;
        departmentRankings: Array<{
          name: string;
          totalSaved: number;
        }>;
      };
      governance: {
        evidenceCount: number;
        complianceScore: number;
      };
    }): Promise<string> {
      const result = await model.generateContent(
        generateReportPrompt(data),
      );

      return result.response.text();
    },

    async detectAnomaly(
      metrics: Array<{
        name: string;
        current: number;
        previous: number;
        unit: string;
      }>,
    ): Promise<AnomalyResult[]> {
      const result = await model.generateContent(
        detectAnomalyPrompt(metrics),
      );

      return parseJsonResponse<AnomalyResult[]>(
        result.response.text(),
      );
    },
  };
}

let provider: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (!provider) {
    provider = createGeminiProvider();
  }

  return provider;
}