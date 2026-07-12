# EcoSphere — ESG Management Platform

Unified environmental, social, and governance management. Upload documents, track carbon across Scope 1/2/3, engage employees with actions and leaderboards, and generate board-ready compliance reports.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** PostgreSQL via Prisma
- **Icons:** Lucide via @iconify/react
- **Charts:** Recharts
- **Animation:** Framer Motion
- **AI:** Google Gemini API

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your credentials (see below)

# Run database migrations
npx prisma migrate dev

# Seed demo data
npx prisma db seed

# Start dev server
npm run dev
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `GEMINI_API_KEY` | No | Google Gemini API key for AI features (mock fallback if absent) |
| `GEMINI_MODEL` | No | Gemini model name (default: gemini-1.5-flash) |
| `CLIMATIQ_API_KEY` | No | Emission factor lookup API (hardcoded fallback if absent) |

## Project Structure

```
src/
  app/              # Next.js App Router pages + API routes
    dashboard/      # Executive overview
    environment/    # Carbon footprint, uploads, MACC curve
    social/         # Employee actions, leaderboard, badges
    governance/     # GRI/CSRD compliance, evidence chain, reports
    api/            # REST API routes (actions, evidence, reports, upload, macc)
  components/       # Reusable UI components
    layout/         # Sidebar, dashboard layout, ESG switcher
    environment/    # UploadZone, ScopeBreakdown, MACCCurve, ProvenancePanel
    social/         # ActionCatalog, Leaderboard, BadgeDisplay
    shared/         # ESGScoreCard, AIInsight
  lib/              # Business logic
    ai/             # Gemini provider + prompts
    emissions/      # Carbon calculator, Climatiq client, emission factors
    macc/           # Abatement cost curve knowledge base
    evidence/       # SHA-256 hash chain registry
    compliance/     # GRI + CSRD framework checks
    pdf/            # Report generation
  data/demo/        # Demo scenario data (healthy + poor)
prisma/
  schema.prisma     # Database schema
  seed.ts           # Demo data seeder
```

## Pages

| Route | Description |
|---|---|
| `/dashboard` | Executive ESG overview with scores and trends |
| `/environment` | Upload documents, view scope breakdown, MACC curve |
| `/social` | Log sustainability actions, XP/badges, leaderboard |
| `/governance` | GRI/CSRD compliance, evidence chain, generate reports |
| `/reports` | Generate and download compliance reports |
| `/goals` | SBTi-aligned target tracking |
| `/rewards` | Badges and leaderboard |
| `/settings` | Organization configuration |

## API Routes

| Route | Methods | Description |
|---|---|---|
| `/api/upload` | POST | Upload documents for AI extraction |
| `/api/actions` | GET, POST | Employee sustainability actions |
| `/api/evidence` | GET, POST | Evidence registry with hash chain |
| `/api/reports` | GET, POST | Compliance report generation |
| `/api/macc` | GET | Abatement cost curve data |
| `/api/scenarios` | GET | Demo scenario switching |

## Features

- **AI document extraction** — Upload PDFs, CSVs, images; AI extracts structured ESG data
- **Carbon calculation** — Scope 1/2/3 with confidence scores and provenance
- **MACC curve** — Marginal abatement cost curve with interactive measure selection
- **Employee engagement** — 10 action types with evidence validation, XP, badges
- **Evidence Registry** — SHA-256 hash chain for tamper-proof audit trail
- **Compliance reporting** — GRI + CSRD framework checks with board-ready PDF export
- **Demo scenarios** — Two company states (healthy score 82, poor score 41) with one-click switch

## Tests

```bash
# Run all tests
npx vitest run

# Run tests in watch mode
npx vitest
```

96 tests across 6 test files covering actions, evidence, compliance, demo data, MACC curve, and emissions calculations.
