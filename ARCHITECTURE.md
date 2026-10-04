# Architecture

How DevDimension-II is put together, and why. The
[README](./client/README.md) covers how to run it; this covers the decisions
that are not obvious from the file tree.

---

## 1. Two dimensions, one tree

The site has two complete visual identities that share nothing but a route:

| | Normal | Spider-Verse |
| --- | --- | --- |
| Navbar | `Navbar` | `SpiderverseNavbar` |
| Sections | `Hero` â€¦ `Footer` | `SpiderverseHero` â€¦ `SpiderverseFooter` |
| Cursor | `CustomCursor` | `SpiderverseCursor` |
| Modals | `ProjectModal` | `SpiderverseProjectModal` |
| Stylesheet | `index.css` | `spiderverse.css` |
| Ambience | none | `SpiderverseAudio` |

`App.jsx` forks on `isSpiderVerse` from `DimensionContext`. Only one set is
mounted at a time, which is what makes the second dimension nearly free to load:
nothing Spider-Verse is imported until the fork is taken.

**The two sets are duplicated, not abstracted.** A shared `<Section>` with
variant props would have produced a component with fifteen boolean flags and two
visually unrelated render paths. The duplication is the cheaper option for a
portfolio site where the two identities are meant to look nothing alike.

---

## 2. State

Two contexts, both deliberately small.

**`ThemeContext`** â€” `isDarkTheme` and `toggleTheme`. Applies classes to
`<html>`; the preference is read once on mount from `localStorage` or
`prefers-color-scheme`.

**`DimensionContext`** â€” the dimension flag, the transition phase, the audio
mute, multiverse awareness, the post-credit trigger.

The important property: **effect state is not in the context value.** An earlier
version put `dimensionGlitches` and `spiderSenseActive` in the value. Because
changing the context value re-renders every consumer, a random glitch flashing
every five seconds re-rendered all six page sections. Both now live in a
`DimensionEffects` child component that is passed them as props, so a glitch
re-renders only itself.

Nothing outside the provider reads either value, so keeping them out of the
value is free.

---

## 3. The transition

`toggleDimension()` does not switch a boolean and hope for the best:

```
click -> lock out re-entry
      -> play the transition sting
      -> increment multiverse awareness
      -> 1500ms  flip isSpiderVerse (the old tree unmounts, the new mounts)
      -> 1000ms  release the lock
```

The 1500 ms is not arbitrary: it is long enough for the new dimension's
component chunk to be fetched and swapped in without a blank frame, and long
enough for the Spider-Verse stylesheet â€” also fetched on entry â€” to arrive.

Every `setTimeout` is registered in a ref-backed set and cleared on unmount, so
a navigation mid-transition cannot flip state on a torn-down tree.

---

## 4. Loading strategy

Four separate mechanisms, each chosen for a different reason.

**`React.lazy` + `Suspense` for the two dimensions.** All Spider-Verse
components are dynamic. Entering the dimension fetches them in parallel; the
1.5 s transition window covers the latency.

**`DeferredSection` for below-the-fold content.** The normal dimension's `About`,
`Skills`, `Projects`, `Contact` and `Footer` are split. `Contact` alone is ~39 kB
rendered and completely invisible on the first screen. `DeferredSection` renders
a placeholder of the right height, watches with an `IntersectionObserver` at
`800px` rootMargin, and swaps in the real component. The entry chunk went from
303 kB to 77 kB.

**Idle prefetch for the one thing that is needed on interaction.**
`DimensionTransition` is lazy but must appear the instant the button is clicked,
so it is `import()`ed during browser idle time.

**Dynamic CSS for the second stylesheet.** `dimensionStyles.js` imports
`spiderverse.css` on demand â€” immediately if the visitor was last in
Spider-Verse, at idle otherwise. It is a real stylesheet rather than injected
rules, so it stays in one place and the browser can cache it as a file.

### Why not a router?

