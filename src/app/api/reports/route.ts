import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkGRICompliance } from "@/lib/compliance/gri";
import { checkCSRDCompliance } from "@/lib/compliance/csrd";
import { verifyChain } from "@/lib/evidence/registry";
import type { ReportMetrics } from "@/lib/pdf/report";

// ── GET /api/reports ────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const organizationId = searchParams.get("organizationId");
  const period = searchParams.get("period") || "2024-Q4";

  if (!organizationId) {
    return NextResponse.json(
      { error: "organizationId is required" },
      { status: 400 }
    );
  }

  try {
    if (!db) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }
    // Fetch organization
    const org = await db.organization.findUnique({
      where: { id: organizationId },
    });
    if (!org) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 });
    }

    // Fetch metrics for this period
    const metrics = await db.eSGMetric.findMany({
      where: { organizationId, period },
    });

    // Fetch employee actions
    const actions = await db.employeeAction.findMany({
      where: { department: { organizationId } },
      include: { employee: { select: { name: true } }, department: { select: { name: true } } },
    });

    // Fetch evidence records
    const evidenceCount = await db.evidenceRecord.count();

    // Verify chain integrity
    const chainResult = await verifyChain();

    // Calculate environmental totals
    const scope1 = metrics
      .filter((m) => m.scope === 1)
      .reduce((sum, m) => sum + m.value, 0);
    const scope2 = metrics
      .filter((m) => m.scope === 2)
      .reduce((sum, m) => sum + m.value, 0);
    const scope3 = metrics
      .filter((m) => m.scope === 3)
      .reduce((sum, m) => sum + m.value, 0);

    const breakdown: Record<string, number> = {};
    for (const m of metrics) {
      breakdown[m.category] = (breakdown[m.category] || 0) + m.value;
    }

    // Calculate social stats
    const totalActions = actions.length;
    const totalXP = actions.reduce((sum, a) => sum + a.xpAwarded, 0);

    // Top contributors
    const employeeStats = new Map<string, { name: string; carbonSaved: number }>();
    for (const action of actions) {
      const existing = employeeStats.get(action.employeeId);
      if (existing) {
        existing.carbonSaved += action.carbonSaved;
      } else {
        employeeStats.set(action.employeeId, {
          name: action.employee.name,
          carbonSaved: action.carbonSaved,
        });
      }
    }
    const topContributors = Array.from(employeeStats.values())
      .sort((a, b) => b.carbonSaved - a.carbonSaved)
      .slice(0, 5);

    // Department rankings
    const deptStats = new Map<string, { name: string; totalSaved: number }>();
    for (const action of actions) {
      const existing = deptStats.get(action.departmentId);
      if (existing) {
        existing.totalSaved += action.carbonSaved;
      } else {
        deptStats.set(action.departmentId, {
          name: action.department.name,
          totalSaved: action.carbonSaved,
        });
      }
    }
    const departmentRankings = Array.from(deptStats.values())
      .sort((a, b) => b.totalSaved - a.totalSaved);

    // Compliance checks
    const availableMetricCategories = [...new Set(metrics.map((m) => m.category))];
    const griResult = checkGRICompliance(
      availableMetricCategories,
      totalActions,
      evidenceCount
    );

    const hasEmissionScopes = scope1 > 0 || scope2 > 0 || scope3 > 0;
    const csrdResult = checkCSRDCompliance(
      availableMetricCategories,
      chainResult.valid,
      hasEmissionScopes
    );

    // Build report
    const reportData: ReportMetrics = {
      organizationName: org.name,
      period,
      generatedAt: new Date().toISOString(),
      environmental: {
        totalEmissions: scope1 + scope2 + scope3,
        scope1,
        scope2,
        scope3,
        breakdown,
      },
      social: {
        totalActions,
        totalXP,
        topContributors,
        departmentRankings,
      },
      governance: {
        evidenceCount,
        chainValid: chainResult.valid,
        complianceScore: Math.round(
          (griResult.overallScore + csrdResult.overallScore) / 2
        ),
      },
      compliance: {
        griScore: griResult.overallScore,
        csrdScore: csrdResult.overallScore,
        gaps: [...griResult.gaps, ...csrdResult.gaps],
        recommendations: [
          ...griResult.recommendations,
          ...csrdResult.recommendations,
        ],
      },
    };

    return NextResponse.json(reportData);
  } catch (error) {
    console.error("Report generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 }
    );
  }
}
