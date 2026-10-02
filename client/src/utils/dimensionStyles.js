/**
 * On-demand loading for the Spider-Verse stylesheet.
 *
 * `spiderverse.css` is roughly 1.5k lines that the normal dimension never uses,
 * yet importing it from `main.jsx` put all of it in the render-blocking critical
 * path. It is imported dynamically instead, so Vite emits it as its own chunk
 * that the browser can fetch without blocking first paint.
 *
 * The dimension switch already takes 1.5s to play out, which leaves plenty of
 * time for this chunk to arrive.
 */

const STORAGE_KEY = "spiderverse-dimension"

let pending = null

/** Load the stylesheet once; repeated calls share the same import. */
export const ensureDimensionStyles = () => {
    if (!pending) {
        pending = import("../spiderverse.css")
    }
    return pending
}

const whenIdle = (callback) => {
    if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(callback, { timeout: 2000 })
    } else {
        window.setTimeout(callback, 200)
    }
}

/**
 * Called once at startup. Visitors who previously chose the Spider-Verse
 * dimension get the styles immediately; everyone else gets them at idle so the
 * sheet is already cached by the time anyone toggles the dimension.
 */
export const loadDimensionStyles = () => {
    let shouldLoad = false

    try {
        shouldLoad = window.localStorage.getItem(STORAGE_KEY) === "true"
    } catch {
        // localStorage can throw in private browsing modes; fall through to idle.
    }

    if (shouldLoad) {
        ensureDimensionStyles()
        return
    }

    whenIdle(() => {
        // `visibilityState` guard: don't compete with a tab the user just opened.
        if (document.visibilityState === "visible") {
            ensureDimensionStyles()
        }
    })
}