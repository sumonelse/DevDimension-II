import { useEffect, useRef, useState } from "react"
import useReducedMotion from "../hooks/useReducedMotion"
import useMediaQuery from "../hooks/useMediaQuery"

const TRAIL_LENGTH = 8
const TRAIL_LIFETIME = 420 // ms
const TRAIL_COLORS = ["#ffffff", "#FF1744", "#304FFE", "#FFEA00"]

const MODE_COLORS = {
    default: { primary: "#ffffff", secondary: "#FFEA00" },
    spidey: { primary: "#FF1744", secondary: "#304FFE" },
    miles: { primary: "#304FFE", secondary: "#FF1744" },
    gwen: { primary: "#FF4081", secondary: "#FFEA00" },
}

const CURSOR_MODES = Object.keys(MODE_COLORS)

/** Class toggled on <html> while the comic cursor is mounted. */
const CURSOR_ACTIVE_CLASS = "has-comic-cursor"

/**
 * The Spider-Verse comic cursor.
 *
 * This used to keep its pointer position, velocity and eight-point trail in
 * React state, inside an effect that depended on `position` - so every
 * `mousemove` tore down and re-added all five window listeners, and every frame
 * reconciled the cursor plus its trail. The trail also used
 * `bg-${point.color}`, a class name Tailwind cannot see when it scans, so the
 * trail dots rendered unstyled and invisible.
 *
 * Now only low-frequency facts (mode, click, visibility, spider-sense) live in
 * state. Position, velocity and trail geometry are written straight to the DOM
 * inside a single `requestAnimationFrame` loop.
 */
