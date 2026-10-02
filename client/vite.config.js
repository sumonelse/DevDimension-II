import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(() => ({
    plugins: [react()],

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