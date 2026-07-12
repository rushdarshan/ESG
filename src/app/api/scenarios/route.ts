import { NextRequest, NextResponse } from "next/server";
import { listScenarios, getScenarioData } from "@/lib/demo/scenarios";

// ── GET /api/scenarios ──────────────────────────────────────────
// List all scenarios or get details for one

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const organizationId = searchParams.get("organizationId");

  if (organizationId) {
    const data = await getScenarioData(organizationId);
    if (!data) {
      return NextResponse.json({ error: "Scenario not found" }, { status: 404 });
    }
    return NextResponse.json(data);
  }

  const scenarios = await listScenarios();
  return NextResponse.json({ scenarios });
}
