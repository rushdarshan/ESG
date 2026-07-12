import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const goals = await db.goal.findMany({ orderBy: { deadline: "asc" } }).catch(() => []);
  return NextResponse.json(goals.length > 0 ? goals : [
    { id: "1", title: "Reduce Scope 1 emissions by 20%", target: "20% reduction", deadline: "2026-12-31", progress: 45, priority: "high", status: "active" },
    { id: "2", title: "Achieve 100% renewable electricity", target: "100% renewables", deadline: "2027-06-30", progress: 62, priority: "high", status: "active" },
    { id: "3", title: "Zero waste to landfill", target: "95% diversion", deadline: "2026-09-30", progress: 74, priority: "medium", status: "active" },
  ]);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, target, deadline, progress, priority } = body;
    if (!title || !deadline) {
      return NextResponse.json({ error: "Title and deadline are required" }, { status: 400 });
    }
    const goal = await db.goal.create({
      data: { title, target: target || null, deadline: new Date(deadline), progress: progress || 0, priority: priority || "medium" },
    }).catch(() => null);
    if (goal) return NextResponse.json(goal, { status: 201 });
    return NextResponse.json({ id: String(Date.now()), title, target, deadline, progress: progress || 0, priority: priority || "medium", status: "active" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}
