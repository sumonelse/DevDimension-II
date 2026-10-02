import { useEffect, useState } from "react"

/**
 * Subscribes to a CSS media query.
 *
 * @param {string} query e.g. `'(prefers-reduced-motion: reduce)'`
 * @returns {boolean}
 */
const useMediaQuery = (query) => {
    // Default to `false` so the first render matches the server markup; the
    // effect corrects it before paint in practice.
    const [matches, setMatches] = useState(() => {
        if (typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia(query).matches
    })

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return

        const list = window.matchMedia(query)
        setMatches(list.matches)

        const handleChange = (event) => setMatches(event.matches)

        // Safari < 14 only has the deprecated add/removeListener API.
        if (list.addEventListener) {
            list.addEventListener("change", handleChange)
            return () => list.removeEventListener("change", handleChange)
        }

        list.addListener(handleChange)
        return () => list.removeListener(handleChange)
    }, [query])

    return matches
}

export default useMediaQuery