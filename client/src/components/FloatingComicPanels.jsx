import React, { useEffect, useState, useRef } from "react"
import { useDimension } from "../context/DimensionContext"

const FloatingComicPanels = () => {
    const { isSpiderVerse } = useDimension()
    const [panels, setPanels] = useState([])
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const containerRef = useRef(null)

    // Update dimensions on resize
    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        window.addEventListener("resize", updateDimensions)
        updateDimensions()

        return () => window.removeEventListener("resize", updateDimensions)
    }, [])

    // Enhanced comic panel content options
    const panelContents = [
        // Action words with different styles
        {
            type: "text",
            content: "THWIP!",
            color: "spiderverse-red",
            size: "text-4xl",
            style: "font-bold transform -rotate-3 drop-shadow-lg",
        },
        {
            type: "text",
            content: "POW!",
            color: "spiderverse-yellow",
            size: "text-5xl",
            style: "font-extrabold transform rotate-2 drop-shadow-xl",
        },
        {
            type: "text",
            content: "BANG!",
            color: "spiderverse-blue",
            size: "text-4xl",
            style: "font-bold transform -rotate-1 drop-shadow-lg",
        },
        {
            type: "text",
            content: "ZOOM!",
            color: "spiderverse-purple",
            size: "text-5xl",
            style: "font-extrabold transform rotate-3 drop-shadow-xl",
        },
        {
            type: "text",
            content: "WHAM!",
            color: "spiderverse-cyan",
            size: "text-6xl",
            style: "font-black transform -rotate-2 drop-shadow-2xl",
        },
        {
            type: "text",
            content: "CRASH!",
            color: "spiderverse-green",
            size: "text-5xl",
            style: "font-extrabold transform rotate-1 drop-shadow-xl",
        },
        // Comic style images
        {
            type: "image",
            content:
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50,0 C55,25 75,40 100,50 C75,60 55,75 50,100 C45,75 25,60 0,50 C25,40 45,25 50,0 Z' fill='%23ff0000'/%3E%3C/svg%3E",
            size: "w-16 h-16",
            style: "filter: drop-shadow(0 0 8px rgba(255,0,0,0.5))",
        },
        {
            type: "image",
            content:
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='none' stroke='%23000' stroke-width='2'/%3E%3Cpath d='M50,5 L50,95 M5,50 L95,50 M15,15 L85,85 M15,85 L85,15' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E",
            size: "w-20 h-20",
            style: "filter: drop-shadow(0 0 5px rgba(255,255,255,0.5))",
        },
        // Spider-Man logo
        {
            type: "image",
            content:
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50,10 C60,30 80,40 90,40 C80,50 80,70 90,90 C70,80 50,80 50,90 C50,80 30,80 10,90 C20,70 20,50 10,40 C20,40 40,30 50,10 Z' fill='%23ff0000' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E",
            size: "w-24 h-24",
            style: "filter: drop-shadow(0 0 10px rgba(255,0,0,0.7))",
        },
        // Web pattern
        {
            type: "web",
            size: "w-24 h-24",
            style: "opacity-70",
        },
        // Comic speech bubble
        {
            type: "speech",
            content: "Hello!",
            size: "w-32 h-24",
            style: "font-comic text-black",
        },
        // Thought bubble
        {
            type: "thought",
            content: "Hmm...",
            size: "w-32 h-24",
            style: "font-comic text-black",
        },
        // Comic panel with mini scene
        {
            type: "panel",
            size: "w-40 h-32",
            style: "",
        },
    ]

    // Generate random panels with more variety
    useEffect(() => {
        if (!isSpiderVerse || dimensions.width === 0) {
            setPanels([])
            return
        }

        // Create random panels
        const createPanels = () => {
            const newPanels = []
            // Scale panel count based on screen size
            const basePanelCount = Math.min(
                Math.floor(dimensions.width / 300),
                8
            )
            const panelCount = basePanelCount + Math.floor(Math.random() * 3) // Add some randomness

            for (let i = 0; i < panelCount; i++) {
                // Random position with better distribution
                const x = Math.random() * 85 + 5 // 5-90%
                const y = Math.random() * 85 + 5 // 5-90%

                // Random size with more variety
                const baseSize = 50 + Math.random() * 100 // 50-150px
                const aspectRatio = 0.7 + Math.random() * 0.6 // 0.7-1.3
                const width = baseSize
                const height = baseSize * aspectRatio

                // Random rotation with more variety
                const rotation = Math.random() * 30 - 15 // -15 to 15 degrees

                // Random content with weighted selection
                let contentIndex
                if (Math.random() < 0.6) {
                    // 60% chance for text
                    contentIndex = Math.floor(Math.random() * 6) // First 6 items are text
                } else {
                    // 40% chance for other elements
                    contentIndex =
                        6 +
                        Math.floor(Math.random() * (panelContents.length - 6))
                }
                const content = panelContents[contentIndex]

                // Random animation parameters
                const duration = 15 + Math.random() * 25 // 15-40s
                const delay = Math.random() * 10 // 0-10s
                const amplitude = 30 + Math.random() * 70 // 30-100px movement

                // Random opacity
                const opacity = 0.1 + Math.random() * 0.3 // 0.1-0.4

                // Random z-index for layering
                const zIndex = Math.floor(Math.random() * 5)

                // Random animation path
                const path = Math.floor(Math.random() * 4) // 0-3 different paths

                // Create panel with enhanced properties
                newPanels.push({
                    id: i,
                    x,
                    y,
                    width,
                    height,
                    rotation,
                    content,
                    duration,
                    delay,
                    amplitude,
                    opacity,
                    zIndex,
                    path,
                    // Add pulsating effect to some panels
                    pulsate: Math.random() > 0.7,
                    // Add glitch effect to some panels
                    glitch: Math.random() > 0.8,
                })
            }

            setPanels(newPanels)
        }

        createPanels()

        // Recreate panels periodically with varying intervals
        const interval = setInterval(
            createPanels,
            20000 + Math.random() * 10000
        ) // 20-30 seconds

        return () => clearInterval(interval)
    }, [isSpiderVerse, dimensions])

    // Generate unique animation keyframes for each panel path type
    const generateAnimationKeyframes = () => {
        let keyframes = ""

        for (let i = 0; i < 4; i++) {
            const points = []
            for (let j = 0; j <= 4; j++) {
                const x =
                    (Math.random() * 200 - 100) * (j === 0 || j === 4 ? 0 : 1) // Start and end at 0
                const y =
                    (Math.random() * 200 - 100) * (j === 0 || j === 4 ? 0 : 1) // Start and end at 0
                const rotate =
                    (Math.random() * 40 - 20) * (j === 0 || j === 4 ? 0 : 1) // Start and end at 0
                points.push(
                    `${
                        j * 25
                    }% { transform: translate(${x}px, ${y}px) rotate(${rotate}deg); }`
                )
            }
            keyframes += `@keyframes floatPanel${i} { ${points.join(" ")} }\n`
        }

        // Add pulsating animation
        keyframes += `
            @keyframes panelPulsate {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `

        // Add glitch animation
        keyframes += `
            @keyframes panelGlitch {
                0% { transform: translate(0, 0) skew(0deg); filter: hue-rotate(0deg); }
                20% { transform: translate(3px, 2px) skew(2deg); filter: hue-rotate(90deg); }
                40% { transform: translate(-2px, -1px) skew(-1deg); filter: hue-rotate(180deg); }
                60% { transform: translate(1px, 3px) skew(0deg); filter: hue-rotate(270deg); }
                80% { transform: translate(-3px, -2px) skew(-2deg); filter: hue-rotate(360deg); }
                100% { transform: translate(0, 0) skew(0deg); filter: hue-rotate(0deg); }
            }
        `

        return keyframes
    }

    if (!isSpiderVerse || panels.length === 0) return null

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        >
            {panels.map((panel) => (
                <div
                    key={panel.id}
                    className={`absolute comic-border bg-white ${
                        panel.glitch ? "dimension-glitch" : ""
                    }`}
                    style={{
                        left: `${panel.x}%`,
                        top: `${panel.y}%`,
                        width: `${panel.width}px`,
                        height: `${panel.height}px`,
                        transform: `rotate(${panel.rotation}deg)`,
                        opacity: panel.opacity,
                        zIndex: panel.zIndex,
                        animation: `floatPanel${panel.path} ${
                            panel.duration
                        }s ease-in-out infinite ${panel.delay}s${
                            panel.pulsate
                                ? `, panelPulsate 3s ease-in-out infinite ${
                                      panel.delay / 2
                                  }s`
                                : ""
                        }`,
                        boxShadow: "3px 3px 10px rgba(0,0,0,0.5)",
                    }}
                    data-text={
                        panel.content.type === "text"
                            ? panel.content.content
                            : ""
                    }
                >
                    <div
                        className={`absolute inset-0 flex items-center justify-center ${panel.content.style}`}
                    >
                        {panel.content.type === "text" && (
                            <div
                                className={`font-['Bangers'] ${panel.content.size} text-${panel.content.color}`}
                            >
                                {panel.content.content}
                            </div>
                        )}

                        {panel.content.type === "image" && (
                            <img
                                src={panel.content.content}
                                alt="Comic element"
                                className={panel.content.size}
                            />
                        )}

                        {panel.content.type === "web" && (
                            <div className="spider-web spider-web-full opacity-70"></div>
                        )}

                        {panel.content.type === "speech" && (
                            <div className="dialogue-box w-full h-full flex items-center justify-center text-lg font-bold">
                                {panel.content.content}
                            </div>
                        )}

                        {panel.content.type === "thought" && (
                            <div className="thought-bubble w-full h-full flex items-center justify-center text-lg font-bold">
                                {panel.content.content}
                            </div>
                        )}

                        {panel.content.type === "panel" && (
                            <div className="w-full h-full p-2 relative">
                                <div className="absolute top-2 left-2 text-xs font-bold text-gray-500">
                                    MEANWHILE...
                                </div>
                                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-spiderverse-blue/30 to-transparent"></div>
                                <div className="absolute right-2 bottom-2 w-8 h-8 bg-spiderverse-red rounded-full"></div>
                            </div>
                        )}
                    </div>

                    {/* Enhanced overlays */}
                    <div className="absolute inset-0 benday-dots opacity-30"></div>
                    <div className="absolute inset-0 halftone-overlay opacity-20"></div>

                    {/* Add subtle border effect */}
                    <div className="absolute inset-0 border-4 border-black opacity-80"></div>
                </div>
            ))}

            {/* Add dynamic animations to document */}
            <style>{generateAnimationKeyframes()}</style>
        </div>
    )
}

export default FloatingComicPanels
