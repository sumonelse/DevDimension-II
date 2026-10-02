import useMediaQuery from "./useMediaQuery"

/**
 * `true` when the visitor has asked their OS to reduce motion.
 *
 * Every decorative animation in this project is gated on this so the site
 * degrades to a calm, non-animated experience instead of fighting the setting.
 * A CSS-level override lives in `index.css` as well, for animations that never
 * pass through React.
 */
const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)")

export default useReducedMotion