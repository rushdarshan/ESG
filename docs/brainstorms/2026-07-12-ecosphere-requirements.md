---
date: 2026-07-12
topic: ecosphere-unified-esg-platform
---

# EcoSphere — Unified E+S+G Platform

## Problem Frame

Enterprise sustainability teams face a fragmented tool landscape: carbon accounting tools measure but don't act, CSR platforms engage but don't measure, governance tools check but don't integrate. The result is data distrust (1/3 of finance execs don't trust their own ESG data), slow onboarding (weeks to first insight), and tool sprawl (4-5 platforms stitched together). No product today fills the full E+S+G row — combining Environmental measurement, Social engagement, and Governance assurance into one coherent system with a single data model and one login.

This matters because ESG reporting is becoming mandatory (CSRD, SEC Climate Rule, ISSB), boards need trustworthy data now, and employees are the untapped lever for Scope 1/2/3 reduction. The hackathon judges reward: one killer 60s demo, real data (not mocked), AI that acts (not just chats), clear ROI, and polished UX.

---

## Actors

- A1. **Sustainability Manager**: Owns ESG strategy, sets carbon targets, reviews reports, manages reduction plans. Primary user of Environmental module.
- A2. **Employee**: Logs sustainable actions (commute, energy savings, CSR participation), earns XP/badges, contributes to department/company ESG scores. Primary user of Social module.
- A3. **CFO / Executive**: Reviews ESG performance, approves reduction investments, reads board-ready reports. Primary consumer of Governance module outputs.
- A4. **AI Agent**: Processes uploaded data (invoices, receipts, utility bills), validates anomalies (spike detection), links evidence to the tamper-resistant Evidence Registry, generates reports, calculates emissions, and explains metrics. Operates across all three pillars.
- A5. **External Auditor / Assessor**: Reviews ESG data provenance, verifies compliance against GRI/CSRD frameworks, validates audit trail. Consumes Governance outputs.

---

## Key Flows

### F1. Data Ingestion → ESG Baseline

- **Trigger:** Sustainability Manager uploads utility bills, invoices, fleet fuel records
- **Actors:** A1, A4
- **Steps:**
  1. User uploads documents (PDF, CSV, image) via drag-and-drop or file picker
  2. AI Agent extracts structured data (vendor, amount, date, category, quantity)
  3. AI Agent maps extracted data to emission factors (Climatiq API with hardcoded fallback)
  4. AI Agent generates Scope 1/2/3 breakdown with confidence scores
  5. Provenance chain recorded: source file → extraction logic → emission factor version → timestamp
  6. ESG baseline dashboard populates with full breakdown
- **Outcome:** Organization has a data-trustable ESG baseline with complete provenance
- **Covered by:** R1, R2, R3, R4

### F2. Employee Action → Corporate ESG Impact

- **Trigger:** Employee logs a sustainable action (bike commute, WFH, recycling, CSR event)
- **Actors:** A2, A4
- **Steps:**
  1. Employee selects action type and provides evidence (photo, receipt, certificate, GPS, or self-report)
  2. AI Agent validates the action (extracts distance, calculates carbon saved)
  3. XP and badges awarded based on action type and impact
  4. Department leaderboard updates in real time
  5. Carbon reduction rolls up into corporate Scope 1/2/3 totals
  6. Organization ESG score updates
  7. AI explains impact: "If 500 employees did this twice a week, annual emissions would decrease by X tonnes CO₂e"
- **Outcome:** Employee actions directly and visibly reduce corporate carbon footprint
- **Covered by:** R7, R8, R9, R10

### F3. MACC Curve → Reduction Plan

- **Trigger:** Sustainability Manager opens the "Act" tab after baseline is established
- **Actors:** A1, A4
- **Steps:**
  1. AI Agent loads reduction options from the abatement knowledge base (IEA/IRENA/NREL/McKinsey), personalizes cost estimates using the organization's operational data, and ranks by $/tCO₂e
  2. User clicks measures to add them to a reduction plan
  3. SBTi target trajectory bends toward 1.5°C in real time as measures are selected
  4. AI drafts procurement requests, vendor outreach emails, and board memos for each selected measure
  5. Internal carbon price applied to show financial impact
- **Outcome:** Organization has a financially-optimized decarbonization plan with supporting documents
- **Covered by:** R5, R6

### F4. Compliance Check → Board-Ready Report

- **Trigger:** Sustainability Manager or CFO clicks "Generate Report"
- **Actors:** A1, A3, A4, A5
- **Steps:**
  1. AI Agent validates all ESG data against selected framework (GRI or CSRD)
  2. Missing evidence and compliance gaps flagged with severity levels
  3. AI Agent generates cited report: every metric linked to source evidence
  4. Report includes: Executive Summary, E/S/G metrics, missing evidence, compliance risks, AI recommendations
  5. Board-ready PDF exported with audit trail
  6. Version history maintained
- **Outcome:** Organization has a trustworthy, audit-ready ESG report
- **Covered by:** R15, R16, R17, R18, R19

---

## Information Architecture

