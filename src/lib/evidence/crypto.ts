import { createHash } from "crypto";

export function computeHash(content: string, previousHash: string | null): string {
  const payload = content + (previousHash || "GENESIS");
  return createHash("sha256").update(payload).digest("hex");
}

export function serializeContent(content: Record<string, unknown>): string {
  return JSON.stringify(content, Object.keys(content).sort());
}
