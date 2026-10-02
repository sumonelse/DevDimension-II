# DevDimension-II — Optimization & Enhancement Roadmap

> Living checklist. Items are checked off as they land. Every phase ends with a
> green `npm run lint`, `npm run build` and `npm test`.

---

## Baseline (measured before any change)

Build: `client/` · React 19.1 · Vite 6.3.5 · Tailwind 3.4.17

| Artifact | Raw | gzip |
| --- | --- | --- |
| `assets/index-*.js` (entry, incl. react-dom) | 303.45 kB | 84.90 kB |
| `assets/react-vendor-*.js` (react only) | 11.20 kB | 3.97 kB |
| `assets/index-*.css` (all three sheets) | 156.28 kB | 26.22 kB |
| `index.html` | 5.49 kB | 2.06 kB |
| `assets/spiderverse-*.js` (11 components, 1 chunk) | 122.01 kB | 29.71 kB |
| **Critical-path total** | **476.42 kB** | **117.15 kB** |

`public/audio/` = **5.73 MB** of uncompressed WAV, all instantiated by
`new Audio()` on mount — fetched on **every** page load.

### Root-cause findings

1. **5.73 MB of audio on first paint** — `SpiderverseAudio` eagerly constructed
   six `Audio` objects (default `preload="auto"`), and it was mounted
   unconditionally, outside the `isSpiderVerse` branch.
2. **`react-dom` stranded in the entry chunk** — the `manualChunks` object map
   keys on bare specifiers; `react-dom/client` resolves to a directory, so only
   `react` (11 kB) was captured.
3. **156 kB of one CSS file** — `critical.css` + `index.css` + `spiderverse.css`
   were all imported by `main.jsx`, so all Spider-Verse styles blocked first paint.
4. **Scroll/tick hot paths** — `useScrollReveal` and `useParallax` leaked
   `resize` listeners (anonymous functions in cleanup), `Navbar` re-bound its
   scroll listener on *every* scroll event, and `SpiderverseCursor` kept the
   cursor trail in React state.
5. **`document.head` churn** — `DimensionTrigger` injected a fresh `<style>` with
   duplicate `@keyframes` per particle (up to 35 per click).
6. **Context-wide re-render** — `dimensionGlitches` lived in the
   `DimensionContext` value, so a random glitch re-rendered every consumer.
7. **4 broken asset references** — `/profile-pic.webp`, `/og-image.jpg`,
   `/icons/projects-icon.png`, `/icons/contact-icon.png`.
8. **3 dead prefetches** — `index.html` prefetched `/src/*.jsx` and
   `/src/spiderverse.css`, paths that do not exist in a production build.
9. **No error boundary** — a failed lazy chunk left a blank page.
10. **~1,400 lines of unreferenced components/hooks** still shipped in the repo.

---

## Phase 0 — Baseline & safety net

- [x] P0.1 Audit the codebase and record the build baseline above
- [x] P0.2 Install dependencies, verify a clean `npm run build`
- [x] P0.3 Add an `ErrorBoundary` so a failed lazy chunk cannot white-screen
- [x] P0.4 Add a `npm run check` script (lint + test + build) as one gate

## Phase 1 — Performance (the optimization mandate)

### 1.1 Kill the 5.73 MB audio download

- [x] P1.1.1 Replace eager `new Audio()` construction with a lazy sound engine
- [x] P1.1.2 Respect the autoplay policy: unlock on first user gesture
- [x] P1.1.3 Mount `SpiderverseAudio` only inside the `isSpiderVerse` branch
- [x] P1.1.4 Reuse one player per distinct sound (two keys shared a file)
- [x] P1.1.5 Re-encode the WAVs — **5.73 MB → 1.38 MB** via
      `scripts/optimize-audio.mjs` (no ffmpeg dependency)

### 1.2 Event listeners & hot paths

- [x] P1.2.1 `useScrollReveal`: fix the leaking `resize` listener
- [x] P1.2.2 `useScrollReveal`: replace scroll + body-wide class
      `MutationObserver` with a single `IntersectionObserver`
- [x] P1.2.3 `useParallax`: fix the leaking `resize` listener, gate on
      `pointer: fine` and `prefers-reduced-motion`
- [x] P1.2.4 `Navbar`: bind the scroll listener once, track position in a ref,
      derive the active section with `IntersectionObserver`
