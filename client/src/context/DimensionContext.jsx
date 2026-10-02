import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"
import soundEngine from "../utils/soundEngine"
import { ensureDimensionStyles } from "../utils/dimensionStyles"

// Create the dimension context
const DimensionContext = createContext(null)

// Custom hook to use the dimension context
export const useDimension = () => useContext(DimensionContext)

const STORAGE_KEYS = {
    dimension: "spiderverse-dimension",
    awareness: "multiverse-awareness",
    muted: "spiderverse-audio-muted",
    postCredit: "post-credit-shown",
}

const GLITCH_INTERVAL_MS = 5000
const GLITCH_CHANCE = 0.95
const SPIDER_SENSE_MS = 5000
const TRANSITION_SWITCH_MS = 1500
const TRANSITION_SETTLE_MS = 1000
const POST_CREDIT_MS = 35000
const MAX_AWARENESS = 10

/** `localStorage` throws in some private-browsing modes; never let it break render. */
const readStorage = (key, fallback = null) => {
    try {
        return window.localStorage.getItem(key) ?? fallback
    } catch {
        return fallback
    }
}

const writeStorage = (key, value) => {
    try {
        window.localStorage.setItem(key, value)
    } catch {
        // Preference simply will not persist.
    }
}

/**
 * Ambient glitch flashes and the spider-sense overlay.
 *
 * This is a separate component on purpose. These effects fire on their own
 * timers, and while they lived in the provider they were part of the context
 * value - so every random glitch re-rendered every component subscribed to the
 * context, including all six page sections. Owning the state here means a glitch
 * only re-renders this subtree.
 */
const DimensionEffects = ({
    isSpiderVerse,
    isAudioMuted,
    spiderSenseActive,
}) => {
    const [glitches, setGlitches] = useState([])
    const timersRef = useRef(new Set())

    const later = useCallback((fn, delay) => {
        const id = setTimeout(() => {
            timersRef.current.delete(id)
            fn()
        }, delay)
        timersRef.current.add(id)
    }, [])

    useEffect(() => {
        const timers = timersRef.current
        return () => {
            timers.forEach(clearTimeout)
            timers.clear()
        }
    }, [])

    // Random glitches, only while the Spider-Verse dimension is on screen.
    useEffect(() => {
        if (!isSpiderVerse) return

        let interval = null

        const start = () => {
            interval = setInterval(() => {
                if (Math.random() <= GLITCH_CHANCE) return

                const id = `${Date.now()}-${Math.random()}`
                const duration = Math.random() * 2 + 0.5

                setGlitches((previous) => [
                    ...previous,
                    {
                        id,
                        x: Math.random() * 100,
                        y: Math.random() * 100,
                        duration,
                        size: Math.random() * 100 + 50,
                    },
                ])

                later(
                    () =>
                        setGlitches((previous) =>
                            previous.filter((glitch) => glitch.id !== id)
                        ),
                    duration * 1000
                )

                if (!isAudioMuted && window.spiderverseAudio) {
                    window.spiderverseAudio.playClick()
                }
            }, GLITCH_INTERVAL_MS)
        }

        const handleVisibility = () => {
            if (document.hidden) {
                clearInterval(interval)
                interval = null
            } else if (!interval) {
                start()
            }
        }

        // Don't burn cycles generating effects for a backgrounded tab.
        if (!document.hidden) start()
        document.addEventListener("visibilitychange", handleVisibility)

        return () => {
            clearInterval(interval)
            document.removeEventListener("visibilitychange", handleVisibility)
        }
    }, [isSpiderVerse, isAudioMuted, later])

    // Spider-sense stays on for a few seconds, then releases.
    return (
        <>
            {glitches.map((glitch) => (
                <div
                    key={glitch.id}
                    aria-hidden="true"
                    className="fixed pointer-events-none z-50 bg-white mix-blend-difference"
                    style={{
                        left: `${glitch.x}%`,
                        top: `${glitch.y}%`,
                        width: `${glitch.size}px`,
                        height: `${glitch.size}px`,
                        animation: `dimensionGlitch ${glitch.duration}s ease-in-out`,
                    }}
                />
            ))}

            {spiderSenseActive && (
                <div
                    aria-hidden="true"
                    className="fixed inset-0 pointer-events-none z-40 bg-yellow-500/20 animate-pulse"
                >
                    <div className="absolute inset-0 spider-web spider-web-full opacity-20" />
                </div>
            )}
        </>
    )
}

