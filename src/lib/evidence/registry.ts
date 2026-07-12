import { db } from "@/lib/db";
import { computeHash, serializeContent } from "./crypto";

export { computeHash, serializeContent };

// ── Types ───────────────────────────────────────────────────────

export interface AddRecordInput {
  source: string;
  sourceId?: string;
  metricId?: string;
  actionId?: string;
  content: Record<string, unknown>;
}

export interface EvidenceRecord {
  id: string;
  contentHash: string;
  previousHash: string | null;
  source: string;
  sourceId: string | null;
  metricId: string | null;
  actionId: string | null;
  content: string;
  createdAt: Date;
}

export interface ChainVerification {
  valid: boolean;
  totalRecords: number;
  brokenAt: string | null;
  message: string;
}

function noDb() {
  throw new Error("Database not configured. Set DATABASE_URL to enable persistence.");
}

// ── Core Registry ───────────────────────────────────────────────

export async function addRecord(input: AddRecordInput): Promise<EvidenceRecord> {
  if (!db) noDb();
  const serialized = serializeContent(input.content);

  const lastRecord = await db!.evidenceRecord.findFirst({
    orderBy: { createdAt: "desc" },
  });

  const previousHash = lastRecord?.contentHash ?? null;
  const contentHash = computeHash(serialized, previousHash);

  const record = await db!.evidenceRecord.create({
    data: {
      contentHash,
      previousHash,
      source: input.source,
      sourceId: input.sourceId ?? null,
      metricId: input.metricId ?? null,
      actionId: input.actionId ?? null,
      content: serialized,
    },
  });

  return record as EvidenceRecord;
}

export async function getRecordsBySource(source: string, limit = 50): Promise<EvidenceRecord[]> {
  if (!db) noDb();
  return db!.evidenceRecord.findMany({
    where: { source },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getRecordsByAction(actionId: string): Promise<EvidenceRecord[]> {
  if (!db) noDb();
  return db!.evidenceRecord.findMany({
    where: { actionId },
    orderBy: { createdAt: "asc" },
  });
}

export async function getRecordsByMetric(metricId: string): Promise<EvidenceRecord[]> {
  if (!db) noDb();
  return db!.evidenceRecord.findMany({
    where: { metricId },
    orderBy: { createdAt: "asc" },
  });
}

// ── Chain Verification ──────────────────────────────────────────

export async function verifyChain(): Promise<ChainVerification> {
  if (!db) return { valid: true, totalRecords: 0, brokenAt: null, message: "No database configured." };
  const records = await db!.evidenceRecord.findMany({
    orderBy: { createdAt: "asc" },
  });

  if (records.length === 0) {
    return { valid: true, totalRecords: 0, brokenAt: null, message: "Empty chain — no records to verify." };
  }

  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    const serialized = serializeContent(JSON.parse(record.content));
    const expectedPreviousHash = i === 0 ? null : records[i - 1].contentHash;
    const expectedHash = computeHash(serialized, expectedPreviousHash);

    if (record.contentHash !== expectedHash) {
      return {
        valid: false,
        totalRecords: records.length,
        brokenAt: record.id,
        message: `Chain broken at record ${record.id} (index ${i}): expected hash ${expectedHash}, got ${record.contentHash}.`,
      };
    }

    if (record.previousHash !== expectedPreviousHash) {
      return {
        valid: false,
        totalRecords: records.length,
        brokenAt: record.id,
        message: `Chain broken at record ${record.id} (index ${i}): previousHash mismatch.`,
      };
    }
  }

  return {
    valid: true,
    totalRecords: records.length,
    brokenAt: null,
    message: `Chain verified: ${records.length} records, all hashes valid.`,
  };
}

export async function getRecordCount(): Promise<number> {
  if (!db) return 0;
  return db!.evidenceRecord.count();
}

export async function getLatestRecord(): Promise<EvidenceRecord | null> {
  if (!db) return null;
  return db!.evidenceRecord.findFirst({
    orderBy: { createdAt: "desc" },
  });
}
