import React, { useState, useEffect, useRef } from "react"
import { useDimension } from "../context/DimensionContext"
import SoundEffect from "./SoundEffect"
import SpeechBubble from "./SpeechBubble"

// Helper function to get the actual color values
const getCharacterBackgroundColor = (colorName) => {
    const colorMap = {
        "spiderverse-red": "#FF1744",
        "spiderverse-blue": "#304FFE",
        "spiderverse-cyan": "#00E5FF",
        "spiderverse-purple": "#AA00FF",
        "spiderverse-yellow": "#FFEA00",
        "spiderverse-pink": "#FF4081",
        "spiderverse-green": "#00E676",
        "spiderverse-orange": "#FF9100",
        "spiderverse-black": "#212121",
    }
    return colorMap[colorName] || "#FF1744" // Default to red if not found
}

const SpiderversePostCredit = () => {
    const { isSpiderVerse, multiverseAwareness, showPostCredit } =
        useDimension()
    const [phase, setPhase] = useState(0)
    const [hasBeenTriggered, setHasBeenTriggered] = useState(false)
    const [localShowPostCredit, setLocalShowPostCredit] = useState(false)
    const [interactionCount, setInteractionCount] = useState(0)
    const [showEasterEggHint, setShowEasterEggHint] = useState(false)
    const [showExtraCharacter, setShowExtraCharacter] = useState(false)
    const timeoutRef = useRef(null)
    const containerRef = useRef(null)
    const phaseTimeoutsRef = useRef([])
    const hideTimeoutRef = useRef(null)

    // Check if user has scrolled to the bottom of the page
    useEffect(() => {
        if (!isSpiderVerse || hasBeenTriggered) return

        const handleScroll = () => {
            // Only trigger if user has moderate multiverse awareness (3+)
            if (multiverseAwareness < 3) return

            const scrollPosition = window.scrollY + window.innerHeight
            const pageHeight = document.documentElement.scrollHeight

            // If user has scrolled to the bottom and stayed there for 2 seconds
            if (scrollPosition >= pageHeight - 10) {
                if (!timeoutRef.current) {
                    timeoutRef.current = setTimeout(() => {
                        setLocalShowPostCredit(true)
                        setHasBeenTriggered(true)

                        // Store in localStorage so it only shows once per session
                        localStorage.setItem("post-credit-shown", "true")

                        // Play special sound if available
                        if (window.spiderverseAudio) {
                            window.spiderverseAudio.playWebShoot()
                        }
                    }, 2000)
                }
            } else {
                // Clear timeout if user scrolls away
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current)
                    timeoutRef.current = null
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [isSpiderVerse, multiverseAwareness, hasBeenTriggered])

    // Sync local state with context state
    useEffect(() => {
        if (showPostCredit) {
            setLocalShowPostCredit(true)
        }
    }, [showPostCredit])

    // Progress through the post-credit scene phases
    useEffect(() => {
        if (!localShowPostCredit) return

        // Clear any existing timeouts
        phaseTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout))
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)

        // More phases with slightly faster timing
        const phaseTimings = [0, 3500, 7000, 10500, 14000, 17500, 21000]

        const newPhaseTimeouts = phaseTimings.map((timing, index) => {
            return setTimeout(() => {
                setPhase(index)

                // Show Easter egg hint when we reach phase 4
                if (index === 4) {
                    setShowEasterEggHint(true)
                }

                // Show extra character at the last phase
                if (index === phaseTimings.length - 1) {
                    setShowExtraCharacter(true)
                }

                // Play sound effect on each phase change
                if (index > 0 && window.spiderverseAudio) {
                    window.spiderverseAudio.playClick()
                }
            }, timing)
        })

        phaseTimeoutsRef.current = newPhaseTimeouts

        // Auto-hide after last phase + 8 seconds (longer duration)
        hideTimeoutRef.current = setTimeout(() => {
            setLocalShowPostCredit(false)
            // Reset states for next time
            setTimeout(() => {
                setPhase(0)
                setShowEasterEggHint(false)
                setShowExtraCharacter(false)
                setInteractionCount(0)
            }, 1000)
        }, phaseTimings[phaseTimings.length - 1] + 8000)

        return () => {
            phaseTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout))
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
        }
    }, [localShowPostCredit])

    // Handle click to dismiss
    const handleDismiss = () => {
        setLocalShowPostCredit(false)
        // Reset states for next time
        setTimeout(() => {
            setPhase(0)
            setShowEasterEggHint(false)
            setShowExtraCharacter(false)
            setInteractionCount(0)
        }, 1000)
    }

    // Handle interaction with the scene
    const handleInteraction = () => {
        setInteractionCount((prev) => {
            const newCount = prev + 1

            // After 3 interactions, show the Easter egg hint
            if (newCount === 3 && !showEasterEggHint) {
                setShowEasterEggHint(true)
                if (window.spiderverseAudio) {
                    window.spiderverseAudio.playWebShoot()
                }
            }

            // After 5 interactions, show the extra character
            if (newCount === 5 && !showExtraCharacter) {
                setShowExtraCharacter(true)
                if (window.spiderverseAudio) {
                    window.spiderverseAudio.playGlitch()
                }
            }

            return newCount
        })
    }

    if (!localShowPostCredit || !isSpiderVerse) return null

    // Enhanced characters for the post-credit scene with more dialogue options
    const characters = {
        miles: {
            name: "Miles",
            color: "spiderverse-red",
            accent: "#E23636",
            messages: [
                "Hey, I'm picking up some strange multiverse activity on this website...",
                "Someone's been dimension-hopping. The code signature looks familiar.",
                "This portfolio has traces of Spider-Verse energy all over it!",
            ],
            symbol: "M50,10 C55,25 75,40 90,50 C75,60 55,75 50,90 C45,75 25,60 10,50 C25,40 45,25 50,10 Z",
        },
        gwen: {
            name: "Gwen",
            color: "spiderverse-cyan",
            accent: "#00D7FF",
            messages: [
                "I've been tracking these anomalies too. Definitely not a coincidence.",
                "This portfolio has some serious multiverse energy.",
                "The animations here... they're using our dimensional frequency patterns.",
            ],
            symbol: "M50,10 C60,30 80,40 90,50 C80,60 60,70 50,90 C40,70 20,60 10,50 C20,40 40,30 50,10 Z",
        },
        miguel: {
            name: "Miguel",
            color: "spiderverse-blue",
            accent: "#0C4DA2",
            messages: [
                "My scanners confirm it. This developer has been experimenting with cross-dimensional design.",
                "Impressive work. Almost like they've seen our universe.",
                "The code structure suggests knowledge of multiverse rendering techniques. Fascinating.",
            ],
            symbol: "M50,10 C55,25 75,40 90,50 C75,60 55,75 50,90 C45,75 25,60 10,50 C25,40 45,25 50,10 Z M30,30 L70,70 M30,70 L70,30",
        },
        peter: {
            name: "Peter B.",
            color: "spiderverse-purple",
            accent: "#E136E2",
            messages: [
                "Great, another multiverse situation. Just what we needed.",
                "Hey, try the Konami code while you're here. Just saying...",
                "This developer definitely knows too much about the multiverse. Should we be concerned?",
            ],
            symbol: "M50,10 C55,25 75,40 90,50 C75,60 55,75 50,90 C45,75 25,60 10,50 C25,40 45,25 50,10 Z",
        },
        noir: {
            name: "Spider-Noir",
            color: "spiderverse-black",
            accent: "#424242",
            messages: [
                "This portfolio... it's got style. Reminds me of the shadows dancing in the moonlight.",
                "I sense a kindred spirit. Someone who understands the contrast between light and dark.",
                "The code... it whispers secrets from across the void. Like jazz in the rain.",
            ],
            symbol: "M50,10 C55,25 75,40 90,50 C75,60 55,75 50,90 C45,75 25,60 10,50 C25,40 45,25 50,10 Z",
        },
        peni: {
            name: "Peni",
            color: "spiderverse-pink",
            accent: "#FF80AB",
            messages: [
                "SP//dr systems detecting unusual code patterns in this portfolio!",
                "The animations are using advanced dimensional algorithms. So cool!",
                "I'd love to analyze how they achieved these effects. Maybe we can upgrade SP//dr with them!",
            ],
            symbol: "M50,30 L70,50 L50,70 L30,50 Z M50,10 L50,30 M50,70 L50,90 M10,50 L30,50 M70,50 L90,50",
        },
        ham: {
            name: "Spider-Ham",
            color: "spiderverse-yellow",
            accent: "#FFD600",
            messages: [
                "That's all folks! ...Wait, there's more? This portfolio's got layers like a cartoon!",
                "This developer must've watched my cartoons for inspiration. I'm flattered!",
                "If you click around enough, you might find some Easter eggs. Trust me, I know eggs!",
            ],
            symbol: "M50,10 C60,30 80,40 90,50 C80,60 60,70 50,90 C40,70 20,60 10,50 C20,40 40,30 50,10 Z",
        },
        // Secret character that appears after interactions
        spot: {
            name: "The Spot",
            color: "spiderverse-black",
            accent: "#FFFFFF",
            messages: [
                "I've been watching from the shadows... this portfolio has potential for dimensional portals.",
                "Perhaps I could use these techniques for my own purposes...",
                "Don't mind me, just studying how this developer bridges dimensions. For research, of course.",
            ],
            symbol: "M50,50 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0 M30,30 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 M70,30 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 M30,70 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 M70,70 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 M50,50 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0",
        },
    }

    // Get the current character based on the phase
    const characterKeys = Object.keys(characters)
    const mainCharacterKey =
        characterKeys[Math.min(phase, characterKeys.length - 2)] // -2 to exclude the secret character
    const character = characters[mainCharacterKey]

    // Get the current message based on the phase
    const messageIndex = Math.min(
        Math.floor(phase / 2), // This makes messages change less frequently than characters
        character.messages.length - 1
    )
    const message = character.messages[messageIndex]

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden cursor-default"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.9)", // Darker background
                backdropFilter: "blur(10px)", // Increased blur
            }}
            onClick={handleInteraction} // Add interaction tracking
            aria-label="Post-credit scene"
            role="dialog"
        >
            {/* Comic book style background elements with enhanced effects */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full benday-dots"></div>
                <div className="absolute top-0 left-0 w-full h-full halftone-overlay"></div>

                {/* Comic panel borders */}
                <div className="absolute inset-10 border-4 border-white opacity-5 rounded-lg"></div>
                <div className="absolute inset-20 border-2 border-white opacity-5 rounded-lg"></div>
            </div>

            {/* Enhanced animated multiverse lines */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-gradient-to-r from-spiderverse-red via-spiderverse-blue to-spiderverse-purple opacity-20"
                        style={{
                            height: `${Math.random() > 0.7 ? 2 : 1}px`, // Some lines are thicker
                            width: "100%",
                            top: `${Math.random() * 100}%`,
                            left: 0,
                            transform: `rotate(${Math.random() * 180}deg)`,
                            animation: `dimensional-shift ${
                                3 + Math.random() * 5
                            }s linear infinite`,
                            animationDelay: `${Math.random() * 2}s`,
                        }}
                    ></div>
                ))}

                {/* Dimensional portal effects */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh] opacity-5 pointer-events-none">
                    <div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-spiderverse-red via-spiderverse-blue to-spiderverse-purple animate-spin-slow"
                        style={{ animationDuration: "120s" }}
                    ></div>
                </div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full opacity-30"
                        style={{
                            width: `${Math.random() * 4 + 1}px`,
                            height: `${Math.random() * 4 + 1}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float-particle ${
                                10 + Math.random() * 20
                            }s linear infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    ></div>
                ))}
            </div>

            {/* Enhanced post-credit title with film reel decoration */}
            <div className="absolute top-5 sm:top-8 md:top-10 left-0 right-0 text-center">
                <div className="relative inline-block">
                    {/* Film reel decoration with animation */}
                    <div
                        className="absolute -left-8 sm:-left-10 top-1/2 transform -translate-y-1/2 w-6 h-12 sm:w-8 sm:h-16 animate-spin-slow"
                        style={{ animationDuration: "8s" }}
                    >
                        <div className="w-full h-full bg-gray-800 rounded-lg relative overflow-hidden">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-gray-600 rounded-full"
                                    style={{
                                        left: "50%",
                                        top: `${i * 20 + 10}%`,
                                        transform: "translateX(-50%)",
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Film reel decoration right with opposite animation */}
                    <div
                        className="absolute -right-8 sm:-right-10 top-1/2 transform -translate-y-1/2 w-6 h-12 sm:w-8 sm:h-16 animate-spin-slow"
                        style={{
                            animationDuration: "8s",
                            animationDirection: "reverse",
                        }}
                    >
                        <div className="w-full h-full bg-gray-800 rounded-lg relative overflow-hidden">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-gray-600 rounded-full"
                                    style={{
                                        left: "50%",
                                        top: `${i * 20 + 10}%`,
                                        transform: "translateX(-50%)",
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <h2
                        className="comic-title text-2xl sm:text-3xl md:text-4xl text-white inline-block px-4 py-2 bg-black bg-opacity-80 rounded-lg comic-border relative overflow-hidden"
                        aria-label="Post-Credit Scene Title"
                    >
                        {/* Enhanced animated background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-spiderverse-red/20 via-spiderverse-blue/20 to-spiderverse-purple/20 animate-pulse"></div>

                        {/* Comic dots overlay */}
                        <div className="absolute inset-0 benday-dots opacity-20"></div>

                        <span className="bg-gradient-to-r from-spiderverse-red via-spiderverse-blue to-spiderverse-purple bg-clip-text text-transparent animate-color-cycle relative">
                            Post-Credit Scene
                        </span>

                        {/* Enhanced decorative stars with animation */}
                        <span className="absolute -top-1 -left-1 text-spiderverse-yellow text-xs animate-pulse">
                            ★
                        </span>
                        <span
                            className="absolute -top-1 -right-1 text-spiderverse-cyan text-xs animate-pulse"
                            style={{ animationDelay: "0.5s" }}
                        >
                            ★
                        </span>
                        <span
                            className="absolute -bottom-1 -left-1 text-spiderverse-purple text-xs animate-pulse"
                            style={{ animationDelay: "1s" }}
                        >
                            ★
                        </span>
                        <span
                            className="absolute -bottom-1 -right-1 text-spiderverse-red text-xs animate-pulse"
                            style={{ animationDelay: "1.5s" }}
                        >
                            ★
                        </span>
                    </h2>
                </div>
            </div>

            {/* Enhanced close button with improved styling and better positioning */}
            <button
                onClick={handleDismiss}
                className="fixed top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5 spiderverse-button bg-spiderverse-red text-white py-1 px-2 sm:py-2 sm:px-3 md:py-2 md:px-4 text-sm sm:text-base transform hover:scale-105 transition-transform duration-200 comic-border z-50 cursor-pointer"
                aria-label="Skip post-credit scene"
            >
                <span className="relative z-10">Skip</span>
                <div className="absolute inset-0 benday-dots opacity-10"></div>

                {/* Button highlight effect */}
                <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-200"></div>
            </button>

            {/* Main character and speech bubble */}
            <div className="relative max-w-2xl w-full px-4 md:px-0">
                {/* Character silhouette with enhanced styling and animations */}
                <div
                    className="absolute -left-5 sm:-left-10 md:-left-20 bottom-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 animate-bounce-slow"
                    style={{ animationDuration: "3s" }}
                >
                    <div
                        className="w-full h-full rounded-full relative overflow-hidden comic-border transform transition-transform hover:scale-110 duration-300"
                        style={{
                            backgroundColor: getCharacterBackgroundColor(
                                character.color
                            ),
                            border: `3px solid ${character.accent}`,
                            boxShadow: "5px 5px 0 rgba(0, 0, 0, 0.8)",
                        }}
                    >
                        {/* Enhanced Spider symbol with custom path per character */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 100 100"
                                width="60%"
                                height="60%"
                                className="drop-shadow-lg"
                            >
                                <path
                                    d={character.symbol}
                                    fill={character.accent}
                                    stroke="#000"
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>

                        {/* Comic book dots overlay */}
                        <div className="absolute inset-0 benday-dots opacity-10"></div>

                        {/* Enhanced animated glow effect */}
                        <div
                            className="absolute inset-0 rounded-full animate-pulse opacity-60"
                            style={{
                                background: `radial-gradient(circle, ${character.accent}90 0%, transparent 70%)`,
                                animationDuration: "2s",
                            }}
                        ></div>

                        {/* Dimensional energy effect */}
                        <div className="absolute inset-0 overflow-hidden">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute bg-white opacity-30"
                                    style={{
                                        height: "1px",
                                        width: `${30 + Math.random() * 40}%`,
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`,
                                        transform: `rotate(${
                                            Math.random() * 360
                                        }deg)`,
                                        animation: `pulse-fade ${
                                            2 + Math.random() * 3
                                        }s infinite`,
                                        animationDelay: `${Math.random() * 2}s`,
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced web line connecting to speech bubble */}
                    <div className="absolute top-1/2 -right-4 sm:-right-6 md:-right-8 w-4 sm:w-6 md:w-8 h-1 bg-white opacity-70 transform rotate-12">
                        {/* Web texture */}
                        <div className="absolute inset-0 flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-px bg-gray-400 flex-grow mx-px"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Enhanced character name with improved styling */}
                <div className="absolute -left-5 sm:-left-10 md:-left-20 -top-10 z-10">
                    <div className="relative">
                        <SoundEffect
                            text={character.name}
                            color={character.color}
                            size="small"
                            rotation={-5}
                        />
                        {/* Enhanced action lines around character name */}
                        <div className="absolute -inset-2 -z-10">
                            {[...Array(12)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute bg-white h-px opacity-70"
                                    style={{
                                        width: `${10 + Math.random() * 20}px`,
                                        left: "50%",
                                        top: "50%",
                                        transform: `rotate(${
                                            i * 30
                                        }deg) translateX(${
                                            10 + Math.random() * 15
                                        }px)`,
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Enhanced speech bubble with animation and improved responsiveness */}
                <SpeechBubble
                    type="speech"
                    direction="right"
                    className="ml-10 sm:ml-16 md:ml-20 animate-fade-in transform translate-y-4 hover:scale-105 transition-transform duration-300 max-w-[calc(100%-80px)] sm:max-w-[calc(100%-100px)] md:max-w-[calc(100%-120px)]"
                >
                    <p className="font-['Comic_Neue'] font-bold text-black text-sm sm:text-base md:text-lg">
                        {message}
                    </p>
                </SpeechBubble>
            </div>

            {/* Secret character that appears after interactions or at the end - repositioned for better visibility on all screens */}
            {showExtraCharacter && (
                <div className="absolute bottom-24 right-8 xs:right-12 sm:right-24 md:right-40 w-16 xs:w-20 sm:w-24 md:w-28 h-16 xs:h-20 sm:h-24 md:h-28 animate-float-slow z-30">
                    <div
                        className="w-full h-full rounded-full relative overflow-hidden comic-border transform hover:scale-110 transition-transform duration-300"
                        style={{
                            backgroundColor: getCharacterBackgroundColor(
                                characters.spot.color
                            ),
                            border: `3px solid ${characters.spot.accent}`,
                            boxShadow: "5px 5px 0 rgba(0, 0, 0, 0.8)",
                        }}
                    >
                        {/* The Spot's symbol */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 100 100"
                                width="70%"
                                height="70%"
                                className="drop-shadow-lg"
                            >
                                <path
                                    d={characters.spot.symbol}
                                    fill={characters.spot.accent}
                                    stroke="#000"
                                    strokeWidth="1.5"
                                />
                            </svg>
                        </div>

                        {/* Animated portal effect */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div
                                className="absolute inset-0 rounded-full animate-spin-slow"
                                style={{
                                    background:
                                        "radial-gradient(circle, transparent 30%, rgba(0,0,0,0.8) 70%)",
                                    animationDuration: "8s",
                                }}
                            ></div>
                        </div>
                    </div>

                    {/* The Spot's name - adjusted for better visibility */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                        <SoundEffect
                            text={characters.spot.name}
                            color="spiderverse-black"
                            size="small"
                            rotation={5}
                        />
                    </div>

                    {/* Fallback for very small screens - speech bubble below character instead of to the side */}
                    <div className="block xs:hidden absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-32 z-20">
                        <SpeechBubble
                            type="thought"
                            direction="top"
                            className="animate-fade-in"
                        >
                            <p className="font-['Comic_Neue'] font-bold text-black text-xs">
                                {characters.spot.messages[0]}
                            </p>
                        </SpeechBubble>
                    </div>

                    {/* The Spot's speech bubble - repositioned for better visibility with small screen fallback */}
                    <SpeechBubble
                        type="thought"
                        direction="left"
                        className="absolute -top-20 -right-4 xs:-right-12 sm:-right-24 md:-right-32 w-36 xs:w-40 sm:w-48 md:w-56 animate-fade-in z-20 hidden xs:block"
                    >
                        <p className="font-['Comic_Neue'] font-bold text-black text-xs sm:text-sm">
                            {
                                characters.spot.messages[
                                    Math.min(
                                        interactionCount,
                                        characters.spot.messages.length - 1
                                    )
                                ]
                            }
                        </p>
                    </SpeechBubble>
                </div>
            )}

            {/* Enhanced post-credit badge with animation */}
            <div className="fixed bottom-5 sm:bottom-8 md:bottom-10 right-5 sm:right-8 md:right-10 bg-black p-2 sm:p-3 rounded-lg comic-border z-40 transform hover:scale-110 transition-transform duration-300">
                <div className="flex flex-col items-center relative overflow-hidden">
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-spiderverse-red/10 via-spiderverse-blue/10 to-spiderverse-purple/10 animate-pulse"></div>

                    <div className="text-white text-[10px] sm:text-xs font-bold relative z-10">
                        POST-CREDIT SCENE
                    </div>
                    <div className="text-spiderverse-red text-[8px] sm:text-[10px] font-bold mt-1 relative z-10">
                        EARTH-616
                    </div>

                    {/* Film strip decoration */}
                    <div className="flex justify-center mt-1">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="w-2 h-1 bg-gray-700 mx-0.5"
                            ></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Enhanced comic book style credits */}
            <div className="fixed bottom-2 sm:bottom-3 md:bottom-5 left-0 right-0 text-center z-40">
                <div className="inline-block bg-black bg-opacity-70 px-3 py-1 rounded comic-border transform hover:scale-105 transition-transform duration-300">
                    <p className="text-white text-xs sm:text-sm font-['Comic_Neue'] font-bold">
                        <span className="text-spiderverse-yellow">
                            Created by:
                        </span>{" "}
                        <span className="bg-gradient-to-r from-spiderverse-red to-spiderverse-blue bg-clip-text text-transparent animate-color-cycle">
                            Sumit Maurya
                        </span>
                    </p>
                    <p className="text-white text-[10px] sm:text-xs font-['Comic_Neue'] mt-0.5 sm:mt-1">
                        <span className="text-spiderverse-cyan">
                            Inspired by:
                        </span>{" "}
                        <span className="text-spiderverse-pink">
                            Spider-Man: Across the Spider-Verse
                        </span>
                    </p>

                    {/* Enhanced film strip decoration with animation */}
                    <div className="flex justify-center mt-1 overflow-hidden">
                        <div
                            className="flex animate-slide-x"
                            style={{ animationDuration: "15s" }}
                        >
                            {[...Array(16)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-3 h-1.5 bg-gray-700 mx-0.5"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Easter egg hint with better visibility and animations */}
            {showEasterEggHint && (
                <div className="fixed bottom-12 sm:bottom-16 md:bottom-20 left-0 right-0 text-center z-40">
                    <div className="inline-block relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-500/60 via-blue-500/60 to-purple-500/60 rounded-lg blur-sm animate-pulse"></div>
                        <p className="relative bg-black bg-opacity-90 text-red-400 text-xs sm:text-sm font-['Comic_Neue'] font-bold animate-pulse px-3 py-1 rounded-lg border border-red-500">
                            <span className="inline-block mr-1 transform -translate-y-px">
                                ↑↑↓↓←→←→BA
                            </span>
                            <span className="text-white">
                                Try the Konami code for another surprise...
                            </span>
                        </p>

                        {/* Enhanced decorative web elements */}
                        <div className="absolute -top-1 -left-1 w-2 h-2">
                            <svg
                                viewBox="0 0 10 10"
                                className="w-full h-full text-white opacity-70"
                            >
                                <path
                                    d="M0,0 L10,10 M0,10 L10,0"
                                    stroke="currentColor"
                                    strokeWidth="0.5"
                                />
                            </svg>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-2 h-2">
                            <svg
                                viewBox="0 0 10 10"
                                className="w-full h-full text-white opacity-70"
                            >
                                <path
                                    d="M0,0 L10,10 M0,10 L10,0"
                                    stroke="currentColor"
                                    strokeWidth="0.5"
                                />
                            </svg>
                        </div>

                        {/* Animated arrow pointing to the hint */}
                        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 animate-bounce-x">
                            <svg
                                width="20"
                                height="10"
                                viewBox="0 0 20 10"
                                className="fill-red-500"
                            >
                                <path
                                    d="M0,5 L15,5 M10,0 L15,5 L10,10"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            )}

            {/* Interaction counter - hidden but tracks clicks */}
            <div className="sr-only" aria-live="polite">
                Interaction count: {interactionCount}
            </div>

            {/* Add CSS animations for new effects */}
            <style jsx>{`
                @keyframes float-particle {
                    0% {
                        transform: translate(0, 0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.3;
                    }
                    90% {
                        opacity: 0.3;
                    }
                    100% {
                        transform: translate(
                            ${Math.random() > 0.5 ? "" : "-"}${20 + Math.random() * 30}vw,
                            ${Math.random() > 0.5 ? "" : "-"}${20 + Math.random() * 30}vh
                        );
                        opacity: 0;
                    }
                }

                @keyframes pulse-fade {
                    0% {
                        opacity: 0.1;
                    }
                    50% {
                        opacity: 0.4;
                    }
                    100% {
                        opacity: 0.1;
                    }
                }

                @keyframes bounce-x {
                    0%,
                    100% {
                        transform: translateX(0) translateY(-50%);
                    }
                    50% {
                        transform: translateX(-5px) translateY(-50%);
                    }
                }

                @keyframes slide-x {
                    0% {
                        transform: translateX(-50%);
                    }
                    100% {
                        transform: translateX(0%);
                    }
                }

                @keyframes spin-slow {
                    from {
                        transform: rotate(0deg) translateY(-50%);
                    }
                    to {
                        transform: rotate(360deg) translateY(-50%);
                    }
                }
            `}</style>
        </div>
    )
}

export default SpiderversePostCredit
