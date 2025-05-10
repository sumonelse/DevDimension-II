import React from "react"

const About = () => {
    const qualities = [
        {
            label: "Problem Solver",
            color: "purple",
            description:
                "Breaking complex challenges into elegant solutions with algorithmic precision.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                </svg>
            ),
        },
        {
            label: "Code Competitor",
            color: "cyan",
            description:
                "Honed skills through competitive programming, optimizing for efficiency and performance.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                </svg>
            ),
        },
        {
            label: "Full-Stack Expert",
            color: "pink",
            description:
                "Crafting seamless experiences from pixel-perfect UIs to robust, scalable backends.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
            ),
        },
        {
            label: "Tech Explorer",
            color: "amber",
            description:
                "Constantly learning and adapting to emerging technologies and industry best practices.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                </svg>
            ),
        },
    ]

    return (
        <section
            id="about"
            className="py-20 bg-dark-900 relative overflow-hidden"
        >
            {/* Enhanced background decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-tr-full blur-3xl"></div>

            {/* Animated particles */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <div
                    className="absolute top-3/4 left-1/3 w-2 h-2 bg-cyan-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                    className="absolute top-1/2 right-1/4 w-2 h-2 bg-pink-500 rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-amber-500 rounded-full animate-pulse"
                    style={{ animationDelay: "1.5s" }}
                ></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section header with enhanced animation */}
                <div className="text-center mb-12 reveal">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 relative inline-block">
                        About <span className="text-gradient-purple">Me</span>
                        <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full transform origin-left animate-pulse-slow"></div>
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto mt-4 text-lg">
                        Passionate developer with a competitive edge
                    </p>
                </div>

                <div className="flex flex-col items-center gap-8">
                    <div className="w-full reveal">
                        {/* Bio card with enhanced design */}
                        <div className="bg-dark-800/80 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 shadow-lg mb-10 group hover:transform hover:scale-[1.01] hover:-translate-y-1">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl mr-4 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                                        My Story in Brief
                                    </span>
                                </h3>
                            </div>

                            <div className="space-y-4 text-gray-300">
                                <p className="leading-relaxed text-lg">
                                    Full-stack developer with a{" "}
                                    <span className="text-purple-400 font-medium">
                                        competitive programming
                                    </span>{" "}
                                    background and
                                    <span className="text-cyan-400 font-medium">
                                        {" "}
                                        5+ years
                                    </span>{" "}
                                    of experience crafting digital solutions. I
                                    blend algorithmic thinking with creative
                                    problem-solving to build applications that
                                    are both
                                    <span className="text-pink-400 font-medium">
                                        {" "}
                                        elegant and efficient
                                    </span>
                                    .
                                </p>

                                <p className="leading-relaxed text-lg">
                                    My expertise spans the{" "}
                                    <span className="text-amber-400 font-medium">
                                        JavaScript ecosystem
                                    </span>
                                    , with a focus on React, Node.js, and modern
                                    web technologies. I'm driven by the
                                    challenge of creating intuitive interfaces
                                    backed by robust, scalable systems that
                                    solve real-world problems.
                                </p>
                            </div>
                        </div>

                        {/* Qualities grid with enhanced visuals */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal">
                            {qualities.map((quality, index) => (
                                <div
                                    key={index}
                                    className={`p-6 rounded-xl bg-dark-800/60 backdrop-blur-sm border border-${quality.color}-500/20 hover:border-${quality.color}-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group`}
                                >
                                    <div className="flex items-center mb-4">
                                        <div
                                            className={`w-12 h-12 flex items-center justify-center bg-${quality.color}-500/10 rounded-lg mr-4 group-hover:bg-${quality.color}-500 transition-all duration-500 text-${quality.color}-400 group-hover:text-white`}
                                        >
                                            {quality.icon}
                                        </div>
                                        <h4
                                            className={`text-white font-medium text-lg group-hover:text-${quality.color}-400 transition-colors duration-300`}
                                        >
                                            {quality.label}
                                        </h4>
                                    </div>
                                    <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                                        {quality.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
