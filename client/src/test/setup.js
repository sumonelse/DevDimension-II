import "@testing-library/jest-dom/vitest"
import { afterEach, vi } from "vitest"
import { cleanup } from "@testing-library/react"

afterEach(() => {
    cleanup()
    vi.clearAllMocks()
})

/* jsdom implements neither of these, and several components need them. */
if (!window.matchMedia) {
    window.matchMedia = (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
    })
}

if (!globalThis.requestAnimationFrame) {
    globalThis.requestAnimationFrame = (callback) =>
        setTimeout(() => callback(Date.now()), 0)
    globalThis.cancelAnimationFrame = (id) => clearTimeout(id)
}

if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => {}
}
