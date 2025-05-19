import React, { useState, useEffect } from "react"
import SpiderverseProjectModal from "./SpiderverseProjectModal"
import { projects, fetchProjects } from "../data/projectsData"

const SpiderverseProjects = () => {
    const [activeFilter, setActiveFilter] = useState("all")
    const [animatedItems, setAnimatedItems] = useState([])
    const [selectedProject, setSelectedProject] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1024
    )
    const [projectsData, setProjectsData] = useState(projects)

    // This useEffect will be used when API is implemented
    useEffect(() => {
        // Fetch projects data
        const getProjects = async () => {
            const data = await fetchProjects()
            setProjectsData(data)
        }

        getProjects()
    }, [])

    const openProjectModal = (project) => {
        setSelectedProject(project)
        setIsModalOpen(true)
    }

    const closeProjectModal = () => {
        setIsModalOpen(false)
        // Clear selected project after animation completes
        setTimeout(() => {
            setSelectedProject(null)
        }, 300)
    }

    // Projects data is now imported from projectsData.js

    // Animation when filter changes
    useEffect(() => {
        setAnimatedItems([])
        const timer = setTimeout(() => {
            setAnimatedItems(filteredProjects.map((_, i) => i))
        }, 100)
        return () => clearTimeout(timer)
    }, [activeFilter, projectsData])

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const filteredProjects =
        activeFilter === "all"
            ? projectsData
            : projectsData.filter(
                  (project) => project.category === activeFilter
              )

    const filters = [
        { id: "all", label: "All Projects", color: "purple" },
        { id: "frontend", label: "Frontend", color: "cyan" },
        { id: "backend", label: "Backend", color: "pink" },
        { id: "fullstack", label: "Full Stack", color: "red" },
        { id: "ai", label: "AI", color: "purple" },
    ]

    // Function to create random motion lines
    const createMotionLines = () => {
        const lines = []
        for (let i = 0; i < 15; i++) {
            const top = Math.random() * 100
            const left = Math.random() * 100
            const width = 30 + Math.random() * 70
            const rotation = Math.random() * 180
            const opacity = 0.1 + Math.random() * 0.3

            lines.push(
                <div
                    key={i}
                    className="motion-line absolute bg-black"
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
            id="projects"
            className="relative overflow-hidden pt-8 sm:pt-10 md:pt-12 pb-16 sm:pb-20 md:pb-24"
        >
            {/* Comic book style background */}
            <div className="absolute inset-0 bg-white z-0">
                <div className="halftone-overlay"></div>
                {createMotionLines()}

                {/* Comic book style decorative elements - responsive */}
                <div className="hidden sm:block absolute top-1/4 right-1/4 onomatopoeia zoom">
                    ZOOM!
                </div>
            </div>

            <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
                {/* Section header with comic book styling - Mobile/Tablet */}
                <div className="md:hidden text-center mb-8">
                    <div className="thought-bubble inline-block max-w-[90%]">
                        <h2 className="comic-title text-2xl sm:text-3xl mb-2 text-black">
                            My{" "}
                            <span className="text-spiderverse-red">
                                Projects
                            </span>
                        </h2>
                        <p className="text-black text-sm max-w-2xl mx-auto">
                            Here are some of the projects I've worked on. Each
                            project represents different skills and technologies
                            I've mastered throughout my journey as a developer.
                        </p>
                    </div>
                </div>

                {/* Section header with comic book styling - Desktop (original) */}
                <div className="hidden md:block text-center mb-16">
                    <div className="thought-bubble inline-block">
                        <h2 className="comic-title text-4xl mb-4 text-black">
                            My{" "}
                            <span className="text-spiderverse-red">
                                Projects
                            </span>
                        </h2>
                        <p className="text-black max-w-2xl mx-auto">
                            Here are some of the projects I've worked on. Each
                            project represents different skills and technologies
                            I've mastered throughout my journey as a developer.
                        </p>
                    </div>
                </div>

                {/* Filter buttons with comic book styling - Mobile/Tablet */}
                <div className="md:hidden flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
                    {filters.map((filter, index) => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`spiderverse-button text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-3 ${
                                activeFilter === filter.id
                                    ? `bg-spiderverse-${filter.color}`
                                    : "bg-gray-800"
                            }`}
                            style={{
                                transform: `rotate(${
                                    index % 2 === 0 ? "-1deg" : "1deg"
                                })`,
                            }}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Filter buttons with comic book styling - Desktop (original) */}
                <div className="hidden md:flex flex-wrap justify-center gap-4 mb-12">
                    {filters.map((filter, index) => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`spiderverse-button text-base py-3 px-4 ${
                                activeFilter === filter.id
                                    ? `bg-spiderverse-${filter.color}`
                                    : "bg-gray-800"
                            }`}
                            style={{
                                transform: `rotate(${
                                    index % 2 === 0 ? "-1deg" : "1deg"
                                })`,
                            }}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Projects grid with comic panel layout */}
                <div className="comic-panel-grid">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={index}
                            className={`${project.panelSize} comic-panel bg-white`}
                            style={{
                                "--panel-rotation": project.rotation,
                                animationDelay: `${index * 0.1}s`,
                            }}
                        >
                            <div className="relative h-full overflow-hidden flex flex-col">
                                {/* Different styling based on screen size */}
                                <div className="md:hidden p-2 sm:p-3">
                                    {/* Mobile/Tablet Project title */}
                                    <h3
                                        className={`comic-title text-lg sm:text-xl mb-1 sm:mb-2 text-spiderverse-${project.color}`}
                                    >
                                        {project.title}
                                    </h3>

                                    {/* Mobile/Tablet Project description */}
                                    <p className="text-black mb-2 sm:mb-3 text-xs sm:text-sm">
                                        {windowWidth < 640
                                            ? project.description.length > 60
                                                ? project.description.substring(
                                                      0,
                                                      60
                                                  ) + "..."
                                                : project.description
                                            : project.description.length > 80
                                            ? project.description.substring(
                                                  0,
                                                  80
                                              ) + "..."
                                            : project.description}
                                    </p>

                                    {/* Mobile/Tablet Technologies */}
                                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                                        {project.technologies
                                            .slice(0, windowWidth < 640 ? 2 : 3)
                                            .map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className={`inline-block px-1 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-bold bg-spiderverse-${project.color}/20 text-black border border-black`}
                                                    style={{
                                                        transform: `rotate(${
                                                            i % 2 === 0
                                                                ? "-1deg"
                                                                : "1deg"
                                                        })`,
                                                    }}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        {project.technologies.length >
                                            (windowWidth < 640 ? 2 : 3) && (
                                            <span className="inline-block px-1 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-bold bg-gray-200 text-black border border-black">
                                                +
                                                {project.technologies.length -
                                                    (windowWidth < 640 ? 2 : 3)}
                                            </span>
                                        )}
                                    </div>

                                    {/* Mobile/Tablet Action buttons */}
                                    <div className="flex gap-1 sm:gap-2 mt-auto">
                                        <button
                                            onClick={() =>
                                                openProjectModal(project)
                                            }
                                            className={`spiderverse-button bg-spiderverse-${project.color} text-[10px] sm:text-xs py-0.5 px-2 sm:py-1 sm:px-3`}
                                        >
                                            Details
                                        </button>
                                        <a
                                            href={project.codeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="spiderverse-button bg-black text-white text-[10px] sm:text-xs py-0.5 px-2 sm:py-1 sm:px-3"
                                        >
                                            Code
                                        </a>
                                    </div>
                                </div>

                                {/* Desktop view - Original comic style */}
                                <div className="hidden md:block p-4">
                                    {/* Project title with comic styling */}
                                    <h3
                                        className={`comic-title text-2xl mb-3 text-spiderverse-${project.color}`}
                                    >
                                        {project.title}
                                    </h3>

                                    {/* Project description */}
                                    <p className="text-black mb-4 text-sm">
                                        {project.description.length > 100
                                            ? project.description.substring(
                                                  0,
                                                  100
                                              ) + "..."
                                            : project.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies
                                            .slice(0, 3)
                                            .map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className={`inline-block px-2 py-1 text-xs font-bold bg-spiderverse-${project.color}/20 text-black border border-black`}
                                                    style={{
                                                        transform: `rotate(${
                                                            i % 2 === 0
                                                                ? "-1deg"
                                                                : "1deg"
                                                        })`,
                                                    }}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        {project.technologies.length > 3 && (
                                            <span className="inline-block px-2 py-1 text-xs font-bold bg-gray-200 text-black border border-black">
                                                +
                                                {project.technologies.length -
                                                    3}
                                            </span>
                                        )}
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex gap-2 mt-auto">
                                        <button
                                            onClick={() =>
                                                openProjectModal(project)
                                            }
                                            className={`spiderverse-button bg-spiderverse-${project.color} text-xs py-1 px-3`}
                                        >
                                            Details
                                        </button>
                                        <a
                                            href={project.codeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="spiderverse-button bg-black text-white text-xs py-1 px-3"
                                        >
                                            Code
                                        </a>
                                    </div>
                                </div>

                                {/* Comic book decorative elements - Mobile/Tablet */}
                                <div className="md:hidden absolute top-1 right-1 sm:top-2 sm:right-2 text-[10px] sm:text-xs font-bold transform rotate-12 text-spiderverse-red">
                                    #{index + 1}
                                </div>

                                {/* Comic book decorative elements - Desktop (original) */}
                                <div className="hidden md:block absolute top-2 right-2 text-xs font-bold transform rotate-12 text-spiderverse-red">
                                    #{index + 1}
                                </div>

                                {/* Halftone overlay */}
                                <div className="absolute inset-0 benday-dots opacity-10 pointer-events-none"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Project modal */}
            {isModalOpen && selectedProject && (
                <SpiderverseProjectModal
                    project={selectedProject}
                    isOpen={isModalOpen}
                    onClose={closeProjectModal}
                />
            )}
        </section>
    )
}

export default SpiderverseProjects
