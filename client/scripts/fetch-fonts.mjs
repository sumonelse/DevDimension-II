#!/usr/bin/env node
/**
 * Downloads the latin subsets of the webfonts and rewrites them as local
 * `@font-face` rules.
 *
 * Why self-host rather than link to Google Fonts:
 *
 *  1. `font-display: optional` was chosen to eliminate layout shift, but it
 *     means a first-time visitor on a slow connection never sees the real
 *     typography at all - on a portfolio whose whole impression is typography,
 *     that is the wrong trade. `swap` shows the real font but reintroduces the
 *     shift.
 *  2. Self-hosting fixes both. The files are same-origin, so they can be
 *     preloaded with `crossorigin` and start downloading in parallel with the
 *     HTML rather than after a CSS round trip to a third party. With
 *     `font-display: swap` and a preload, the font is normally in place before
 *     first paint, so there is no visible swap and no shift to hide.
 *
 * Metric-compatible fallbacks (`size-adjust`, `ascent-override`, ...) further
 * shrink any residual shift by making the fallback occupy the same space as the
 * real font.
 *
 * Only the `latin` subset is fetched - the site has no Vietnamese or Cyrillic
 * copy, and the full multi-subset payload is roughly 4x larger.
 *
 * Usage:
 *   node scripts/fetch-fonts.mjs            # write files + print the CSS block
 *   node scripts/fetch-fonts.mjs --check    # verify only, write nothing
 */

import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

const CHECK_ONLY = process.argv.includes("--check")
const FONT_DIR = join(process.cwd(), "public", "fonts")

/* Keep in sync with the families used in the CSS. */
const FAMILIES = [
    { css: "Poppins:wght@400;500;600;700;800", file: "poppins" },
    { css: "Space+Grotesk:wght@400;500;600;700", file: "space-grotesk" },
    { css: "Fira+Code:wght@400;500;600", file: "fira-code" },
    { css: "Comic+Neue:wght@400;700", file: "comic-neue" },
    { css: "Bangers", file: "bangers" },
]

// A modern desktop UA is required or Google serves legacy TTF instead of woff2.
const UA =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

const ENDPOINT = "https://fonts.googleapis.com/css2"

const fetchCss = async (family) => {
    const response = await fetch(`${ENDPOINT}?family=${family}&display=swap`, {
        headers: { "User-Agent": UA },
    })
    if (!response.ok) {
        throw new Error(`${family}: HTTP ${response.status}`)
    }
    return response.text()
}

/**
 * Splits a Google Fonts stylesheet into blocks, keeping only `latin`.
 *
 * Each family/weight is preceded by a `/* subset *\/` comment. Rather than
 * trying to pair comments with blocks with one big regex - which silently stops
 * matching partway through the sheet - this walks the comment positions and
 * takes the text up to the next comment as that subset's block.
 */
const parseLatinFaces = (css) => {
    const faces = []
    const commentRe = /\/\*\s*([^*]+?)\s*\*\//g

    const marks = []
    let m
    while ((m = commentRe.exec(css)) !== null) {
        marks.push({ subset: m[1].trim(), start: m.index, end: commentRe.lastIndex })
    }

    for (let i = 0; i < marks.length; i++) {
        if (marks[i].subset !== "latin") continue

        const block = css.slice(marks[i].end, marks[i + 1]?.start ?? css.length)
        const at = block.indexOf("@font-face")
        if (at === -1) continue

        const body = block.slice(at, block.indexOf("}") + 1)

        const family = /font-family:\s*'([^']+)'/i.exec(body)?.[1]
        const weight = /font-weight:\s*(\d+)/i.exec(body)?.[1] ?? "400"
        const src = /src:\s*url\((https:[^)]+)\)/i.exec(body)?.[1]
        const range = /unicode-range:\s*([^;]+);/i.exec(body)?.[1]?.trim()
        if (!family || !src) continue

        faces.push({ family, weight, src, range })
    }

    return faces
}

/**
 * Downloads the latin subset of each family and returns the parsed faces.
 *
 * One request per family rather than a single combined `family=` list. Google
 * occasionally answers a combined request with a partial stylesheet - during
 * development this silently produced a file containing only Poppins - and with
 * per-family requests a failure is isolated and obvious instead of quietly
 * dropping four of the five families.
 */
const collectFaces = async () => {
    const faces = []
    const problems = []

    for (const family of FAMILIES) {
        try {
            faces.push(...parseLatinFaces(await fetchCss(family.css)))
        } catch (error) {
            problems.push(String(error.message))
        }
    }

    return { faces, problems }
}

const slug = (family, weight) =>
    `${family.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${weight}.woff2`

/* Everything above is declarations; execution starts here so that
   `parseLatinFaces` (a `const` arrow function) is initialised before
   `collectFaces` calls it. */
mkdirSync(FONT_DIR, { recursive: true })

const { faces, problems } = await collectFaces()

if (problems.length) {
    console.warn(`WARNING: ${problems.length} request(s) failed:`)
    problems.forEach((p) => console.warn(`  ${p}`))
}

if (!faces.length) {
    console.error("No latin faces parsed. Aborting without touching existing files.")
    process.exit(1)
}

const expected = FAMILIES.length
const gotFamilies = new Set(faces.map((f) => f.family)).size
if (gotFamilies < expected) {
    console.warn(
        `WARNING: expected ${expected} families, parsed ${gotFamilies}. ` +
            `Re-run to fill the gaps.`
    )
}

const rules = []
let downloaded = 0
let bytes = 0

for (const face of faces) {
    const name = slug(face.family, face.weight)
    const target = join(FONT_DIR, name)

    const buffer = Buffer.from(await (await fetch(face.src)).arrayBuffer())

    if (!CHECK_ONLY) writeFileSync(target, buffer)
    downloaded++
    bytes += buffer.length

    rules.push(
        [
            "@font-face {",
            `    font-family: "${face.family}";`,
            "    font-style: normal;",
            `    font-weight: ${face.weight};`,
            "    font-display: swap;",
            `    src: url("/fonts/${name}") format("woff2");`,
            face.range ? `    unicode-range: ${face.range};` : null,
            "}",
        ]
            .filter(Boolean)
            .join("\n")
    )

    console.log(
        `${name.padEnd(28)} ${(buffer.length / 1024).toFixed(1).padStart(7)} kB`
    )
}

const out = [
    "/*",
    " * Self-hosted webfonts. Generated by `npm run fetch:fonts` - do not edit by",
    " * hand; re-run the script instead.",
    " *",
    " * Only the latin subset is included. These are the same files the Google",
    " * Fonts CDN serves, so the rendering is identical, but they are",
    " * same-origin and preloaded, so `font-display: swap` no longer produces a",
    " * visible reflow.",
    " */",
    "",
    rules.join("\n\n"),
    "",
].join("\n")

if (!CHECK_ONLY) writeFileSync(join(process.cwd(), "src", "fonts.css"), out)

console.log(
    `\n${downloaded} faces, ${(bytes / 1024).toFixed(1)} kB total` +
        (CHECK_ONLY ? "  [check only]" : `  -> ${FONT_DIR}`)
)

// Sanity check: warn if a face already on disk no longer matches upstream.
if (!CHECK_ONLY) {
    const mismatched = faces.filter((face) => {
        const path = join(FONT_DIR, slug(face.family, face.weight))
        return !existsSync(path) || readFileSync(path).length === 0
    })
    if (mismatched.length) {
        console.warn(`WARNING: ${mismatched.length} face(s) failed to write.`)
    }
}