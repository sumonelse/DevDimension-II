import React, { useEffect, useState, useRef } from "react"

const CustomCursor = () => {
    const cursorRef = useRef(null)
    const cursorRingRef = useRef(null)
    const [isHovering, setIsHovering] = useState(false)
    const [isClicking, setIsClicking] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [cursorText, setCursorText] = useState("")
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        // Only show custom cursor on desktop devices
        if (window.innerWidth <= 768) {
            setIsMobile(true)
            return
        }

        // Show cursor after a short delay to prevent initial position jump
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 500)

        const cursor = cursorRef.current
        const cursorRing = cursorRingRef.current

        const moveCursor = (e) => {
            const { clientX, clientY } = e

            // Main cursor follows immediately
            cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`

            // Cursor ring follows with a slight delay for smooth effect
            cursorRing.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`
        }

        const handleMouseDown = () => {
            setIsClicking(true)
        }

        const handleMouseUp = () => {
            setIsClicking(false)
        }

        const handleMouseEnter = () => {
            setIsVisible(true)
        }

        const handleMouseLeave = () => {
            setIsVisible(false)
        }

        // Handle interactive elements
        const handleLinkHover = (e) => {
            const target = e.target

            // Check if hovering over a link, button, or interactive element
            const isLink =
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button") ||
                target.classList.contains("interactive") ||
                target.closest(".interactive")

            if (isLink) {
                setIsHovering(true)

                // Check for data-cursor-text attribute
                const cursorTextAttr =
                    target.getAttribute("data-cursor-text") ||
                    (target.closest("[data-cursor-text]") &&
                        target
                            .closest("[data-cursor-text]")
                            .getAttribute("data-cursor-text"))

                if (cursorTextAttr) {
                    setCursorText(cursorTextAttr)
                } else {
                    setCursorText("")
                }
            } else {
                setIsHovering(false)
                setCursorText("")
            }
        }

        // Add event listeners
        document.addEventListener("mousemove", moveCursor)
        document.addEventListener("mousedown", handleMouseDown)
        document.addEventListener("mouseup", handleMouseUp)
        document.addEventListener("mouseenter", handleMouseEnter)
        document.addEventListener("mouseleave", handleMouseLeave)
        document.addEventListener("mouseover", handleLinkHover)

        // Clean up
        return () => {
            document.removeEventListener("mousemove", moveCursor)
            document.removeEventListener("mousedown", handleMouseDown)
            document.removeEventListener("mouseup", handleMouseUp)
            document.removeEventListener("mouseenter", handleMouseEnter)
            document.removeEventListener("mouseleave", handleMouseLeave)
            document.removeEventListener("mouseover", handleLinkHover)
            clearTimeout(timer)
        }
    }, [])

    if (isMobile) return null

    return (
        <>
            {/* Main cursor dot */}
            <div
                ref={cursorRef}
                className={`fixed w-3 h-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 pointer-events-none z-[9999] mix-blend-difference ${
                    isVisible ? "opacity-100" : "opacity-0"
                } ${isClicking ? "scale-50" : "scale-100"}`}
                style={{
                    transform: "translate3d(-50%, -50%, 0)",
                    transition:
                        "opacity 0.3s ease, transform 0.1s ease, width 0.3s ease, height 0.3s ease",
                }}
            />

            {/* Cursor ring */}
            <div
                ref={cursorRingRef}
                className={`fixed rounded-full pointer-events-none z-[9998] ${
                    isVisible ? "opacity-100" : "opacity-0"
                } ${isHovering ? "w-16 h-16 border-2" : "w-8 h-8 border"} ${
                    isClicking ? "scale-90" : "scale-100"
                } ${isHovering ? "bg-purple-600/10" : ""}`}
                style={{
                    transform: "translate3d(-50%, -50%, 0)",
                    borderColor: isHovering
                        ? "rgba(124, 58, 237, 0.7)"
                        : "rgba(139, 92, 246, 0.5)",
                    transition:
                        "opacity 0.3s ease, width 0.3s ease, height 0.3s ease, transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease",
                }}
            >
                {/* Text inside cursor for interactive elements */}
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
