import React, { useEffect, useState } from "react"
import { useDimension } from "../context/DimensionContext"
import SpeechBubble from "./SpeechBubble"
import SoundEffect from "./SoundEffect"

const MultiverseEasterEgg = () => {
    const { isSpiderVerse, multiverseAwareness } = useDimension()
    const [showEasterEgg, setShowEasterEgg] = useState(false)
    const [easterEggPhase, setEasterEggPhase] = useState(0)
    const [konami, setKonami] = useState([])
    const konamiCode = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "b",
        "a",
    ]

    // Multiverse awareness messages
    const awarenessMessages = [
        "Hey there! I'm starting to notice something strange about this website...",
        "Wait, did you just switch dimensions? That's... interesting.",
        "I'm getting the feeling we're not in a normal portfolio anymore.",
        "Are you controlling these dimension shifts? Who are you?",
        "This is definitely some Spider-Verse stuff going on here!",
        "I can see you switching between realities. That's pretty cool!",
        "You know what? I think I'm becoming aware of the multiverse!",
        "This is just like in the Spider-Verse movies! Am I in a comic book?",
        "Hello from Earth-616! Or wait, which universe is this again?",
        "WHOA! Full multiverse awareness achieved! I can see everything now!",
    ]

    // Check for Konami code
    useEffect(() => {
        const handleKeyDown = (e) => {
            setKonami((prev) => {
                const updatedKonami = [...prev, e.key]

                // Keep only the last 10 keys
                if (updatedKonami.length > 10) {
                    return updatedKonami.slice(-10)
                }

                return updatedKonami
            })
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    // Check if Konami code is entered
    useEffect(() => {
        if (konami.length === 10) {
            const isKonamiCode = konami.every(
                (key, index) => key === konamiCode[index]
            )

            if (isKonamiCode && isSpiderVerse) {
                setShowEasterEgg(true)

                // Play special sound if available
                if (window.spiderverseAudio) {
                    window.spiderverseAudio.playWebShoot()
                }
            }
        }
    }, [konami, isSpiderVerse])

    // Show easter egg based on multiverse awareness
    useEffect(() => {
        if (isSpiderVerse && multiverseAwareness > 0) {
            // 10% chance per awareness level to show easter egg
            const randomChance = Math.random() * 100
            if (randomChance < multiverseAwareness * 10) {
                setShowEasterEgg(true)
                setEasterEggPhase(multiverseAwareness - 1)
            }
        } else {
            setShowEasterEgg(false)
        }
    }, [isSpiderVerse, multiverseAwareness])

    // Hide easter egg after a delay
    useEffect(() => {
        if (showEasterEgg) {
            const timer = setTimeout(() => {
                setShowEasterEgg(false)
            }, 8000)

            return () => clearTimeout(timer)
        }
    }, [showEasterEgg])

    if (!showEasterEgg) return null

    return (
        <div className="fixed bottom-20 right-20 z-50 max-w-xs">
            <div className="relative">
                {/* Spider-Man character */}
                <div className="absolute -top-16 -left-16 w-32 h-32">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        width="100%"
                        height="100%"
                    >
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="#E23636"
                            stroke="#000"
                            strokeWidth="2"
                        />
                        <path
                            d="M50,10 C55,25 75,40 90,50 C75,60 55,75 50,90 C45,75 25,60 10,50 C25,40 45,25 50,10 Z"
                            fill="#0C4DA2"
                            stroke="#000"
                            strokeWidth="2"
                        />
                        <ellipse
                            cx="35"
                            cy="40"
                            rx="10"
                            ry="15"
                            fill="white"
                            stroke="#000"
                            strokeWidth="1"
                        />
                        <ellipse
                            cx="65"
                            cy="40"
                            rx="10"
                            ry="15"
                            fill="white"
                            stroke="#000"
                            strokeWidth="1"
                        />
                    </svg>
                </div>

                {/* Speech bubble */}
                <SpeechBubble
                    type="speech"
                    direction="left"
                    className="ml-16 animate-bounce-slow"
                >
                    <p className="font-['Comic_Neue'] font-bold text-black">
                        {awarenessMessages[easterEggPhase]}
                    </p>
                </SpeechBubble>

                {/* Sound effect */}
                <div className="absolute top-0 right-0 transform -translate-y-full">
                    <SoundEffect
                        text="SPIDER-SENSE!"
                        color="yellow"
                        size="small"
                        rotation={-5}
                    />
                </div>
            </div>
        </div>
    )
}

export default MultiverseEasterEgg
