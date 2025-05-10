import React, { useEffect, useState } from "react"

const SpiderverseLoader = ({ isLoading, setIsLoaded }) => {
    const [progress, setProgress] = useState(0)
    const [loadingText, setLoadingText] = useState("Initializing...")

    const loadingTexts = [
        "Initializing...",
        "Connecting to Spider-Verse...",
        "Calibrating dimensional portal...",
        "Scanning multiverse...",
        "Locating Earth-616...",
        "Establishing quantum connection...",
        "Rendering comic panels...",
        "Activating spider-sense...",
        "Preparing web-shooters...",
        "Almost there...",
    ]

    useEffect(() => {
        if (!isLoading) return

        let currentProgress = 0
        const interval = setInterval(() => {
            currentProgress += Math.floor(Math.random() * 5) + 1

            if (currentProgress >= 100) {
                currentProgress = 100
                clearInterval(interval)

                // Delay a bit before setting loaded to true
                setTimeout(() => {
                    setIsLoaded(true)
                }, 500)
            }

            setProgress(currentProgress)

            // Update loading text based on progress
            const textIndex = Math.floor(
                (currentProgress / 100) * loadingTexts.length
            )
            setLoadingText(
                loadingTexts[Math.min(textIndex, loadingTexts.length - 1)]
            )
        }, 150)

        return () => clearInterval(interval)
    }, [isLoading, setIsLoaded])

    if (!isLoading) return null

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
            {/* Spider-web in corners */}
            <div className="spider-web spider-web-corner absolute top-0 left-0 transform rotate-0 opacity-30"></div>
            <div className="spider-web spider-web-corner absolute top-0 right-0 transform rotate-90 opacity-30"></div>
            <div className="spider-web spider-web-corner absolute bottom-0 left-0 transform -rotate-90 opacity-30"></div>
            <div className="spider-web spider-web-corner absolute bottom-0 right-0 transform rotate-180 opacity-30"></div>

            {/* Comic book style logo */}
            <div className="mb-8 relative">
                <div className="text-6xl md:text-8xl font-['Bangers'] text-white text-center mb-2 animate-pulse">
                    PORTFOLIO
                </div>
                <div className="text-2xl md:text-3xl font-['Comic_Neue'] text-spiderverse-red font-bold text-center">
                    SUMIT MAURYA
                </div>

                {/* Spider symbol */}
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-20">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        width="150"
                        height="150"
                        fill="white"
                    >
                        <path d="M50,0 C55,25 75,40 100,50 C75,60 55,75 50,100 C45,75 25,60 0,50 C25,40 45,25 50,0 Z" />
                    </svg>
                </div>
            </div>

            {/* Progress bar with comic style */}
            <div className="w-64 md:w-96 h-6 bg-gray-800 rounded-full comic-border overflow-hidden relative">
                <div
                    className="h-full bg-gradient-to-r from-spiderverse-blue via-spiderverse-red to-spiderverse-blue rounded-full"
                    style={{
                        width: `${progress}%`,
                        transition: "width 0.3s ease-out",
                    }}
                ></div>

                {/* Web lines connecting to progress bar */}
                <div className="absolute -left-4 top-1/2 w-4 h-2 web-shooter"></div>
                <div
                    className="absolute -right-4 top-1/2 w-4 h-2 web-shooter"
                    style={{ transform: "scaleX(-1)" }}
                ></div>
            </div>

            {/* Loading text with glitch effect */}
            <div
                className="mt-4 text-white font-['Comic_Neue'] text-lg dimension-glitch"
                data-text={loadingText}
            >
                {loadingText}
            </div>

            {/* Progress percentage */}
            <div className="mt-2 text-spiderverse-yellow font-bold">
                {progress}%
            </div>

            {/* Comic book style decorative elements */}
            <div className="absolute top-1/4 right-1/4 text-spiderverse-yellow opacity-10 comic-title text-9xl">
                POW!
            </div>
            <div className="absolute bottom-1/4 left-1/4 text-spiderverse-red opacity-10 comic-title text-9xl">
                BANG!
            </div>

            {/* Random Ben-Day dots clusters */}
            <div className="absolute top-1/3 right-1/3 w-40 h-40 benday-dots opacity-10"></div>
            <div className="absolute bottom-1/3 left-1/3 w-60 h-60 benday-dots opacity-10"></div>
        </div>
    )
}

export default SpiderverseLoader
