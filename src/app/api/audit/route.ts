import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (type === "issues") {
    if (id) {
      const issue = await db.complianceIssue.findUnique({
        where: { id },
        include: { audit: true, owner: true },
      });
      if (!issue) return NextResponse.json({ error: "Compliance issue not found" }, { status: 404 });
      return NextResponse.json(issue);
    }
    const status = searchParams.get("status");
    const where = status ? { status } : {};
    const issues = await db.complianceIssue.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { audit: { select: { title: true } }, owner: { select: { name: true } } },
    });
    return NextResponse.json(issues);
  }

  if (id) {
    const audit = await db.audit.findUnique({
      where: { id },
      include: { complianceIssues: { include: { owner: { select: { name: true } } } } },
    });
    if (!audit) return NextResponse.json({ error: "Audit not found" }, { status: 404 });
    return NextResponse.json(audit);
  }

  const audits = await db.audit.findMany({
    orderBy: { date: "desc" },
    include: { _count: { select: { complianceIssues: true } } },
  });
  return NextResponse.json(audits);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type } = body;

    if (type === "issue") {
      const { auditId, severity, description, ownerId, dueDate } = body;
      if (!auditId || !description) {
        return NextResponse.json({ error: "Audit ID and description required for compliance issues" }, { status: 400 });
      }
      const issue = await db.complianceIssue.create({
        data: {
          auditId,
          severity: severity || "medium",
          description,
          ownerId: ownerId || null,
          dueDate: dueDate ? new Date(dueDate) : null,
        },
      });
      return NextResponse.json(issue, { status: 201 });
    }

    const { title, organizationId, date, findings } = body;
    if (!title || !organizationId || !date) {
      return NextResponse.json({ error: "Title, organization ID, and date are required" }, { status: 400 });
    }
    const audit = await db.audit.create({
      data: { title, organizationId, date: new Date(date), findings: findings || null },
    });
    return NextResponse.json(audit, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, id, ...data } = body;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    if (type === "issue") {
      if (data.dueDate) data.dueDate = new Date(data.dueDate);
      const issue = await db.complianceIssue.update({ where: { id }, data });
      return NextResponse.json(issue);
    }
    const audit = await db.audit.update({ where: { id }, data });
    return NextResponse.json(audit);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}
