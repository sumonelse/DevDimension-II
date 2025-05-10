import React, { useEffect, useRef, useState } from "react"
import { useDimension } from "../context/DimensionContext"
import SpiderverseCard from "./SpiderverseCard"
import SoundEffect from "./SoundEffect"

const SpiderverseProjectModal = ({ project, isOpen, onClose }) => {
    const modalRef = useRef(null)
    const { activateSpiderSense } = useDimension()
    const [currentPanel, setCurrentPanel] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    // Define comic panels for the project
    const comicPanels = [
        { title: "Overview", type: "intro" },
        { title: "Features", type: "features" },
        { title: "Tech Stack", type: "tech" },
        { title: "Development", type: "process" },
        { title: "Links", type: "links" },
    ]

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

            // Play sound effect
            if (window.spiderverseAudio) {
                window.spiderverseAudio.playWebShoot()
            }
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

    // Navigate to next panel
    const nextPanel = () => {
        if (isAnimating) return

        setIsAnimating(true)
        setTimeout(() => {
            setCurrentPanel((prev) =>
                prev < comicPanels.length - 1 ? prev + 1 : prev
            )
            setIsAnimating(false)
        }, 300)

        // Play sound effect
        if (window.spiderverseAudio) {
            window.spiderverseAudio.playClick()
        }
    }

    // Navigate to previous panel
    const prevPanel = () => {
        if (isAnimating) return

        setIsAnimating(true)
        setTimeout(() => {
            setCurrentPanel((prev) => (prev > 0 ? prev - 1 : prev))
            setIsAnimating(false)
        }, 300)

        // Play sound effect
        if (window.spiderverseAudio) {
            window.spiderverseAudio.playClick()
        }
    }

    if (!isOpen || !project) return null

    // Get color class based on project color
    const getColorClass = (baseColor) => {
        const colorMap = {
            purple: "spiderverse-purple",
            cyan: "spiderverse-cyan",
            pink: "spiderverse-pink",
            amber: "spiderverse-yellow",
            emerald: "spiderverse-green",
        }

        return colorMap[baseColor] || "spiderverse-red"
    }

    const projectColor = getColorClass(project.color)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spiderverse-darker/90 backdrop-blur-sm transition-all duration-300">
            {/* Comic book style modal */}
            <div
                ref={modalRef}
                className="w-full max-w-5xl max-h-[90vh] overflow-hidden comic-border bg-white relative"
                style={{
                    boxShadow:
                        "0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3)",
                }}
            >
                {/* Comic book header */}
                <div className="bg-gradient-to-r from-spiderverse-red via-spiderverse-blue to-spiderverse-red text-white p-4 flex justify-between items-center comic-border-bottom relative overflow-hidden">
                    {/* Ben-Day dots overlay */}
                    <div className="absolute inset-0 benday-dots opacity-30"></div>

                    {/* Title with comic font */}
                    <h2 className="text-3xl font-['Bangers'] tracking-wider relative z-10 flex items-center">
                        <span className="mr-2">{project.title}</span>
                        <SoundEffect
                            text="WOW!"
                            color="yellow"
                            size="small"
                            rotation={-5}
                        />
                    </h2>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="relative z-10 w-10 h-10 rounded-full bg-white text-spiderverse-red flex items-center justify-center border-2 border-black transform transition-transform hover:scale-110"
                        aria-label="Close modal"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Comic book content */}
                <div className="p-6 bg-white">
                    {/* Comic panels navigation */}
                    <div className="flex mb-6 border-b-2 border-black pb-2">
                        {comicPanels.map((panel, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setCurrentPanel(index)
                                    if (window.spiderverseAudio)
                                        window.spiderverseAudio.playClick()
                                }}
                                className={`px-4 py-2 font-['Comic_Neue'] font-bold text-lg transition-all ${
                                    currentPanel === index
                                        ? `bg-${projectColor} text-white comic-border transform -rotate-1`
                                        : "text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                {panel.title}
                            </button>
                        ))}
                    </div>

                    {/* Panel content with animation */}
                    <div
                        className={`transition-opacity duration-300 ${
                            isAnimating ? "opacity-0" : "opacity-100"
                        }`}
                    >
                        {/* Panel 1: Overview */}
                        {currentPanel === 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Project image in comic style */}
                                <SpiderverseCard
                                    className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden"
                                    depth={10}
                                    rotation={-2}
                                >
                                    <div className="relative w-full h-full">
                                        <div
                                            className={`absolute inset-0 flex items-center justify-center bg-${projectColor}/10`}
                                        >
                                            <div
                                                className={`text-${projectColor} text-6xl font-['Bangers']`}
                                            >
                                                {project.title.split(" ")[0]}
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 benday-dots opacity-20"></div>
                                    </div>
                                </SpiderverseCard>

                                {/* Project description */}
                                <div className="comic-panel p-4 relative">
                                    <h3 className="font-['Bangers'] text-2xl mb-3 text-black">
                                        Project Overview
                                    </h3>
                                    <p className="font-['Comic_Neue'] text-lg leading-relaxed text-black">
                                        {project.description}
                                    </p>

                                    {/* Comic book style decorative elements */}
                                    <div className="absolute top-2 right-2 transform rotate-12 opacity-10">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 100 100"
                                            width="50"
                                            height="50"
                                        >
                                            <path
                                                d="M50,0 C55,25 75,40 100,50 C75,60 55,75 50,100 C45,75 25,60 0,50 C25,40 45,25 50,0 Z"
                                                fill={`var(--${projectColor})`}
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Panel 2: Features */}
                        {currentPanel === 1 && (
                            <div className="comic-panel p-6 relative">
                                <h3 className="font-['Bangers'] text-2xl mb-4 text-black">
                                    Key Features
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.highlights &&
                                        project.highlights.map(
                                            (highlight, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-start p-3 bg-gray-100 comic-border transform"
                                                    style={{
                                                        rotate: `${
                                                            idx % 2 === 0
                                                                ? "1"
                                                                : "-1"
                                                        }deg`,
                                                    }}
                                                >
                                                    <div
                                                        className={`flex-shrink-0 w-8 h-8 rounded-full bg-${projectColor} flex items-center justify-center text-white font-bold mr-3`}
                                                    >
                                                        {idx + 1}
                                                    </div>
                                                    <div className="font-['Comic_Neue'] text-black">
                                                        {highlight}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                </div>

                                {/* Action word */}
                                <div className="absolute -top-5 -right-5 transform rotate-12">
                                    <SoundEffect
                                        text="AMAZING!"
                                        color="red"
                                        size="medium"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Panel 3: Tech Stack */}
                        {currentPanel === 2 && (
                            <div className="comic-panel p-6 relative">
                                <h3 className="font-['Bangers'] text-2xl mb-4 text-black">
                                    Technologies Used
                                </h3>

                                <div className="flex flex-wrap gap-3">
                                    {project.technologies.map(
                                        (tech, techIndex) => (
                                            <div
                                                key={techIndex}
                                                className={`px-4 py-2 bg-${projectColor} text-white comic-border font-['Comic_Neue'] font-bold transform transition-transform hover:scale-105`}
                                                style={{
                                                    rotate: `${
                                                        (techIndex % 5) - 2
                                                    }deg`,
                                                }}
                                                onMouseEnter={() => {
                                                    if (window.spiderverseAudio)
                                                        window.spiderverseAudio.playHover()
                                                }}
                                            >
                                                {tech}
                                            </div>
                                        )
                                    )}
                                </div>

                                {/* Spider-web in corner */}
                                <div className="spider-web spider-web-corner absolute bottom-0 right-0 transform rotate-180 opacity-10"></div>
                            </div>
                        )}

                        {/* Panel 4: Development Process */}
                        {currentPanel === 3 && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="comic-panel p-4 md:col-span-2 relative">
                                    <h3 className="font-['Bangers'] text-2xl mb-3 text-black">
                                        Development Process
                                    </h3>
                                    <p className="font-['Comic_Neue'] text-lg leading-relaxed text-black">
                                        This project demonstrates my ability to
                                        build complex applications with modern
                                        technologies. It showcases my skills in
                                        frontend development, backend
                                        integration, and creating intuitive user
                                        experiences.
                                    </p>
                                    <p className="font-['Comic_Neue'] text-lg leading-relaxed text-black mt-3">
                                        The development process involved careful
                                        planning, iterative implementation, and
                                        thorough testing to ensure a
                                        high-quality final product that meets
                                        user needs and provides a seamless
                                        experience.
                                    </p>
                                </div>

                                <div className="comic-panel p-4 flex flex-col justify-center items-center">
                                    <div className="text-center">
                                        <div className="font-['Bangers'] text-xl mb-2 text-black">
                                            Development Time
                                        </div>
                                        <div className="font-['Comic_Neue'] text-4xl font-bold text-black">
                                            {Math.floor(Math.random() * 4) + 2}{" "}
                                            Weeks
                                        </div>
                                    </div>

                                    <div className="mt-6 text-center">
                                        <div className="font-['Bangers'] text-xl mb-2 text-black">
                                            Difficulty Level
                                        </div>
                                        <div className="flex">
                                            {Array.from({ length: 5 }).map(
                                                (_, i) => (
                                                    <svg
                                                        key={i}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        className={`w-6 h-6 ${
                                                            i < 3
                                                                ? `text-${projectColor}`
                                                                : "text-gray-300"
                                                        }`}
                                                        fill="currentColor"
                                                    >
                                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                    </svg>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Panel 5: Links */}
                        {currentPanel === 4 && (
                            <div className="comic-panel p-6 relative">
                                <h3 className="font-['Bangers'] text-2xl mb-6 text-center text-black">
                                    Check Out The Project
                                </h3>

                                <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                                    <a
                                        href={project.demoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="spidey-button bg-spiderverse-red text-white"
                                        onClick={() => activateSpiderSense()}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 mr-2"
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
                                        View Live Demo
                                    </a>

                                    <a
                                        href={project.codeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="spidey-button bg-spiderverse-blue text-white"
                                        onClick={() => activateSpiderSense()}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 mr-2"
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
                                        View Source Code
                                    </a>
                                </div>

                                {/* Action word */}
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <SoundEffect
                                        text="THWIP!"
                                        color="blue"
                                        size="medium"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={prevPanel}
                            disabled={currentPanel === 0}
                            className={`spidey-button ${
                                currentPanel === 0
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Previous
                        </button>

                        <div className="flex items-center">
                            {comicPanels.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-3 h-3 mx-1 rounded-full ${
                                        currentPanel === index
                                            ? `bg-${projectColor}`
                                            : "bg-gray-300"
                                    }`}
                                ></div>
                            ))}
                        </div>

                        <button
                            onClick={nextPanel}
                            disabled={currentPanel === comicPanels.length - 1}
                            className={`spidey-button ${
                                currentPanel === comicPanels.length - 1
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                        >
                            Next
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 ml-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Comic book footer */}
                <div className="bg-black text-white p-2 text-center font-['Comic_Neue'] text-sm">
                    Created by Sumit Maurya • Spider-Verse Edition •{" "}
                    {new Date().getFullYear()}
                </div>
            </div>
        </div>
    )
}

export default SpiderverseProjectModal