// Provider component
export const DimensionProvider = ({ children }) => {
    const [isSpiderVerse, setIsSpiderVerse] = useState(false)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [multiverseAwareness, setMultiverseAwareness] = useState(0)
    const [isAudioMuted, setIsAudioMuted] = useState(false)
    const [showPostCredit, setShowPostCredit] = useState(false)

    // Deliberately *not* part of the context value. Nothing outside the provider
    // reads it, and including it would re-render every subscribed component.
    const [spiderSenseActive, setSpiderSenseActive] = useState(false)

    // Every pending timeout is tracked so unmounting mid-transition cannot leave
    // one to flip state on a torn-down tree.
    const timersRef = useRef(new Set())
    const isTransitioningRef = useRef(false)
    const isSpiderVerseRef = useRef(false)

    useEffect(() => {
        const timers = timersRef.current
        return () => {
            timers.forEach(clearTimeout)
            timers.clear()
        }
    }, [])

    useEffect(() => {
        isSpiderVerseRef.current = isSpiderVerse
    }, [isSpiderVerse])

    // Restore saved preferences.
    useEffect(() => {
        setIsSpiderVerse(readStorage(STORAGE_KEYS.dimension) === "true")

        const awareness = parseInt(readStorage(STORAGE_KEYS.awareness, "0"), 10)
        if (Number.isFinite(awareness)) setMultiverseAwareness(awareness)

        const muted = readStorage(STORAGE_KEYS.muted)
        if (muted !== null) setIsAudioMuted(muted === "true")
    }, [])

    // Persist preferences.
    useEffect(() => {
        writeStorage(STORAGE_KEYS.dimension, String(isSpiderVerse))
    }, [isSpiderVerse])

    useEffect(() => {
        writeStorage(STORAGE_KEYS.awareness, String(multiverseAwareness))
    }, [multiverseAwareness])

    // Spider-Verse styles are loaded on demand so they stay out of the initial
    // render-blocking payload for everyone who starts in the normal dimension.
    useEffect(() => {
        if (isSpiderVerse) ensureDimensionStyles()
    }, [isSpiderVerse])

    const later = useCallback((fn, delay) => {
        const id = setTimeout(() => {
            timersRef.current.delete(id)
            fn()
        }, delay)
        timersRef.current.add(id)
    }, [])

    const toggleDimension = useCallback(() => {
        if (isTransitioningRef.current) return

        isTransitioningRef.current = true
        setIsTransitioning(true)
        soundEngine.play("transition")

        setMultiverseAwareness((previous) =>
            Math.min(previous + 1, MAX_AWARENESS)
        )

        later(() => {
            setIsSpiderVerse((previous) => {
                const next = !previous
                isSpiderVerseRef.current = next
                if (next) ensureDimensionStyles()
                return next
            })

            later(() => {
                isTransitioningRef.current = false
                setIsTransitioning(false)
            }, TRANSITION_SETTLE_MS)
        }, TRANSITION_SWITCH_MS)
    }, [later])

    const activateSpiderSense = useCallback(() => {
        if (!isSpiderVerseRef.current || spiderSenseActive) return

        setSpiderSenseActive(true)
        later(() => setSpiderSenseActive(false), SPIDER_SENSE_MS)
    }, [later, spiderSenseActive])

    const toggleAudioMute = useCallback(() => {
        setIsAudioMuted((previous) => {
            const next = !previous
            writeStorage(STORAGE_KEYS.muted, String(next))

            // Confirmation blip when coming back on.
            if (previous) later(() => soundEngine.play("click"), 100)

            return next
        })
    }, [later])

    const triggerPostCredit = useCallback(() => {
        if (!isSpiderVerseRef.current) return

        soundEngine.play("webShoot")
        setShowPostCredit(true)
        setMultiverseAwareness((previous) =>
            Math.min(previous + 1, MAX_AWARENESS)
        )
        writeStorage(STORAGE_KEYS.postCredit, "true")

        later(() => setShowPostCredit(false), POST_CREDIT_MS)
    }, [later])

    const contextValue = useMemo(
        () => ({
            isSpiderVerse,
            isTransitioning,
            toggleDimension,
            activateSpiderSense,
            multiverseAwareness,
            isAudioMuted,
            toggleAudioMute,
            showPostCredit,
            triggerPostCredit,
        }),
        [
            isSpiderVerse,
            isTransitioning,
            toggleDimension,
            activateSpiderSense,
            multiverseAwareness,
            isAudioMuted,
            toggleAudioMute,
            showPostCredit,
            triggerPostCredit,
        ]
    )

    return (
        <DimensionContext.Provider value={contextValue}>
            {children}

            <DimensionEffects
                isSpiderVerse={isSpiderVerse}
                isAudioMuted={isAudioMuted}
                spiderSenseActive={spiderSenseActive}
            />
        </DimensionContext.Provider>
    )
}

export default DimensionContext