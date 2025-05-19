import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    useMemo,
    useCallback,
} from "react"

// Create the theme context
const ThemeContext = createContext()

// Theme provider component
export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(true)

    useEffect(() => {
        // Check for system preference
        const prefersDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches

        // Check for saved theme preference or use system preference as default
        const savedTheme = localStorage.getItem("theme")

        if (savedTheme === "light" || (!savedTheme && !prefersDarkMode)) {
            setIsDarkTheme(false)
            applyLightTheme()
        } else {
            setIsDarkTheme(true)
            applyDarkTheme()
        }

        // Add transition class after initial load to prevent flash
        setTimeout(() => {
            document.body.classList.add("transition-colors")
            document.documentElement.classList.add("transition-colors")
        }, 100)
    }, [])

    const applyDarkTheme = useCallback(() => {
        document.documentElement.classList.remove("light-theme")
        document.documentElement.style.colorScheme = "dark"
        document.body.style.backgroundColor = "#080C1F" // dark.950
    }, [])

    const applyLightTheme = useCallback(() => {
        document.documentElement.classList.add("light-theme")
        document.documentElement.style.colorScheme = "light"
        document.body.style.backgroundColor = "#f8fafc" // light bg
    }, [])

    const toggleTheme = useCallback(() => {
        if (isDarkTheme) {
            // Switch to light mode
            applyLightTheme()
            localStorage.setItem("theme", "light")
        } else {
            // Switch to dark mode
            applyDarkTheme()
            localStorage.setItem("theme", "dark")
        }
        setIsDarkTheme((prevState) => !prevState)
    }, [isDarkTheme, applyLightTheme, applyDarkTheme])

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(
        () => ({
            isDarkTheme,
            toggleTheme,
        }),
        [isDarkTheme, toggleTheme]
    )

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    )
}

// Custom hook to use the theme context
export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}

export default ThemeContext
