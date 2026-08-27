---
phase: 04-polish-interactions
plan: 01
subsystem: ui
tags: [loading, animation, client-component, first-impression]
dependency_graph:
  requires: []
  provides: [loading-spinner]
  affects: [app/layout.tsx, app/globals.css]
tech_stack:
  added: []
  patterns: [use-client, useState, useEffect, CSS keyframes]
key_files:
  created:
    - components/LoadingSpinner.tsx
  modified:
    - app/globals.css
    - app/layout.tsx
decisions:
  - z-index 9998 keeps overlay below pixel-scanline (9999) but above all content
  - Min 1s display ensures spinner is visible even on fast connections, setting the RPG tone
  - Unmount after fade prevents any lingering DOM or animation cost
  - prefers-reduced-motion disables bounce and dot animations, shows static coin and text
metrics:
  duration: ~2min
  completed: 2026-08-01
  tasks: 2
  commits: 2
status: complete
actuals:
  tokens: 8500
  tasks: 2
  commits: 2
---

# Phase 4 Plan 1: Loading Spinner Summary

RPG-styled loading spinner with bouncing pixel coin and animated "LOADING..." text, displayed on initial page load for a minimum of 1 second before fading out.

## What Was Built

**LoadingSpinner client component** (`components/LoadingSpinner.tsx`):
- Full-screen fixed overlay (z-index 9998, below pixel-scanline's 9999)
- Dark semi-transparent background: `rgba(26, 26, 46, 0.95)` matching `--pixel-bg-dark`
- 32x32px pixel coin with `--pixel-highlight` background, `--pixel-border` border, pixel-depth box-shadow
- Coin bounce animation: translateY 0 to -12px, 0.6s ease-in-out infinite
- "LOADING..." text in `--font-pixel-heading` at 0.625rem with three staggered dot animations (0s, 0.2s, 0.4s delays)
- Show/hide timing: visible immediately, fade-out triggered at 1s, unmounted at 1.3s
- Returns `null` after unmount — no lingering DOM

**CSS additions** (`app/globals.css`):
- `@keyframes pixel-coin-bounce` — vertical bounce for coin
- `@keyframes pixel-loading-dots` — opacity cycle for dots
- `.pixel-loading-overlay` — fixed full-screen flex container
- `.pixel-loading-overlay.fade-out` — opacity 0 with 0.3s transition, pointer-events none
- `.pixel-loading-coin` — 32x32px square with bounce animation
- `.pixel-loading-text` — pixel heading font, primary text color
- `.pixel-loading-dot` — staggered opacity animation via nth-child delays
- `@media (prefers-reduced-motion: reduce)` — disables all animations, shows static content

**Layout integration** (`app/layout.tsx`):
- LoadingSpinner imported and rendered as first child inside `<body>`, before `<div className="pixel-container">`
- Overlay covers full viewport including navigation area
- Client-side navigation preserves layout shell — spinner only shows on initial page load

## Verification

- `npm run build` succeeds with no TypeScript errors
- Component renders full-screen dark overlay with bouncing pixel coin and animated "LOADING..." text
- Spinner displays for minimum 1 second (fade triggered at 1000ms)
- Fade-out over 0.3s (completes at 1300ms), then component unmounts
- Client-side navigation does not re-trigger spinner (layout shell preserved by Next.js App Router)
- `prefers-reduced-motion: reduce` disables bounce and dot animations, shows static coin and text

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None.

## Threat Flags

None.

## Self-Check: PASSED

All files present, both commits verified in git log.
