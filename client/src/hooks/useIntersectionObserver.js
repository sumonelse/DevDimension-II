import { useState, useEffect, useRef } from "react"

/**
 * Custom hook for using Intersection Observer API
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.root - Element that is used as the viewport
 * @param {string} options.rootMargin - Margin around the root
 * @param {boolean} options.triggerOnce - Whether to unobserve after first intersection
 * @returns {Array} [ref, isIntersecting, entry]
 */
const useIntersectionObserver = ({
    threshold = 0.1,
    root = null,
    rootMargin = "0px",
    triggerOnce = false,
} = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false)
    const [entry, setEntry] = useState(null)
    const elementRef = useRef(null)
    const observerRef = useRef(null)

    useEffect(() => {
        // Disconnect previous observer if it exists
        if (observerRef.current) {
            observerRef.current.disconnect()
        }

        // Create new observer
        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting)
                setEntry(entry)

                // Unobserve if triggerOnce is true and element is intersecting
                if (triggerOnce && entry.isIntersecting) {
                    observerRef.current.unobserve(entry.target)
                }
            },
            { threshold, root, rootMargin }
        )

        // Observe element if ref is set
        const currentElement = elementRef.current
        if (currentElement) {
            observerRef.current.observe(currentElement)
        }

        // Cleanup observer on unmount
        return () => {
            if (observerRef.current && currentElement) {
                observerRef.current.unobserve(currentElement)
                observerRef.current.disconnect()
            }
        }
    }, [threshold, root, rootMargin, triggerOnce])

    return [elementRef, isIntersecting, entry]
}

export default useIntersectionObserver
