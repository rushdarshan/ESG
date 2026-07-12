---
title: "Dhanajayan — Governance + Integration Workstream"
type: feat
status: active
date: 2026-07-12
origin: docs/plans/2026-07-12-001-feat-ecosphere-esg-platform-plan.md
assignee: Dhanajayan
---

# Dhanajayan — Governance + Integration Workstream

## Overview

Build the employee action system, evidence registry with hash chain, compliance checking, report generation, and the final demo data pack. You connect all three pillars together.

**You own:** U5, U6, U7, U12
**Depends on:** Anurag U1 (scaffold), U2 (AI provider), U3 (upload pipeline)
**Blocks:** U12 depends on everything — you finish last

---

## Dependency Chain

```
U5 (Employee Actions) → U6 (Evidence Registry) → U7 (Compliance + Reports) → U12 (Demo Data)
```

**Start after Anurag pushes U1.** Pull his branch, then begin U5.

---

## Unit Details

### U5. Employee Action System

**Goal:** Build the employee action catalog, evidence handling, AI validation, XP/badges, and carbon rollup.

**Requirements:** R7, R8, R9, R10

**Dependencies:** U1, U2 (Anurag's AI provider), U3 (Anurag's emission calculator)

**Files:**
- Create: `src/app/api/actions/route.ts`
- Create: `src/components/social/ActionCatalog.tsx`
- Create: `src/components/social/Leaderboard.tsx`
- Create: `src/components/social/BadgeDisplay.tsx`
- Test: `src/lib/__tests__/actions.test.ts`

**Approach:**
- 10 action types: bike commute, walking, public transport, carpool, WFH, recycling, tree planting, CSR volunteering, energy-saving suggestions, sustainability training
- Evidence: photo upload, receipt, certificate, GPS, self-report
- AI validates via U2's `validateAction()` → confidence score + carbon estimate
- XP: base per action type, streak multiplier, confidence bonus
- Badges: milestones (first action, 10 actions, 100kg CO₂e, etc.)
- Leaderboard: department rankings by total carbon saved
- Carbon rollup: employee → department → corporate Scope 3
- All actions write to EvidenceRegistry (U6)

**API shape:**
```
POST /api/actions
Body: { actionType, employeeId, evidence: { type, data } }
Response: { id, xp, badge?, carbonSaved, confidence }
```

**Commit:** `feat(U5): employee action system + XP/badges + leaderboard`

---

### U6. Evidence Registry with Hash Chain

**Goal:** Build the tamper-resistant Evidence Registry with SHA-256 hash chain.

**Requirements:** R11

**Dependencies:** U1

**Files:**
- Create: `src/lib/evidence/registry.ts`
- Create: `src/lib/evidence/hash-chain.ts`
- Test: `src/lib/evidence/__tests__/hash-chain.test.ts`

**Approach:**
- Hash chain: each record = SHA-256(content + previousHash)
- Genesis record uses all-zeros previousHash
- `addRecord(content, source, metricId)` → compute hash, link to previous, store
- `verifyChain()` → walk entire chain, validate each hash (O(n), OK for <1000 records)
- Append-only: no update or delete
- Re-upload: create new record with "supersedes" link (not in-place update)

**Integration points:**
- U3 writes extraction provenance records
- U5 writes action validation records
- U7 writes report generation records

**Commit:** `feat(U6): evidence registry + SHA-256 hash chain`

---

### U7. Compliance Check + Report Generation

**Goal:** Build GRI/CSRD compliance checking and board-ready PDF report generation.

**Requirements:** R12, R13, R14, R15

**Dependencies:** U1, U2, U3, U6

**Cut-first guidance:** If time runs short, skip R12 (spike detection) and R13 (full compliance). Ship R14 + R15 (cited PDF report).

**Files:**
- Create: `src/lib/compliance/gri.ts`
- Create: `src/lib/compliance/csrd.ts`
- Create: `src/lib/pdf/report.tsx`
- Create: `src/app/api/reports/route.ts`
- Test: `src/lib/compliance/__tests__/gri.test.ts`

