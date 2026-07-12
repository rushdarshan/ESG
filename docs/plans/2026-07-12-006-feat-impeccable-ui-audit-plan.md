---
title: "feat: Impeccable UI audit and design refinement"
type: feat
status: active
date: 2026-07-12
---

# EcoSphere — Impeccable UI Audit and Design Refinement

## Overview

Apply the impeccable design system to audit and improve the frontend across four dimensions: polish, color, typography, and layout. First create PRODUCT.md context, then run the impeccable commands against the key pages.

---

## Requirements Trace

- R1. PRODUCT.md created with brand identity, user personas, and tone
- R2. Frontend pages audited for visual consistency
- R3. Color applied strategically (not monochrome, not garish)
- R4. Typography hierarchy improved (scale, weight, spacing)
- R5. Layout rhythm fixed (spacing, alignment, composition)

---

## Implementation Units

- U1. **[teach] Create PRODUCT.md context**

**Goal:** Set up the impeccable design system context so subsequent commands work from a defined brand identity.

**Files:**
- Create: `PRODUCT.md`

**Approach:**
- Run `node .agents/skills/impeccable/scripts/teach.mjs` or write PRODUCT.md directly with: product purpose (ESG management platform), users (sustainability manager, employees, CFO), brand tone (professional, trustworthy, modern), anti-references (avoid SaaS-clone look), register (product UI)

**Verification:**
- PRODUCT.md exists and is >200 characters with no [TODO] markers

---

- U2. **[polish] Dashboard + Settings + Reports**

**Goal:** Final quality pass on three key pages: spacing, alignment, micro-detail consistency.

**Files:**
- Modify: `src/app/dashboard/page.tsx`
- Modify: `src/app/settings/page.tsx`
- Modify: `src/app/reports/page.tsx`

**Approach:**
- Check card spacing consistency (gaps, padding, border radii)
- Verify alignment of stat values, labels, icons
- Remove side-stripe borders if present
- Ensure no nested cards
- Verify hover/active states on interactive elements

**Verification:**
- Visual consistency across all three pages

---

- U3. **[colorize] Environment + Social + Governance**

**Goal:** Add strategic color to differentiate the three ESG pillars consistently.

**Files:**
- Modify: `src/app/environment/page.tsx`
- Modify: `src/app/social/page.tsx`
- Modify: `src/app/governance/page.tsx`

**Approach:**
- Environment: emerald/green tones
- Social: blue tones
- Governance: violet/purple tones
- Use OKLCH color space, tinted neutrals toward brand hue
- No gradient text, no glassmorphism default

**Verification:**
- Each pillar page has distinct but harmonious color identity

---

- U4. **[typeset] Global typography refinement**

**Goal:** Improve typography hierarchy across all pages.

**Files:**
- Modify: `src/app/globals.css`

**Approach:**
- Cap body line length (max-width on content containers)
- Ensure ≥1.25 ratio between heading scale steps
- Consistent font sizes for stat values, labels, body text
- No em dashes in UI copy

**Verification:**
- Text hierarchy is clear and consistent

---

- U5. **[layout] Fix spacing rhythm**

**Goal:** Vary spacing for rhythm, fix alignment issues.

**Files:**
- Modify: `src/app/dashboard/page.tsx`
- Modify: `src/app/environment/page.tsx`
- Modify: `src/app/social/page.tsx`
- Modify: `src/app/governance/page.tsx`

**Approach:**
- Vary spacing between sections (not same padding everywhere)
- Ensure consistent gutter widths
- Fix any alignment issues with stat cards or grid items

**Verification:**
- Pages have intentional, varied spacing rhythm

---

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| PRODUCT.md setup may fail if impeccable scripts aren't in expected path | Write PRODUCT.md manually |
| CSS changes may conflict with Tailwind classes | Use Tailwind utilities, avoid custom CSS |
