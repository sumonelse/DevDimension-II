import React, { useEffect, useState, useRef } from "react"
import { useDimension } from "../context/DimensionContext"

const SpiderverseCursor = () => {
    const { isSpiderVerse } = useDimension()
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 })
    const [isClicking, setIsClicking] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [trail, setTrail] = useState([])
    const [webShot, setWebShot] = useState(null)
    const [cursorMode, setCursorMode] = useState("default") // 'default', 'spidey', 'miles', 'gwen'
    const [cursorSize, setCursorSize] = useState(40)
    const [spiderSense, setSpiderSense] = useState(false)
    const cursorRef = useRef(null)
    const lastUpdateTime = useRef(Date.now())
    const webShotTimeout = useRef(null)
    const modeChangeInterval = useRef(null)

    // Calculate cursor velocity for effects
    const calculateVelocity = (current, previous) => {
        const now = Date.now()
        const timeDiff = now - lastUpdateTime.current
        if (timeDiff === 0) return 0

        const distance = Math.sqrt(
            Math.pow(current.x - previous.x, 2) +
                Math.pow(current.y - previous.y, 2)
        )

        const velocity = distance / timeDiff
        lastUpdateTime.current = now
        return velocity
    }

    // Randomly change cursor mode for variety
    useEffect(() => {
        if (!isSpiderVerse) return

        const changeCursorMode = () => {
            const modes = ["default", "spidey", "miles", "gwen"]
            const randomMode = modes[Math.floor(Math.random() * modes.length)]
            setCursorMode(randomMode)
        }

        // Change cursor mode every 20-30 seconds
        modeChangeInterval.current = setInterval(() => {
            if (Math.random() > 0.7) {
                // 30% chance to change
                changeCursorMode()
            }
        }, 20000)

        return () => {
            if (modeChangeInterval.current) {
                clearInterval(modeChangeInterval.current)
            }
        }
    }, [isSpiderVerse])

    useEffect(() => {
        if (!isSpiderVerse) return

        // Initialize cursor position
        const updatePosition = (e) => {
            setPrevPosition(position)
            setPosition({ x: e.clientX, y: e.clientY })
            setIsVisible(true)

            // Calculate velocity for dynamic effects
            const velocity = calculateVelocity(
                { x: e.clientX, y: e.clientY },
                prevPosition
            )

            // Adjust cursor size based on velocity
            const newSize = Math.max(30, Math.min(50, 40 + velocity * 10))
            setCursorSize(newSize)

            // Trigger spider-sense on rapid movement
            if (velocity > 0.5) {
                setSpiderSense(true)
                setTimeout(() => setSpiderSense(false), 500)
            }

            // Add to trail with color variation
            setTrail((prev) => {
                const colors = [
                    "white",
                    "spiderverse-red",
                    "spiderverse-blue",
                    "spiderverse-yellow",
                ]
                const color = colors[Math.floor(Math.random() * colors.length)]

                const newTrail = [
                    ...prev,
                    {
                        x: e.clientX,
                        y: e.clientY,
                        id: Date.now(),
                        color,
                        size: 1 + velocity * 2, // Dynamic size based on velocity
                    },
                ]
                // Keep only the last 8 positions
                return newTrail.slice(-8)
            })
        }

        // Handle mouse events
        const handleMouseDown = (e) => {
            setIsClicking(true)

            // Create web shot effect on click
            if (Math.random() > 0.7) {
                // 30% chance for web shot
                const angle = Math.random() * 360
                const length = 50 + Math.random() * 100

                setWebShot({
                    x: e.clientX,
                    y: e.clientY,
                    angle,
                    length,
                    id: Date.now(),
                })

                // Clear previous timeout
                if (webShotTimeout.current) {
                    clearTimeout(webShotTimeout.current)
                }

                // Remove web shot after animation
                webShotTimeout.current = setTimeout(() => {
                    setWebShot(null)
                }, 1000)
            }
        }

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

            if (webShotTimeout.current) {
                clearTimeout(webShotTimeout.current)
            }
        }
    }, [isSpiderVerse, position, prevPosition])

    // Get cursor color based on mode
    const getCursorColor = () => {
        switch (cursorMode) {
            case "spidey":
                return "#FF1744" // Red
            case "miles":
                return "#304FFE" // Blue
            case "gwen":
                return "#FF4081" // Pink
            default:
                return "white"
        }
    }

    // Get cursor secondary color
    const getSecondaryColor = () => {
        switch (cursorMode) {
            case "spidey":
                return "#304FFE" // Blue
            case "miles":
                return "#FF1744" // Red
            case "gwen":
                return "#FFEA00" // Yellow
            default:
                return "#FFEA00"
        }
    }

    if (!isSpiderVerse || !isVisible) return null

    return (
        <>
            {/* Main cursor */}
            <div
                ref={cursorRef}
                className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transition: "transform 0.05s ease-out",
                }}
            >
                {/* Spider-web cursor with dynamic styling */}
                <div
                    className={`transition-all duration-150 ${
                        isClicking ? "scale-75" : "scale-100"
                    } ${spiderSense ? "animate-spider-sense" : ""}`}
                    style={{
                        filter: spiderSense
                            ? `drop-shadow(0 0 5px ${getCursorColor()})`
                            : "none",
                    }}
                >
                    <svg
                        width={cursorSize}
                        height={cursorSize}
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`opacity-80 ${
                            isClicking ? "animate-pulse-subtle" : ""
                        }`}
                        style={{
                            animation: spiderSense
                                ? "spin 0.5s linear infinite"
                                : "",
                        }}
                    >
                        {/* Dynamic cursor based on mode */}
                        <circle
                            cx="20"
                            cy="20"
                            r="18"
                            stroke={getCursorColor()}
                            strokeWidth="2"
                            fill="none"
                        />
                        <path
                            d="M20 2v36M2 20h36M5.86 5.86l28.28 28.28M34.14 5.86L5.86 34.14"
                            stroke={getCursorColor()}
                            strokeWidth="1"
                        />
                        <circle
                            cx="20"
                            cy="20"
                            r="10"
                            stroke={getSecondaryColor()}
                            strokeWidth="1"
                            fill="none"
                        />
                        <circle
                            cx="20"
                            cy="20"
                            r="4"
                            stroke={getCursorColor()}
                            strokeWidth="1"
                            fill="none"
                        />

                        {/* Mode-specific elements */}
                        {cursorMode === "spidey" && (
                            <path
                                d="M20,10 C25,15 30,15 30,20 C30,25 25,25 20,30 C15,25 10,25 10,20 C10,15 15,15 20,10"
                                stroke={getCursorColor()}
                                strokeWidth="1"
                                fill="none"
                            />
                        )}

                        {cursorMode === "miles" && (
                            <path
                                d="M15,15 L25,25 M25,15 L15,25"
                                stroke={getCursorColor()}
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        )}

                        {cursorMode === "gwen" && (
                            <>
                                <circle
                                    cx="20"
                                    cy="20"
                                    r="7"
                                    stroke={getSecondaryColor()}
                                    strokeWidth="1"
                                    strokeDasharray="3 2"
                                    fill="none"
                                />
                                <path
                                    d="M17,17 L23,23 M23,17 L17,23"
                                    stroke={getCursorColor()}
                                    strokeWidth="1.5"
                                />
                            </>
                        )}
                    </svg>
                </div>

                {/* Enhanced click effect */}
                {isClicking && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div
                            className="rounded-full animate-ping"
                            style={{
                                width: `${cursorSize * 1.2}px`,
                                height: `${cursorSize * 1.2}px`,
                                border: `2px solid ${getCursorColor()}`,
                                opacity: 0.7,
                                boxShadow: `0 0 10px ${getCursorColor()}`,
                            }}
                        ></div>

                        {/* Secondary pulse effect */}
                        <div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full animate-ping"
                            style={{
                                width: `${cursorSize * 0.8}px`,
                                height: `${cursorSize * 0.8}px`,
                                border: `2px solid ${getSecondaryColor()}`,
                                opacity: 0.5,
                                animationDelay: "0.2s",
                            }}
                        ></div>
                    </div>
                )}

                {/* Spider-sense indicator */}
                {spiderSense && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div
                            className="rounded-full animate-spider-sense"
                            style={{
                                width: `${cursorSize * 2}px`,
                                height: `${cursorSize * 2}px`,
                                border: `2px solid ${getSecondaryColor()}`,
                                opacity: 0.3,
                            }}
                        ></div>
                    </div>
                )}
            </div>

            {/* Enhanced trail effect with color variation */}
            {trail.map((point, index) => {
                const baseOpacity = 0.4 - index * 0.05
                const size = point.size * (1 - index * 0.1)

                return (
                    <div
                        key={point.id}
                        className={`fixed pointer-events-none z-40 rounded-full bg-${point.color}`}
                        style={{
                            left: `${point.x}px`,
                            top: `${point.y}px`,
                            opacity: baseOpacity,
                            width: `${size}px`,
                            height: `${size}px`,
                            transform: `scale(${1 - index * 0.1})`,
                            boxShadow:
                                index < 3
                                    ? `0 0 ${index + 2}px ${getCursorColor()}`
                                    : "none",
                        }}
                    />
                )
            })}

            {/* Web shot effect */}
            {webShot && (
                <div
                    className="fixed pointer-events-none z-45 web-shooter"
                    style={{
                        left: `${webShot.x}px`,
                        top: `${webShot.y}px`,
                        width: `${webShot.length}px`,
                        height: "3px",
                        transformOrigin: "left center",
                        transform: `rotate(${webShot.angle}deg)`,
                        background: `repeating-linear-gradient(
                            90deg,
                            transparent,
                            transparent 5px,
                            ${getCursorColor()} 5px,
                            ${getCursorColor()} 10px
                        )`,
                        animation: "web-shoot 0.5s ease-out forwards",
                        opacity: 0.8,
                    }}
                >
                    {/* Web end point */}
                    <div
                        className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{
                            width: "6px",
                            height: "6px",
                            backgroundColor: getCursorColor(),
                            boxShadow: `0 0 5px ${getCursorColor()}`,
                        }}
                    ></div>
                </div>
            )}

            {/* Custom cursor styles */}
            <style>
                {`
                    html, body {
                        cursor: none !important;
                    }
                    
                    a, button, [role="button"], input, select, textarea {
                        cursor: none !important;
                    }
                    
                    a:hover ~ #cursor-root .cursor-dot,
                    button:hover ~ #cursor-root .cursor-dot,
                    [role="button"]:hover ~ #cursor-root .cursor-dot {
                        transform: scale(1.5);
                    }
                    
                    @keyframes spider-sense-pulse {
                        0% {
                            transform: scale(1);
                            opacity: 0.5;
                        }
                        100% {
                            transform: scale(1.5);
                            opacity: 0;
                        }
                    }
                `}
            </style>
        </>
    )
}

export default SpiderverseCursor
