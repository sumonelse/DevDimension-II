import React, { useRef, useState } from "react"

const SpiderverseCard = ({
    children,
    className = "",
    depth = 20,
    rotation = 0,
    glare = true,
    border = true,
    shadow = true,
}) => {
    const cardRef = useRef(null)
    const [transform, setTransform] = useState({
        rotateX: 0,
        rotateY: 0,
        translateZ: 0,
        glareX: 50,
        glareY: 50,
    })

    // Handle mouse movement for 3D effect
    const handleMouseMove = (e) => {
        if (!cardRef.current) return

        const card = cardRef.current
        const rect = card.getBoundingClientRect()

        // Calculate mouse position relative to card center
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const mouseX = e.clientX - centerX
        const mouseY = e.clientY - centerY

        // Calculate rotation based on mouse position
        const rotateY = (mouseX / (rect.width / 2)) * 10 // Max 10 degrees
        const rotateX = -(mouseY / (rect.height / 2)) * 10 // Max 10 degrees

        // Calculate glare position
        const glareX = ((e.clientX - rect.left) / rect.width) * 100
        const glareY = ((e.clientY - rect.top) / rect.height) * 100

        // Update transform state
        setTransform({
            rotateX,
            rotateY,
            translateZ: depth,
            glareX,
            glareY,
        })
    }

    // Reset transform on mouse leave
    const handleMouseLeave = () => {
        setTransform({
            rotateX: 0,
            rotateY: 0,
            translateZ: 0,
            glareX: 50,
            glareY: 50,
        })
    }

    return (
        <div
            ref={cardRef}
            className={`relative transition-transform duration-200 ${className}`}
            style={{
                transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) rotateZ(${rotation}deg) translateZ(${transform.translateZ}px)`,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Main content */}
            <div
                className={`relative z-10 h-full ${
                    border ? "comic-border" : ""
                } ${shadow ? "shadow-lg" : ""} overflow-hidden`}
                style={{ transformStyle: "preserve-3d" }}
            >
                {children}

                {/* Glare effect */}
                {glare && (
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: `radial-gradient(circle at ${transform.glareX}% ${transform.glareY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`,
                            opacity:
                                Math.abs(transform.rotateX) / 10 +
                                Math.abs(transform.rotateY) / 10,
                        }}
                    ></div>
                )}
            </div>

            {/* Card edge effect */}
            {depth > 0 && (
                <>
                    <div
                        className="absolute left-0 top-0 w-full h-full bg-black"
                        style={{
                            transform: `translateZ(${-depth}px)`,
                            transformStyle: "preserve-3d",
                        }}
                    ></div>

                    {/* Side edges */}
                    <div
                        className="absolute left-0 top-0 w-[2px] h-full bg-black origin-left"
                        style={{ transform: `rotateY(90deg) translateZ(0)` }}
                    ></div>
                    <div
                        className="absolute right-0 top-0 w-[2px] h-full bg-black origin-right"
                        style={{ transform: `rotateY(-90deg) translateZ(0)` }}
                    ></div>
                    <div
                        className="absolute left-0 top-0 w-full h-[2px] bg-black origin-top"
                        style={{ transform: `rotateX(-90deg) translateZ(0)` }}
                    ></div>
                    <div
                        className="absolute left-0 bottom-0 w-full h-[2px] bg-black origin-bottom"
                        style={{ transform: `rotateX(90deg) translateZ(0)` }}
                    ></div>
                </>
            )}
        </div>
    )
}

export default SpiderverseCard
