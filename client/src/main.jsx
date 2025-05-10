import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import "./spiderverse.css"
import App from "./App.jsx"
import { ThemeProvider } from "./context/ThemeContext"
import { DimensionProvider } from "./context/DimensionContext"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <DimensionProvider>
                <App />
            </DimensionProvider>
        </ThemeProvider>
    </StrictMode>
)