- [x] P1.2.5 `SpiderverseCursor`: move position/trail into refs + one rAF loop
- [x] P1.2.6 `DimensionTrigger`: declare the particle `@keyframes` once and
      parameterise them with CSS custom properties
- [x] P1.2.7 `DimensionContext`: move `dimensionGlitches` out of the shared
      context value so glitches stop re-rendering every consumer
- [x] P1.2.8 `DimensionContext`: clear `setTimeout`s on unmount and pause the
      glitch timer on hidden tabs

### 1.3 Bundle & payload

- [x] P1.3.1 Rewrite `manualChunks` to key on resolved `node_modules` paths
- [x] P1.3.2 Drop the stale `manualChunks` group; let each lazy component split
      independently
- [x] P1.3.3 Load `spiderverse.css` on demand, out of the critical path
- [x] P1.3.4 Make the Google Fonts stylesheet non-render-blocking
- [x] P1.3.5 Remove the dead prefetches and the missing `/profile-pic.webp` preload
- [x] P1.3.6 Add `content-visibility: auto` to the below-the-fold sections
- [x] P1.3.7 Scope `will-change` to elements that actually animate
- [x] P1.3.8 Remove a counterproductive `target: es2020` pin and
      size-increasing terser flags, after measuring
- [x] P1.3.9 Defer below-the-fold sections behind `IntersectionObserver`
      (`DeferredSection`) — entry JS **303.45 kB → 79.75 kB**
- [x] P1.3.10 Keep the navbar scroll spy in sync with sections that mount late
      (it only ever observed `#hero`, so the active link never moved)

### 1.4 Motion & rendering budget

- [x] P1.4.1 Global `prefers-reduced-motion` support (CSS + JS)
- [x] P1.4.2 Disable the custom cursors, parallax and glitch loops under
      reduced motion / coarse pointer
- [x] P1.4.3 Keep per-frame state out of React on the remaining hot paths

---

## Phase 2 — Dead code & hygiene

- [x] P2.1 Remove unreferenced components superseded by live equivalents
      (`ThemeToggle`, `ScrollToTop`, `BrandLoader`, `OptimizedImage`,
      `AccessibilityHelper`, `SectionHeading`)
- [x] P2.2 Remove the duplicate `useDimensionTransition` and the orphaned
      `useIntersectionObserver` hooks
- [x] P2.3 Resolve `CompetitiveProgramming` — **removed, not wired in.** It was
      unreachable and entirely placeholder data (500 problems, 75 contests,
      ICPC regionals, Kickstart top 10%, 3 national hackathon wins) with
      comments saying "replace with your actual statistics". Enabling it would
      have published invented achievements. Still in git history.
- [x] P2.4 Guard `localStorage` access (throws in some private-browsing modes)
- [x] P2.5 Replace `process.env` in `main.jsx`/`performance.js` with
      `import.meta.env`

---

## Phase 3 — SEO, PWA & real assets

- [x] P3.1 Generate a real 1200×630 `og-image.png`
- [x] P3.2 Generate the missing `projects-icon.png` / `contact-icon.png` shortcut
      icons and a `maskable-512x512.png`, from a dependency-free SDF rasteriser
- [x] P3.3 Add JSON-LD structured data (`Person` + `WebSite`)
- [x] P3.4 Add `robots.txt` and `sitemap.xml`
- [x] P3.5 Complete the web manifest (`id`, `lang`, `dir`, `categories`,
      `shortcuts`, maskable icon)
- [x] P3.6 Add a versioned service worker: runtime cache, cache-first for hashed
      assets, network-first for HTML, offline fallback
- [x] P3.7 Register the service worker with update-available handling

---

## Phase 4 — Accessibility

- [x] P4.1 Skip-to-content link and a real `<main>` landmark
- [x] P4.2 `aria-current` on the active nav link (both navbars)
- [x] P4.3 Focus trap + focus restore + `aria-modal` in both project modals
- [x] P4.4 Wire form errors via `aria-invalid` / `aria-describedby`
- [x] P4.5 `aria-live` regions for the contact form toasts (both forms)
- [x] P4.6 Icon-only button labels and control names
- [x] P4.7 Keep the native caret in text fields while the custom cursor is active
- [x] P4.8 Validate on blur/submit instead of every keystroke, and stop disabling
      the submit button on invalid input
- [x] P4.9 Honeypot + minimum-fill-time spam guards on both forms

---

