import { describe, it, expect } from "vitest";
import { computeHash, serializeContent } from "@/lib/evidence/crypto";

describe("U6: Evidence Registry — Hash Chain", () => {
  describe("Content Serialization", () => {
    it("serializes content with sorted keys", () => {
      const content = { z: 1, a: 2, m: 3 };
      const serialized = serializeContent(content);
      expect(serialized).toBe('{"a":2,"m":3,"z":1}');
    });

    it("produces deterministic output", () => {
      const content = { actionType: "bike_commute", carbonSaved: 8.2 };
      const s1 = serializeContent(content);
      const s2 = serializeContent(content);
      expect(s1).toBe(s2);
    });
  });

  describe("SHA-256 Hashing", () => {
    it("produces a 64-char hex string", () => {
      const hash = computeHash("hello", null);
      expect(hash).toMatch(/^[a-f0-9]{64}$/);
    });

    it("uses GENESIS as previousHash salt for first record", () => {
      const withNull = computeHash("test", null);
      const withGenesis = computeHash("test", "GENESIS");
      expect(withNull).toBe(withGenesis);
    });

    it("changes hash when previousHash changes", () => {
      const h1 = computeHash("content", null);
      const h2 = computeHash("content", "abc123");
      expect(h1).not.toBe(h2);
    });

    it("changes hash when content changes", () => {
      const h1 = computeHash("content-v1", null);
      const h2 = computeHash("content-v2", null);
      expect(h1).not.toBe(h2);
    });

    it("is deterministic", () => {
      const h1 = computeHash("deterministic", "prev");
      const h2 = computeHash("deterministic", "prev");
      expect(h1).toBe(h2);
    });
  });

  describe("Chain Integrity Logic", () => {
    it("simulates a 3-record chain correctly", () => {
      const content1 = '{"a":1}';
      const content2 = '{"a":2}';
      const content3 = '{"a":3}';

      // Record 1: genesis
      const hash1 = computeHash(content1, null);

      // Record 2: links to record 1
      const hash2 = computeHash(content2, hash1);

      // Record 3: links to record 2
      const hash3 = computeHash(content3, hash2);

      // Verify each hash is unique
      expect(new Set([hash1, hash2, hash3]).size).toBe(3);

      // Verify chain links
      expect(computeHash(content2, hash1)).toBe(hash2);
      expect(computeHash(content3, hash2)).toBe(hash3);
    });

    it("detects tampered content breaks the chain", () => {
      const content1 = '{"action":"bike"}';
      const content2 = '{"action":"recycle"}';

      const hash1 = computeHash(content1, null);
      const hash2 = computeHash(content2, hash1);

      // Simulate tampering: change content2 but keep old hash
      const tampered = '{"action":"recycle_tampered"}';
      const tamperedHash = computeHash(tampered, hash1);

      expect(tamperedHash).not.toBe(hash2);
    });
  });
});
