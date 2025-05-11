import React, { useState, useEffect, useRef } from "react"
import { useDimension } from "../context/DimensionContext"

const DimensionTrigger = () => {
    const { isSpiderVerse, toggleDimension, isTransitioning } = useDimension()
    const [isHovering, setIsHovering] = useState(false)
    const [glitchInterval, setGlitchInterval] = useState(null)
    const [currentMessage, setCurrentMessage] = useState("")
    const [showMessage, setShowMessage] = useState(false)
    const [isGlitching, setIsGlitching] = useState(false)
    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })
    const [isRunningAway, setIsRunningAway] = useState(false)
    const buttonRef = useRef(null)
    const messageIntervalRef = useRef(null)
    const randomMessageIntervalRef = useRef(null)
    const runAwayTimeoutRef = useRef(null)
    const clickAttempts = useRef(0)

    // Fun warning messages for the button
    const warningMessages = [
        "Don't click me!",
        "Are you sure?",
        "This might break reality...",
        "Your spider-sense says NO",
        "Dimensional collapse imminent",
        "Click if you dare...",
        "Reality is fragile here",
        "Multiverse breach detected",
        "This button is unstable",
        "Warning: Glitchy dimension ahead",
        "Click to destabilize reality",
        "Spidey would be cautious",
        "Dimensional rift detected",
        "This might get weird...",
        "Proceed at your own risk",
        "Quantum uncertainty activated",
        "Dimensional stability: 12%",
        "Caution: Reality warping",
        "Multiverse protocols: Unstable",
        "Danger! Dimension collapsing",
    ]

    // Teasing messages when in Spider-Verse
    const teasingMessages = [
        "Miss your boring dimension?",
        "Can't handle the Spider-Verse?",
        "Back to reality?",
        "Too colorful for you?",
        "Leaving so soon?",
        "The multiverse will miss you",
        "Spidey says stay a while",
        "Running from adventure?",
        "Afraid of a little chaos?",
        "The Spider-Verse chose you",
        "One more minute in comic land?",
        "Your dimension is so... plain",
        "But the fun just started!",
        "The multiverse needs you",
        "Dimensional tourist leaving?",
        "Your spider-powers just activated",
        "But you look good in comic style",
        "The web of reality is comfy",
        "Spidey would stay longer",
        "Dimension hopping is addictive",
    ]

    // Function to get a random message
    const getRandomMessage = () => {
        const messages = isSpiderVerse ? teasingMessages : warningMessages
        return messages[Math.floor(Math.random() * messages.length)]
    }

    // Handle hover effects with enhanced glitches
    useEffect(() => {
        if (isHovering && !glitchInterval) {
            // Show a random message
            setCurrentMessage(getRandomMessage())
            setShowMessage(true)

            // Start cycling through messages
            messageIntervalRef.current = setInterval(() => {
                setCurrentMessage(getRandomMessage())
            }, 2000)

            // Create enhanced random glitch effect on hover
            const interval = setInterval(() => {
                const button = buttonRef.current
                if (button) {
                    // Random glitch effect with more intensity
                    const glitchX = Math.random() * 8 - 4
                    const glitchY = Math.random() * 8 - 4
                    const glitchRotate = Math.random() * 5 - 2.5
                    const glitchScale = 0.95 + Math.random() * 0.1
                    const glitchSkewX = Math.random() * 3 - 1.5
                    const glitchSkewY = Math.random() * 3 - 1.5

                    button.style.transform = `translate(${glitchX}px, ${glitchY}px) rotate(${glitchRotate}deg) scale(${glitchScale}) skew(${glitchSkewX}deg, ${glitchSkewY}deg)`

                    // Random color shift and glitch effects
                    if (Math.random() > 0.6) {
                        const hueRotate = Math.random() * 360
                        const blurAmount =
                            Math.random() > 0.8
                                ? `blur(${Math.random() * 2}px)`
                                : ""
                        const brightness = 0.8 + Math.random() * 0.4

                        button.style.filter = `hue-rotate(${hueRotate}deg) ${blurAmount} brightness(${brightness})`

                        // Occasionally trigger more intense glitch
                        if (Math.random() > 0.9) {
                            setIsGlitching(true)
                            setTimeout(() => setIsGlitching(false), 200)
                        }
                    } else {
                        button.style.filter = ""
                    }
                }
            }, 100) // Faster interval for more erratic movement

            setGlitchInterval(interval)
        } else if (!isHovering && glitchInterval) {
            clearInterval(glitchInterval)
            setGlitchInterval(null)

            // Clear message interval
            if (messageIntervalRef.current) {
                clearInterval(messageIntervalRef.current)
                messageIntervalRef.current = null
            }

            // Hide message after a delay
            setTimeout(() => {
                setShowMessage(false)
            }, 500)

            // Reset styles
            const button = buttonRef.current
            if (button && !isRunningAway) {
                button.style.transform = ""
                button.style.filter = ""
            }
        }

        return () => {
            if (glitchInterval) {
                clearInterval(glitchInterval)
            }
            if (messageIntervalRef.current) {
                clearInterval(messageIntervalRef.current)
            }
        }
    }, [isHovering, glitchInterval, isSpiderVerse, isRunningAway])

    // Function to make the button run away
    const runAway = () => {
        if (isRunningAway || isTransitioning) return

        setIsRunningAway(true)
        clickAttempts.current += 1

        // Set a random new position within viewport boundaries
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const buttonWidth = 60 // Approximate button width
        const buttonHeight = 60 // Approximate button height

        // Keep button within viewport bounds
        const maxX = viewportWidth - buttonWidth - 20
        const maxY = viewportHeight - buttonHeight - 20

        // Calculate new position
        let newX = Math.random() * maxX
        let newY = Math.random() * maxY

        // Ensure button doesn't go too close to edges
        newX = Math.max(20, newX)
        newY = Math.max(20, newY)

        // Update position
        setButtonPosition({ x: newX, y: newY })

        // Set a special message
        setCurrentMessage("Catch me if you can!")
        setShowMessage(true)

        // Reset after a delay
        runAwayTimeoutRef.current = setTimeout(() => {
            setIsRunningAway(false)
            setButtonPosition({ x: 0, y: 0 })

            // If user has tried to click multiple times, give up and let them click
            if (clickAttempts.current >= 3) {
                clickAttempts.current = 0
                setCurrentMessage("Fine, you win. Click me.")
            } else {
                setShowMessage(false)
            }
        }, 2000)
    }

    // Handle button click with chance to run away
    const handleButtonClick = () => {
        if (isTransitioning) return

        // 30% chance the button runs away instead of triggering
        if (!isSpiderVerse && Math.random() < 0.3 && !isRunningAway) {
            runAway()
            return
        }

        // 19% chance to show a special message before triggering
        if (Math.random() < 0.19 && !isRunningAway) {
            const specialMessages = isSpiderVerse
                ? [
                      "Goodbye, Spider-Verse!",
                      "See you in another dimension!",
                      "Reality check time!",
                  ]
                : [
                      "Here we go!",
                      "Brace yourself!",
                      "Dimension jump in 3...2...1!",
                  ]

            setCurrentMessage(
                specialMessages[
                    Math.floor(Math.random() * specialMessages.length)
                ]
            )
            setShowMessage(true)
            setIsGlitching(true)

            // Add a dramatic pause before transition
            setTimeout(() => {
                setIsGlitching(false)
                // Reset click attempts
                clickAttempts.current = 0
                // Trigger the dimension change
                toggleDimension()
            }, 1000)

            return
        }

        // Reset click attempts
        clickAttempts.current = 0

        // Trigger the dimension change
        toggleDimension()
    }

    // Set up random message appearances even when not hovering
    useEffect(() => {
        // Start random message appearances
        const setupRandomMessages = () => {
            // Clear any existing interval
            if (randomMessageIntervalRef.current) {
                clearInterval(randomMessageIntervalRef.current)
            }

            // Set up new random message interval
            randomMessageIntervalRef.current = setInterval(() => {
                // Only show random messages if not already showing one and not transitioning
                if (
                    !showMessage &&
                    !isTransitioning &&
                    !isHovering &&
                    Math.random() < 0.3
                ) {
                    // Show a random message
                    setCurrentMessage(getRandomMessage())
                    setShowMessage(true)

                    // Randomly trigger glitch effect
                    if (Math.random() < 0.4) {
                        setIsGlitching(true)
                        setTimeout(() => setIsGlitching(false), 300)
                    }

                    // Hide message after a random time
                    setTimeout(() => {
                        setShowMessage(false)
                    }, 2000 + Math.random() * 1000)
                }
            }, 5000) // Check every 5 seconds
        }

        setupRandomMessages()

        return () => {
            if (randomMessageIntervalRef.current) {
                clearInterval(randomMessageIntervalRef.current)
            }
        }
    }, [isTransitioning, showMessage, isHovering, isSpiderVerse])

    // Clean up on unmount
    useEffect(() => {
        return () => {
            if (runAwayTimeoutRef.current) {
                clearTimeout(runAwayTimeoutRef.current)
            }
            if (randomMessageIntervalRef.current) {
                clearInterval(randomMessageIntervalRef.current)
            }
        }
    }, [])

    return (
        <>
            {/* Spider-sense warning effect */}
            {isHovering && !isSpiderVerse && (
                <div className="fixed inset-0 pointer-events-none z-30">
                    <div className="absolute inset-0 bg-yellow-500/5 animate-pulse-slow"></div>
                    <div className="absolute bottom-24 right-6 w-40 h-40 rounded-full bg-yellow-500/10 animate-ping-slow"></div>
                </div>
            )}

            {/* Message speech bubble */}
            {showMessage && (
                <div
                    className={`fixed z-40 ${
                        isRunningAway ? "bottom-40" : "bottom-36"
                    } right-6 bg-white border-2 border-black rounded-xl p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm max-w-[200px] whitespace-normal ${
                        isSpiderVerse ? "comic-text" : ""
                    }`}
                    data-text={currentMessage}
                    style={{
                        transform: isRunningAway
                            ? `translate(${
                                  buttonPosition.x > window.innerWidth / 2
                                      ? "-120%"
                                      : "20%"
                              }, 0)`
                            : "",
                        transition: "all 0.3s ease",
                        animation: isGlitching
                            ? "message-glitch 0.3s infinite"
                            : "",
                    }}
                >
                    <div
                        className={`text-black font-bold ${
                            isGlitching ? "text-red-500" : ""
                        } ${isSpiderVerse ? "font-['Comic_Neue']" : ""}`}
                    >
                        {currentMessage}
                        {isSpiderVerse && Math.random() > 0.7 && (
                            <span className="text-xs block mt-1 text-blue-600 italic">
                                - Friendly Neighborhood Spider-Man
                            </span>
                        )}
                    </div>

                    {/* Speech bubble tail */}
                    <div className="absolute w-4 h-4 bg-white border-r-2 border-b-2 border-black transform rotate-45 bottom-[-8px] right-[20px]"></div>

                    {/* Add some decorative elements for more engagement */}
                    {isSpiderVerse && (
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full border border-black flex items-center justify-center text-white text-xs font-bold">
                            !
                        </div>
                    )}
                    {!isSpiderVerse && Math.random() > 0.7 && (
                        <div className="absolute -top-2 -left-2 w-5 h-5 bg-purple-500 rounded-full border border-black flex items-center justify-center text-white text-xs font-bold animate-pulse">
                            ?
                        </div>
                    )}
                </div>
            )}

            <button
                ref={buttonRef}
                id="dimension-trigger"
                onClick={handleButtonClick}
                disabled={isTransitioning}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={`fixed z-40 p-3 rounded-full transition-all duration-300 ${
                    isTransitioning
                        ? "opacity-50 cursor-not-allowed"
                        : "opacity-100 cursor-pointer"
                } ${
                    isSpiderVerse
                        ? "bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-red-100 hover:rotate-3"
                        : "bg-purple-600 text-white shadow-lg hover:bg-purple-700 hover:scale-110"
                }`}
                style={{
                    bottom: isRunningAway ? `${buttonPosition.y}px` : "6rem",
                    right: isRunningAway ? `${buttonPosition.x}px` : "1.5rem",
                    transition: isRunningAway
                        ? "bottom 0.5s ease-out, right 0.5s ease-out"
                        : "transform 0.3s ease, filter 0.3s ease",
                    animation: isGlitching
                        ? "dimension-glitch-anim 0.3s infinite"
                        : "",
                }}
            >
                <div className="relative">
                    {isSpiderVerse ? (
                        // Exit Spider-Verse icon with occasional glitch
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-6 w-6 ${
                                isGlitching ? "animate-pulse" : ""
                            }`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M8 12h8" />
                            <path d="M12 8v8" />
                        </svg>
                    ) : (
                        // Enter Spider-Verse icon (spider web) with occasional glitch
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-6 w-6 ${
                                isGlitching ? "animate-spin-slow" : ""
                            }`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 2v20M2 12h20M2.63 2.63l18.74 18.74M21.37 2.63L2.63 21.37" />
                            <circle cx="12" cy="12" r="6" />
                            <circle cx="12" cy="12" r="2" />
                        </svg>
                    )}
                </div>

                {/* Glitch lines that occasionally appear */}
                {isGlitching && (
                    <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                        {Array.from({ length: 3 }).map((_, i) => {
                            const height = 1 + Math.random() * 2
                            const top = Math.random() * 100
                            return (
                                <div
                                    key={i}
                                    className="absolute bg-white w-full"
                                    style={{
                                        top: `${top}%`,
                                        height: `${height}px`,
                                        opacity: 0.7,
                                        transform: `translateY(${
                                            Math.random() * 10 - 5
                                        }px)`,
                                    }}
                                ></div>
                            )
                        })}
                    </div>
                )}
            </button>

            {/* Add custom animations */}
            <style>{`
                @keyframes ping-slow {
                    0% { transform: scale(0.8); opacity: 0.8; }
                    50% { transform: scale(1.5); opacity: 0; }
                    100% { transform: scale(0.8); opacity: 0; }
                }
                
                @keyframes pulse-slow {
                    0% { opacity: 0; }
                    50% { opacity: 0.1; }
                    100% { opacity: 0; }
                }
                
                @keyframes message-glitch {
                    0% { transform: translate(50%, 0) skew(0deg, 0deg); }
                    20% { transform: translate(48%, -2px) skew(3deg, 1deg); }
                    40% { transform: translate(52%, 2px) skew(-2deg, -1deg); }
                    60% { transform: translate(49%, 1px) skew(1deg, -2deg); }
                    80% { transform: translate(51%, -1px) skew(-1deg, 2deg); }
                    100% { transform: translate(50%, 0) skew(0deg, 0deg); }
                }
            `}</style>
        </>
    )
}

export default DimensionTrigger
