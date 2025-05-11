import React, { useState, useEffect, useRef } from "react"
import { useTheme } from "../context/ThemeContext"
import { useDimension } from "../context/DimensionContext"

const FloatingControls = () => {
    // State for ScrollToTop
    const [isScrollVisible, setIsScrollVisible] = useState(false)

    // States for ThemeToggle
    const { isDarkTheme, toggleTheme } = useTheme()
    const [isThemeAnimating, setIsThemeAnimating] = useState(false)
    const [isInitialRender, setIsInitialRender] = useState(true)

    // States for DimensionTrigger
    const {
        isSpiderVerse,
        toggleDimension,
        isTransitioning,
        isAudioMuted,
        toggleAudioMute,
    } = useDimension()
    const [isHovering, setIsHovering] = useState(false)
    const [glitchInterval, setGlitchInterval] = useState(null)

    // State for controls panel
    const [isExpanded, setIsExpanded] = useState(true)
    const [isControlPanelOpen, setIsControlPanelOpen] = useState(false)
    const [isControlsVisible, setIsControlsVisible] = useState(true)
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

    // Handle hover effects for dimension trigger
    useEffect(() => {
        if (isHovering && !glitchInterval) {
            // Create random glitch effect on hover
            const interval = setInterval(() => {
                const button = document.getElementById("dimension-trigger")
                if (button) {
                    // Random glitch effect
                    const glitchX = Math.random() * 5 - 2.5
                    const glitchY = Math.random() * 5 - 2.5
                    const glitchRotate = Math.random() * 2 - 1
                    const glitchScale = 0.98 + Math.random() * 0.04

                    button.style.transform = `translate(${glitchX}px, ${glitchY}px) rotate(${glitchRotate}deg) scale(${glitchScale})`

                    // Random color shift
                    if (Math.random() > 0.7) {
                        button.style.filter = `hue-rotate(${
                            Math.random() * 360
                        }deg)`
                    } else {
                        button.style.filter = ""
                    }
                }
            }, 150)

            setGlitchInterval(interval)
        } else if (!isHovering && glitchInterval) {
            clearInterval(glitchInterval)
            setGlitchInterval(null)

            // Reset styles
            const button = document.getElementById("dimension-trigger")
            if (button) {
                button.style.transform = ""
                button.style.filter = ""
            }
        }

        return () => {
            if (glitchInterval) {
                clearInterval(glitchInterval)
            }
        }
    }, [isHovering, glitchInterval])

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

    // Toggle controls panel expansion
    const toggleExpansion = () => {
        setIsExpanded(!isExpanded)
        resetControlsTimeout()
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
            {/* Toggle button for controls visibility on mobile */}
            <button
                onClick={toggleExpansion}
                className={`floating-control-button md:hidden ${
                    isSpiderVerse
                        ? "bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        : isDarkTheme
                        ? "bg-dark-800/90 backdrop-blur-sm border border-purple-500/30"
                        : "bg-white/90 backdrop-blur-sm border border-purple-500/20"
                }`}
                aria-label={
                    isExpanded ? "Collapse controls" : "Expand controls"
                }
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : "rotate-0"
                    } ${isSpiderVerse ? "text-black" : "text-purple-500"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={isExpanded ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"}
                    />
                </svg>

                <span className="tooltip">
                    {isExpanded ? "Collapse controls" : "Expand controls"}
                </span>
            </button>

            {/* Floating Controls Container */}
            <div
                className={`flex flex-col items-end space-y-3 transition-all duration-500 ${
                    isControlsVisible
                        ? "opacity-100"
                        : "opacity-40 hover:opacity-100"
                } ${
                    isExpanded
                        ? "translate-y-0"
                        : "translate-y-24 md:translate-y-0"
                }`}
            >
                {/* Scroll To Top Button */}
                <button
                    onClick={scrollToTop}
                    className={`floating-control-button group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 ${
                        isScrollVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10 pointer-events-none"
                    } ${
                        isSpiderVerse
                            ? "bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                            : "bg-opacity-80 backdrop-blur-sm shadow-lg"
                    } ${
                        !isSpiderVerse && isDarkTheme
                            ? "bg-dark-800/90 border border-purple-500/30 hover:border-purple-500/60"
                            : !isSpiderVerse
                            ? "bg-white/90 border border-purple-500/20 hover:border-purple-500/40"
                            : ""
                    }`}
                    aria-label="Scroll to top"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1 ${
                            isSpiderVerse ? "text-black" : "text-purple-500"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                    </svg>

                    {/* Tooltip */}
                    <span className="tooltip">Scroll to top</span>
                </button>

                {/* Dimension Trigger Button */}
                <button
                    id="dimension-trigger"
                    onClick={toggleDimension}
                    disabled={isTransitioning}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className={`floating-control-button group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 ${
                        isTransitioning
                            ? "opacity-50 cursor-not-allowed"
                            : "opacity-100 cursor-pointer"
                    } ${
                        isSpiderVerse
                            ? "bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                            : "bg-purple-600 text-white shadow-lg hover:bg-purple-700"
                    }`}
                    aria-label={
                        isSpiderVerse
                            ? "Exit Spider-Verse"
                            : "Enter Spider-Verse"
                    }
                >
                    <div className="relative">
                        {isSpiderVerse ? (
                            // Exit Spider-Verse icon
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M8 12h8" />
                                <path d="M12 8v8" />
                            </svg>
                        ) : (
                            // Enter Spider-Verse icon (spider web)
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 2v20M2 12h20M2.63 2.63l18.74 18.74M21.37 2.63L2.63 21.37" />
                                <circle cx="12" cy="12" r="6" />
                                <circle cx="12" cy="12" r="2" />
                            </svg>
                        )}
                    </div>

                    {/* Tooltip */}
                    <span className="tooltip">
                        {isSpiderVerse
                            ? "Exit Spider-Verse"
                            : "Enter Spider-Verse"}
                    </span>
                </button>

                {/* Theme Toggle Button */}
                <button
                    onClick={handleThemeToggle}
                    className={`floating-control-button group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-lg ${
                        isSpiderVerse
                            ? "bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                            : isDarkTheme
                            ? "bg-dark-800/90 backdrop-blur-sm border border-purple-500/30 hover:border-purple-500/60"
                            : "bg-white/90 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40"
                    } ${isThemeAnimating ? "scale-110" : ""}`}
                    aria-label="Toggle theme"
                    disabled={isThemeAnimating}
                >
                    {/* Background glow effect */}
                    {!isSpiderVerse && (
                        <div
                            className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
                                isDarkTheme
                                    ? "bg-gradient-to-r from-purple-500/10 to-amber-500/10"
                                    : "bg-gradient-to-r from-purple-500/5 to-amber-500/5"
                            }`}
                        ></div>
                    )}

                    {/* Sun icon (visible in dark mode) */}
                    <div
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                            isInitialRender
                                ? ""
                                : isDarkTheme
                                ? "opacity-100 rotate-0"
                                : "opacity-0 rotate-90"
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-6 w-6 ${
                                isSpiderVerse ? "text-black" : "text-amber-400"
                            }`}
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
                                : isDarkTheme
                                ? "opacity-0 -rotate-90"
                                : "opacity-100 rotate-0"
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-6 w-6 ${
                                isSpiderVerse ? "text-black" : "text-purple-600"
                            }`}
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
                    <span className="tooltip">
                        {isDarkTheme
                            ? "Switch to Light Mode"
                            : "Switch to Dark Mode"}
                    </span>
                </button>

                {/* Control Panel Button */}
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
                    aria-label="Control Panel"
                    onClick={toggleControlPanel}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 transition-transform duration-500 ${
                            isControlPanelOpen
                                ? "rotate-90"
                                : "group-hover:rotate-90"
                        } ${isSpiderVerse ? "text-black" : "text-purple-500"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>

                    {/* Tooltip */}
                    <span className="tooltip">Control Panel</span>
                </button>
            </div>

            {/* Control Panel */}
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
                        Control Panel
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
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-5 w-5 ${
                                            isSpiderVerse
                                                ? "text-black"
                                                : isDarkTheme
                                                ? "text-gray-200"
                                                : "text-gray-700"
                                        }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        {isAudioMuted ? (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                                            />
                                        ) : (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15.536 8.464a5 5 0 010 7.072M12 6a7.975 7.975 0 015.657 2.343m0 0a9.99 9.99 0 011.414 1.414M12 6a7.975 7.975 0 00-5.657 2.343m0 0a9.99 9.99 0 00-1.414 1.414M12 6c-2.583 0-4.824 1.22-6.243 3.122m0 0A9.925 9.925 0 004 12c0 .998.146 1.962.418 2.878M12 6a9.925 9.925 0 00-6.243 5.878M12 6c2.583 0 4.824 1.22 6.243 3.122m0 0A9.925 9.925 0 0120 12c0 .998-.146 1.962-.418 2.878m-6.243-3.122a9.925 9.925 0 00-6.243 5.878M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                                            />
                                        )}
                                    </svg>
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-5 w-5 ${
                                        isSpiderVerse
                                            ? "text-black"
                                            : isDarkTheme
                                            ? "text-amber-400"
                                            : "text-purple-600"
                                    }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {isDarkTheme ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                        />
                                    )}
                                </svg>
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

                        {/* Dimension Toggle */}
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
                                Dimension
                            </span>
                            <button
                                onClick={toggleDimension}
                                disabled={isTransitioning}
                                className={`control-panel-button ${
                                    isTransitioning
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                                aria-label={
                                    isSpiderVerse
                                        ? "Exit Spider-Verse"
                                        : "Enter Spider-Verse"
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-5 w-5 ${
                                        isSpiderVerse
                                            ? "text-black"
                                            : "text-purple-600"
                                    }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    {isSpiderVerse ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8 12h8M12 8v8"
                                        />
                                    ) : (
                                        <>
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 2v20M2 12h20M2.63 2.63l18.74 18.74M21.37 2.63L2.63 21.37" />
                                            <circle cx="12" cy="12" r="6" />
                                            <circle cx="12" cy="12" r="2" />
                                        </>
                                    )}
                                </svg>
                                <span
                                    className={`text-sm ${
                                        isSpiderVerse
                                            ? "text-black"
                                            : isDarkTheme
                                            ? "text-gray-200"
                                            : "text-gray-700"
                                    }`}
                                >
                                    {isSpiderVerse
                                        ? "Exit Spider-Verse"
                                        : "Enter Spider-Verse"}
                                </span>
                            </button>
                        </div>

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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-5 w-5 ${
                                        isSpiderVerse
                                            ? "text-black"
                                            : "text-purple-500"
                                    }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                                    />
                                </svg>
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
