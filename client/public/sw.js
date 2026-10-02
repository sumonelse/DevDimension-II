/**
 * DevDimension-II offline cache.
 *
 * Deliberately runtime-only: Vite emits content-hashed asset filenames, so the
 * worker never needs a build-time precache manifest. Hashed assets are
 * immutable, which makes cache-first safe for them, while HTML is always
 * validated against the network so a deploy is picked up on the next visit.
 *
 * Bump CACHE_VERSION when changing the caching strategy.
 */

const CACHE_VERSION = "v1"
const SHELL_CACHE = `dd2-shell-${CACHE_VERSION}`
const ASSET_CACHE = `dd2-assets-${CACHE_VERSION}`
const RUNTIME_CACHE = `dd2-runtime-${CACHE_VERSION}`
const OWN_CACHES = [SHELL_CACHE, ASSET_CACHE, RUNTIME_CACHE]

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

self.addEventListener("install", () => {
    // A new worker should not wait for every tab to close; it activates as soon
    // as the existing one is idle, and clients.claim() hands over open tabs.
    self.skipWaiting()
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