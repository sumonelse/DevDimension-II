import { useState, useEffect } from "react"

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(true)

    useEffect(() => {
        // Check for saved theme preference or use dark mode as default
        const savedTheme = localStorage.getItem("theme")
        if (savedTheme === "light") {
            setIsDarkMode(false)
            document.documentElement.classList.add("light-theme")
        }
    }, [])

    const toggleTheme = () => {
        if (isDarkMode) {
            // Switch to light mode
            document.documentElement.classList.add("light-theme")
            localStorage.setItem("theme", "light")
        } else {
            // Switch to dark mode
            document.documentElement.classList.remove("light-theme")
            localStorage.setItem("theme", "dark")
        }
        setIsDarkMode(!isDarkMode)
    }

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass-dark flex items-center justify-center transition-all duration-500 hover:scale-110 focus:outline-none"
            aria-label="Toggle theme"
        >
            {isDarkMode ? (
                // Sun icon for dark mode
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-amber-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            ) : (
                // Moon icon for light mode
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                </svg>
            )}
        </button>
    )
}

export default ThemeToggle
