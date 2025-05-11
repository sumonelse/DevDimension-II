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
                    : "py-3 bg-transparent text-white"
            }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center">
                    {/* Enhanced Logo with better mobile display */}
                    <a
                        href="#hero"
                        className="flex items-center space-x-2 group"
                        onClick={() => setActiveSection("hero")}
                    >
                        <div
                            className={`comic-border p-1.5 sm:p-2 rounded-full transition-all duration-300 ${
                                isScrolled ? "bg-spiderverse-red" : "bg-white"
                            } group-hover:scale-110`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 sm:h-6 sm:w-6 ${
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
                            className={`font-['Bangers'] text-xl sm:text-2xl transition-all duration-300 ${
                                isScrolled
                                    ? "text-spiderverse-red"
                                    : "text-white"
                            } group-hover:scale-105`}
                        >
                            Sumit Maurya
                        </span>
                    </a>

                    {/* Enhanced Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`px-3 lg:px-4 py-2 font-['Comic_Neue'] font-bold transition-all duration-300 relative group overflow-hidden ${
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
                                {/* Comic-style hover effect */}
                                <span className="absolute inset-0 bg-yellow-100 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>

                                {/* Link text */}
                                <span className="relative z-10">
                                    {link.name}
                                </span>

                                {/* Active indicator */}
                                <span
                                    className={`absolute bottom-0 left-0 w-full h-1 bg-spiderverse-red transform origin-left transition-transform duration-300 ${
                                        activeSection === link.href.substring(1)
                                            ? "scale-x-100"
                                            : "scale-x-0 group-hover:scale-x-100"
                                    }`}
                                ></span>

                                {/* Comic-style active indicator */}
                                {activeSection === link.href.substring(1) && (
                                    <span className="absolute -right-1 -top-1 w-2 h-2 bg-spiderverse-red rounded-full"></span>
                                )}
                            </a>
                        ))}
                    </div>

                    {/* Enhanced Mobile Menu Button */}
                    <button
                        className="md:hidden focus:outline-none relative p-2 rounded-full transition-all duration-300"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={
                            isMobileMenuOpen ? "Close menu" : "Open menu"
                        }
                        style={{
                            background: isMobileMenuOpen
                                ? "rgba(237, 29, 36, 0.2)"
                                : "transparent",
                        }}
                    >
                        <div
                            className={`comic-border p-1 rounded-full ${
                                isMobileMenuOpen ? "bg-spiderverse-red/20" : ""
                            }`}
                            style={{ transform: "rotate(-3deg)" }}
                        >
                            {isMobileMenuOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-7 w-7 ${
                                        isScrolled ? "text-black" : "text-white"
                                    }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-7 w-7 ${
                                        isScrolled ? "text-black" : "text-white"
                                    }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </div>
                    </button>
                </div>

                {/* Enhanced Mobile Navigation */}
                <div
                    className={`md:hidden fixed inset-x-0 transition-all duration-500 overflow-hidden z-40 ${
                        isMobileMenuOpen
                            ? "opacity-100 max-h-[80vh] mt-4"
                            : "opacity-0 max-h-0 pointer-events-none"
                    }`}
                    style={{
                        top: isMobileMenuOpen ? "70px" : "60px",
                        backdropFilter: "blur(8px)",
                    }}
                >
                    <div className="comic-panel bg-white p-6 flex flex-col space-y-4 mx-4 shadow-lg relative">
                        {/* Comic-style decorative elements */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-100 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-spiderverse-red rounded-full opacity-10 translate-y-1/3 -translate-x-1/3"></div>

                        {/* Spider web in corner */}
                        <div className="spider-web absolute top-0 left-0 w-16 h-16 opacity-10 transform -translate-x-1/4 -translate-y-1/4"></div>

                        {/* Navigation links with comic-style hover effects */}
                        <div className="relative z-10">
                            {navLinks.map((link, index) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`block px-4 py-3 font-['Comic_Neue'] font-bold text-lg relative transition-all duration-300 ${
                                        activeSection === link.href.substring(1)
                                            ? "text-spiderverse-red transform scale-105"
                                            : "text-black hover:text-spiderverse-red hover:translate-x-1"
                                    }`}
                                    style={{
                                        transform: `rotate(${
                                            index % 2 === 0 ? "-0.5" : "0.5"
                                        }deg)`,
                                    }}
                                    onClick={() => {
                                        setActiveSection(link.href.substring(1))
                                        setIsMobileMenuOpen(false)
                                    }}
                                >
                                    {/* Comic-style active indicator */}
                                    {activeSection ===
                                        link.href.substring(1) && (
                                        <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-spiderverse-red rounded-full"></span>
                                    )}

                                    <span className="inline-block">
                                        {link.name}
                                    </span>

                                    {/* Underline effect */}
                                    <span
                                        className={`block h-0.5 bg-spiderverse-red mt-1 transition-all duration-300 ${
                                            activeSection ===
                                            link.href.substring(1)
                                                ? "w-full"
                                                : "w-0 group-hover:w-full"
                                        }`}
                                    ></span>
                                </a>
                            ))}
                        </div>
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
