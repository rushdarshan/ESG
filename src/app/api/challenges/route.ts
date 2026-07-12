import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const status = searchParams.get("status");

  if (id) {
    const challenge = await db.challenge.findUnique({
      where: { id },
      include: { category: true, participations: { include: { employee: true } } },
    });
    if (!challenge) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(challenge);
  }

  const where = status ? { status } : {};
  const challenges = await db.challenge.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { category: true, _count: { select: { participations: true } } },
  });
  return NextResponse.json(challenges);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, categoryId, description, xp, difficulty, evidenceRequired, deadline } = body;
    if (!title || typeof title !== "string" || title.trim().length < 2) {
      return NextResponse.json({ error: "Title is required and must be at least 2 characters" }, { status: 400 });
    }
    if (xp !== undefined && (typeof xp !== "number" || xp < 0)) {
      return NextResponse.json({ error: "XP must be a positive number" }, { status: 400 });
    }
    const challenge = await db.challenge.create({
      data: {
        title,
        categoryId: categoryId || null,
        description: description || null,
        xp: xp || 0,
        difficulty: difficulty || "medium",
        evidenceRequired: evidenceRequired || false,
        deadline: deadline ? new Date(deadline) : null,
      },
    });
    return NextResponse.json(challenge, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    if (data.deadline) data.deadline = new Date(data.deadline);
    const challenge = await db.challenge.update({ where: { id }, data });
    return NextResponse.json(challenge);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}
