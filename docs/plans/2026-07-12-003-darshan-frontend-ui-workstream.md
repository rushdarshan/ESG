---
title: "Darshan — Frontend/UI Workstream"
type: feat
status: active
date: 2026-07-12
origin: docs/plans/2026-07-12-001-feat-ecosphere-esg-platform-plan.md
assignee: Darshan
---

# Darshan — Frontend/UI Workstream

## Overview

Build all four dashboard UIs: application shell, Environmental module, Social module, and Governance module. You work on top of Anurag's backend — pull after his U1 push.

**You own:** U8, U9, U10, U11
**Depends on:** Anurag U1 (scaffold), U3 (upload API), U4 (MACC API), U5 (actions API)
**Blocks:** U12 (demo flow needs all UIs)

---

## Dependency Chain

```
U8 (Layout) → U9 (Environmental) → U10 (Social) → U11 (Governance)
```

**Start after Anurag pushes U1.** Pull his branch, then begin U8.

---

## Unit Details

### U8. Layout + Navigation + Executive Dashboard

**Goal:** Build the application shell with sidebar navigation, ESG switcher, and executive dashboard.

**Requirements:** R16, R20

**Dependencies:** U1 (Anurag's scaffold)

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
- Sidebar: Dashboard, ESG (Environment/Social/Governance), Reports, Goals, Rewards, Settings
- ESG Switcher: top tabs — Environment | Social | Governance
- Executive Dashboard: overall ESG score (0-100), pillar cards, recent alerts, AI recommendations
- WCAG AA: semantic HTML, ARIA labels, keyboard nav, focus states, 4.5:1 contrast
- Demo user selector: dropdown to switch between Manager/Employee/CFO views
- Responsive: 1200px+ desktop, 768px+ tablet

**Design tokens (use consistently):**
- Primary: `#059669` (emerald-600)
- Background: `#f8fafc` (slate-50)
- Cards: white with `border-gray-200`, `rounded-xl`, `shadow-sm`
- Text: `text-gray-900` headings, `text-gray-600` body

**Commit:** `feat(U8): layout shell + navigation + executive dashboard`

---

### U9. Environmental Dashboard

**Goal:** Build the Environmental module UI: upload zone, scope breakdown, MACC curve, provenance panel.

**Requirements:** R1, R3, R5, R6, R4

**Dependencies:** U3 (Anurag's upload API), U4 (Anurag's MACC API), U8

**Files:**
- Create: `src/components/environment/UploadZone.tsx`
- Create: `src/components/environment/ScopeBreakdown.tsx`
- Create: `src/components/environment/MACCCurve.tsx`
- Create: `src/components/environment/ProvenancePanel.tsx`
- Create: `src/app/environment/page.tsx`

**Approach:**
- Upload Zone: drag-and-drop + file picker, PDF/CSV/images, progress + extraction results
- Scope Breakdown: Recharts donut/bar showing Scope 1/2/3 with confidence scores
- MACC Curve: horizontal bar chart, clickable to add to reduction plan
- SBTi Trajectory: line chart, current path vs 1.5°C target, bends on measure selection
- Provenance Panel: slide-out with source file, extraction details, emission factor, confidence
- AI Insight cards: contextual explanations

**Charts (use Recharts consistently):**
- `PieChart` for scope breakdown
- `BarChart` (horizontal) for MACC curve
- `LineChart` for SBTi trajectory

**Commit:** `feat(U9): environmental dashboard + upload + MACC visualization`

---

### U10. Social Dashboard

**Goal:** Build the Social module UI: action catalog, evidence submission, XP/badges, leaderboard.

**Requirements:** R7, R8, R9

**Dependencies:** U5 (Anurag's/Dhanajayan's action API), U8

**Files:**
- Create: `src/app/social/page.tsx`

**Approach:**
- Action Catalog: card grid of 10 actions with icons, carbon impact, XP reward
- Evidence Submission: modal with action-specific options (photo, receipt, GPS, self-report)
- AI Validation: real-time confidence score + carbon savings display
- XP Display: progress bar, level indicator, recent history
- Badge Display: badge wall, earned/locked, milestone progress
- Leaderboard: department rankings by carbon saved (Recharts `BarChart`)
- Impact Summary: "If 500 employees did this twice a week..."

**Badge icons (use emoji for hackathon):**
- 🚲 Green Commuter, 🌳 Tree Hugger, ♻️ Recycling Pro, 💡 Energy Saver, 🤝 CSR Champion

**Commit:** `feat(U10): social dashboard + actions + leaderboard`

---

### U11. Governance Dashboard

**Goal:** Build the Governance module UI: compliance status, report generation, evidence chain.

**Requirements:** R12, R13, R14, R15

**Dependencies:** U6 (Dhanajayan's evidence registry), U7 (Dhanajayan's reports), U8

**Files:**
- Create: `src/app/governance/page.tsx`

**Approach:**
- Compliance Status: GRI/CSRD cards with compliance %, gaps, recommendations
- Spike Alerts: notification cards for MoM anomalies with AI explanation
- Report Preview: rendered preview with all metrics cited
- PDF Export: one-click download
- Evidence Chain: visual hash-linked chain
- AI Insights: tooltip cards explaining metrics (use U2's explainMetric via API)

**Commit:** `feat(U11): governance dashboard + compliance + reports`

---

## Push Schedule

| When | What | Command |
|------|------|---------|
| After U8 | Layout + dashboard | `git push` |
| After U9 | Environmental UI | `git push` |
| After U10 | Social UI | `git push` |
| After U11 | Governance UI | `git push` |

---

## Design System

| Element | Style |
|---------|-------|
| Cards | `bg-white rounded-xl shadow-sm border border-gray-200 p-6` |
| Headings | `text-2xl font-bold text-gray-900` |
| Body | `text-sm text-gray-600` |
| Primary button | `bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700` |
| Secondary button | `bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200` |
| Badges | `bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-xs` |
| Score ring | Recharts `PieChart` with emerald/slate/orange segments |

## Key Decisions (from master plan)

- Tailwind CSS for all styling
- Recharts for all charts (MACC, scope, SBTi, leaderboard)
- WCAG 2.1 AA basics
- Left sidebar + top ESG switcher navigation
- Executive Dashboard as landing page
- Demo user selector dropdown
- AI insights as tooltip cards (not chat)
