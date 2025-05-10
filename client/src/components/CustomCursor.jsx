import React, { useEffect, useState } from "react"

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [hidden, setHidden] = useState(true)
    const [clicked, setClicked] = useState(false)
    const [linkHovered, setLinkHovered] = useState(false)

    useEffect(() => {
        // Only show custom cursor on desktop devices
        if (window.innerWidth > 768) {
            setHidden(false)
        }

        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY })
        }

        const handleMouseDown = () => setClicked(true)
        const handleMouseUp = () => setClicked(false)

        const handleLinkHoverStart = (e) => {
            if (
                e.target.tagName === "A" ||
                e.target.tagName === "BUTTON" ||
                e.target.closest("a") ||
                e.target.closest("button")
            ) {
                setLinkHovered(true)
            }
        }

        const handleLinkHoverEnd = () => {
            setLinkHovered(false)
        }

        document.addEventListener("mousemove", updatePosition)
        document.addEventListener("mousedown", handleMouseDown)
        document.addEventListener("mouseup", handleMouseUp)
        document.addEventListener("mouseover", handleLinkHoverStart)
        document.addEventListener("mouseout", handleLinkHoverEnd)

        return () => {
            document.removeEventListener("mousemove", updatePosition)
            document.removeEventListener("mousedown", handleMouseDown)
            document.removeEventListener("mouseup", handleMouseUp)
            document.removeEventListener("mouseover", handleLinkHoverStart)
            document.removeEventListener("mouseout", handleLinkHoverEnd)
        }
    }, [])

    if (hidden) return null

    return (
        <>
            {/* Main cursor dot */}
            <div
                className={`fixed w-3 h-3 rounded-full bg-purple-500 z-[9999] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-100 ${
                    clicked ? "scale-50" : "scale-100"
                }`}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                }}
            ></div>

            {/* Cursor ring */}
            <div
                className={`fixed w-8 h-8 rounded-full border-2 border-purple-400 z-[9999] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    linkHovered
                        ? "w-16 h-16 border-cyan-400 bg-cyan-400/10"
                        : clicked
                        ? "w-6 h-6"
                        : ""
                }`}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transitionProperty:
                        "width, height, border-color, background-color, transform",
                }}
            ></div>
        </>
    )
}

export default CustomCursor
