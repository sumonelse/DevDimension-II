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

    /* Browser chrome tint. The static tag in `index.html` matches the dark
       default; keeping it in sync means the address bar follows the site rather
       than staying dark behind a white page. */
    const applyThemeColor = useCallback((isDark) => {
        const color = isDark ? "#080C1F" : "#f8fafc"
        let meta = document.querySelector('meta[name="theme-color"]')
        if (!meta) {
            meta = document.createElement("meta")
            meta.setAttribute("name", "theme-color")
            document.head.appendChild(meta)
        }
        meta.setAttribute("content", color)
    }, [])

    const applyDarkTheme = useCallback(() => {
        document.documentElement.classList.remove("light-theme")
        document.documentElement.style.colorScheme = "dark"
        document.body.style.backgroundColor = "#080C1F" // dark.950
        applyThemeColor(true)
    }, [applyThemeColor])

    const applyLightTheme = useCallback(() => {
        document.documentElement.classList.add("light-theme")
        document.documentElement.style.colorScheme = "light"
        document.body.style.backgroundColor = "#f8fafc" // light bg
        applyThemeColor(false)
    }, [applyThemeColor])

    // Apply the stored or system theme on mount.
    //
    // Declared after `applyDarkTheme` / `applyLightTheme` so both can be listed
    // as dependencies; as a bare function reference the rule could not tell
    // whether the effect was safe to re-run.
    useEffect(() => {
        const prefersDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches

        // localStorage throws in some private-browsing modes, and failing to
        // read a preference must never stop the theme from applying.
        let savedTheme = null
        try {
            savedTheme = window.localStorage.getItem("theme")
        } catch {
            savedTheme = null
        }

        if (savedTheme === "light" || (!savedTheme && !prefersDarkMode)) {
            setIsDarkTheme(false)
            applyLightTheme()
        } else {
            setIsDarkTheme(true)
            applyDarkTheme()
        }

        // Add transition class after initial load to prevent flash
        const timer = setTimeout(() => {
            document.body.classList.add("transition-colors")
            document.documentElement.classList.add("transition-colors")
        }, 100)

        return () => clearTimeout(timer)
    }, [applyDarkTheme, applyLightTheme, applyThemeColor])

    const toggleTheme = useCallback(() => {
        if (isDarkTheme) {
            // Switch to light mode
            applyLightTheme()
            try {
                localStorage.setItem("theme", "light")
            } catch {
                // Preference simply will not persist.
            }
        } else {
            // Switch to dark mode
            applyDarkTheme()
            try {
                localStorage.setItem("theme", "dark")
            } catch {
                // Preference simply will not persist.
            }
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
