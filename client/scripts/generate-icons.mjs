#!/usr/bin/env node
/**
 * Generates the web-app manifest shortcut icons.
 *
 * The manifest referenced `icons/projects-icon.png` and
 * `icons/contact-icon.png`, neither of which existed, so both shortcuts were
 * dead links. Rather than check in opaque binaries with no way to reproduce
 * them, they are drawn here from the same geometry as `favicon.svg`: a
 * purple-to-pink gradient tile with a rounded-rect mask and a white glyph.
 *
 * Everything is computed - gradients, rounded corners, thick round-capped
 * strokes - from signed distance fields, so there is no image library, no
 * headless browser and no binary asset in the repository to trust. Output is a
 * plain RGBA PNG written with Node's built-in zlib.
 *
 * Usage:
 *   node scripts/generate-icons.mjs            # write into public/icons
 *   node scripts/generate-icons.mjs --dry-run  # report only
 */

import { deflateSync } from "node:zlib"
import { writeFileSync } from "node:fs"
import { join } from "node:path"

const DRY_RUN = process.argv.includes("--dry-run")
const OUT_DIR = join(process.cwd(), "public", "icons")

/* The gradient stops match favicon.svg. */
const GRADIENT_FROM = [0x7c, 0x3a, 0xed] // purple-600
const GRADIENT_TO = [0xec, 0x48, 0x99] // pink-500

/* 4x4 supersampling: enough to make the rounded corners and stroke caps
   smooth without an antialiasing library. */
const SAMPLES = 4

/* ---------------------------------------------------------------- geometry */

/** Signed distance from a point to a rounded rectangle centred on the origin. */
const roundedRectSdf = (px, py, halfW, halfH, radius) => {
    const qx = Math.abs(px) - (halfW - radius)
    const qy = Math.abs(py) - (halfH - radius)
    const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0))
    return outside + Math.min(Math.max(qx, qy), 0) - radius
}

/** Signed distance from a point to a thick line segment with round caps. */
const segmentSdf = (px, py, ax, ay, bx, by, halfWidth) => {
    const pax = px - ax
    const pay = py - ay
    const bax = bx - ax
    const bay = by - ay
    const dot = pax * bax + pay * bay
    const lengthSq = bax * bax + bay * bay
    const t = lengthSq === 0 ? 0 : Math.max(0, Math.min(1, dot / lengthSq))
    const cx = pax - bax * t
    const cy = pay - bay * t
    return Math.hypot(cx, cy) - halfWidth
}

/* ------------------------------------------------------------------- PNG */

const CRC_TABLE = (() => {
    const table = new Int32Array(256)
    for (let n = 0; n < 256; n++) {
        let c = n
        for (let k = 0; k < 8; k++) {
            c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
        }
        table[n] = c
    }
    return table
})()

const crc32 = (buffer) => {
    let c = 0xffffffff
    for (let i = 0; i < buffer.length; i++) {
        c = CRC_TABLE[(c ^ buffer[i]) & 0xff] ^ (c >>> 8)
    }
    return (c ^ 0xffffffff) >>> 0
}

const chunk = (type, data) => {
    const length = Buffer.alloc(4)
    length.writeUInt32BE(data.length)
    const body = Buffer.concat([Buffer.from(type, "ascii"), data])
    const crc = Buffer.alloc(4)
    crc.writeUInt32BE(crc32(body))
    return Buffer.concat([length, body, crc])
}

const encodePng = (width, height, rgba) => {
    const header = Buffer.alloc(13)
    header.writeUInt32BE(width, 0)
    header.writeUInt32BE(height, 4)
    header[8] = 8 // bit depth
    header[9] = 6 // colour type: RGBA
    header[10] = 0 // deflate
    header[11] = 0 // adaptive filtering
    header[12] = 0 // no interlace

    // Each scanline is prefixed with its filter type; 0 (None) keeps the
    // encoder trivial and compresses fine for flat colour art.
    const raw = Buffer.alloc(height * (width * 4 + 1))
    for (let y = 0; y < height; y++) {
        const rowStart = y * (width * 4 + 1)
        raw[rowStart] = 0
        rgba.copy(raw, rowStart + 1, y * width * 4, (y + 1) * width * 4)
    }

    return Buffer.concat([
        Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
        chunk("IHDR", header),
        chunk("IDAT", deflateSync(raw, { level: 9 })),
        chunk("IEND", Buffer.alloc(0)),
    ])
}

/* ----------------------------------------------------------------- raster */

const mix = (a, b, t) => [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
]

/**
 * Rasterise a tile.
 *
 * @param {number} size Output edge length in pixels.
 * @param {(x: number, y: number) => number} glyphSdf Returns a signed distance
 *   in normalised units; negative is inside the glyph.
 */
