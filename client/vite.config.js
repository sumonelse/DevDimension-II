import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        // Optimize chunk size
        chunkSizeWarningLimit: 800,
        rollupOptions: {
            output: {
                // Separate vendor chunks
                manualChunks: {
                    "react-vendor": ["react", "react-dom"],
                    spiderverse: [
                        "./src/components/SpiderverseNavbar.jsx",
                        "./src/components/SpiderverseHero.jsx",
                        "./src/components/SpiderverseAbout.jsx",
                        "./src/components/SpiderverseSkills.jsx",
                        "./src/components/SpiderverseProjects.jsx",
                        "./src/components/SpiderverseContact.jsx",
                        "./src/components/SpiderverseFooter.jsx",
                        "./src/components/SpiderverseBackground.jsx",
                        "./src/components/SpiderverseCursor.jsx",
                        "./src/components/FloatingComicPanels.jsx",
                        "./src/components/SpiderverseAudio.jsx",
                    ],
                },
            },
        },
        // Enable source map for production
        sourcemap: false,
        // Minify options
        minify: "terser",
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
    // Optimize dev server
    server: {
        hmr: true,
    },
})
