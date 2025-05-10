import React, { useEffect, useState } from "react"
import { useDimension } from "../context/DimensionContext"

const SpiderverseCursor = () => {
    const { isSpiderVerse } = useDimension()
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isClicking, setIsClicking] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [trail, setTrail] = useState([])

    useEffect(() => {
        if (!isSpiderVerse) return

        // Initialize cursor position
        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY })
            setIsVisible(true)

            // Add to trail
            setTrail((prev) => {
                const newTrail = [
                    ...prev,
                    { x: e.clientX, y: e.clientY, id: Date.now() },
                ]
                // Keep only the last 5 positions
                return newTrail.slice(-5)
            })
        }

        // Handle mouse events
        const handleMouseDown = () => setIsClicking(true)
        const handleMouseUp = () => setIsClicking(false)
        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        // Add event listeners
        window.addEventListener("mousemove", updatePosition)
        window.addEventListener("mousedown", handleMouseDown)
        window.addEventListener("mouseup", handleMouseUp)
        document.documentElement.addEventListener(
            "mouseleave",
            handleMouseLeave
        )
        document.documentElement.addEventListener(
            "mouseenter",
            handleMouseEnter
        )

        return () => {
            window.removeEventListener("mousemove", updatePosition)
            window.removeEventListener("mousedown", handleMouseDown)
            window.removeEventListener("mouseup", handleMouseUp)
            document.documentElement.removeEventListener(
                "mouseleave",
                handleMouseLeave
            )
            document.documentElement.removeEventListener(
                "mouseenter",
                handleMouseEnter
            )
        }
    }, [isSpiderVerse])

    if (!isSpiderVerse || !isVisible) return null

    return (
        <>
            {/* Main cursor */}
            <div
                className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transition: "transform 0.1s ease-out",
                }}
            >
                {/* Spider-web cursor */}
                <div
                    className={`transition-all duration-150 ${
                        isClicking ? "scale-75" : "scale-100"
                    }`}
                >
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="opacity-70"
                    >
                        <circle
                            cx="20"
                            cy="20"
                            r="18"
                            stroke="white"
                            strokeWidth="2"
                            fill="none"
                        />
                        <path
                            d="M20 2v36M2 20h36M5.86 5.86l28.28 28.28M34.14 5.86L5.86 34.14"
                            stroke="white"
                            strokeWidth="1"
                        />
                        <circle
                            cx="20"
                            cy="20"
                            r="10"
                            stroke="white"
                            strokeWidth="1"
                            fill="none"
                        />
                        <circle
                            cx="20"
                            cy="20"
                            r="4"
                            stroke="white"
                            strokeWidth="1"
                            fill="none"
                        />
                    </svg>
                </div>

                {/* Click effect */}
                {isClicking && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-10 h-10 rounded-full border-2 border-white animate-ping opacity-70"></div>
                    </div>
                )}
            </div>

            {/* Trail effect */}
            {trail.map((point, index) => (
                <div
                    key={point.id + index}
                    className="fixed pointer-events-none z-40 w-1 h-1 rounded-full bg-white"
                    style={{
                        left: `${point.x}px`,
                        top: `${point.y}px`,
                        opacity: 0.3 - index * 0.05,
                        transform: `scale(${1 - index * 0.15})`,
                    }}
                />
            ))}
        </>
    )
}

export default SpiderverseCursor
