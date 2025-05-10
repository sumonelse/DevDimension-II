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
        "SPIDER-SENSE TINGLING...",
        "COMIC BOOK PHYSICS ACTIVATED",
    ]

    const exitingMessages = [
        "RETURNING TO PRIME DIMENSION",
        "REALITY STABILIZING...",
        "CLOSING DIMENSIONAL RIFT",
        "MULTIVERSE BREACH CONTAINED",
        "RESTORING NORMAL PHYSICS...",
        "SPIDER-SENSE FADING",
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

            {/* Spider webs in corners */}
            <div className="spider-web spider-web-corner absolute top-0 left-0 transform rotate-0 opacity-30"></div>
            <div className="spider-web spider-web-corner absolute top-0 right-0 transform rotate-90 opacity-30"></div>
            <div className="spider-web spider-web-corner absolute bottom-0 left-0 transform -rotate-90 opacity-30"></div>
            <div className="spider-web spider-web-corner absolute bottom-0 right-0 transform rotate-180 opacity-30"></div>

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
            <div className="absolute inset-0 bg-spiderverse-red mix-blend-screen opacity-20 z-10"></div>
            <div
                className="absolute inset-0 bg-spiderverse-blue mix-blend-screen opacity-20 z-10"
                style={{ transform: "translateX(-5px)" }}
            ></div>

            {/* Comic book action words */}
            <div className="action-word absolute top-[20%] left-[10%] opacity-30">
                WHOOSH!
            </div>
            <div className="action-word absolute bottom-[20%] right-[10%] opacity-30">
                CRACK!
            </div>

            {/* Warning message */}
            <div className="relative z-20 text-center p-8 max-w-2xl">
                <div
                    className="dimension-glitch text-white text-4xl md:text-6xl font-bold mb-6 font-['Bangers']"
                    data-text={message}
                >
                    {message}
                </div>

                <div className="text-white text-xl animate-pulse font-['Comic_Neue']">
                    {isSpiderVerse
                        ? "Closing dimensional portal..."
                        : "Opening dimensional portal..."}
                </div>

                {/* Spider-Man style divider */}
                <div className="spidey-divider my-6"></div>

                {/* Warning text */}
                <div className="warning-text text-lg mt-4">
                    {isSpiderVerse
                        ? "CAUTION: RETURNING TO NORMAL DIMENSION"
                        : "WARNING: ENTERING SPIDER-VERSE DIMENSION"}
                </div>
            </div>

            {/* Portal effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border-8 border-white opacity-10 portal-open"></div>
        </div>
    )
}

export default DimensionTransition
