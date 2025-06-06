import React, { useState, useEffect } from "react"

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("hero")
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)

    // Add entrance animation when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true)
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // Hide navbar on scroll down, show on scroll up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }

            // Update navbar background
            if (currentScrollY > 50) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }

            // Update active section
            const sections = ["hero", "about", "skills", "projects", "contact"]
            const scrollPosition = currentScrollY + 100

            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const offsetTop = element.offsetTop
                    const offsetHeight = element.offsetHeight

                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(section)
                        break
                    }
                }
            }

            setLastScrollY(currentScrollY)
        }

        // Close mobile menu when scrolling
        if (isMenuOpen) {
            window.addEventListener("scroll", () => setIsMenuOpen(false))
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("scroll", () => setIsMenuOpen(false))
        }
    }, [lastScrollY, isMenuOpen])

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest("nav")) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isMenuOpen])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const navLinks = [
        { href: "#about", label: "About" },
        { href: "#skills", label: "Skills" },
        // { href: "#competitive-programming", label: "CP Skills" },
        { href: "#projects", label: "Projects" },
        { href: "#contact", label: "Contact" },
    ]

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-700 ${
                isScrolled
                    ? "glass-dark py-2 sm:py-3 shadow-lg"
                    : "bg-transparent py-3 sm:py-5"
            } ${isVisible ? "translate-y-0" : "-translate-y-full"} ${
                isMenuOpen ? "h-screen md:h-auto" : ""
            } ${isLoaded ? "opacity-100" : "opacity-0 -translate-y-4"}`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center">
                    <a
                        href="#hero"
                        className={`text-xl sm:text-2xl font-bold font-heading flex items-center group relative ${
                            isLoaded ? "animate-fade-in" : "opacity-0"
                        }`}
                        style={{ animationFillMode: "forwards" }}
                        aria-label="Home"
                    >
                        {/* Animated glow effect */}
                        <span className="absolute -inset-1 bg-gradient-purple opacity-0 group-hover:opacity-20 rounded-full blur-md transition-opacity duration-500"></span>

                        {/* Logo text with animated gradient */}
                        <span className="text-gradient-purple transition-all duration-500 group-hover:text-gradient-cyan relative font-heading">
                            SM
                        </span>
                        <span className="text-purple-400 group-hover:text-cyan-400 transition-colors duration-500 relative font-heading">
                            .
                        </span>

                        {/* Animated dot that follows on hover */}
                        <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-gradient-purple rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150 group-hover:shadow-neon"></span>
                    </a>

                    {/* Enhanced Cinematic mobile menu button */}
                    <button
                        className="md:hidden focus:outline-none transition-all duration-500 hover:scale-110 p-3 rounded-full hover:bg-purple-500/20 relative overflow-hidden group"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {/* Animated background effect */}
                        <span className="absolute inset-0 w-full h-full bg-gradient-purple opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full"></span>

                        {/* Animated ring */}
                        <span
                            className={`absolute inset-0 w-full h-full rounded-full ${
                                isMenuOpen ? "animate-ping" : ""
                            } opacity-0 border border-purple-500 scale-0 group-hover:scale-100 group-hover:opacity-30 transition-all duration-500`}
                        ></span>

                        {/* Enhanced hamburger icon with better touch target */}
                        <div className="relative w-7 h-7">
                            <span
                                className={`absolute h-0.5 w-7 bg-gradient-purple transform transition-all duration-500 ${
                                    isMenuOpen
                                        ? "rotate-45 top-3 shadow-neon"
                                        : "rotate-0 top-1.5"
                                }`}
                            ></span>
                            <span
                                className={`absolute h-0.5 w-7 bg-gradient-cyan top-3 transition-all duration-500 ${
                                    isMenuOpen ? "opacity-0 w-0" : "opacity-100"
                                }`}
                            ></span>
                            <span
                                className={`absolute h-0.5 w-7 bg-gradient-purple transform transition-all duration-500 ${
                                    isMenuOpen
                                        ? "-rotate-45 top-3 shadow-neon"
                                        : "rotate-0 top-4.5"
                                }`}
                            ></span>
                        </div>
                    </button>

                    {/* Enhanced Cinematic Desktop menu */}
                    <div className="hidden md:flex md:space-x-3 lg:space-x-6">
                        {navLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                target={link.isExternal ? "_blank" : undefined}
                                rel={
                                    link.isExternal
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                                className={`relative px-2 lg:px-3 py-2 font-medium transition-all duration-500 group overflow-hidden ${
                                    !link.isExternal &&
                                    activeSection === link.href.substring(1)
                                        ? "text-purple-400"
                                        : "hover:text-purple-400"
                                } ${
                                    link.isExternal ? "flex items-center" : ""
                                }`}
                                style={{
                                    animationDelay: `${index * 100 + 200}ms`,
                                }}
                                aria-label={link.label}
                            >
                                {/* Text with staggered entrance animation */}
                                <span
                                    className={`relative z-10 ${
                                        isLoaded
                                            ? "animate-fade-in"
                                            : "opacity-0"
                                    }`}
                                    style={{
                                        animationDelay: `${
                                            index * 100 + 200
                                        }ms`,
                                        animationFillMode: "forwards",
                                    }}
                                >
                                    {link.label}
                                </span>

                                {/* External link icon */}
                                {link.isExternal && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3.5 w-3.5 ml-1 relative z-10 transition-transform duration-300 group-hover:translate-y-[-2px] group-hover:translate-x-[2px]"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                )}

                                {/* Animated underline */}
                                <span
                                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-purple transform origin-left transition-transform duration-500 ${
                                        !link.isExternal &&
                                        activeSection === link.href.substring(1)
                                            ? "scale-x-100"
                                            : "scale-x-0 group-hover:scale-x-100"
                                    }`}
                                    aria-hidden="true"
                                ></span>

                                {/* Hover effect background */}
                                <span
                                    className="absolute inset-0 w-full h-full bg-purple-500/10 scale-0 group-hover:scale-100 rounded-lg transition-transform duration-500"
                                    aria-hidden="true"
                                ></span>

                                {/* Active indicator dot */}
                                {!link.isExternal &&
                                    activeSection ===
                                        link.href.substring(1) && (
                                        <span
                                            className="absolute -right-1 -top-1 w-1.5 h-1.5 bg-purple-400 rounded-full"
                                            aria-hidden="true"
                                        ></span>
                                    )}
                            </a>
                        ))}
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-4 lg:px-5 py-2 bg-gradient-purple text-white rounded-full shadow-sm hover:shadow-neon transition-all duration-500 hover:-translate-y-1 hover:scale-105 group relative overflow-hidden ${
                                isLoaded ? "animate-fade-in" : "opacity-0"
                            }`}
                            style={{
                                animationDelay: `${
                                    navLinks.length * 100 + 200
                                }ms`,
                                animationFillMode: "forwards",
                            }}
                            aria-label="Download Resume"
                        >
                            {/* Animated glow effect */}
                            <span
                                className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                                aria-hidden="true"
                            ></span>

                            <span className="flex items-center relative z-10">
                                <span className="md:hidden lg:inline">
                                    Resume
                                </span>
                                <span className="hidden md:inline lg:hidden">
                                    CV
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 ml-1.5 transition-transform duration-500 group-hover:translate-x-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>

                {/* Mobile menu - Enhanced Cinematic version */}
                <div
                    className={`md:hidden fixed left-0 right-0 transition-all duration-500 ease-in-out ${
                        isMenuOpen
                            ? "opacity-100 top-[72px] h-[calc(100vh-72px)] z-50"
                            : "opacity-0 top-[72px] h-0 pointer-events-none"
                    }`}
                >
                    <div className="glass-dark h-full backdrop-blur-xl p-6 flex flex-col justify-center overflow-hidden relative">
                        {/* Animated background elements */}
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl animate-pulse-slow -translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl animate-pulse-slow translate-x-1/2 translate-y-1/2"></div>
                            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500 rounded-full filter blur-3xl animate-float -translate-x-1/2 -translate-y-1/2"></div>
                        </div>

                        {/* Menu items with staggered animation - Enhanced for mobile */}
                        <div className="flex flex-col space-y-6 items-center relative z-10">
                            {navLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className={`text-xl sm:text-2xl font-medium relative group transition-all duration-500 transform ${
                                        isMenuOpen ? "animate-slide-up" : ""
                                    } opacity-0 ${
                                        activeSection === link.href.substring(1)
                                            ? "text-purple-400"
                                            : "hover:text-purple-400"
                                    } w-full text-center py-3`}
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                        animationFillMode: "forwards",
                                    }}
                                    onClick={toggleMenu}
                                    aria-label={link.label}
                                >
                                    <div className="relative inline-block">
                                        {link.label}
                                        <span
                                            className={`absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-purple transform origin-left transition-transform duration-500 ${
                                                activeSection ===
                                                link.href.substring(1)
                                                    ? "scale-x-100"
                                                    : "scale-x-0 group-hover:scale-x-100"
                                            }`}
                                        ></span>
                                    </div>
                                </a>
                            ))}
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 px-8 py-3 bg-gradient-purple text-white rounded-lg shadow-neon transition-all duration-500 hover:scale-110 transform opacity-0 animate-slide-up group w-4/5 text-center"
                                style={{
                                    animationDelay: `${
                                        navLinks.length * 100
                                    }ms`,
                                    animationFillMode: "forwards",
                                }}
                                onClick={toggleMenu}
                                aria-label="Download Resume"
                            >
                                <span className="flex items-center justify-center text-lg">
                                    Resume
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 ml-2 transition-transform duration-500 group-hover:translate-x-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
