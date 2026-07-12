import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const reward = await db.reward.findUnique({ where: { id } });
    if (!reward) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(reward);
  }

  const rewards = await db.reward.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(rewards);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, pointsRequired, stock } = body;
    if (!name || !pointsRequired) {
      return NextResponse.json({ error: "name and pointsRequired required" }, { status: 400 });
    }
    const reward = await db.reward.create({
      data: { name, description: description || null, pointsRequired, stock: stock ?? 0 },
    });
    return NextResponse.json(reward, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}
