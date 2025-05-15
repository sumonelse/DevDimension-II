import React from "react"
import personalInfo from "../utils/personalInfo"

const SpiderverseAbout = () => {
    return (
        <section id="about" className="py-16 relative overflow-hidden">
            {/* Comic book style background */}
            <div className="absolute inset-0 bg-white z-0">
                <div className="halftone-overlay"></div>
                <div className="spidey-mask-overlay"></div>

                {/* Spider webs in corners */}
                <div className="spider-web spider-web-corner absolute top-0 left-0 transform rotate-0"></div>
                <div className="spider-web spider-web-corner absolute top-0 right-0 transform rotate-90"></div>
                <div className="spider-web spider-web-corner absolute bottom-0 left-0 transform -rotate-90"></div>
                <div className="spider-web spider-web-corner absolute bottom-0 right-0 transform rotate-180"></div>

                {/* Action words */}
                <div className="action-word absolute top-20 right-[10%]">
                    THWIP!
                </div>
                <div className="action-word absolute bottom-20 left-[15%]">
                    SNAP!
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Comic book style section header */}
                <div className="comic-section-header mb-12">
                    <h2>About Me</h2>
                </div>

                <div className="comic-strip">
                    {/* Panel 1: Introduction */}
                    <div
                        className="comic-panel bg-white p-6 relative"
                        style={{ "--panel-rotation": "-1deg" }}
                    >
                        <h3 className="comic-title text-2xl mb-4 text-spiderverse-blue">
                            The Origin Story
                        </h3>
                        <p className="text-black mb-4">
                            Hello! I'm{" "}
                            <span className="font-bold text-spiderverse-red">
                                {personalInfo.name}
                            </span>
                            , a passionate full-stack developer with a knack for
                            solving complex problems and building user-friendly
                            applications.
                        </p>
                        <p className="text-black">
                            Just like Peter Parker balances being a student and
                            Spider-Man, I balance technical expertise with
                            creative problem-solving to deliver exceptional
                            digital experiences.
                        </p>

                        {/* Comic book decorative elements */}
                        <div className="absolute top-2 right-2 text-xs font-bold transform rotate-12 text-spiderverse-red">
                            #ORIGIN
                        </div>

                        {/* Halftone overlay */}
                        <div className="absolute inset-0 benday-dots opacity-10 pointer-events-none"></div>
                    </div>

                    {/* Panel 2: Education */}
                    <div
                        className="comic-panel bg-white p-6 relative"
                        style={{ "--panel-rotation": "1deg" }}
                    >
                        <h3 className="comic-title text-2xl mb-4 text-spiderverse-red">
                            Education & Training
                        </h3>
                        <ul className="text-black space-y-2 list-disc pl-5">
                            <li>
                                <span className="font-bold">
                                    B.Tech in Artificial Intelligence and
                                    Machine Learning
                                </span>
                                <br />
                                <span className="text-sm">
                                    Graduating in 2026, focusing on AI
                                    algorithms and data science
                                </span>
                            </li>
                            <li>
                                <span className="font-bold">
                                    Advanced Web Development Bootcamp
                                </span>
                                <br />
                                <span className="text-sm">
                                    Mastered modern frameworks and development
                                    practices
                                </span>
                            </li>
                            <li>
                                <span className="font-bold">
                                    Competitive Programming
                                </span>
                                <br />
                                <span className="text-sm">
                                    Honed problem-solving skills through coding
                                    competitions
                                </span>
                            </li>
                        </ul>

                        {/* Comic book decorative elements */}
                        <div className="absolute top-2 right-2 text-xs font-bold transform rotate-12 text-spiderverse-blue">
                            #TRAINING
                        </div>

                        {/* Halftone overlay */}
                        <div className="absolute inset-0 benday-dots opacity-10 pointer-events-none"></div>
                    </div>

                    {/* Panel 3: Experience */}
                    <div
                        className="comic-panel bg-white p-6 relative"
                        style={{ "--panel-rotation": "-0.5deg" }}
                    >
                        <h3 className="comic-title text-2xl mb-4 text-spiderverse-purple">
                            Professional Journey
                        </h3>
                        <div className="text-black space-y-4">
                            <div>
                                <h4 className="font-bold">
                                    Full-Stack Developer
                                </h4>
                                <p className="text-sm">
                                    Developed and maintained web applications
                                    using React, Node.js, and MongoDB.
                                    Implemented responsive designs and optimized
                                    performance.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold">
                                    Frontend Specialist
                                </h4>
                                <p className="text-sm">
                                    Created intuitive user interfaces with
                                    modern JavaScript frameworks. Collaborated
                                    with designers to implement pixel-perfect
                                    designs.
                                </p>
                            </div>
                        </div>

                        {/* Comic book decorative elements */}
                        <div className="absolute top-2 right-2 text-xs font-bold transform rotate-12 text-spiderverse-yellow">
                            #JOURNEY
                        </div>

                        {/* Halftone overlay */}
                        <div className="absolute inset-0 benday-dots opacity-10 pointer-events-none"></div>
                    </div>

                    {/* Panel 4: Personal */}
                    <div
                        className="comic-panel bg-white p-6 relative"
                        style={{ "--panel-rotation": "0.7deg" }}
                    >
                        <h3 className="comic-title text-2xl mb-4 text-spiderverse-green">
                            Beyond The Code
                        </h3>
                        <p className="text-black mb-4">
                            When I'm not coding, you can find me:
                        </p>
                        <ul className="text-black space-y-2 list-disc pl-5">
                            <li>
                                Solving algorithmic puzzles on competitive
                                platforms
                            </li>
                            <li>Contributing to open-source projects</li>
                            <li>Exploring new technologies and frameworks</li>
                            <li>
                                Reading tech blogs and staying updated with
                                industry trends
                            </li>
                        </ul>

                        {/* Comic book decorative elements */}
                        <div className="absolute top-2 right-2 text-xs font-bold transform rotate-12 text-spiderverse-cyan">
                            #LIFESTYLE
                        </div>

                        {/* Halftone overlay */}
                        <div className="absolute inset-0 benday-dots opacity-10 pointer-events-none"></div>
                    </div>
                </div>

                {/* Spider-Man style divider */}
                <div className="spidey-divider my-12"></div>

                {/* Quote section */}
                <div className="thought-bubble max-w-2xl mx-auto p-6 bg-white relative">
                    <p className="text-black text-center text-lg italic">
                        "With great coding power comes great responsibility. I
                        strive to build applications that are not just
                        functional, but also accessible, performant, and
                        user-friendly."
                    </p>
                    <div className="text-right mt-2 font-bold text-spiderverse-red">
                        - {personalInfo.name}
                    </div>
                </div>

                {/* Call to action */}
                <div className="text-center mt-12">
                    <a href="#skills" className="spidey-button inline-block">
                        Discover My Powers
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
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default SpiderverseAbout
