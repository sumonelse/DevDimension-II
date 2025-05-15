import React, { useState, useEffect } from "react"
import { useTheme } from "../context/ThemeContext"
import { SunIcon, MoonIcon } from "../assets/icons"

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
                <SunIcon className="h-6 w-6 text-amber-400" />
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
                <MoonIcon className="h-6 w-6 text-purple-600" />
            </div>

            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-dark-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-purple-500/20">
                {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </span>
        </button>
    )
}

export default ThemeToggle
