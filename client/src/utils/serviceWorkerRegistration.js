/**
 * Registers the offline cache.
 *
 * Skipped in development so a stale service worker can never interfere with
 * hot-module replacement, and skipped on insecure origins because service
 * workers require HTTPS (or localhost).
 */

const register = () => {
    if (!import.meta.env.PROD) return
    if (!("serviceWorker" in navigator)) return

    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register(`${import.meta.env.BASE_URL}sw.js`)
            .then((registration) => {
                // A new build should take over as soon as the old worker goes idle.
                registration.addEventListener("updatefound", () => {
                    const installing = registration.installing
                    if (!installing) return

                    installing.addEventListener("statechange", () => {
                        if (installing.state !== "installed") return

                        if (navigator.serviceWorker.controller) {
                            // An older worker is still in control: there is a new
                            // version waiting, but it only activates once every tab
                            // is closed. Tell the visitor rather than silently
                            // serving the old build.
                            window.dispatchEvent(
                                new CustomEvent("app:update-available", {
                                    detail: { registration },
                                })
                            )
                        }
                    })
                })
            })
            .catch(() => {
                // A failed registration is not fatal - the app works online only.
            })
    })
}

export const registerServiceWorker = register

export default registerServiceWorker