There is one route. The dimension switch is a state flag, not a navigation, and
adding a router would mean a second bundle and a real URL for a view that is
best kept ephemeral and sticky to a preference.

---

## 5. Rendering budget

The recurring theme: **anything that runs per frame must not touch React.**

- Both cursors keep position, velocity and trail geometry in refs and write
  transforms inside one `requestAnimationFrame`.
- `useParallax` batches all layer updates into one rAF and reads each layer's
  `--parallax-speed` once instead of calling `getComputedStyle` per frame.
- `Navbar` reads scroll position into a ref, not state, and derives the active
  section with an `IntersectionObserver` rather than measuring five sections'
  `offsetTop` every frame.
- `emitParticles` creates N particles but exactly one `<style>` block, declaring
  the keyframes once and letting CSS custom properties carry the per-particle
  direction.

`content-visibility: auto` is applied to the four heavy below-the-fold sections,
with `contain-intrinsic-size: auto 900px` so the scrollbar does not oscillate
while the browser is still learning their heights.

---

## 6. Reveal animations

`useScrollReveal` is the one place where a plausible-looking implementation was
wrong in a way that only showed up in a browser, so the reasoning is preserved
in the source.

`threshold: 0` on an `IntersectionObserver` reports an element **exactly once**,
when it crosses the viewport edge. An element that first peeks in at the very
bottom of the screen, above the 150 px reveal line, is judged too early and
never re-evaluated â€” it stays at `opacity: 0` forever. The first version had
this bug and shipped 0 of 19 elements revealing.

The fix is to encode the reveal distance in a bottom `rootMargin` instead, so
`isIntersecting` already means "within the reveal distance" and fires once, at
the right moment. `src/hooks/useScrollReveal.test.jsx` asserts the option, so
this cannot silently regress.

---

## 7. Audio

`src/utils/soundEngine.js` exists because the original implementation created
six `Audio` elements at module scope inside a component that was mounted
unconditionally. `new Audio(src)` starts a fetch, so 5.73 MB of WAV was
downloaded by every visitor on every page load.

The engine:

- builds a player on first use, keyed by `src|volume|rate|loop`, so two logical
  sounds sharing a file share one request;
- waits for a user gesture before priming, because browsers block autoplay and a
  rejected `play()` is expected rather than exceptional;
- fades the ambience with one rAF loop rather than an interval;
- releases every player and resets mute state in `destroy()`.

The WAVs are committed as 22.05 kHz mono (5.73 MB â†’ 1.38 MB) via
`scripts/optimize-audio.mjs`.

---

## 8. Background continuity

Both dimensions used to stack backgrounds per section, which produced a visible
seam at the hero boundary.

**Normal dimension.** `Hero.jsx` carried its own radial gradient and grid
pattern inside a `min-h-screen overflow-hidden` section. Everything below sat
on a different wash with no grid, so the hero's bottom edge read as a hard
horizontal line across the page.

**Spider-Verse dimension.** `.spiderverse-bg` declared `position: relative`.
That is one class selector, and it comes *after* Tailwind's `.fixed` utility in
source order, so it won â€” the full-viewport background collapsed to zero height
and the dimension fell back to the page body colour, with the comic panels
floating on a flat grey sheet.

Both are now a **single fixed layer per dimension** that covers the viewport at
every scroll position:

| Dimension | Layer |
| --- | --- |
| Normal | `AmbientBackground` â€” base wash, five drifting colour fields, masked grid, vignette |
| Spider-Verse | `.spiderverse-bg` + `.sv-sky` |

Fixed positioning is the whole point: the layers are outside document flow, so
no section boundary can clip them and no seam can exist. The grid is masked to
fade out before the viewport edge and the vignette darkens the corners, because
an unmasked grid terminates in a visible rectangle â€” the same seam in a
different form.

---

## 9. Dialogs are portalled, and why that matters here

Both project modals render through `createPortal(..., document.body)`.

