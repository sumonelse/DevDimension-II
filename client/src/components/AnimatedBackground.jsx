import React, { useEffect, useRef, useState } from "react"

const AnimatedBackground = () => {
    const canvasRef = useRef(null)
    const [isLightTheme, setIsLightTheme] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        let animationFrameId
        let particles = []
        let mousePosition = { x: null, y: null }
        let lastMousePosition = { x: null, y: null }

        // Check if light theme is active
        const checkTheme = () => {
            const isLight =
                document.documentElement.classList.contains("light-theme")
            setIsLightTheme(isLight)
        }

        // Set canvas dimensions
        const setCanvasDimensions = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        setCanvasDimensions()
        checkTheme()
        window.addEventListener("resize", setCanvasDimensions)

        // Watch for theme changes
        const themeObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "class") {
                    checkTheme()
                    createGrid() // Recreate grid with new colors
                }
            })
        })

        themeObserver.observe(document.documentElement, { attributes: true })

        // Mouse move event
        const handleMouseMove = (e) => {
            mousePosition.x = e.clientX
            mousePosition.y = e.clientY
        }

        window.addEventListener("mousemove", handleMouseMove)

        // Create grid points
        const createGrid = () => {
            particles = []
            const gridSize = 30 // Distance between points
            const xCount = Math.floor(canvas.width / gridSize) + 1
            const yCount = Math.floor(canvas.height / gridSize) + 1

            // Colors based on theme
            const dotColor = isLightTheme
                ? "rgba(124, 58, 237, 0.25)"
                : "rgba(149, 76, 233, 0.35)"
            const lineColor = isLightTheme
                ? "rgba(124, 58, 237, 0.2)"
                : "rgba(149, 76, 233, 0.3)"

            for (let y = 0; y < yCount; y++) {
                for (let x = 0; x < xCount; x++) {
                    const px = x * gridSize
                    const py = y * gridSize
                    particles.push({
                        x: px,
                        y: py,
                        originX: px,
                        originY: py,
                        size: 1.5,
                        color: dotColor,
                        lineColor: lineColor,
                    })
                }
            }
        }

        createGrid()
        window.addEventListener("resize", createGrid)

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update last mouse position with easing
            if (mousePosition.x !== null && mousePosition.y !== null) {
                if (lastMousePosition.x === null) {
                    lastMousePosition.x = mousePosition.x
                    lastMousePosition.y = mousePosition.y
                } else {
                    lastMousePosition.x +=
                        (mousePosition.x - lastMousePosition.x) * 0.1
                    lastMousePosition.y +=
                        (mousePosition.y - lastMousePosition.y) * 0.1
                }
            }

            // Draw particles and connections
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i]

                // Reset to original position with easing
                p.x += (p.originX - p.x) * 0.05
                p.y += (p.originY - p.y) * 0.05

                // Move particles if mouse is close
                if (lastMousePosition.x !== null) {
                    const dx = lastMousePosition.x - p.x
                    const dy = lastMousePosition.y - p.y
                    const distance = Math.sqrt(dx * dx + dy * dy)
                    const maxDistance = 200

                    if (distance < maxDistance) {
                        const force = (maxDistance - distance) / maxDistance
                        const angle = Math.atan2(dy, dx)
                        const tx = p.x - force * Math.cos(angle) * 30
                        const ty = p.y - force * Math.sin(angle) * 30

                        p.x += (tx - p.x) * 0.3
                        p.y += (ty - p.y) * 0.3
                    }
                }

                // Draw the point with glow effect in dark mode
                if (!isLightTheme) {
                    // Add glow effect in dark mode
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, p.size + 2, 0, Math.PI * 2)
                    ctx.fillStyle = "rgba(124, 58, 237, 0.05)"
                    ctx.fill()
                }

                // Draw the main point
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = p.color
                ctx.fill()

                // Connect nearby points with lines
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j]
                    const dx = p.x - p2.x
                    const dy = p.y - p2.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 60) {
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(p2.x, p2.y)
                        // Use the particle's line color based on theme
                        if (p.lineColor) {
                            const opacity = 0.2 * (1 - distance / 60)
                            ctx.strokeStyle = p.lineColor.replace(
                                /[\d.]+(?=\))/,
                                opacity
                            )
                        }
                        ctx.lineWidth = 0.8
                        ctx.stroke()
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        // Cleanup
        return () => {
            window.removeEventListener("resize", setCanvasDimensions)
            window.removeEventListener("resize", createGrid)
            window.removeEventListener("mousemove", handleMouseMove)
            themeObserver.disconnect()
            cancelAnimationFrame(animationFrameId)
        }
    }, [isLightTheme])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000"
            aria-hidden="true"
            style={{
                touchAction: "none",
                opacity: isLightTheme ? 0.9 : 1,
            }}
        />
    )
}

export default AnimatedBackground