## Phase 5 — Creative

- [x] P5.1 A CSS-3D rotating wireframe prism on the social card
      (`scripts/og-image.html`) — real depth via `preserve-3d`, no WebGL, no
      dependency
- [~] P5.2 ~~3D prism in the hero~~ — **dropped at the user's request.** The
      effect was built and verified, then removed. The technique survives in the
      OG card, which is where it earns its place.
- [x] P5.3 Ship real generated iconography instead of dead references

---

## Phase 6 — Quality gates

- [x] P6.1 Add Vitest and a real test suite
- [x] P6.2 Tighten the ESLint flat config (JSX identifiers in args, Node globals
      for scripts, allow-empty-catch) — **0 errors**, down from 10
- [x] P6.3 Replace the Vite boilerplate `README.md` with real project docs
- [x] P6.4 Add architecture notes covering the dual-dimension model

---

## Phase 8 — Background continuity & Spider-Verse dark mode

- [x] P8.1 Fix the normal dimension's hero→content seam. The hero carried its own
      radial gradient and grid clipped to `min-h-screen`, so its bottom edge
      showed as a hard horizontal line. Both now live in one page-wide fixed
      `AmbientBackground` that no section boundary can clip.
- [x] P8.2 Fix the Spider-Verse seam. `.spiderverse-bg` declared
      `position: relative`, which silently beat Tailwind's `.fixed` (same
      specificity, later source order), collapsing the background to zero height
      and falling back to the page body colour.
- [x] P8.3 Mask the grid and add a vignette so the ambient wash reads as depth
      rather than as a panel with a border
- [x] P8.4 Give Spider-Verse a real dark theme — "Night Run", in the spirit of
      *Into the Spider-Verse*'s Miles Morales Brooklyn sequences: deep indigo
      instead of neutral black, cyan neon panel edges instead of flat black
      rules, a magenta offset shadow, light ink on night panels
- [x] P8.5 Keep the classic white-paper comic for the light theme, out of the
      same token block rather than a parallel set of rules
- [x] P8.6 Remap the ~230 hard-coded Tailwind colour utilities in the twelve
      Spider-Verse components onto the new tokens, once, centrally, scoped to
      `[data-dimension="spiderverse"]`
- [x] P8.7 Remove the audio toggle from the Spider-Verse navbar (the Magic Box
      already owns muting)
- [x] P8.8 Fix an `IndexSizeError` in the ambience fade: `requestAnimationFrame`
      hands back the frame timestamp, which can predate the scheduling
      `performance.now()`, and a one-sided `Math.min(1, …)` clamp turned that
      into a negative volume. Clamped both ends, with regression tests.

---

## Phase 9 — Audit follow-ups

All found by measuring a production build in Chromium at 4× CPU throttle, not by
reading code.

### Correctness bugs that were live

- [x] P9.1 `og:image` / `twitter:image` pointed at `/og-image.jpg`, which has
      never existed. `SEO.jsx` overwrote the correct value from `index.html` on
      every page load, so every scraper that executes JS got a broken preview.
- [x] P9.2 Duplicate `<meta name="theme-color">` — `#080C1F` won, `#7c3aed` was
      dead, and the manifest disagreed with both. One tag now, and `ThemeContext`
      keeps it in sync with the active theme.
- [x] P9.3 The closed mobile menu was focusable. `pointer-events-none` does not
      remove keyboard focusability, so its four links were invisible tab stops at
      mobile widths. `inert` on both navbars.
- [x] P9.4 The service worker only worked from the second visit, and its
      `/index.html` offline fallback could never match because only `/` was ever
      cached. Now precaches the shell plus a build-time asset manifest injected
      by a Vite plugin.
- [x] P9.5 The dimension transition announced "closing the rift / returning to
      normal dimension" at the exact moment it opened one — `isSpiderVerse`
      flips to the *destination* 1500 ms in, and the overlay read it live.
- [x] P9.6 The project modal was not centred. `content-visibility: auto` on
      `#projects` applies paint containment, which makes it the containing block
      for `position: fixed` descendants — the overlay sized itself to the section
      (1554 px tall at top −100 px in a 900 px window). Fixed by portalling the
      dialog to `<body>`.
- [x] P9.7 The Spider-Verse cursor stayed invisible until the pointer left and
      re-entered the browser window, because `isVisible` only ever started from
      a `mouseenter` — and it is mounted by a click, so the pointer is always
      already inside. Now revealed on first mouse movement.
