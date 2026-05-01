# Portfolio Rework — Implementation Plan

> Last updated: 2026-04-28  
> Status: Planning phase (theme system added)  
> Branch: **`remastered`** — all rework happens here, never on `main`

---

## Overview

Full rework of Udhaya Prakash's portfolio from a single-page scroll app to a multi-route premium experience with:
- Innovative water-fill loading animation
- Floating bottom navbar
- Separate routes per section
- Dark / Light theme with lightning zap animation + sound effect on toggle
- Rich animation system
- SEO optimization
- Future-ready for media content (images, videos) in work experience

---

## Current Stack (keeping)

| Tool | Purpose |
|------|---------|
| React 19 + TypeScript | UI + type safety |
| Vite 8 | Build tool |
| Framer Motion 12 | Animations |
| Three.js + R3F | 3D backgrounds |
| Tailwind CSS 3 | Utility styling |
| EmailJS | Contact form |
| react-fast-marquee | Skills marquee |

---

## New Additions

| Tool | Purpose |
|------|---------|
| `react-router-dom` (already installed) | Enable true routes |
| `lenis` | Smooth scrolling |
| `gsap` | Loader + complex animations |
| `react-pdf` | Inline resume viewer |
| `react-helmet-async` | Per-route SEO meta tags |
| Custom `ThemeContext` | Dark / Light theme via CSS custom properties on `<html>` |

---

## Route Structure

```
/          → Loading screen → Hero
/about     → About + Skills
/timeline  → Education + Work Experience
/projects  → Projects grid + modal
/contact   → Contact form + social links
/resume    → Inline PDF resume viewer
```

---

## Phase 1 — Loading Screen (Water Fill Animation)

**Goal:** First impression — premium, memorable, functional

### Implementation
- Full-screen dark overlay
- SVG or CSS `clip-path` water fill rising from 0% → 100%
- Percentage counter in large typography synced to fill progress
- Subtle sine-wave at the waterline (SVG path animated horizontally with GSAP or CSS)
- On 100%: scale/blur exit transition revealing Hero
- Tied to real `window.onload` + artificial minimum 2.5s duration
- Framer Motion `AnimatePresence` handles exit

### Key Files
- `src/components/Loader/WaterFillLoader.tsx`
- `src/components/Loader/WaterFillLoader.css`

---

## Phase 2 — Floating Bottom Navbar

**Goal:** Navigation that floats on the screen, doesn't interrupt content

### Design
```
┌──────────────────────────────────────────────────┐
│                   page content                   │
│                                                  │
│     ┌────────────────────────────────────┐       │
│     │  🏠   👤   📅   💼   📧   📄       │  pill │
│     └────────────────────────────────────┘       │
└──────────────────────────────────────────────────┘
```

### Behavior
- Fixed `bottom-6` centered pill
- Glassmorphism: `backdrop-blur`, semi-transparent background, subtle border
- Icon + tooltip label on hover (Framer Motion scale)
- Active route: glowing dot or sliding underline indicator
- Scroll down → hides (y offset animation), scroll up → reappears
- Mobile: full-width bottom bar, no tooltip

### Key Files
- `src/components/Navbar/BottomNav.tsx`
- `src/components/Navbar/BottomNav.css`

---

## Phase 3 — Pages

### `/` — Hero
- Letter-by-letter name reveal (Framer Motion stagger)
- Subtitle typewriter effect
- Three.js stars background (keep existing canvas)
- Scroll-down animated caret
- CTAs: "View Work" → `/projects`, "Contact Me" → `/contact`

### `/about` — About + Skills
- Split layout: bio text (animated reveal) | abstract 3D shape or avatar
- Skills grid: icon cards with hover glow, category filter tabs
- Staggered floating animation per skill card
- react-fast-marquee strip (keep existing)

### `/timeline` — Experience + Education

> **Implemented: Git Graph UI** — career as a `git log`

#### Git Graph (shipped)

```
○ future commit... (pending review)
│
●  feat: join Terra as SDE-1          ← HEAD, pulsing ring
│ ╮
│ ●  feat: freelance — KANISKART      ← branch lane 1
│ ╯
●  feat: join Adrig as Junior Dev
│
●  feat: join Legacy HQ               ← mergeFrom SkillVertex
│ ╮
│ ●  feat: SkillVertex internship     ← branch lane 1
│ ╯
●  feat: B.E. Computer Science
│
◉  init: origin                       ← birth commit
```

