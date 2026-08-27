---
phase: 03
plan: 01
subsystem: content-sections
tags: [experience, timeline, component, css]
dependency_graph:
  requires: []
  provides: [experience-section, experience-timeline-component]
  affects: [app/page.tsx]
tech_stack:
  added: []
  patterns: [server-component, static-data, pixel-design-system]
key_files:
  created:
    - components/ExperienceTimeline.tsx
  modified:
    - app/globals.css (timeline CSS already present via parallel plan 03-02)
decisions:
  - Embedded experience data directly in component (5 static entries, no external data file needed)
  - Tech logo mapping via Record<string, string> for clean lookup
  - Text-only badges for techs without logo assets
  - Desktop connector line with pixel dots at each entry
metrics:
  duration: 220s
  completed: 2026-08-01T08:45:00Z
  tasks: 2
  files: 2
status: complete
actuals:
  tokens: 8000
  tasks: 2
  commits: 1
---

# Phase 3 Plan 01: Experience Timeline Summary

ExperienceTimeline server component rendering 5 career entries in pixel-art RPG quest-log style with tech badges and responsive timeline connector.

## What Was Built

### Task 1: ExperienceTimeline Component (tracer)

**Commit:** `5c3df1a` — `feat(03-01): add ExperienceTimeline component with 5 career entries`

**Files:** `components/ExperienceTimeline.tsx`

- Server component with all 5 roles: CIMB NIAGA, Vokraf (Lead), Vokraf (Backend), BINUS GROUP, Bali Cipta Innovator
- Each entry renders: company name, role, duration, location, bullet points, tech stack
- Tech badge system with logo lookup map — uses `next/image` for: Java, Kotlin, .NET, Oracle DB, PostgreSQL, React JS
- Text-only badges for techs without logos (Go, Redis, NestJS, Docker, etc.)
- Section uses `id="experience"` for navigation anchor linking
- Uses existing design system classes: `pixel-panel`, `pixel-heading`, `pixel-body-text`, `pixel-border`

### Task 2: Timeline CSS Classes

**Status:** Already present — timeline CSS was committed by parallel plan 03-02 (`ade0d06`)

**Files:** `app/globals.css` (lines 331-464)

All required classes confirmed present:
- `.pixel-experience` — section wrapper
- `.pixel-timeline-entry` — panel cards with relative positioning
- `.pixel-timeline-header` — flex layout for company + duration
- `.pixel-timeline-company` — highlighted company name
- `.pixel-timeline-duration` — secondary-colored date range
- `.pixel-timeline-role` — bold role title
- `.pixel-timeline-location` — secondary location text
- `.pixel-timeline-bullets` — pixel-square bullet points via `::before`
- `.pixel-tech-badges` / `.pixel-tech-badge` — flex-wrap badge container
- Desktop connector line at 768px+ with pixel dots at each entry
- Mobile: full-width entries, no connector

## Verification

- `npm run build` — passes (compiled successfully, all pages static)
- All 5 entries render with complete data
- Section has `id="experience"` matching nav link `href="/#experience"`
- Tech logos display for java, kotlin, net, oracle, postgre, reactjs
- Text-only badges for remaining techs

## Deviations from Plan

None — plan executed as written. Timeline CSS was already committed by a parallel plan (03-02), so Task 2 required no additional commit.

## Self-Check: PASSED

- `components/ExperienceTimeline.tsx` — FOUND
- `app/globals.css` — FOUND (timeline CSS at lines 331-464)
- `.planning/phases/03-content-sections/03-01-SUMMARY.md` — FOUND
- Commit `5c3df1a` — FOUND in git log
