# Roadmap: Tody Prasetya Pixel Portfolio

**Created:** 2026-08-01
**Granularity:** Standard (5-8 phases, 3-5 plans each)
**Execution:** Parallel where possible

## Phase Overview

| Phase | Name | Focus | Requirements |
|-------|------|-------|--------------|
| 1 | Foundation | Next.js setup, pixel design system, assets | VIS-01, VIS-03, TECH-01, TECH-02, AST-01 |
| 2 | Layout & Navigation | Pixel-art UI framework, responsive layout, avatar | VIS-02, VIS-04, VIS-05, SEC-01 |
| 3 | Content Sections | Experience, Skills, Education, Contact | SEC-02, SEC-03, SEC-04, SEC-05, SEC-06, TECH-03, TECH-04, AST-02, AST-03, AST-04, AST-05 |
| 4 | Polish & Interactions | Animations, transitions, hover effects | VIS-05, TECH-05, TECH-06 |
| 5 | Optimization & Deployment | Performance, accessibility, SEO, deploy | TECH-05, TECH-06 |

## Phase 1: Foundation

**Goal:** Initialize Next.js project with pixel-art design system and copy existing assets.

**Plans:** 4 plans

Plans:

- [ ] 01-01-PLAN.md — Initialize Next.js app with App Router, TypeScript, Tailwind CSS (tracer)
- [ ] 01-02-PLAN.md — Pixel design system: fonts, color palette, utility classes
- [ ] 01-03-PLAN.md — Asset migration from old portfolio, organized into subfolders
- [ ] 01-04-PLAN.md — Root layout with pixel container, metadata, favicon

**Success Criteria:**

- Next.js dev server runs without errors
- Pixel fonts load correctly
- All assets accessible at `/assets/*` paths
- Base layout renders with pixel-art styling

**Requirements Covered:** VIS-01, VIS-03, TECH-01, TECH-02, AST-01

---

## Phase 2: Layout & Navigation

**Goal:** Build pixel-art styled navigation and responsive layout with pixel avatar component.

**Plans:** 4 plans

Plans:

- [ ] 02-01-PLAN.md — Pixel navigation component with desktop links and mobile hamburger menu
- [ ] 02-02-PLAN.md — Responsive layout utilities and breakpoint adjustments
- [ ] 02-03-PLAN.md — Pixel avatar component with pixel-art styling and idle animation
- [ ] 02-04-PLAN.md — Hero section with avatar, name, title, and intro text

**Success Criteria:**

- Navigation works on desktop and mobile
- Layout is responsive across breakpoints
- Pixel avatar displays correctly
- Hero section renders with all content

**Requirements Covered:** VIS-02, VIS-04, VIS-05, SEC-01

---

## Phase 3: Content Sections

**Goal:** Implement all content sections with pixel-art styling and integrate assets.

**Plans:** 5 plans

Plans:

- [ ] 03-01-PLAN.md — Experience Timeline with all 5 roles, tech stacks, pixel RPG quest-log styling
- [ ] 03-02-PLAN.md — Skills Section with categorized tech badges and logo integration
- [ ] 03-03-PLAN.md — Education Section with Binus logo, degree, Cumlaude GPA
- [ ] 03-04-PLAN.md — Contact Section with email, phone, location, pixel message-box styling
- [ ] 03-05-PLAN.md — Page integration, branding logo, asset verification

**Success Criteria:**

- All 5 experience entries display correctly with tech stacks
- Skills section shows all technologies
- Education section displays Binus info with logo
- Contact section has working email/phone links
- All assets (logos, profile pic) display correctly

**Requirements Covered:** SEC-02, SEC-03, SEC-04, SEC-05, SEC-06, TECH-03, TECH-04, AST-02, AST-03, AST-04, AST-05

---

## Phase 4: Polish & Interactions

**Goal:** Add pixel-art styled animations, transitions, and hover effects.

**Plans:** 2/4 plans executed

Plans:

- [x] 04-01-PLAN.md — Loading spinner with RPG coin animation and fade-out timing
- [x] 04-02-PLAN.md — Typewriter effect for hero intro text with blinking cursor
- [ ] 04-03-PLAN.md — Scroll-triggered slide-up animations with Intersection Observer
- [ ] 04-04-PLAN.md — Smooth scrolling, scroll spy, and keyboard navigation enhancements

**Success Criteria:**

- Page transitions are smooth and pixel-art styled
- Hover effects provide visual feedback
- Micro-animations enhance without distracting
- Overall feel is polished and cohesive

**Requirements Covered:** VIS-05, TECH-05, TECH-06

---

## Phase 5: Optimization & Deployment

**Goal:** Optimize performance, ensure accessibility, add SEO, and deploy.

**Plans:** 4 plans

Plans:

- [ ] 05-01-PLAN.md — Performance optimization: image compression, lazy loading, bundle minimization
- [ ] 05-02-PLAN.md — Accessibility audit: keyboard navigation, ARIA labels, color contrast, screen reader
- [ ] 05-03-PLAN.md — SEO setup: meta tags, Open Graph, sitemap.xml, robots.txt, structured data
- [ ] 05-04-PLAN.md — Deployment: Vercel deployment, custom domain, HTTPS, CI/CD

**Success Criteria:**

- Lighthouse performance score > 90
- Lighthouse accessibility score > 90
- SEO score > 90
- Site loads in < 3s on 3G
- Successfully deployed and accessible via URL

**Requirements Covered:** TECH-05, TECH-06

---

## Dependencies

- Phase 2 depends on Phase 1 (needs design system and assets)
- Phase 3 depends on Phase 2 (needs layout and navigation)
- Phase 4 depends on Phase 3 (needs content to animate)
- Phase 5 depends on Phase 4 (needs complete site to optimize)

## Parallelization

- Phase 1: Sequential (foundation must be solid)
- Phase 2: Sequential (layout depends on design system)
- Phase 3: **Parallel possible** — Experience, Skills, Education, Contact sections can be built in parallel
- Phase 4: Sequential (polish after content is complete)
- Phase 5: Sequential (optimization after everything is built)

## Risk Mitigation

- **Pixel font loading:** Use font-display: swap, provide fallback fonts
- **Asset sizes:** Optimize images during Phase 1 migration
- **Responsive pixel art:** Test on multiple devices early in Phase 2
- **Browser compatibility:** Test pixel-art effects across browsers in Phase 4

---

*Roadmap created: 2026-08-01*
*Last updated: 2026-08-01 after initial creation*
