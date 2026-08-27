---
phase: 05-optimization-deployment
plan: 03
subsystem: seo
tags: [nextjs, metadata, open-graph, twitter-cards, json-ld, sitemap, robots, structured-data]

requires:
  - phase: 01-foundation
    provides: Next.js app structure with layout.tsx
provides:
  - Comprehensive SEO metadata (title, description, keywords, OG, Twitter)
  - JSON-LD Person structured data
  - Dynamic sitemap.xml generation
  - Dynamic robots.txt generation
  - Canonical URL and theme-color configuration
affects: [deployment, content]

actuals:
  tokens: 8500
  tasks: 2
  commits: 2

tech-stack:
  added: []
  patterns: [Next.js Metadata API, JSON-LD structured data, env-based SITE_URL]

key-files:
  created:
    - app/sitemap.ts
    - app/robots.ts
  modified:
    - app/layout.tsx
    - next.config.ts

key-decisions:
  - "SITE_URL via NEXT_PUBLIC_SITE_URL env var with fallback to https://todyprasetya.dev"
  - "JSON-LD Person schema with knowsAbout, jobTitle, email"
  - "theme-color #1a1a2e matching pixel dark background"

patterns-established:
  - "SITE_URL constant pattern: env var with fallback, shared across sitemap/robots/metadata"
  - "JSON-LD in <head> via dangerouslySetInnerHTML in root layout"

requirements-completed: [TECH-05]

coverage:
  - id: D1
    description: "Comprehensive metadata export with keywords, authors, OG, Twitter Cards"
    requirement: TECH-05
    verification:
      - kind: automated
        ref: "npm run build succeeds, meta tags in layout.tsx"
        status: pass
    human_judgment: false
  - id: D2
    description: "JSON-LD Person structured data in <head>"
    requirement: TECH-05
    verification:
      - kind: automated
        ref: "npm run build succeeds, JSON-LD script in layout.tsx"
        status: pass
    human_judgment: false
  - id: D3
    description: "Dynamic sitemap.xml at /sitemap.xml"
    requirement: TECH-05
    verification:
      - kind: automated
        ref: "HTTP GET /sitemap.xml returns valid XML with homepage URL"
        status: pass
    human_judgment: false
  - id: D4
    description: "Dynamic robots.txt at /robots.txt"
    requirement: TECH-05
    verification:
      - kind: automated
        ref: "HTTP GET /robots.txt returns correct directives"
        status: pass
    human_judgment: false

duration: 6min
completed: 2026-08-01
status: complete
---

# Phase 5 Plan 3: SEO Setup Summary

**Comprehensive SEO with metadata, Open Graph, Twitter Cards, JSON-LD Person schema, dynamic sitemap.xml and robots.txt**

## Performance

- **Duration:** 6 min
- **Started:** 2026-08-01T16:45:35Z
- **Completed:** 2026-08-01T16:51:32Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Expanded metadata export with keywords, authors, creator, publisher, canonical URL, and full OG/Twitter Card configuration
- Added JSON-LD Person structured data with jobTitle, knowsAbout, email, and image
- Created dynamic sitemap.xml via Next.js Metadata API with homepage priority 1.0
- Created dynamic robots.txt with allow-all rules and sitemap directive
- Configured viewport with theme-color matching pixel theme (#1a1a2e)

## Task Commits

Each task was committed atomically:

1. **Task 1: Comprehensive metadata and structured data** - `1e79f28` (feat)
2. **Task 2: Dynamic sitemap.xml and robots.txt** - `539d3db` (feat)

## Files Created/Modified
- `app/layout.tsx` - Expanded metadata export, viewport config, JSON-LD Person schema in <head>
- `app/sitemap.ts` - Dynamic sitemap generator with homepage URL, priority, changefreq
- `app/robots.ts` - Dynamic robots.txt with allow-all and sitemap directive
- `next.config.ts` - Added trailingSlash: false, removed deprecated optimizePackageImports

## Decisions Made
- SITE_URL uses `NEXT_PUBLIC_SITE_URL` env var with fallback to `https://todyprasetya.dev` — deployment plan (05-04) will configure the actual domain
- JSON-LD uses `sameAs: []` (empty) — no social profile URLs found in codebase yet, ready to populate
- theme-color set to `#1a1a2e` (pixel-bg-dark) to match the portfolio's dark pixel theme

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed deprecated optimizePackageImports from next.config.ts**
- **Found during:** Task 1 (build verification)
- **Issue:** `optimizePackageImports` property caused TypeScript build failure — removed in Next.js 16
- **Fix:** Removed the property, added ponytail comment noting it's auto-optimized in Next 16
- **Files modified:** next.config.ts
- **Verification:** Build passes after removal
- **Committed in:** 1e79f28 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Necessary for build to pass. No scope creep.

## Issues Encountered
None — build passed after the optimizePackageImports fix.

## User Setup Required
None - no external service configuration required. Set `NEXT_PUBLIC_SITE_URL` env var before deployment (05-04) to override the default domain.

## Next Phase Readiness
- SEO foundation complete — metadata, structured data, sitemap, robots.txt all functional
- Ready for deployment (05-04) which will configure the actual domain and go live
- Lighthouse SEO audit should score > 90 with these changes

## Self-Check: PASSED

All files found on disk. Both task commits verified in git log.

---
*Phase: 05-optimization-deployment*
*Completed: 2026-08-01*
