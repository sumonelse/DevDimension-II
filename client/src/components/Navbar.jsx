import React, { useState, useEffect } from "react"

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("hero")

    useEffect(() => {
        const handleScroll = () => {
            // Update navbar background
            if (window.scrollY > 50) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }

            // Update active section
            const sections = ["hero", "about", "skills", "projects", "contact"]
            const scrollPosition = window.scrollY + 100

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
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const navLinks = [
        { href: "#about", label: "About" },
        { href: "#skills", label: "Skills" },
        { href: "#projects", label: "Projects" },
        { href: "#contact", label: "Contact" },
    ]

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-500 ${
                isScrolled ? "glass-dark py-3 shadow-lg" : "bg-transparent py-5"
            }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center">
                    <a
                        href="#hero"
                        className="text-2xl font-bold font-heading flex items-center group"
                    >
                        <span className="text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-purple">
                            SM
                        </span>
                        <span className="text-purple-400 group-hover:text-cyan-400 transition-colors duration-300">
                            .
                        </span>
                    </a>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-white focus:outline-none transition-transform duration-300 hover:scale-110"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <div className="relative w-6 h-6">
                            <span
                                className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ${
                                    isMenuOpen
                                        ? "rotate-45 top-3"
                                        : "rotate-0 top-1"
                                }`}
                            ></span>
                            <span
                                className={`absolute h-0.5 w-6 bg-white top-3 transition-all duration-300 ${
                                    isMenuOpen ? "opacity-0" : "opacity-100"
                                }`}
                            ></span>
                            <span
                                className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ${
                                    isMenuOpen
                                        ? "-rotate-45 top-3"
                                        : "rotate-0 top-5"
                                }`}
                            ></span>
                        </div>
                    </button>

                    {/* Desktop menu */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className={`relative px-2 py-1 font-medium transition-all duration-300 ${
                                    activeSection === link.href.substring(1)
                                        ? "text-purple-400"
                                        : "text-white hover:text-purple-300"
                                }`}
                            >
                                {link.label}
                                <span
                                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-purple transform origin-left transition-transform duration-300 ${
                                        activeSection === link.href.substring(1)
                                            ? "scale-x-100"
                                            : "scale-x-0 group-hover:scale-x-100"
                                    }`}
                                ></span>
                            </a>
                        ))}
                        <a
                            href="#contact"
                            className="px-4 py-1.5 bg-gradient-purple text-white rounded-full hover:shadow-neon transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Let's Talk
                        </a>
                    </div>
                </div>

                {/* Mobile menu */}
                <div
                    className={`md:hidden mt-4 overflow-hidden transition-all duration-500 ease-in-out ${
                        isMenuOpen
                            ? "max-h-64 opacity-100"
                            : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="glass rounded-xl p-4 shadow-lg">
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className={`text-lg font-medium transition-colors duration-300 ${
                                        activeSection === link.href.substring(1)
                                            ? "text-purple-400"
                                            : "text-white hover:text-purple-300"
                                    }`}
                                    onClick={toggleMenu}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                className="text-center py-2 bg-gradient-purple text-white rounded-lg hover:shadow-neon transition-all duration-300"
                                onClick={toggleMenu}
                            >
                                Let's Talk
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
