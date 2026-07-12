import { NextRequest, NextResponse } from "next/server";
import { generateCurve } from "@/lib/macc/curve";

// ── GET /api/macc ───────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const baselineParam = searchParams.get("baseline");
  const selectedParam = searchParams.get("selected");

  const baselineEmissions = baselineParam ? Number(baselineParam) : 500;
  if (Number.isNaN(baselineEmissions) || baselineEmissions < 0) {
    return NextResponse.json(
      { error: "Invalid baseline parameter. Must be a non-negative number." },
      { status: 400 },
    );
  }

  const selectedIds = selectedParam
    ? selectedParam.split(",").map((s) => s.trim()).filter(Boolean)
    : undefined;

  const curve = generateCurve(baselineEmissions, selectedIds);

  return NextResponse.json(curve);
}

// ── GET /api/macc/knowledge-base ────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { baselineEmissions, selectedIds } = body;

    const baseline =
      typeof baselineEmissions === "number" && baselineEmissions >= 0
        ? baselineEmissions
        : 500;

    const curve = generateCurve(baseline, selectedIds);

    return NextResponse.json(curve);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
