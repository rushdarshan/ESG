import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ACTION_MAP, calculateXP } from "@/lib/actions";
// TODO: import { addRecord } from "@/lib/evidence/registry"; // U6
// TODO: import { getAIProvider } from "@/lib/ai/provider"; // U2 — uncomment when available

// ── Local AI fallback (until U2 is merged) ──────────────────────

async function validateActionLocal(
  actionType: string,
): Promise<{ confidence: number; carbonSaved: number; explanation: string }> {
  const actionDef = ACTION_MAP[actionType];
  const baseCarbon = actionDef?.baseCarbon ?? 1.0;

  return {
    confidence: 85,
    carbonSaved: baseCarbon,
    explanation: `Validated locally. Base carbon estimate: ${baseCarbon} kg CO₂e.`,
  };
}

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

    // AI validation — use U2 provider when available, local fallback otherwise
    let validation: { confidence: number; carbonSaved: number; explanation: string };
    try {
      // TODO: const ai = getAIProvider();
      // TODO: validation = await ai.validateAction(actionType, evidence.type, evidence.data);
      validation = await validateActionLocal(actionType);
    } catch {
      validation = await validateActionLocal(actionType);
    }

    // Flag low-confidence submissions
    if (validation.confidence < 50) {
      return NextResponse.json({
        id: null,
        xp: 0,
        carbonSaved: 0,
        confidence: validation.confidence,
        status: "pending",
        explanation: validation.explanation,
      });
    }

    // Calculate XP with confidence bonus
    const xpAwarded = calculateXP(actionDef.baseXP, validation.confidence);
    const carbonSaved = validation.carbonSaved || actionDef.baseCarbon;

    // Create action record — matches Anurag's EmployeeAction schema exactly
    const action = await db.employeeAction.create({
      data: {
        actionType,
        carbonSaved,
        xpAwarded,
        confidence: validation.confidence / 100,
        evidenceType: evidence.type,
        employeeId,
        departmentId: employee.departmentId,
        status: "approved",
        notes: validation.explanation,
      },
    });

    // TODO: Write to Evidence Registry (U6) — uncomment after U6 is done
    // await addRecord({
    //   organizationId: employee.organizationId,
    //   content: { actionId: action.id, actionType, employeeId, carbonSaved, confidence: validation.confidence, xpAwarded, evidenceType: evidence.type },
    //   source: "action",
    //   sourceId: action.id,
    //   actionId: action.id,
    // });

    return NextResponse.json({
      id: action.id,
      xp: xpAwarded,
      carbonSaved,
      confidence: validation.confidence,
      status: action.status,
      explanation: validation.explanation,
    });
  } catch (error) {
    console.error("Action submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ── GET /api/actions ────────────────────────────────────────────

export async function GET(request: NextRequest) {
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
}
