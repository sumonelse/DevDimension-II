import React, { useEffect, useRef } from "react"
import { useDimension } from "../context/DimensionContext"

const SpiderverseAudio = () => {
    const { isSpiderVerse, isTransitioning, isAudioMuted } = useDimension()
    const audioRefs = useRef({
        transition: null,
        background: null,
        hover: null,
        click: null,
        webShoot: null,
    })

    // Audio URLs
    const audioSources = {
        transition: "/audio/mixkit-sci-fi-interface-zoom-890.wav",
        background:
            "/audio/mixkit-futuristic-sci-fi-computer-ambience-2507.wav",
        hover: "/audio/mixkit-fast-small-sweep-transition-166.wav",
        click: "/audio/mixkit-electronic-retro-block-hit-2185.wav",
        webShoot: "/audio/mixkit-fast-rocket-whoosh-1714.wav",
    }

    // Initialize audio elements
    useEffect(() => {
        // Create audio elements
        Object.keys(audioSources).forEach((key) => {
            const audio = new Audio(audioSources[key])

            // Configure audio properties
            switch (key) {
                case "background":
                    audio.loop = true
                    audio.volume = 0.1
                    break
                case "transition":
                    audio.volume = 0.3
                    break
                case "hover":
                    audio.volume = 0.1
                    break
                case "click":
                    audio.volume = 0.2
                    break
                case "webShoot":
                    audio.volume = 0.2
                    break
                default:
                    audio.volume = 0.2
            }

            audioRefs.current[key] = audio
        })

        return () => {
            // Clean up audio elements
            Object.values(audioRefs.current).forEach((audio) => {
                if (audio) {
                    audio.pause()
                    audio.src = ""
                }
            })
        }
    }, [])

    // Handle dimension transition sound
    useEffect(() => {
        if (isTransitioning && audioRefs.current.transition && !isAudioMuted) {
            audioRefs.current.transition.currentTime = 0
            audioRefs.current.transition
                .play()
                .catch((e) => console.log("Audio play failed:", e))
        }
    }, [isTransitioning, isAudioMuted])

    // Handle background music
    useEffect(() => {
        const bgAudio = audioRefs.current.background
        if (!bgAudio) return

        // Pause if muted or not in Spider-Verse
        if (isAudioMuted || !isSpiderVerse) {
            bgAudio.pause()
            return
        }

        // Play if in Spider-Verse and not muted
        if (isSpiderVerse && !isAudioMuted) {
            bgAudio
                .play()
                .catch((e) => console.log("Background audio play failed:", e))

            // Fade in
            let volume = 0
            const fadeIn = setInterval(() => {
                volume += 0.01
                if (volume >= 0.1) {
                    volume = 0.1
                    clearInterval(fadeIn)
                }
                bgAudio.volume = volume
            }, 100)

            return () => {
                clearInterval(fadeIn)

                // Fade out
                let vol = bgAudio.volume
                const fadeOut = setInterval(() => {
                    vol -= 0.01
                    if (vol <= 0) {
                        vol = 0
                        clearInterval(fadeOut)
                        bgAudio.pause()
                    }
                    bgAudio.volume = vol
                }, 100)

                // Clean up fade out interval
                setTimeout(() => clearInterval(fadeOut), 2000)
            }
        }
    }, [isSpiderVerse, isAudioMuted])

    // Add event listeners for interactive sounds
    useEffect(() => {
        if (!isSpiderVerse || isAudioMuted) return

        // Play hover sound on buttons and links
        const handleMouseEnter = (e) => {
            if (
                e.target.tagName === "BUTTON" ||
                e.target.tagName === "A" ||
                e.target.closest("button") ||
                e.target.closest("a")
            ) {
                if (audioRefs.current.hover) {
                    audioRefs.current.hover.currentTime = 0
                    audioRefs.current.hover
                        .play()
                        .catch((e) =>
                            console.log("Hover audio play failed:", e)
                        )
                }
            }
        }

        // Play click sound on buttons and links
        const handleClick = (e) => {
            if (
                e.target.tagName === "BUTTON" ||
                e.target.tagName === "A" ||
                e.target.closest("button") ||
                e.target.closest("a")
            ) {
                if (audioRefs.current.click) {
                    audioRefs.current.click.currentTime = 0
                    audioRefs.current.click
                        .play()
                        .catch((e) =>
                            console.log("Click audio play failed:", e)
                        )
                }
            }
        }

        // Add event listeners
        document.addEventListener("mouseenter", handleMouseEnter, true)
        document.addEventListener("click", handleClick, true)

        return () => {
            document.removeEventListener("mouseenter", handleMouseEnter, true)
            document.removeEventListener("click", handleClick, true)
        }
    }, [isSpiderVerse, isAudioMuted])

    // Expose audio API to window for other components to use
    useEffect(() => {
        if (!isSpiderVerse) return

        window.spiderverseAudio = {
            playWebShoot: () => {
                if (audioRefs.current.webShoot && !isAudioMuted) {
                    audioRefs.current.webShoot.currentTime = 0
                    audioRefs.current.webShoot
                        .play()
                        .catch((e) =>
                            console.log("Web shoot audio play failed:", e)
                        )
                }
            },
            playClick: () => {
                if (audioRefs.current.click && !isAudioMuted) {
                    audioRefs.current.click.currentTime = 0
                    audioRefs.current.click
                        .play()
                        .catch((e) =>
                            console.log("Click audio play failed:", e)
                        )
                }
            },
            playHover: () => {
                if (audioRefs.current.hover && !isAudioMuted) {
                    audioRefs.current.hover.currentTime = 0
                    audioRefs.current.hover
                        .play()
                        .catch((e) =>
                            console.log("Hover audio play failed:", e)
                        )
                }
            },
            isMuted: () => isAudioMuted,
        }

        return () => {
            delete window.spiderverseAudio
        }
    }, [isSpiderVerse, isAudioMuted])

    return null // This component doesn't render anything
}

export default SpiderverseAudio