This is not decoration. `content-visibility: auto` implies paint containment, and
an element with paint containment **becomes the containing block for its
`position: fixed` descendants**. A dialog written as a `fixed inset-0` overlay
in place therefore sizes itself to its ancestor section instead of the viewport:

```
normal dimension   overlay 1554px tall, top -100px  in a 900px window
Spider-Verse       overlay 1966px tall, top -100px  in a 900px window
```

Both project modals sat well below centre and overflowed the bottom of the
screen. Portalling escapes containment entirely, which is the correct structure
for a dialog regardless.

The underlying mistake was in the CSS, not the components. The optimisation was
written as bare ID selectors:

```css
#about, #skills, #projects, #contact { content-visibility: auto; }
```

Both dimensions reuse the same section IDs, so this silently applied to the
Spider-Verse sections too — an unintended side effect of an optimisation meant
for the other dimension. It is now scoped:

```css
[data-dimension="default"] #about, ... { content-visibility: auto; }
```

Two lessons worth keeping: scope an optimisation to the thing it was measured
on, and never let a dialog depend on ancestor containment.

---

## 10. Spider-Verse theming ("Night Run")

The Spider-Verse dimension ignored the site theme entirely. It was hard-coded to
white comic panels with black ink, so toggling dark mode left blazing white
panels on a near-black page.

**Design.** The dark palette is the Miles Morales night from *Into the
Spider-Verse*: deep indigo rather than neutral black, cyan neon panel edges
instead of flat black rules, a magenta offset shadow, and light ink on night
panels. Light theme keeps the classic white-paper comic.

**Implementation.** Everything resolves through a set of `--sv-*` surface and ink
tokens defined once in `spiderverse.css`. `.light-theme` re-points the same
tokens at the paper palette, so there is one set of rules and two themes.

The hard part was that the twelve Spider-Verse components use literal Tailwind
colour utilities rather than semantic classes: `text-black` 72 times, `bg-white`
41, `text-white` 39, `bg-black` 18, `border-black` 17, plus a tail of greys and
semantic callout colours â€” around 230 call sites.

Editing 230 sites is a large diff with a real chance of missing one, and a
missed one is invisible in review: the markup renders, just unstyled. So the
remap is done **once, centrally**, in a block scoped to
`[data-dimension="spiderverse"]`:

```css
[data-dimension="spiderverse"] .bg-white {
    background-color: var(--sv-surface);
}
```

Two class-level selectors beat Tailwind's single-class utility, so the remap
wins without `!important`, and the `data-dimension` scope means nothing leaks
into the normal dimension even though the stylesheet stays loaded after a switch.

**Trade-off.** The components still carry the hard-coded utilities, so a future
`bg-white` in a new Spider-Verse component needs a matching entry in the remap
block. In exchange the block is the single auditable place where the dimension's
palette lives. The alternative â€” converting all twelve components to semantic
classes â€” is the better end state and is the right follow-up if the dimension
grows.

---

## 11. Fonts: the trade-off worth recording

This one went back and forth, and the reasoning is preserved because the obvious
answer is wrong in both directions.

**The problem.** Cumulative layout shift was failing Core Web Vitals at 0.193.
Isolating the cause — by blocking the font CDN and re-measuring — dropped it to
0.014, so **93% of the shift was the webfont swap** re-flowing the flex-centred
hero when the real font replaced the fallback.

**First fix: `display=optional`.** The browser keeps the fallback for that page
view instead of swapping underneath the content. CLS fell to 0.010. But
`optional` means a first-time visitor on a slow connection *never sees the real
typography at all*, and on a portfolio whose impression is largely type, that
trades a metric for the thing the site is for.

**The fix that gets both: self-host.** `scripts/fetch-fonts.mjs` downloads the
latin subsets from Google Fonts into `public/fonts/` and generates
`src/fonts.css`. The files are same-origin, so the three faces used above the
fold are `preload`ed and start downloading in parallel with the HTML instead of
after a round trip to a third party. With `font-display: swap` they are normally
in place before first paint — so there is no visible swap, and therefore no
shift to suppress.

