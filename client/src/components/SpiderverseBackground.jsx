import React, { useEffect, useRef, useState, useMemo, useCallback } from "react"
import useParallax from "../hooks/useParallax"
import { useDimension } from "../context/DimensionContext"

// Move these constants outside the component to prevent recreation on each render
const WORDS = [
    "POW!",
    "BANG!",
    "THWIP!",
    "ZOOM!",
    "WHAM!",
    "CRASH!",
    "BOOM!",
    "SPLAT!",
]

const COLORS = [
    "text-spiderverse-red",
    "text-spiderverse-blue",
    "text-spiderverse-yellow",
    "text-spiderverse-purple",
    "text-spiderverse-cyan",
    "text-spiderverse-green",
]

const SpiderverseBackground = React.memo(() => {
    const backgroundRef = useRef(null)
    const { isSpiderVerse } = useDimension()
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const [actionWords, setActionWords] = useState([])
    const [webLines, setWebLines] = useState([])

    // Refs for intervals to avoid recreating them on re-renders
    const glitchIntervalRef = useRef(null)
    const resizeTimeoutRef = useRef(null)

    // Enable parallax effect
    useParallax(isSpiderVerse)

    // Update dimensions on resize with debounce
    useEffect(() => {
        const updateDimensions = () => {
            if (backgroundRef.current) {
                setDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight,
                })
            }
        }

        const handleResize = () => {
            // Debounce resize events
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current)
            }

            resizeTimeoutRef.current = setTimeout(() => {
                updateDimensions()
            }, 200)
        }

        window.addEventListener("resize", handleResize)
        updateDimensions()

        return () => {
            window.removeEventListener("resize", handleResize)
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current)
            }
        }
    }, [])

    // Generate random action words - memoized to prevent unnecessary recalculations
    const generateActionWords = useCallback(() => {
        if (dimensions.width === 0) return []

        const newActionWords = []

        for (let i = 0; i < 8; i++) {
            const word = WORDS[Math.floor(Math.random() * WORDS.length)]
            const size = 6 + Math.floor(Math.random() * 6) // 6xl to 12xl
            const top = Math.random() * 90
            const left = Math.random() * 90
            const rotation = -10 + Math.random() * 20
            const color = COLORS[Math.floor(Math.random() * COLORS.length)]
            const opacity = 0.05 + Math.random() * 0.1
            const animationDelay = Math.random() * 5

            newActionWords.push({
                id: i,
                word,
                size,
                top,
                left,
                rotation,
                color,
                opacity,
                animationDelay,
            })
        }

        return newActionWords
    }, [dimensions.width])

    // Generate dynamic web lines - memoized to prevent unnecessary recalculations
    const generateWebLines = useCallback(() => {
        if (dimensions.width === 0) return []

        const newWebLines = []
        // Reduce the number of lines for better performance
        const numLines = Math.min(30, Math.floor(dimensions.width / 150))

        for (let i = 0; i < numLines; i++) {
            const startX = Math.random() * dimensions.width
            const startY = Math.random() * dimensions.height
            const angle = Math.random() * 360
            const length = 50 + Math.random() * 150
            const thickness = 1 + Math.random() * 2
            const opacity = 0.05 + Math.random() * 0.1

            newWebLines.push({
                id: i,
                startX,
                startY,
                angle,
                length,
                thickness,
                opacity,
            })
        }

        return newWebLines
    }, [dimensions.width, dimensions.height])

    // Update action words and web lines when dimensions change
    useEffect(() => {
        setActionWords(generateActionWords())
        setWebLines(generateWebLines())
    }, [dimensions, generateActionWords, generateWebLines])

    useEffect(() => {
        // Create motion lines for the background
        const createMotionLines = () => {
            if (!backgroundRef.current) return

            const container = backgroundRef.current
            const motionLinesContainer = document.createElement("div")
            motionLinesContainer.className = "motion-lines"

            // Reduce the number of lines for better performance
            const numLines = Math.min(30, Math.floor(window.innerWidth / 100))

            // Create random motion lines
            for (let i = 0; i < numLines; i++) {
                const line = document.createElement("div")
                line.className = "motion-line"

                // Random positioning and styling
                const top = Math.random() * 100
                const left = Math.random() * 100
                const width = 30 + Math.random() * 100
                const rotation = Math.random() * 180
                const opacity = 0.1 + Math.random() * 0.3

                line.style.top = `${top}%`
                line.style.left = `${left}%`
                line.style.width = `${width}px`
                line.style.transform = `rotate(${rotation}deg)`
                line.style.opacity = opacity

                // Add animation with random delay
                const animationDelay = Math.random() * 5
                line.style.animation = `spider-crawl 10s infinite ${animationDelay}s`

                motionLinesContainer.appendChild(line)
            }

            container.appendChild(motionLinesContainer)

            // Clean up
            return () => {
                if (container.contains(motionLinesContainer)) {
                    container.removeChild(motionLinesContainer)
                }
            }
        }

        // Add dimensional glitch effect
        const addGlitchEffect = () => {
            if (!backgroundRef.current) return

            const container = backgroundRef.current

            // Clear any existing interval
            if (glitchIntervalRef.current) {
                clearInterval(glitchIntervalRef.current)
            }

            glitchIntervalRef.current = setInterval(() => {
                // Reduce frequency for better performance (from 0.92 to 0.95)
                if (Math.random() > 0.95) {
                    container.classList.add("dimensional-shift")

                    // Remove the class after a short duration
                    setTimeout(() => {
                        container.classList.remove("dimensional-shift")
                    }, 500)
                }
            }, 2000) // Increased interval for better performance

            return () => {
                if (glitchIntervalRef.current) {
                    clearInterval(glitchIntervalRef.current)
                }
            }
        }

        // Add random web shooter effects
        const addWebShooterEffects = () => {
            // Web shooter effects removed to prevent layout shifts
            return () => {
                // No cleanup needed
            }
        }

        const cleanupMotionLines = createMotionLines()
        const cleanupGlitch = addGlitchEffect()
        const cleanupWebShooter = addWebShooterEffects()

        return () => {
            cleanupMotionLines && cleanupMotionLines()
            cleanupGlitch && cleanupGlitch()
            cleanupWebShooter && cleanupWebShooter()

            // Clean up any remaining intervals
            if (glitchIntervalRef.current) {
                clearInterval(glitchIntervalRef.current)
            }
        }
    }, [])

    // Memoize the parallax layers to prevent unnecessary re-renders
    const parallaxLayers = useMemo(
        () => (
            <>
                <div className="parallax-layer parallax-deep absolute top-20 right-10 w-72 h-72 bg-spiderverse-pink/20 rounded-full blur-3xl animate-pulse-slow"></div>
                <div
                    className="parallax-layer parallax-medium absolute bottom-20 left-10 w-80 h-80 bg-spiderverse-blue/20 rounded-full blur-3xl animate-pulse-slow"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="parallax-layer parallax-shallow absolute top-1/3 left-1/4 w-96 h-96 bg-spiderverse-purple/20 rounded-full blur-3xl animate-pulse-slow"
                    style={{ animationDelay: "2s" }}
                ></div>
                <div
                    className="parallax-layer parallax-medium absolute bottom-1/3 right-1/4 w-64 h-64 bg-spiderverse-yellow/20 rounded-full blur-3xl animate-pulse-slow"
                    style={{ animationDelay: "1.5s" }}
                ></div>
                <div
                    className="parallax-layer parallax-deep absolute top-2/3 right-1/3 w-72 h-72 bg-spiderverse-cyan/20 rounded-full blur-3xl animate-pulse-slow"
                    style={{ animationDelay: "2.5s" }}
                ></div>
                <div
                    className="parallax-layer parallax-shallow absolute bottom-1/4 left-1/2 w-80 h-80 bg-spiderverse-green/20 rounded-full blur-3xl animate-pulse-slow"
                    style={{ animationDelay: "3s" }}
                ></div>
            </>
        ),
        []
    )

    // Memoize the action words to prevent unnecessary re-renders
    const actionWordsElements = useMemo(
        () =>
            actionWords.map((word) => (
                <div
                    key={word.id}
                    className={`absolute ${word.color} comic-title text-${word.size}xl`}
                    style={{
                        top: `${word.top}%`,
                        left: `${word.left}%`,
                        transform: `rotate(${word.rotation}deg)`,
                        opacity: word.opacity,
                        animation: `action-word-pulse 3s infinite ${word.animationDelay}s`,
                    }}
                >
                    {word.word}
                </div>
            )),
        [actionWords]
    )

    // Memoize the web lines to prevent unnecessary re-renders
    const webLinesElements = useMemo(
        () =>
            webLines.map((line) => (
                <div
                    key={line.id}
                    className="absolute bg-white"
                    style={{
                        top: line.startY,
                        left: line.startX,
                        width: line.length,
                        height: line.thickness,
                        transform: `rotate(${line.angle}deg)`,
                        opacity: line.opacity,
                        transformOrigin: "0 0",
                    }}
                ></div>
            )),
        [webLines]
    )

    // Memoize the static elements to prevent unnecessary re-renders
    const staticElements = useMemo(
        () => (
            <>
                {/* Random Ben-Day dots clusters with animation */}
                <div className="absolute top-1/4 right-1/4 w-40 h-40 benday-dots opacity-10 animate-float-slow"></div>
                <div
                    className="absolute bottom-1/4 left-1/3 w-60 h-60 benday-dots opacity-10 animate-float-slow"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute top-2/3 right-1/3 w-48 h-48 benday-dots opacity-10 animate-float-slow"
                    style={{ animationDelay: "2s" }}
                ></div>
                <div
                    className="absolute top-1/3 left-1/5 w-52 h-52 benday-dots opacity-10 animate-float-slow"
                    style={{ animationDelay: "1.5s" }}
                ></div>
                <div
                    className="absolute bottom-1/3 right-1/5 w-44 h-44 benday-dots opacity-10 animate-float-slow"
                    style={{ animationDelay: "2.5s" }}
                ></div>

                {/* Spider webs in corners with subtle animation */}
                <div className="spider-web spider-web-corner absolute top-0 left-0 transform rotate-0 animate-pulse-subtle"></div>
                <div
                    className="spider-web spider-web-corner absolute top-0 right-0 transform rotate-90 animate-pulse-subtle"
                    style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                    className="spider-web spider-web-corner absolute bottom-0 left-0 transform -rotate-90 animate-pulse-subtle"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="spider-web spider-web-corner absolute bottom-0 right-0 transform rotate-180 animate-pulse-subtle"
                    style={{ animationDelay: "1.5s" }}
                ></div>

                {/* Spider web in center with subtle animation */}
                <div className="spider-web spider-web-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 animate-rotate-slow"></div>

                {/* Additional decorative elements */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent to-spiderverse-darker opacity-30"></div>

                {/* Comic panel borders that appear randomly */}
                <div className="absolute top-10 left-1/4 w-32 h-32 border-4 border-white opacity-5 transform rotate-6"></div>
                <div className="absolute bottom-20 right-1/3 w-48 h-24 border-4 border-white opacity-5 transform -rotate-3"></div>
                <div className="absolute top-1/3 right-10 w-24 h-48 border-4 border-white opacity-5 transform rotate-12"></div>
                <div className="absolute bottom-1/4 left-10 w-40 h-40 border-4 border-white opacity-5 transform -rotate-8"></div>
            </>
        ),
        []
    )

    return (
        <div
            ref={backgroundRef}
            className="spiderverse-bg fixed inset-0 z-0 overflow-hidden"
        >
            {/* Halftone overlay */}
            <div className="halftone-overlay"></div>

            {/* Spider-Man mask pattern overlay */}
            <div className="spidey-mask-overlay"></div>

            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-spiderverse-darker to-spiderverse-dark animate-gradient-shift"></div>

            {/* Parallax layers with enhanced styling */}
            {parallaxLayers}

            {/* Dynamic comic book style action words */}
            {actionWordsElements}

            {/* Dynamic web lines */}
            {webLinesElements}

            {/* Static elements */}
            {staticElements}
        </div>
    )
})

export default SpiderverseBackground
