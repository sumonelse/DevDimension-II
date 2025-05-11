import React, { useEffect, useState, lazy, Suspense } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import FloatingControls from "./components/FloatingControls"
import DimensionTransition from "./components/DimensionTransition"
import SpiderverseLoader from "./components/SpiderverseLoader"
import DimensionTrigger from "./components/DimensionTrigger"
import SEO from "./components/SEO"
import { useDimension } from "./context/DimensionContext"
import useScrollReveal from "./hooks/useScrollReveal"

// Lazy load Spiderverse components
const SpiderverseNavbar = lazy(() => import("./components/SpiderverseNavbar"))
const SpiderverseHero = lazy(() => import("./components/SpiderverseHero"))
const SpiderverseAbout = lazy(() => import("./components/SpiderverseAbout"))
const SpiderverseSkills = lazy(() => import("./components/SpiderverseSkills"))
const SpiderverseProjects = lazy(() =>
    import("./components/SpiderverseProjects")
)
const SpiderverseContact = lazy(() => import("./components/SpiderverseContact"))
const SpiderverseFooter = lazy(() => import("./components/SpiderverseFooter"))
const SpiderverseBackground = lazy(() =>
    import("./components/SpiderverseBackground")
)
const SpiderverseCursor = lazy(() => import("./components/SpiderverseCursor"))
const PageTurnEffect = lazy(() => import("./components/PageTurnEffect"))
const FloatingComicPanels = lazy(() =>
    import("./components/FloatingComicPanels")
)
const SpiderverseAudio = lazy(() => import("./components/SpiderverseAudio"))
const MultiverseEasterEgg = lazy(() =>
    import("./components/MultiverseEasterEgg")
)

const App = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)
    const { isSpiderVerse, isTransitioning, toggleDimension } = useDimension()

    // Handle initial loading
    useEffect(() => {
        // Measure actual loading time instead of arbitrary delay
        const startTime = performance.now()

        // Check if all critical resources are loaded
        window.addEventListener("load", () => {
            const loadTime = performance.now() - startTime
            // Ensure minimum loading time of 1 second for visual feedback
            // but don't make users wait unnecessarily long
            const minLoadingTime = 1000
            const timeToWait = Math.max(0, minLoadingTime - loadTime)

            setTimeout(() => {
                setIsLoading(false)
            }, timeToWait)
        })

        // Fallback in case load event doesn't fire
        setTimeout(() => {
            setIsLoading(false)
        }, 2000) // Reduced from 3 seconds to 2 seconds
    }, [])

    // Use the scroll reveal hook

    // Use the custom hook for scroll animations
    useScrollReveal({
        selector: ".reveal",
        threshold: 150,
        activeClass: "active",
    })

    // Set loaded state for initial animations
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true)
        }, 300)
    }, [])

    // Dispatch dimension change event when dimension changes
    useEffect(() => {
        const event = new CustomEvent("dimensionChange", {
            detail: { isSpiderVerse },
        })
        window.dispatchEvent(event)
    }, [isSpiderVerse])

    return (
        <>
            {/* SEO Component */}
            <SEO
                title={
                    isSpiderVerse
                        ? "Sumit Maurya | Spider-Verse Portfolio"
                        : "Sumit Maurya | Portfolio"
                }
                description="Full-Stack Developer with a passion for competitive programming, algorithmic thinking, and efficient problem-solving."
                keywords="developer, portfolio, full-stack, competitive programming, web development, algorithms, problem-solving"
            />

            {/* Loading screen */}
            <SpiderverseLoader
                isLoading={isLoading}
                setIsLoaded={setIsLoaded}
            />

            {/* Main app content */}
            {!isLoading && (
                <div
                    className={`min-h-screen text-white transition-colors duration-500 ${
                        isTransitioning ? "dimension-transition" : ""
                    }`}
                >
                    {/* Background based on current dimension */}
                    {isSpiderVerse ? (
                        <Suspense
                            fallback={
                                <div className="fixed inset-0 z-0 bg-black"></div>
                            }
                        >
                            <SpiderverseBackground />
                            <FloatingComicPanels />
                        </Suspense>
                    ) : (
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
                    )}

                    {/* Dimension transition effect */}
                    <DimensionTransition />

                    {/* Page turn effect */}
                    <Suspense fallback={null}>
                        <PageTurnEffect />
                    </Suspense>

                    {/* Spider-Verse cursor */}
                    <Suspense fallback={null}>
                        <SpiderverseCursor />
                    </Suspense>

                    {/* Spider-Verse audio effects */}
                    <Suspense fallback={null}>
                        <SpiderverseAudio />
                    </Suspense>

                    {/* Main content with fade-in effect */}
                    <div
                        className={`relative z-10 transition-opacity duration-1000 ${
                            isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        {isSpiderVerse ? (
                            <Suspense
                                fallback={
                                    <div className="h-16 w-full bg-black/50 backdrop-blur-md fixed top-0 left-0 z-50"></div>
                                }
                            >
                                <SpiderverseNavbar />
                            </Suspense>
                        ) : (
                            <Navbar />
                        )}

                        {/* Conditional rendering based on dimension */}
                        {isSpiderVerse ? (
                            <Suspense
                                fallback={
                                    <div className="min-h-screen flex items-center justify-center">
                                        Loading Spiderverse...
                                    </div>
                                }
                            >
                                <SpiderverseHero />
                                <SpiderverseAbout />
                                <SpiderverseSkills />
                                <SpiderverseProjects />
                                <SpiderverseContact />
                                <SpiderverseFooter />
                            </Suspense>
                        ) : (
                            <>
                                <Hero />
                                <About />
                                <Skills />
                                <Projects />
                                <Contact />
                                <Footer />
                            </>
                        )}

                        <FloatingControls />
                    </div>

                    {/* Standalone Dimension Trigger Button */}
                    <DimensionTrigger />

                    {/* Easter egg */}
                    <Suspense fallback={null}>
                        <MultiverseEasterEgg />
                    </Suspense>
                </div>
            )}
        </>
    )
}

export default App
