import React, { useState, useEffect } from "react"
import ProjectModal from "./ProjectModal"

const Projects = () => {
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
            color: "purple",
            demoLink: "https://shopease-demo.example.com",
            codeLink: "https://github.com/sumitmaurya/shopease",
            image: "ecommerce-placeholder.jpg",
            highlights: [
                "Implemented JWT authentication with refresh tokens",
                "Built responsive UI with Material UI components",
                "Integrated real-time inventory updates with Socket.io",
                "Achieved 95% Lighthouse performance score",
            ],
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
            color: "cyan",
            demoLink: "https://taskcollab.example.com",
            codeLink: "https://github.com/sumitmaurya/taskcollab",
            image: "task-manager-placeholder.jpg",
            highlights: [
                "Implemented real-time collaboration with Socket.io",
                "Built custom drag-and-drop kanban board",
                "Integrated AWS S3 for file storage",
                "Optimized with Next.js SSR for improved SEO",
            ],
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
            color: "pink",
            demoLink: "https://weathernow.example.com",
            codeLink: "https://github.com/sumitmaurya/weathernow",
            image: "weather-placeholder.jpg",
            highlights: [
                "Implemented as Progressive Web App with offline capabilities",
                "Built interactive weather maps with Mapbox",
                "Optimized API calls with caching strategies",
                "Added dark mode and accessibility features",
            ],
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
            color: "cyan",
            demoLink: "https://sumitmaurya.dev",
            codeLink: "https://github.com/sumitmaurya/portfolio",
            image: "portfolio-placeholder.jpg",
            highlights: [
                "Implemented smooth animations with Framer Motion",
                "Built custom theme system with Tailwind CSS",
                "Optimized for performance with 100% Lighthouse score",
                "Added SEO optimizations and meta tags",
            ],
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
            color: "pink",
            demoLink: "https://api-docs.example.com",
            codeLink: "https://github.com/sumitmaurya/secureapi",
            image: "api-placeholder.jpg",
            highlights: [
                "Implemented OAuth2 authentication flow",
                "Built comprehensive test suite with Jest",
                "Added rate limiting and request validation",
                "Created detailed API documentation with Swagger",
            ],
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
        { id: "fullstack", label: "Full Stack", color: "purple" },
    ]

    return (
        <section
            id="projects"
            className="pt-12 pb-24 bg-dark-900 relative overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-500/5 rounded-bl-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-pink-500/5 rounded-tr-full blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section header */}
                <div className="text-center mb-16 reveal animate-slide-up">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                        My{" "}
                        <span className="text-gradient-purple animate-subtle-pulse inline-block">
                            Projects
                        </span>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-purple mx-auto rounded-full mb-6 animate-glow"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Here are some of the projects I've worked on. Each
                        project represents different skills and technologies
                        I've mastered throughout my journey as a developer.
                    </p>
                </div>

                {/* Filter buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12 reveal animate-slide-up">
                    {filters.map((filter, index) => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`px-5 py-2.5 rounded-full transition-all duration-300 font-medium ${
                                activeFilter === filter.id
                                    ? `neumorph-inset text-${filter.color}-400 border border-${filter.color}-500/30`
                                    : `neumorph text-gray-300 hover:text-${filter.color}-400`
                            }`}
                            style={{
                                animationDelay: `${index * 0.1}s`,
                            }}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Projects grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={index}
                            className={`reveal ${
                                animatedItems.includes(index) ? "active" : ""
                            }`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div
                                className={`group tilt-card frosted rounded-xl overflow-hidden border border-${project.color}-500/20 hover:border-${project.color}-500/50 transition-all duration-500 h-full flex flex-col animate-slide-up`}
                                style={{
                                    animationDelay: `${index * 150}ms`,
                                    transform: "translateZ(0)",
                                    willChange: "transform, box-shadow",
                                }}
                            >
                                {/* Project header with decorative elements */}
                                {/* Shine effect overlay */}
                                <div className="tilt-card-shine"></div>
                                <div className="tilt-card-inner">
                                    <div className="relative h-48 overflow-hidden tilt-card-content">
                                        {/* Modern gradient background */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br from-dark-900 via-${project.color}-900/20 to-${project.color}-800/30 flex items-center justify-center overflow-hidden`}
                                        >
                                            {/* Decorative elements */}
                                            <div
                                                className={`absolute -top-10 -right-10 w-40 h-40 bg-${project.color}-500/10 rounded-full blur-xl transform rotate-45 group-hover:scale-110 transition-transform duration-700`}
                                            ></div>
                                            <div
                                                className={`absolute -bottom-10 -left-10 w-40 h-40 bg-${project.color}-500/10 rounded-full blur-xl transform -rotate-45 group-hover:scale-110 transition-transform duration-700`}
                                            ></div>

                                            {/* Project icon/symbol */}
                                            <div
                                                className={`relative z-10 w-16 h-16 flex items-center justify-center bg-${project.color}-500/20 rounded-xl border border-${project.color}-500/30 group-hover:scale-110 transition-transform duration-500`}
                                            >
                                                <span
                                                    className={`text-${project.color}-400 text-2xl font-bold`}
                                                >
                                                    {project.title.charAt(0)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Hover overlay with project info */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/95 via-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                                            <div className="text-white text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <h4
                                                    className={`text-xl font-bold mb-2 text-${project.color}-400`}
                                                >
                                                    {project.title}
                                                </h4>
                                                <p className="text-sm text-gray-300">
                                                    {project.category
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        project.category.slice(
                                                            1
                                                        )}{" "}
                                                    Project
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 flex-grow flex flex-col tilt-card-content">
                                        <h3
                                            className={`text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-${project.color}-500 to-${project.color}-700`}
                                        >
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-300 mb-4 flex-grow leading-relaxed line-clamp-3">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.technologies
                                                .slice(0, 3)
                                                .map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className={`px-3 py-1.5 bg-dark-900 text-${project.color}-400 rounded-lg text-xs font-medium border border-${project.color}-500/20 hover:border-${project.color}-500/40 transition-colors duration-300`}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            {project.technologies.length >
                                                3 && (
                                                <span
                                                    className={`px-3 py-1.5 bg-dark-900 text-${project.color}-400 rounded-lg text-xs font-medium border border-${project.color}-500/20 transition-colors duration-300`}
                                                >
                                                    +
                                                    {project.technologies
                                                        .length - 3}
                                                </span>
                                            )}
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                openProjectModal(project)
                                            }}
                                            className={`w-full px-5 py-2.5 bg-gradient-to-r from-${project.color}-600 to-${project.color}-500 hover:from-${project.color}-500 hover:to-${project.color}-400 text-white rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center shadow-md shadow-${project.color}-500/20 hover:shadow-lg hover:shadow-${project.color}-500/30`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 mr-2"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                            View Project Details
                                        </button>
                                    </div>
                                </div>{" "}
                                {/* Close tilt-card-inner */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to action */}
                <div className="mt-16 text-center reveal">
                    <div className="inline-block">
                        <a
                            href="https://github.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 ease-in-out bg-dark-800 rounded-full hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            <span className="absolute inset-0 w-full h-full -mt-1 -ml-1 transition-all duration-300 ease-in-out bg-gradient-purple rounded-full blur opacity-30 group-hover:opacity-100 group-hover:blur-md"></span>
                            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-in-out rounded-full"></span>
                            <span className="relative flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                                View More Projects on GitHub
                            </span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={closeProjectModal}
            />
        </section>
    )
}

export default Projects