- Each role/education entry = a git commit row (click to expand diff)
- Two-lane SVG graph: `main` lane + feature lane for parallel activity (freelance / internship)
- Bezier branch/merge curves with animated `pathLength` draw-on
- Commit card: SHA, branch badge, type badge, message, author, `+lines/-lines` stat
- Expand panel: `git diff`-style body — `+ bullet` lines animate in stagger
- HEAD commit has a pulsing ring; future commit pulses with "pending review" dots
- Scroll-driven progress bar on the left track
- Terminal chrome: `TermBar` + `LogHeader` + blinking cursor prompt at the bottom
- Footer: tea-cup counter joke lines
- Mobile: single lane, narrower SVG

### `/projects` — Projects
- Masonry or equal card grid
- Card: image, title, tags, status badge
- Hover: lift + glow shadow (no flip — too slow)
- Tag filter tabs (React state, no library)
- Click: Framer Motion `layoutId` shared layout modal (very smooth)
- Modal: full description, image, demo + source links

### `/contact` — Contact
- EmailJS form (keep existing logic)
- Animated input focus states (label floats up)
- Right side: social links with hover animations
- Custom toast notification on send (no library)

### `/resume` — Resume Viewer
- Inline PDF via `<iframe>` or `react-pdf`
- Download button pinned top-right
- Paper/card frame styling
- Page controls if using react-pdf

---

## Phase 4 — Dark / Light Theme System

**Goal:** Instant full-page theme swap with a cinematic lightning zap effect + sound

### Architecture — CSS Custom Properties

All color tokens defined on `<html>` via `data-theme` attribute. Tailwind and all components reference CSS vars — no re-render needed, colors update atomically.

```css
:root[data-theme="dark"] {
  --color-bg:         #050816;
  --color-surface:    #151030;
  --color-text:       #ffffff;
  --color-text-muted: #aaa6c3;
  --color-accent:     #915eff;
  --color-glow:       #804dee;
}

:root[data-theme="light"] {
  --color-bg:         #f8f7ff;
  --color-surface:    #ede9fe;
  --color-text:       #0f0a1e;
  --color-text-muted: #4b4068;
  --color-accent:     #7c3aed;
  --color-glow:       #6d28d9;
}
```

Violet accent stays consistent across both themes — only backgrounds and text flip.

### Toggle Interaction — Lightning Zap Sequence

```
User clicks toggle
  ↓
1. Play zap.mp3 (~0.3s electric crackle SFX via Web Audio API)
2. Flash overlay expands from toggle button position:
     clip-path: circle(0% at X Y) → circle(150% at X Y)  [~400ms ease-out]
     Color: white burst (dark→light) | deep purple burst (light→dark)
3. data-theme attribute flips on <html> (behind the flash — invisible)
4. Optional: subtle screen shake — 2-3px translate keyframe on body (100ms)
5. Flash overlay fades out — new theme fully revealed
```

### Toggle Button
- Sun / Moon icon with Framer Motion rotate + scale swap animation
- Lives inside the bottom floating navbar pill as the rightmost icon
- Persists theme choice in `localStorage` — restored on next visit
- Respects `prefers-color-scheme` on first visit (auto dark/light)

### Key Files
- `src/context/ThemeContext.tsx` — theme state, toggle function, localStorage sync
- `src/components/ui/ThemeToggle.tsx` — button + zap overlay + sound trigger
- `src/assets/sounds/zap.mp3` — short electric SFX (~0.3s)
- `src/index.css` — CSS custom property definitions per theme

---

## Phase 5 — Global Animation System

| Effect | Implementation |
|--------|---------------|
| Page transitions | `AnimatePresence` wrapping `<Routes>` — fade + slide from bottom |
| Scroll reveal | `whileInView` + `viewport={{ once: true }}` on all sections |
| Custom cursor | Dot that follows mouse (premium feel, optional) |
| Reduced motion | `useReducedMotion()` hook from Framer Motion — disable heavy animations |

---

## Phase 6 — SEO

- `react-helmet-async`: per-route `<title>`, `<meta description>`, OG tags
- JSON-LD Person schema in `<head>`
- `sitemap.xml` (manual or Vite plugin)
- `robots.txt` update
- All images: `alt` text, AVIF format (already done), `loading="lazy"`
- `<link rel="preconnect">` for Google Fonts, EmailJS

