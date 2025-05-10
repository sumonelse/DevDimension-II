import React, { useEffect, useRef } from "react"
import useParallax from "../hooks/useParallax"
import { useDimension } from "../context/DimensionContext"

const SpiderverseBackground = () => {
    const backgroundRef = useRef(null)
    const { isSpiderVerse } = useDimension()

    // Enable parallax effect
    useParallax(isSpiderVerse)

    useEffect(() => {
        // Create motion lines for the background
        const createMotionLines = () => {
            if (!backgroundRef.current) return

            const container = backgroundRef.current
            const motionLinesContainer = document.createElement("div")
            motionLinesContainer.className = "motion-lines"

            // Create random motion lines
            for (let i = 0; i < 30; i++) {
                const line = document.createElement("div")
                line.className = "motion-line"

                // Random positioning and styling
                const top = Math.random() * 100
                const left = Math.random() * 100
                const width = 30 + Math.random() * 70
                const rotation = Math.random() * 180
                const opacity = 0.1 + Math.random() * 0.3

                line.style.top = `${top}%`
                line.style.left = `${left}%`
                line.style.width = `${width}px`
                line.style.transform = `rotate(${rotation}deg)`
                line.style.opacity = opacity

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

        // Parallax effect is now handled by the useParallax hook

        // Add dimensional glitch effect
        const addGlitchEffect = () => {
            if (!backgroundRef.current) return

            const container = backgroundRef.current
            const glitchInterval = setInterval(() => {
                // Random chance to trigger a glitch
                if (Math.random() > 0.95) {
                    container.classList.add("dimensional-shift")

                    // Remove the class after a short duration
                    setTimeout(() => {
                        container.classList.remove("dimensional-shift")
                    }, 500)
                }
            }, 2000)

            return () => clearInterval(glitchInterval)
        }

        const cleanupMotionLines = createMotionLines()
        const cleanupGlitch = addGlitchEffect()

        return () => {
            cleanupMotionLines && cleanupMotionLines()
            cleanupGlitch && cleanupGlitch()
        }
    }, [])

    return (
        <div ref={backgroundRef} className="spiderverse-bg fixed inset-0 z-0">
            {/* Halftone overlay */}
            <div className="halftone-overlay"></div>

            {/* Spider-Man mask pattern overlay */}
            <div className="spidey-mask-overlay"></div>

            {/* Parallax layers */}
            <div className="parallax-layer parallax-deep absolute top-20 right-10 w-72 h-72 bg-spiderverse-pink/20 rounded-full blur-3xl"></div>
            <div className="parallax-layer parallax-medium absolute bottom-20 left-10 w-80 h-80 bg-spiderverse-blue/20 rounded-full blur-3xl"></div>
            <div className="parallax-layer parallax-shallow absolute top-1/3 left-1/4 w-96 h-96 bg-spiderverse-purple/20 rounded-full blur-3xl"></div>
            <div className="parallax-layer parallax-medium absolute bottom-1/3 right-1/4 w-64 h-64 bg-spiderverse-yellow/20 rounded-full blur-3xl"></div>

            {/* Comic book style decorative elements */}
            <div className="absolute top-10 left-10 text-spiderverse-yellow opacity-10 comic-title text-9xl">
                POW!
            </div>
            <div className="absolute bottom-10 right-10 text-spiderverse-red opacity-10 comic-title text-9xl">
                BANG!
            </div>
            <div className="absolute top-1/2 right-20 text-spiderverse-blue opacity-10 comic-title text-8xl">
                THWIP!
            </div>
            <div className="absolute bottom-1/3 left-20 text-spiderverse-purple opacity-10 comic-title text-8xl">
                ZOOM!
            </div>

            {/* Random Ben-Day dots clusters */}
            <div className="absolute top-1/4 right-1/4 w-40 h-40 benday-dots opacity-10"></div>
            <div className="absolute bottom-1/4 left-1/3 w-60 h-60 benday-dots opacity-10"></div>
            <div className="absolute top-2/3 right-1/3 w-48 h-48 benday-dots opacity-10"></div>
            <div className="absolute top-1/3 left-1/5 w-52 h-52 benday-dots opacity-10"></div>

            {/* Spider webs in corners */}
            <div className="spider-web spider-web-corner absolute top-0 left-0 transform rotate-0"></div>
            <div className="spider-web spider-web-corner absolute top-0 right-0 transform rotate-90"></div>
            <div className="spider-web spider-web-corner absolute bottom-0 left-0 transform -rotate-90"></div>
            <div className="spider-web spider-web-corner absolute bottom-0 right-0 transform rotate-180"></div>

            {/* Spider web in center (very faint) */}
            <div className="spider-web spider-web-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5"></div>
        </div>
    )
}

export default SpiderverseBackground
