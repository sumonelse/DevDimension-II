import React, { useEffect, useState } from "react"
import { useDimension } from "../context/DimensionContext"

const FloatingComicPanels = () => {
    const { isSpiderVerse } = useDimension()
    const [panels, setPanels] = useState([])

    // Comic panel content options
    const panelContents = [
        {
            type: "text",
            content: "THWIP!",
            color: "spiderverse-red",
            size: "text-4xl",
        },
        {
            type: "text",
            content: "POW!",
            color: "spiderverse-yellow",
            size: "text-5xl",
        },
        {
            type: "text",
            content: "BANG!",
            color: "spiderverse-blue",
            size: "text-4xl",
        },
        {
            type: "text",
            content: "ZOOM!",
            color: "spiderverse-purple",
            size: "text-5xl",
        },
        {
            type: "image",
            content:
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50,0 C55,25 75,40 100,50 C75,60 55,75 50,100 C45,75 25,60 0,50 C25,40 45,25 50,0 Z' fill='%23ff0000'/%3E%3C/svg%3E",
            size: "w-16 h-16",
        },
        {
            type: "image",
            content:
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='none' stroke='%23000' stroke-width='2'/%3E%3Cpath d='M50,5 L50,95 M5,50 L95,50 M15,15 L85,85 M15,85 L85,15' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E",
            size: "w-20 h-20",
        },
        {
            type: "web",
            size: "w-24 h-24",
        },
    ]

    // Generate random panels
    useEffect(() => {
        if (!isSpiderVerse) {
            setPanels([])
            return
        }

        // Create random panels
        const createPanels = () => {
            const newPanels = []
            const panelCount = Math.floor(Math.random() * 3) + 3 // 3-5 panels

            for (let i = 0; i < panelCount; i++) {
                // Random position
                const x = Math.random() * 80 + 10 // 10-90%
                const y = Math.random() * 80 + 10 // 10-90%

                // Random size
                const size = Math.random() * 100 + 50 // 50-150px

                // Random rotation
                const rotation = Math.random() * 20 - 10 // -10 to 10 degrees

                // Random content
                const contentIndex = Math.floor(
                    Math.random() * panelContents.length
                )
                const content = panelContents[contentIndex]

                // Random animation duration
                const duration = Math.random() * 20 + 10 // 10-30s

                // Random animation delay
                const delay = Math.random() * 5 // 0-5s

                // Create panel
                newPanels.push({
                    id: i,
                    x,
                    y,
                    size,
                    rotation,
                    content,
                    duration,
                    delay,
                })
            }

            setPanels(newPanels)
        }

        createPanels()

        // Recreate panels periodically
        const interval = setInterval(createPanels, 30000) // Every 30 seconds

        return () => clearInterval(interval)
    }, [isSpiderVerse])

    if (!isSpiderVerse || panels.length === 0) return null

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {panels.map((panel) => (
                <div
                    key={panel.id}
                    className="absolute comic-border bg-white opacity-10"
                    style={{
                        left: `${panel.x}%`,
                        top: `${panel.y}%`,
                        width: `${panel.size}px`,
                        height: `${panel.size}px`,
                        transform: `rotate(${panel.rotation}deg)`,
                        animation: `floatPanel ${panel.duration}s ease-in-out infinite ${panel.delay}s`,
                    }}
                >
                    <div className="absolute inset-0 flex items-center justify-center">
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
                            <div className="spider-web spider-web-full opacity-50"></div>
                        )}
                    </div>

                    {/* Halftone overlay */}
                    <div className="absolute inset-0 benday-dots opacity-30"></div>
                </div>
            ))}

            {/* Add floating animation to document */}
            <style>
                {`
          @keyframes floatPanel {
            0% { transform: translate(0, 0) rotate(${
                Math.random() * 20 - 10
            }deg); }
            25% { transform: translate(${Math.random() * 100 - 50}px, ${
                    Math.random() * 100 - 50
                }px) rotate(${Math.random() * 20 - 10}deg); }
            50% { transform: translate(${Math.random() * 100 - 50}px, ${
                    Math.random() * 100 - 50
                }px) rotate(${Math.random() * 20 - 10}deg); }
            75% { transform: translate(${Math.random() * 100 - 50}px, ${
                    Math.random() * 100 - 50
                }px) rotate(${Math.random() * 20 - 10}deg); }
            100% { transform: translate(0, 0) rotate(${
                Math.random() * 20 - 10
            }deg); }
          }
        `}
            </style>
        </div>
    )
}

export default FloatingComicPanels
