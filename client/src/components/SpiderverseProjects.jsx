import React, { useState, useEffect } from "react"
import ProjectModal from "./ProjectModal"

const SpiderverseProjects = () => {
    const [activeFilter, setActiveFilter] = useState("all")
    const [animatedItems, setAnimatedItems] = useState([])
    const [selectedProject, setSelectedProject] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

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

    const projects = [
        {
            title: "ShopEase E-Commerce",
            description:
                "A comprehensive e-commerce platform with advanced features including user authentication, product filtering, cart management, payment processing with Stripe, and order tracking. Implemented admin dashboard for inventory and order management.",
            technologies: [
                "React",
                "Node.js",
                "MongoDB",
                "Express",
                "Redux",
                "Stripe API",
            ],
            category: "fullstack",
            color: "red",
            demoLink: "https://shopease-demo.example.com",
            codeLink: "https://github.com/sumitmaurya/shopease",
            image: "ecommerce-placeholder.jpg",
            highlights: [
                "Implemented JWT authentication with refresh tokens",
                "Built responsive UI with Material UI components",
                "Integrated real-time inventory updates with Socket.io",
                "Achieved 95% Lighthouse performance score",
            ],
            panelSize: "panel-large",
            rotation: "-2deg",
        },
        {
            title: "TaskCollab Pro",
            description:
                "A collaborative task management application with real-time updates, team workspaces, and progress tracking. Features include drag-and-drop task organization, deadline notifications, file attachments, and detailed analytics dashboard.",
            technologies: [
                "Next.js",
                "Socket.io",
                "MongoDB",
                "Express",
                "Chart.js",
                "AWS S3",
            ],
            category: "fullstack",
            color: "blue",
            demoLink: "https://taskcollab.example.com",
            codeLink: "https://github.com/sumitmaurya/taskcollab",
            image: "task-manager-placeholder.jpg",
            highlights: [
                "Implemented real-time collaboration with Socket.io",
                "Built custom drag-and-drop kanban board",
                "Integrated AWS S3 for file storage",
                "Optimized with Next.js SSR for improved SEO",
            ],
            panelSize: "panel-medium",
            rotation: "1deg",
        },
        {
            title: "WeatherNow Dashboard",
            description:
                "An interactive weather application providing real-time weather data, 7-day forecasts, and historical weather patterns. Features include location-based weather, interactive maps, severe weather alerts, and customizable dashboard widgets.",
            technologies: [
                "React",
                "OpenWeather API",
                "Mapbox",
                "CSS Modules",
                "PWA",
            ],
            category: "frontend",
            color: "yellow",
            demoLink: "https://weathernow.example.com",
            codeLink: "https://github.com/sumitmaurya/weathernow",
            image: "weather-placeholder.jpg",
            highlights: [
                "Implemented as Progressive Web App with offline capabilities",
                "Built interactive weather maps with Mapbox",
                "Optimized API calls with caching strategies",
                "Added dark mode and accessibility features",
            ],
            panelSize: "panel-small",
            rotation: "-1deg",
        },
        {
            title: "MicroServe Architecture",
            description:
                "A scalable microservice architecture for a content delivery platform. Implemented service discovery, API gateway, load balancing, circuit breaking, and distributed logging. Containerized with Docker and orchestrated with Kubernetes.",
            technologies: [
                "Docker",
                "Kubernetes",
                "Node.js",
                "RabbitMQ",
                "MongoDB",
                "Redis",
                "ELK Stack",
            ],
            category: "backend",
            color: "purple",
            demoLink: "https://microserve-docs.example.com",
            codeLink: "https://github.com/sumitmaurya/microserve",
            image: "microservice-placeholder.jpg",
            highlights: [
                "Implemented event-driven architecture with RabbitMQ",
                "Built centralized logging with ELK stack",
                "Designed CI/CD pipeline with GitHub Actions",
                "Achieved 99.9% service uptime with auto-scaling",
            ],
            panelSize: "panel-wide",
            rotation: "0.5deg",
        },
        {
            title: "DevPortfolio",
            description:
                "A modern, responsive portfolio website with interactive UI elements, animations, and dark/light mode. Features include dynamic content loading, contact form with validation, and optimized performance metrics.",
            technologies: [
                "React",
                "Tailwind CSS",
                "Vite",
                "Framer Motion",
                "EmailJS",
            ],
            category: "frontend",
            color: "pink",
            demoLink: "https://sumitmaurya.dev",
            codeLink: "https://github.com/sumitmaurya/portfolio",
            image: "portfolio-placeholder.jpg",
            highlights: [
                "Implemented smooth animations with Framer Motion",
                "Built custom theme system with Tailwind CSS",
                "Optimized for performance with 100% Lighthouse score",
                "Added SEO optimizations and meta tags",
            ],
            panelSize: "panel-medium",
            rotation: "-1.5deg",
        },
        {
            title: "SecureAPI Service",
            description:
                "A production-ready RESTful API service with comprehensive security features including OAuth2 authentication, role-based access control, rate limiting, request validation, and detailed API documentation with Swagger.",
            technologies: [
                "Node.js",
                "Express",
                "MongoDB",
                "JWT",
                "OAuth2",
                "Swagger",
                "Jest",
            ],
            category: "backend",
            color: "cyan",
            demoLink: "https://api-docs.example.com",
            codeLink: "https://github.com/sumitmaurya/secureapi",
            image: "api-placeholder.jpg",
            highlights: [
                "Implemented OAuth2 authentication flow",
                "Built comprehensive test suite with Jest",
                "Added rate limiting and request validation",
                "Created detailed API documentation with Swagger",
            ],
            panelSize: "panel-tall",
            rotation: "2deg",
        },
    ]

    // Animation when filter changes
    useEffect(() => {
        setAnimatedItems([])
        const timer = setTimeout(() => {
            setAnimatedItems(filteredProjects.map((_, i) => i))
        }, 100)
        return () => clearTimeout(timer)
    }, [activeFilter])

    const filteredProjects =
        activeFilter === "all"
            ? projects
            : projects.filter((project) => project.category === activeFilter)

    const filters = [
        { id: "all", label: "All Projects", color: "purple" },
        { id: "frontend", label: "Frontend", color: "cyan" },
        { id: "backend", label: "Backend", color: "pink" },
        { id: "fullstack", label: "Full Stack", color: "red" },
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
        <section id="projects" className="pt-12 pb-24 relative overflow-hidden">
            {/* Comic book style background */}
            <div className="absolute inset-0 bg-white z-0">
                <div className="halftone-overlay"></div>
                {createMotionLines()}

                {/* Comic book style decorative elements */}
                <div className="absolute top-1/4 right-1/4 onomatopoeia zoom">
                    ZOOM!
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section header with comic book styling */}
                <div className="text-center mb-16">
                    <div className="thought-bubble inline-block">
                        <h2 className="comic-title text-3xl md:text-4xl mb-4 text-black">
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

                {/* Filter buttons with comic book styling */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {filters.map((filter, index) => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`spiderverse-button ${
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
                            <div className="relative h-full p-4 overflow-hidden">
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
                                            +{project.technologies.length - 3}
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

                                {/* Comic book decorative elements */}
                                <div className="absolute top-2 right-2 text-xs font-bold transform rotate-12 text-spiderverse-red">
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
                <ProjectModal
                    project={selectedProject}
                    isOpen={isModalOpen}
                    onClose={closeProjectModal}
                />
            )}
        </section>
    )
}

export default SpiderverseProjects
