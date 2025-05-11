import React, { useEffect, useRef, useState } from "react"
import { useDimension } from "../context/DimensionContext"
import SpiderverseCard from "./SpiderverseCard"
import SoundEffect from "./SoundEffect"

const SpiderverseProjectModal = ({ project, isOpen, onClose }) => {
    const modalRef = useRef(null)
    const { activateSpiderSense } = useDimension()
    const [currentPanel, setCurrentPanel] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

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

            // Play sound effect if not muted
            if (!isMuted && window.spiderverseAudio) {
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

    // Toggle mute state
    const toggleMute = () => {
        setIsMuted((prev) => !prev)

        // If we're unmuting, play a sound to confirm audio is working
        if (isMuted && window.spiderverseAudio) {
            setTimeout(() => {
                window.spiderverseAudio.playClick()
            }, 100)
        }
    }

    // Play sound if not muted
    const playSound = (soundType) => {
        if (isMuted || !window.spiderverseAudio) return

        switch (soundType) {
            case "click":
                window.spiderverseAudio.playClick()
                break
            case "hover":
                window.spiderverseAudio.playHover()
                break
            case "webshoot":
                window.spiderverseAudio.playWebShoot()
                break
            default:
                window.spiderverseAudio.playClick()
        }
    }

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
        playSound("click")
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
        playSound("click")
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
                className="w-full max-w-5xl max-h-[90vh] flex flex-col comic-border bg-white relative"
                style={{
                    boxShadow:
                        "0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3)",
                }}
            >
                {/* Comic book header */}
                <div className="bg-gradient-to-r from-spiderverse-red via-spiderverse-blue to-spiderverse-red text-white p-2 sm:p-3 md:p-4 flex justify-between items-center comic-border-bottom relative overflow-hidden">
                    {/* Ben-Day dots overlay */}
                    <div className="absolute inset-0 benday-dots opacity-30"></div>

                    {/* Title with comic font */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-['Bangers'] tracking-wider relative z-10 flex items-center">
                        <span className="mr-2">{project.title}</span>
                        <SoundEffect
                            text="WOW!"
                            color="yellow"
                            size="small"
                            rotation={-5}
                            className="hidden sm:block"
                        />
                    </h2>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1 sm:gap-2 relative z-10">
                        {/* Mute/Unmute button */}
                        <button
                            onClick={toggleMute}
                            className="relative z-10 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white text-spiderverse-blue flex items-center justify-center border-2 border-black transform transition-transform hover:scale-110"
                            aria-label={
                                isMuted ? "Unmute sounds" : "Mute sounds"
                            }
                            title={isMuted ? "Unmute sounds" : "Mute sounds"}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                {isMuted ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.536 8.464a5 5 0 010 7.072M12 6a7.975 7.975 0 015.657 2.343m0 0a9.99 9.99 0 011.414 1.414M12 6a7.975 7.975 0 00-5.657 2.343m0 0a9.99 9.99 0 00-1.414 1.414M12 6c-2.583 0-4.824 1.22-6.243 3.122m0 0A9.925 9.925 0 004 12c0 .998.146 1.962.418 2.878M12 6a9.925 9.925 0 00-6.243 5.878M12 6c2.583 0 4.824 1.22 6.243 3.122m0 0A9.925 9.925 0 0120 12c0 .998-.146 1.962-.418 2.878m-6.243-3.122a9.925 9.925 0 00-6.243 5.878M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                                    />
                                )}
                            </svg>
                        </button>

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="relative z-10 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white text-spiderverse-red flex items-center justify-center border-2 border-black transform transition-transform hover:scale-110"
                            aria-label="Close modal"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
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
                </div>

                {/* Comic book content */}
                <div className="p-3 sm:p-4 md:p-6 bg-white flex-1 overflow-y-auto comic-scrollbar">
                    {/* Comic panels navigation - scrollable */}
                    <div className="border-b-2 border-black pb-2 mb-6">
                        {/* Tabs container */}
                        <div className="overflow-x-auto scrollbar-hide md:comic-scrollbar relative">
                            {/* Scroll indicator for mobile */}
                            <div className="absolute -bottom-6 left-0 right-0 flex justify-center md:hidden">
                                <div className="text-xs text-gray-500 animate-pulse">
                                    ← swipe tabs →
                                </div>
                            </div>

                            <div className="flex whitespace-nowrap min-w-max">
                                {comicPanels.map((panel, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setCurrentPanel(index)
                                            if (window.spiderverseAudio)
                                                window.spiderverseAudio.playClick()
                                        }}
                                        className={`px-3 sm:px-4 py-2 font-['Comic_Neue'] font-bold text-sm sm:text-lg transition-all mx-1 first:ml-0 last:mr-0 ${
                                            currentPanel === index
                                                ? `bg-${projectColor} text-white comic-border transform -rotate-1`
                                                : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        {panel.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mobile indicator - shows which tab is active */}
                        <div className="flex justify-center md:hidden mt-2">
                            <div className="flex items-center space-x-1">
                                {comicPanels.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setCurrentPanel(index)
                                            if (window.spiderverseAudio)
                                                window.spiderverseAudio.playClick()
                                        }}
                                        className={`w-2 h-2 rounded-full transition-all ${
                                            currentPanel === index
                                                ? `w-4 bg-${projectColor}`
                                                : "bg-gray-300 hover:bg-gray-400"
                                        }`}
                                        aria-label={`Go to panel ${index + 1}`}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Panel content with animation */}
                    <div
                        className={`transition-opacity duration-300 pb-16 ${
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
                            <div className="comic-panel p-4 sm:p-6 relative">
                                <h3 className="font-['Bangers'] text-xl sm:text-2xl mb-4 sm:mb-6 text-center text-black">
                                    Check Out The Project
                                </h3>

                                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                                    <a
                                        href={project.demoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="spidey-button bg-spiderverse-red text-white w-full sm:w-auto text-center"
                                        onClick={() => activateSpiderSense()}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-1 sm:h-6 sm:w-6 sm:mr-2"
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
                                        <span className="text-sm sm:text-base">
                                            View Live Demo
                                        </span>
                                    </a>

                                    <a
                                        href={project.codeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="spidey-button bg-spiderverse-blue text-white w-full sm:w-auto text-center"
                                        onClick={() => activateSpiderSense()}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-1 sm:h-6 sm:w-6 sm:mr-2"
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
                                        <span className="text-sm sm:text-base">
                                            View Source Code
                                        </span>
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

                    {/* Navigation buttons - sticky at the bottom */}
                    <div className="sticky bottom-0 bg-white pt-4 pb-2 border-t border-gray-200 flex justify-between items-center mt-6">
                        <button
                            onClick={prevPanel}
                            disabled={currentPanel === 0}
                            className={`spidey-button py-2 px-3 sm:px-4 ${
                                currentPanel === 0
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 sm:h-6 sm:w-6 mr-1 sm:mr-2"
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
                            <span className="text-sm sm:text-base">Prev</span>
                        </button>

                        <div className="flex items-center">
                            {comicPanels.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentPanel(index)
                                        if (window.spiderverseAudio)
                                            window.spiderverseAudio.playClick()
                                    }}
                                    className={`w-2 h-2 sm:w-3 sm:h-3 mx-1 rounded-full transition-all ${
                                        currentPanel === index
                                            ? `bg-${projectColor} transform scale-125`
                                            : "bg-gray-300 hover:bg-gray-400"
                                    }`}
                                    aria-label={`Go to panel ${index + 1}`}
                                ></button>
                            ))}
                        </div>

                        <button
                            onClick={nextPanel}
                            disabled={currentPanel === comicPanels.length - 1}
                            className={`spidey-button py-2 px-3 sm:px-4 ${
                                currentPanel === comicPanels.length - 1
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                        >
                            <span className="text-sm sm:text-base">Next</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 sm:h-6 sm:w-6 ml-1 sm:ml-2"
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
