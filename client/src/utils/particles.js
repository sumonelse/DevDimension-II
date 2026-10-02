/**
 * Particle bursts for the dimension transition.
 *
 * The previous implementation generated a fresh `@keyframes` block in a brand
 * new `<style>` element for every single particle, appended it to
 * `document.head`, then removed it again when the animation ended. A single
 * click could inject 35 style elements and 35 timers.
 *
 * The keyframes here are declared exactly once, and each particle supplies its
 * own direction and scale through CSS custom properties - which the compositor
 * can interpolate without any script involvement.
 *
 * Particles are skipped entirely for visitors who prefer reduced motion.
 */

import prefersReducedMotion from "./prefersReducedMotion"

const STYLE_ID = "dd2-particle-keyframes"

const KEYFRAMES = `
@keyframes dd2-particle-float {
    from {
        transform: translate(-50%, -50%);
        opacity: var(--dd2-from-opacity, 0.8);
    }
    to {
        transform: translate(calc(-50% + var(--dd2-x, 0px)), calc(-50% + var(--dd2-y, 0px)));
        opacity: 0;
    }
}

@keyframes dd2-particle-burst {
    from {
        transform: translate(-50%, -50%) scale(0.5);
        opacity: 1;
    }
    to {
        transform: translate(calc(-50% + var(--dd2-x, 0px)), calc(-50% + var(--dd2-y, 0px))) scale(var(--dd2-scale, 1));
        opacity: 0;
    }
}
`

const ensureKeyframes = () => {
    if (document.getElementById(STYLE_ID)) return
    const style = document.createElement("style")
    style.id = STYLE_ID
    style.textContent = KEYFRAMES
    document.head.appendChild(style)
}

const randomBetween = (min, max) => min + Math.random() * (max - min)

/**
 * Emit a burst of particles.
 *
 * @param {Object} options
 * @param {Element} [options.container] Element to append particles to. A single
 *   wrapper is created inside it and removed when the burst finishes, so callers
 *   need no per-particle cleanup.
 * @param {number} [options.count]
 * @param {[number, number]} [options.distance] Min/max travel distance in px.
 * @param {[number, number]} [options.size] Min/max particle diameter in px.
 * @param {() => number} [options.hue] Returns a hue in degrees.
 * @param {[number, number]} [options.duration] Min/max lifetime in seconds.
 * @param {number} [options.stagger] Max extra delay between particles, in ms.
 * @param {boolean} [options.burst] Use the scale-up burst keyframes.
 * @returns {() => void} Removes the burst immediately.
 */
export const emitParticles = ({
    container = document.body,
    count = 12,
    distance = [40, 120],
    size = [3, 8],
    hue = () => Math.random() * 360,
    duration = [0.6, 1.2],
    stagger = 0,
    burst = true,
} = {}) => {
    if (prefersReducedMotion()) return () => {}

    ensureKeyframes()

    const layer = document.createElement("div")
    layer.setAttribute("aria-hidden", "true")
    layer.style.cssText = "position:absolute;inset:0;pointer-events:none;overflow:visible"

    let longest = 0

    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const travel = randomBetween(distance[0], distance[1])
        const lifetime = randomBetween(duration[0], duration[1])
        const delay = stagger ? Math.random() * stagger : 0

        const particle = document.createElement("div")
        particle.style.cssText = [
            "position:absolute",
            "left:50%",
            "top:50%",
            `width:${randomBetween(size[0], size[1]).toFixed(1)}px`,
            `height:${randomBetween(size[0], size[1]).toFixed(1)}px`,
            `background-color:hsl(${Math.round(hue())}, 100%, 70%)`,
            "border-radius:50%",
            `animation:dd2-particle-${burst ? "burst" : "float"} ${lifetime.toFixed(2)}s ease-out ${delay}ms forwards`,
            `--dd2-x:${(Math.cos(angle) * travel).toFixed(1)}px`,
            `--dd2-y:${(Math.sin(angle) * travel).toFixed(1)}px`,
            `--dd2-scale:${(0.5 + Math.random()).toFixed(2)}`,
        ].join(";")

        layer.appendChild(particle)
        longest = Math.max(longest, lifetime * 1000 + delay)
    }

    container.appendChild(layer)

    // One timer for the whole burst instead of one per particle.
    const timer = setTimeout(() => {
        layer.remove()
    }, longest + 50)

    return () => {
        clearTimeout(timer)
        layer.remove()
    }
}

export default emitParticles