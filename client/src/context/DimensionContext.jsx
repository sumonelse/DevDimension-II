import React, { createContext, useState, useContext, useEffect } from "react"

// Create the dimension context
const DimensionContext = createContext()

// Custom hook to use the dimension context
export const useDimension = () => useContext(DimensionContext)

// Provider component
export const DimensionProvider = ({ children }) => {
    // State to track which dimension we're in
    const [isSpiderVerse, setIsSpiderVerse] = useState(false)

    // State to track if transition is happening
    const [isTransitioning, setIsTransitioning] = useState(false)

    // Function to toggle between dimensions with transition effect
    const toggleDimension = () => {
        // Start transition
        setIsTransitioning(true)

        // Play glitch sound effect if available
        const glitchSound = document.getElementById("dimension-glitch-sound")
        if (glitchSound) {
            glitchSound.currentTime = 0
            glitchSound
                .play()
                .catch((e) => console.log("Audio play failed:", e))
        }

        // After a delay, change the dimension
        setTimeout(() => {
            setIsSpiderVerse((prev) => !prev)

            // End transition after dimension change with a delay
            setTimeout(() => {
                setIsTransitioning(false)
            }, 1000)
        }, 1500)
    }

    // Check for saved dimension preference
    useEffect(() => {
        const savedDimension = localStorage.getItem("spiderverse-dimension")
        if (savedDimension) {
            setIsSpiderVerse(savedDimension === "true")
        }
    }, [])

    // Save dimension preference when it changes
    useEffect(() => {
        localStorage.setItem("spiderverse-dimension", isSpiderVerse)
    }, [isSpiderVerse])

    // Context value
    const value = {
        isSpiderVerse,
        isTransitioning,
        toggleDimension,
    }

    return (
        <DimensionContext.Provider value={value}>
            {children}
        </DimensionContext.Provider>
    )
}

export default DimensionContext
