import { NextRequest, NextResponse } from "next/server";
import { getAIProvider } from "@/lib/ai/gemini";
import { calculateEmissions } from "@/lib/emissions/calculator";
import { db } from "@/lib/db";
import { addRecord } from "@/lib/evidence/registry";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = [
  "application/pdf",
  "text/csv",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const organizationId = formData.get("organizationId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!organizationId) {
      return NextResponse.json(
        { error: "No organizationId provided" },
        { status: 400 },
      );
    }

    if (!db) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File exceeds 10MB limit" },
        { status: 400 },
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: `Unsupported file type: ${file.type}. Allowed: PDF, CSV, PNG, JPG, WebP`,
        },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const provider = getAIProvider();
    const extraction = await provider.extractDocument(buffer, file.type);

    const result = await calculateEmissions(extraction);

    let metricId: string | null = null;
    let evidenceId: string | null = null;

    if (db) {
      const metric = await db.eSGMetric.create({
        data: {
          organizationId,
          scope: result.transaction.scope,
          value: result.transaction.emissions,
          unit: result.transaction.unit,
          confidence: result.transaction.confidence,
          category: result.transaction.category,
          sourceDocumentId: null,
          extractionLogic: extraction.rawText?.slice(0, 500) ?? null,
          emissionFactorUsed: result.provenance.emissionFactorUsed,
          emissionFactorVersion: result.provenance.emissionFactorVersion,
          description: extraction.description || extraction.vendor,
          period: extraction.date ?? null,
        },
      });
      metricId = metric.id;

      const evidence = await addRecord({
        source: "upload",
        sourceId: metric.id,
        metricId: metric.id,
        content: {
          extraction,
          transaction: result.transaction,
          provenance: result.provenance,
        },
      });
      evidenceId = evidence.id;
    }

    return NextResponse.json({
      extraction,
      transaction: result.transaction,
      provenance: result.provenance,
      metricId,
      evidenceId,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: `Processing failed: ${message}` },
      { status: 500 },
    );
  }
}
