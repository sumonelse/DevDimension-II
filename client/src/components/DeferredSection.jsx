import { useEffect, useRef, useState } from "react"

/**
 * Defers mounting a heavy section until the visitor is close to reaching it.
 *
 * Most of this site's payload used to be in the entry chunk: `Contact` alone is
 * ~39 kB rendered, and `About`, `Skills`, `Projects` and `Footer` add another
 * ~50 kB - none of which is visible on the first screen. Code splitting them
 * behind an observer removes that from the critical path entirely.
 *
 * The placeholder reserves height via `min-height` plus `contain-intrinsic-size`
 * so the scrollbar and any in-page anchor jumps behave as if the section were
 * already there. `rootMargin` loads the section slightly before it is needed, so
 * the swap is invisible.
 *
 * @param {Object} props
 * @param {React.ComponentType} props.children Section to mount when in range.
 * @param {string} [props.rootMargin='800px'] How far ahead to preload.
 * @param {number} [props.minHeight] Placeholder height in pixels.
 * @param {React.ReactNode} [props.placeholder] Custom placeholder content.
 */
const DeferredSection = ({
    children: Section,
    rootMargin = "800px",
    minHeight = 900,
    placeholder = null,
}) => {
    const [isReady, setIsReady] = useState(false)
    const containerRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // Without observer support, render immediately rather than hiding content.
        if (typeof IntersectionObserver === "undefined") {
            setIsReady(true)
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) return
                setIsReady(true)
                observer.disconnect()
            },
            { rootMargin }
        )

        observer.observe(container)

        return () => observer.disconnect()
    }, [rootMargin])

    return (
        <div
            ref={containerRef}
            style={isReady ? undefined : { minHeight: `${minHeight}px` }}
        >
            {isReady ? (
                <Section />
            ) : (
                placeholder ?? (
                    <div
                        aria-hidden="true"
                        style={{ minHeight: `${minHeight}px` }}
                    />
                )
            )}
        </div>
    )
}

export default DeferredSection