import React from "react"

const Skills = () => {
    // Hover state removed as requested

    const skillCategories = [
        {
            title: "Programming Languages",
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
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                </svg>
            ),
            color: "purple",
            skills: [
                "C++",
                "Java",
                "Python",
                "JavaScript",
                "TypeScript",
                "Golang",
            ],
        },
        {
            title: "Frontend",
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
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                </svg>
            ),
            color: "pink",
            skills: [
                "HTML/CSS",
                "React",
                "Next.js",
                "Tailwind CSS",
                "Redux",
                "Vue.js",
                "Angular",
            ],
        },
        {
            title: "Backend",
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
                        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    />
                </svg>
            ),
            color: "cyan",
            skills: [
                "Node.js",
                "Express",
                "MongoDB",
                "SQL",
                "GraphQL",
                "Firebase",
                "REST APIs",
            ],
        },
        {
            title: "DevOps & Tools",
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            ),
            color: "purple",
            skills: [
                "Git/GitHub",
                "Docker",
                "AWS",
                "CI/CD",
                "Jest/Testing",
                "Kubernetes",
                "Nginx",
            ],
        },
        {
            title: "Mobile Development",
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
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                </svg>
            ),
            color: "amber",
            skills: [
                "React Native",
                "Flutter",
                "WebSockets",
                "WebRTC",
                "PWA",
                "Responsive Design",
            ],
        },
    ]

    const additionalSkills = [
        { name: "HTML", color: "pink" },
        { name: "CSS", color: "cyan" },
        { name: "JS", color: "purple" },
        { name: "Node", color: "cyan" },
        { name: "Express", color: "purple" },
        { name: "MongoDB", color: "cyan" },
        { name: "Docker", color: "pink" },
        { name: "React", color: "cyan" },
        { name: "Next", color: "purple" },
        { name: "SQL", color: "pink" },
        { name: "Redis", color: "cyan" },
        { name: "RabbitMQ", color: "purple" },
        { name: "MicroServices", color: "pink" },
    ]

    return (
        <section
            id="skills"
            className="pt-24 pb-12 bg-dark-800 relative overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMHYyaC0ydi0yaDJ6bTIgMGgydjJoLTJ2LTJ6bS02IDBoMnYyaC0ydi0yem0yLTRoMnYyaC0ydi0yem0yIDBIMzZ2Mmgtc3YtMnptMC00aDJ2MmgtMnYtMnptMiAwaDJ2MmgtMnYtMnptMi00aDJ2MmgtMnYtMnptMCAwaDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section header */}
                <div className="text-center mb-16 reveal animate-slide-up">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                        Tech{" "}
                        <span className="text-gradient-cyan animate-subtle-pulse inline-block">
                            Stack
                        </span>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-cyan mx-auto rounded-full mb-6 animate-glow"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        My technical toolkit includes a diverse range of
                        languages, frameworks, and technologies that enable me
                        to build comprehensive full-stack solutions.
                    </p>
                </div>

                {/* Skill categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {skillCategories.map((category, index) => (
                        <div
                            key={index}
                            className="reveal"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div
                                className={`h-full tilt-card clay bg-dark-900 rounded-xl p-8 transition-all duration-500 group relative overflow-hidden animate-slide-up
                                    ${
                                        category.color === "purple"
                                            ? "border border-purple-500/20 hover:border-purple-500/50"
                                            : ""
                                    }
                                    ${
                                        category.color === "pink"
                                            ? "border border-pink-500/20 hover:border-pink-500/50"
                                            : ""
                                    }
                                    ${
                                        category.color === "cyan"
                                            ? "border border-cyan-500/20 hover:border-cyan-500/50"
                                            : ""
                                    }
                                    ${
                                        category.color === "amber"
                                            ? "border border-amber-500/20 hover:border-amber-500/50"
                                            : ""
                                    }
                                `}
                                style={{
                                    transform: "translateZ(0)",
                                    willChange: "transform, box-shadow",
                                    animationDelay: `${index * 150}ms`,
                                }}
                            >
                                {/* Background decoration */}
                                <div
                                    className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-700
                                        ${
                                            category.color === "purple"
                                                ? "bg-purple-500/5"
                                                : ""
                                        }
                                        ${
                                            category.color === "pink"
                                                ? "bg-pink-500/5"
                                                : ""
                                        }
                                        ${
                                            category.color === "cyan"
                                                ? "bg-cyan-500/5"
                                                : ""
                                        }
                                        ${
                                            category.color === "amber"
                                                ? "bg-amber-500/5"
                                                : ""
                                        }
                                    `}
                                ></div>
                                <div
                                    className={`absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-700
                                        ${
                                            category.color === "purple"
                                                ? "bg-purple-500/5"
                                                : ""
                                        }
                                        ${
                                            category.color === "pink"
                                                ? "bg-pink-500/5"
                                                : ""
                                        }
                                        ${
                                            category.color === "cyan"
                                                ? "bg-cyan-500/5"
                                                : ""
                                        }
                                        ${
                                            category.color === "amber"
                                                ? "bg-amber-500/5"
                                                : ""
                                        }
                                    `}
                                ></div>
                                {/* Shine effect overlay */}
                                <div className="tilt-card-shine"></div>
                                {/* 3D tilt inner container */}
                                <div className="tilt-card-inner relative z-10">
                                    {/* Header */}
                                    <div className="flex items-center mb-8 tilt-card-content">
                                        <div
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 text-white transition-all duration-300 group-hover:scale-110 animate-subtle-pulse
                                                ${
                                                    category.color === "purple"
                                                        ? "bg-gradient-to-br from-purple-600 to-purple-400 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40"
                                                        : ""
                                                }
                                                ${
                                                    category.color === "pink"
                                                        ? "bg-gradient-to-br from-pink-600 to-pink-400 shadow-lg shadow-pink-500/20 group-hover:shadow-pink-500/40"
                                                        : ""
                                                }
                                                ${
                                                    category.color === "cyan"
                                                        ? "bg-gradient-to-br from-cyan-600 to-cyan-400 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40"
                                                        : ""
                                                }
                                                ${
                                                    category.color === "amber"
                                                        ? "bg-gradient-to-br from-amber-600 to-amber-400 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40"
                                                        : ""
                                                }
                                            `}
                                            style={{
                                                animationDelay: `${
                                                    index * 200
                                                }ms`,
                                            }}
                                        >
                                            {category.icon}
                                        </div>
                                        <h3 className="text-xl font-bold">
                                            {category.color === "purple" && (
                                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                                                    {category.title}
                                                </span>
                                            )}
                                            {category.color === "pink" && (
                                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-600">
                                                    {category.title}
                                                </span>
                                            )}
                                            {category.color === "cyan" && (
                                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-600">
                                                    {category.title}
                                                </span>
                                            )}
                                            {category.color === "amber" && (
                                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600">
                                                    {category.title}
                                                </span>
                                            )}
                                        </h3>
                                    </div>

                                    {/* Skills with clean badges */}
                                    <div className="flex flex-wrap gap-3 tilt-card-content">
                                        {category.skills.map(
                                            (skill, skillIndex) => (
                                                <div
                                                    key={skillIndex}
                                                    className={`px-4 py-2.5 rounded-lg bg-dark-900/80 font-medium text-sm transition-all duration-300 hover:shadow-sm hover:translate-y-[-2px] animate-slide-up
                                                        ${
                                                            category.color ===
                                                            "purple"
                                                                ? "border border-purple-500/20 text-purple-400 hover:border-purple-500/40"
                                                                : ""
                                                        }
                                                        ${
                                                            category.color ===
                                                            "pink"
                                                                ? "border border-pink-500/20 text-pink-400 hover:border-pink-500/40"
                                                                : ""
                                                        }
                                                        ${
                                                            category.color ===
                                                            "cyan"
                                                                ? "border border-cyan-500/20 text-cyan-400 hover:border-cyan-500/40"
                                                                : ""
                                                        }
                                                        ${
                                                            category.color ===
                                                            "amber"
                                                                ? "border border-amber-500/20 text-amber-400 hover:border-amber-500/40"
                                                                : ""
                                                        }
                                                    `}
                                                    style={{
                                                        transform:
                                                            "translateZ(0)",
                                                        willChange:
                                                            "transform, box-shadow",
                                                        animationDelay: `${
                                                            index * 150 +
                                                            skillIndex * 50 +
                                                            300
                                                        }ms`,
                                                    }}
                                                >
                                                    <div className="flex items-center">
                                                        {/* <span
                                                            className={`w-2 h-2 rounded-full bg-${category.color}-500 mr-2`}
                                                        ></span> */}
                                                        {skill}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>{" "}
                                {/* Close tilt-card-inner */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional skills */}
                <div className="reveal">
                    <div
                        className="frosted tilt-card rounded-xl p-10 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-500 relative overflow-hidden animate-slide-up mesh-gradient-purple"
                        style={{
                            transform: "translateZ(0)",
                            willChange: "transform, box-shadow",
                            animationDelay: "600ms",
                        }}
                    >
                        {/* Background decorations */}
                        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-500/10 rounded-bl-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-cyan-500/10 rounded-tr-full blur-3xl"></div>
                        {/* Shine effect overlay */}
                        <div className="tilt-card-shine"></div>
                        <div className="tilt-card-inner">
                            <h3 className="text-2xl font-bold mb-10 text-center tilt-card-content">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 relative inline-block animate-subtle-pulse">
                                    Quick Skills Overview
                                    <span className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 animate-glow"></span>
                                </span>
                            </h3>
                            <p className="text-gray-300 text-center mb-8">
                                A simplified list of my core technical
                                competencies
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 tilt-card-content">
                                {additionalSkills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className={`px-5 py-2.5 frosted text-${
                                            skill.color
                                        }-400 rounded-xl text-sm font-medium border border-${
                                            skill.color
                                        }-500/30 transition-all duration-500 hover:border-${
                                            skill.color
                                        }-500/60 hover:shadow-${
                                            skill.color === "purple"
                                                ? "neon"
                                                : skill.color === "cyan"
                                                ? "neon-cyan"
                                                : "neon-pink"
                                        } cursor-default animate-slide-up`}
                                        style={{
                                            transform: "translateZ(20px)",
                                            willChange: "transform, box-shadow",
                                            marginBottom:
                                                "4px" /* Prevent layout shift */,
                                            animationDelay: `${
                                                800 + index * 50
                                            }ms`,
                                        }}
                                        /* Hover state removed as requested */
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>{" "}
                        {/* Close tilt-card-inner */}
                    </div>
                </div>

                {/* Progress indicator removed as requested */}
            </div>
        </section>
    )
}

export default Skills
