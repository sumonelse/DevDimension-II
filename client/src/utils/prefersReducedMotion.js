const QUERY = "(prefers-reduced-motion: reduce)"

let cachedQuery = null

const getQuery = () => {
    if (typeof window === "undefined" || !window.matchMedia) return null
    if (!cachedQuery) cachedQuery = window.matchMedia(QUERY)
    return cachedQuery
}

/**
 * Synchronous reduced-motion check for non-React code (imperative effects,
 * event handlers, one-shot particle bursts).
 *
 * React components should use the `useReducedMotion` hook instead, so they
 * re-render when the preference changes. This is for the cases where there is
 * no render involved at all.
 */
export const prefersReducedMotion = () => getQuery()?.matches ?? false

export default prefersReducedMotion