import React, { useEffect } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

const App = () => {
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

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="min-h-screen bg-dark-950 text-white">
            {/* Background particles */}
            <div className="fixed inset-0 z-0 opacity-30">
                <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
                <Navbar />
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
                <Footer />
            </div>
        </div>
    )
}

export default App
