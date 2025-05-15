import React, { useState, useEffect, useRef } from "react"
import { useTheme } from "../context/ThemeContext"
import { useDimension } from "../context/DimensionContext"
import {
    SettingsIcon,
    SunIcon,
    MoonIcon,
    AudioOnIcon,
    AudioOffIcon,
    ArrowUpIcon,
} from "../assets/icons"

const FloatingControls = () => {
    // State for ScrollToTop
    const [isScrollVisible, setIsScrollVisible] = useState(false)

    // States for ThemeToggle
    const { isDarkTheme, toggleTheme } = useTheme()
    const [isThemeAnimating, setIsThemeAnimating] = useState(false)
    const [isInitialRender, setIsInitialRender] = useState(true)

    // States for audio and dimension context
    const { isSpiderVerse, isTransitioning, isAudioMuted, toggleAudioMute } =
        useDimension()

    // State for controls panel
    const [isControlsVisible, setIsControlsVisible] = useState(true)
    const [isControlPanelOpen, setIsControlPanelOpen] = useState(false)
    const controlsTimeoutRef = useRef(null)

    // Show scroll button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 500) {
                setIsScrollVisible(true)
            } else {
                setIsScrollVisible(false)
            }
        }

        window.addEventListener("scroll", toggleVisibility)
        toggleVisibility() // Check initial scroll position

        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    // Set initial render to false after component mounts
    useEffect(() => {
        setIsInitialRender(false)

        // Auto-hide controls after 5 seconds of inactivity
        controlsTimeoutRef.current = setTimeout(() => {
            setIsControlsVisible(false)
        }, 5000)

        return () => {
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current)
            }
        }
    }, [])

    // Effect to close control panel when dimension changes
    useEffect(() => {
        setIsControlPanelOpen(false)
    }, [isSpiderVerse])

    // Reset auto-hide timer when user interacts with controls
    const resetControlsTimeout = () => {
        setIsControlsVisible(true)

        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current)
        }

        controlsTimeoutRef.current = setTimeout(() => {
            // Don't auto-hide if control panel is open
            if (!isControlPanelOpen) {
                setIsControlsVisible(false)
            }
        }, 5000)
    }

    // Dimension trigger hover effects removed - now using standalone component

    // Scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    // Handle theme toggle
    const handleThemeToggle = () => {
        if (!isThemeAnimating) {
            setIsThemeAnimating(true)
            toggleTheme()

            // Reset animation state after animation completes
            setTimeout(() => {
                setIsThemeAnimating(false)
            }, 600)
        }
    }

    // Toggle control panel
    const toggleControlPanel = () => {
        setIsControlPanelOpen(!isControlPanelOpen)
        resetControlsTimeout()
    }

    return (
        <div
            className="floating-controls-container"
            onMouseEnter={() => resetControlsTimeout()}
            onMouseMove={() => resetControlsTimeout()}
        >
            {/* Floating Controls Container */}
            <div
                className={`flex flex-col items-end space-y-3 transition-all duration-500 ${
                    isControlsVisible
                        ? "opacity-100"
                        : "opacity-40 hover:opacity-100"
                }`}
            >
                {/* Magic Box Button */}
                <button
                    className={`floating-control-button group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 ${
                        isControlPanelOpen ? "scale-110" : ""
                    } ${
                        isSpiderVerse
                            ? "bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                            : isDarkTheme
                            ? "bg-dark-800/90 backdrop-blur-sm border border-purple-500/30 hover:border-purple-500/60"
                            : "bg-white/90 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40"
                    }`}
                    aria-label="Magic Box"
                    onClick={toggleControlPanel}
                >
                    <SettingsIcon
                        className={`h-6 w-6 transition-transform duration-500 ${
                            isControlPanelOpen
                                ? "rotate-90"
                                : "group-hover:rotate-90"
                        } ${isSpiderVerse ? "text-black" : "text-purple-500"}`}
                    />

                    {/* Tooltip */}
                    <span className="tooltip">MagicBox</span>
                </button>
            </div>

            {/* Magic Box Panel */}
            {isControlPanelOpen && (
                <div
                    className={`control-panel ${
                        isSpiderVerse
                            ? "bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            : isDarkTheme
                            ? "bg-dark-800/95 backdrop-blur-md border border-purple-500/30"
                            : "bg-white/95 backdrop-blur-md border border-purple-500/20"
                    }`}
                >
                    <h3
                        className={`control-panel-header ${
                            isSpiderVerse
                                ? "text-black font-['Comic_Neue']"
                                : isDarkTheme
                                ? "text-white"
                                : "text-gray-800"
                        }`}
                    >
                        Magic Box
                    </h3>

                    <div className="space-y-2">
                        {/* Audio Controls (only in Spider-Verse) */}
                        {isSpiderVerse && (
                            <div className="control-panel-item">
                                <span
                                    className={`${
                                        isSpiderVerse
                                            ? "text-black font-['Comic_Neue']"
                                            : isDarkTheme
                                            ? "text-gray-200"
                                            : "text-gray-700"
                                    }`}
                                >
                                    Audio Effects
                                </span>
                                <button
                                    onClick={toggleAudioMute}
                                    className="control-panel-button"
                                    aria-label={
                                        isAudioMuted
                                            ? "Unmute sounds"
                                            : "Mute sounds"
                                    }
                                >
                                    {isAudioMuted ? (
                                        <AudioOffIcon
                                            className={`h-5 w-5 ${
                                                isSpiderVerse
                                                    ? "text-black"
                                                    : isDarkTheme
                                                    ? "text-gray-200"
                                                    : "text-gray-700"
                                            }`}
                                        />
                                    ) : (
                                        <AudioOnIcon
                                            className={`h-5 w-5 ${
                                                isSpiderVerse
                                                    ? "text-black"
                                                    : isDarkTheme
                                                    ? "text-gray-200"
                                                    : "text-gray-700"
                                            }`}
                                        />
                                    )}
                                    <span
                                        className={`text-sm ${
                                            isSpiderVerse
                                                ? "text-black"
                                                : isDarkTheme
                                                ? "text-gray-200"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        {isAudioMuted ? "Unmute" : "Mute"}
                                    </span>
                                </button>
                            </div>
                        )}

                        {/* Theme Toggle */}
                        <div className="control-panel-item">
                            <span
                                className={`${
                                    isSpiderVerse
                                        ? "text-black font-['Comic_Neue']"
                                        : isDarkTheme
                                        ? "text-gray-200"
                                        : "text-gray-700"
                                }`}
                            >
                                Theme
                            </span>
                            <button
                                onClick={handleThemeToggle}
                                className="control-panel-button"
                                aria-label={
                                    isDarkTheme
                                        ? "Switch to Light Mode"
                                        : "Switch to Dark Mode"
                                }
                            >
                                {isDarkTheme ? (
                                    <SunIcon
                                        className={`h-5 w-5 ${
                                            isSpiderVerse
                                                ? "text-black"
                                                : isDarkTheme
                                                ? "text-amber-400"
                                                : "text-purple-600"
                                        }`}
                                    />
                                ) : (
                                    <MoonIcon
                                        className={`h-5 w-5 ${
                                            isSpiderVerse
                                                ? "text-black"
                                                : isDarkTheme
                                                ? "text-amber-400"
                                                : "text-purple-600"
                                        }`}
                                    />
                                )}
                                <span
                                    className={`text-sm ${
                                        isSpiderVerse
                                            ? "text-black"
                                            : isDarkTheme
                                            ? "text-gray-200"
                                            : "text-gray-700"
                                    }`}
                                >
                                    {isDarkTheme ? "Light Mode" : "Dark Mode"}
                                </span>
                            </button>
                        </div>

                        {/* Dimension Toggle removed - now using standalone component */}

                        {/* Scroll to Top */}
                        <div className="control-panel-item">
                            <span
                                className={`${
                                    isSpiderVerse
                                        ? "text-black font-['Comic_Neue']"
                                        : isDarkTheme
                                        ? "text-gray-200"
                                        : "text-gray-700"
                                }`}
                            >
                                Navigation
                            </span>
                            <button
                                onClick={scrollToTop}
                                className="control-panel-button"
                                aria-label="Scroll to top"
                            >
                                <ArrowUpIcon
                                    className={`h-5 w-5 ${
                                        isSpiderVerse
                                            ? "text-black"
                                            : "text-purple-500"
                                    }`}
                                />
                                <span
                                    className={`text-sm ${
                                        isSpiderVerse
                                            ? "text-black"
                                            : isDarkTheme
                                            ? "text-gray-200"
                                            : "text-gray-700"
                                    }`}
                                >
                                    Top of Page
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Indicator dot for auto-hide feature */}
            <div
                className={`indicator-dot ${
                    isControlsVisible ? "active" : "inactive"
                }`}
            ></div>
        </div>
    )
}

export default FloatingControls
