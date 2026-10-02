# DevDimension-II

A portfolio site with two interchangeable visual identities. The default is a
dark, glassmorphic developer portfolio; a floating control tears a portal open
into a Spider-Verse dimension rendered as comic-book panels, with its own
soundtrack, cursor and post-credit scene.

Live: **<https://sumitmaurya.dev>**

---

## Quick start

```bash
cd client
npm install
npm run dev        # http://localhost:5173
```

### Environment

```bash
cp .env.example .env
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_FORMSPARK_ACTION_URL` | for the contact form | Formspark endpoint. Without it the form renders and validates, then reports that it is unconfigured instead of POSTing to `undefined`. |

---

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Vitest, single run |
| `npm run test:watch` | Vitest in watch mode |
| `npm run lint` | ESLint across the project |
| `npm run check` | **lint + test + build** — the one gate that matters |
| `npm run optimize:audio` | Re-encode `public/audio/*.wav` to 22.05 kHz mono |
| `npm run generate:icons` | Regenerate the manifest icons from geometry |
| `npm run inspect:audio` | Report format and size of the sound effects |

---

## Project layout

```
client/
├── index.html                  Meta, JSON-LD, non-blocking font load
├── public/
│   ├── audio/                  Sound effects (generated, see scripts/)
│   ├── icons/                  PWA icon set, including generated ones
│   ├── manifest.json
│   ├── og-image.png            1200x630 social card
│   ├── robots.txt
│   ├── sitemap.xml
│   └── sw.js                   Offline cache (runtime, not precached)
├── scripts/
│   ├── generate-icons.mjs      Dependency-free PNG rasteriser
│   ├── inspect-audio.mjs       Audio format report
│   ├── og-image.html           Source for og-image.png
│   └── optimize-audio.mjs      WAV downsampler
└── src/
    ├── App.jsx                 Dimension fork + deferred section loading
    ├── assets/icons/           Icon components
    ├── components/             ~45 components, two parallel sets
    ├── context/                ThemeContext, DimensionContext
    ├── data/projectsData.js    Project content
    ├── hooks/                  Reusable behaviour
    ├── test/setup.js           Test environment shims
    └── utils/                  Pure helpers, no React
```

### Component naming

The two dimensions use parallel naming, which is the main thing to know when
navigating this codebase:

| Normal dimension | Spider-Verse equivalent |
| --- | --- |
| `Navbar` | `SpiderverseNavbar` |
| `Hero`, `About`, `Skills` | `SpiderverseHero`, … |
| `Projects`, `Contact`, `Footer` | `SpiderverseProjects`, … |
| `ProjectModal` | `SpiderverseProjectModal` |
| `CustomCursor` | `SpiderverseCursor` |

---

## Performance

The site is built around a few decisions that are easy to undo by accident.

**Nothing is fetched until it is needed.** The sound effects are 1.38 MB and
`SpiderverseAudio` mounts only inside the Spider-Verse dimension;
`src/utils/soundEngine.js` then builds each `Audio` element on first use. A
visitor who never switches dimension downloads none of it. Before this, all
5.73 MB was downloaded by every visitor on every page load.

**Below-the-fold sections are code-split.** `Contact` alone is ~39 kB rendered
and is invisible on the first screen. `DeferredSection` mounts sections behind
an `IntersectionObserver` sentinel with a reserved placeholder height.

**Spider-Verse styles are not in the critical path.** `spiderverse.css` is
imported dynamically by `src/utils/dimensionStyles.js`, at idle if the visitor
is in the normal dimension and immediately if they were last in Spider-Verse.

**Per-frame work avoids React.** Both custom cursors, the parallax layers and
the scroll spy write transforms and CSS custom properties inside a single
`requestAnimationFrame`. No component re-renders on pointer movement.

**Reveal animations use one `IntersectionObserver`.** No scroll handler, and no
`MutationObserver` on class attributes. The pixel reveal distance is encoded as
a bottom `rootMargin` — see the note in `useScrollReveal.js` for why testing it
against the bounding rect instead silently breaks every element.

### Bundle budget

Run `npm run check` after touching anything in the critical path. Current
production figures:

| Artifact | Raw | gzip |
| --- | --- | --- |
| `index-*.js` (entry) | 79.75 kB | 23.67 kB |
| `react-vendor-*.js` | 182.90 kB | 57.69 kB |
| `index-*.css` (critical) | 133.52 kB | 21.86 kB |
| `spiderverse-*.css` (on demand) | 24.28 kB | 5.13 kB |
| `index.html` | 6.61 kB | 2.09 kB |

The entry chunk was 303.45 kB (84.90 kB gzip) before this work.

`chunkSizeWarningLimit` is set to 500 kB and `reportCompressedSize` is on, so a
chunk that quietly grows fails the build review rather than shipping.

---

## Accessibility

- `prefers-reduced-motion` is honoured globally: a CSS override plus hooks that
  disable the custom cursors, the parallax layers and the glitch loop.
- The custom cursors only hide the native pointer while they are actually
  mounted, and never over text fields, so a caret is always visible.
- Both project modals trap focus, restore it on close, and expose
  `role="dialog"` / `aria-modal` / `aria-labelledby`.
- There is a skip-to-content link and a real `<main>` landmark.
- Form errors are wired to their inputs with `aria-invalid` /
  `aria-describedby`, marked `role="alert"`, and results are announced through
  an `aria-live` region.
- Submit buttons stay enabled when the form is incomplete — a disabled button
  cannot explain itself.

---

## Testing

65 tests over the parts where a regression is silent rather than loud:

- `utils/validation` — the contact form rules
- `utils/soundEngine` — laziness, player sharing, autoplay unlock, mute
- `hooks/useScrollReveal` — the observer configuration that broke the site
- `data/projectsData` — colours and categories must exist in the Tailwind
  palette, or the markup renders unstyled with no error
- `utils/personalInfo` — contact details are interpolated into `href`s

---

## Regenerating assets

**Sound effects** are committed as 22.05 kHz mono WAV, produced by
`npm run optimize:audio`. It is idempotent and needs no ffmpeg. The originals
are 44.1 kHz and remain in git history.

**Icons** are computed, not hand-drawn binaries. `npm run generate:icons`
rasterises rounded rectangles and stroked glyphs from signed distance fields and
writes real PNGs using only Node's `zlib`.

**The social card** is `scripts/og-image.html`. Render it at 1200×630 with a
headless browser to reproduce `public/og-image.png`.

---

## Licence and credits

Sound effects are from [Mixkit](https://mixkit.co/free-sound-effects/) under
the Mixkit Sound Effects Free Licence. The "DEV DIMENSION II" concept and
Spider-Verse theming is a fan tribute; Spider-Man and associated characters are
trademarks of Marvel Characters, Inc. This project is not affiliated with or
endorsed by Marvel.
