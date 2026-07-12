import { NextRequest, NextResponse } from "next/server";
import {
  getRecordsBySource,
  getRecordsByAction,
  getRecordsByMetric,
  verifyChain,
  getRecordCount,
  getLatestRecord,
  addRecord,
} from "@/lib/evidence/registry";
import { db } from "@/lib/db";

// ── GET /api/evidence ───────────────────────────────────────────

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get("source");
    const actionId = searchParams.get("actionId");
    const metricId = searchParams.get("metricId");
    const action = searchParams.get("action");
    const type = searchParams.get("type");

    if (type === "summary") {
      if (!db) {
        return NextResponse.json({ totalRecords: 0, summaryStats: [] });
      }

      const [totalRecords, metrics] = await Promise.all([
        getRecordCount(),
        db.eSGMetric.findMany({ select: { category: true, value: true, unit: true } }),
      ]);
      const carbonFootprint = metrics.reduce((total, metric) => total + metric.value, 0);
      const waterUsage = metrics
        .filter((metric) => metric.category.toLowerCase().includes("water"))
        .reduce((total, metric) => total + metric.value, 0);

      return NextResponse.json({
        totalRecords,
        summaryStats: [
          { label: "Carbon Footprint", value: `${carbonFootprint.toFixed(1)} tCO₂e`, change: "Live data" },
          ...(waterUsage > 0
            ? [{ label: "Water Usage", value: `${waterUsage.toLocaleString()} L`, change: "Live data" }]
            : []),
        ],
      });
    }

    if (action === "verify") {
      const result = await verifyChain();
      return NextResponse.json(result);
    }

    if (action === "stats") {
      const count = await getRecordCount();
      const latest = await getLatestRecord();
      return NextResponse.json({
        totalRecords: count,
        latestRecord: latest
          ? { id: latest.id, hash: latest.contentHash, createdAt: latest.createdAt }
          : null,
      });
    }

    if (source) {
      const records = await getRecordsBySource(source);
      return NextResponse.json(records);
    }

    if (actionId) {
      const records = await getRecordsByAction(actionId);
      return NextResponse.json(records);
    }

    if (metricId) {
      const records = await getRecordsByMetric(metricId);
      return NextResponse.json(records);
    }

    const count = await getRecordCount();
    return NextResponse.json({ totalRecords: count });
  } catch (error) {
    console.error("Evidence fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ── POST /api/evidence ──────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { source, sourceId, metricId, actionId, content } = body;

    if (!source || !content) {
      return NextResponse.json(
        { error: "Missing required fields: source, content" },
        { status: 400 }
      );
    }

    const validSources = ["upload", "action", "report", "ai"];
    if (!validSources.includes(source)) {
      return NextResponse.json(
        { error: `Invalid source: ${source}. Must be one of: ${validSources.join(", ")}` },
        { status: 400 }
      );
    }

    const record = await addRecord({
      source,
      sourceId,
      metricId,
      actionId,
      content,
    });

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error("Evidence record creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
