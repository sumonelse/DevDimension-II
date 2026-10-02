/**
 * DevDimension-II offline cache.
 *
 * Deliberately runtime-only for build assets: Vite emits content-hashed
 * filenames, so the worker never needs a build-time precache manifest. Hashed
 * assets are immutable, which makes cache-first safe for them, while HTML is
 * always validated against the network so a deploy is picked up on the next
 * visit.
 *
 * The app shell *is* precached. Without it, offline only worked from the second
 * visit onwards: a newly installed worker never saw the navigation that had
 * already happened, so the shell cache stayed empty and the very first offline
 * load died with ERR_FAILED. And because only "/" was ever cached while the
 * offline fallback looked up "/index.html", the fallback itself could never
 * match.
 *
 * Bump CACHE_VERSION when changing the caching strategy.
 */

const CACHE_VERSION = "v2"
const SHELL_CACHE = `dd2-shell-${CACHE_VERSION}`
const ASSET_CACHE = `dd2-assets-${CACHE_VERSION}`
const RUNTIME_CACHE = `dd2-runtime-${CACHE_VERSION}`
const OWN_CACHES = [SHELL_CACHE, ASSET_CACHE, RUNTIME_CACHE]

/**
 * Cached on install so a single visit is enough for the site to open offline.
 * The HTML is listed under both keys it can be requested as, which is what makes
 * the offline fallback below actually resolve.
 */
const APP_SHELL = ["/", "/index.html", "/manifest.json", "/favicon.svg"]

/**
 * The critical build output, injected at build time by the `precache-manifest`
 * plugin in `vite.config.js`.
 *
 * Without these the offline shell boots to a blank page: the HTML is cached but
 * the scripts are not, so React never mounts and the visitor sees nothing with
 * no error to go on. Only what is needed to paint and hydrate the first screen is
 * listed - the lazy chunks stay out and are picked up by the runtime cache.
 */
const BUILD_ASSETS = self.__DD2_PRECACHE__ || []

const OFFLINE_FALLBACK = "/index.html"

const isSameOrigin = (url) => url.origin === self.location.origin

/**
 * Content-hashed build output and anything explicitly cacheable by prefix.
 * These URLs can never change meaning, so a cache hit is always correct.
 */
const isImmutableAsset = (pathname) =>
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/icons/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/audio/")

/** Everything else gets stale-while-revalidate. */
const isStaleWhileRevalidate = (pathname) =>
    pathname.endsWith(".pdf") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".webp")

self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            // Precache the shell, but never let one missing optional file stop
            // the worker from installing.
            const cache = await caches.open(SHELL_CACHE)

            const precache = [...new Set([...APP_SHELL, ...BUILD_ASSETS])]

            await Promise.all(
                precache.map(async (path) => {
                    try {
                        const response = await fetch(path, { cache: "reload" })
                        if (response.ok) await cache.put(path, response)
                    } catch {
                        // Offline at install time, or the file is gone.
                    }
                })
            )

            // A new worker should not wait for every tab to close; it activates
            // as soon as the existing one is idle, and clients.claim() hands
            // over open tabs.
            await self.skipWaiting()
        })()
    )
})

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            const names = await caches.keys()
            await Promise.all(
                names
                    .filter((name) => name.startsWith("dd2-") && !OWN_CACHES.includes(name))
                    .map((name) => caches.delete(name))
            )
            await self.clients.claim()
        })()
    )
})

const cachePut = async (cacheName, request, response) => {
    // Range requests (media seeking) must not be cached.
    if (request.headers.has("range")) return
    const cache = await caches.open(cacheName)
    await cache.put(request, response)
}

const staleWhileRevalidate = async (request) => {
    const cache = await caches.open(RUNTIME_CACHE)
    const cached = await cache.match(request)

    const network = fetch(request)
        .then((response) => {
            if (response && response.ok) cachePut(RUNTIME_CACHE, request, response.clone())
            return response
        })
        .catch(() => null)

    return cached || (await network) || Response.error()
}

const networkFirst = async (request, cacheName) => {
    const cache = await caches.open(cacheName)
    try {
        const response = await fetch(request)
        if (response && response.ok) cachePut(cacheName, request, response.clone())
        return response
    } catch {
        const cached = await cache.match(request)
        if (cached) return cached
        if (request.mode === "navigate") {
            const shell = await cache.match(OFFLINE_FALLBACK)
            if (shell) return shell
        }
        return Response.error()
    }
}

const cacheFirst = async (request, cacheName) => {
    const cache = await caches.open(cacheName)
    const cached = await cache.match(request)
    if (cached) return cached

    const response = await fetch(request)
    if (response && response.ok) cachePut(cacheName, request, response.clone())
    return response
}

self.addEventListener("fetch", (event) => {
    const { request } = event

    if (request.method !== "GET") return

    let url
    try {
        url = new URL(request.url)
    } catch {
        return
    }

    if (!isSameOrigin(url)) return
    // Never interfere with the dev server or a non-HTTP scheme.
    if (url.protocol !== "http:" && url.protocol !== "https:") return

    if (request.mode === "navigate") {
        event.respondWith(networkFirst(request, SHELL_CACHE))
        return
    }

    if (isImmutableAsset(url.pathname)) {
        event.respondWith(
            cacheFirst(request, ASSET_CACHE).catch(() => Response.error())
        )
        return
    }

    if (isStaleWhileRevalidate(url.pathname)) {
        event.respondWith(staleWhileRevalidate(request))
    }
})