import { useEffect, useRef } from "react"

/**
 * Custom hook to handle scroll reveal animations with performance optimizations
 * @param {Object} options - Configuration options
 * @param {string} options.selector - CSS selector for elements to reveal (default: '.reveal')
 * @param {number} options.threshold - Visibility threshold in pixels (default: 150)
 * @param {string} options.activeClass - Class to add when element is visible (default: 'active')
 * @param {number} options.delay - Delay before checking elements on initial load (default: 300)
 */
const useScrollReveal = ({
    selector = ".reveal",
    threshold = 150,
    activeClass = "active",
    delay = 300,
} = {}) => {
    // Use a ref to store elements that need to be revealed
    const elementsToReveal = useRef([])
    // Use a ref to track if we need to update the elements reference
    const shouldUpdateElements = useRef(true)
    // Use a ref for the request animation frame ID
    const requestRef = useRef(null)
    // Use a ref for throttling
    const throttleTimerRef = useRef(null)

    useEffect(() => {
        // Function to check if elements are in viewport and reveal them
        const revealElements = () => {
            // Only query the DOM when necessary
            if (shouldUpdateElements.current) {
                elementsToReveal.current = Array.from(
                    document.querySelectorAll(selector)
                ).filter((el) => !el.classList.contains(activeClass))
                shouldUpdateElements.current = false
            }

            // If no elements to reveal, don't continue processing
            if (elementsToReveal.current.length === 0) return

            const windowHeight = window.innerHeight
            const elementsStillHidden = []

            // Process each element
            elementsToReveal.current.forEach((element) => {
                const elementTop = element.getBoundingClientRect().top

                if (elementTop < windowHeight - threshold) {
                    element.classList.add(activeClass)
                } else {
                    // Keep track of elements that are still hidden
                    elementsStillHidden.push(element)
                }
            })

            // Update our ref with only the elements that are still hidden
            elementsToReveal.current = elementsStillHidden
        }

        // Throttled scroll handler
        const handleScroll = () => {
            if (!throttleTimerRef.current) {
                throttleTimerRef.current = setTimeout(() => {
                    throttleTimerRef.current = null

                    // Use requestAnimationFrame for smoother updates
                    if (requestRef.current) {
                        cancelAnimationFrame(requestRef.current)
                    }
                    requestRef.current = requestAnimationFrame(revealElements)
                }, 100) // Throttle to 10 updates per second
            }
        }

        // Listen for DOM changes that might add new reveal elements
        const mutationObserver = new MutationObserver(() => {
            shouldUpdateElements.current = true
        })

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["class"],
        })

        window.addEventListener("scroll", handleScroll, { passive: true })
        window.addEventListener(
            "resize",
            () => {
                shouldUpdateElements.current = true
            },
            { passive: true }
        )

        // Trigger once on load with a delay
        const timeoutId = setTimeout(() => {
            shouldUpdateElements.current = true
            revealElements()
        }, delay)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", () => {
                shouldUpdateElements.current = true
            })
            mutationObserver.disconnect()
            clearTimeout(timeoutId)

            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current)
            }

            if (throttleTimerRef.current) {
                clearTimeout(throttleTimerRef.current)
            }
        }
    }, [selector, threshold, activeClass, delay])
}

export default useScrollReveal