const SpiderverseCursor = () => {
    const prefersReducedMotion = useReducedMotion()
    const hasFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)")

    const isEnabled = !prefersReducedMotion && hasFinePointer

    const [cursorMode, setCursorMode] = useState("default")
    const [isClicking, setIsClicking] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [spiderSense, setSpiderSense] = useState(false)

    const rootRef = useRef(null)
    const innerRef = useRef(null)
    const trailRefs = useRef([])
    const rafRef = useRef(null)

    const pointerRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, stamp: 0 })
    const trailRef = useRef(
        Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0, born: 0 }))
    )
    const senseLockedRef = useRef(false)
    const senseTimerRef = useRef(null)

    // Randomly change cursor mode for variety
    useEffect(() => {
        if (!isEnabled) return

        const interval = setInterval(() => {
            // 30% chance to switch personality every 20s
            if (Math.random() > 0.7) {
                setCursorMode(
                    CURSOR_MODES[Math.floor(Math.random() * CURSOR_MODES.length)]
                )
            }
        }, 20000)

        return () => clearInterval(interval)
    }, [isEnabled])

    useEffect(() => {
        if (!isEnabled) return

        const root = document.documentElement
        root.classList.add(CURSOR_ACTIVE_CLASS)

        const pointer = pointerRef.current
        pointer.stamp = performance.now()

        const frame = () => {
            rafRef.current = requestAnimationFrame(frame)

            const now = performance.now()
            const elapsed = Math.max(1, now - pointer.stamp)
            const moved = Math.hypot(pointer.x - pointer.prevX, pointer.y - pointer.prevY)
            const velocity = moved / elapsed

            // The native cursor is hidden, so this node has to track the pointer.
            if (rootRef.current) {
                rootRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`
            }

            // Velocity stretch: a compositor-only transform, no layout, no render.
            const stretch = Math.min(0.4, velocity * 0.1)
            if (innerRef.current) {
                innerRef.current.style.transform = `scale(${1 + stretch}) rotate(${stretch * 14}deg)`
            }

            if (moved > 3) {
                pointer.prevX = pointer.x
                pointer.prevY = pointer.y
                pointer.stamp = now

                const trail = trailRef.current

                // Shift the tail forward, then write a fresh head.
                for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
                    trail[i].x = trail[i - 1].x
                    trail[i].y = trail[i - 1].y
                    trail[i].born = trail[i - 1].born
                }
                trail[0].x = pointer.x
                trail[0].y = pointer.y
                trail[0].born = now

                for (let i = 0; i < TRAIL_LENGTH; i++) {
                    const node = trailRefs.current[i]
                    if (!node) continue

                    const point = trail[i]
                    if (!point.born) {
                        node.style.opacity = "0"
                        continue
                    }

                    const age = (now - point.born) / TRAIL_LIFETIME
                    if (age >= 1) {
                        node.style.opacity = "0"
                        continue
                    }

                    node.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) scale(${1 - age * 0.65})`
                    node.style.opacity = String((1 - age) * 0.45)
                }

                // Spider-sense triggers on rapid movement.
                if (velocity > 0.5 && !senseLockedRef.current) {
                    senseLockedRef.current = true
                    setSpiderSense(true)
                    clearTimeout(senseTimerRef.current)
                    senseTimerRef.current = setTimeout(() => {
                        senseLockedRef.current = false
                        setSpiderSense(false)
                    }, 500)
                }
            }
        }

        const handleMouseMove = (event) => {
            pointer.x = event.clientX
            pointer.y = event.clientY

            /* Reveal on the first movement rather than waiting for
             * `mouseenter`.
             *
             * This cursor is mounted by clicking the dimension button, so the
             * pointer is always *already inside* the window when it appears -
             * which means no `mouseenter` ever fires, and the cursor stayed
             * invisible until the visitor moved the pointer out of the browser
             * and back in again. Moving the mouse is the thing that should
             * summon it. */
            setIsVisible(true)
        }

        const handleMouseDown = () => setIsClicking(true)
        const handleMouseUp = () => setIsClicking(false)
        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        window.addEventListener("mousemove", handleMouseMove, { passive: true })
        window.addEventListener("mousedown", handleMouseDown)
        window.addEventListener("mouseup", handleMouseUp)
        document.documentElement.addEventListener(
            "mouseleave",
            handleMouseLeave
        )
        document.documentElement.addEventListener(
            "mouseenter",
            handleMouseEnter
        )

        rafRef.current = requestAnimationFrame(frame)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mousedown", handleMouseDown)
            window.removeEventListener("mouseup", handleMouseUp)
            document.documentElement.removeEventListener(
                "mouseleave",
                handleMouseLeave
            )
            document.documentElement.removeEventListener(
                "mouseenter",
                handleMouseEnter
            )

            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            clearTimeout(senseTimerRef.current)

            root.classList.remove(CURSOR_ACTIVE_CLASS)
        }
    }, [isEnabled])

    if (!isEnabled || !isVisible) return null

    const { primary, secondary } = MODE_COLORS[cursorMode]

    return (
        <>
            {/* Comet trail - pooled nodes, positioned imperatively */}
            {Array.from({ length: TRAIL_LENGTH }).map((_, index) => (
                <span
                    key={index}
                    ref={(node) => {
                        trailRefs.current[index] = node
                    }}
                    aria-hidden="true"
                    /* Above every overlay.
                     *
                     * The native cursor is hidden for the whole Spider-Verse
                     * dimension (`html.has-comic-cursor { cursor: none }`), so if
                     * this element sits behind something, the visitor has *no*
                     * visible cursor at all rather than a fallback one. It was at
                     * z-40, which put the Magic Box panel (z-50, portalled to
                     * <body>, so later in paint order) and the project modal
                     * (z-100) on top of it. `pointer-events-none` means it can
                     * never intercept a click. */
                    className="fixed left-0 top-0 pointer-events-none z-[9998] rounded-full"
                    style={{
                        width: 10,
                        height: 10,
                        marginLeft: -5,
                        marginTop: -5,
                        opacity: 0,
                        background:
                            TRAIL_COLORS[index % TRAIL_COLORS.length],
                        boxShadow: `0 0 ${8 - index}px currentColor`,
                        color: TRAIL_COLORS[index % TRAIL_COLORS.length],
                        willChange: "transform, opacity",
                    }}
                />
            ))}

            {/* Cursor body */}
            <div
                ref={rootRef}
                aria-hidden="true"
                /* Topmost layer in the document - see the trail comment. */
                className="fixed left-0 top-0 pointer-events-none z-[9999] will-change-transform"
            >
                <div className="-translate-x-1/2 -translate-y-1/2">
                    <div
                        ref={innerRef}
                        className="transition-transform duration-100 ease-out"
                    >
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`opacity-80 ${
                                isClicking ? "animate-pulse-subtle" : ""
                            }`}
                            style={
                                spiderSense
                                    ? { animation: "spin 0.5s linear infinite" }
                                    : undefined
                            }
                        >
                            <circle
                                cx="20"
                                cy="20"
                                r="18"
                                stroke={primary}
                                strokeWidth="2"
                                fill="none"
                            />
                            <path
                                d="M20 2v36M2 20h36M5.86 5.86l28.28 28.28M34.14 5.86L5.86 34.14"
                                stroke={primary}
                                strokeWidth="1"
                            />
                            <circle
                                cx="20"
                                cy="20"
                                r="10"
                                stroke={secondary}
                                strokeWidth="1"
                                fill="none"
                            />
                            <circle
                                cx="20"
                                cy="20"
                                r="4"
                                stroke={primary}
                                strokeWidth="1"
                                fill="none"
                            />

                            {cursorMode === "spidey" && (
                                <path
                                    d="M20,10 C25,15 30,15 30,20 C30,25 25,25 20,30 C15,25 10,25 10,20 C10,15 15,15 20,10"
                                    stroke={primary}
                                    strokeWidth="1"
                                    fill="none"
                                />
                            )}

                            {cursorMode === "miles" && (
                                <path
                                    d="M15,15 L25,25 M25,15 L15,25"
                                    stroke={primary}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            )}

                            {cursorMode === "gwen" && (
                                <>
                                    <circle
                                        cx="20"
                                        cy="20"
                                        r="7"
                                        stroke={secondary}
                                        strokeWidth="1"
                                        strokeDasharray="3 2"
                                        fill="none"
                                    />
                                    <path
                                        d="M17,17 L23,23 M23,17 L17,23"
                                        stroke={primary}
                                        strokeWidth="1.5"
                                    />
                                </>
                            )}
                        </svg>

                        {/* Click rings */}
                        {isClicking && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div
                                    className="rounded-full animate-ping"
                                    style={{
                                        width: 48,
                                        height: 48,
                                        border: `2px solid ${primary}`,
                                        opacity: 0.7,
                                        boxShadow: `0 0 10px ${primary}`,
                                    }}
                                />
                                <div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-ping"
                                    style={{
                                        width: 32,
                                        height: 32,
                                        border: `2px solid ${secondary}`,
                                        opacity: 0.5,
                                        animationDelay: "0.2s",
                                    }}
                                />
                            </div>
                        )}

                        {/* Spider-sense ring */}
                        {spiderSense && (
                            <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-spider-sense"
                                style={{
                                    width: 80,
                                    height: 80,
                                    border: `2px solid ${secondary}`,
                                    opacity: 0.3,
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SpiderverseCursor