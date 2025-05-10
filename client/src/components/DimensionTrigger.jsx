import React, { useState, useEffect } from "react"
import { useDimension } from "../context/DimensionContext"

const DimensionTrigger = () => {
    const { isSpiderVerse, toggleDimension, isTransitioning } = useDimension()
    const [isHovering, setIsHovering] = useState(false)
    const [glitchInterval, setGlitchInterval] = useState(null)

    // Handle hover effects
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

    return (
        <button
            id="dimension-trigger"
            onClick={toggleDimension}
            disabled={isTransitioning}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`fixed bottom-24 right-6 z-40 p-3 rounded-full transition-all duration-300 ${
                isTransitioning
                    ? "opacity-50 cursor-not-allowed"
                    : "opacity-100 cursor-pointer"
            } ${
                isSpiderVerse
                    ? "bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-purple-600 text-white shadow-lg hover:bg-purple-700"
            }`}
        >
            <div className="relative">
                {isSpiderVerse ? (
                    // Exit Spider-Verse icon
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                ) : (
                    // Enter Spider-Verse icon (spider web)
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-6 17c1.513-6.587 7-7.778 7-7.778v-2.222l5 5-5 5v-2.222s-5.448-.97-7 2.222z" />
                    </svg>
                )}

                {/* Tooltip */}
                <div
                    className={`absolute -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded text-xs font-bold ${
                        isSpiderVerse
                            ? "bg-black text-white"
                            : "bg-purple-800 text-white"
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                >
                    {isSpiderVerse ? "Exit Spider-Verse" : "Enter Spider-Verse"}
                </div>
            </div>
        </button>
    )
}

export default DimensionTrigger
