import { useEffect } from "react"

/**
 * Reveals elements as they scroll into view.
 *
 * Contract: elements matching `selector` start hidden and get `activeClass`
 * added once they come within `threshold` pixels of the viewport bottom.
 *
 * This used to be built on a throttled `scroll` handler plus a
 * `MutationObserver` watching `class` changes across the whole `document.body`
 * subtree. That observer fired on every single class mutation anywhere on the
 * page - the cursor, glitch overlays, hover states - which then invalidated the
 * cached element list and forced a full re-query on the next scroll frame. Its
 * `resize` cleanup also passed a fresh anonymous function, so the listener was
 * never actually removed.
 *
 * A single `IntersectionObserver` does the same job entirely on the
 * compositor, with no scroll handler at all. A much narrower
 * `MutationObserver` (childList only) is kept solely to pick up `.reveal`
 * elements that appear later, when a lazy dimension swaps its sections in.
 *
 * @param {Object} options
 * @param {string} [options.selector='.reveal'] Elements to reveal.
 * @param {number} [options.threshold=150] Distance from the viewport bottom, in
 *   pixels, at which an element is considered visible.
 * @param {string} [options.activeClass='active'] Class added on reveal.
 */
const useScrollReveal = ({
    selector = ".reveal",
    threshold = 150,
    activeClass = "active",
} = {}) => {
    useEffect(() => {
        if (typeof IntersectionObserver === "undefined") {
            // Very old browser: show everything rather than hiding content.
            document
                .querySelectorAll(selector)
                .forEach((element) => element.classList.add(activeClass))
            return
        }

        const observed = new Set()
        let scanFrame = null

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue

                    // The pixel threshold is evaluated here rather than encoded as
                    // a `rootMargin`, because the margin depends on the viewport
                    // height and would have to be rebuilt on every resize.
                    if (entry.boundingClientRect.top < window.innerHeight - threshold) {
                        entry.target.classList.add(activeClass)
                        observer.unobserve(entry.target)
                        observed.delete(entry.target)
                    }
                }
            },
            { threshold: 0 }
        )

        const scan = () => {
            scanFrame = null

            // Drop anything React has unmounted so the observer never pins
            // detached nodes in memory.
            observed.forEach((element) => {
                if (!element.isConnected) {
                    observer.unobserve(element)
                    observed.delete(element)
                }
            })

            document.querySelectorAll(selector).forEach((element) => {
                if (observed.has(element)) return
                if (element.classList.contains(activeClass)) return

                observed.add(element)
                observer.observe(element)
            })
        }

        const scheduleScan = () => {
            if (scanFrame) return
            scanFrame = requestAnimationFrame(scan)
        }

        // `childList` only. Watching `attributes` here is what made the previous
        // implementation fire on every animation frame that toggled a class.
        const mutationObserver = new MutationObserver(scheduleScan)
        mutationObserver.observe(document.body, { childList: true, subtree: true })

        scan()

        return () => {
            mutationObserver.disconnect()
            observer.disconnect()
            observed.clear()
            if (scanFrame) cancelAnimationFrame(scanFrame)
        }
    }, [selector, threshold, activeClass])
}

export default useScrollReveal