import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ACTION_MAP, calculateXP } from "@/lib/actions";
import { getAIProvider } from "@/lib/ai/provider";
import { addRecord } from "@/lib/evidence/registry";

// ── POST /api/actions ───────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { actionType, employeeId, evidence } = body;

    if (!actionType || !employeeId || !evidence) {
      return NextResponse.json(
        { error: "Missing required fields: actionType, employeeId, evidence" },
        { status: 400 }
      );
    }

    const actionDef = ACTION_MAP[actionType];
    if (!actionDef) {
      return NextResponse.json(
        { error: `Unknown action type: ${actionType}. Valid types: ${Object.keys(ACTION_MAP).join(", ")}` },
        { status: 400 }
      );
    }

    // Check for duplicate within 24 hours
    const recentDuplicate = await db.employeeAction.findFirst({
      where: {
        employeeId,
        actionType,
        createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
    });

    if (recentDuplicate) {
      return NextResponse.json(
        { error: "Duplicate action within 24 hours. Try again tomorrow." },
        { status: 409 }
      );
    }

    // Get employee + department
    const employee = await db.employee.findUnique({
      where: { id: employeeId },
      include: { department: true },
    });

    if (!employee) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    // AI validation via U2 provider (Gemini or mock fallback)
    const ai = getAIProvider();
    const evidenceDescription = `${evidence.type}: ${evidence.data || "No description provided"}`;
    const aiResult = await ai.validateAction(actionType, evidenceDescription);

    // AI returns confidence as 0.0–1.0; normalize to 0–100 for internal logic
    const confidencePercent = Math.round(aiResult.confidence * 100);

    // Flag low-confidence submissions
    if (confidencePercent < 50) {
      return NextResponse.json({
        id: null,
        xp: 0,
        carbonSaved: 0,
        confidence: aiResult.confidence,
        status: "pending",
        explanation: aiResult.reasons.join("; "),
      });
    }

    // Calculate XP with confidence bonus
    const xpAwarded = calculateXP(actionDef.baseXP, confidencePercent);
    const carbonSaved = aiResult.carbonSaved || actionDef.baseCarbon;

    // Create action record — matches Anurag's EmployeeAction schema exactly
    const action = await db.employeeAction.create({
      data: {
        actionType,
        carbonSaved,
        xpAwarded,
        confidence: aiResult.confidence,
        evidenceType: evidence.type,
        employeeId,
        departmentId: employee.departmentId,
        status: aiResult.valid ? "approved" : "pending",
        notes: aiResult.reasons.join("; "),
      },
    });

    // Write to Evidence Registry (U6) — hash chain
    await addRecord({
      source: "action",
      sourceId: action.id,
      actionId: action.id,
      content: {
        actionId: action.id,
        actionType,
        employeeId,
        carbonSaved,
        confidence: aiResult.confidence,
        xpAwarded,
        evidenceType: evidence.type,
        evidenceData: evidence.data,
        valid: aiResult.valid,
        reasons: aiResult.reasons,
      },
    });

    return NextResponse.json({
      id: action.id,
      xp: xpAwarded,
      carbonSaved,
      confidence: aiResult.confidence,
      status: action.status,
      explanation: aiResult.reasons.join("; "),
    });
  } catch (error) {
    console.error("Action submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ── GET /api/actions ────────────────────────────────────────────

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const employeeId = searchParams.get("employeeId");
    const departmentId = searchParams.get("departmentId");

    if (employeeId) {
      const actions = await db.employeeAction.findMany({
        where: { employeeId },
        orderBy: { createdAt: "desc" },
        take: 50,
      });
      return NextResponse.json(actions);
    }

    if (departmentId) {
      const actions = await db.employeeAction.findMany({
        where: { departmentId },
        orderBy: { createdAt: "desc" },
        include: { employee: { select: { name: true } } },
        take: 50,
      });
      return NextResponse.json(actions);
    }

    return NextResponse.json({ error: "Provide employeeId or departmentId" }, { status: 400 });
  } catch (error) {
    console.error("Actions fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
