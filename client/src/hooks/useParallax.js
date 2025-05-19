import { useEffect, useRef } from "react"

/**
 * Custom hook to add parallax effect to elements with performance optimizations
 * @param {boolean} enabled - Whether the parallax effect is enabled
 */
const useParallax = (enabled = true) => {
    // Use a ref to store the request animation frame ID
    const requestRef = useRef(null)
    // Use a ref to store the last mouse position
    const mousePositionRef = useRef({ x: 0, y: 0 })
    // Use a ref to store the layers to avoid querying the DOM on every mouse move
    const layersRef = useRef([])
    // Use a ref to track if we need to update the layers reference
    const shouldUpdateLayersRef = useRef(true)
    // Use a throttle timer to limit updates
    const throttleTimerRef = useRef(null)

    useEffect(() => {
        if (!enabled) return

        // Function to update the parallax effect
        const updateParallax = () => {
            // Only query the DOM for layers when necessary
            if (shouldUpdateLayersRef.current) {
                layersRef.current = document.querySelectorAll(".parallax-layer")
                shouldUpdateLayersRef.current = false

                // Set up the speed values once to avoid repeated getComputedStyle calls
                layersRef.current.forEach((layer) => {
                    if (!layer.dataset.parallaxSpeed) {
                        layer.dataset.parallaxSpeed = parseFloat(
                            getComputedStyle(layer).getPropertyValue(
                                "--parallax-speed"
                            ) || "0.05"
                        )
                    }
                })
            }

            if (!layersRef.current.length) return

            const mouseX = mousePositionRef.current.x / window.innerWidth - 0.5
            const mouseY = mousePositionRef.current.y / window.innerHeight - 0.5

            layersRef.current.forEach((layer) => {
                const speed = layer.dataset.parallaxSpeed
                const x = mouseX * 100 * speed
                const y = mouseY * 100 * speed
                layer.style.transform = `translate(${x}px, ${y}px)`
            })
        }

        // Throttled mouse move handler
        const handleMouseMove = (e) => {
            mousePositionRef.current = { x: e.clientX, y: e.clientY }

            // Throttle the updates to reduce performance impact
            if (!throttleTimerRef.current) {
                throttleTimerRef.current = setTimeout(() => {
                    throttleTimerRef.current = null

                    // Use requestAnimationFrame for smoother updates
                    if (requestRef.current) {
                        cancelAnimationFrame(requestRef.current)
                    }
                    requestRef.current = requestAnimationFrame(updateParallax)
                }, 16) // ~60fps
            }
        }

        // Listen for DOM changes that might add/remove parallax layers
        const mutationObserver = new MutationObserver(() => {
            shouldUpdateLayersRef.current = true
        })

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
        })

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("resize", () => {
            shouldUpdateLayersRef.current = true
        })

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("resize", () => {
                shouldUpdateLayersRef.current = true
            })
            mutationObserver.disconnect()

            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current)
            }

            if (throttleTimerRef.current) {
                clearTimeout(throttleTimerRef.current)
            }
        }
    }, [enabled])
}

export default useParallax
