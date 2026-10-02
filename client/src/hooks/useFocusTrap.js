import { useEffect } from "react"

const FOCUSABLE = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled]):not([type='hidden'])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
].join(",")

const isVisible = (element) =>
    element.offsetWidth > 0 ||
    element.offsetHeight > 0 ||
    element.getClientRects().length > 0

/**
 * Traps keyboard focus inside a dialog while it is open.
 *
 * Also handles Escape to dismiss, moves focus into the dialog on open, and
 * returns focus to whatever was focused before on close - all three are
 * expected behaviour for a modal dialog and none of which either project modal
 * implemented, so keyboard and screen-reader users could tab straight out of an
 * open dialog into the page behind it.
 *
 * @param {boolean} isActive
 * @param {import('react').RefObject<HTMLElement>} containerRef
 * @param {() => void} onDismiss Called on Escape or a focus event outside the dialog.
 */
const useFocusTrap = (isActive, containerRef, onDismiss) => {
    useEffect(() => {
        if (!isActive) return

        const container = containerRef.current
        if (!container) return

        const previouslyFocused = document.activeElement

        const getFocusable = () =>
            Array.from(container.querySelectorAll(FOCUSABLE)).filter(isVisible)

        // Move focus into the dialog, preferring an explicit autofocus target.
        const initial =
            container.querySelector("[data-autofocus]") || getFocusable()[0]
        if (initial) initial.focus({ preventScroll: true })

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.stopPropagation()
                onDismiss()
                return
            }

            if (event.key !== "Tab") return

            const focusable = getFocusable()
            if (!focusable.length) {
                event.preventDefault()
                return
            }

            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            const current = document.activeElement

            // Wrap around at both ends so focus can never escape the dialog.
            if (event.shiftKey && (current === first || !container.contains(current))) {
                event.preventDefault()
                last.focus()
            } else if (!event.shiftKey && current === last) {
                event.preventDefault()
                first.focus()
            }
        }

        // A click landing outside the dialog dismisses it.
        const handlePointerDown = (event) => {
            if (!container.contains(event.target)) onDismiss()
        }

        document.addEventListener("keydown", handleKeyDown, true)
        document.addEventListener("mousedown", handlePointerDown, true)

        return () => {
            document.removeEventListener("keydown", handleKeyDown, true)
            document.removeEventListener("mousedown", handlePointerDown, true)

            if (previouslyFocused instanceof HTMLElement) {
                previouslyFocused.focus({ preventScroll: true })
            }
        }
    }, [isActive, containerRef, onDismiss])
}

export default useFocusTrap