- [x] P9.8 The Magic Box panel stayed white in dark mode. It renders through a
      portal onto `<body>`, which sits outside the `[data-dimension]` wrapper, so
      the Spider-Verse colour remap never reached it. The portal root now carries
      the dimension attribute and the surface uses the shared tokens.

### Core Web Vitals

- [x] P9.9 **CLS 0.193 → 0.010.** Isolated the cause by blocking the font CDN:
      shift dropped to 0.014, so 93% of it was the webfont swap re-flowing the
      flex-centred hero. `display=swap` → `display=optional`.
- [x] P9.10 Removed the artificial 500 ms loader floor and shortened the content
      fade from 1000 ms to 500 ms. The hero now reaches full contrast at ~1.08 s
      instead of ~1.42 s, and the splash screen does not appear at all on a fast
      load.

### Touch

- [x] P9.11 Raised sub-44px tap targets behind `@media (pointer: coarse)`: the
      contact email link was 19px tall, footer links 21px, filter chips 40px and
      the card actions 36px. Desktop sizing is untouched.

---

## Phase 7 — Verification

- [x] P7.1 `npm run lint` clean (0 errors, 0 warnings, down from 10/12)
- [x] P7.2 `npm test` green
- [x] P7.3 `npm run build` green, bundle sizes re-measured against the baseline
- [x] P7.4 Visual verification of both dimensions in Chromium
- [x] P7.5 Commit — **not pushed**

---

## Result log

### Measured, in a real browser (Chromium, production build)

| Metric | Before | After |
| --- | --- | --- |
| Audio downloaded on first load | **5.73 MB** | **0 bytes** |
| Audio on disk | 5.73 MB | 1.38 MB |
| Entry JS (raw) | 303.45 kB | 79.75 kB |
| Entry JS (gzip) | 84.90 kB | 23.67 kB |
| Critical CSS (raw) | 156.28 kB | 133.52 kB |
| `spiderverse.css` in critical path | yes | no (24.28 kB, loaded on demand) |
| Spider-Verse components | 1 shared 122 kB chunk | 11 independent chunks |
| `react-dom` in entry chunk | yes | no (now in `react-vendor`) |
| Scroll-reveal elements activating | 0 / 19 (bug) | 19 / 19 |
| Nav active-link tracking | never updated | correct per section |
| Hero→content seam | hard horizontal line | none |
| Spider-Verse background | collapsed (0 height) | fixed, full viewport |
| Spider-Verse themes | 1 (hard-coded white) | 2 (Night Run + classic) |
| Audio toggle controls on screen | 2 (navbar + Magic Box) | 1 (Magic Box) |
| Lint errors / warnings | 10 / 12 | **0 / 0** |
| Tests | none | 67 passing |
| Requests on first load | — | 30, none for audio |

### Key changes

- `src/components/AmbientBackground.jsx` — one continuous page-wide background
- `src/components/ErrorBoundary.jsx` — chunk failures get a reload button
- `src/utils/soundEngine.js` — lazy, shared, autoplay-aware sound engine
- `src/components/DeferredSection.jsx` — mounts heavy sections near the viewport
- `src/utils/particles.js` — keyframes declared once, driven by CSS variables
- `src/hooks/useFocusTrap.js` — modal focus management
- `src/hooks/useScrollReveal.js` — single `IntersectionObserver`, no scroll handler
- `src/utils/validation.js` — pure, testable form validators
- `public/sw.js` — runtime-caching offline worker
- `scripts/optimize-audio.mjs` — reproducible WAV downsampler
- `scripts/generate-icons.mjs` — dependency-free PNG rasteriser (SDF + zlib)
- `scripts/og-image.html` — source for the 1200×630 social card
- `spiderverse.css` — "Night Run" surface/ink tokens + the scoped colour remap

### Not done, deliberately

- **No WebGL/Three.js.** The 2.5D/3D work stays CSS-only, so there is no GPU
  library to download and nothing to break on low-end hardware.
- **`CompetitiveProgramming` is not published.** See P2.3.
- **Fonts remain on Google Fonts CDN** rather than self-hosted. Self-hosting
  would remove a third-party connection but means committing several hundred
  kB of font binaries and a mechanism to keep them in sync with the families
  used in CSS. Worth doing if render-blocking on a slow connection matters more
  than repository size.
