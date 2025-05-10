import React, { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import ThemeToggle from "./components/ThemeToggle"
import ScrollToTop from "./components/ScrollToTop"
import AnimatedBackground from "./components/AnimatedBackground"
import CompetitiveProgramming from "./components/CompetitiveProgramming"

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false)

    // Reveal elements on scroll
    useEffect(() => {
        const handleScroll = () => {
            const reveals = document.querySelectorAll(".reveal")

            for (let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight
                const elementTop = reveals[i].getBoundingClientRect().top
                const elementVisible = 150

                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add("active")
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        // Trigger once on load
        handleScroll()

        // Set loaded state for initial animations
        setTimeout(() => {
            setIsLoaded(true)
        }, 300)

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="min-h-screen text-white transition-colors duration-500">
            {/* Enhanced background effects */}
            <div className="fixed inset-0 z-0 transition-opacity duration-1000">
                {/* Animated gradient blobs */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
                <div
                    className="absolute bottom-20 left-10 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow"
                    style={{ animationDelay: "2s" }}
                ></div>
                <div
                    className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl animate-pulse-slow"
                    style={{ animationDelay: "1.5s" }}
                ></div>
            </div>

            {/* Interactive grid background */}
            {/* <AnimatedBackground /> */}

            {/* Main content with fade-in effect */}
            <div
                className={`relative z-10 transition-opacity duration-1000 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                }`}
            >
                <Navbar />
                <Hero />
                <About />
                <Skills />
                {/* <CompetitiveProgramming /> */}
                <Projects />
                <Contact />
                <Footer />
                <ThemeToggle />
                <ScrollToTop />
            </div>
        </div>
    )
}

export default App
