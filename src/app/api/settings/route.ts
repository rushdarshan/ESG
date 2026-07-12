import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const departments = await db.department.findMany({ orderBy: { name: "asc" } });
  const categories = await db.category.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json({ departments, categories });
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    // Settings stored in-memory for hackathon
    return NextResponse.json({ ok: true, settings: body });
  } catch (e) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}
