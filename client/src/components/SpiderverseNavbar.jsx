import React, { useState, useEffect } from "react"
import { useDimension } from "../context/DimensionContext"

const SpiderverseNavbar = () => {
    const { isAudioMuted, toggleAudioMute } = useDimension()
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState("hero")
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Handle scroll events
    useEffect(() => {
        const handleScroll = () => {
            // Update navbar style on scroll
            setIsScrolled(window.scrollY > 50)

            // Update active section based on scroll position
            const sections = document.querySelectorAll("section[id]")
            const scrollPosition = window.scrollY + 100

            sections.forEach((section) => {
                const sectionTop = section.offsetTop
                const sectionHeight = section.offsetHeight
                const sectionId = section.getAttribute("id")

                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition < sectionTop + sectionHeight
                ) {
                    setActiveSection(sectionId)
                }
            })
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Navigation links
    const navLinks = [
        { name: "Home", href: "#hero" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ]

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
                isScrolled
                    ? "py-2 bg-white text-black shadow-lg"
                    : "py-4 bg-transparent text-white"
            }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <a
                        href="#hero"
                        className="flex items-center space-x-2"
                        onClick={() => setActiveSection("hero")}
                    >
                        <div
                            className={`comic-border p-2 rounded-full ${
                                isScrolled ? "bg-spiderverse-red" : "bg-white"
                            }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-6 w-6 ${
                                    isScrolled ? "text-white" : "text-black"
                                }`}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 2v20M2 12h20M2.63 2.63l18.74 18.74M21.37 2.63L2.63 21.37" />
                                <circle cx="12" cy="12" r="6" />
                                <circle cx="12" cy="12" r="2" />
                            </svg>
                        </div>
                        <span
                            className={`font-['Bangers'] text-2xl ${
                                isScrolled
                                    ? "text-spiderverse-red"
                                    : "text-white"
                            }`}
                        >
                            Sumit Maurya
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`px-4 py-2 font-['Comic_Neue'] font-bold transition-all duration-300 relative ${
                                    activeSection === link.href.substring(1)
                                        ? isScrolled
                                            ? "text-spiderverse-red"
                                            : "text-white"
                                        : isScrolled
                                        ? "text-black hover:text-spiderverse-red"
                                        : "text-white/80 hover:text-white"
                                }`}
                                style={{
                                    transform: `rotate(${
                                        index % 2 === 0 ? "-1" : "1"
                                    }deg)`,
                                }}
                                onClick={() =>
                                    setActiveSection(link.href.substring(1))
                                }
                            >
                                {link.name}
                                {activeSection === link.href.substring(1) && (
                                    <span className="absolute bottom-0 left-0 w-full h-1 bg-spiderverse-red"></span>
                                )}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-2xl focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-6 w-6 ${
                                    isScrolled ? "text-black" : "text-white"
                                }`}
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
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-6 w-6 ${
                                    isScrolled ? "text-black" : "text-white"
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`md:hidden transition-all duration-300 overflow-hidden ${
                        isMobileMenuOpen ? "max-h-60 mt-4" : "max-h-0"
                    }`}
                >
                    <div className="comic-panel bg-white p-4 flex flex-col space-y-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`px-4 py-2 font-['Comic_Neue'] font-bold ${
                                    activeSection === link.href.substring(1)
                                        ? "text-spiderverse-red"
                                        : "text-black hover:text-spiderverse-red"
                                }`}
                                onClick={() => {
                                    setActiveSection(link.href.substring(1))
                                    setIsMobileMenuOpen(false)
                                }}
                            >
                                {link.name}
                            </a>
                        ))}

                        {/* Audio Mute Toggle for Mobile */}
                        <button
                            onClick={toggleAudioMute}
                            className="flex items-center px-4 py-2 font-['Comic_Neue'] font-bold text-black hover:text-spiderverse-red"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                {isAudioMuted ? (
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
                            {isAudioMuted ? "Unmute Sounds" : "Mute Sounds"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Comic book style decorative elements */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-spiderverse-red opacity-50"></div>

            {/* Spider web in corner */}
            <div className="spider-web spider-web-corner absolute top-0 right-0 transform rotate-90 opacity-10 hidden md:block"></div>
        </nav>
    )
}

export default SpiderverseNavbar
