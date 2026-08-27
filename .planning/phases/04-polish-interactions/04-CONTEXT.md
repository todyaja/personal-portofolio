# Phase 4 Context: Polish & Interactions

**Phase:** 4  
**Created:** 2026-08-01  
**Status:** Ready for planning

---

## Decisions

### Dialogue Box Effects

**Typewriter Effect:**
- Apply to: Hero intro text only
- Typing speed: 50ms per character (medium)
- Start trigger: On page load with 0.5s delay
- Scope: Whole paragraph typed as one continuous stream
- Cursor: Blinking cursor (▊) at the end while typing, then disappears
- Text style: Static "LOADING..." text (not applicable here, this is for loading spinner)

**Dialogue Box Animation:**
- Animation type: Animate on scroll (scale up or slide in when entering viewport)
- Implementation: Use Intersection Observer API

### Scroll Animations

**Section Entry Animation:**
- Animation style: Slide up
- Trigger: When section top reaches bottom of viewport (on enter)
- Speed: Medium (0.5s duration)
- Easing: Ease-out
- Stagger: Staggered (each section animates with slight delay after previous)
- Replay: Play once only (no replay on scroll back)
- Accessibility: Respect prefers-reduced-motion media query
- Implementation: Intersection Observer API (no dependencies)
- Offset: 40px below final position
- Combine: Slide up with slight scale (90% → 100%)

### Loading Spinner

**Style:**
- Icon: RPG style (bouncing pixel coin/gem)
- Background: Full-screen dark overlay with centered spinner
- Text: "LOADING..." text below the icon with animated dots

**Behavior:**
- When shown: Initial page load only
- Duration: Minimum 1s display time (even if page loads faster)
- Fade out: Quick fade (0.3s)

### Additional Polish

**Smooth Scrolling:**
- Type: Native smooth scroll (CSS scroll-behavior: smooth)
- Apply to: All anchor links (#experience, #skills, etc.)
- Offset: 80px offset for scroll targets to account for navigation bar

**Scroll Spy:**
- Highlight current section in navigation as user scrolls
- Active trigger: Section is active when its top is near the top of viewport

---

## Deferred Ideas

- Button press effect (beyond existing hover)
- Active nav glow (subtle glow or pulse on active nav items)
- Pixel focus states (pixel-art styled focus outlines for keyboard navigation)
- Tech tooltips (hover tooltips on tech badges showing full tech names)
- Back to top button (pixel-art styled button that appears after scrolling)
- Keyboard shortcuts (1=Home, 2=Experience, etc.)

---

## Technical Notes

- All animations should respect `prefers-reduced-motion` media query
- Use native Intersection Observer API for scroll-triggered animations (no external dependencies)
- Loading spinner should be implemented as a client component that shows on initial load and fades out after content is ready
- Typewriter effect should be implemented as a client component with useEffect for the typing animation
- Scroll spy can be implemented using Intersection Observer to track which section is currently in view
- Smooth scrolling can be achieved with CSS `scroll-behavior: smooth` on the html element
- Scroll offset can be handled with `scroll-margin-top` CSS property on section elements

---

## Files to Modify

- `app/globals.css` - Add animation keyframes, scroll behavior, and loading spinner styles
- `app/layout.tsx` - Add loading spinner component
- `app/page.tsx` - Add typewriter effect to hero intro text
- `components/HeroSection.tsx` - Implement typewriter effect for intro text
- `components/Navigation.tsx` - Implement scroll spy for active section highlighting
- `components/LoadingSpinner.tsx` - New component for initial page load spinner
- `components/TypeWriter.tsx` - New component for typewriter text effect

---

## Success Criteria

- [ ] Typewriter effect displays hero intro text character by character at 50ms intervals
- [ ] Typewriter effect starts 0.5s after page load
- [ ] Blinking cursor appears during typing and disappears when complete
- [ ] Sections slide up 40px with scale from 90% to 100% when entering viewport
- [ ] Scroll animations trigger when section top reaches bottom of viewport
- [ ] Animations are staggered with slight delay between sections
- [ ] Animations play once and do not replay on scroll back
- [ ] All animations respect prefers-reduced-motion preference
- [ ] Loading spinner displays for minimum 1s on initial page load
- [ ] Loading spinner shows bouncing pixel coin/gem with "LOADING..." text
- [ ] Loading spinner fades out quickly (0.3s) after minimum display time
- [ ] Smooth scrolling works for all anchor links
- [ ] Scroll targets have 80px offset to account for navigation
- [ ] Navigation highlights current section as user scrolls
- [ ] Section is considered active when its top is near top of viewport
