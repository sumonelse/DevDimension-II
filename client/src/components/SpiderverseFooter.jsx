import React, { useEffect, useState } from "react"
import { useDimension } from "../context/DimensionContext"
import personalInfo from "../utils/personalInfo"

const SpiderverseFooter = () => {
    const currentYear = new Date().getFullYear()
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [clickCount, setClickCount] = useState(0)
    const { triggerPostCredit, multiverseAwareness } = useDimension()
    const [showInitialAnimation, setShowInitialAnimation] = useState(false)

    // State for click animation
    const [showClickEffect, setShowClickEffect] = useState(false)
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })

    // Enhanced secret click handler with visual feedback
    const handleSecretClick = (e) => {
        // Only allow triggering if multiverse awareness is high enough
        if (multiverseAwareness < 3) return

        // Get click position for the effect
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setClickPosition({ x, y })

        // Show click effect
        setShowClickEffect(true)
        setTimeout(() => setShowClickEffect(false), 700)

        setClickCount((prev) => {
            const newCount = prev + 1

            // After 3 clicks, trigger the post-credit scene
            if (newCount >= 3) {
                // Add a dramatic pause before triggering
                setTimeout(() => {
                    // Play special sound
                    if (window.spiderverseAudio) {
                        window.spiderverseAudio.playWebShoot()
                    }

                    // Visual feedback - screen flash
                    const flash = document.createElement("div")
                    flash.style.position = "fixed"
                    flash.style.inset = "0"
                    flash.style.backgroundColor = "rgba(255, 255, 255, 0.3)"
                    flash.style.zIndex = "9999"
                    flash.style.pointerEvents = "none"
                    document.body.appendChild(flash)

                    // Fade out the flash
                    setTimeout(() => {
                        flash.style.transition = "opacity 0.5s ease-out"
                        flash.style.opacity = "0"
                        setTimeout(() => {
                            document.body.removeChild(flash)
                            // Trigger post-credit scene
                            triggerPostCredit()
                            // Reset click count
                            setClickCount(0)
                        }, 500)
                    }, 100)
                }, 300)
            } else if (newCount > 0) {
                // Give enhanced feedback on each click
                if (window.spiderverseAudio) {
                    window.spiderverseAudio.playClick()
                }
            }

            return newCount
        })
    }

    // Track mouse position for parallax effects
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    // Initial animation to draw attention to the clickable text
    useEffect(() => {
        if (multiverseAwareness >= 3) {
            // Delay to ensure the footer is visible
            const timer = setTimeout(() => {
                setShowInitialAnimation(true)

                // Play a subtle sound
                if (window.spiderverseAudio) {
                    window.spiderverseAudio.playHover()
                }

                // Hide after a few seconds
                setTimeout(() => {
                    setShowInitialAnimation(false)
                }, 3000)
            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [multiverseAwareness])

    // Calculate parallax transform based on mouse position
    const getParallaxStyle = (depth) => {
        const x = (mousePosition.x / window.innerWidth - 0.5) * depth
        const y = (mousePosition.y / window.innerHeight - 0.5) * depth
        return {
            transform: `translate(${x}px, ${y}px)`,
        }
    }

    return (
        <footer className="py-12 relative overflow-hidden">
            {/* Spider-Verse style background with multiverse effect */}
            <div className="absolute inset-0 bg-spiderverse-darker z-0">
                <div className="halftone-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-spiderverse-blue/20 via-transparent to-spiderverse-red/20"></div>

                {/* Animated web patterns */}
                <div className="absolute inset-0 opacity-10">
                    <svg
                        width="100%"
                        height="100%"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <pattern
                            id="web-pattern"
                            width="50"
                            height="50"
                            patternUnits="userSpaceOnUse"
                            patternTransform="rotate(45)"
                        >
                            <line
                                x1="0"
                                y1="0"
                                x2="50"
                                y2="50"
                                stroke="white"
                                strokeWidth="0.5"
                            />
                            <line
                                x1="50"
                                y1="0"
                                x2="0"
                                y2="50"
                                stroke="white"
                                strokeWidth="0.5"
                            />
                        </pattern>
                        <rect
                            width="100%"
                            height="100%"
                            fill="url(#web-pattern)"
                        />
                    </svg>
                </div>
            </div>

            {/* Multiverse portal effects */}
            <div
                className="absolute top-0 left-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-spiderverse-purple/30 to-spiderverse-pink/30 blur-xl animate-portal-pulse"
                style={getParallaxStyle(20)}
            ></div>
            <div
                className="absolute bottom-0 right-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-spiderverse-blue/30 to-spiderverse-cyan/30 blur-xl animate-portal-pulse"
                style={{ animationDelay: "1s", ...getParallaxStyle(15) }}
            ></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Comic book style footer content */}
                    <div className="text-center">
                        {/* Glitched dialogue box */}
                        <div className="dialogue-box bg-white inline-block mb-8 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-spiderverse-red/10 to-spiderverse-blue/10"></div>
                            <h2 className="comic-title text-3xl text-black relative z-10">
                                <span>
                                    Thanks for{" "}
                                    <span
                                        className="text-spiderverse-red inline-block"
                                        style={{
                                            textShadow:
                                                "1px 1px 0 rgba(0,0,0,0.3)",
                                        }}
                                    >
                                        Visiting!
                                    </span>
                                </span>
                            </h2>

                            {/* Glitch effect lines */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-spiderverse-red opacity-70"></div>
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-spiderverse-blue opacity-70"></div>
                        </div>

                        {/* Navigation links with enhanced comic styling */}
                        <div className="flex flex-wrap justify-center gap-4 mb-10">
                            {[
                                "Home",
                                "About",
                                "Skills",
                                "Projects",
                                "Contact",
                            ].map((item, index) => (
                                <a
                                    key={index}
                                    href={`#${item.toLowerCase()}`}
                                    className={`spiderverse-button text-sm py-2 px-4 relative overflow-hidden ${
                                        index % 2 === 0
                                            ? "bg-spiderverse-red text-white"
                                            : "bg-spiderverse-blue text-white"
                                    }`}
                                    style={{
                                        transform: `rotate(${
                                            index % 2 === 0 ? "-1deg" : "1deg"
                                        })`,
                                    }}
                                >
                                    {/* Comic book dots overlay */}
                                    <span className="absolute inset-0 benday-dots opacity-10"></span>
                                    <span className="relative z-10">
                                        {item}
                                    </span>
                                </a>
                            ))}
                        </div>

                        {/* Social links with enhanced comic styling */}
                        <div className="flex justify-center space-x-6 mb-8">
                            <a
                                href={personalInfo.social.github.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="comic-border bg-white p-3 rounded-full transform hover:rotate-12 transition-transform duration-300 relative group"
                            >
                                {/* Spider-sense animation on hover */}
                                <div className="absolute inset-0 rounded-full bg-spiderverse-yellow/0 group-hover:bg-spiderverse-yellow/10 group-hover:animate-spider-sense"></div>
                                <svg
                                    className="w-6 h-6 text-black group-hover:text-spiderverse-red transition-colors duration-300"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                            <a
                                href={personalInfo.social.linkedin.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="comic-border bg-white p-3 rounded-full transform hover:-rotate-12 transition-transform duration-300 relative group"
                            >
                                <div className="absolute inset-0 rounded-full bg-spiderverse-blue/0 group-hover:bg-spiderverse-blue/10 group-hover:animate-spider-sense"></div>
                                <svg
                                    className="w-6 h-6 text-black group-hover:text-spiderverse-blue transition-colors duration-300"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            <a
                                href={personalInfo.social.twitter.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="comic-border bg-white p-3 rounded-full transform hover:rotate-12 transition-transform duration-300 relative group"
                            >
                                <div className="absolute inset-0 rounded-full bg-spiderverse-cyan/0 group-hover:bg-spiderverse-cyan/10 group-hover:animate-spider-sense"></div>
                                <svg
                                    className="w-6 h-6 text-black group-hover:text-spiderverse-cyan transition-colors duration-300"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                        </div>

                        {/* Copyright with enhanced comic styling */}
                        <div className="thought-bubble inline-block relative">
                            {/* Comic book dots overlay */}
                            <div className="absolute inset-0 benday-dots opacity-5"></div>

                            <p className="text-black text-sm font-bold relative z-10">
                                © {currentYear} Sumit Maurya. All rights
                                reserved.
                            </p>
                            <p className="text-black text-xs mt-2 relative z-10">
                                Built with React, Tailwind CSS &
                                <span
                                    onClick={handleSecretClick}
                                    className={`bg-gradient-to-r from-spiderverse-red via-spiderverse-blue to-spiderverse-purple bg-clip-text text-transparent font-bold animate-color-cycle ml-1 cursor-pointer hover:underline relative group ${
                                        multiverseAwareness >= 3
                                            ? "hover:scale-110 transform transition-transform duration-300"
                                            : ""
                                    }`}
                                    title={
                                        multiverseAwareness >= 3
                                            ? "Click for a post-credit scene"
                                            : ""
                                    }
                                    aria-label={
                                        multiverseAwareness >= 3
                                            ? "Click for a post-credit scene. Currently needs " +
                                              (3 - (clickCount % 3)) +
                                              " more clicks"
                                            : "Spider-Verse Inspiration"
                                    }
                                >
                                    Spider-Verse Inspiration
                                    {/* Initial attention animation */}
                                    {showInitialAnimation &&
                                        multiverseAwareness >= 3 && (
                                            <span className="absolute inset-0 rounded-lg border-2 border-spiderverse-yellow animate-pulse-slow"></span>
                                        )}
                                    {/* Click effect animation */}
                                    {showClickEffect && (
                                        <span
                                            className="absolute pointer-events-none"
                                            style={{
                                                left: `${clickPosition.x}px`,
                                                top: `${clickPosition.y}px`,
                                                transform:
                                                    "translate(-50%, -50%)",
                                            }}
                                        >
                                            <span className="absolute w-12 h-12 bg-gradient-to-r from-spiderverse-red via-spiderverse-blue to-spiderverse-purple rounded-full animate-ping opacity-70"></span>
                                            <span
                                                className="absolute w-8 h-8 bg-white rounded-full animate-ping opacity-50"
                                                style={{
                                                    animationDuration: "0.5s",
                                                }}
                                            ></span>
                                            <svg
                                                className="relative w-6 h-6 text-spiderverse-red animate-spin-slow"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                        </span>
                                    )}
                                    {multiverseAwareness >= 3 && (
                                        <>
                                            {/* Enhanced indicator with animation */}
                                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-spiderverse-red opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-spiderverse-red"></span>
                                            </span>

                                            {/* Enhanced tooltip with better styling and animations */}
                                            <span
                                                className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black border-2 border-spiderverse-red text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-50 shadow-lg"
                                                style={{
                                                    boxShadow:
                                                        "0 0 10px rgba(255, 23, 68, 0.5)",
                                                }}
                                            >
                                                {/* Comic dots overlay */}
                                                <div className="absolute inset-0 benday-dots opacity-10 rounded-lg"></div>
                                                {/* Animated arrow pointing down */}
                                                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black border-r-2 border-b-2 border-spiderverse-red rotate-45"></span>
                                                <span className="text-spiderverse-yellow font-bold">
                                                    Click
                                                </span>{" "}
                                                <span className="text-spiderverse-cyan font-bold text-base animate-pulse inline-block min-w-[12px] text-center">
                                                    {3 - (clickCount % 3)}
                                                </span>{" "}
                                                <span className="text-spiderverse-yellow font-bold">
                                                    more{" "}
                                                    {clickCount % 3 === 2
                                                        ? "time"
                                                        : "times"}
                                                </span>{" "}
                                                <span className="text-white">
                                                    for post-credit scene
                                                </span>
                                                {/* Visual click indicator */}
                                                <span className="ml-1 inline-flex items-center">
                                                    {[...Array(3)].map(
                                                        (_, i) => (
                                                            <span
                                                                key={i}
                                                                className={`inline-block w-2 h-2 rounded-full mx-0.5 ${
                                                                    i <
                                                                    clickCount %
                                                                        3
                                                                        ? "bg-spiderverse-red"
                                                                        : "bg-gray-600"
                                                                }`}
                                                            ></span>
                                                        )
                                                    )}
                                                </span>
                                            </span>
                                        </>
                                    )}
                                </span>
                            </p>

                            {/* Spider web in corner */}
                            <div
                                className="absolute -bottom-2 -right-2 w-10 h-10 opacity-30"
                                style={getParallaxStyle(5)}
                            >
                                <svg
                                    viewBox="0 0 100 100"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0,0 L100,100 M0,100 L100,0 M50,0 L50,100 M0,50 L100,50"
                                        stroke="black"
                                        strokeWidth="1"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="black"
                                        strokeWidth="1"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="30"
                                        fill="none"
                                        stroke="black"
                                        strokeWidth="1"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="15"
                                        fill="none"
                                        stroke="black"
                                        strokeWidth="1"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced comic book style decorative elements */}
            <div
                className="absolute bottom-5 left-5 onomatopoeia animate-action-word-pulse"
                style={{ fontSize: "2rem", color: "white" }}
            >
                THE END!
            </div>

            {/* Spider silhouette */}
            <div
                className="absolute bottom-10 right-10 w-16 h-16 opacity-70 animate-spider-crawl"
                style={getParallaxStyle(10)}
            >
                <svg
                    viewBox="0 0 100 100"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M50,15 C55,15 60,20 60,25 C60,30 55,35 50,35 C45,35 40,30 40,25 C40,20 45,15 50,15 Z" />
                    <path d="M50,35 L50,65" strokeWidth="5" stroke="white" />
                    <path
                        d="M30,25 L45,35 M55,35 L70,25"
                        strokeWidth="3"
                        stroke="white"
                    />
                    <path
                        d="M20,40 L45,45 M55,45 L80,40"
                        strokeWidth="3"
                        stroke="white"
                    />
                    <path
                        d="M15,60 L40,55 M60,55 L85,60"
                        strokeWidth="3"
                        stroke="white"
                    />
                    <path
                        d="M25,80 L40,65 M60,65 L75,80"
                        strokeWidth="3"
                        stroke="white"
                    />
                </svg>
            </div>

            {/* Comic panel border effect */}
            <div className="absolute inset-0 border-8 border-black opacity-20 pointer-events-none"></div>
        </footer>
    )
}

export default SpiderverseFooter
