import { useEffect, useRef, useState } from "react"
import useReducedMotion from "../hooks/useReducedMotion"
import useMediaQuery from "../hooks/useMediaQuery"

/** Toggled on <html> while this cursor is mounted. See `index.css`. */
const CURSOR_ACTIVE_CLASS = "has-custom-cursor"

const HOVER_SELECTOR = "a, button, [role='button'], label, summary, .interactive"

/**
 * The default-dimension cursor: a dot that tracks the pointer exactly plus a
 * ring that lags behind it.
 *
 * Fixes over the previous version:
 *  - `moveCursor` overwrote the inline `translate3d(-50%, -50%, 0)` that centred
 *    the dot and ring, so both sat permanently offset by half their size from
 *    the first mouse move onwards.
 *  - Nothing ever hid the native cursor, so visitors saw two cursors at once.
 *  - A transform was written for every `mousemove` event; they are now batched
 *    into a single `requestAnimationFrame`.
 *  - Gating used `window.innerWidth <= 768`, so tablets got a cursor with no
 *    pointer to drive it. It now keys off `(hover: hover) and (pointer: fine)`.
 */
const CustomCursor = () => {
    const prefersReducedMotion = useReducedMotion()
    const hasFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)")

    const isEnabled = !prefersReducedMotion && hasFinePointer

    const dotRef = useRef(null)
    const ringRef = useRef(null)
    const pointerRef = useRef({ x: 0, y: 0 })
    const frameRef = useRef(null)

    const [isVisible, setIsVisible] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [isClicking, setIsClicking] = useState(false)
    const [cursorText, setCursorText] = useState("")

    useEffect(() => {
        if (!isEnabled) return

        const root = document.documentElement
        root.classList.add(CURSOR_ACTIVE_CLASS)

        // A short delay avoids a visible jump on first paint.
        const visibleTimer = setTimeout(() => setIsVisible(true), 500)

        const flush = () => {
            frameRef.current = null

            const { x, y } = pointerRef.current
            // The trailing `translate(-50%, -50%)` is what centres each node on
            // the pointer; it has to survive every update.
            const dot = dotRef.current
            const ring = ringRef.current

            if (dot) dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
            if (ring) {
                ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
            }
        }

        const handleMouseMove = (event) => {
            pointerRef.current.x = event.clientX
            pointerRef.current.y = event.clientY

            if (frameRef.current) return
            frameRef.current = requestAnimationFrame(flush)
        }

        const handleMouseDown = () => setIsClicking(true)
        const handleMouseUp = () => setIsClicking(false)
        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        const handleMouseOver = (event) => {
            const target = event.target
            if (!(target instanceof Element)) return

            const interactive = target.closest(HOVER_SELECTOR)
            if (!interactive) {
                setIsHovering(false)
                setCursorText("")
                return
            }

            setIsHovering(true)
            setCursorText(interactive.getAttribute("data-cursor-text") || "")
        }

        document.addEventListener("mousemove", handleMouseMove, { passive: true })
        document.addEventListener("mousedown", handleMouseDown)
        document.addEventListener("mouseup", handleMouseUp)
        document.addEventListener("mouseleave", handleMouseLeave)
        document.addEventListener("mouseenter", handleMouseEnter)
        document.addEventListener("mouseover", handleMouseOver, { passive: true })

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mousedown", handleMouseDown)
            document.removeEventListener("mouseup", handleMouseUp)
            document.removeEventListener("mouseleave", handleMouseLeave)
            document.removeEventListener("mouseenter", handleMouseEnter)
            document.removeEventListener("mouseover", handleMouseOver)

            if (frameRef.current) cancelAnimationFrame(frameRef.current)
            clearTimeout(visibleTimer)

            root.classList.remove(CURSOR_ACTIVE_CLASS)
        }
    }, [isEnabled])

    if (!isEnabled) return null

    return (
        <>
            {/* Main cursor dot */}
            <div
                ref={dotRef}
                aria-hidden="true"
                className={`fixed left-0 top-0 w-3 h-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 pointer-events-none z-[9999] mix-blend-difference ${
                    isVisible ? "opacity-100" : "opacity-0"
                } ${isClicking ? "scale-50" : "scale-100"}`}
                style={{
                    transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
                    transition:
                        "opacity 0.3s ease, transform 0.1s ease, scale 0.15s ease",
                    willChange: "transform",
                }}
            />

            {/* Lagging ring */}
            <div
                ref={ringRef}
                aria-hidden="true"
                className={`fixed left-0 top-0 rounded-full pointer-events-none z-[9998] ${
                    isVisible ? "opacity-100" : "opacity-0"
                } ${isHovering ? "w-16 h-16 border-2" : "w-8 h-8 border"} ${
                    isClicking ? "scale-90" : "scale-100"
                } ${isHovering ? "bg-purple-600/10" : ""}`}
                style={{
                    transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
                    borderColor: isHovering
                        ? "rgba(124, 58, 237, 0.7)"
                        : "rgba(139, 92, 246, 0.5)",
                    transition:
                        "opacity 0.3s ease, width 0.3s ease, height 0.3s ease, transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, scale 0.15s ease",
                    willChange: "transform",
                }}
            >
                {cursorText && (
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white whitespace-nowrap">
                        {cursorText}
                    </span>
                )}
            </div>
        </>
    )
}

export default CustomCursor