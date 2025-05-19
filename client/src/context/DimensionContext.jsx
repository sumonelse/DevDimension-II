import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
    useCallback,
} from "react"

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

    // State for dimension glitches
    const [dimensionGlitches, setDimensionGlitches] = useState([])

    // State for spider-sense
    const [spiderSenseActive, setSpiderSenseActive] = useState(false)

    // State for multiverse awareness (easter egg)
    const [multiverseAwareness, setMultiverseAwareness] = useState(0)

    // State for audio mute
    const [isAudioMuted, setIsAudioMuted] = useState(false)

    // State for post-credit scene
    const [showPostCredit, setShowPostCredit] = useState(false)

    // Function to toggle between dimensions with transition effect
    const toggleDimension = useCallback(() => {
        if (isTransitioning) return // Prevent multiple transitions

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

        // Increase multiverse awareness
        setMultiverseAwareness((prev) => Math.min(prev + 1, 10))
    }, [isTransitioning])

    // Random dimension glitches
    useEffect(() => {
        if (!isSpiderVerse) return

        // Create random glitches in the Spider-Verse dimension
        const glitchInterval = setInterval(() => {
            // 5% chance of a glitch
            if (Math.random() > 0.95) {
                // Create a new glitch
                const newGlitch = {
                    id: Date.now(),
                    x: Math.random() * 100, // Random position (0-100%)
                    y: Math.random() * 100, // Random position (0-100%)
                    duration: Math.random() * 2 + 0.5, // Random duration (0.5-2.5s)
                    size: Math.random() * 100 + 50, // Random size (50-150px)
                    type: Math.random() > 0.5 ? "visual" : "audio", // Random type
                }

                setDimensionGlitches((prev) => [...prev, newGlitch])

                // Remove glitch after it's done
                setTimeout(() => {
                    setDimensionGlitches((prev) =>
                        prev.filter((glitch) => glitch.id !== newGlitch.id)
                    )
                }, newGlitch.duration * 1000)

                // Play glitch sound if it's an audio glitch
                if (newGlitch.type === "audio" && window.spiderverseAudio) {
                    window.spiderverseAudio.playClick()
                }
            }
        }, 5000) // Check every 5 seconds

        return () => clearInterval(glitchInterval)
    }, [isSpiderVerse])

    // Spider-sense feature
    const activateSpiderSense = useCallback(() => {
        if (!isSpiderVerse || spiderSenseActive) return

        setSpiderSenseActive(true)

        // Deactivate after 5 seconds
        setTimeout(() => {
            setSpiderSenseActive(false)
        }, 5000)
    }, [isSpiderVerse, spiderSenseActive])

    // Toggle audio mute
    const toggleAudioMute = useCallback(() => {
        setIsAudioMuted((prev) => {
            const newValue = !prev
            // Store preference in localStorage
            localStorage.setItem("spiderverse-audio-muted", String(newValue))

            // If we're unmuting, play a sound to confirm audio is working
            if (prev && window.spiderverseAudio) {
                setTimeout(() => {
                    window.spiderverseAudio.playClick()
                }, 100)
            }

            return newValue
        })
    }, [])

    // Trigger post-credit scene with enhanced functionality
    const triggerPostCredit = useCallback(() => {
        if (!isSpiderVerse) return

        // Play special sound effect if available
        if (window.spiderverseAudio) {
            window.spiderverseAudio.playWebShoot()
        }

        setShowPostCredit(true)

        // Hide after 35 seconds (extended to allow for more dialogue)
        setTimeout(() => {
            setShowPostCredit(false)
        }, 35000)

        // Increase multiverse awareness when post-credit scene is viewed
        setMultiverseAwareness((prev) => Math.min(prev + 1, 10))

        // Store in localStorage that post-credit has been shown
        localStorage.setItem("post-credit-shown", "true")
    }, [isSpiderVerse])

    // Check for saved preferences
    useEffect(() => {
        const savedDimension = localStorage.getItem("spiderverse-dimension")
        if (savedDimension) {
            setIsSpiderVerse(savedDimension === "true")
        }

        // Check for saved multiverse awareness
        const savedAwareness = localStorage.getItem("multiverse-awareness")
        if (savedAwareness) {
            setMultiverseAwareness(parseInt(savedAwareness, 10))
        }

        // Check for saved audio preference
        const savedAudioMuted = localStorage.getItem("spiderverse-audio-muted")
        if (savedAudioMuted !== null) {
            setIsAudioMuted(savedAudioMuted === "true")
        }
    }, [])

    // Save dimension preference when it changes
    useEffect(() => {
        localStorage.setItem("spiderverse-dimension", isSpiderVerse)
    }, [isSpiderVerse])

    // Save multiverse awareness when it changes
    useEffect(() => {
        localStorage.setItem("multiverse-awareness", multiverseAwareness)
    }, [multiverseAwareness])

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(
        () => ({
            isSpiderVerse,
            isTransitioning,
            toggleDimension,
            dimensionGlitches,
            spiderSenseActive,
            activateSpiderSense,
            multiverseAwareness,
            isAudioMuted,
            toggleAudioMute,
            showPostCredit,
            triggerPostCredit,
        }),
        [
            isSpiderVerse,
            isTransitioning,
            toggleDimension,
            dimensionGlitches,
            spiderSenseActive,
            activateSpiderSense,
            multiverseAwareness,
            isAudioMuted,
            toggleAudioMute,
            showPostCredit,
            triggerPostCredit,
        ]
    )

    // Memoize the glitches rendering to prevent unnecessary re-renders
    const glitchesRender = useMemo(
        () =>
            dimensionGlitches.map((glitch) => (
                <div
                    key={glitch.id}
                    className="fixed pointer-events-none z-50"
                    style={{
                        left: `${glitch.x}%`,
                        top: `${glitch.y}%`,
                        width: `${glitch.size}px`,
                        height: `${glitch.size}px`,
                        animation: `dimensionGlitch ${glitch.duration}s ease-in-out`,
                    }}
                >
                    {glitch.type === "visual" && (
                        <div className="w-full h-full bg-white mix-blend-difference"></div>
                    )}
                </div>
            )),
        [dimensionGlitches]
    )

    // Memoize the spider-sense overlay to prevent unnecessary re-renders
    const spiderSenseOverlay = useMemo(
        () =>
            spiderSenseActive && (
                <div className="fixed inset-0 pointer-events-none z-40 bg-yellow-500/20 animate-pulse">
                    <div className="absolute inset-0 spider-web spider-web-full opacity-20"></div>
                </div>
            ),
        [spiderSenseActive]
    )

    return (
        <DimensionContext.Provider value={contextValue}>
            {children}

            {/* Render dimension glitches */}
            {glitchesRender}

            {/* Spider-sense overlay */}
            {spiderSenseOverlay}
        </DimensionContext.Provider>
    )
}

export default DimensionContext
