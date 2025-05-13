import React, { useState, useEffect, useRef } from "react"
import { useDimension } from "../context/DimensionContext"

const DimensionTrigger = () => {
    const { isSpiderVerse, toggleDimension, isTransitioning } = useDimension()
    const [isHovering, setIsHovering] = useState(false)
    const [glitchInterval, setGlitchInterval] = useState(null)
    const [currentMessage, setCurrentMessage] = useState("")
    const [showMessage, setShowMessage] = useState(false)
    const [isGlitching, setIsGlitching] = useState(false)
    const buttonRef = useRef(null)
    const messageIntervalRef = useRef(null)
    const randomMessageIntervalRef = useRef(null)
    const clickAttempts = useRef(0)

    // Fun warning messages for the button (mix of dev journey and Spider-Verse)
    const warningMessages = [
        "Don't click me!",
        "Are you sure?",
        "This might break the code...",
        "Your dev-sense says NO",
        "Stack overflow imminent",
        "Click if you dare...",
        "Codebase is fragile here",
        "Merge conflict detected",
        "This button is unstable",
        "Warning: Buggy code ahead",
        "Click to destabilize production",
        "Senior devs would be cautious",
        "Git conflict detected",
        "This might get weird...",
        "Proceed at your own risk",
        "Runtime uncertainty activated",
        "Code stability: 12%",
        "Caution: CSS warping",
        "CI/CD pipeline: Unstable",
        "Danger! Database collapsing",

        "Dimensional collapse imminent",
        "Spider-sense tingling...",
        "Reality is fragile here",
        "Multiverse breach detected",
        "Warning: Glitchy dimension ahead",
        // More dev journey messages
        "Resume not yet optimized...",
        "Interview prep incomplete",
        "Algorithm challenge loading...",
        "Whiteboard interview detected",
        "Warning: Technical test unfinished",
        "Job application barrier thinning",
        "LinkedIn profile incomplete",
        "Portfolio stretching thin",
        "Callback loops forming",
        "Career divergence imminent",
        "Parallel job offers converging",
        "Work-life balance rupturing",
        "Project deadline at risk",
        "Butterfly effect in your GitHub",
        "Tech stack expanding rapidly",
        "Job security unstable",
        "Impostor syndrome increasing",
        "Technical debt threshold reached",
    ]

    // Teasing messages when in Spider-Verse (mix of creative mode and Spider-Verse)
    const teasingMessages = [
        "Miss your boring code editor?",
        "Can't handle the creative mode?",
        "Back to plain HTML?",
        "Too colorful for you?",
        "Leaving so soon?",
        "The design world will miss you",
        "UI/UX says stay a while",
        "Running from creativity?",
        "Afraid of a little design chaos?",
        "The creative dimension chose you",

        "Can't handle the Spider-Verse?",
        "The multiverse will miss you",
        "Spidey says stay a while",
        "Running from adventure?",
        "The Spider-Verse chose you",
        // More creative mode messages
        "One more minute in design land?",
        "Your code is so... plain",
        "But the fun just started!",
        "This portfolio needs you",
        "Creative tourist leaving?",
        "Your design powers just activated",
        "But you look good in creative mode",
        "The web of design is comfy",
        "A good developer would stay longer",
        "UI/UX thinking is addictive",
        // More Spider-Verse messages
        "Your spider-powers just activated",
        "But you look good in comic style",
        "The web of reality is comfy",
        "Spidey would stay longer",
        // More creative mode messages
        "Trading creativity for boring code?",
        "Your frontend potential is just starting",
        "The CSS is still fresh on your page",
        "Animations and transitions suit you",
        "Leaving before the portfolio is seen?",
        "The creative side has cookies",
        "Your developer story just began",
        "Plain code is so last year",
        "The design team will be disappointed",
        "Recruiters would be pleased you're leaving",
        "Tech leads will miss your creative touch",
        "The UX designer was about to offer feedback",
        "The senior dev was going to teach you React tricks",
        "The product manager prepared a feature for you",
        "The QA team found no bugs in your code",
        "With great power comes great... oh nevermind",
    ]

    // Rare Easter egg messages (mix of dev journey and Spider-Verse)
    const easterEggMessages = [
        "Did you know this button was coded at 3 AM?",
        "I've been clicked by 14,000,605 recruiters...",
        "In another company, YOU are the CTO",
        "The real dev journey was the bugs we fixed along the way",
        "This portfolio exists in 616 GitHub repositories simultaneously",
        // Spider-Verse Easter eggs
        "Deadpool says hi from the fourth wall",
        "This dimension smells like fresh ink",
        "Thwip! Just practicing my web sounds",
        // More dev journey Easter eggs
        "The debugger says hi from the console",
        "This codebase smells like fresh coffee",
        "I'm not just a button, I'm a career pivot point",
        "Beep! Just practicing my error sounds",
        "Help! I'm trapped in a coding bootcamp!",
        "Click me three times to unlock job offers... just kidding",
        "Schrödinger's code: this function is both working and not working",
        // More Spider-Verse Easter eggs
        "The multiverse theory states this button is both clicked and not clicked",
        "In one universe, this website won an Oscar",
        "Spider-sense tingling... or maybe that's just static electricity",
        // Final dev journey Easter eggs
        "In one timeline, this website won a Webby Award",
        "Code-sense tingling... or maybe that's just caffeine",
        "If you see this message, you're the developer we're looking for",
    ]

    // Function to get a random message
    const getRandomMessage = () => {
        // 5% chance to show an Easter egg message
        if (Math.random() < 0.05 && easterEggMessages.length > 0) {
            return easterEggMessages[
                Math.floor(Math.random() * easterEggMessages.length)
            ]
        }

        const messages = isSpiderVerse ? teasingMessages : warningMessages
        return messages[Math.floor(Math.random() * messages.length)]
    }

    // No cleanup needed for component mount
    useEffect(() => {
        // Component mount logic can be added here if needed
    }, [])

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
                    const glitchX = Math.random() * 10 - 5
                    const glitchY = Math.random() * 10 - 5
                    const glitchRotate = Math.random() * 8 - 4
                    const glitchScale = 0.92 + Math.random() * 0.16
                    const glitchSkewX = Math.random() * 4 - 2
                    const glitchSkewY = Math.random() * 4 - 2

                    // Add occasional perspective transform for 3D effect
                    const perspective =
                        Math.random() > 0.8
                            ? `perspective(100px) rotateX(${
                                  Math.random() * 10 - 5
                              }deg) rotateY(${Math.random() * 10 - 5}deg)`
                            : ""

                    button.style.transform = `translate(${glitchX}px, ${glitchY}px) rotate(${glitchRotate}deg) scale(${glitchScale}) skew(${glitchSkewX}deg, ${glitchSkewY}deg) ${perspective}`

                    // Enhanced random color shift and glitch effects
                    if (Math.random() > 0.5) {
                        // Increased frequency of color effects
                        const hueRotate = Math.random() * 360
                        const blurAmount =
                            Math.random() > 0.7
                                ? `blur(${Math.random() * 3}px)`
                                : ""
                        const brightness = 0.7 + Math.random() * 0.6
                        const contrast =
                            Math.random() > 0.8
                                ? `contrast(${150 + Math.random() * 100}%)`
                                : ""
                        const invert =
                            Math.random() > 0.9
                                ? `invert(${Math.random() * 30}%)`
                                : ""
                        const saturate =
                            Math.random() > 0.7
                                ? `saturate(${150 + Math.random() * 150}%)`
                                : ""

                        button.style.filter = `hue-rotate(${hueRotate}deg) ${blurAmount} brightness(${brightness}) ${contrast} ${invert} ${saturate}`

                        // Occasionally trigger more intense glitch
                        if (Math.random() > 0.85) {
                            // Increased frequency
                            setIsGlitching(true)
                            setTimeout(
                                () => setIsGlitching(false),
                                200 + Math.random() * 300
                            ) // Variable duration
                        }

                        // Occasionally add a CSS text shadow for glow effect
                        if (Math.random() > 0.8) {
                            const r = Math.floor(Math.random() * 255)
                            const g = Math.floor(Math.random() * 255)
                            const b = Math.floor(Math.random() * 255)
                            button.style.boxShadow = `0 0 8px 2px rgba(${r}, ${g}, ${b}, 0.8)`
                        } else {
                            button.style.boxShadow = ""
                        }
                    } else {
                        button.style.filter = ""
                        button.style.boxShadow = ""
                    }

                    // Occasionally create mini-particles around the button
                    if (Math.random() > 0.92) {
                        const particleContainer = document.createElement("div")
                        particleContainer.className =
                            "absolute inset-0 pointer-events-none"

                        // Create 3-8 particles
                        const particleCount = 3 + Math.floor(Math.random() * 6)
                        for (let i = 0; i < particleCount; i++) {
                            const particle = document.createElement("div")
                            const size = 2 + Math.random() * 6
                            const angle = Math.random() * Math.PI * 2
                            const distance = 30 + Math.random() * 50
                            const duration = 0.5 + Math.random() * 1

                            // Position particle around button
                            const x = Math.cos(angle) * distance
                            const y = Math.sin(angle) * distance

                            // Random color
                            const hue = Math.floor(Math.random() * 360)

                            particle.style.cssText = `
                                position: absolute;
                                width: ${size}px;
                                height: ${size}px;
                                background-color: hsl(${hue}, 100%, 70%);
                                border-radius: 50%;
                                left: 50%;
                                top: 50%;
                                transform: translate(-50%, -50%);
                                animation: particle-float ${duration}s ease-out forwards;
                                opacity: 0.8;
                            `

                            particleContainer.appendChild(particle)

                            // Custom animation for this particle
                            const style = document.createElement("style")
                            style.textContent = `
                                @keyframes particle-float {
                                    0% {
                                        transform: translate(-50%, -50%);
                                        opacity: 0.8;
                                    }
                                    100% {
                                        transform: translate(calc(-50% + ${x}px), calc(-50% + ${y}px));
                                        opacity: 0;
                                    }
                                }
                            `
                            document.head.appendChild(style)

                            // Clean up after animation
                            setTimeout(() => {
                                if (particleContainer.parentNode) {
                                    particleContainer.parentNode.removeChild(
                                        particleContainer
                                    )
                                }
                                document.head.removeChild(style)
                            }, duration * 1000)
                        }

                        button.appendChild(particleContainer)
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
            if (button) {
                button.style.transform = ""
                button.style.filter = ""
                button.style.boxShadow = ""
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
    }, [isHovering, glitchInterval, isSpiderVerse])

    // Function removed: runAway

    // Handle button click
    const handleButtonClick = () => {
        if (isTransitioning) return

        // 5% chance for a fake glitch effect that doesn't actually transition
        if (Math.random() < 0.05) {
            setIsGlitching(true)

            // Show a fake error message
            const fakeErrorMessages = [
                "ERROR: Dimensional coordinates misaligned",
                "ALERT: Quantum fluctuation detected",
                "WARNING: Dimensional breach unstable",
                "SYSTEM ERROR: Multiverse buffer overflow",
                "CRITICAL: Reality matrix corruption",
                "FAILURE: Dimensional anchor points lost",
                "ERROR 616: Spider-Verse connection refused",
            ]

            setCurrentMessage(
                fakeErrorMessages[
                    Math.floor(Math.random() * fakeErrorMessages.length)
                ]
            )
            setShowMessage(true)

            // Create a fake loading effect
            const button = buttonRef.current
            if (button) {
                button.style.opacity = "0.5"
                button.style.transform = "scale(0.95)"

                // Add a pulsing effect
                let pulseCount = 0
                const pulseInterval = setInterval(() => {
                    button.style.transform =
                        pulseCount % 2 === 0 ? "scale(0.95)" : "scale(1.05)"
                    pulseCount++

                    if (pulseCount >= 6) {
                        clearInterval(pulseInterval)

                        // Reset after the fake glitch
                        setTimeout(() => {
                            setIsGlitching(false)
                            button.style.opacity = "1"
                            button.style.transform = ""

                            // Show a recovery message
                            const recoveryMessages = [
                                "Dimensional stabilizers recalibrated",
                                "System recovered. Try again?",
                                "Quantum alignment restored",
                                "Multiverse connection reestablished",
                                "Reality matrix repaired",
                            ]

                            setCurrentMessage(
                                recoveryMessages[
                                    Math.floor(
                                        Math.random() * recoveryMessages.length
                                    )
                                ]
                            )

                            // Hide message after a delay
                            setTimeout(() => {
                                setShowMessage(false)
                            }, 2000)
                        }, 800)
                    }
                }, 150)
            }

            return
        }

        // 25% chance to show a special message before triggering (increased from 19%)
        if (Math.random() < 0.25) {
            const specialMessages = isSpiderVerse
                ? [
                      "Goodbye, Spider-Verse!",
                      "See you in another dimension!",
                      "Reality check time!",
                      "Closing dimensional portal...",
                      "Reverting to standard physics...",
                      "Folding comic panels...",
                      "Saving Spider-Verse progress...",
                      "Dimensional shift initiating...",
                      "Web-slinging license expired",
                      "Multiverse bookmark saved",
                  ]
                : [
                      "Here we go!",
                      "Brace yourself!",
                      "Dimension jump in 3...2...1!",
                      "Spider-Verse protocols activating",
                      "Comic book physics loading...",
                      "Multiverse connection established",
                      "Reality distortion field engaged",
                      "Spidey-sense calibration in progress",
                      "Dimensional anchors releasing",
                      "Web-fluid synthesizing...",
                  ]

            setCurrentMessage(
                specialMessages[
                    Math.floor(Math.random() * specialMessages.length)
                ]
            )
            setShowMessage(true)
            setIsGlitching(true)

            // Create a more dramatic effect before transition
            const button = buttonRef.current
            if (button) {
                // Add a pulsing glow effect
                const r = isSpiderVerse ? 0 : 128
                const g = isSpiderVerse ? 0 : 0
                const b = isSpiderVerse ? 0 : 255
                button.style.boxShadow = `0 0 15px 5px rgba(${r}, ${g}, ${b}, 0.8)`

                // Add a rotation effect
                button.style.transform = "scale(1.2)"

                // Create particles bursting from the button
                const particleCount = 20 + Math.floor(Math.random() * 15)
                for (let i = 0; i < particleCount; i++) {
                    setTimeout(() => {
                        const particle = document.createElement("div")
                        const size = 3 + Math.random() * 8
                        const angle = Math.random() * Math.PI * 2
                        const distance = 50 + Math.random() * 100
                        const duration = 0.8 + Math.random() * 1.2

                        // Position particle
                        const buttonRect = button.getBoundingClientRect()
                        const startX = buttonRect.left + buttonRect.width / 2
                        const startY = buttonRect.top + buttonRect.height / 2

                        // Random color based on dimension
                        const hue = isSpiderVerse
                            ? Math.floor(Math.random() * 60) + 180 // blues/cyans for exiting
                            : Math.floor(Math.random() * 60) + 300 // purples/magentas for entering

                        particle.style.cssText = `
                            position: fixed;
                            width: ${size}px;
                            height: ${size}px;
                            background-color: hsl(${hue}, 100%, 70%);
                            border-radius: 50%;
                            left: ${startX}px;
                            top: ${startY}px;
                            z-index: 9999;
                            pointer-events: none;
                            animation: dimension-particle ${duration}s ease-out forwards;
                        `

                        document.body.appendChild(particle)

                        // Custom animation for this particle
                        const style = document.createElement("style")
                        style.textContent = `
                            @keyframes dimension-particle {
                                0% {
                                    transform: translate(-50%, -50%) scale(0.5);
                                    opacity: 1;
                                }
                                100% {
                                    transform: translate(calc(-50% + ${
                                        Math.cos(angle) * distance
                                    }px), calc(-50% + ${
                            Math.sin(angle) * distance
                        }px)) scale(${0.5 + Math.random()});
                                    opacity: 0;
                                }
                            }
                        `
                        document.head.appendChild(style)

                        // Clean up after animation
                        setTimeout(() => {
                            if (particle.parentNode) {
                                particle.parentNode.removeChild(particle)
                            }
                            document.head.removeChild(style)
                        }, duration * 1000)
                    }, Math.random() * 500) // Stagger particle creation
                }
            }

            // Add a dramatic pause before transition
            setTimeout(() => {
                setIsGlitching(false)
                // Reset click attempts
                clickAttempts.current = 0

                // Reset button styles
                if (button) {
                    button.style.boxShadow = ""
                    button.style.transform = ""
                }

                // Trigger the dimension change
                toggleDimension()
            }, 1200) // Slightly longer pause

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
            if (randomMessageIntervalRef.current) {
                clearInterval(randomMessageIntervalRef.current)
            }
            if (messageIntervalRef.current) {
                clearInterval(messageIntervalRef.current)
            }
            if (glitchInterval) {
                clearInterval(glitchInterval)
            }
        }
    }, [glitchInterval])

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
                    className={`fixed z-40 bottom-36 right-6 bg-white border-2 border-black rounded-xl p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm max-w-[200px] whitespace-normal ${
                        isSpiderVerse ? "comic-text" : ""
                    }`}
                    data-text={currentMessage}
                    style={{
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
                aria-label={
                    isSpiderVerse
                        ? "Exit Spider-Verse Mode"
                        : "Enter Spider-Verse Mode"
                }
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
                    bottom: "6rem",
                    right: "1.5rem",
                    transition: "transform 0.3s ease, filter 0.3s ease",
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
                
                @keyframes dimension-glitch-anim {
                    0% { transform: translate(0, 0) scale(1); }
                    10% { transform: translate(-5px, 3px) scale(1.05) skew(2deg, 0deg); }
                    20% { transform: translate(5px, 0) scale(0.95) skew(0deg, 2deg); }
                    30% { transform: translate(0, -3px) scale(1.02) skew(-2deg, 0deg); }
                    40% { transform: translate(3px, 3px) scale(0.98) skew(0deg, -2deg); }
                    50% { transform: translate(-3px, -3px) scale(1.05) skew(2deg, 2deg); }
                    60% { transform: translate(0, 5px) scale(0.95) skew(-2deg, -2deg); }
                    70% { transform: translate(-5px, 0) scale(1.02) skew(0deg, 2deg); }
                    80% { transform: translate(5px, -5px) scale(0.98) skew(-2deg, 0deg); }
                    90% { transform: translate(3px, 3px) scale(1.05) skew(2deg, -2deg); }
                    100% { transform: translate(0, 0) scale(1); }
                }
                
                @keyframes spin-slow {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes float-particle {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    25% { transform: translate(-10px, -15px) rotate(90deg); }
                    50% { transform: translate(10px, 15px) rotate(180deg); }
                    75% { transform: translate(15px, -10px) rotate(270deg); }
                    100% { transform: translate(0, 0) rotate(360deg); }
                }
                
                @keyframes warning-pulse {
                    0% { color: #ff3d00; text-shadow: 0 0 5px rgba(255, 61, 0, 0.7); }
                    50% { color: #ff9100; text-shadow: 0 0 15px rgba(255, 145, 0, 0.9); }
                    100% { color: #ff3d00; text-shadow: 0 0 5px rgba(255, 61, 0, 0.7); }
                }
                
                @keyframes dimension-flicker {
                    0% { opacity: 1; }
                    25% { opacity: 0.9; }
                    50% { opacity: 1; }
                    75% { opacity: 0.8; }
                    100% { opacity: 1; }
                }
                
                @keyframes glow-pulse {
                    0% { box-shadow: 0 0 5px 2px rgba(128, 0, 255, 0.5); }
                    50% { box-shadow: 0 0 15px 5px rgba(128, 0, 255, 0.8); }
                    100% { box-shadow: 0 0 5px 2px rgba(128, 0, 255, 0.5); }
                }
            `}</style>
        </>
    )
}

export default DimensionTrigger
