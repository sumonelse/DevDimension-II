import { useEffect } from "react"

/**
 * Custom hook to handle scroll reveal animations
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
    useEffect(() => {
        const handleScroll = () => {
            const reveals = document.querySelectorAll(selector)

            for (let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight
                const elementTop = reveals[i].getBoundingClientRect().top
                const elementVisible = threshold

                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add(activeClass)
                }
            }
        }

        window.addEventListener("scroll", handleScroll)

        // Trigger once on load with a delay
        const timeoutId = setTimeout(() => {
            handleScroll()
        }, delay)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            clearTimeout(timeoutId)
        }
    }, [selector, threshold, activeClass, delay])
}

export default useScrollReveal
