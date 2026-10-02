import { useEffect } from "react"
import { useDimension } from "../context/DimensionContext"
import soundEngine from "../utils/soundEngine"

const isInteractiveTarget = (target) =>
    target instanceof Element &&
    Boolean(target.closest("button, a, [role='button'], input, textarea, select"))

/**
 * Wires the Spider-Verse soundscape to the dimension context.
 *
 * This component renders nothing and is mounted *only* while the Spider-Verse
 * dimension is active, so no audio is fetched for visitors who stay in the
 * normal dimension. The actual `Audio` elements are still created lazily by
 * `soundEngine`, one sound at a time, on first use.
 */
const SpiderverseAudio = () => {
    const { isSpiderVerse, isTransitioning, isAudioMuted, triggerPostCredit } =
        useDimension()

    // Dimension transition stinger.
    useEffect(() => {
        if (isTransitioning && !isAudioMuted) {
            soundEngine.play("transition")
        }
    }, [isTransitioning, isAudioMuted])

    // Ambient bed, faded in and out with the dimension.
    useEffect(() => {
        if (isAudioMuted) {
            soundEngine.stopAmbient()
        } else {
            soundEngine.startAmbient()
        }
    }, [isAudioMuted])

    useEffect(() => () => soundEngine.stopAmbient(), [])

    // Global mute state.
    useEffect(() => {
        soundEngine.setMuted(isAudioMuted)
    }, [isAudioMuted])

    // Hover / click feedback across the whole dimension.
    useEffect(() => {
        if (isAudioMuted) return

        const handleMouseOver = (event) => {
            if (isInteractiveTarget(event.target)) soundEngine.play("hover")
        }

        const handleClick = (event) => {
            if (isInteractiveTarget(event.target)) soundEngine.play("click")
        }

        document.addEventListener("mouseover", handleMouseOver, {
            capture: true,
            passive: true,
        })
        document.addEventListener("click", handleClick, { capture: true })

        return () => {
            document.removeEventListener("mouseover", handleMouseOver, {
                capture: true,
            })
            document.removeEventListener("click", handleClick, { capture: true })
        }
    }, [isAudioMuted])

    // Keep the long-standing `window.spiderverseAudio` API available to the
    // comic components that trigger sounds without sharing React state.
    useEffect(() => {
        if (!isSpiderVerse) return

        window.spiderverseAudio = {
            playWebShoot: () => soundEngine.play("webShoot"),
            playClick: () => soundEngine.play("click"),
            playHover: () => soundEngine.play("hover"),
            playGlitch: () => soundEngine.play("glitch"),
            isMuted: () => soundEngine.isMuted(),
            showPostCredit: () => triggerPostCredit(),
        }

        if (import.meta.env.DEV) {
            console.log(
                "%c🕸️ Spider-Verse Mode Active! Try window.spiderverseAudio.showPostCredit() to see the post-credit scene.",
                "background: #FF1744; color: white; padding: 4px; border-radius: 4px;"
            )
        }

        return () => {
            delete window.spiderverseAudio
        }
    }, [isSpiderVerse, triggerPostCredit])

    return null
}

export default SpiderverseAudio