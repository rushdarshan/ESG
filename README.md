# EcoSphere — Unified ESG Management Platform

**Measure. Engage. Prove.**  
EcoSphere is a full-stack ESG platform that unifies Environmental carbon tracking, Social employee engagement, and Governance compliance into one coherent system. Upload documents, let AI extract structured data, watch Scope 1/2/3 emissions calculate in real time, empower employees to log sustainable actions, and generate board-ready GRI/CSRD compliance reports — all backed by a tamper-proof SHA-256 evidence chain.

---

## Why EcoSphere?

Enterprise sustainability teams juggle 4-5 disconnected tools: carbon accounting (measures but doesn't act), CSR platforms (engage but don't measure), governance tools (check but don't integrate). EcoSphere replaces them with a single canonical data model, an AI agent that operates across pillars, and an Evidence Registry that makes every metric auditable.

---

## Key Features

| Capability | Description |
|---|---|
| **AI Document Extraction** | Upload PDFs, CSVs, or images. AI extracts vendor, amount, date, category, and quantity. |
| **Carbon Calculation** | Scope 1/2/3 emissions with confidence scores and full provenance chain. |
| **MACC Curve** | Interactive marginal abatement cost curve — 12 measures ranked by $/tCO₂e, click to build a reduction plan. |
| **Employee Engagement** | 10 action types with evidence validation, XP rewards, badge system, department leaderboards. |
| **Evidence Registry** | Tamper-proof SHA-256 hash chain. Every metric links back to its source document. |
| **Compliance Reporting** | GRI + CSRD framework checks with board-ready PDF export. Every metric cited to its evidence. |
| **SBTi Tracking** | Goal progress against Science Based Targets initiative pathways. |
| **Demo Scenarios** | One-click switch between healthy (score 82) and poor (score 41) company states for live comparison. |

---

## Tech Stack

```
Framework     Next.js 16 (App Router)
Language      TypeScript
Styling       Tailwind CSS v4
Database      PostgreSQL + Prisma
Charts        Recharts
Icons         Lucide via @iconify/react
Animation     Framer Motion
AI            Google Gemini API
Emission API  Climatiq (with hardcoded fallback)
```

---

## Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            Marketing landing page
│   ├── layout.tsx          Root layout
│   ├── dashboard/          Executive ESG overview
│   ├── environment/        Carbon footprint, uploads, MACC curve
│   ├── social/             Employee actions, leaderboard, badges
│   ├── governance/         GRI/CSRD compliance, evidence chain, reports
│   ├── goals/              SBTi-aligned target tracking
│   ├── rewards/            Badges and leaderboard
│   ├── reports/            Report generation and download
│   ├── settings/           Organization configuration
│   └── api/                REST API routes
│       ├── upload/         POST — Document upload + AI extraction
│       ├── actions/        GET/POST — Employee sustainability actions
│       ├── evidence/       GET/POST — Evidence registry with hash chain
│       ├── reports/        GET/POST — Compliance report generation
│       ├── macc/           GET — Abatement cost curve data
│       └── scenarios/      GET — Demo scenario switching
├── components/
│   ├── layout/             Sidebar, DashboardLayout, ESGSwitcher
│   ├── environment/        UploadZone, ScopeBreakdown, MACCCurve, ProvenancePanel
│   ├── social/             ActionCatalog, Leaderboard, BadgeDisplay
│   └── shared/             ESGScoreCard, AIInsight
├── lib/
│   ├── ai/                 Gemini provider interface + prompt templates
│   ├── emissions/          Carbon calculator, Climatiq client, factor tables
│   ├── macc/               Knowledge base of 12 abatement measures
│   ├── evidence/           SHA-256 hash chain registry
│   ├── compliance/         GRI + CSRD framework mappings
│   └── pdf/                Board-ready PDF report generation
├── data/demo/              Two company scenarios (healthy, poor)
└── types/                  Shared TypeScript types
prisma/
├── schema.prisma           Canonical data model (150 lines)
└── seed.ts                 Demo data seeder
```

---

## Quick Start

```bash
git clone https://github.com/rushdarshan/ESG.git
cd ESG
npm install
cp .env.example .env
# Edit .env with your credentials
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and log in as a Sustainability Manager.

---

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `DATABASE_URL` | Yes | — | PostgreSQL connection string |
| `GEMINI_API_KEY` | No | — | Google Gemini API key (mock fallback if absent) |
| `GEMINI_MODEL` | No | `gemini-3.5-flash` | Gemini model name |
| `CLIMATIQ_API_KEY` | No | — | Emission factor API (hardcoded fallback if absent) |

---

## Tests

**96 tests** across 6 test suites — all passing.

```
Test Files   6 passed
Tests       96 passed
Duration    706ms
```

| Suite | Tests | Coverage |
|---|---|---|
| Actions | 22 | XP calculation, badge logic, action validation |
| Evidence | 9 | SHA-256 hash chain, tamper detection, chain verification |
| Compliance | 14 | GRI framework, CSRD framework, gap detection |
| Demo Data | 16 | Scenario loading, data consistency |
| MACC Curve | 27 | Curve generation, cost ranking, reduction calculation |
| Emissions Calculator | 8 | Scope assignment, factor lookup, confidence scoring |

```bash
npx vitest run        # Run all tests
npx vitest            # Watch mode
```

---

## Demo Flow (60 Seconds)

1. **Dashboard** — See the overall ESG score (82/100) with pillar breakdowns
2. **Environment** — Upload a utility bill; watch AI extract data and calculate Scope 2 emissions
3. **MACC Curve** — Click measures to build an abatement plan; see the SBTi trajectory bend
4. **Social** — Log a bike commute action; earn XP, watch the leaderboard update
5. **Governance** — Check GRI compliance status; generate a board-ready PDF report
6. **Dashboard** — The ESG score updates reflecting the new data

Switch to the "Poor" scenario to see the score drop to 41 with anomalies flagged.

---

## License

MIT