**Navigation model:** Left sidebar for global navigation (Dashboard, ESG, Reports, Goals, Rewards, Settings). Within the ESG workspace, a top switcher for the three pillars: Environment | Social | Governance. First page after login is an Executive Dashboard showing overall ESG score with drill-down into each pillar.

**Demo flow:** Executive Dashboard → Environment (upload + MACC) → Social (employee actions + leaderboard) → Governance (AI report + compliance) → back to Dashboard showing score update.

---

## Requirements

**Priority tiers:** P0 = must ship (demo breaks without it), P1 = should ship (judge wow factor), P2 = nice to have (cut first when time runs short)

**Demo-first rule:** R19 (60-second demo narrative) is the primary success criterion. All requirements implement backwards from R19. If time runs short, cut P2 → P1 from the bottom up, never cut anything R19 depends on.

**Environmental Module (Measure)**

- R1 [P0]. System accepts document uploads (PDF, CSV, images) and extracts structured ESG data (vendor, amount, date, category, quantity) using AI
- R2 [P0]. System maps extracted data to emission factors via Climatiq API with hardcoded fallback for offline/demo mode
- R3 [P0]. System calculates Scope 1 (direct), Scope 2 (energy), and Scope 3 (value chain) emissions with confidence scores per metric
- R4 [P0]. System records a provenance chain for every metric: source document, extraction logic, emission factor version, timestamp, confidence level
- R5 [P1]. System generates a Marginal Abatement Cost Curve (MACC) ranking reduction options by $/tCO₂e, sourced from a curated abatement knowledge base seeded from IEA, IRENA, DOE, NREL, and McKinsey MACC studies — AI personalizes estimates using the organization's own data
- R6 [P1]. System tracks progress against SBTi-aligned targets with trajectory visualization toward 1.5°C

**Social Module (Engage)**

- R7 [P0]. System provides an Employee Sustainability Hub with a curated catalog of ~10 actions (bike commute, walking, public transport, carpool, WFH, recycling, tree planting, CSR volunteering, energy-saving suggestions, sustainability training). Each action supports multiple evidence types (photo, receipt, certificate, GPS, self-report). AI validates evidence, assigns confidence score, estimates carbon impact, awards XP, and records in governance audit trail.
- R8 [P1]. System awards XP and badges based on action type, frequency, and carbon impact
- R9 [P1]. System maintains real-time department and organization leaderboards
- R10 [P1]. System rolls up employee action carbon reductions into corporate Scope 1/2/3 totals automatically

**Governance Module (Prove)**

- R11 [P0]. System maintains an Evidence Registry where every ESG metric links to supporting source documents. Records are append-only with SHA-256 hash chain (each record hashes its content + previous hash) to ensure tamper resistance.
- R12 [P2]. System flags month-over-month spikes >30% in any ESG metric with AI-generated explanation of possible causes
- R13 [P2]. System checks compliance against GRI and CSRD frameworks with gap analysis
- R14 [P1]. System generates cited ESG reports where every metric traces back to evidence, with audit trail
- R15 [P0]. System exports board-ready PDF reports with executive summary, E/S/G metrics, compliance status, and AI recommendations

**Cross-Cutting**

- R16 [P0]. System provides a unified dashboard showing E/S/G performance with drill-down to evidence in two clicks
- R17 [P0]. System maintains a canonical data model: Organization, Department, Employee, Location, ESG Evidence, ESG Score — shared across all pillars
- R18 [P0]. AI Agent has two modes: (a) proactive — auto-generates reports, drafts emails, creates reduction plans, flags anomalies without being asked; (b) reactive — explains any metric in plain English on demand ("Why did emissions increase?" → "Fleet fuel rose 12% in Q3 due to expanded delivery routes")
- R19 [P0]. System generates a 60-second demo narrative: upload → baseline → Act → employee action → leaderboard → report
- R20 [P1]. System meets WCAG 2.1 AA basics: keyboard navigable, visible focus states, alt text on images, sufficient color contrast (4.5:1), form labels, semantic HTML

---

## Acceptance Examples

