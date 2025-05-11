import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./critical.css" // Load critical CSS first
import "./index.css"
import "./spiderverse.css"
import App from "./App.jsx"
import { ThemeProvider } from "./context/ThemeContext"
import { DimensionProvider } from "./context/DimensionContext"
import { initPerformanceMonitoring } from "./utils/performance"

// Initialize performance monitoring in development mode
if (process.env.NODE_ENV !== "production") {
    initPerformanceMonitoring()
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <DimensionProvider>
                <App />
            </DimensionProvider>
        </ThemeProvider>
    </StrictMode>
)
