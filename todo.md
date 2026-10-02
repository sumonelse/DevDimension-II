# DevDimension-II — Optimization & Enhancement Roadmap

> Living checklist. Items are checked off as they land. Every phase ends with a
> green `npm run lint`, `npm run build` and `npm test`.

---

## Baseline (measured before any change)

Build: `client/` · React 19.1 · Vite 6.3.5 · Tailwind 3.4.17

| Artifact | Raw | gzip |
| --- | --- | --- |
| `assets/index-*.js` (entry) | 303.45 kB | 84.90 kB |
| `assets/react-vendor-*.js` | 11.20 kB | 3.97 kB |
| `assets/index-*.css` | 156.28 kB | 26.22 kB |
| `index.html` | 5.49 kB | 2.06 kB |
| `assets/spiderverse-*.js` (lazy) | 122.01 kB | 29.71 kB |
| **Critical-path total** | **476.42 kB** | **117.15 kB** |

`public/audio/` = **5.73 MB** of uncompressed WAV, all instantiated by
`new Audio()` on mount — fetched on **every** page load.

### Root-cause findings

1. **5.73 MB of audio on first paint** — `SpiderverseAudio` eagerly constructs
   six `Audio` objects (default `preload="auto"`), and it is mounted
   unconditionally, outside the `isSpiderVerse` branch.
2. **`react-dom` is stranded in the entry chunk** — the `manualChunks` object map
   keys on bare specifiers; `react-dom/client` resolves to a directory, so only
   `react` (11 kB) was captured.
3. **156 kB of one CSS file** — `critical.css` + `index.css` + `spiderverse.css`
   are all imported by `main.jsx`, so all Spider-Verse styles block first paint.
4. **Scroll/tick hot paths** — `useScrollReveal` and `useParallax` leak `resize`
   listeners (anonymous functions in cleanup), `Navbar` re-binds its scroll
   listener on *every* scroll event (dep on `lastScrollY`), and
   `SpiderverseCursor` keeps the cursor trail in React state (re-render/frame).
5. **`document.head` churn** — `DimensionTrigger` injects fresh `<style>` tags
   with duplicate `@keyframes` on every particle burst, and removes them after.
6. **Context-wide re-render** — `dimensionGlitches` lives in the `DimensionContext`
   value, so a random glitch re-renders every consumer of the context.
7. **4 broken asset references** — `/profile-pic.webp`, `/og-image.jpg`,
   `/icons/projects-icon.png`, `/icons/contact-icon.png`.
8. **3 dead prefetches** — `index.html` prefetches `/src/*.jsx` and
   `/src/spiderverse.css`, paths that do not exist in a production build.
9. **No error boundary** — a failed lazy chunk leaves a blank page.
10. **~1,400 lines of unreferenced components/hooks** still shipped in the repo.

---

## Phase 0 — Baseline & safety net

- [x] P0.1 Audit the codebase and record the build baseline above
- [x] P0.2 Install dependencies, verify a clean `npm run build`
- [ ] P0.3 Add an `ErrorBoundary` so a failed lazy chunk cannot white-screen
- [ ] P0.4 Add a `npm run check` script (lint + test + build) as one gate

---

## Phase 1 — Performance (the optimization mandate)

### 1.1 Kill the 5.73 MB audio download

- [ ] P1.1.1 Replace eager `new Audio()` construction with lazy, first-use
      instantiation behind a shared sound engine
- [ ] P1.1.2 Respect autoplay policy: unlock the audio graph on the first user
      gesture instead of calling `play()` blindly
- [ ] P1.1.3 Mount `SpiderverseAudio` only inside the `isSpiderVerse` branch
- [ ] P1.1.4 Reuse one buffer per distinct sound (two keys shared a file today)
- [ ] P1.1.5 Compress/convert the ambience + whoosh WAVs to `mp3`/`ogg`

### 1.2 Event listeners & hot paths

- [ ] P1.2.1 `useScrollReveal`: fix the leaking `resize` listener
- [ ] P1.2.2 `useScrollReveal`: replace the scroll+`MutationObserver`-on-`body`
      machinery with one `IntersectionObserver`
- [ ] P1.2.3 `useParallax`: fix the leaking `resize` listener, gate on
      `pointer: fine` and `prefers-reduced-motion`
- [ ] P1.2.4 `Navbar`: bind the scroll listener once; track position in a ref
      instead of state; derive the active section with `IntersectionObserver`
- [ ] P1.2.5 `SpiderverseCursor`: move position/trail out of React state into
      refs + a single `requestAnimationFrame` loop
- [ ] P1.2.6 `DimensionTrigger`: hoist the injected `@keyframes` into the
      stylesheet once and reuse them instead of creating `<style>` per burst
- [ ] P1.2.7 `DimensionContext`: move `dimensionGlitches` out of the shared
      context value so glitches stop re-rendering every consumer
