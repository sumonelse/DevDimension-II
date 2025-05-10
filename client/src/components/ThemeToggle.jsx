import React, { useState, useEffect } from "react"
import { useTheme } from "../context/ThemeContext"

const ThemeToggle = () => {
    const { isDarkTheme: isDarkMode, toggleTheme } = useTheme()
    const [isAnimating, setIsAnimating] = useState(false)

    // Track initial render to prevent animation on page load
    const [isInitialRender, setIsInitialRender] = useState(true)

    useEffect(() => {
        // Set initial render to false after component mounts
        setIsInitialRender(false)
    }, [])

    const handleToggle = () => {
        if (!isAnimating) {
            setIsAnimating(true)
            toggleTheme()

            // Reset animation state after animation completes
            setTimeout(() => {
                setIsAnimating(false)
            }, 600)
        }
    }

    return (
        <button
            onClick={handleToggle}
            className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 focus:outline-none shadow-lg ${
                isDarkMode
                    ? "bg-dark-800 border border-purple-500/30 hover:border-purple-500/50"
                    : "bg-white border border-purple-500/20 hover:border-purple-500/40"
            } ${isAnimating ? "scale-110" : "hover:scale-110"}`}
            aria-label="Toggle theme"
            disabled={isAnimating}
        >
            {/* Background glow effect */}
            <div
                className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
                    isDarkMode
                        ? "bg-gradient-to-r from-purple-500/10 to-amber-500/10"
                        : "bg-gradient-to-r from-purple-500/5 to-amber-500/5"
                }`}
            ></div>

            {/* Sun icon (visible in dark mode) */}
            <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                    isInitialRender
                        ? ""
                        : isDarkMode
                        ? "opacity-100 rotate-0"
                        : "opacity-0 rotate-90"
                }`}
            >
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
            </div>

            {/* Moon icon (visible in light mode) */}
            <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                    isInitialRender
                        ? ""
                        : isDarkMode
                        ? "opacity-0 -rotate-90"
                        : "opacity-100 rotate-0"
                }`}
            >
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
            </div>

            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-dark-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-purple-500/20">
                {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </span>
        </button>
    )
}

export default ThemeToggle
