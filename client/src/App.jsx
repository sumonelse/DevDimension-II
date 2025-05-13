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
import BrandLoader from "./components/BrandLoader"
import DimensionTrigger from "./components/DimensionTrigger"
import SEO from "./components/SEO"
import CustomCursor from "./components/CustomCursor"
import BrandStyleGuide from "./components/BrandStyleGuide"
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
const SpiderversePostCredit = lazy(() =>
    import("./components/SpiderversePostCredit")
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
                        : "Sumit Maurya | Full-Stack Developer & Problem Solver"
                }
                description="Full-Stack Developer with a passion for competitive programming, algorithmic thinking, and efficient problem-solving."
                keywords="developer, portfolio, full-stack, competitive programming, web development, algorithms, problem-solving"
            />

            {/* Custom Cursor - only in normal mode */}
            {!isSpiderVerse && <CustomCursor />}

            {/* Loading screen - different loaders based on dimension */}
            {isSpiderVerse ? (
                <SpiderverseLoader
                    isLoading={isLoading}
                    setIsLoaded={setIsLoaded}
                />
            ) : (
                <BrandLoader isLoading={isLoading} setIsLoaded={setIsLoaded} />
            )}

            {/* Main app content */}
            {!isLoading && (
                <div
                    className={`min-h-screen text-white transition-colors duration-500 ${
                        isTransitioning ? "dimension-transition" : ""
                    } ${
                        !isSpiderVerse
                            ? "bg-main-gradient gradient-overlay"
                            : ""
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
                            {/* Background pattern similar to Contact section */}
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMHYyaC0ydi0yaDJ6bTIgMGgydjJoLTJ2LTJ6bS02IDBoMnYyaC0ydi0yem0yLTRoMnYyaC0ydi0yem0yIDBIMzZ2Mmgtc3YtMnptMC00aDJ2MmgtMnYtMnptMiAwaDJ2MmgtMnYtMnptMi00aDJ2MmgtMnYtMnptMCAwaDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>

                            {/* Animated gradient blobs with increased size and opacity */}
                            <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
                            <div
                                className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse-slow"
                                style={{ animationDelay: "1s" }}
                            ></div>
                            <div
                                className="absolute top-1/3 left-1/4 w-[30rem] h-[30rem] bg-pink-500/30 rounded-full blur-3xl animate-pulse-slow"
                                style={{ animationDelay: "2s" }}
                            ></div>
                            <div
                                className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-amber-500/30 rounded-full blur-3xl animate-pulse-slow"
                                style={{ animationDelay: "1.5s" }}
                            ></div>

                            {/* Cyan glow in bottom right corner like in Contact section */}
                            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-cyan-500/10 rounded-tl-full blur-3xl"></div>

                            {/* Interactive particles background similar to Contact section */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full animate-float opacity-70"></div>
                                <div
                                    className="absolute top-3/4 left-1/3 w-3 h-3 bg-cyan-500 rounded-full animate-float-slow opacity-60"
                                    style={{ animationDelay: "1s" }}
                                ></div>
                                <div
                                    className="absolute top-1/2 right-1/4 w-2 h-2 bg-pink-500 rounded-full animate-float-slow opacity-70"
                                    style={{ animationDelay: "2s" }}
                                ></div>
                                <div
                                    className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-blue-500 rounded-full animate-float opacity-60"
                                    style={{ animationDelay: "0.5s" }}
                                ></div>
                                <div
                                    className="absolute top-1/3 right-1/2 w-1 h-1 bg-yellow-500 rounded-full animate-float-slow opacity-80"
                                    style={{ animationDelay: "1.5s" }}
                                ></div>
                            </div>
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

                    {/* Post-credit scene */}
                    <Suspense fallback={null}>
                        <SpiderversePostCredit />
                    </Suspense>

                    {/* Brand Style Guide */}
                    {!isSpiderVerse && <BrandStyleGuide />}
                </div>
            )}
        </>
    )
}

export default App
