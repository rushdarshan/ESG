import { NextRequest, NextResponse } from "next/server";
import { getAIProvider } from "@/lib/ai/gemini";
import { calculateEmissions } from "@/lib/emissions/calculator";

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

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
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

    return NextResponse.json({
      extraction,
      transaction: result.transaction,
      provenance: result.provenance,
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
