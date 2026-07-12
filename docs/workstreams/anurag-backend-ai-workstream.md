---
title: "Anurag — Backend + AI Workstream"
type: feat
status: active
date: 2026-07-12
origin: docs/plans/2026-07-12-001-feat-ecosphere-esg-platform-plan.md
assignee: Anurag
---

# Anurag — Backend + AI Workstream

## Overview

Build the backend foundation: project scaffold, database schema, AI provider, document upload/extraction pipeline, and MACC abatement cost curve. This workstream unblocks both frontend and governance workstreams.

**You own:** U1, U2, U3, U4
**You block:** Everyone (U1), Darshan (U8 needs U1), Dhanajayan (U5 needs U1)
**Depends on:** Nothing for U1

---

## Dependency Chain

```
U1 (Scaffold) → U2 (AI Provider) → U3 (Upload Pipeline) → U4 (MACC Curve)
```

**Push after each unit.** Darshan and Dhanajayan can start their work after you push U1.

---

## Unit Details

### U1. Project Scaffold + Database Schema

**Goal:** Initialize Next.js project with Prisma, PostgreSQL connection, and the canonical data model.

**Requirements:** R17, R4, R11

**Dependencies:** None — start here.

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`, `postcss.config.js`, `.gitignore`, `.env.example`
- Create: `prisma/schema.prisma`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Create: `src/lib/db.ts`

**Approach:**
- `npx create-next-app@latest ecosphere --typescript --tailwind --eslint --app --src-dir`
- Define Prisma schema with:
  - Core: Organization, Department, Employee, Location, ESGScore
  - Environmental: ESGMetric (scope, value, unit, confidence, sourceDocumentId, extractionLogic, emissionFactorVersion)
  - Social: EmployeeAction (actionType, carbonSaved, xpAwarded, confidence, evidenceType)
  - Governance: EvidenceRecord (contentHash, previousHash, createdAt, source, metricId)
- Seed script for "GreenForge Industries" with 3 departments and demo users
- `.env.example` with DATABASE_URL, GEMINI_API_KEY, CLIMATIQ_API_KEY

**Commit:** `feat(U1): project scaffold + Prisma schema + seed data`

---

### U2. AI Provider Abstraction Layer

**Goal:** Build the AI provider interface with Gemini implementation and prompt templates.

**Requirements:** R18, R1, R7

**Dependencies:** U1

**Files:**
- Create: `src/lib/ai/provider.ts`
- Create: `src/lib/ai/gemini.ts`
- Create: `src/lib/ai/prompts.ts`

**Approach:**
- `AIProvider` interface: `extractDocument(file)`, `validateAction(action, evidence)`, `explainMetric(metric, context)`, `generateReport(data)`, `detectAnomaly(metrics)`
- Gemini implementation using `@google/generative-ai`
- Prompt templates in `prompts.ts` — one template per operation
- Graceful fallback: if API key missing, return mock data for demo

**Commit:** `feat(U2): Gemini AI provider + prompt templates`

---

### U3. Document Upload + Extraction Pipeline

**Goal:** Handle file uploads, extract ESG data with AI, map to emission factors, store with provenance.

**Requirements:** R1, R2, R4

**Dependencies:** U1, U2

**Files:**
- Create: `src/app/api/upload/route.ts`
- Create: `src/lib/emissions/climatiq.ts`
- Create: `src/lib/emissions/factors.ts`
- Create: `src/lib/emissions/calculator.ts`
- Test: `src/lib/emissions/__tests__/calculator.test.ts`

**Approach:**
- API route: multipart FormData, 10MB limit, MIME validation
- AI extracts: vendor, amount, date, category, quantity, unit
- Climatiq API first, hardcoded fallback (`factors.ts`)
- Calculator: maps to Scope 1/2/3 with confidence scores
- Provenance: source filename, extraction time, factor version, confidence
- Store in ESGMetric table

**Commit:** `feat(U3): document upload + extraction pipeline + emission factors`

---

### U4. MACC Knowledge Base + Abatement Cost Curve

**Goal:** Build MACC curve generator with curated abatement knowledge base.

**Requirements:** R5, R6

**Dependencies:** U1, U2

**Files:**
- Create: `src/lib/macc/knowledge-base.json`
- Create: `src/lib/macc/curve.ts`
- Test: `src/lib/macc/__tests__/curve.test.ts`

**Approach:**
- Knowledge base: ~12 measures (LED, solar, heat pumps, insulation, EV fleet, WFH policy, recycling, etc.)
- Each: name, category, cost, lifetime, savings, reduction, costPerTonne, source
- Curve generator: rank by $/tCO₂e, cumulative reduction
- AI personalization: adjust using org's actual data
- SBTi trajectory: baseline + selected measures → path to 1.5°C
- AI generates next-step suggestions per measure

**Commit:** `feat(U4): MACC knowledge base + abatement cost curve`

---

## Push Schedule

| When | What | Command |
|------|------|---------|
| After U1 | Scaffold + schema | `git push` |
| After U2 | AI provider | `git push` |
| After U3 | Upload pipeline | `git push` |
| After U4 | MACC curve | `git push` |

---

## Environment Setup

```bash
# Required env vars
DATABASE_URL=postgresql://...
GEMINI_API_KEY=...
CLIMATIQ_API_KEY=...  # optional, fallback works
```

## Key Decisions (from master plan)

- Next.js 14 App Router + TypeScript + Tailwind
- Prisma ORM + PostgreSQL
- Gemini AI (free tier)
- MACC from IEA/IRENA/NREL knowledge base, not Climatiq
- Demo accounts (no auth)
- SHA-256 hash chain for Evidence Registry