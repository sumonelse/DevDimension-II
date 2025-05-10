import React, { useEffect, useState } from "react"
import { useDimension } from "../context/DimensionContext"

const PageTurnEffect = () => {
    const { isSpiderVerse, toggleDimension } = useDimension()
    const [isAnimating, setIsAnimating] = useState(false)
    const [direction, setDirection] = useState("right") // right or left

    // Trigger page turn effect when dimension changes
    useEffect(() => {
        if (isAnimating) return

        const handleDimensionChange = () => {
            setDirection(isSpiderVerse ? "left" : "right")
            setIsAnimating(true)

            // Reset animation state after animation completes
            setTimeout(() => {
                setIsAnimating(false)
            }, 1500) // Animation duration
        }

        // Add event listener for dimension changes
        window.addEventListener("dimensionChange", handleDimensionChange)

        return () => {
            window.removeEventListener("dimensionChange", handleDimensionChange)
        }
    }, [isSpiderVerse, isAnimating])

    if (!isAnimating) return null

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
            {/* Page turn overlay */}
            <div
                className={`absolute inset-0 bg-white ${
                    direction === "right" ? "origin-left" : "origin-right"
                }`}
                style={{
                    animation: `pageTurn${
                        direction === "right" ? "Right" : "Left"
                    } 1.5s ease-in-out forwards`,
                }}
            >
                {/* Comic book style page */}
                <div className="absolute inset-0 benday-dots opacity-20"></div>

                {/* Page fold shadow */}
                <div
                    className={`absolute inset-y-0 w-20 ${
                        direction === "right" ? "right-0" : "left-0"
                    }`}
                    style={{
                        background: `linear-gradient(to ${
                            direction === "right" ? "left" : "right"
                        }, rgba(0,0,0,0.3), transparent)`,
                        animation: `pageShadow${
                            direction === "right" ? "Right" : "Left"
                        } 1.5s ease-in-out forwards`,
                    }}
                ></div>

                {/* Comic book style decorative elements */}
                <div className="absolute top-1/4 left-1/4 text-spiderverse-red opacity-10 comic-title text-9xl">
                    FLIP!
                </div>
                <div className="absolute bottom-1/4 right-1/4 text-spiderverse-blue opacity-10 comic-title text-9xl">
                    TURN!
                </div>

                {/* Spider-web in corner */}
                <div
                    className={`spider-web spider-web-corner absolute ${
                        direction === "right"
                            ? "top-0 right-0 transform rotate-90"
                            : "top-0 left-0"
                    } opacity-20`}
                ></div>
            </div>

            {/* Add page turn styles to document */}
            <style>
                {`
          @keyframes pageTurnRight {
            0% { transform: perspective(1200px) rotateY(0deg); }
            100% { transform: perspective(1200px) rotateY(-180deg); }
          }
          
          @keyframes pageTurnLeft {
            0% { transform: perspective(1200px) rotateY(0deg); }
            100% { transform: perspective(1200px) rotateY(180deg); }
          }
          
          @keyframes pageShadowRight {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
          }
          
          @keyframes pageShadowLeft {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}
            </style>
        </div>
    )
}

export default PageTurnEffect
