import React, { useEffect, useState } from "react"

const BrandLoader = ({ isLoading, setIsLoaded }) => {
    const [progress, setProgress] = useState(0)
    const [loadingText, setLoadingText] = useState("Initializing")

    useEffect(() => {
        if (!isLoading) return

        // Simulate loading progress
        let currentProgress = 0
        const interval = setInterval(() => {
            currentProgress += Math.random() * 15

            if (currentProgress > 100) {
                currentProgress = 100
                clearInterval(interval)
            }

            setProgress(Math.min(currentProgress, 100))

            // Update loading text based on progress
            if (currentProgress < 30) {
                setLoadingText("Loading assets")
            } else if (currentProgress < 60) {
                setLoadingText("Preparing environment")
            } else if (currentProgress < 90) {
                setLoadingText("Optimizing experience")
            } else {
                setLoadingText("Almost ready")
            }
        }, 200)

        return () => clearInterval(interval)
    }, [isLoading])

    // Fade out animation when loading completes
    useEffect(() => {
        if (progress === 100) {
            const timeout = setTimeout(() => {
                if (setIsLoaded) setIsLoaded(true)
            }, 500)

            return () => clearTimeout(timeout)
        }
    }, [progress, setIsLoaded])

    if (!isLoading) return null

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark-950 transition-opacity duration-500">
            {/* Logo animation */}
            <div className="mb-8 relative">
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-purple-600 via-fuchsia-500 to-pink-500 flex items-center justify-center animate-pulse-slow shadow-lg shadow-purple-700/20">
                    <div className="text-white text-5xl font-bold font-heading tracking-tight">
                        SM
                    </div>
                </div>

                {/* Animated particles */}
                <div className="absolute -inset-10 pointer-events-none">
                    {[...Array(8)].map((_, i) => {
                        const colors = [
                            "bg-purple-500/60",
                            "bg-pink-500/60",
                            "bg-fuchsia-500/60",
                            "bg-cyan-500/60",
                        ]
                        const sizes = ["w-1.5 h-1.5", "w-2 h-2", "w-3 h-3"]
                        return (
                            <div
                                key={i}
                                className={`absolute ${
                                    sizes[i % sizes.length]
                                } rounded-full ${colors[i % colors.length]}`}
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    animation: `float-particle ${
                                        5 + Math.random() * 5
                                    }s linear infinite`,
                                    animationDelay: `${Math.random() * 5}s`,
                                }}
                            ></div>
                        )
                    })}
                </div>
            </div>

            {/* Brand name */}
            <h1 className="text-3xl font-heading font-bold mb-6 text-gradient-purple">
                Sumit Maurya
            </h1>

            {/* Loading text */}
            <div className="text-sm text-gray-400 mb-4 min-h-[20px] text-center">
                {loadingText}
                <span className="inline-block animate-pulse">...</span>
            </div>

            {/* Progress bar */}
            <div className="w-64 h-1 bg-dark-800 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 rounded-full"
                    style={{
                        width: `${progress}%`,
                        transition: "width 0.3s ease-out",
                    }}
                ></div>
            </div>

            {/* Progress percentage */}
            <div className="mt-2 text-xs text-gray-500">
                {Math.round(progress)}%
            </div>
        </div>
    )
}

export default BrandLoader
