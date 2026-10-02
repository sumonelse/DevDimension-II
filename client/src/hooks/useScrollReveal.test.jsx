import { render, waitFor } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import useScrollReveal from "./useScrollReveal"

/**
 * `IntersectionObserver` is faked rather than stubbed at the jsdom boundary so
 * the tests can assert on the options the hook actually requests. The pixel
 * reveal distance is encoded in `rootMargin`; getting that wrong is what left
 * every element on the page invisible in the first version of this hook.
 */

let observers = []
let intersections = []

class FakeIntersectionObserver {
    constructor(callback, options = {}) {
        this.callback = callback
        this.options = options
        this.targets = new Set()
        observers.push(this)
    }

    observe(target) {
        this.targets.add(target)
    }

    unobserve(target) {
        this.targets.delete(target)
    }

    disconnect() {
        this.targets.clear()
    }
}

const Probe = ({ selector = ".reveal", threshold = 150 } = {}) => {
    useScrollReveal({ selector, threshold })
    return null
}

/** Report the current intersection state of every observed element. */
const report = (map) => {
    const last = observers[observers.length - 1]
    if (!last) return

    intersections = [...last.targets].map((target) => ({
        target,
        isIntersecting: map(target),
    }))

    last.callback(intersections, last)
}

beforeEach(() => {
    observers = []
    intersections = []
    vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver)
    document.body.innerHTML = `
        <div class="reveal" id="a"></div>
        <div class="reveal" id="b"></div>
        <div class="reveal active" id="already"></div>
    `
})

afterEach(() => {
    document.body.innerHTML = ""
    vi.unstubAllGlobals()
})

describe("configuration", () => {
    it("encodes the pixel threshold as a bottom rootMargin", () => {
        render(<Probe threshold={150} />)

        const observer = observers[observers.length - 1]
        expect(observer.options.rootMargin).toBe("0px 0px -150px 0px")
    })

    it("uses a plain rootMargin rather than a threshold ratio", () => {
        // A `threshold: 0` ratio would fire once at the viewport edge, before
        // the element is actually within the reveal distance.
        render(<Probe />)

        const observer = observers[observers.length - 1]
        expect(observer.options.threshold).toBeUndefined()
    })

    it("never produces a negative inset", () => {
        render(<Probe threshold={-50} />)
        expect(observers[observers.length - 1].options.rootMargin).toBe(
            "0px 0px -0px 0px"
        )
    })
})

describe("revealing", () => {
    it("adds the active class to intersecting elements", () => {
        render(<Probe />)
        report(() => true)

        expect(document.getElementById("a").classList.contains("active")).toBe(
            true
        )
        expect(document.getElementById("b").classList.contains("active")).toBe(
            true
        )
    })

    it("leaves non-intersecting elements hidden", () => {
        render(<Probe />)
        report((target) => target.id === "a")

        expect(document.getElementById("a").classList.contains("active")).toBe(
            true
        )
        expect(document.getElementById("b").classList.contains("active")).toBe(
            false
        )
    })

    it("does not observe elements that are already active", async () => {
        render(<Probe />)
        report(() => true)

        const observer = observers[observers.length - 1]
        expect(observer.targets.has(document.getElementById("already"))).toBe(
            false
        )
    })

    it("stops observing an element once revealed", () => {
        render(<Probe />)
        report(() => true)

        const observer = observers[observers.length - 1]
        expect(observer.targets.size).toBe(0)
    })

    it("activates every element in a single pass", async () => {
        render(<Probe />)
        report(() => true)

        await waitFor(() =>
            expect(document.querySelectorAll(".reveal.active")).toHaveLength(3)
        )
    })
})

describe("late-arriving elements", () => {
    it("picks up elements added after mount", async () => {
        render(<Probe />)
        report(() => false)

        const added = document.createElement("div")
        added.className = "reveal"
        added.id = "late"
        document.body.appendChild(added)

        // The MutationObserver is scheduled through rAF.
        await new Promise((resolve) => setTimeout(resolve, 50))

        expect(observers[observers.length - 1].targets.has(added)).toBe(true)
    })

    it("drops elements that have been removed from the document", async () => {
        render(<Probe />)

        const element = document.getElementById("a")
        report(() => false)
        expect(observers[observers.length - 1].targets.has(element)).toBe(true)

        element.remove()
        await new Promise((resolve) => setTimeout(resolve, 50))

        expect(observers[observers.length - 1].targets.has(element)).toBe(false)
    })
})

describe("cleanup", () => {
    it("disconnects both observers on unmount", () => {
        const { unmount } = render(<Probe />)
        const observer = observers[observers.length - 1]
        const disconnect = vi.spyOn(observer, "disconnect")

        unmount()

        expect(disconnect).toHaveBeenCalled()
        expect(observer.targets.size).toBe(0)
    })
})

describe("without IntersectionObserver", () => {
    it("reveals everything rather than hiding the page", () => {
        vi.stubGlobal("IntersectionObserver", undefined)

        render(<Probe />)

        expect(document.querySelectorAll(".reveal.active")).toHaveLength(3)
    })
})
