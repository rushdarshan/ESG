# EcoSphere QA Automation Report

Target: http://localhost:3001/

Date: 2026-07-12

## Coverage

- Routes tested: `/`, `/dashboard`, `/environment`, `/social`, `/governance`, `/reports`, `/goals`, `/rewards`, `/settings`
- Per route: desktop screenshot, mobile screenshot, full-page scroll, browser refresh, console capture, page error capture, network capture, basic accessibility probe, broken image probe
- Interactions tested: sidebar/top navigation, ESG switcher buttons, Environment upload/drop zone, Social action selection/submission, Governance accordions/generate/download, Reports generation/recent download buttons, Settings dropdown/toggles/save/reset, keyboard Tab/Enter/Escape, browser back/forward

## Findings

### Critical

None confirmed.

### High

1. API failures on dashboard/governance data loads
   - Evidence: `logs/final-network.txt`, repeated `GET /api/actions 400` and `GET /api/reports?type=compliance 400`
   - Source: `src/app/dashboard/page.tsx:113`, `src/app/dashboard/page.tsx:128`, `src/app/governance/page.tsx:80`
   - Cause: UI calls APIs without required `employeeId`, `departmentId`, or `organizationId`.
   - Fix: Either pass the selected demo organization/employee IDs or add explicit demo-safe summary endpoints.

2. Governance “Generate Report” can produce a 500
   - Evidence: `logs/final-network.txt`, `POST /api/reports 500`
   - Screenshot: `screenshots/governance-generate-report.png`
   - Source: `src/app/governance/page.tsx:150`, `src/app/api/reports/route.ts:175`
   - Cause: Governance posts with no body while the API unconditionally calls `request.json()`.
   - Fix: Send `{ type: "executive" }` with `Content-Type: application/json`, or make the API tolerate an empty body.

3. React hydration mismatches on multiple routes
   - Evidence: `logs/final-console.txt`, `logs/home-console.txt`, `logs/dashboard-console.txt`
   - Cause shown in console: Framer Motion initial server/client style mismatches.
   - Fix: gate motion-only initial styles to the client, use `initial={false}` where appropriate, or render animation wrappers only after mount.

### Medium

4. Mobile layout overflows horizontally
   - Evidence: mobile probes report 390px viewport with 667px document width, e.g. `logs/dashboard-probe-mobile.json`
   - Screenshot: `screenshots/dashboard-mobile-full.png`
   - Source: `src/components/layout/Sidebar.tsx:35`, `src/components/layout/DashboardLayout.tsx:13`
   - Cause: fixed 72px sidebar remains on small screens, but main content only gets left padding at `lg`.
   - Fix: add small-screen offset, collapse to bottom nav, or hide sidebar behind a drawer at mobile widths.

5. Environment “Browse Files” button is inert
   - Screenshot: `screenshots/issue-environment-browse-files-no-effect.png`
   - Source: `src/components/environment/UploadZone.tsx:155`
   - Fix: add a hidden `<input type="file" multiple accept=".pdf,.csv,image/*">` and wire the button to `.click()`.

6. Social “Submit Action” is inert / no evidence workflow
   - Screenshot: `screenshots/issue-social-submit-action-no-effect.png`
   - Source: `src/app/social/page.tsx`
   - Fix: wire submit to `/api/actions` with employee ID and evidence fields, or reuse `ActionCatalog`.

7. Governance latest-report “Download PDF” is inert
   - Screenshot: `screenshots/issue-governance-download-pdf-no-effect.png`
   - Source: `src/app/governance/page.tsx:505`
   - Fix: call the report API and download the returned blob.

8. Reports “Recent Reports” download icon buttons are inert and unlabeled
   - Evidence: `logs/reports-recent-download-result.json`
   - Screenshot: `screenshots/issue-reports-recent-download-no-effect.png`
   - Source: `src/app/reports/page.tsx:174`
   - Fix: add `onClick`, `aria-label`, and a real download flow per report ID.

9. Settings “Reset Demo Data” is inert
   - Evidence: `logs/settings-interactions-result.json`
   - Source: `src/app/settings/page.tsx:217`
   - Fix: either remove the control until supported, or add confirmation + reset endpoint.

### Low

10. Icon-only buttons and collapsed sidebar links are not accessible by name
    - Evidence: `logs/dashboard-probe-desktop.json`, `logs/dashboard-probe-mobile.json`
    - Source: `src/components/layout/DashboardLayout.tsx:22`, `src/components/layout/DashboardLayout.tsx:27`, `src/app/reports/page.tsx:174`
    - Fix: add `aria-label`/`title` to search, notifications, close/dismiss, and icon download buttons; ensure collapsed sidebar links retain accessible names.

11. Custom Settings toggles lack switch semantics
    - Source: `src/app/settings/page.tsx:47`
    - Fix: add `role="switch"`, `aria-checked`, and an accessible label, or use a labeled checkbox styled as a switch.

## Console errors

See:

- `logs/final-console.txt`
- `logs/home-console.txt`
- `logs/dashboard-console.txt`
- `logs/governance-console.txt`

Primary console failure: React hydration mismatch.

## Network failures

See `logs/final-network.txt`.

Confirmed failures:

- `GET /api/actions` → 400
- `GET /api/reports?type=compliance` → 400
- `POST /api/reports` → 500 from Governance report generation path

## Screenshots

All screenshots are in `qa-artifacts/screenshots`.
