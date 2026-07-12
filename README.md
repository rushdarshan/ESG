# EcoSphere — Unified E+S+G Enterprise Sustainability Platform

EcoSphere is a full-stack ESG management platform that unifies **Environmental** measurement, **Social** engagement, and **Governance** assurance into one coherent system. It enables organizations to track carbon emissions, manage employee sustainability programs, ensure regulatory compliance, and generate board-ready reports — all powered by AI-assisted data processing.

Built as a hackathon prototype, EcoSphere demonstrates a 60-second narrative: a sustainability manager uploads real data, sees an ESG baseline, explores a Marginal Abatement Cost Curve, watches employees log sustainable actions that update corporate scores, and generates a compliance report.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Demo Data](#demo-data)
- [Contributing](#contributing)
- [Current Status](#current-status)

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Framework | Next.js (App Router) | 16.2.10 | Full-stack React framework with API routes |
| UI | React | 19.2.4 | Component-based UI |
| Language | TypeScript | ^5 | Type safety |
| Database | PostgreSQL | — | Primary data store |
| ORM | Prisma | 5.14.0 | Type-safe database access & migrations |
| AI | Google Gemini | 0.24.1 | Document extraction, validation, insights |
| Styling | Tailwind CSS | v4 | Utility-first CSS |
| Charts | Recharts | 2.15.0 | Data visualization (MACC, scope breakdowns, leaderboards) |
| Animation | Framer Motion | 11.x | Page transitions & micro-interactions |
| PDF | @react-pdf/renderer | 4.5.1 | Server-side PDF report generation |
| Emission Factors | Climatiq API | — | Optional external emission factor lookup |
| Testing | Vitest | 4.1.10 | Unit testing |
| Linting | ESLint | ^9 | Code quality |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20 LTS)
- **npm** 9+
- **PostgreSQL** 14+ running locally or via a cloud provider

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ecosphere

# Install dependencies
npm install
```

### Environment Setup

```bash
# Copy the example env file
cp .env.example .env
```

Edit `.env` with your database connection string and API keys:

```env
# Database (required)
DATABASE_URL="postgresql://user:password@localhost:5432/ecosphere?schema=public"

# AI Provider — Gemini (required for AI features; falls back to mock if missing)
GEMINI_API_KEY="your-gemini-api-key"

# Emission Factors API (optional — hardcoded fallback works without this)
CLIMATIQ_API_KEY="your-climatiq-api-key"
```

### Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# Seed with demo data (GreenForge scenarios)
npm run db:seed
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other Commands

| Command | Description |
|---|---|
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run test suite |
| `npm run db:studio` | Open Prisma Studio (visual DB browser) |
| `npm run db:migrate` | Create a migration from schema changes |

---

## Project Structure

```
ecosphere/
├── prisma/
│   ├── schema.prisma          # Database schema (8 models)
│   └── seed.ts                # Demo data seeder
├── src/
│   ├── app/                   # Next.js App Router pages & API routes
│   │   ├── page.tsx           # Landing page
│   │   ├── layout.tsx         # Root layout with DashboardLayout
│   │   ├── dashboard/         # Executive dashboard
│   │   ├── environment/       # Environmental pillar page
│   │   ├── social/            # Social pillar page
│   │   ├── governance/        # Governance pillar page
│   │   ├── reports/           # Report generation & history
│   │   ├── goals/             # ESG targets tracker
│   │   ├── rewards/           # Badges, leaderboard, rewards
│   │   ├── settings/          # Organization settings
│   │   └── api/               # API route handlers
│   │       ├── actions/       # Employee action logging
│   │       ├── evidence/      # Evidence registry & chain verification
│   │       ├── macc/          # MACC curve generation
│   │       ├── reports/       # PDF report generation
│   │       ├── scenarios/     # MACC scenario listing
│   │       └── upload/        # File upload & AI extraction
│   ├── components/
│   │   ├── layout/            # DashboardLayout, Sidebar, ESGSwitcher
│   │   ├── environment/       # UploadZone, ScopeBreakdown, MACCCurve, ProvenancePanel
│   │   ├── social/            # ActionCatalog, Leaderboard, BadgeDisplay
│   │   └── shared/            # ESGScoreCard, AIInsight
│   ├── data/                # Demo scenario data (GreenForge)
│   │   └── demo/            # Healthy & poor scenario TypeScript files
│   ├── lib/
│   │   ├── db.ts              # Prisma client singleton
│   │   ├── actions.ts         # Action types, XP/level/badge logic
│   │   ├── ai/                # AI provider interface + Gemini implementation
│   │   ├── compliance/        # GRI & CSRD compliance checkers
│   │   ├── emissions/         # Scope calculator, emission factors, Climatiq wrapper
│   │   ├── evidence/          # Hash-chained evidence registry
│   │   ├── macc/              # MACC curve generator + knowledge base
│   │   ├── pdf/               # PDF report renderer
│   │   ├── demo/              # Demo scenario helpers
│   │   └── __tests__/         # Unit tests
│   └── types/
│       └── index.ts           # Shared TypeScript interfaces
├── public/                    # Static assets
├── .env.example               # Environment variable template
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── eslint.config.mjs
```

---

## Architecture

### Data Model

EcoSphere uses 8 Prisma models organized around a canonical core with domain-specific extensions:

```
Organization ──< Department ──< Employee
     │                              │
     ├──< Location                 │
     ├──< ESGScore                  │
     ├──< ESGMetric                 │
     └──< EmployeeAction ──< EvidenceRecord
```

**Core models:** `Organization`, `Department`, `Employee`, `Location`

**Environmental:** `ESGMetric` — individual metric values with scope (1/2/3), emission factors, confidence scores, and source document links

**Social:** `EmployeeAction` — sustainability actions with status, XP awarded, carbon saved, and multi-source evidence

**Governance:** `ESGScore` — time-stamped E/S/G pillar scores with overall rating; `EvidenceRecord` — SHA-256 hash-chained provenance trail

### Key Design Decisions

- **Monorepo with Next.js App Router** — Frontend and API routes in one project. Fastest for hackathon iteration with a 3-person team.
- **AI Provider Interface** — `AIProvider` abstraction with Gemini implementation. Mock fallback ensures the demo works without an API key. New providers (OpenRouter, Grok) can be added by implementing the interface.
- **Evidence Hash Chain** — Each `EvidenceRecord` hashes its content + previous hash, forming a tamper-evident chain. Simple SHA-256 implementation with sorted JSON serialization.
- **MACC Knowledge Base** — 12 predefined abatement measures curated from IEA/IRENA/NREL data, stored as JSON. AI personalizes cost estimates at runtime using organization-specific data.
- **Emission Factor Fallback** — 12 hardcoded factors (EPA eGRID, EPA GHGRP, IPCC, DEFRA, Water Research Foundation) provide offline functionality. Climatiq API is optional for live lookups.
- **Demo Accounts** — Pre-seeded users (Sustainability Manager, Employee, CFO). Login is a dropdown — zero auth complexity for the hackathon.

---

## Features

### Environmental Pillar

- **Document Upload & AI Extraction** — Drag-and-drop upload zone. Gemini extracts emission data from PDFs, CSVs, and images. AI provides confidence scores and extraction logic summaries.
- **Scope 1/2/3 Calculation** — Automatic scope inference from activity category. Emission factors from 12 hardcoded sources or live Climatiq API lookup. Every metric carries provenance metadata.
- **MACC Curve** — Marginal Abatement Cost Curve visualization showing 12 abatement measures ranked by cost-effectiveness. Two pre-built scenarios (GreenForge Healthy vs Poor).
- **Data Provenance** — Visual chain showing how each metric was derived: source document → AI extraction → emission factor → calculated value.

### Social Pillar

- **Employee Action Catalog** — 10 predefined sustainability actions (bike commute, recycling, renewable energy, etc.) with multi-source evidence submission (photo, receipt, certificate, GPS, self-report).
- **AI Validation** — Gemini validates submitted evidence with confidence scoring. Duplicate detection prevents double-counting.
- **XP & Badges** — Gamification system with experience points, progressive leveling, and 10 achievement badges. Points scale with carbon impact.
- **Department Leaderboards** — Rankings by total carbon saved, action count, and average XP per employee.

### Governance Pillar

- **GRI Compliance Checker** — 12 GRI Standards disclosures with automated status determination (compliant, partial, gap) and gap identification.
- **CSRD/ESRS Compliance Checker** — 10 topical standards mapped to disclosure requirements. Percentage-based compliance scoring.
- **Evidence Registry** — SHA-256 hash-chained audit trail. Every upload, action, and report generates an evidence record. Chain integrity verification available via API.

### Cross-Cutting Features

- **Executive Dashboard** — Unified view across all three pillars with score cards, alerts, and quick actions.
- **AI Assistant** — Proactive insights (anomaly detection, trend analysis, recommendation generation) and reactive explanations (metric breakdowns, compliance guidance).
- **PDF Report Generation** — Board-ready reports in Executive, GRI, and CSRD formats. Generated server-side with @react-pdf/renderer.
- **ESG Score Tracking** — Time-stamped overall scores with E/S/G breakdowns. Historical trend visualization.
- **Demo Scenarios** — Two pre-built "GreenForge Industries" scenarios: Healthy (score ~82, strong performance) and Poor (score ~41, anomalies and gaps).

---

## API Endpoints

| Route | Method | Description |
|---|---|---|
| `/api/actions` | GET, POST | Query actions by employee/department (GET); log employee sustainability actions with AI validation, duplicate check, XP/badge award, and evidence chain creation (POST) |
| `/api/evidence` | GET, POST | Query evidence records, verify chain integrity, and add new records |
| `/api/macc` | GET, POST | Generate MACC curves from the knowledge base with org-specific cost data |
| `/api/reports` | GET | Aggregate metrics and compliance status into a report data object |
| `/api/scenarios` | GET | List and retrieve MACC scenarios from the database |
| `/api/upload` | POST | File upload with AI document extraction and emission factor calculation |

---

## Testing

EcoSphere uses Vitest for unit testing. Tests cover core business logic across 6 test files:

```bash
# Run the full test suite
npm run test

# Run tests in watch mode
npx vitest
```

### Test Coverage

| Test File | What It Covers |
|---|---|
| `actions.test.ts` | Action types, XP calculations, leveling thresholds, badge criteria |
| `evidence.test.ts` | SHA-256 hashing, JSON serialization, chain integrity verification |
| `compliance.test.ts` | GRI/CSRD status determination, gap identification |
| `demo.test.ts` | Demo data structure validation |
| `calculator.test.ts` | Scope inference rules, emission calculations |
| `curve.test.ts` | MACC curve generation, sorting by cost, breakpoint identification |

---

## Demo Data

EcoSphere ships with two pre-built scenarios for "GreenForge Industries":

### GreenForge Healthy (Score ~82)

- 8 employees across 5 departments
- Strong environmental metrics with low Scope 1 emissions
- High employee engagement with 12+ logged actions
- Near-complete GRI and CSRD compliance
- Clear abatement opportunities on the MACC curve

### GreenForge Poor (Score ~41)

- Same organizational structure
- Anomalous emission spikes (>30% month-over-month)
- Governance compliance gaps
- Lower employee participation
- Costly abatement measures dominating the curve

Both scenarios are seeded via `npm run db:seed` and can be toggled in the UI via the demo selector in the top bar.

---

## Contributing

### Branch Naming

- `feat/<description>` — New features
- `fix/<description>` — Bug fixes
- `docs/<description>` — Documentation changes
- `refactor/<description>` — Code refactoring

### Code Style

- **TypeScript strict mode** — All code is typed
- **Tailwind CSS** — Utility-first styling, no CSS modules
- **Framer Motion** — Consistent animation patterns (`layoutId`, `AnimatePresence`)
- **Conventional commits** — `feat(scope):`, `fix(scope):`, `docs:`, `chore:`

### Pull Requests

1. Create a feature branch from `master`
2. Make your changes with tests
3. Run `npm run test` and `npm run lint` before submitting
4. Open a PR with a clear description of the change

---

## Current Status

### What's Working

- Full database schema with 8 models and Prisma migrations
- Complete UI shell with all 9 pages and 12 components
- Smooth Framer Motion page transitions and micro-interactions
- 6 API routes with Prisma integration
- AI integration (Gemini with mock fallback)
- Evidence chain with SHA-256 hashing
- MACC curve with 12 abatement measures
- GRI + CSRD compliance checkers
- PDF report generation
- Emission calculator with 12 hardcoded factors + Climatiq fallback
- 6 test files covering core logic

### Known Limitations

- **Static data** — Dashboard, social, governance, goals, rewards, and settings pages use hardcoded data rather than pulling from the database
- **No authentication** — Demo accounts are pre-seeded; no login/auth system
- **No real-time features** — All data is fetched on page load
- **Single organization** — Multi-tenant support is out of scope
- **Web only** — No mobile app or responsive breakpoints below 768px

### Out of Scope (Future Work)

- Multi-organization support
- Real-time IoT sensor integration
- Supplier ESG passport / Scope 3 verification
- SSO / enterprise authentication
- Multi-language support
- Carbon credit marketplace
- Public API documentation

---

## License

MIT