Measured at 4× CPU throttle on a cold cache:

| | CLS | LCP | FCP |
| --- | --- | --- | --- |
| CDN + `swap` (original) | 0.193 | — | — |
| CDN + `optional` | 0.010 | 0.79 s | 0.64 s |
| **self-hosted + `swap`** | **0.013** | **1.16 s** | **0.82 s** |

Same shift, real fonts, and no third-party requests at all. The LCP cost is the
honest trade: text is not painted in its final form until the font arrives.

Only the `latin` subset is shipped — 15 faces, ~293 kB total — and only three
files are preloaded. Preloading faces the first screen does not use would move
~29 kB ahead of the CSS and entry JS in the critical path.

---

## 12. Entrance animations and `fill-mode`

Every entrance animation in the project pairs an `opacity-0` utility (applied
while hidden) with an animation class and an inline `animationDelay` (applied
when revealed). Those animations were declared:

```css
animation: fade-in-up 0.8s ease-out forwards;
```

`forwards` only. During the delay the element renders with its **normal**
computed styles — fully visible — and then snaps back to `opacity: 0` as the
animation's `from` state takes over. Both contact forms blinked on first visit
as a result: hidden, fully visible for 100–400 ms, then hidden again, then a
fade in.

Adding `backwards`:

```css
animation: fade-in-up 0.8s ease-out backwards forwards;
```

makes the `from` state apply *during* the delay, so the staggered entrance works
as intended with no flash. Six declarations in `index.css` and two in
`spiderverse.css` were affected.

A related find: `.animate-panel-in` was referenced three times in
`SpiderverseContact` and defined nowhere, so those panels snapped in with no
animation at all. It now exists.

---

## 13. Generated assets

Two generators, both dependency-free, so the committed binaries can be
reproduced rather than trusted:

- `scripts/optimize-audio.mjs` â€” box-filtered downsampler and 16-bit WAV writer.
  Idempotent, and handles the `WAVE_FORMAT_EXTENSIBLE` header Mixkit files use.
- `scripts/generate-icons.mjs` â€” draws rounded rectangles and stroked glyphs
  from signed distance fields, composites a gradient, and writes RGBA PNG using
  only `node:zlib`. 4Ã—4 supersampling for antialiasing.

`scripts/og-image.html` is the source of the social card; the PNG is committed
so no build step is needed to serve it.

---

## 14. Testing

The suite deliberately targets places where a regression is **silent**:

| Target | Silent failure it catches |
| --- | --- |
| `useScrollReveal` | Every element stuck invisible; no console error |
| `soundEngine` | 5.73 MB reappearing on every page load |
| `projectsData` | A colour outside the Tailwind palette renders unstyled markup |
| `personalInfo` | A typo in an email or social URL is an invisible 404 |
| `validation` | Form rules drifting between the two dimensions |

There is no DOM snapshot testing. These components are decorative by design and
snapshots would churn on every visual tweak while catching nothing the
assertions above do not.

---

## 15. Known trade-offs

- **Google Fonts over self-hosting.** Self-hosting removes a third-party
  connection and the render-blocking risk, at the cost of several hundred kB of
  font binaries in the repository plus a process to keep them in sync.
  Superseded — the fonts are self-hosted now; see §11.
- **`spiderverse.css` duplicates visual rules** that `index.css` also has. This
  is the cost of the two-dimension model and is the reason the stylesheet is
  split out rather than shared.
- **`font-[Bangers]` and similar arbitrary values** appear in class names, so
  Tailwind cannot verify them statically. They resolve because the literal
  family name is in the string; a rename of the font would break them silently.
- **No error boundary per section.** There is one at the root, which turns a
  chunk-load failure into a reload button. Per-section boundaries would let more
  of the page survive a failure, at the cost of more fallback UI to design.