- AE1. **Covers R1, R2, R3.** Given a user uploads a utility bill PDF, when AI processes it, then the bill appears as a structured carbon transaction with Scope 2 emissions calculated, confidence score shown, and source document linked.
- AE2. **Covers R4.** Given a carbon metric on the dashboard, when the user clicks it, then a provenance panel shows: source file name, extraction timestamp, emission factor used, factor version, and confidence band.
- AE3. **Covers R5, R6.** Given an organization has a baseline of 500 tCO₂e/year, when the user opens the Act tab, then a MACC curve appears ranking 8-12 reduction options by $/tCO₂e (sourced from IEA/IRENA/NREL knowledge base, personalized by AI using the org's data), and selecting measures bends an SBTi trajectory line toward 1.5°C.
- AE4. **Covers R7, R8, R9, R10.** Given an employee selects "Bike Commute" and uploads a photo, when AI validates the action (confidence 94%, estimated 8.2 km), then 25 XP is awarded, a "Green Commuter" badge appears, the department leaderboard updates, and the organization's Scope 3 total decreases by the calculated carbon savings.
- AE5. **Covers R11, R14, R15.** Given the organization has 6 months of ESG data, when the user clicks "Generate Report", then a GRI-compliant report is produced with every metric cited, missing evidence flagged, and a board-ready PDF exported.
- AE6. **Covers R18.** Given emissions increased 15% in Q3, when the CFO asks "Why?", then the AI explains: "Fleet fuel rose 12% due to expanded delivery routes. Recommendation: optimize route planning (estimated $/tCO₂e: $45, payback: 6 months)." Separately, when no one asks, the AI proactively flags the anomaly and drafts a reduction plan email to the fleet manager.

---

## Success Criteria

- A judge watching the 60-second demo understands that EcoSphere unifies E+S+G and can articulate the value proposition back
- Every ESG number on the dashboard can be traced to its source document in ≤2 clicks
- Employee actions visibly and immediately affect the corporate ESG score
- The MACC curve shows financially-ranked reduction options that a CFO would fund
- The generated report is audit-ready with cited evidence
- The demo uses real uploaded data, not pre-populated mock data

---

## Scope Boundaries

### Deferred for later

- Multi-organization support (single org only for hackathon)
- Real-time IoT sensor integration (smart meters, building systems)
- Supplier ESG passport / Scope 3 supplier verification network
- Mobile app (web-only for hackathon)
- SSO / enterprise authentication (demo accounts sufficient)
- Multi-language support
- Water/biodiversity/circular economy modules
- Predictive compliance radar (regulation forecasting)
- Carbon credit marketplace
- API public documentation / developer portal

### Outside this product's identity

- **Standalone carbon accounting tool** — EcoSphere is not a measurement-only tool; it unifies measurement with engagement and governance
- **Employee wellness platform** — The Social module drives ESG outcomes, not general wellness
- **Board governance workflow tool** — Governance is about data trust and reporting, not meeting management
- **ESG data marketplace** — We don't sell or trade ESG data; we help organizations generate and trust their own
- **Climate risk modeling platform** — We measure and act on emissions, not model physical/transitional climate risk

---

## Key Decisions

- **Three pillars: Measure → Engage → Prove**: Environmental measures, Social engages, Governance proves. Each has a distinct role but shares a canonical core.
- **Employee Sustainability Hub over simple gamification**: The Social module includes verified actions, CSR, learning modules, and challenges — not just a leaderboard. This creates a richer demo and stronger enterprise value.
- **AI Governance Copilot over passive compliance**: The Governance module actively validates data, detects anomalies, and generates cited reports — not just checklists.
- **MACC curves included in Environmental**: The action engine (DecarbROI concept) is part of the Environmental module, not a separate module. Cost data sourced from a curated abatement knowledge base (IEA/IRENA/NREL/McKinsey), not Climatiq. AI personalizes estimates using the organization's data.
- **Enterprise Canonical Core Model**: Shared core entities (Org, Department, Employee, Location, Evidence, Score) with domain-specific schemas per pillar. Evidence Registry is the trust backbone connecting all pillars.
- **Live data upload as demo start**: The demo begins with the user uploading sample data, not a pre-populated dashboard. This creates the strongest credibility signal for judges.
- **Flexible AI backend**: Gemini / OpenRouter / Grok — no lock-in to a single provider. The system should work with any capable LLM.
- **Climatiq + fallback**: Primary emission factor source is Climatiq API; hardcoded fallback ensures the demo works offline.

---

## Security Baseline

- API keys stored in environment variables, not in code or database; demo uses `.env.local` with no rotation needed
- HTTPS enforced in production
- No PII in application logs
- Employee data (names, departments) treated as internal, not exposed to external APIs
- ESG data retention: all records kept for hackathon (no deletion policy needed)

---

## Dependencies / Assumptions

- Climatiq API key is available (free tier sufficient for hackathon)
- AI model API access (Gemini/OpenRouter/Grok) is available
- PostgreSQL + pgvector available for data storage and semantic search
- Next.js + FastAPI/Node stack confirmed
- Supabase available for auth and real-time (optional)
- Sample ESG data: prepare a fictional company's full ERP document pack (utility bills, fleet invoices, purchase invoices, employee travel, CSR participation, waste disposal, water consumption) using realistic document layouts with internally consistent data. Include intentional anomalies (e.g. fuel spike) to showcase AI detection. Two folders: healthy company (ESG score ~82) and poor company (ESG score ~41) for live comparison demo.
- Team members can split across frontend (dashboard + leaderboards), backend (AI processing + MACC), and governance (reporting + compliance)

---

## Outstanding Questions

### Resolve Before Planning

- (none — all product decisions resolved)

### Deferred to Planning

- [Affects R1][Technical] What is the exact Climatiq API schema for emission factor lookups? Needs API documentation review during planning.
- [Affects R17][Technical] What is the exact PostgreSQL schema for the canonical core + domain schemas? Needs data model design during planning.
- [Affects R14][Needs research] What are the exact GRI/CSRD framework field mappings for compliance checking?

---

## Next Steps

-> `/ce-plan` for structured implementation planning
