import React, { useEffect, useState, useRef } from "react"
import { useDimension } from "../context/DimensionContext"

const DimensionTransition = () => {
    const { isTransitioning, isSpiderVerse } = useDimension()
    const [message, setMessage] = useState("")
    const [transitionPhase, setTransitionPhase] = useState(0) // 0-3: different phases of transition
    const [particles, setParticles] = useState([])
    const containerRef = useRef(null)

    // Enhanced messages for dimension transition (mix of creative mode and Spider-Verse)
    const enteringMessages = [
        "DIMENSIONAL INTERFERENCE DETECTED",
        "ENTERING SPIDER-VERSE...",
        "REALITY SHIFTING...",
        "MULTIVERSE BREACH IMMINENT",
        "SPIDER-SENSE TINGLING...",
        "COMIC BOOK PHYSICS ACTIVATED",
        "RECALIBRATING PERCEPTION...",
        "ADJUSTING VISUAL PARAMETERS...",
        "DIMENSIONAL COORDINATES LOCKED",
        "INITIATING COMIC BOOK PROTOCOLS",
        // Developer journey messages
        "CREATIVE MODE INTERFERENCE DETECTED",
        "ENTERING DESIGN SPACE...",
        "DEVELOPER MINDSET SHIFTING...",
        "UI/UX BREACH IMMINENT",
        "DESIGN-SENSE TINGLING...",
        "CREATIVE PHYSICS ACTIVATED",
        "PORTFOLIO COORDINATES LOCKED",
        "INITIATING DESIGN PROTOCOLS",
        // Mix of both themes
        "DEVELOPER SIGNATURE VERIFIED",
        "CREATIVE MODE ACCESS GRANTED",
        "DESIGN DISTORTION FIELD ACTIVE",
        "CSS ANIMATIONS LOADING...",
        "QUANTUM SIGNATURE VERIFIED",
        "SPIDER-VERSE ACCESS GRANTED",
        "REALITY DISTORTION FIELD ACTIVE",
        "COMIC BOOK SHADERS LOADING...",
        "FRONTEND TRANSLATION ENGAGED",
        "PORTFOLIO ANCHOR POINTS SECURED",
        "UI/UX PHYSICS CALIBRATING",
        "ANIMATION GENERATOR ONLINE",
        "MULTIVERSAL TRANSLATION ENGAGED",
        "DIMENSIONAL ANCHOR POINTS SECURED",
        "SPIDER-VERSE PHYSICS CALIBRATING",
        "ONOMATOPOEIA GENERATOR ONLINE",
        "COMPONENT HIERARCHY INITIATED",
        "GRID BORDERS MATERIALIZING",
        "DESIGN SYSTEM SYNTHESIZING",
        "PORTFOLIO GATEWAY OPENING",
    ]

    const exitingMessages = [
        "RETURNING TO PRIME DIMENSION",
        "REALITY STABILIZING...",
        "CLOSING DIMENSIONAL RIFT",
        "MULTIVERSE BREACH CONTAINED",
        "RESTORING NORMAL PHYSICS...",
        "SPIDER-SENSE FADING",
        "REVERTING VISUAL PARAMETERS...",
        "DIMENSIONAL SHIFT REVERSING",
        "COMIC BOOK PHYSICS DEACTIVATING",
        "NORMAL REALITY PROTOCOLS ENGAGED",
        // Developer journey messages
        "RETURNING TO DEVELOPER MODE",
        "CODE STABILIZING...",
        "CLOSING DESIGN RIFT",
        "UI/UX BREACH CONTAINED",
        "RESTORING LOGICAL THINKING...",
        "DESIGN-SENSE FADING",
        "CREATIVE SHIFT REVERSING",
        "DESIGN PHYSICS DEACTIVATING",
        "NORMAL CODING PROTOCOLS ENGAGED",
        // Mix of both themes
        "PORTFOLIO BOOKMARK SAVED",
        "CSS ANIMATIONS UNLOADING",
        "CODE ANCHOR REESTABLISHING",
        "PORTFOLIO COORDINATES RESETTING",
        "SPIDER-VERSE BOOKMARK SAVED",
        "COMIC BOOK SHADERS UNLOADING",
        "REALITY ANCHOR REESTABLISHING",
        "DIMENSIONAL COORDINATES RESETTING",
        "FRONTEND LINK DISCONNECTING",
        "LOGICAL THINKING RESTORING",
        "COMPONENT SYSTEM SHUTTING DOWN",
        "GRID BORDERS DISSOLVING",
        "MULTIVERSAL LINK DISCONNECTING",
        "NORMAL PHYSICS RESTORING",
        "SPEECH BUBBLE SYSTEM SHUTTING DOWN",
        "PANEL BORDERS DISSOLVING",
        "DESIGN SYSTEM DEACTIVATING",
        "ANIMATION GENERATOR OFFLINE",
        "PORTFOLIO GATEWAY CLOSING",
        "PRIME DEVELOPER MODE REENGAGING",
    ]

    // Easter egg messages that rarely appear during transition (mix of both themes)
    const easterEggMessages = [
        "SPIDER-PIG SAYS HELLO",
        "DEADPOOL BROKE THE FOURTH WALL AGAIN",
        "STAN LEE CAMEO DETECTED",
        "WITH GREAT POWER COMES GREAT WEBSITE DESIGN",
        "THWIP! THWIP! JUST TESTING THE WEB SHOOTERS",
        "MILES MORALES APPROVES THIS TRANSITION",
        "SPIDER-GWEN SAYS YOUR CSS IS ON POINT",
        "PETER PARKER TOOK THIS PHOTO",
        "DOCTOR STRANGE MONITORING THIS DIMENSIONAL SHIFT",
        "MULTIVERSAL TOURISM BOARD THANKS YOU",
        "SPIDER-MAN 2099 SAYS THIS TECH IS PRIMITIVE",
        "VENOM THINKS THIS TRANSITION LOOKS DELICIOUS",
        "THE WATCHER OBSERVES YOUR BROWSING HABITS",
        // Developer journey Easter eggs
        "STACKOVERFLOW OVERFLOW DETECTED",
        "GITHUB COPILOT BROKE THE FOURTH WALL",
        "SENIOR DEV CAMEO DETECTED",
        "WITH GREAT CODE COMES GREAT DOCUMENTATION",
        "CLICK! CLICK! JUST TESTING THE KEYBOARD",
        "JOB APPLICATION #616 VALIDATED",
        "TECH LEAD APPROVES THIS TRANSITION",
        "DESIGN TEAM SAYS YOUR CSS IS ON POINT",
        "PORTFOLIO SCREENSHOT CAPTURED",
        "HIRING MANAGER MONITORING THIS CAREER SHIFT",
        "RECRUITMENT BOARD THANKS YOU",
        "FUTURE DEVELOPER SAYS THIS TECH IS PRIMITIVE",
        "RECRUITER THINKS THIS PORTFOLIO LOOKS IMPRESSIVE",
        "THE INTERVIEWER OBSERVES YOUR CODING HABITS",
        "MYSTERIO: 'IS THIS REAL CODE OR JUST ILLUSION?'",
    ]

    // Generate comic book style particles
    useEffect(() => {
        if (!isTransitioning) return

        const generateParticles = () => {
            const newParticles = []
            const count = Math.min(Math.floor(window.innerWidth / 40), 50) // Responsive particle count

            for (let i = 0; i < count; i++) {
                // Random properties
                const size = 10 + Math.random() * 40
                const x = Math.random() * 100
                const y = Math.random() * 100
                const duration = 2 + Math.random() * 4
                const delay = Math.random() * 2

                // Random color
                const colors = [
                    "spiderverse-red",
                    "spiderverse-blue",
                    "spiderverse-yellow",
                    "spiderverse-purple",
                    "spiderverse-cyan",
                    "spiderverse-green",
                ]
                const color = colors[Math.floor(Math.random() * colors.length)]

                // Random shape - enhanced with developer and Spider-Verse themed shapes
                const shapes = [
                    "circle",
                    "square",
                    "triangle",
                    "star",
                    "hexagon",
                    "diamond",
                    "web",
                    "speech-bubble",
                    "exclamation",
                    "question",
                    "code-bracket",
                    "curly-brace",
                ]
                const shape = shapes[Math.floor(Math.random() * shapes.length)]

                // Random movement pattern
                const movements = ["float", "zigzag", "spiral", "pulse"]
                const movement =
                    movements[Math.floor(Math.random() * movements.length)]

                // Random text for speech bubbles (code-related terms)
                const bubbleTexts = [
                    "</>",
                    "{ }",
                    "404",
                    "CSS",
                    "JS",
                    "API",
                    "Bug",
                    "Fix",
                ]
                const bubbleText =
                    bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)]

                // Random opacity
                const opacity = 0.3 + Math.random() * 0.7

                newParticles.push({
                    id: i,
                    size,
                    x,
                    y,
                    color,
                    shape,
                    opacity,
                    duration,
                    delay,
                    movement,
                    bubbleText: shape === "speech-bubble" ? bubbleText : "",
                    rotation: Math.random() * 360, // Random initial rotation
                    scale: 0.8 + Math.random() * 0.4, // Random scale variation
                })
            }

            setParticles(newParticles)
        }

        generateParticles()

        // Regenerate particles periodically
        const interval = setInterval(generateParticles, 3000)

        return () => clearInterval(interval)
    }, [isTransitioning])

    // Change messages and transition phases
    useEffect(() => {
        if (isTransitioning) {
            // Select base messages based on transition direction
            const baseMessages = isSpiderVerse
                ? exitingMessages
                : enteringMessages

            // Create a combined message array with a chance for Easter eggs
            const messages = [...baseMessages]

            // Add 2-3 random Easter egg messages at random positions
            const easterEggCount = 2 + Math.floor(Math.random() * 2) // 2 or 3
            for (let i = 0; i < easterEggCount; i++) {
                // Get random Easter egg message
                const randomEasterEgg =
                    easterEggMessages[
                        Math.floor(Math.random() * easterEggMessages.length)
                    ]

                // Insert at random position (but not at the very beginning)
                const insertPosition =
                    1 + Math.floor(Math.random() * (messages.length - 1))
                messages.splice(insertPosition, 0, randomEasterEgg)
            }

            let messageIndex = 0
            setTransitionPhase(0)

            // Display first message immediately
            setMessage(messages[messageIndex])

            // Change message every 400ms (slightly faster)
            const messageInterval = setInterval(() => {
                messageIndex = (messageIndex + 1) % messages.length
                setMessage(messages[messageIndex])
            }, 400)

            // Progress through transition phases
            const phaseInterval = setInterval(() => {
                setTransitionPhase((prev) => {
                    const next = prev + 1
                    return next > 3 ? 3 : next // Max 3 phases
                })
            }, 1000) // Change phase every second

            return () => {
                clearInterval(messageInterval)
                clearInterval(phaseInterval)
            }
        } else {
            setMessage("")
            setTransitionPhase(0)
        }
    }, [isTransitioning, isSpiderVerse])

    // Render particle based on shape
    const renderParticle = (particle) => {
        const baseClasses = `absolute bg-${particle.color} opacity-${Math.floor(
            particle.opacity * 10
        )}`

        // Determine animation based on movement type
        let movementAnimation = `float-particle ${particle.duration}s ease-in-out infinite ${particle.delay}s`
        if (particle.movement === "zigzag") {
            movementAnimation = `zigzag-particle ${particle.duration}s ease-in-out infinite ${particle.delay}s`
        } else if (particle.movement === "spiral") {
            movementAnimation = `spiral-particle ${particle.duration}s linear infinite ${particle.delay}s`
        } else if (particle.movement === "pulse") {
            movementAnimation = `float-particle ${particle.duration}s ease-in-out infinite ${particle.delay}s, pulse-slow 2s ease-in-out infinite`
        }

        switch (particle.shape) {
            case "circle":
                return (
                    <div
                        className={`${baseClasses} rounded-full`}
                        style={{
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animation: movementAnimation,
                            transform: `scale(${particle.scale})`,
                        }}
                    />
                )
            case "square":
                return (
                    <div
                        className={`${baseClasses} transform rotate-45`}
                        style={{
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animation: `${movementAnimation}, rotate-slow 10s linear infinite`,
                            transform: `scale(${particle.scale}) rotate(${particle.rotation}deg)`,
                        }}
                    />
                )
            case "triangle":
                return (
                    <div
                        className={`${baseClasses} clip-triangle`}
                        style={{
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animation: `${movementAnimation}, rotate-slow 15s linear infinite`,
                            transform: `scale(${particle.scale}) rotate(${particle.rotation}deg)`,
                        }}
                    />
                )
            case "star":
                return (
                    <div
                        className={`${baseClasses} clip-star`}
                        style={{
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animation: `${movementAnimation}, pulse-slow 3s ease-in-out infinite`,
                            transform: `scale(${particle.scale}) rotate(${particle.rotation}deg)`,
                        }}
                    />
                )
            case "hexagon":
                return (
                    <div
                        className={`${baseClasses} clip-hexagon`}
                        style={{
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animation: `${movementAnimation}, rotate-slow 12s linear infinite`,
                            transform: `scale(${particle.scale}) rotate(${particle.rotation}deg)`,
                        }}
                    />
                )
            case "diamond":
                return (
                    <div
                        className={`${baseClasses}`}
                        style={{
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            clipPath:
                                "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                            animation: `${movementAnimation}, rotate-slow 8s linear infinite`,
                            transform: `scale(${particle.scale}) rotate(${particle.rotation}deg)`,
                        }}
                    />
                )
            case "web":
                return (
                    <div
                        className={`absolute opacity-${Math.floor(
                            particle.opacity * 10
                        )}`}
                        style={{
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2L2 12L12 22L22 12L12 2Z' stroke='white' stroke-width='1'/%3E%3Cpath d='M12 2V22M2 12H22M4 8L20 16M4 16L20 8' stroke='white' stroke-width='1'/%3E%3C/svg%3E\")",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            animation: `${movementAnimation}, rotate-slow 20s linear infinite`,
                            transform: `scale(${particle.scale}) rotate(${particle.rotation}deg)`,
                        }}
                    />
                )
            case "speech-bubble":
                return (
                    <div
                        className={`absolute flex items-center justify-center text-xs font-bold opacity-${Math.floor(
                            particle.opacity * 10
                        )}`}
                        style={{
                            width: `${particle.size * 1.5}px`,
                            height: `${particle.size}px`,
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            backgroundColor: `var(--${particle.color})`,
                            borderRadius: "50%",
                            animation: movementAnimation,
                            transform: `scale(${particle.scale})`,
                            color: "black",
                        }}
                    >
                        {particle.bubbleText}
                    </div>
                )
            case "code-bracket":
                return (
                    <div
                        className={`absolute opacity-${Math.floor(
                            particle.opacity * 10
                        )} text-${particle.color} font-mono font-bold`}
                        style={{
                            fontSize: `${particle.size * 0.8}px`,
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animation: `${movementAnimation}, rotate-slow 5s linear infinite`,
                            transform: `scale(${particle.scale}) rotate(${particle.rotation}deg)`,
                        }}
                    >
                        {"</>"}
                    </div>
                )
            case "curly-brace":
                return (
                    <div
                        className={`absolute opacity-${Math.floor(
                            particle.opacity * 10
                        )} text-${particle.color} font-mono font-bold`}
                        style={{
                            fontSize: `${particle.size * 0.8}px`,
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animation: `${movementAnimation}, rotate-slow 5s linear infinite`,
                            transform: `scale(${particle.scale}) rotate(${particle.rotation}deg)`,
                        }}
                    >
                        {"{  }"}
                    </div>
                )
            case "exclamation":
                return (
                    <div
                        className={`absolute opacity-${Math.floor(
                            particle.opacity * 10
                        )} text-${particle.color} font-bold`}
                        style={{
                            fontSize: `${particle.size * 0.8}px`,
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animation: `${movementAnimation}, pulse-slow 2s ease-in-out infinite`,
                            transform: `scale(${particle.scale})`,
                        }}
                    >
                        !
                    </div>
                )
            case "question":
                return (
                    <div
                        className={`absolute opacity-${Math.floor(
                            particle.opacity * 10
                        )} text-${particle.color} font-bold`}
                        style={{
                            fontSize: `${particle.size * 0.8}px`,
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animation: `${movementAnimation}, pulse-slow 2s ease-in-out infinite`,
                            transform: `scale(${particle.scale})`,
                        }}
                    >
                        ?
                    </div>
                )
            default:
                return null
        }
    }

    if (!isTransitioning) return null

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        >
            {/* Dynamic background based on transition phase */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-black to-spiderverse-dark z-0"
                style={{
                    opacity: 0.8 + transitionPhase * 0.05,
                    animation: "dimension-flicker 0.3s linear infinite",
                }}
            ></div>

            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden z-5">
                {particles.map((particle) => renderParticle(particle))}
            </div>

            {/* Spider webs in corners with animation */}
            <div className="spider-web spider-web-corner absolute top-0 left-0 transform rotate-0 opacity-40 animate-pulse-slow"></div>
            <div
                className="spider-web spider-web-corner absolute top-0 right-0 transform rotate-90 opacity-40 animate-pulse-slow"
                style={{ animationDelay: "0.5s" }}
            ></div>
            <div
                className="spider-web spider-web-corner absolute bottom-0 left-0 transform -rotate-90 opacity-40 animate-pulse-slow"
                style={{ animationDelay: "1s" }}
            ></div>
            <div
                className="spider-web spider-web-corner absolute bottom-0 right-0 transform rotate-180 opacity-40 animate-pulse-slow"
                style={{ animationDelay: "1.5s" }}
            ></div>

            {/* Enhanced glitch lines with varying properties */}
            <div className="absolute inset-0 overflow-hidden z-10">
                {Array.from({ length: 30 }).map((_, i) => {
                    const height = 1 + Math.random() * 5
                    const top = Math.random() * 100
                    const animDuration = 0.3 + Math.random() * 1.2
                    const delay = Math.random() * 2
                    const opacity = 0.5 + Math.random() * 0.5

                    return (
                        <div
                            key={i}
                            className="absolute bg-white w-full"
                            style={{
                                top: `${top}%`,
                                left: 0,
                                height: `${height}px`,
                                opacity,
                                transform: `translateY(${
                                    Math.random() * 20 - 10
                                }px) scaleX(${0.8 + Math.random() * 0.4})`,
                                animation: `glitch-line ${animDuration}s infinite alternate ${delay}s`,
                                filter: `blur(${
                                    Math.random() > 0.7 ? "1px" : "0"
                                })`,
                            }}
                        ></div>
                    )
                })}
            </div>

            {/* Enhanced color distortion overlays with animation */}
            <div
                className="absolute inset-0 bg-spiderverse-red mix-blend-screen z-10"
                style={{
                    opacity: 0.2 + transitionPhase * 0.05,
                    transform: "translateX(-8px)",
                    animation: "dimension-flicker 0.8s linear infinite",
                }}
            ></div>
            <div
                className="absolute inset-0 bg-spiderverse-blue mix-blend-screen z-10"
                style={{
                    opacity: 0.2 + transitionPhase * 0.05,
                    transform: "translateX(8px)",
                    animation: "dimension-flicker 0.7s linear infinite 0.2s",
                }}
            ></div>
            <div
                className="absolute inset-0 bg-spiderverse-cyan mix-blend-difference z-10"
                style={{
                    opacity: 0.1 + transitionPhase * 0.03,
                    transform: "translateY(5px)",
                    animation: "dimension-flicker 0.9s linear infinite 0.1s",
                }}
            ></div>

            {/* Dynamic comic book action words */}
            <div className="action-word absolute top-[15%] left-[10%] opacity-60 text-spiderverse-yellow">
                WHOOSH!
            </div>
            <div className="action-word absolute bottom-[20%] right-[15%] opacity-60 text-spiderverse-red">
                CRACK!
            </div>
            <div className="action-word absolute top-[30%] right-[20%] opacity-60 text-spiderverse-blue">
                ZAP!
            </div>
            <div className="action-word absolute bottom-[30%] left-[15%] opacity-60 text-spiderverse-purple">
                BOOM!
            </div>

            {/* Central portal effect with enhanced animation */}
            <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full portal-open z-15"
                style={{
                    width: `${400 + transitionPhase * 100}px`,
                    height: `${400 + transitionPhase * 100}px`,
                    background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 70%)`,
                    boxShadow: `0 0 100px 20px rgba(255,255,255,0.2), 
                                inset 0 0 60px 20px rgba(255,255,255,0.1)`,
                    border: "8px solid rgba(255,255,255,0.2)",
                    animation: "portal-pulse 2s ease-in-out infinite",
                }}
            >
                {/* Inner portal rings */}
                <div className="absolute inset-0 rounded-full border-4 border-white opacity-20 animate-spin-slow"></div>
                <div className="absolute inset-[15%] rounded-full border-4 border-spiderverse-blue opacity-30 animate-spin-slow-reverse"></div>
                <div className="absolute inset-[30%] rounded-full border-4 border-spiderverse-red opacity-20 animate-spin-slow"></div>
                <div className="absolute inset-[45%] rounded-full border-4 border-white opacity-30 animate-spin-slow-reverse"></div>
                <div className="absolute inset-[60%] rounded-full border-4 border-spiderverse-purple opacity-20 animate-spin-slow"></div>
                <div className="absolute inset-[75%] rounded-full border-4 border-spiderverse-yellow opacity-30 animate-spin-slow-reverse"></div>
            </div>

            {/* Warning message with enhanced styling */}
            <div className="relative z-20 text-center p-8 max-w-3xl">
                <div
                    className="dimension-glitch text-white text-5xl md:text-7xl font-bold mb-8 font-['Bangers'] tracking-wider"
                    data-text={message}
                    style={{
                        textShadow: `0 0 10px #fff, 
                                    0 0 20px ${
                                        isSpiderVerse ? "#304ffe" : "#ff1744"
                                    }, 
                                    0 0 30px ${
                                        isSpiderVerse ? "#304ffe" : "#ff1744"
                                    }`,
                    }}
                >
                    {message}
                </div>

                <div className="text-white text-2xl animate-pulse font-['Comic_Neue'] mb-6">
                    {isSpiderVerse
                        ? `Closing dimensional portal... ${Math.min(
                              transitionPhase * 33,
                              99
                          )}%`
                        : `Opening dimensional portal... ${Math.min(
                              transitionPhase * 33,
                              99
                          )}%`}
                </div>

                {/* Enhanced Spider-Man style divider */}
                <div className="spidey-divider my-8 relative">
                    <div className="absolute inset-0 animate-pulse-slow opacity-50"></div>
                </div>

                {/* Enhanced warning text */}
                <div
                    className="warning-text text-xl mt-6 font-bold"
                    style={{
                        animation:
                            "warning-pulse 0.5s ease-in-out infinite alternate",
                    }}
                >
                    {isSpiderVerse
                        ? "CAUTION: RETURNING TO NORMAL DIMENSION"
                        : "WARNING: ENTERING SPIDER-VERSE DIMENSION"}
                </div>

                {/* Additional warning details */}
                <div className="text-white text-sm mt-4 max-w-md mx-auto opacity-80 font-mono">
                    {isSpiderVerse ? (
                        <div className="grid grid-cols-2 gap-2 text-left">
                            <div>Reality Status:</div>
                            <div className="text-green-400">Stabilizing</div>
                            <div>Physics Engine:</div>
                            <div className="text-yellow-400">Normalizing</div>
                            <div>Visual Filters:</div>
                            <div className="text-red-400">Deactivating</div>
                            <div>Dimension Lock:</div>
                            <div className="text-blue-400">Disengaging</div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-2 text-left">
                            <div>Reality Status:</div>
                            <div className="text-red-400">Destabilizing</div>
                            <div>Physics Engine:</div>
                            <div className="text-yellow-400">Recalibrating</div>
                            <div>Visual Filters:</div>
                            <div className="text-green-400">Activating</div>
                            <div>Dimension Lock:</div>
                            <div className="text-blue-400">Engaging</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add custom animations */}
            <style>{`
                @keyframes float-particle {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    25% { transform: translate(-20px, -15px) rotate(5deg); }
                    50% { transform: translate(20px, 15px) rotate(-5deg); }
                    75% { transform: translate(15px, -20px) rotate(10deg); }
                    100% { transform: translate(0, 0) rotate(0deg); }
                }
                
                @keyframes rotate-slow {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes spin-slow {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes spin-slow-reverse {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(-360deg); }
                }
                
                @keyframes pulse-slow {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.8; }
                    100% { transform: scale(1); opacity: 1; }
                }
                
                @keyframes portal-pulse {
                    0% { transform: translate(-50%, -50%) scale(1); }
                    50% { transform: translate(-50%, -50%) scale(1.05); }
                    100% { transform: translate(-50%, -50%) scale(1); }
                }
                
                .clip-triangle {
                    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
                }
                
                .clip-star {
                    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
                }
            `}</style>
        </div>
    )
}

export default DimensionTransition
