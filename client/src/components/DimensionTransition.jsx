import React, { useEffect, useState } from "react"
import { useDimension } from "../context/DimensionContext"

const DimensionTransition = () => {
    const { isTransitioning, isSpiderVerse } = useDimension()
    const [message, setMessage] = useState("")

    // Messages for dimension transition
    const enteringMessages = [
        "DIMENSIONAL INTERFERENCE DETECTED",
        "ENTERING SPIDER-VERSE...",
        "REALITY SHIFTING...",
        "MULTIVERSE BREACH IMMINENT",
    ]

    const exitingMessages = [
        "RETURNING TO PRIME DIMENSION",
        "REALITY STABILIZING...",
        "CLOSING DIMENSIONAL RIFT",
        "MULTIVERSE BREACH CONTAINED",
    ]

    // Change messages during transition
    useEffect(() => {
        if (isTransitioning) {
            const messages = isSpiderVerse ? exitingMessages : enteringMessages
            let messageIndex = 0

            // Display first message immediately
            setMessage(messages[messageIndex])

            // Change message every 500ms
            const messageInterval = setInterval(() => {
                messageIndex = (messageIndex + 1) % messages.length
                setMessage(messages[messageIndex])
            }, 500)

            return () => clearInterval(messageInterval)
        } else {
            setMessage("")
        }
    }, [isTransitioning, isSpiderVerse])

    if (!isTransitioning) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Glitch overlay */}
            <div className="absolute inset-0 bg-black opacity-80 z-0"></div>

            {/* Glitch lines */}
            <div className="absolute inset-0 overflow-hidden z-10">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white h-px w-full opacity-70"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: 0,
                            height: `${1 + Math.random() * 3}px`,
                            transform: `translateY(${
                                Math.random() * 10 - 5
                            }px)`,
                            animation: `glitch-line ${
                                0.5 + Math.random() * 1
                            }s infinite alternate`,
                        }}
                    ></div>
                ))}
            </div>

            {/* Color distortion overlays */}
            <div className="absolute inset-0 bg-red-500 mix-blend-screen opacity-20 z-10"></div>
            <div
                className="absolute inset-0 bg-blue-500 mix-blend-screen opacity-20 z-10"
                style={{ transform: "translateX(-5px)" }}
            ></div>

            {/* Warning message */}
            <div className="relative z-20 text-center p-8 max-w-2xl">
                <div
                    className="glitch-text text-white text-4xl md:text-6xl font-bold mb-6"
                    data-text={message}
                >
                    {message}
                </div>

                <div className="text-white text-xl animate-pulse">
                    {isSpiderVerse
                        ? "Closing dimensional portal..."
                        : "Opening dimensional portal..."}
                </div>
            </div>
        </div>
    )
}

export default DimensionTransition