### Per-Route Meta
| Route | Title | Description |
|-------|-------|-------------|
| `/` | Udhaya Prakash — Full Stack Developer | Portfolio of Udhaya Prakash M, Full Stack Developer |
| `/about` | About — Udhaya Prakash | Skills, background, and expertise |
| `/timeline` | Experience — Udhaya Prakash | Work experience and education timeline |
| `/projects` | Projects — Udhaya Prakash | Showcase of built projects |
| `/contact` | Contact — Udhaya Prakash | Get in touch |
| `/resume` | Resume — Udhaya Prakash | View and download resume |

---

## Phase 7 — Performance

- Route-level code splitting: `React.lazy` + `Suspense` per page
- Three.js canvas: only mounted on `/` route, unmounted on others (GPU savings)
- Vite bundle analyzer: identify and fix heavy chunks
- Font subsetting: Poppins only in used weights
- `preconnect` hints in `index.html`

---

## Implementation Order

```
Step  Task                                               Status
────────────────────────────────────────────────────────────────
1.    Set up react-router routes + React.lazy pages    ✅ Done
2.    CSS custom property theme tokens (dark/light)    ✅ Done
3.    ThemeContext + localStorage + prefers-color      ✅ Done
4.    Build floating bottom navbar + theme toggle      ✅ Done
5.    Theme toggle (bulb loader + zap overlay)         ✅ Done
6.    Build bulb-flicker loading screen                ✅ Done  (BulbLoader — replaces water-fill)
7.    Hero page rework                                 ✅ Done
8.    About + Skills page                              ✅ Done
9.    Timeline — Git Graph UI                          ✅ Done  (replaced Bento + Film Strip)
10.   Page transitions (PageTransition overlay)        ✅ Done
11.   useScrollDirection hook                          ✅ Done
────────────────────────────────────────────────────────────────
12.   Projects page rework + modal                     ⬜ Todo  (currently old component, not reworked)
13.   Contact page rework                              ⬜ Todo  (currently old component, not reworked)
14.   Resume viewer page rework                        ⬜ Todo  (iframe works, needs design polish)
15.   SEO (react-helmet-async, schema, sitemap)        ⬜ Todo
16.   Performance audit + code splitting               ⬜ Todo  (lazy() already in place)
17.   Custom cursor (optional)                         ⬜ Todo
────────────────────────────────────────────────────────────────
      Remaining                                        8-11h
```

---

## What Gets Removed / Replaced

| Old | New |
|-----|-----|
| `react-vertical-timeline-component` | Custom Git Graph UI |
| Anchor-scroll single page | True routes with `react-router-dom` |
| Top horizontal navbar | Floating bottom pill navbar |
| No loading screen | Water fill loader |
| No resume viewer | Inline PDF at `/resume` |
| No theme support | Dark + Light with zap animation + sound |

---

## File Structure (target)

```
src/
├── pages/
│   ├── Hero/
│   ├── About/
│   ├── Timeline/        ← has BentoView + FilmStripView
│   ├── Projects/
│   ├── Contact/
│   └── Resume/
├── components/
│   ├── Loader/          ← WaterFillLoader
│   ├── Navbar/          ← BottomNav (floating pill) + theme toggle icon
│   ├── SEO/             ← HelmetWrapper
│   ├── canvas/          ← Stars (Three.js, keep)
│   └── ui/              ← shared: Toast, Modal, FilterTabs, ThemeToggle
├── constants/           ← keep existing data
├── utils/
│   ├── motion.ts        ← extend with new variants
│   └── seo.ts           ← meta config per route
├── context/
│   └── ThemeContext.tsx      ← theme state, toggle fn, localStorage sync
├── hooks/
│   ├── useScrollDirection.ts ← for hiding/showing navbar
│   └── useTheme.ts           ← convenience hook for consuming ThemeContext
├── App.tsx              ← Routes + AnimatePresence
└── main.tsx
```

---

## Git Workflow

- All rework must be done on the **`remastered`** branch
- `main` stays untouched — current live portfolio remains stable throughout the rework
- Create the branch before starting: `git checkout -b remastered`
- PR from `remastered` → `main` only when the full rework is reviewed and signed off

---

## Notes

- Timeline is the Git Graph UI — no view toggle needed, Bento and Film Strip were dropped
- Custom cursor is optional — implement last, remove if it hurts performance
- Google Analytics tag `G-9BEXBVLS8F` should be kept in `index.html`
- Theme default: respect `prefers-color-scheme` on first visit; persist in `localStorage` after first toggle
- Zap sound must be triggered inside a user gesture handler — no autoplay issues
- Three.js star color should respond to theme (lighter in light mode, classic in dark mode)
- All Tailwind utility colors must reference CSS vars so both themes work without separate class sets
