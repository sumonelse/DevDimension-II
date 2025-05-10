import { useEffect } from "react"

/**
 * Custom hook to add parallax effect to elements
 * @param {boolean} enabled - Whether the parallax effect is enabled
 */
const useParallax = (enabled = true) => {
    useEffect(() => {
        if (!enabled) return

        const handleMouseMove = (e) => {
            const parallaxLayers = document.querySelectorAll(".parallax-layer")

            if (!parallaxLayers.length) return

            const mouseX = e.clientX / window.innerWidth - 0.5
            const mouseY = e.clientY / window.innerHeight - 0.5

            parallaxLayers.forEach((layer) => {
                const speed = parseFloat(
                    getComputedStyle(layer).getPropertyValue(
                        "--parallax-speed"
                    ) || "0.05"
                )
                const x = mouseX * 100 * speed
                const y = mouseY * 100 * speed
                layer.style.transform = `translate(${x}px, ${y}px)`
            })
        }

        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [enabled])
}

export default useParallax
