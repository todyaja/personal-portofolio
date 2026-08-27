---
phase: 04-polish-interactions
plan: 04
subsystem: navigation
tags: [scroll-spy, smooth-scroll, accessibility, intersection-observer]
dependency_graph:
  requires: [04-03]
  provides: [smooth-scroll, scroll-spy, keyboard-nav]
  affects: [globals.css, Navigation.tsx]
tech_stack:
  added: []
  patterns: [IntersectionObserver, CSS scroll-behavior, aria-current, focus-visible]
key_files:
  created: []
  modified:
    - app/globals.css
    - components/Navigation.tsx
decisions:
  - Used IntersectionObserver over scroll event for performance (no main-thread thrashing)
  - rootMargin "-80px 0px -60% 0px" activates section when its top is near viewport top
  - Changed /#about href to /#hero to match actual section ID (no about section exists)
  - Escape key on mobile menu returns focus to hamburger button via ref
metrics:
  duration: ~3min
  completed: 2026-08-01
  tasks: 3
  files: 2
status: complete
actuals:
  tokens: 8000
  tasks: 3
  commits: 1
---

# Phase 04 Plan 04: Smooth Scrolling & Scroll Spy Summary

Smooth scrolling with 80px nav offset, IntersectionObserver-based scroll spy for active nav highlighting, and keyboard/ARIA accessibility improvements.

## What Was Built

### Task 1: CSS smooth scrolling (globals.css)
- Added `scroll-behavior: smooth` to existing `html` rule
- Added `section[id] { scroll-margin-top: 80px }` for nav-bar clearance
- Added `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto } }`
- Added `.pixel-nav-link:focus-visible { outline: 2px solid var(--pixel-highlight); outline-offset: 2px }`

### Task 2: Scroll spy (Navigation.tsx)
- Added `activeSection` state (defaults to `"/"`)
- Added `useEffect` with `IntersectionObserver` tracking sections: hero, experience, skills, education, contact
- Observer options: `rootMargin: "-80px 0px -60% 0px"`, `threshold: 0`
- Maps observed section IDs back to nav hrefs via `HREF_TO_SECTION` lookup
- Replaced `isActive` to compare against `activeSection` instead of `pathname`
- Fixed `/#about` → `/#hero` in NAV_LINKS (no about section exists)
- Both desktop and mobile nav links use the new active check

### Task 3: Accessibility (Navigation.tsx + globals.css)
- `aria-current="true"` on active nav links (omitted when inactive)
- `aria-controls="mobile-nav-menu"` on hamburger button
- `id="mobile-nav-menu"` on mobile menu div
- `onKeyDown` handler on mobile menu: Escape closes menu and returns focus to hamburger via `useRef`
- `focus-visible` CSS outline for keyboard navigation (added in Task 1 CSS)

## Deviations from Plan

None — plan executed exactly as written.

## Verification

- `npm run build` passes with no errors
- CSS rules are in place for smooth scroll, scroll-margin, reduced-motion, and focus-visible
- IntersectionObserver correctly tracks section visibility
- ARIA attributes properly applied
- Escape key handler wired with focus return

## Self-Check: PASSED

All files verified on disk. Commit `f9f0e33` confirmed in git log.
