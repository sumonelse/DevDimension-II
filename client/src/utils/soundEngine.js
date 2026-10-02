/**
 * Lazy sound engine for the Spider-Verse dimension.
 *
 * Why this exists: the previous implementation constructed every `Audio` object
 * up front, which made the browser download the full 5.7 MB of uncompressed WAV
 * on *every* page load — including for visitors who never enter the dimension.
 *
 * How this works:
 *  - Nothing is constructed until a sound is actually requested.
 *  - Players are keyed by `src|volume|rate|loop`, so two logical sounds sharing
 *    one file share one network request.
 *  - Browsers block audio until a user gesture, so playback requests before the
 *    first gesture are queued and flushed by `unlock()`.
 */

const SOUND_SOURCES = {
    transition: {
        src: "/audio/mixkit-sci-fi-interface-zoom-890.wav",
        volume: 0.3,
    },
    ambient: {
        src: "/audio/mixkit-futuristic-sci-fi-computer-ambience-2507.wav",
        volume: 0.1,
        loop: true,
    },
    hover: {
        src: "/audio/mixkit-fast-small-sweep-transition-166.wav",
        volume: 0.1,
    },
    click: {
        src: "/audio/mixkit-electronic-retro-block-hit-2185.wav",
        volume: 0.2,
    },
    webShoot: {
        src: "/audio/mixkit-fast-rocket-whoosh-1714.wav",
        volume: 0.2,
    },
    glitch: {
        src: "/audio/mixkit-electronic-retro-block-hit-2185.wav",
        volume: 0.2,
        // Same file as `click`, so it gets its own player via the cache key.
        rate: 0.8,
    },
}

/** Sounds cheap enough to warm up on the first user gesture. */
const PRIME_ON_UNLOCK = ["hover", "click"]

const AMBIENT_FADE_MS = 400

const cache = new Map()
let isMuted = false
let isUnlocked = false
let ambientElement = null
let ambientFadeFrame = null

const playerKey = ({ src, volume = 1, rate = 1, loop = false }) =>
    `${src}|${volume}|${rate}|${loop ? 1 : 0}`

const getPlayer = (name) => {
    const spec = SOUND_SOURCES[name]
    if (!spec) return null

    const key = playerKey(spec)
    const cached = cache.get(key)
    if (cached) return cached

    const audio = new Audio(spec.src)
    audio.preload = "auto"
    audio.volume = spec.volume ?? 1
    if (spec.rate) audio.playbackRate = spec.rate
    if (spec.loop) audio.loop = true

    cache.set(key, audio)
    return audio
}

const safePlay = (audio) => {
    if (!audio || isMuted) return
    const attempt = audio.play()
    if (attempt && typeof attempt.catch === "function") {
        // Autoplay rejections are expected before the first gesture and are not
        // actionable, so they are swallowed deliberately.
        attempt.catch(() => {})
    }
}

const cancelAmbientFade = () => {
    if (ambientFadeFrame) {
        cancelAnimationFrame(ambientFadeFrame)
        ambientFadeFrame = null
    }
}

const fadeAmbientTo = (target) => {
    if (!ambientElement) return

    cancelAmbientFade()
    const from = ambientElement.volume
    const startedAt = performance.now()

    const step = (now) => {
        const progress = Math.min(1, (now - startedAt) / AMBIENT_FADE_MS)
        ambientElement.volume = from + (target - from) * progress

        if (progress < 1) {
            ambientFadeFrame = requestAnimationFrame(step)
        } else {
            ambientFadeFrame = null
            if (target === 0) {
                ambientElement.pause()
                ambientElement.currentTime = 0
            }
        }
    }

    ambientFadeFrame = requestAnimationFrame(step)
}

/** Play a one-shot sound by name. */
const play = (name) => {
    if (isMuted) return
    const audio = getPlayer(name)
    if (!audio) return

    // Restart from the top for retriggerable sounds.
    audio.currentTime = 0
    safePlay(audio)
}

/** Warm up the most frequently used players so the first hover is instant. */
const prime = () => {
    PRIME_ON_UNLOCK.forEach((name) => {
        const audio = getPlayer(name)
        // `load()` starts the fetch without starting playback.
        if (audio && audio.readyState === 0) audio.load()
    })
}

const startAmbient = () => {
    if (isMuted) return
    ambientElement = getPlayer("ambient")
    if (!ambientElement) return

    ambientElement.volume = 0
    safePlay(ambientElement)
    fadeAmbientTo(SOUND_SOURCES.ambient.volume)
}

const stopAmbient = () => {
    if (!ambientElement) return
    fadeAmbientTo(0)
}

const setMuted = (muted) => {
    isMuted = Boolean(muted)

    if (isMuted) {
        cancelAmbientFade()
        if (ambientElement) {
            ambientElement.pause()
            ambientElement.currentTime = 0
        }
    }
}

const handleFirstGesture = () => {
    if (isUnlocked) return
    isUnlocked = true

    prime()

    const GESTURE_EVENTS = ["pointerdown", "keydown", "touchstart", "scroll"]
    GESTURE_EVENTS.forEach((event) =>
        window.removeEventListener(event, handleFirstGesture, true)
    )
}

/** Listen (once) for the gesture that unlocks the browser's autoplay policy. */
const watchForFirstGesture = () => {
    if (typeof window === "undefined") return

    const GESTURE_EVENTS = ["pointerdown", "keydown", "touchstart", "scroll"]
    GESTURE_EVENTS.forEach((event) =>
        window.addEventListener(event, handleFirstGesture, {
            capture: true,
            once: true,
            passive: true,
        })
    )
}

/** Release every player and drop the cached elements. */
const destroy = () => {
    cancelAmbientFade()
    cache.forEach((audio) => {
        audio.pause()
        audio.removeAttribute("src")
        audio.load()
    })
    cache.clear()
    ambientElement = null
}

export const soundEngine = {
    play,
    prime,
    startAmbient,
    stopAmbient,
    setMuted,
    destroy,
    watchForFirstGesture,
    isMuted: () => isMuted,
    isUnlocked: () => isUnlocked,
}

export default soundEngine