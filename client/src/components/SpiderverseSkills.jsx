import React from "react"

const SpiderverseSkills = () => {
    // Skill categories with Spider-Verse colors
    const skillCategories = [
        {
            title: "Frontend",
            color: "red",
            skills: [
                { name: "React", level: 90 },
                { name: "JavaScript", level: 95 },
                { name: "TypeScript", level: 85 },
                { name: "HTML/CSS", level: 90 },
                { name: "Tailwind CSS", level: 85 },
                { name: "Redux", level: 80 },
            ],
        },
        {
            title: "Backend",
            color: "blue",
            skills: [
                { name: "Node.js", level: 85 },
                { name: "Express", level: 90 },
                { name: "MongoDB", level: 80 },
                { name: "SQL", level: 75 },
                { name: "REST API", level: 90 },
                { name: "GraphQL", level: 70 },
            ],
        },
        {
            title: "Tools & Others",
            color: "purple",
            skills: [
                { name: "Git", level: 90 },
                { name: "Docker", level: 75 },
                { name: "AWS", level: 70 },
                { name: "Testing", level: 80 },
                { name: "CI/CD", level: 75 },
                { name: "Agile", level: 85 },
            ],
        },
        {
            title: "Problem Solving",
            color: "yellow",
            skills: [
                { name: "Algorithms", level: 95 },
                { name: "Data Structures", level: 90 },
                { name: "System Design", level: 80 },
                { name: "Optimization", level: 85 },
                { name: "Debugging", level: 90 },
                { name: "Performance", level: 85 },
            ],
        },
    ]

    return (
        <section id="skills" className="py-16 relative overflow-hidden">
            {/* Comic book style background */}
            <div className="absolute inset-0 bg-white z-0">
                <div className="halftone-overlay"></div>
                <div className="spidey-mask-overlay"></div>

                {/* Spider webs on sides */}
                <div className="spider-web spider-web-side absolute top-1/4 left-0"></div>
                <div className="spider-web spider-web-side absolute top-1/4 right-0 transform rotate-180"></div>
                <div className="spider-web spider-web-side absolute bottom-1/4 left-0 transform rotate-180"></div>
                <div className="spider-web spider-web-side absolute bottom-1/4 right-0"></div>

                {/* Spider web in center */}
                <div className="spider-web spider-web-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5"></div>

                {/* Action words */}
                <div className="action-word absolute top-[30%] left-[5%]">
                    ZAP!
                </div>
                <div className="action-word absolute bottom-[20%] right-[8%]">
                    BOOM!
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Comic book style section header */}
                <div className="comic-section-header mb-12">
                    <h2>My Super Powers</h2>
                </div>

                {/* Introduction */}
                <div className="dialogue-box max-w-3xl mx-auto mb-12">
                    <p className="text-black text-center">
                        Just like Spider-Man has his spider-sense, web-shooters,
                        and wall-crawling abilities, I've developed a unique set
                        of technical skills that help me tackle any development
                        challenge. Here's my arsenal of super powers:
                    </p>
                </div>

                {/* Skills grid with comic book styling */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {skillCategories.map((category, index) => (
                        <div
                            key={index}
                            className="comic-panel bg-white p-6 relative"
                            style={{
                                "--panel-rotation": `${
                                    index % 2 === 0 ? "-1" : "1"
                                }deg`,
                            }}
                        >
                            <h3
                                className={`comic-title text-2xl mb-6 text-spiderverse-${category.color}`}
                            >
                                {category.title}
                            </h3>

                            <div className="space-y-4">
                                {category.skills.map((skill, skillIndex) => (
                                    <div key={skillIndex} className="relative">
                                        <div className="flex justify-between mb-1">
                                            <span className="font-bold text-black">
                                                {skill.name}
                                            </span>
                                            <span className="text-sm text-black">
                                                {skill.level}%
                                            </span>
                                        </div>

                                        {/* Skill bar with comic styling */}
                                        <div className="h-4 bg-gray-200 rounded-full comic-border overflow-hidden">
                                            <div
                                                className={`h-full bg-spiderverse-${category.color} rounded-full`}
                                                style={{
                                                    width: `${skill.level}%`,
                                                }}
                                            ></div>
                                        </div>

                                        {/* Web line connecting to skill bar */}
                                        <div
                                            className="absolute -left-4 top-1/2 w-4 h-2 web-shooter"
                                            style={{
                                                animationDelay: `${
                                                    skillIndex * 0.2
                                                }s`,
                                                background: `repeating-linear-gradient(90deg, transparent, transparent 2px, var(--spiderverse-${category.color}) 2px, var(--spiderverse-${category.color}) 4px)`,
                                            }}
                                        ></div>
                                    </div>
                                ))}
                            </div>

                            {/* Comic book decorative elements */}
                            <div className="absolute top-2 right-2 text-xs font-bold transform rotate-12 text-spiderverse-red">
                                #
                                {category.title
                                    .toUpperCase()
                                    .replace(/\s+/g, "")}
                            </div>

                            {/* Halftone overlay */}
                            <div className="absolute inset-0 benday-dots opacity-10 pointer-events-none"></div>
                        </div>
                    ))}
                </div>

                {/* Additional skills section */}
                <div
                    className="comic-panel bg-white p-6 max-w-3xl mx-auto relative"
                    style={{ "--panel-rotation": "0.5deg" }}
                >
                    <h3 className="comic-title text-2xl mb-4 text-spiderverse-green">
                        Other Abilities
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            "Responsive Design",
                            "UI/UX Design",
                            "SEO Optimization",
                            "Performance Tuning",
                            "Cross-Browser Compatibility",
                            "Progressive Web Apps",
                            "Microservices",
                            "Serverless Architecture",
                            "WebSockets",
                        ].map((skill, index) => (
                            <div
                                key={index}
                                className="p-2 bg-gray-100 border-2 border-black text-center text-black font-bold"
                                style={{
                                    transform: `rotate(${
                                        Math.random() * 2 - 1
                                    }deg)`,
                                }}
                            >
                                {skill}
                            </div>
                        ))}
                    </div>

                    {/* Comic book decorative elements */}
                    <div className="absolute top-2 right-2 text-xs font-bold transform rotate-12 text-spiderverse-green">
                        #EXTRAS
                    </div>

                    {/* Halftone overlay */}
                    <div className="absolute inset-0 benday-dots opacity-10 pointer-events-none"></div>
                </div>

                {/* Call to action */}
                <div className="text-center mt-12">
                    <a href="#projects" className="spidey-button inline-block">
                        See My Powers In Action
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

export default SpiderverseSkills
