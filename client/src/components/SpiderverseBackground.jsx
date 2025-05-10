import React, { useEffect, useRef, useState } from "react"
import useParallax from "../hooks/useParallax"
import { useDimension } from "../context/DimensionContext"

const SpiderverseBackground = () => {
    const backgroundRef = useRef(null)
    const { isSpiderVerse } = useDimension()
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const [actionWords, setActionWords] = useState([])
    const [webLines, setWebLines] = useState([])

    // Enable parallax effect
    useParallax(isSpiderVerse)

    // Update dimensions on resize
    useEffect(() => {
        const updateDimensions = () => {
            if (backgroundRef.current) {
                setDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight,
                })
            }
        }

        window.addEventListener("resize", updateDimensions)
        updateDimensions()

        return () => window.removeEventListener("resize", updateDimensions)
    }, [])

    // Generate random action words
    useEffect(() => {
        if (dimensions.width === 0) return

        const words = [
            "POW!",
            "BANG!",
            "THWIP!",
            "ZOOM!",
            "WHAM!",
            "CRASH!",
            "BOOM!",
            "SPLAT!",
        ]
        const newActionWords = []

        for (let i = 0; i < 8; i++) {
            const word = words[Math.floor(Math.random() * words.length)]
            const size = 6 + Math.floor(Math.random() * 6) // 6xl to 12xl
            const top = Math.random() * 90
            const left = Math.random() * 90
            const rotation = -10 + Math.random() * 20
            const color = [
                "text-spiderverse-red",
                "text-spiderverse-blue",
                "text-spiderverse-yellow",
                "text-spiderverse-purple",
                "text-spiderverse-cyan",
                "text-spiderverse-green",
            ][Math.floor(Math.random() * 6)]
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

        setActionWords(newActionWords)
    }, [dimensions])

    // Generate dynamic web lines
    useEffect(() => {
        if (dimensions.width === 0) return

        const newWebLines = []
        const numLines = Math.floor(dimensions.width / 100) // Adjust density based on screen width

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

        setWebLines(newWebLines)
    }, [dimensions])

    useEffect(() => {
        // Create motion lines for the background
        const createMotionLines = () => {
            if (!backgroundRef.current) return

            const container = backgroundRef.current
            const motionLinesContainer = document.createElement("div")
            motionLinesContainer.className = "motion-lines"

            // Create random motion lines
            for (let i = 0; i < 50; i++) {
                // Increased from 30 to 50
                const line = document.createElement("div")
                line.className = "motion-line"

                // Random positioning and styling
                const top = Math.random() * 100
                const left = Math.random() * 100
                const width = 30 + Math.random() * 100 // Increased max width
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
            const glitchInterval = setInterval(() => {
                // Random chance to trigger a glitch
                if (Math.random() > 0.92) {
                    // Increased frequency
                    container.classList.add("dimensional-shift")

                    // Remove the class after a short duration
                    setTimeout(() => {
                        container.classList.remove("dimensional-shift")
                    }, 500)
                }
            }, 1500) // Reduced interval

            return () => clearInterval(glitchInterval)
        }

        // Add random web shooter effects
        const addWebShooterEffects = () => {
            if (!backgroundRef.current) return

            const container = backgroundRef.current
            const webShooterInterval = setInterval(() => {
                // Random chance to trigger a web shooter effect
                if (Math.random() > 0.95) {
                    const webShooter = document.createElement("div")
                    webShooter.className = "web-shooter"

                    // Random positioning and styling
                    const top = Math.random() * 100
                    const left = Math.random() * 50 // Start from left side
                    const width = 50 + Math.random() * 50 + "%"
                    const rotation = -30 + Math.random() * 60

                    webShooter.style.top = `${top}%`
                    webShooter.style.left = `${left}%`
                    webShooter.style.width = width
                    webShooter.style.transform = `rotate(${rotation}deg)`

                    container.appendChild(webShooter)

                    // Remove after animation completes
                    setTimeout(() => {
                        if (container.contains(webShooter)) {
                            container.removeChild(webShooter)
                        }
                    }, 1000)
                }
            }, 3000)

            return () => clearInterval(webShooterInterval)
        }

        const cleanupMotionLines = createMotionLines()
        const cleanupGlitch = addGlitchEffect()
        const cleanupWebShooter = addWebShooterEffects()

        return () => {
            cleanupMotionLines && cleanupMotionLines()
            cleanupGlitch && cleanupGlitch()
            cleanupWebShooter && cleanupWebShooter()
        }
    }, [])

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

            {/* Dynamic comic book style action words */}
            {actionWords.map((word) => (
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
            ))}

            {/* Dynamic web lines */}
            {webLines.map((line) => (
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
            ))}

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
        </div>
    )
}

export default SpiderverseBackground
