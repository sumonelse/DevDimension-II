import React from "react"

const About = () => {
    const qualities = [
        { label: "Problem Solver", color: "purple" },
        { label: "Team Player", color: "cyan" },
        { label: "Competitive Programmer", color: "pink" },
        { label: "Lifelong Learner", color: "purple" },
    ]

    return (
        <section
            id="about"
            className="py-24 bg-dark-900 relative overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-500/5 rounded-bl-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-cyan-500/5 rounded-tr-full blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section header */}
                <div className="text-center mb-16 reveal">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                        About <span className="text-gradient-purple">Me</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-purple mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Get to know more about me, my background, and what
                        drives me as a developer.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-8">
                    {/* Content column - now full width */}
                    <div className="w-full reveal">
                        {/* Decorative elements */}
                        <div className="relative mb-8 hidden md:block">
                            <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-purple rounded-full opacity-80 blur-sm animate-pulse-slow"></div>
                            <div
                                className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-cyan rounded-full opacity-80 blur-sm animate-pulse-slow"
                                style={{ animationDelay: "1s" }}
                            ></div>
                            <div
                                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-pink rounded-full opacity-80 blur-sm animate-pulse-slow"
                                style={{ animationDelay: "2s" }}
                            ></div>
                        </div>
                        <div className="bg-dark-800 rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 shadow-lg mb-10">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <span className="w-10 h-10 inline-flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-400 rounded-full mr-4 shadow-lg shadow-purple-500/20">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-white"
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
                                </span>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                                    Who am I?
                                </span>
                            </h3>

                            <div className="space-y-5 text-gray-300 mb-8">
                                <p className="leading-relaxed text-lg">
                                    I'm a{" "}
                                    <span className="text-purple-400 font-medium relative">
                                        passionate full-stack developer
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-transparent"></span>
                                    </span>{" "}
                                    with a strong foundation in both front-end
                                    and back-end technologies. My journey in
                                    software development is driven by a genuine
                                    love for creating solutions that make a
                                    difference.
                                </p>

                                <p className="leading-relaxed text-lg">
                                    What sets me apart is my background in{" "}
                                    <span className="text-cyan-400 font-medium relative">
                                        competitive programming
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"></span>
                                    </span>
                                    , which has honed my problem-solving skills
                                    and ability to write efficient, optimized
                                    code. I thrive in collaborative environments
                                    and believe that the best applications are
                                    built by teams that communicate effectively
                                    and share knowledge.
                                </p>

                                <p className="leading-relaxed text-lg">
                                    I'm committed to{" "}
                                    <span className="text-pink-400 font-medium relative">
                                        continuous learning
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-400 to-transparent"></span>
                                    </span>{" "}
                                    and staying updated with the latest
                                    technologies and best practices in the
                                    ever-evolving field of software development.
                                </p>
                            </div>
                        </div>

                        <div className="bg-dark-800 rounded-xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 shadow-lg">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <span className="w-10 h-10 inline-flex items-center justify-center bg-gradient-to-br from-cyan-600 to-cyan-400 rounded-full mr-4 shadow-lg shadow-cyan-500/20">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                </span>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                                    My Qualities
                                </span>
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {qualities.map((quality, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center p-5 rounded-xl bg-dark-900/80 border border-${quality.color}-500/20 hover:border-${quality.color}-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group`}
                                    >
                                        <div
                                            className={`w-12 h-12 flex items-center justify-center bg-${quality.color}-500/10 rounded-lg mr-4 group-hover:bg-${quality.color}-500/20 transition-colors duration-300`}
                                        >
                                            <div
                                                className={`w-4 h-4 bg-${quality.color}-500 rounded-full group-hover:scale-110 transition-transform duration-300`}
                                            ></div>
                                        </div>
                                        <span
                                            className={`text-white font-medium text-lg group-hover:text-${quality.color}-400 transition-colors duration-300`}
                                        >
                                            {quality.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
