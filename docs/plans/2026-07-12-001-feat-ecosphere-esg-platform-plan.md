---
title: "feat: EcoSphere Unified E+S+G Platform"
type: feat
status: active
date: 2026-07-12
origin: docs/brainstorms/2026-07-12-ecosphere-requirements.md
---

# EcoSphere — Unified E+S+G Platform

## Overview

Build a full-stack ESG management platform that unifies Environmental measurement, Social engagement, and Governance assurance into one coherent system. The product targets a hackathon demo: a 60-second narrative where a sustainability manager uploads real data, sees an ESG baseline, explores a MACC abatement curve, watches employees log sustainable actions that update corporate scores, and generates a board-ready compliance report — all with AI that acts proactively, not just explains reactively.

This is a greenfield build. Zero source code exists. The plan covers project scaffold through demo-ready polish.

---

## Problem Frame

Enterprise sustainability teams use 4-5 disconnected tools: carbon accounting (measures but doesn't act), CSR platforms (engage but don't measure), governance tools (check but don't integrate). Result: data distrust, slow onboarding, tool sprawl. No product fills the full E+S+G row.

EcoSphere combines all three pillars with a shared canonical data model, an Evidence Registry as trust backbone, and an AI agent that operates across pillars — processing uploads, validating actions, generating reports, and explaining metrics.

**Hackathon success criteria:** One killer 60s demo. Real data (not mocked). AI that acts. Clear ROI. Polished UX.

(see origin: `docs/brainstorms/2026-07-12-ecosphere-requirements.md`)

---

## Requirements Trace

- R1 [P0]. Document upload + AI extraction
- R2 [P0]. Emission factor mapping (Climatiq + fallback)
- R3 [P0]. Scope 1/2/3 calculation with confidence scores
- R4 [P0]. Provenance chain for every metric
- R5 [P1]. MACC curve from abatement knowledge base
- R6 [P1]. SBTi target trajectory visualization
- R7 [P0]. Employee Sustainability Hub (10 actions, multi-source evidence)
- R8 [P1]. XP and badges
- R9 [P1]. Department leaderboards
- R10 [P1]. Carbon rollup into corporate totals
- R11 [P0]. Evidence Registry with SHA-256 hash chain
- R12 [P2]. Spike detection (>30% MoM)
- R13 [P2]. GRI/CSRD compliance check
- R14 [P1]. Cited ESG reports
- R15 [P0]. Board-ready PDF export
- R16 [P0]. Unified dashboard with drill-down
- R17 [P0]. Canonical data model
- R18 [P0]. AI hybrid (proactive + reactive)
- R19 [P0]. 60-second demo narrative
- R20 [P1]. WCAG 2.1 AA basics

**Origin actors:** A1 (Sustainability Manager), A2 (Employee), A3 (CFO/Executive), A4 (AI Agent), A5 (External Auditor)
**Origin flows:** F1 (Data Ingestion → Baseline), F2 (Employee Action → Impact), F3 (MACC → Reduction Plan), F4 (Compliance → Report)
**Origin acceptance examples:** AE1 (R1-R3 upload), AE2 (R4 provenance), AE3 (R5-R6 MACC), AE4 (R7-R10 employee action), AE5 (R11/R14/R15 report), AE6 (R18 AI explanation)

---

## Scope Boundaries

### Deferred for later

- Multi-organization support (single org only)
- Real-time IoT sensor integration
- Supplier ESG passport / Scope 3 supplier verification
- Mobile app (web-only)
- SSO / enterprise authentication (demo accounts sufficient)
- Multi-language support
- Water/biodiversity/circular economy modules
- Predictive compliance radar
- Carbon credit marketplace
- API public documentation / developer portal

### Outside this product's identity

- Standalone carbon accounting tool — EcoSphere unifies measurement with engagement and governance
- Employee wellness platform — Social module drives ESG outcomes, not general wellness
- Board governance workflow tool — Governance is about data trust and reporting, not meeting management
- ESG data marketplace — We help organizations generate and trust their own data
- Climate risk modeling platform — We measure and act on emissions, not model physical/transitional climate risk

---

## Context & Research

### Relevant Code and Patterns

None — greenfield project. No existing codebase patterns to follow.

### Institutional Learnings

None — new project.

### External References

- **Climatiq API:** REST API for emission factor lookups. Free tier sufficient for hackathon. Need API documentation review during planning for exact schema.
- **IEA/IRENA/NREL abatement cost data:** Public datasets for MACC curve costs. Will be curated into a local JSON knowledge base.
- **GRI/CSRD framework field mappings:** Need research during implementation for compliance checking.
- **Next.js App Router:** React framework with server components, API routes, file-based routing. v14+ recommended.
- **Prisma:** Type-safe ORM for PostgreSQL. Excellent DX, migration support.

---

## Key Technical Decisions

- **Monorepo with Next.js App Router:** Frontend + API routes in one project. Eliminates separate backend service. Fastest for hackathon with 3 people.
- **Prisma + PostgreSQL:** Type-safe ORM, great DX, migration support.
- **Tailwind CSS:** Fast utility-first styling. No design system overhead.
- **Recharts for data visualization:** Lightweight React charting library. Used for MACC curves, scope breakdowns, SBTi trajectory, leaderboards, and compliance percentages.
- **Demo accounts (no auth):** Pre-seeded Sustainability Manager, Employee, CFO users. Login is a dropdown. Zero auth complexity.
- **AI provider (Gemini):** Single `AIProvider` interface with Gemini implementation. OpenRouter/Grok can be added later — ponytail: add when needed.
- **MACC knowledge base as JSON:** ~12 common abatement measures with IEA/IRENA/NREL cost data. AI personalizes at runtime using org data.
- **SHA-256 hash chain for Evidence Registry:** Each record hashes its content + previous hash. Tamper-evident, simple to implement.
- **PDF generation with @react-pdf/renderer:** Server-side PDF generation for board-ready reports. No external service needed.
- **File upload with native FormData:** No multer or busboy. Next.js API routes handle multipart natively.

---

## Open Questions

### Resolved During Planning

- **Climatiq API schema:** Will be reviewed during U4 implementation. Fallback to hardcoded factors ensures demo works without API.
- **PostgreSQL schema:** Defined in U1 as Prisma schema. Canonical core + domain-specific tables.
- **GRI/CSRD field mappings:** Will be researched during U9 implementation. Simplified mapping for hackathon (key metrics only, not full framework coverage).
- **Demo data sourcing:** Fictional company "GreenForge Industries" with full ERP document pack. Two folders: healthy (score 82) and poor (score 41). Intentional anomalies for AI detection demo.
- **Employee action catalog:** 10 predefined actions with multi-source evidence (photo, receipt, certificate, GPS, self-report). AI validates with confidence scores.
- **MACC cost source:** Curated knowledge base from IEA/IRENA/NREL/McKinsey, not Climatiq. AI personalizes estimates.
- **AI behavior model:** Hybrid — proactive (auto-generates reports, drafts emails, flags anomalies) + reactive (explains metrics on demand).
- **Navigation model:** Left sidebar (global) + top ESG switcher (Environment | Social | Governance). Executive Dashboard as landing page.
- **Accessibility:** WCAG 2.1 AA basics — keyboard nav, focus states, alt text, color contrast, form labels.

### Deferred to Implementation

- Exact Climatiq API response format — will be discovered during U4 when calling the API
- Exact GRI/CSRD field mapping granularity — will be scoped to key metrics during U9
- PDF layout refinement — will iterate during U15 polish phase

---

## Output Structure

```
ecosphere/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── environment/
│   │   │   └── page.tsx
│   │   ├── social/
│   │   │   └── page.tsx
│   │   ├── governance/
│   │   │   └── page.tsx
│   │   └── api/
│   │       ├── upload/route.ts
│   │       ├── actions/route.ts
│   │       ├── reports/route.ts
│   │       └── ai/route.ts
│   ├── lib/
│   │   ├── db.ts
│   │   ├── ai/
│   │   │   ├── provider.ts
│   │   │   ├── gemini.ts
│   │   │   └── prompts.ts
│   │   ├── emissions/
│   │   │   ├── calculator.ts
│   │   │   ├── climatiq.ts
│   │   │   └── factors.ts
│   │   ├── macc/
│   │   │   ├── knowledge-base.json
│   │   │   └── curve.ts
│   │   ├── evidence/
│   │   │   ├── registry.ts
│   │   │   └── hash-chain.ts
│   │   ├── compliance/
│   │   │   ├── gri.ts
│   │   │   └── csrd.ts
│   │   └── pdf/
│   │       └── report.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── ESGSwitcher.tsx
│   │   │   └── DashboardLayout.tsx
│   │   ├── environment/
│   │   │   ├── UploadZone.tsx
│   │   │   ├── ScopeBreakdown.tsx
│   │   │   ├── MACCCurve.tsx
│   │   │   └── ProvenancePanel.tsx
│   │   ├── social/
│   │   │   ├── ActionCatalog.tsx
│   │   │   ├── Leaderboard.tsx
│   │   │   └── BadgeDisplay.tsx
│   │   ├── governance/
│   │   │   ├── ComplianceStatus.tsx
│   │   │   ├── ReportPreview.tsx
│   │   │   └── EvidenceChain.tsx
│   │   └── shared/
│   │       ├── ESGScoreCard.tsx
│   │       └── AIInsight.tsx
│   └── data/
│       └── demo/
│           ├── greenforge-healthy/
│           └── greenforge-poor/
├── public/
│   └── sample-docs/
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

---

## Implementation Units

### Phase 1: Foundation

- U1. **Project Scaffold + Database Schema**

**Goal:** Initialize Next.js project with Prisma, PostgreSQL connection, and the canonical data model covering all three ESG pillars.

**Requirements:** R17 (canonical data model), R4 (provenance chain), R11 (Evidence Registry)

**Dependencies:** None

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`, `postcss.config.js`, `.gitignore`, `.env.example`
- Create: `prisma/schema.prisma`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Create: `src/lib/db.ts`

**Approach:**
- Initialize Next.js 14 with App Router, TypeScript, Tailwind CSS
- Define Prisma schema with canonical core tables: Organization, Department, Employee, Location, ESGScore
- Domain-specific tables: ESGMetric (environmental), EmployeeAction (social), EvidenceRecord (governance)
- EvidenceRecord includes: id, contentHash, previousHash, createdAt, source, metricId — forming the hash chain
- ESGMetric includes: scope (1/2/3), value, unit, confidence, sourceDocumentId, extractionLogic, emissionFactorVersion
- Seed script for demo organization "GreenForge Industries" with departments and demo users
- Database URL in `.env.example`

**Test scenarios:**
- Happy path: `prisma migrate dev` succeeds and creates all tables
- Happy path: Seed script creates organization, departments, and 3 demo users
- Edge case: Schema handles all scope types (1, 2, 3) without errors
- Integration: EvidenceRecord hash chain can be queried in order (each record links to previous)

**Verification:**
- Database schema exists and migrates cleanly
- Seed script runs and populates demo data
- `npx prisma studio` shows all tables with correct relationships

---

- U2. **AI Provider Abstraction Layer**

**Goal:** Build the AI provider interface with Gemini implementation, plus prompt templates for extraction, validation, and explanation.

**Requirements:** R18 (AI hybrid mode), R1 (extraction), R7 (action validation)

**Dependencies:** None

**Files:**
- Create: `src/lib/ai/provider.ts`
- Create: `src/lib/ai/gemini.ts`
- Create: `src/lib/ai/prompts.ts`

**Approach:**
- Define `AIProvider` interface: `extractDocument(file)`, `validateAction(action, evidence)`, `explainMetric(metric, context)`, `generateReport(data)`, `detectAnomaly(metrics)`
- Gemini implementation (free tier, good for hackathon)
- Prompt templates for each operation in `prompts.ts`
- API key from env vars per security baseline

**Test scenarios:**
- Happy path: Provider can be instantiated with env config
- Happy path: `extractDocument` returns structured data from a test prompt
- Happy path: `validateAction` returns confidence score and carbon estimate
- Edge case: Provider falls back gracefully when API key is missing (returns mock data for demo)
- Error path: Provider throws descriptive error when API call fails

**Verification:**
- Provider interface is defined and implemented
- At least one provider (Gemini) can be called successfully
- Fallback to mock data works when API is unavailable

---

- U3. **Document Upload + Extraction Pipeline**

**Goal:** Handle file uploads (PDF, CSV, images), extract structured ESG data using AI, and store with provenance chain.

**Requirements:** R1 (upload + extraction), R2 (emission factor mapping), R4 (provenance chain)

**Dependencies:** U1, U2

**Files:**
- Create: `src/app/api/upload/route.ts`
- Create: `src/lib/emissions/climatiq.ts`
- Create: `src/lib/emissions/factors.ts`
- Create: `src/lib/emissions/calculator.ts`
- Test: `src/lib/emissions/__tests__/calculator.test.ts`

**Approach:**
- API route accepts multipart FormData with file + metadata
- Enforce max file size (10MB), validate MIME types server-side, strip filenames
- AI extracts structured data: vendor, amount, date, category, quantity, unit
- Emission factor lookup: try Climatiq API first, fall back to hardcoded factors table
- Calculator maps extracted data to Scope 1/2/3 with confidence scores
- Provenance chain recorded: source filename, extraction timestamp, emission factor used, factor version, confidence level
- Stored in ESGMetric table with full provenance

**Test scenarios:**
- Happy path: Upload a utility bill PDF → returns structured carbon transaction with Scope 2 emissions
- Happy path: Upload a CSV fleet record → returns Scope 1 emissions with confidence score
- Happy path: Provenance panel shows source file, extraction time, factor version, confidence
- Edge case: Climatiq API unavailable → falls back to hardcoded factors
- Edge case: File type not supported → returns clear error message
- Edge case: Empty or corrupt file → returns validation error
- Integration: Uploaded data appears in ESGMetric table with correct scope assignment

**Verification:**
- File upload endpoint works with PDF, CSV, and image files
- Extracted data includes all required fields (vendor, amount, date, category, quantity)
- Emission factors are assigned correctly (Scope 1 for fuel, Scope 2 for electricity, Scope 3 for travel)
- Provenance chain is complete and queryable

---

### Phase 2: Environmental + Social Core

- U4. **MACC Knowledge Base + Abatement Cost Curve**

**Goal:** Build the MACC curve generator using a curated abatement knowledge base, with AI personalization.

**Requirements:** R5 (MACC curve), R6 (SBTi trajectory)

**Dependencies:** U1, U2

**Files:**
- Create: `src/lib/macc/knowledge-base.json`
- Create: `src/lib/macc/curve.ts`
- Test: `src/lib/macc/__tests__/curve.test.ts`

**Approach:**
- Knowledge base JSON with ~12 common measures: LED lighting, solar panels, heat pumps, insulation, EV fleet, remote work policy, recycling program, etc.
- Each measure includes: name, category, estimatedCost, expectedLifetime, annualSavings, emissionReduction, costPerTonne, source (IEA/IRENA/NREL/McKinsey)
- Curve generator ranks measures by $/tCO₂e, calculates cumulative reduction
- AI personalizes: takes org's actual data (electricity consumption, fleet size, building area) and adjusts estimates
- SBTi trajectory: given a baseline and selected measures, visualize path toward 1.5°C target
- Internal carbon price applied to show financial impact of each measure
- AI generates next-step suggestions for each measure (explain benefit, suggest implementation approach). Full document generation (procurement requests, vendor emails) deferred post-hackathon — ponytail: add when demo proves the concept.

**Test scenarios:**
- Happy path: Given baseline of 500 tCO₂e/year, returns 8-12 measures ranked by cost/tonne
- Happy path: Selecting measures bends SBTi trajectory toward 1.5°C
- Happy path: AI personalization adjusts costs based on org's electricity consumption data
- Edge case: Empty baseline → returns knowledge base defaults without personalization
- Edge case: All measures selected → shows maximum reduction potential
- Integration: MACC data flows to Environmental dashboard component

**Verification:**
- Knowledge base contains at least 10 measures with realistic cost data
- Curve generator produces correctly ranked output
- SBTi trajectory calculation is mathematically correct

---

- U5. **Employee Action System**

**Goal:** Build the employee action catalog, evidence handling, AI validation, XP/badges, and carbon rollup.

**Requirements:** R7 (action hub), R8 (XP/badges), R9 (leaderboards), R10 (carbon rollup)

**Dependencies:** U1, U2, U3

**Files:**
- Create: `src/app/api/actions/route.ts`
- Create: `src/components/social/ActionCatalog.tsx`
- Create: `src/components/social/Leaderboard.tsx`
- Create: `src/components/social/BadgeDisplay.tsx`
- Test: `src/lib/__tests__/actions.test.ts`

**Approach:**
- Action catalog: 10 predefined types with carbon impact formulas
- Evidence handling: photo upload, receipt parsing, GPS, self-report
- AI validates evidence, assigns confidence score (0-100%), estimates carbon saved
- XP system: base XP per action type, multiplier for frequency streaks, bonus for high-confidence evidence
- Badge system: milestones (first action, 10 actions, 100 kg CO₂e saved, etc.)
- Leaderboard: department-level rankings by total carbon saved
- Carbon rollup: employee actions → department totals → corporate Scope 3 reduction
- All actions recorded in EvidenceRegistry with hash chain

**Test scenarios:**
- Happy path: Employee logs "Bike Commute" with photo → AI validates (94% confidence, 8.2 km) → 25 XP awarded → Scope 3 reduced
- Happy path: Department leaderboard updates after action submission
- Happy path: Badge "Green Commuter" awarded after 5 bike commute actions
- Happy path: Corporate Scope 3 total decreases by calculated carbon savings
- Edge case: Duplicate action within 24 hours → rejected with message
- Edge case: Low-confidence evidence (<50%) → flagged for review, XP withheld
- Integration: Action appears in EvidenceRegistry with hash chain link

**Verification:**
- All 10 action types work with correct carbon calculations
- XP and badge logic matches defined rules
- Leaderboard rankings are accurate
- Carbon rollup correctly aggregates to corporate totals

---

### Phase 3: Governance

- U6. **Evidence Registry with Hash Chain**

**Goal:** Build the tamper-resistant Evidence Registry with SHA-256 hash chain integrity.

**Requirements:** R11 (Evidence Registry with hash chain)

**Dependencies:** U1

**Files:**
- Create: `src/lib/evidence/registry.ts`
- Create: `src/lib/evidence/hash-chain.ts`
- Test: `src/lib/evidence/__tests__/hash-chain.test.ts`

**Approach:**
- Hash chain: each EvidenceRecord stores SHA-256(content + previousHash)
- Registry API: `addRecord(content, source, metricId)` → computes hash, links to previous, stores
- Verification: `verifyChain()` → walks entire chain, validates each hash (ponytail: O(n), acceptable for hackathon scale <1000 records; add checkpoint-based incremental verification if throughput matters)
- Tamper detection: modifying any record breaks the chain from that point forward
- Append-only: no update or delete operations on EvidenceRecord

**Test scenarios:**
- Happy path: Add 5 records → chain is valid → verifyChain returns true
- Happy path: Each record's hash = SHA-256(content + previousHash)
- Edge case: First record uses genesis hash (all zeros)
- Edge case: Tamper with record #3 → verifyChain fails at record #3
- Edge case: Add record with empty content → still produces valid hash
- Integration: Evidence records created by upload, actions, and reports all chain correctly

**Verification:**
- Hash chain verification works end-to-end
- Tampering is detectable
- All evidence sources (uploads, actions, reports) write to the registry

---

- U7. **Compliance Check + Report Generation**

**Goal:** Build GRI/CSRD compliance checking and board-ready PDF report generation.

**Requirements:** R12 (spike detection), R13 (compliance check), R14 (cited reports), R15 (PDF export)

**Dependencies:** U1, U2, U3, U6

**Cut-first guidance:** If time runs short, skip R12 (spike detection) and R13 (full compliance check). Ship R14 + R15 (cited PDF report with basic metric listing) — this is P0/P1 and the demo endpoint. Spike detection and GRI/CSRD field mappings are P2 stretch goals.

**Files:**
- Create: `src/lib/compliance/gri.ts`
- Create: `src/lib/compliance/csrd.ts`
- Create: `src/lib/pdf/report.tsx`
- Create: `src/app/api/reports/route.ts`
- Test: `src/lib/compliance/__tests__/gri.test.ts`

**Approach:**
- GRI mapping: key metrics mapped to GRI disclosure requirements (simplified for hackathon — ~20 key metrics, not full framework)
- CSRD mapping: double materiality check against CSRD requirements
- Spike detection: flag month-over-month changes >30% with AI explanation
- Report generator: assembles Executive Summary, E/S/G metrics, compliance status, missing evidence, AI recommendations
- PDF generation: server-side rendering with @react-pdf/renderer
- Every metric in the report links back to its EvidenceRegistry record
- Board-ready format: professional layout, company branding, page numbers, executive summary
- Report versioning: store each generated report as a versioned record (ponytail: simple timestamp-based versioning, full version history deferred post-hackathon)

**Test scenarios:**
- Happy path: Generate report for 6 months of data → GRI-compliant report with all metrics cited
- Happy path: Missing evidence flagged with severity levels in report
- Happy path: PDF exports with executive summary, metrics, compliance status, AI recommendations
- Happy path: Spike detection flags fuel consumption increase >30% with AI explanation
- Edge case: No data → report shows "insufficient data" with recommendations
- Edge case: All evidence present → report shows 100% compliance
- Integration: Report links every metric to EvidenceRegistry record

**Verification:**
- GRI and CSRD mappings cover key metrics
- Report generation produces valid PDF
- Every metric in report is traceable to source evidence
- Spike detection works on sample data

---

### Phase 4: Frontend

- U8. **Layout + Navigation + Executive Dashboard**

**Goal:** Build the application shell with sidebar navigation, ESG switcher, and executive dashboard landing page.

**Requirements:** R16 (unified dashboard), R20 (WCAG AA)

**Dependencies:** U1

**Files:**
- Create: `src/components/layout/Sidebar.tsx`
- Create: `src/components/layout/ESGSwitcher.tsx`
- Create: `src/components/layout/DashboardLayout.tsx`
- Create: `src/components/shared/ESGScoreCard.tsx`
- Create: `src/components/shared/AIInsight.tsx`
- Create: `src/app/dashboard/page.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

**Approach:**
- Sidebar: left-side navigation with Dashboard, ESG (Environment/Social/Governance), Reports, Goals, Rewards, Settings
- ESG Switcher: top tabs within ESG workspace — Environment | Social | Governance
- Executive Dashboard: overall ESG score (0-100), pillar breakdown cards, recent alerts, AI recommendations, pending actions
- WCAG AA: semantic HTML, ARIA labels, keyboard navigation, visible focus states, color contrast 4.5:1+
- Responsive: works on desktop (1200px+) and tablet (768px+)
- Demo user selector: dropdown to switch between Sustainability Manager, Employee, CFO views

**Test scenarios:**
- Happy path: Dashboard shows overall ESG score with three pillar cards
- Happy path: Clicking sidebar items navigates to correct pages
- Happy path: ESG Switcher toggles between Environment/Social/Governance views
- Happy path: Keyboard navigation works through all interactive elements
- Edge case: No data loaded → dashboard shows empty state with upload prompt
- Edge case: Very long department names → truncated with ellipsis
- Integration: Dashboard fetches real data from API routes

**Verification:**
- All navigation works correctly
- Executive dashboard displays real ESG scores
- Keyboard navigation is complete
- Color contrast meets WCAG AA

---

- U9. **Environmental Dashboard**

**Goal:** Build the Environmental module UI: document upload zone, scope breakdown visualization, MACC curve, and provenance panel.

**Requirements:** R1 (upload UI), R3 (scope breakdown), R5 (MACC visualization), R6 (SBTi trajectory), R4 (provenance drill-down)

**Dependencies:** U3, U4, U8

**Files:**
- Create: `src/components/environment/UploadZone.tsx`
- Create: `src/components/environment/ScopeBreakdown.tsx`
- Create: `src/components/environment/MACCCurve.tsx`
- Create: `src/components/environment/ProvenancePanel.tsx`
- Create: `src/app/environment/page.tsx`

**Approach:**
- Upload Zone: drag-and-drop + file picker, supports PDF/CSV/images, shows upload progress and extraction results
- Scope Breakdown: bar chart or donut showing Scope 1/2/3 split with confidence scores
- MACC Curve: horizontal bar chart ranking measures by $/tCO₂e, clickable to add to reduction plan
- SBTi Trajectory: line chart showing current path vs. 1.5°C target, bends as measures are selected
- Provenance Panel: slide-out panel showing source file, extraction details, emission factor, confidence
- AI Insight: contextual explanation cards ("Fleet fuel rose 12% due to expanded delivery routes")

**Test scenarios:**
- Happy path: Drag-and-drop upload → extraction results appear → scope breakdown updates
- Happy path: MACC curve shows 8-12 measures ranked by cost/tonne
- Happy path: Selecting measures bends SBTi trajectory line
- Happy path: Clicking metric → provenance panel shows full traceability
- Edge case: Upload fails → error message with retry option
- Edge case: No baseline data → MACC shows "upload data first" state
- Integration: Uploaded data flows through to MACC and dashboard scores

**Verification:**
- Upload flow works end-to-end
- MACC visualization is interactive and responsive
- Provenance drill-down shows complete traceability
- AI insights appear contextually

---

- U10. **Social Dashboard**

**Goal:** Build the Social module UI: action catalog, evidence submission, XP/badges display, and leaderboard.

**Requirements:** R7 (action hub UI), R8 (XP/badges UI), R9 (leaderboard UI)

**Dependencies:** U5, U8

**Files:**
- Create: `src/app/social/page.tsx`

**Approach:**
- Action Catalog: card grid of 10 action types with icons, carbon impact, XP reward
- Evidence Submission: modal with action-specific evidence options (photo upload, receipt, GPS, self-report)
- AI Validation: real-time feedback showing confidence score and estimated carbon savings
- XP Display: progress bar, level indicator, recent XP history
- Badge Display: badge wall with earned/locked badges, milestone progress
- Leaderboard: department rankings by total carbon saved, individual top performers
- Impact Summary: "If 500 employees did this twice a week, annual emissions would decrease by X tonnes"

**Test scenarios:**
- Happy path: Select action → submit evidence → AI validates → XP awarded → leaderboard updates
- Happy path: Badge earned notification appears after milestone
- Happy path: Department leaderboard shows correct rankings
- Happy path: Impact summary calculates correctly
- Edge case: Submit evidence with low confidence → "Under review" state
- Edge case: No actions logged yet → empty state with "Be the first" prompt
- Integration: Action submission triggers carbon rollup to Environmental module

**Verification:**
- All 10 action types display correctly
- Evidence submission flow works end-to-end
- XP and badge logic matches rules
- Leaderboard is accurate and updates in real-time

---

- U11. **Governance Dashboard**

**Goal:** Build the Governance module UI: compliance status, report generation, evidence chain visualization.

**Requirements:** R12 (spike alerts), R13 (compliance status), R14 (report preview), R15 (PDF export)

**Dependencies:** U6, U7, U8

**Files:**
- Create: `src/app/governance/page.tsx`

**Approach:**
- Compliance Status: GRI/CSRD framework cards showing compliance percentage, gaps, recommendations
- Spike Alerts: notification cards for MoM anomalies with AI explanation
- Report Preview: rendered report preview with all metrics cited
- PDF Export: one-click download of board-ready PDF
- Evidence Chain: visual chain showing hash-linked evidence records
- AI Insights: contextual tooltip cards explaining metrics ("Why did emissions increase?") using U2's explainMetric()

**Test scenarios:**
- Happy path: Compliance status shows GRI/CSRD percentages with gap analysis
- Happy path: Spike alert appears for fuel consumption >30% increase
- Happy path: Generate report → preview appears → PDF downloads
- Happy path: Evidence chain shows hash-linked records visually
- Happy path: AI insight card explains "Why did emissions increase?" with cited explanation
- Edge case: No compliance data → shows "insufficient data" state
- Edge case: PDF generation fails → error with retry
- Integration: Report links every metric to EvidenceRegistry

**Verification:**
- Compliance percentages are accurate
- Spike detection works on sample data
- PDF generation produces valid, professional report
- Evidence chain visualization is correct

---

### Phase 5: Integration + Demo

- U12. **Demo Data Pack + Narrative Flow**

**Goal:** Prepare the complete demo data pack and wire the 60-second demo narrative end-to-end.

**Requirements:** R19 (60-second demo narrative)

**Dependencies:** U3, U4, U5, U6, U7, U8, U9, U10, U11

**Files:**
- Create: `src/data/demo/greenforge-healthy/` (utility bills, invoices, fleet records)
- Create: `src/data/demo/greenforge-poor/` (same structure, different values)
- Create: `prisma/seed.ts`
- Modify: various components for demo flow polish

**Approach:**
- Demo data creation sub-steps: (1) define GreenForge data model (company params, monthly figures), (2) generate CSVs programmatically from single source of truth, (3) create PDF templates for utility bills/invoices, (4) cross-validate all numbers across files
- Prepare "GreenForge Industries" demo data: realistic PDFs and CSVs with internally consistent operational data
- Two scenarios: healthy company (ESG score ~82) and poor company (ESG score ~41)
- Intentional anomalies: fuel consumption spike, missing waste disposal records
- Seed script loads both scenarios into database
- Demo narrative flow: Login → Dashboard → Upload (Environment) → MACC → Employee Action (Social) → Leaderboard → Generate Report (Governance) → Dashboard score update
- One-click scenario switcher for live demo comparison
- AI proactive actions: auto-generates reduction plan email, flags anomaly without being asked

**Test scenarios:**
- Happy path: Full demo flow completes in <60 seconds
- Happy path: Upload healthy company data → score 82 → MACC shows 10 measures
- Happy path: Switch to poor company → score drops → anomalies flagged
- Happy path: Employee action → leaderboard updates → corporate score changes
- Happy path: Generate report → PDF exports with cited evidence
- Edge case: Demo data files missing → graceful error with instructions
- Integration: All modules connect through canonical data model

**Verification:**
- Demo data is internally consistent (numbers add up)
- Full narrative flow works without errors
- AI proactive actions trigger automatically
- PDF report is board-ready quality

---

## System-Wide Impact

- **Interaction graph:** All three modules share the canonical data model (Organization → Department → Employee, ESGMetric, EvidenceRecord). Environmental uploads feed Governance reports. Social actions feed Environmental carbon totals. Governance evidence feeds all modules.
- **Error propagation:** AI provider failures fall back to mock data. Climatiq API failures fall back to hardcoded factors. Database errors surface as user-friendly messages, never stack traces.
- **State lifecycle risks:** Evidence hash chain is append-only — no partial writes allowed. Re-upload creates a new EvidenceRecord with a "supersedes" link to the old one (append-only preserved). Leaderboard calculations are derived, not stored (recalculated on read).
- **API surface parity:** All API routes follow consistent patterns: POST for create, GET for read, consistent error shapes.
- **Integration coverage:** The demo flow (F1→F2→F3→F4) crosses all three modules. Unit tests alone won't prove this works — the demo data pack serves as the integration test.
- **Unchanged invariants:** The EvidenceRegistry hash chain is never broken. ESG scores are always derived from underlying metrics, never manually set. Provenance chains are never truncated.

---

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Climatiq API rate limits or downtime during demo | Hardcoded fallback factors ensure demo works offline |
| AI provider API unavailable | Pre-seeded demo data in database ensures demo works without live AI; mock fallback for development only |
| PDF generation complexity delays timeline | Use simple HTML-to-PDF if @react-pdf/renderer is too slow |
| GRI/CSRD field mappings too complex for hackathon | Simplify to ~20 key metrics per framework, not full coverage |
| 3-person team too small for full scope | P2 requirements (R12, R13) are cut-first candidates |
| PostgreSQL + pgvector setup complexity | Use Supabase hosted DB if local setup is problematic |

---

## Documentation / Operational Notes

- `.env.example` documents all required environment variables
- `README.md` updated with setup instructions, demo data preparation, and architecture overview
- No production deployment needed — hackathon demo runs locally or on Vercel
- Demo data files are committed to repo (they're the demo, not real sensitive data)

---

## Sources & References

- **Origin document:** [docs/brainstorms/2026-07-12-ecosphere-requirements.md](docs/brainstorms/2026-07-12-ecosphere-requirements.md)
- **Ideation artifact:** [docs/ideation/2026-07-12-ecosphere-ideation.md](docs/ideation/2026-07-12-ecosphere-ideation.md)
- Climatiq API: https://docs.climatiq.io/
- Prisma: https://www.prisma.io/docs
- Next.js App Router: https://nextjs.org/docs/app
- @react-pdf/renderer: https://react-pdf.org/
- Recharts: https://recharts.org/
