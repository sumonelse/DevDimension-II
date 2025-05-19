import React, { useEffect, useRef } from "react"

const ProjectModal = ({ project, isOpen, onClose }) => {
    const modalRef = useRef(null)

    // Handle click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
            // Prevent scrolling when modal is open
            document.body.style.overflow = "hidden"
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.body.style.overflow = "auto"
        }
    }, [isOpen, onClose])

    // Handle escape key to close
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === "Escape") {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscKey)
        }

        return () => {
            document.removeEventListener("keydown", handleEscKey)
        }
    }, [isOpen, onClose])

    if (!isOpen || !project) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm transition-all duration-300">
            <div
                ref={modalRef}
                className="w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-dark border border-purple-500/20 rounded-xl shadow-2xl animate-scale-up"
            >
                {/* Modal header with close button */}
                <div className="sticky top-0 z-10 glass-dark backdrop-blur-md border-b border-purple-500/20 px-6 py-4 flex justify-between items-center">
                    <h3
                        className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-${project.color}-500 to-${project.color}-700`}
                    >
                        {project.title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-dark-800 transition-colors duration-300"
                        aria-label="Close modal"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-400 hover:text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Modal content */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Project image */}
                        <div className="rounded-lg overflow-hidden border border-dark-700 bg-dark-900 aspect-video flex items-center justify-center">
                            <div
                                className={`text-${project.color}-400 text-6xl font-bold opacity-20`}
                            >
                                {project.title.split(" ")[0]}
                            </div>
                        </div>

                        {/* Project details */}
                        <div className="space-y-4">
                            <p className="text-gray-300 leading-relaxed">
                                {project.description}
                            </p>

                            {/* Project highlights */}
                            {project.highlights && (
                                <div>
                                    <h4
                                        className={`text-${project.color}-400 font-semibold mb-2`}
                                    >
                                        Key Features:
                                    </h4>
                                    <ul className="space-y-2">
                                        {project.highlights.map(
                                            (highlight, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-start"
                                                >
                                                    <span
                                                        className={`inline-block w-2 h-2 rounded-full bg-${project.color}-500 mt-1.5 mr-2`}
                                                    ></span>
                                                    <span className="text-gray-300">
                                                        {highlight}
                                                    </span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}

                            {/* Technologies used */}
                            <div>
                                <h4
                                    className={`text-${project.color}-400 font-semibold mb-2`}
                                >
                                    Technologies Used:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map(
                                        (tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className={`px-3 py-1.5 bg-dark-900 text-${project.color}-400 rounded-lg text-xs font-medium border border-${project.color}-500/20 hover:border-${project.color}-500/40 transition-colors duration-300`}
                                            >
                                                {tech}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Project links */}
                            <div className="flex space-x-4 pt-2">
                                <a
                                    href={project.demoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`px-4 py-2 bg-gradient-to-r from-${project.color}-600 to-${project.color}-500 text-white rounded-lg flex items-center transition-all duration-300 hover:shadow-lg hover:shadow-${project.color}-500/20 hover:-translate-y-1`}
                                >
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
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                    View Demo
                                </a>
                                <a
                                    href={project.codeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`px-4 py-2 border border-${project.color}-500/30 text-${project.color}-400 rounded-lg flex items-center transition-all duration-300 hover:border-${project.color}-500/60 hover:bg-${project.color}-500/10 hover:-translate-y-1`}
                                >
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
                                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                        />
                                    </svg>
                                    View Code
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Additional project details */}
                    <div className="mt-8 pt-6 border-t border-dark-700">
                        <h4 className="text-xl font-semibold text-white mb-4">
                            Project Overview
                        </h4>
                        {project.overview ? (
                            project.overview.map((paragraph, idx) => (
                                <p
                                    key={idx}
                                    className="text-gray-300 leading-relaxed mb-4"
                                >
                                    {paragraph}
                                </p>
                            ))
                        ) : (
                            <>
                                <p className="text-gray-300 leading-relaxed mb-4">
                                    This project demonstrates my ability to
                                    build complex applications with modern
                                    technologies. It showcases my skills in
                                    frontend development, backend integration,
                                    and creating intuitive user experiences.
                                </p>
                                <p className="text-gray-300 leading-relaxed">
                                    The development process involved careful
                                    planning, iterative implementation, and
                                    thorough testing to ensure a high-quality
                                    final product that meets user needs and
                                    provides a seamless experience.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectModal
