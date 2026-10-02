import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

/**
 * Bakes the critical build output into the service worker's precache list.
 *
 * The worker lives in `public/` and is copied verbatim, so it cannot know the
 * content-hashed filenames Vite is about to emit. This plugin runs after the
 * bundle is written and substitutes the real list for a placeholder.
 *
 * Only what is needed to paint and hydrate the first screen is included: the
 * entry chunk, the vendor chunk and the stylesheets. The ~20 lazy chunks are
 * deliberately left out - they are cached opportunistically at runtime instead,
 * which keeps install fast instead of pulling the whole app down on every first
 * visit.
 */
const precacheManifest = () => ({
    name: "precache-manifest",
    apply: "build",
    writeBundle(_options, bundle) {
        const precache = new Set()

        for (const [fileName, chunk] of Object.entries(bundle)) {
            if (chunk.type !== "chunk" && chunk.type !== "asset") continue

            // Stylesheets are small enough to always include, and the
            // Spider-Verse one is what the second dimension needs offline.
            if (fileName.endsWith(".css")) {
                precache.add(`/${fileName}`)
                continue
            }

            if (chunk.type === "chunk") {
                if (chunk.isEntry || chunk.name === "react-vendor") {
                    precache.add(`/${fileName}`)
                }
            }
        }

        const swPath = resolve(process.cwd(), "dist", "sw.js")
        let source
        try {
            source = readFileSync(swPath, "utf8")
        } catch {
            // No public/sw.js in this build; nothing to do.
            return
        }

        if (!source.includes("self.__DD2_PRECACHE__")) return

        writeFileSync(
            swPath,
            source.replace(
                "self.__DD2_PRECACHE__",
                JSON.stringify([...precache].sort())
            )
        )
    },
})

export default defineConfig(() => ({
    plugins: [react(), precacheManifest()],

    build: {
        // `target` is left at Vite's `baseline-widely-available` default on
        // purpose. Pinning it to es2020 downlevels syntax that every currently
        // supported browser already ships, which makes the output *larger*.
        sourcemap: false,

        // Show gzip sizes so bundle regressions are visible, and fail loudly
        // rather than shipping a chunk that quietly grew by 100 kB.
        reportCompressedSize: true,
        chunkSizeWarningLimit: 500,

        // Strip the per-build React banner and any leftover `/*! */` comments.
        esbuild: { legalComments: "none" },

        assetsInlineLimit: 4096,

        rollupOptions: {
            output: {
                /**
                 * Split on resolved file paths, not on the bare specifiers used in
                 * the import statement.
                 *
                 * The previous config used the object form, keyed on `"react-dom"`,
                 * which silently matched nothing: `react-dom/client` resolves to a
                 * directory, so react-dom was bundled into the 303 kB entry chunk
                 * while the "react-vendor" chunk held only `react` (11 kB).
                 */
                manualChunks(id) {
                    if (!id.includes("node_modules")) {
                        // Let Rollup keep each `React.lazy` component in its own
                        // chunk. Grouping the Spider-Verse components by hand
                        // forced all eleven to download together even though the
                        // dimension only mounts a subset.
                        return undefined
                    }

                    if (
                        id.includes("react-dom") ||
                        id.includes("/react/") ||
                        id.includes("/react\\") ||
                        id.includes("scheduler")
                    ) {
                        return "react-vendor"
                    }

                    return "vendor"
                },
            },
        },

        minify: "terser",
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                // Two passes measurably shrinks the entry chunk.
                passes: 2,
            },
            format: { comments: false },
        },
    },

    server: {
        hmr: true,
    },
}))