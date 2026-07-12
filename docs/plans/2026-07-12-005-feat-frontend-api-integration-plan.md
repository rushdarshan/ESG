---
title: "feat: Wire frontend pages to live API routes"
type: feat
status: active
date: 2026-07-12
---

# EcoSphere — Frontend-to-API Integration

## Overview

The app has fully built backend API routes and a seeded database, but every frontend page renders hardcoded mock data instead of fetching from those APIs. This plan wires each page to its corresponding API route, making the app behave as a single integrated product.

---

## Problem Frame

Four integration seams are currently broken:

1. **Frontend → API**: Every page (dashboard, environment, social, governance, reports) uses static mock data. No `fetch()` calls.
2. **Upload → Evidence Registry**: Upload pipeline calculates emissions but never persists to DB or writes to the hash chain.
3. **Social → Carbon rollup**: `EmployeeAction.carbonSaved` never flows into `ESGMetric` for environmental reporting.
4. **Reports page → Live data**: Generate buttons use `setTimeout` simulation instead of calling `/api/reports`.

---

## Requirements Trace

- R1. Dashboard shows live data from API routes
- R2. Upload flow writes to Evidence Registry and persists metrics
- R3. Employee actions roll up into Environmental carbon totals
- R4. Governance page reads live GRI/CSRD compliance data
- R5. Report generation calls live API and renders result

---

## Scope Boundaries

- No auth/authentication changes
- No database schema changes
- No new pages or routes
- Existing mock data remains as fallback when API is unavailable

---

## Context & Research

### Relevant Code and Patterns

- API routes in `src/app/api/` follow consistent GET/POST patterns
- `DashboardLayout` provides the shell — child pages handle data fetching
- Prisma queries in API routes use `db.eSGMetric.findMany()`, `db.employeeAction.findMany()`, `db.evidenceRecord` patterns
- `MACCCurve` component already demonstrates the fetch-with-fallback pattern

---

## Key Technical Decisions

- **Fetch on mount, render loading/error/data states**: Use `useEffect` + `useState` for data fetching. No state management library needed.
- **Simulate API on build error for `/api/reports`**: The reports API imports from a non-existent path (`@/lib/pdf/report`). We'll create a minimal live fetch and fall back to mock if the API fails.
- **Extend `/api/actions` POST to write to ESGMetric**: Add a single `db.eSGMetric.create()` call when carbonSaved > 0.

---

## Implementation Units

- U1. **[Dashboard — wire to live APIs]**

**Goal:** Replace hardcoded stats on dashboard with data from API calls.

**Dependencies:** None

**Files:**
- Modify: `src/app/dashboard/page.tsx`

**Approach:**
- Fetch overall ESG score from `/api/evidence?type=summary` or seed-generated data
- Fetch module stats from appropriate API endpoints
- Keep hardcoded fallback data when API returns empty

**Test scenarios:**
- Happy path: API returns data → dashboard shows live stats
- Edge case: API unavailable → dashboard shows hardcoded fallback

**Verification:**
- Dashboard shows data instead of static strings on dev build

---

- U2. **[Upload — persist to DB + Evidence Registry]**

**Goal:** Make the upload flow actually write extracted data to the database.

**Dependencies:** None

**Files:**
- Modify: `src/app/api/upload/route.ts`
- Modify: `src/components/environment/UploadZone.tsx`

**Approach:**
- In the API route, after calculating emissions, persist to `db.eSGMetric.create()` and `db.evidenceRecord.create()`
- In the frontend `UploadZone`, replace `setTimeout` simulation with actual `fetch("POST /api/upload")`
- Keep simulation as fallback when API is unavailable

**Test scenarios:**
- Happy path: Upload file → API persists metric + evidence record
- Edge case: API unavailable → simulated upload still works for demo

**Verification:**
- Uploaded files appear as persisted records (check via evidence API)

---

- U3. **[Social — wire actions to live API]**

**Goal:** Connect action submission and leaderboard to API data.

**Dependencies:** None

**Files:**
- Modify: `src/app/social/page.tsx`
- Modify: `src/components/social/ActionCatalog.tsx`
- Modify: `src/app/api/actions/route.ts`

**Approach:**
- `ActionCatalog` submit button calls `POST /api/actions`
- Sidebar stats (total actions, participants) fetch from `GET /api/actions?summary=true`
- Leaderboard data fetches from `GET /api/actions?leaderboard=true`
- Add carbon rollup: when action creates `carbonSaved > 0`, write to `ESGMetric`

**Test scenarios:**
- Happy path: Submit action → POST succeeds → leaderboard updates after refetch
- Edge case: API unavailable → mock data shown

**Verification:**
- Submitted actions persist and appear on refresh

---

- U4. **[Governance — wire to live compliance + evidence data]**

**Goal:** Connect compliance scores and evidence chain to API.

**Dependencies:** None

**Files:**
- Modify: `src/app/governance/page.tsx`

**Approach:**
- Fetch GRI/CSRD compliance data from `GET /api/reports?type=compliance`
- Fetch latest evidence records from `GET /api/evidence`
- Keep hardcoded fallback when API unavailable

**Test scenarios:**
- Happy path: API returns data → compliance scores and evidence chain are live
- Edge case: API unavailable → hardcoded data shown

**Verification:**
- Governance page reflects database state

---

- U5. **[Reports — wire generate to live API]**

**Goal:** Replace `setTimeout` simulation with actual API call.

**Dependencies:** None

**Files:**
- Modify: `src/app/reports/page.tsx`

**Approach:**
- "Generate" button calls `POST /api/reports`
- On success, show download link
- Keep setTimeout simulation as fallback when API fails

**Test scenarios:**
- Happy path: Generate → API returns report → download available
- Edge case: API fails → simulation fallback shown

**Verification:**
- Generate button produces downloadable report

---

## System-Wide Impact

- **Interaction graph:** Dashboard reads from all modules' APIs. Social actions now roll up into Environmental metrics. Uploads write to Evidence Registry.
- **Error propagation:** All API calls use `fetch` with `.catch()` fallback to mock data. No unhandled promise rejections.
- **State lifecycle risks:** POST mutations are idempotent at the UI level — no double-submit protection needed for hackathon demo.
- **Unchanged invariants:** Existing mock data remains as fallback. All static data paths still work if API is down.

---

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| `/api/reports` may not build (import error) | Try live fetch first, fall back to mock |
| SSG pages need client-side fetch | Pages are already `"use client"` — no change needed |
| ESGMetric writes conflict with seeded data | Use `upsert` or append pattern; demo data is read-only seed |