const renderTile = (size, glyphSdf, { fullBleed = false, glyphScale = 1 } = {}) => {
    const rgba = Buffer.alloc(size * size * 4)
    const step = 1 / SAMPLES
    const offset = step / 2

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            let tileHits = 0
            let glyphHits = 0

            for (let sy = 0; sy < SAMPLES; sy++) {
                for (let sx = 0; sx < SAMPLES; sx++) {
                    // Normalise to [-1, 1] with the origin at the centre.
                    const px = ((x + sx * step + offset) / size) * 2 - 1
                    const py = ((y + sy * step + offset) / size) * 2 - 1

                    if (fullBleed) {
                        // A maskable icon is cropped by the platform, so the
                        // background has to reach every edge.
                        tileHits++
                    } else if (roundedRectSdf(px, py, 0.98, 0.98, 0.44) <= 0) {
                        tileHits++
                    }

                    if (glyphSdf(px * glyphScale, py * glyphScale) <= 0) glyphHits++
                }
            }

            const total = SAMPLES * SAMPLES
            const tileAlpha = tileHits / total
            const glyphAlpha = glyphHits / total

            if (tileAlpha === 0) continue

            // Gradient runs corner to corner, matching favicon.svg.
            const t = (x / size + y / size) / 2
            const [r, g, b] = mix(GRADIENT_FROM, GRADIENT_TO, t)

            // Composite the white glyph over the gradient.
            const a = glyphAlpha
            const out = mix([r, g, b], [255, 255, 255], a)

            const i = (y * size + x) * 4
            rgba[i] = Math.round(out[0])
            rgba[i + 1] = Math.round(out[1])
            rgba[i + 2] = Math.round(out[2])
            rgba[i + 3] = Math.round(tileAlpha * 255)
        }
    }

    return encodePng(size, size, rgba)
}

/* ------------------------------------------------------------------ glyphs */

/** A stroked polyline glyph, as a list of segments. */
const strokeGlyph = (segments, halfWidth) => (px, py) => {
    let distance = Infinity
    for (const [ax, ay, bx, by] of segments) {
        distance = Math.min(distance, segmentSdf(px, py, ax, ay, bx, by, halfWidth))
    }
    return distance
}

/* Three squares, the conventional "projects" glyph. */
const PROJECTS_GLYPH = strokeGlyph(
    [
        [-0.42, -0.42, -0.06, -0.42],
        [-0.06, -0.42, -0.06, -0.06],
        [-0.06, -0.06, -0.42, -0.06],
        [-0.42, -0.06, -0.42, -0.42],

        [0.06, -0.42, 0.42, -0.42],
        [0.42, -0.42, 0.42, -0.06],
        [0.42, -0.06, 0.06, -0.06],
        [0.06, -0.06, 0.06, -0.42],

        [-0.42, 0.06, -0.06, 0.06],
        [-0.06, 0.06, -0.06, 0.42],
        [-0.06, 0.42, -0.42, 0.42],
        [-0.42, 0.42, -0.42, 0.06],

        [0.06, 0.06, 0.42, 0.06],
        [0.42, 0.06, 0.42, 0.42],
        [0.42, 0.42, 0.06, 0.42],
        [0.06, 0.42, 0.06, 0.06],
    ],
    0.055
)

/* An envelope: the conventional "contact" glyph. */
const CONTACT_GLYPH = strokeGlyph(
    [
        [-0.5, -0.28, 0.5, -0.28],
        [0.5, -0.28, 0.5, 0.3],
        [0.5, 0.3, -0.5, 0.3],
        [-0.5, 0.3, -0.5, -0.28],

        [-0.5, -0.28, 0, 0.06],
        [0, 0.06, 0.5, -0.28],
    ],
    0.055
)

/* The `</>` mark from favicon.svg, in the same [-1, 1] coordinate space. */
const LOGO_GLYPH = strokeGlyph(
    [
        [-0.344, 0.344, -0.5625, 0.125],
        [-0.5625, 0.125, -0.344, -0.094],

        [0.344, -0.094, 0.5625, 0.125],
        [0.5625, 0.125, 0.344, 0.344],

        [0.125, -0.3125, -0.125, 0.5625],
    ],
    0.0625
)

/* ------------------------------------------------------------------- main */

const ICONS = [
    { name: "projects-icon.png", size: 192, glyph: PROJECTS_GLYPH },
    { name: "contact-icon.png", size: 192, glyph: CONTACT_GLYPH },
    {
        // Android crops maskable icons to a circle inscribed in the middle 80%,
        // so the mark is scaled down and the background runs full bleed.
        name: "maskable-512x512.png",
        size: 512,
        glyph: LOGO_GLYPH,
        options: { fullBleed: true, glyphScale: 1.45 },
    },
]

for (const { name, size, glyph, options } of ICONS) {
    const png = renderTile(size, glyph, options)
    const path = join(OUT_DIR, name)

    console.log(
        `${name.padEnd(22)} ${size}x${size}  ${(png.length / 1024).toFixed(1)} kB` +
            (DRY_RUN ? "  [dry run]" : "")
    )

    if (!DRY_RUN) writeFileSync(path, png)
}