- [ ] P1.2.8 `DimensionContext`: clear `setTimeout`s on unmount (transition,
      spider-sense, post-credit) and pause the glitch timer on hidden tabs

### 1.3 Bundle & payload

- [ ] P1.3.1 Rewrite `manualChunks` as a function keyed on `node_modules` paths so
      `react-dom` lands in the vendor chunk
- [ ] P1.3.2 Drop stale `manualChunks` entries for deleted files
- [ ] P1.3.3 Load `spiderverse.css` on demand, not in the critical path
- [ ] P1.3.4 Make the Google Fonts stylesheet non-render-blocking
- [ ] P1.3.5 Remove the 3 dead prefetches and the missing `/profile-pic.webp` preload
- [ ] P1.3.6 Add `content-visibility: auto` to heavy below-the-fold sections
- [ ] P1.3.7 Trim unconditional `will-change`; scope it to active animation
- [ ] P1.3.8 Set a modern build target and tighten terser

### 1.4 Motion & rendering budget

- [ ] P1.4.1 Global `prefers-reduced-motion` support (CSS + JS)
- [ ] P1.4.2 Disable the custom cursors, parallax and glitch loops under
      reduced motion / coarse pointer
- [ ] P1.4.3 Memoize the remaining per-frame components and hoist static arrays

---

## Phase 2 — Dead code & hygiene

- [ ] P2.1 Remove unreferenced components superseded by live equivalents
      (`ThemeToggle`, `ScrollToTop`, `BrandLoader`, `OptimizedImage`,
      `AccessibilityHelper`, `SectionHeading`)
- [ ] P2.2 Remove the duplicate `useDimensionTransition` hook
- [ ] P2.3 Decide on `CompetitiveProgramming` (currently orphaned, its nav link
      is commented out) and either wire it in or retire it
- [ ] P2.4 Guard `localStorage` access in contexts (Safari private mode throws)
- [ ] P2.5 Replace the `process.env` reference in `main.jsx` with Vite's `import.meta.env`

---

## Phase 3 — SEO, PWA & real assets

- [ ] P3.1 Generate a real 1200×630 `og-image.png` (currently a 404 reference)
- [ ] P3.2 Generate the missing `projects-icon.png` / `contact-icon.png` shortcut icons
- [ ] P3.3 Add JSON-LD structured data (`Person` + `WebSite`)
- [ ] P3.4 Add `robots.txt` and `sitemap.xml`
- [ ] P3.5 Complete the web manifest (`id`, `lang`, `dir`, `categories`, screenshots)
- [ ] P3.6 Add a versioned service worker: precache the shell, cache-first for
      hashed assets, network-first for HTML, offline fallback
- [ ] P3.7 Register the service worker with update handling

---

## Phase 4 — Accessibility

- [ ] P4.1 Skip-to-content link and proper `<main>`/landmark structure
- [ ] P4.2 `aria-current="page"` on the active nav link
- [ ] P4.3 Focus trap + focus restore + `aria-modal` in both project modals
- [ ] P4.4 Wire form errors to inputs via `aria-invalid` / `aria-describedby`
- [ ] P4.5 `aria-live` regions for the contact form toasts
- [ ] P4.6 Labelled icon-only buttons and a real `alt`/`aria-label` audit
- [ ] P4.7 Contrast + tap-target pass on the smallest interactive elements
- [ ] P4.8 Stop re-validating the whole form on every keystroke (validate on
      blur/submit) — a11y *and* perf

---

## Phase 5 — Creative: 2.5D / 3D

- [ ] P5.1 Build a pointer-reactive 3D dimension prism (CSS `preserve-3d`,
      no new runtime dependency) as a hero centerpiece
- [ ] P5.2 Layered 2.5D depth parallax in the hero, driven by one rAF loop
- [ ] P5.3 Wire the prism to the dimension switch so it reacts to the transition
- [ ] P5.4 Full reduced-motion + offscreen-pause behaviour for every new effect

---

## Phase 6 — Quality gates

- [ ] P6.1 Add Vitest and a real test suite (utils, data integrity, contexts,
      reduced-motion behaviour, form validation)
- [ ] P6.2 Tighten the ESLint flat config (JSX runtime, unused args, hooks rules)
- [ ] P6.3 Replace the Vite boilerplate `README.md` with real project docs
- [ ] P6.4 Add architecture notes covering the dual-dimension model

---

## Phase 7 — Verification

- [ ] P7.1 `npm run lint` clean
- [ ] P7.2 `npm test` green
- [ ] P7.3 `npm run build` green, bundle sizes re-measured against the baseline
- [ ] P7.4 Visual verification of both dimensions in a real browser
- [ ] P7.5 Commit — **no push**

---

## Result log

_Filled in as the work lands._