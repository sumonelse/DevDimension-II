import React, { useState } from "react"

const Skills = () => {
    const [hoveredSkill, setHoveredSkill] = useState(null)

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
            skills: ["C++", "Java", "Python", "JavaScript"],
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
            skills: ["HTML", "CSS", "React", "Next.js"],
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
            skills: ["Node.js", "Express", "SQL", "MongoDB"],
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
            skills: ["Docker", "Redis", "RabbitMQ", "Microservices"],
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
            className="py-24 bg-dark-800 relative overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMHYyaC0ydi0yaDJ6bTIgMGgydjJoLTJ2LTJ6bS02IDBoMnYyaC0ydi0yem0yLTRoMnYyaC0ydi0yem0yIDBIMzZ2Mmgtc3YtMnptMC00aDJ2MmgtMnYtMnptMiAwaDJ2MmgtMnYtMnptMi00aDJ2MmgtMnYtMnptMCAwaDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section header */}
                <div className="text-center mb-16 reveal">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                        Tech <span className="text-gradient-cyan">Stack</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-cyan mx-auto rounded-full mb-6"></div>
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
                                className={`h-full bg-dark-900 rounded-xl p-6 border border-${category.color}-500/20 hover:border-${category.color}-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg group`}
                            >
                                {/* Header */}
                                <div className="flex items-center mb-6">
                                    <div
                                        className={`w-10 h-10 rounded-lg bg-${category.color}-500/10 flex items-center justify-center mr-4 text-${category.color}-400 group-hover:bg-${category.color}-500/20 transition-all duration-300`}
                                    >
                                        {category.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white">
                                        {category.title}
                                    </h3>
                                </div>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map(
                                        (skill, skillIndex) => (
                                            <span
                                                key={skillIndex}
                                                className={`px-3 py-1.5 bg-dark-800 text-${category.color}-400 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-${category.color}-500/10 hover:scale-105 cursor-default`}
                                                onMouseEnter={() =>
                                                    setHoveredSkill(skill)
                                                }
                                                onMouseLeave={() =>
                                                    setHoveredSkill(null)
                                                }
                                            >
                                                {skill}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional skills */}
                <div className="reveal">
                    <div className="glass-dark rounded-xl p-8 border border-purple-500/20">
                        <h3 className="text-2xl font-bold text-white mb-8 text-center">
                            <span className="relative inline-block">
                                Additional Skills
                                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-purple"></span>
                            </span>
                        </h3>

                        <div className="flex flex-wrap justify-center gap-3">
                            {additionalSkills.map((skill, index) => (
                                <span
                                    key={index}
                                    className={`px-4 py-2 bg-dark-900 text-${
                                        skill.color
                                    }-400 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-${
                                        skill.color
                                    }-500/10 hover:scale-105 hover:shadow-${
                                        skill.color === "purple"
                                            ? "neon"
                                            : skill.color === "cyan"
                                            ? "neon-cyan"
                                            : "neon-pink"
                                    } cursor-default transform hover:-translate-y-1`}
                                    style={{
                                        transitionDelay: `${index * 30}ms`,
                                    }}
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Skill meter - appears when hovering over a skill */}
                {hoveredSkill && (
                    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-dark-900/80 backdrop-blur-md px-6 py-3 rounded-full border border-purple-500/30 shadow-neon z-50 transition-all duration-300 animate-fade-in">
                        <div className="flex items-center gap-3">
                            <span className="text-white font-medium">
                                {hoveredSkill}
                            </span>
                            <div className="w-48 h-2 bg-dark-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse-slow"
                                    style={{
                                        width: `${
                                            Math.floor(Math.random() * 30) + 70
                                        }%`,
                                    }}
                                ></div>
                            </div>
                            <span className="text-purple-400 font-mono text-sm">
                                Proficient
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Skills
