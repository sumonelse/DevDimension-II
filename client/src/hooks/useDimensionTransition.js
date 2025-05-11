import { useState, useCallback, useEffect } from "react"

/**
 * Custom hook to handle dimension transitions with optimized performance
 * @param {Object} options - Configuration options
 * @param {boolean} options.initialDimension - Initial dimension state (default: false)
 * @param {number} options.transitionDuration - Duration of the transition in ms (default: 1500)
 * @param {number} options.afterTransitionDelay - Delay after transition in ms (default: 1000)
 * @param {Function} options.onTransitionStart - Callback when transition starts
 * @param {Function} options.onTransitionEnd - Callback when transition ends
 * @param {Function} options.onDimensionChange - Callback when dimension changes
 * @returns {Object} - Transition state and controls
 */
const useDimensionTransition = ({
    initialDimension = false,
    transitionDuration = 1500,
    afterTransitionDelay = 1000,
    onTransitionStart = () => {},
    onTransitionEnd = () => {},
    onDimensionChange = () => {},
} = {}) => {
    const [dimension, setDimension] = useState(initialDimension)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [transitionCount, setTransitionCount] = useState(0)

    // Load saved dimension from localStorage on mount
    useEffect(() => {
        const savedDimension = localStorage.getItem("spiderverse-dimension")
        if (savedDimension !== null) {
            setDimension(savedDimension === "true")
        }
    }, [])

    // Save dimension to localStorage when it changes
    useEffect(() => {
        localStorage.setItem("spiderverse-dimension", dimension)

        // Dispatch custom event for other components to listen to
        const event = new CustomEvent("dimensionChange", {
            detail: { isSpiderVerse: dimension },
        })
        window.dispatchEvent(event)

        // Call the callback
        onDimensionChange(dimension)
    }, [dimension, onDimensionChange])

    // Toggle dimension with transition effect
    const toggleDimension = useCallback(() => {
        if (isTransitioning) return // Prevent multiple transitions

        // Start transition
        setIsTransitioning(true)
        onTransitionStart()

        // Play transition sound if available
        const transitionSound = document.getElementById(
            "dimension-glitch-sound"
        )
        if (transitionSound) {
            transitionSound.currentTime = 0
            transitionSound
                .play()
                .catch((e) => console.log("Audio play failed:", e))
        }

        // After a delay, change the dimension
        setTimeout(() => {
            setDimension((prev) => !prev)
            setTransitionCount((prev) => prev + 1)

            // End transition after dimension change with a delay
            setTimeout(() => {
                setIsTransitioning(false)
                onTransitionEnd()
            }, afterTransitionDelay)
        }, transitionDuration)
    }, [
        isTransitioning,
        transitionDuration,
        afterTransitionDelay,
        onTransitionStart,
        onTransitionEnd,
    ])

    // Force set dimension without transition (useful for initial state)
    const setDimensionWithoutTransition = useCallback((newDimension) => {
        setDimension(Boolean(newDimension))
    }, [])

    return {
        dimension,
        isTransitioning,
        transitionCount,
        toggleDimension,
        setDimensionWithoutTransition,
    }
}

export default useDimensionTransition
