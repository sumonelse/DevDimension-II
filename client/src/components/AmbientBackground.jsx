import React from "react"

/**
 * The ambient background for the normal dimension.
 *
 * This layer used to be split between the page wrapper and the hero: the hero
 * carried its own radial gradient and grid pattern, both clipped to its
 * `min-h-screen` box. Everything below the fold sat on a different wash with no
 * grid, so the hero's bottom edge showed up as a hard horizontal line across
 * the page.
 *
 * It is now a single fixed layer that covers the viewport at all scroll
 * positions. Nothing about it is bounded by a section, so there is no edge for
 * a section boundary to reveal. The grid dissolves toward the edges via a mask
 * and a vignette darkens the corners, so the ambient wash reads as depth rather
 * than as a panel with a border.
 *
 * The glows drift on a long, offset cycle so the page is never completely
 * static, and the whole thing is disabled under `prefers-reduced-motion`.
 */
const AmbientBackground = () => {
    return (
        <div className="ambient-layer" aria-hidden="true">
            <div className="ambient-base" />

            {/* Slow-drifting colour fields. Different durations and delays so
                they never re-align into a visible loop. */}
            <div className="ambient-glow ambient-glow-purple" />
            <div className="ambient-glow ambient-glow-cyan" />
            <div className="ambient-glow ambient-glow-pink" />
            <div className="ambient-glow ambient-glow-amber" />
            <div className="ambient-glow ambient-glow-violet" />

            {/* Technical grid, fading out toward the edges. */}
            <div className="ambient-grid" />

            {/* Corner vignette, which is what actually sells the depth. */}
            <div className="ambient-vignette" />
        </div>
    )
}

export default AmbientBackground
