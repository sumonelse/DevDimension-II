import { useEffect, useRef } from "react"
import useReducedMotion from "./useReducedMotion"
import useMediaQuery from "./useMediaQuery"

/**
 * Pointer-driven parallax for `.parallax-layer` elements.
 *
 * Each layer's `--parallax-speed` decides how far it trails the cursor. Updates
 * are batched into a single `requestAnimationFrame` so the transform writes all
 * happen in one frame regardless of how many layers exist.
 *
 * Skipped entirely when the visitor prefers reduced motion, or when there is no
 * fine pointer to track - touch devices have no hover position, so the work
 * would be invisible.
 *
 * @param {boolean} enabled
 */
const useParallax = (enabled = true) => {
    const prefersReducedMotion = useReducedMotion()
    const hasFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)")

    const isActive = enabled && !prefersReducedMotion && hasFinePointer

    const frameRef = useRef(null)
    const mouseRef = useRef({ x: 0, y: 0 })
    const layersRef = useRef([])
    const needsRescanRef = useRef(true)

    useEffect(() => {
        if (!isActive) return

        const rescanLayers = () => {
            const layers = document.querySelectorAll(".parallax-layer")
            layersRef.current = layers

            // Read the custom property once per layer rather than on every frame.
            layers.forEach((layer) => {
                if (!layer.dataset.parallaxSpeed) {
                    const speed = parseFloat(
                        getComputedStyle(layer)
                            .getPropertyValue("--parallax-speed") || "0.05"
                    )
                    layer.dataset.parallaxSpeed = String(
                        Number.isFinite(speed) ? speed : 0.05
                    )
                }
            })

            needsRescanRef.current = false
        }

        const update = () => {
            frameRef.current = null

            if (needsRescanRef.current) rescanLayers()

            const layers = layersRef.current
            if (!layers.length) return

            const offsetX = mouseRef.current.x / window.innerWidth - 0.5
            const offsetY = mouseRef.current.y / window.innerHeight - 0.5

            for (const layer of layers) {
                const speed = parseFloat(layer.dataset.parallaxSpeed) || 0.05
                layer.style.transform = `translate(${offsetX * 100 * speed}px, ${
                    offsetY * 100 * speed
                }px)`
            }
        }

        const scheduleUpdate = () => {
            if (frameRef.current) return
            frameRef.current = requestAnimationFrame(update)
        }

        // A named reference so the listener can actually be removed.
        const handleMouseMove = (event) => {
            mouseRef.current = { x: event.clientX, y: event.clientY }
            scheduleUpdate()
        }

        const handleResize = () => {
            needsRescanRef.current = true
            scheduleUpdate()
        }

        // Layers appear when a dimension swaps its background in.
        const mutationObserver = new MutationObserver(() => {
            needsRescanRef.current = true
            scheduleUpdate()
        })
        mutationObserver.observe(document.body, { childList: true, subtree: true })

        window.addEventListener("mousemove", handleMouseMove, { passive: true })
        window.addEventListener("resize", handleResize, { passive: true })

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("resize", handleResize)
            mutationObserver.disconnect()

            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current)
                frameRef.current = null
            }

            // Reset transforms so a disabled parallax doesn't leave layers stuck
            // at their last offset.
            layersRef.current.forEach((layer) => {
                layer.style.transform = ""
            })
            layersRef.current = []
            needsRescanRef.current = true
        }
    }, [isActive])
}

export default useParallax