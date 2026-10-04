import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./fonts.css" // Self-hosted @font-face, must precede anything using it
import "./critical.css" // Load critical CSS first
import "./index.css"
import App from "./App.jsx"
import ErrorBoundary from "./components/ErrorBoundary"
import { ThemeProvider } from "./context/ThemeContext"
import { DimensionProvider } from "./context/DimensionContext"
import { initPerformanceMonitoring } from "./utils/performance"
import soundEngine from "./utils/soundEngine"
import { loadDimensionStyles } from "./utils/dimensionStyles"
import { registerServiceWorker } from "./utils/serviceWorkerRegistration"

if (import.meta.env.DEV) {
    initPerformanceMonitoring()
}

// Browsers only allow audio after a user gesture, so arm the unlock listener
// before anything can try to make a sound.
soundEngine.watchForFirstGesture()

// Spider-Verse styles are ~1.5k lines that the normal dimension never uses.
// They are fetched on demand when the dimension is entered (or restored).
loadDimensionStyles()

registerServiceWorker()

// Outermost so it also covers a failure while a lazy chunk is being resolved -
// the whole point being that a renamed chunk after a deploy shows a reload
// button instead of a blank page.
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ErrorBoundary>
            <ThemeProvider>
                <DimensionProvider>
                    <App />
                </DimensionProvider>
            </ThemeProvider>
        </ErrorBoundary>
    </StrictMode>
)