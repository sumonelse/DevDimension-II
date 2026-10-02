#!/usr/bin/env node
/**
 * Shrink the uncompressed WAV sound effects.
 *
 * The originals are Mixkit-licensed 44.1 kHz WAV files totalling 5.7 MB. These
 * are ambience loops, whooshes and interface hits - material that carries no
 * value above ~11 kHz and no meaningful stereo image, so they are re-encoded as
 * 22.05 kHz mono 16-bit. That is a ~4x reduction with no encoder dependency,
 * which matters because none of these files is in the critical path any more:
 * they are only fetched if a visitor actually enters the Spider-Verse dimension
 * and triggers a sound.
 *
 * Usage:
 *   node scripts/optimize-audio.mjs              # rewrite in place
 *   node scripts/optimize-audio.mjs --dry-run    # report savings only
 *
 * The originals are preserved in git history, and Mixkit's licence permits
 * modification.
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs"
import { join, extname } from "node:path"

const DRY_RUN = process.argv.includes("--dry-run")
const TARGET_RATE = 22050
const CHANNELS = 1
const BITS = 16
const AUDIO_DIR = join(process.cwd(), "public", "audio")

/** Locate the `fmt ` and `data` chunks so extra metadata blocks are skipped. */
const parseChunks = (buffer) => {
    let offset = 12
    let format = null
    let data = null

    while (offset + 8 <= buffer.length) {
        const id = buffer.toString("ascii", offset, offset + 4)
        const size = buffer.readUInt32LE(offset + 4)
        const body = offset + 8

        if (id === "fmt ") {
            format = {
                audioFormat: buffer.readUInt16LE(body),
                channels: buffer.readUInt16LE(body + 2),
                sampleRate: buffer.readUInt32LE(body + 4),
                bitsPerSample: buffer.readUInt16LE(body + 14),
            }
            // 0xFFFE is WAVE_FORMAT_EXTENSIBLE; the real format is the first two
            // bytes of the SubFormat GUID that follows the standard 16 bytes.
            if (format.audioFormat === 0xfffe && size >= 40) {
                format.audioFormat = buffer.readUInt16LE(body + 24)
            }
        } else if (id === "data") {
            data = { start: body, size }
        }

        // Chunks are word-aligned.
        offset = body + size + (size % 2)
    }

    if (!format || !data) throw new Error("not a PCM WAV file")
    if (format.audioFormat !== 1) {
        throw new Error(`unsupported WAV encoding ${format.audioFormat} (PCM only)`)
    }

    return { format, data }
}

/** Read interleaved PCM into a Float32Array in the -1..1 range. */
const readSamples = (buffer, { data, format }) => {
    const { channels, bitsPerSample } = format
    const bytesPerSample = bitsPerSample / 8
    const frameCount = Math.floor(data.size / (bytesPerSample * channels))
    const samples = new Float32Array(frameCount)

    for (let frame = 0; frame < frameCount; frame++) {
        for (let channel = 0; channel < channels; channel++) {
            const position =
                data.start + (frame * channels + channel) * bytesPerSample

            let value
            if (bitsPerSample === 16) {
                value = buffer.readInt16LE(position) / 32768
            } else if (bitsPerSample === 24) {
                const b0 = buffer[position]
                const b1 = buffer[position + 1]
                const b2 = buffer.readInt8(position + 2)
                value = ((b2 << 16) | (b1 << 8) | b0) / 8388608
            } else if (bitsPerSample === 32) {
                value = buffer.readInt32LE(position) / 2147483648
            } else {
                throw new Error(`unsupported bit depth ${bitsPerSample}`)
            }

            samples[frame] += value / channels
        }
    }

    return samples
}

/**
 * Downsample with a box filter, so content folded back above the new Nyquist
 * limit is averaged out instead of aliasing.
 */
const resample = (samples, fromRate, toRate) => {
    if (toRate >= fromRate) return samples

    const ratio = fromRate / toRate
    const outLength = Math.floor(samples.length / ratio)
    const out = new Float32Array(outLength)
    const halfWidth = Math.floor(ratio / 2)

    for (let i = 0; i < outLength; i++) {
        const center = i * ratio
        const start = Math.max(0, Math.ceil(center - halfWidth))
        const end = Math.min(samples.length, Math.floor(center + halfWidth) + 1)

        let sum = 0
        for (let j = start; j < end; j++) sum += samples[j]

        out[i] = sum / (end - start)
    }

    return out
}

const writeWav = (samples, sampleRate) => {
    const dataSize = samples.length * (BITS / 8)
    const buffer = Buffer.alloc(44 + dataSize)

    buffer.write("RIFF", 0, "ascii")
    buffer.writeUInt32LE(36 + dataSize, 4)
    buffer.write("WAVE", 8, "ascii")
    buffer.write("fmt ", 12, "ascii")
    buffer.writeUInt32LE(16, 16)
    buffer.writeUInt16LE(1, 20)
    buffer.writeUInt16LE(CHANNELS, 22)
    buffer.writeUInt32LE(sampleRate, 24)
    buffer.writeUInt32LE((sampleRate * CHANNELS * BITS) / 8, 28)
    buffer.writeUInt16LE((CHANNELS * BITS) / 8, 32)
    buffer.writeUInt16LE(BITS, 34)
    buffer.write("data", 36, "ascii")
    buffer.writeUInt32LE(dataSize, 40)

    for (let i = 0; i < samples.length; i++) {
        const clamped = Math.max(-1, Math.min(1, samples[i]))
        buffer.writeInt16LE(Math.round(clamped * 32767), 44 + i * 2)
    }

    return buffer
}

const formatSize = (bytes) => `${(bytes / 1024).toFixed(0).padStart(6)} kB`

let before = 0
let after = 0

for (const name of readdirSync(AUDIO_DIR).sort()) {
    if (extname(name) !== ".wav") continue

    const path = join(AUDIO_DIR, name)
    const original = readFileSync(path)
    const originalSize = original.length
    const parsed = parseChunks(original)
    const { format } = parsed

    const isAlreadyOptimal =
        format.sampleRate === TARGET_RATE &&
        format.channels === CHANNELS &&
        format.bitsPerSample === BITS

    if (isAlreadyOptimal) {
        before += originalSize
        after += originalSize
        console.log(
            `${name.padEnd(56)} ${formatSize(originalSize)}  already optimal`
        )
        continue
    }

    const samples = resample(
        readSamples(original, parsed),
        format.sampleRate,
        TARGET_RATE
    )
    const encoded = writeWav(samples, TARGET_RATE)

    before += originalSize
    after += encoded.length

    console.log(
        `${name.padEnd(56)} ${formatSize(originalSize)} -> ${formatSize(encoded.length)}` +
            `  (${format.sampleRate} Hz ${format.channels}ch ${format.bitsPerSample}-bit` +
            ` -> ${TARGET_RATE} Hz ${CHANNELS}ch ${BITS}-bit)`
    )

    if (!DRY_RUN) writeFileSync(path, encoded)
}

const saved = ((1 - after / before) * 100).toFixed(1)
console.log(
    `\nTotal: ${formatSize(before)} -> ${formatSize(after)}  (-${saved}%)` +
        (DRY_RUN ? "  [dry run, nothing written]" : "")
)