**Approach:**
- GRI mapping: ~20 key metrics mapped to GRI disclosures (simplified)
- CSRD mapping: double materiality check
- Spike detection: MoM changes >30% with AI explanation
- Report generator: Executive Summary, E/S/G metrics, compliance status, missing evidence, AI recommendations
- PDF: @react-pdf/renderer, professional layout, company branding
- Every metric links to EvidenceRegistry record
- Report versioning: timestamp-based, store as versioned record

**API shape:**
```
GET /api/reports
Response: { id, generatedAt, metrics: [...], compliance: {...}, pdfUrl }

POST /api/reports
Body: { framework: "GRI" | "CSRD" }
Response: { id, pdfUrl }
```

**Commit:** `feat(U7): compliance check + cited report generation + PDF export`

---

### U12. Demo Data Pack + Narrative Flow

**Goal:** Prepare the complete demo data pack and wire the 60-second demo narrative end-to-end.

**Requirements:** R19

**Dependencies:** ALL units (U1-U11)

**Files:**
- Create: `src/data/demo/greenforge-healthy/` (utility bills, invoices, fleet records)
- Create: `src/data/demo/greenforge-poor/` (same structure, different values)
- Modify: `prisma/seed.ts` (load both scenarios)
- Modify: various components for demo flow polish

**Approach:**
- Demo data creation sub-steps:
  1. Define GreenForge data model (company params, monthly figures)
  2. Generate CSVs programmatically from single source of truth
  3. Create PDF templates for utility bills/invoices
  4. Cross-validate all numbers across files
- Two scenarios: healthy (score 82) and poor (score 41)
- Intentional anomalies: fuel spike, missing waste records
- Seed script loads both into database
- Demo flow: Login → Dashboard → Upload → MACC → Action → Leaderboard → Report → Score update
- One-click scenario switcher
- AI proactive actions: auto-generate reduction plan, flag anomaly

**Demo narrative (60 seconds):**
1. [0-5s] Login as Sustainability Manager → Dashboard shows ESG score 82
2. [5-15s] Upload utility bill → AI extracts → Scope breakdown appears
3. [15-25s] Open MACC tab → 10 measures ranked → select solar panels → trajectory bends
4. [25-35s] Switch to Employee view → log "Bike Commute" → XP awarded → leaderboard updates
5. [35-45s] Switch to Governance → compliance status → generate report
6. [45-55s] PDF exports → every metric cited → evidence chain visible
7. [55-60s] Back to dashboard → score updated → AI says "Solar panels would reduce emissions by 22%"

**Commit:** `feat(U12): demo data pack + 60-second narrative flow`

---

## Push Schedule

| When | What | Command |
|------|------|---------|
| After U5 | Employee actions | `git push` |
| After U6 | Evidence registry | `git push` |
| After U7 | Compliance + reports | `git push` |
| After U12 | Demo data + polish | `git push` |

---

## Demo Data: GreenForge Industries

**Healthy scenario (score 82):**
- Electricity: 128,450 kWh/month → 61.4 tCO₂e Scope 2
- Fleet: 8,500 L diesel/month → 22.7 tCO₂e Scope 1
- Waste: 2.3 t/month recycled, 0.8 t landfill
- Water: 45,000 L/month

**Poor scenario (score 41):**
- Electricity: 185,000 kWh/month → 88.6 tCO₂e Scope 2
- Fleet: 52,000 L diesel/month (SPIKE!) → 138.7 tCO₂e Scope 1
- Waste: 0.5 t recycled, 4.2 t landfill
- Water: 78,000 L/month

**Intentional anomaly:** Fleet diesel jumps from 8,500L to 52,000L (512% increase) — AI flags this.

## Key Decisions (from master plan)

- SHA-256 hash chain for Evidence Registry (append-only)
- Re-upload creates new record with "supersedes" link
- GRI + CSRD compliance (not SASB)
- PDF via @react-pdf/renderer
- Report versioning: timestamp-based
- P2 items (spike detection, full compliance) are cut-first candidates
- Demo data generated programmatically, not manually created
