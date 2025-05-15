import React, { useEffect, useRef, useState } from "react"
import personalInfo from "../utils/personalInfo"

const SpiderverseHero = () => {
    const typingTextRef = useRef(null)
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const titles = [
        "Full-Stack Developer",
        "Problem Solver",
        "UI/UX Enthusiast",
        "Tech Explorer",
    ]

    useEffect(() => {
        // Enhanced typing animation with multiple titles
        const typingElement = typingTextRef.current
        let charIndex = 0
        let isDeleting = false
        let textTimeout

        if (typingElement) {
            typingElement.textContent = ""

            const typeEffect = () => {
                const currentText = titles[currentTextIndex]

                if (isDeleting) {
                    // Deleting text
                    typingElement.textContent = currentText.substring(
                        0,
                        charIndex - 1
                    )
                    charIndex--

                    if (charIndex === 0) {
                        isDeleting = false
                        setCurrentTextIndex(
                            (prevIndex) => (prevIndex + 1) % titles.length
                        )
                        textTimeout = setTimeout(typeEffect, 500) // Pause before typing next title
                    } else {
                        textTimeout = setTimeout(typeEffect, 50) // Faster deletion
                    }
                } else {
                    // Typing text
                    typingElement.textContent = currentText.substring(
                        0,
                        charIndex + 1
                    )
                    charIndex++

                    if (charIndex === currentText.length) {
                        isDeleting = true
                        textTimeout = setTimeout(typeEffect, 1500) // Pause at full text
                    } else {
                        textTimeout = setTimeout(typeEffect, 100) // Normal typing speed
                    }
                }
            }

            // Start typing effect
            textTimeout = setTimeout(typeEffect, 1000)

            // Cleanup
            return () => clearTimeout(textTimeout)
        }
    }, [currentTextIndex])

    // Function to create random motion lines
    const createMotionLines = () => {
        const lines = []
        for (let i = 0; i < 10; i++) {
            const top = Math.random() * 100
            const left = Math.random() * 100
            const width = 30 + Math.random() * 70
            const rotation = Math.random() * 180
            const opacity = 0.1 + Math.random() * 0.3

            lines.push(
                <div
                    key={i}
                    className="motion-line absolute bg-white"
                    style={{
                        top: `${top}%`,
                        left: `${left}%`,
                        width: `${width}px`,
                        transform: `rotate(${rotation}deg)`,
                        opacity,
                    }}
                />
            )
        }
        return lines
    }

    return (
        <section
            id="hero"
            className="min-h-screen pt-24 flex items-center justify-center relative overflow-hidden"
        >
            {/* Comic book style background elements */}
            <div className="absolute inset-0 z-0">
                {createMotionLines()}

                {/* Comic book style decorative elements */}
                <div className="absolute top-1/4 right-1/4 onomatopoeia pow">
                    POW!
                </div>
                <div className="absolute bottom-1/4 left-1/3 onomatopoeia bang">
                    BANG!
                </div>
            </div>

            {/* Main content with comic book styling */}
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center">
                    {/* Main content - comic panel style */}
                    <div className="comic-panel bg-white text-black max-w-3xl p-8 relative">
                        <div className="halftone-overlay"></div>

                        <div className="space-y-8">
                            {/* Comic style greeting */}
                            <div className="inline-block animate-fade-in">
                                <span className="px-4 py-1.5 rounded-full bg-spiderverse-yellow text-black font-bold border-2 border-black transform -rotate-2">
                                    <span className="mr-1">👋</span> Hello, I'm
                                </span>
                            </div>

                            {/* Name with comic book styling */}
                            <h1
                                className="comic-title text-5xl md:text-7xl mb-2 glitch-text"
                                data-text={personalInfo.name}
                            >
                                <span className="text-spiderverse-red">
                                    {personalInfo.name.split(" ")[0]}
                                </span>{" "}
                                <span className="text-spiderverse-blue">
                                    {personalInfo.name.split(" ")[1]}
                                </span>
                            </h1>

                            {/* Improved typing effect with comic styling */}
                            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center justify-center h-10 comic-subtitle">
                                <span className="text-spiderverse-purple">
                                    I'm a{" "}
                                </span>
                                <span
                                    ref={typingTextRef}
                                    className="mx-2 text-spiderverse-red"
                                ></span>
                                <span className="w-1 h-8 bg-spiderverse-blue animate-blink rounded-sm"></span>
                            </h2>

                            {/* Description with comic book styling */}
                            <p className="text-lg md:text-xl mb-8 leading-relaxed mx-auto max-w-2xl">
                                I build exceptional digital experiences with a
                                passion for
                                <span className="text-spiderverse-red font-bold relative group mx-1">
                                    competitive programming
                                    <span className="absolute -bottom-0.5 left-0 w-full h-1 bg-spiderverse-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                </span>
                                ,
                                <span className="text-spiderverse-blue font-bold relative group mx-1">
                                    algorithmic thinking
                                    <span className="absolute -bottom-0.5 left-0 w-full h-1 bg-spiderverse-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                </span>
                                ,
                                <span className="text-spiderverse-purple font-bold relative group mx-1">
                                    efficient problem-solving
                                    <span className="absolute -bottom-0.5 left-0 w-full h-1 bg-spiderverse-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                </span>
                                ,
                                <span className="text-spiderverse-yellow font-bold relative group mx-1">
                                    optimized solutions
                                    <span className="absolute -bottom-0.5 left-0 w-full h-1 bg-spiderverse-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                </span>
                                , and
                                <span className="text-spiderverse-green font-bold relative group mx-1">
                                    real-world applications
                                    <span className="absolute -bottom-0.5 left-0 w-full h-1 bg-spiderverse-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                </span>
                                .
                            </p>

                            {/* CTA buttons with Spider-Verse styling */}
                            <div className="flex flex-wrap gap-6 justify-center">
                                <a
                                    href="#projects"
                                    className="spiderverse-button bg-spiderverse-red"
                                >
                                    View My Projects
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 ml-2 inline-block"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="#contact"
                                    className="spiderverse-button bg-spiderverse-blue"
                                >
                                    Get In Touch
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 ml-2 inline-block"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Comic book style social links */}
                    <div className="mt-12 flex space-x-6">
                        <a
                            href={personalInfo.social.github.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="comic-border bg-white p-3 rounded-full transform hover:rotate-12 transition-transform duration-300"
                        >
                            <svg
                                className="w-6 h-6 text-black"
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
                            className="comic-border bg-white p-3 rounded-full transform hover:-rotate-12 transition-transform duration-300"
                        >
                            <svg
                                className="w-6 h-6 text-black"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        <a
                            href={personalInfo.contact.emailLink}
                            className="comic-border bg-white p-3 rounded-full transform hover:rotate-12 transition-transform duration-300"
                        >
                            <svg
                                className="w-6 h-6 text-black"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                ></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SpiderverseHero
