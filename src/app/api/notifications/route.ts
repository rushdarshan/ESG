import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const employeeId = searchParams.get("employeeId");

  const where = employeeId ? { employeeId } : {};
  const notifications = await db.notification.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json(notifications);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { employeeId, title, message, type } = body;
    if (!employeeId || !title || !message) {
      return NextResponse.json({ error: "employeeId, title, message required" }, { status: 400 });
    }
    const notification = await db.notification.create({
      data: { employeeId, title, message, type: type || "info" },
    });
    return NextResponse.json(notification, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    const notification = await db.notification.update({
      where: { id },
      data: { read: true },
    });
    return NextResponse.json(notification);
  } catch (e) {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}
