import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const departmentId = searchParams.get("departmentId");

  if (id) {
    const activity = await db.cSR_Activity.findUnique({
      where: { id },
      include: { department: true, organizer: true, participations: { include: { employee: true } } },
    });
    if (!activity) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(activity);
  }

  const where = departmentId ? { departmentId } : {};
  const activities = await db.cSR_Activity.findMany({
    where,
    orderBy: { date: "desc" },
    include: { department: true, _count: { select: { participations: true } } },
  });
  return NextResponse.json(activities);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, date, departmentId, organizerId } = body;
    if (!title || !date) {
      return NextResponse.json({ error: "title and date required" }, { status: 400 });
    }
    const activity = await db.cSR_Activity.create({
      data: { title, description: description || null, date: new Date(date), departmentId: departmentId || null, organizerId: organizerId || null },
    });
    return NextResponse.json(activity, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}
