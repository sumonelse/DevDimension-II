import React, { useEffect, useRef, useState } from "react"

const Hero = () => {
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

    return (
        <section
            id="hero"
            className="min-h-screen flex items-center relative overflow-hidden transition-colors duration-500"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-radial transition-colors duration-500"></div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMHYyaC0ydi0yaDJ6bTIgMGgydjJoLTJ2LTJ6bS02IDBoMnYyaC0ydi0yem0yLTRoMnYyaC0ydi0yem0yIDBIMzZ2Mmgtc3YtMnptMC00aDJ2MmgtMnYtMnptMiAwaDJ2MmgtMnYtMnptMi00aDJ2MmgtMnYtMnptMCAwaDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                    {/* Content column */}
                    <div className="lg:col-span-3 max-w-3xl">
                        <div className="space-y-8">
                            <div className="inline-block animate-fade-in">
                                <span className="px-4 py-1.5 rounded-full glass border border-purple-500/20 text-purple-500 font-medium">
                                    Hello, I'm
                                </span>
                            </div>

                            <h1
                                className="text-5xl md:text-7xl font-bold font-heading mb-2 animate-slide-up"
                                style={{ animationDelay: "0.2s" }}
                            >
                                <span className="text-gradient-purple">
                                    Sumit
                                </span>{" "}
                                <span className="relative">
                                    Maurya
                                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-amber rounded-full transform origin-left"></span>
                                </span>
                            </h1>

                            <h2
                                className="text-2xl md:text-3xl font-semibold mb-4 flex items-center animate-slide-up h-10"
                                style={{ animationDelay: "0.4s" }}
                            >
                                <span
                                    ref={typingTextRef}
                                    className="mr-1"
                                ></span>
                                <span className="w-1 h-8 bg-gradient-cyan animate-blink"></span>
                            </h2>

                            <p
                                className="text-lg md:text-xl mb-8 leading-relaxed max-w-2xl animate-slide-up"
                                style={{ animationDelay: "0.6s" }}
                            >
                                I build exceptional digital experiences with a
                                passion for
                                <span className="text-purple-500 font-medium">
                                    {" "}
                                    competitive programming
                                </span>
                                ,
                                <span className="text-cyan-500 font-medium">
                                    {" "}
                                    real-world applications
                                </span>
                                ,
                                <span className="text-pink-500 font-medium">
                                    {" "}
                                    problem-solving
                                </span>
                                ,
                                <span className="text-amber-500 font-medium">
                                    {" "}
                                    teamwork
                                </span>
                                , and
                                <span className="text-emerald-500 font-medium">
                                    {" "}
                                    lifelong learning
                                </span>
                                .
                            </p>

                            <div
                                className="flex flex-wrap gap-5 animate-slide-up"
                                style={{ animationDelay: "0.8s" }}
                            >
                                <a
                                    href="#projects"
                                    className="group px-8 py-3.5 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium rounded-full transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden"
                                >
                                    <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
                                    <span className="relative z-10 flex items-center">
                                        View My Work
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
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
                                    </span>
                                </a>
                                <a
                                    href="#contact"
                                    className="group px-8 py-3.5 glass border border-purple-500/30 font-medium rounded-full transition-all duration-500 hover:border-purple-400 hover:bg-purple-500/10 transform hover:-translate-y-1 hover:scale-105"
                                >
                                    <span className="flex items-center">
                                        Contact Me
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
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
                                    </span>
                                </a>
                            </div>

                            {/* Social links */}
                            <div
                                className="flex gap-5 mt-10 animate-slide-up"
                                style={{ animationDelay: "1s" }}
                            >
                                <a
                                    href="#"
                                    className="group relative w-12 h-12 rounded-lg flex items-center justify-center glass border border-purple-500/30 text-purple-500 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                                    aria-label="GitHub"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 relative z-10"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="group relative w-12 h-12 rounded-lg flex items-center justify-center glass border border-cyan-500/30 text-cyan-500 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                                    aria-label="LinkedIn"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 relative z-10"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="group relative w-12 h-12 rounded-lg flex items-center justify-center glass border border-pink-500/30 text-pink-500 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                                    aria-label="Twitter"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 relative z-10"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Image/decoration column */}
                    <div className="lg:col-span-2 hidden lg:flex justify-center items-center">
                        <div className="relative w-80 h-80">
                            {/* Animated circles */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-md animate-pulse-slow"></div>
                            <div
                                className="absolute inset-4 rounded-full bg-gradient-to-r from-purple-500/30 to-cyan-500/30 blur-sm animate-pulse-slow"
                                style={{ animationDelay: "1s" }}
                            ></div>

                            {/* Code blocks */}
                            <div className="absolute -top-10 -left-20 w-40 h-24 glass rounded-lg p-3 transform rotate-6 animate-float shadow-lg hover:shadow-purple-500/20 hover:scale-105 transition-all duration-300">
                                <div className="text-xs font-mono">
                                    <span className="text-pink-500">
                                        function
                                    </span>{" "}
                                    <span className="text-cyan-500">solve</span>
                                    () {"{"}
                                    <br />
                                    &nbsp;&nbsp;
                                    <span className="text-pink-500">
                                        return
                                    </span>{" "}
                                    <span className="text-cyan-500">
                                        success
                                    </span>
                                    ;
                                    <br />
                                    {"}"}
                                </div>
                            </div>

                            <div
                                className="absolute -bottom-5 -right-10 w-48 h-28 glass rounded-lg p-3 transform -rotate-3 animate-float shadow-lg hover:shadow-cyan-500/20 hover:scale-105 transition-all duration-300"
                                style={{ animationDelay: "1.5s" }}
                            >
                                <div className="text-xs font-mono">
                                    <span className="text-pink-500">const</span>{" "}
                                    <span className="text-cyan-500">
                                        developer
                                    </span>{" "}
                                    = {"{"}
                                    <br />
                                    &nbsp;&nbsp;name:{" "}
                                    <span className="text-purple-500">
                                        "Sumit"
                                    </span>
                                    ,
                                    <br />
                                    &nbsp;&nbsp;skills: [
                                    <span className="text-purple-500">
                                        "Full-Stack"
                                    </span>
                                    ]
                                    <br />
                                    {"}"};
                                </div>
                            </div>

                            {/* Central element */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 flex items-center justify-center animate-spin-slow hover:from-purple-500/40 hover:to-cyan-500/40 transition-colors duration-300">
                                <div className="w-32 h-32 rounded-full glass flex items-center justify-center">
                                    <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-purple">
                                        &lt;/&gt;
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in"
                style={{ animationDelay: "1.5s" }}
            >
                <span className="text-gray-400 text-sm mb-2">Scroll Down</span>
                <div className="w-6 h-10 border-2 border-purple-500/50 rounded-full flex justify-center p-1 hover:border-purple-500 transition-colors duration-300">
                    <div className="w-1.5 h-3 bg-gradient-purple rounded-full animate-bounce"></div>
                </div>
            </div>
        </section>
    )
}

export default Hero
