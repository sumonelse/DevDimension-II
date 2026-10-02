import { readFileSync, readdirSync, writeFileSync, statSync } from "node:fs"
import { join } from "node:path"

const dir = process.argv[2]
for (const name of readdirSync(dir).sort()) {
    const buf = readFileSync(join(dir, name))
    const channels = buf.readUInt16LE(22)
    const sampleRate = buf.readUInt32LE(24)
    const bits = buf.readUInt16LE(34)
    const size = statSync(join(dir, name)).size
    const seconds = ((size - 44) / (sampleRate * channels * (bits / 8))).toFixed(2)
    console.log(
        `${name.padEnd(58)} ${String(size).padStart(8)} B  ${channels}ch  ${sampleRate} Hz  ${bits}-bit  ${seconds}s`
    )
}