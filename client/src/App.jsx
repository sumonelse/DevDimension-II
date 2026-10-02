import React, { useEffect, useState, lazy, Suspense } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import FloatingControls from "./components/FloatingControls"
import DimensionTrigger from "./components/DimensionTrigger"
import SpiderverseLoader from "./components/SpiderverseLoader"
import SEO from "./components/SEO"
import CustomCursor from "./components/CustomCursor"
import DeferredSection from "./components/DeferredSection"
import { useDimension } from "./context/DimensionContext"
import useScrollReveal from "./hooks/useScrollReveal"

/* Below-the-fold sections of the normal dimension. `Contact` alone is ~39 kB
   rendered, and these five together are most of what used to sit in the entry
   chunk while being invisible on the first screen. */
const About = lazy(() => import("./components/About"))
const Skills = lazy(() => import("./components/Skills"))
const Projects = lazy(() => import("./components/Projects"))
const Contact = lazy(() => import("./components/Contact"))
const Footer = lazy(() => import("./components/Footer"))

/* Only needed on demand. */
const BrandStyleGuide = lazy(() => import("./components/BrandStyleGuide"))
const DimensionTransition = lazy(() =>
    import("./components/DimensionTransition")
)
const PageTurnEffect = lazy(() => import("./components/PageTurnEffect"))

/* Spider-Verse dimension - none of it is downloaded unless it is entered. */
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
const SpiderverseAudio = lazy(() => import("./components/SpiderverseAudio"))
const FloatingComicPanels = lazy(() =>
    import("./components/FloatingComicPanels")
)
const MultiverseEasterEgg = lazy(() =>
    import("./components/MultiverseEasterEgg")
)
const SpiderversePostCredit = lazy(() =>
    import("./components/SpiderversePostCredit")
)

const isIdle = (callback) => {
    if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(callback, { timeout: 2500 })
    } else {
        window.setTimeout(callback, 1200)
    }
}

const App = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)
    const { isSpiderVerse, isTransitioning } = useDimension()

    // Hold the loader just long enough to avoid a flash, then get out of the way.
    useEffect(() => {
        const startedAt = performance.now()

        const finish = () => {
            const elapsed = performance.now() - startedAt
            const MIN_LOADER_MS = 500
            setTimeout(() => setIsLoading(false), Math.max(0, MIN_LOADER_MS - elapsed))
        }

        if (document.readyState === "complete") {
            finish()
        } else {
            window.addEventListener("load", finish, { once: true })
            // Safety net in case the load event never arrives.
            const fallback = setTimeout(finish, 1200)
            return () => {
                clearTimeout(fallback)
                window.removeEventListener("load", finish)
            }
        }
    }, [])

    // `DimensionTransition` only becomes visible once someone clicks the
    // dimension button, but the first click should not wait on a network round
    // trip. Warm the chunk while the browser is idle.
    useEffect(() => {
        if (!isLoading) return
        isIdle(() => {
            if (document.visibilityState === "visible") {
                import("./components/DimensionTransition")
            }
        })
    }, [isLoading])

    useScrollReveal({ selector: ".reveal", threshold: 150, activeClass: "active" })

    // Drives the content fade-in.
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 300)
        return () => clearTimeout(timer)
    }, [])

    // Lets the transition effects react to a dimension change.
    useEffect(() => {
        window.dispatchEvent(
            new CustomEvent("dimensionChange", { detail: { isSpiderVerse } })
        )
    }, [isSpiderVerse])

    return (
        <>
            <SEO
                title={
                    isSpiderVerse
                        ? "Sumit Maurya | Spider-Verse Portfolio"
                        : "Sumit Maurya | Full-Stack Developer & Problem Solver"
                }
                description="Full-Stack Developer with a passion for competitive programming, algorithmic thinking, and efficient problem-solving."
                keywords="developer, portfolio, full-stack, competitive programming, web development, algorithms, problem-solving"
            />

            {!isSpiderVerse && <CustomCursor />}

            <SpiderverseLoader
                isLoading={isLoading}
                setIsLoaded={setIsLoaded}
            />

            {!isLoading && (
                <>
                    {/* First tab stop: lets keyboard users jump straight past the
                        nav, the background layers and the floating controls. */}
                    <a href="#main-content" className="skip-to-content">
                        Skip to content
                    </a>
                    <div
                    className={`min-h-screen text-white transition-colors duration-500 ${
                        isTransitioning ? "dimension-transition" : ""
                    } ${
                        !isSpiderVerse
                            ? "bg-main-gradient gradient-overlay"
                            : ""
                    }`}
                >
                    {/* Background for the active dimension */}
                    {isSpiderVerse ? (
                        <Suspense
                            fallback={<div className="fixed inset-0 z-0 bg-black" />}
                        >
                            <SpiderverseBackground />
                            <FloatingComicPanels />
                        </Suspense>
                    ) : (
                        <div className="fixed inset-0 z-0 transition-opacity duration-1000">
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGUiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMHYyaC0ydi0yaDJ6bTIgMGgydjJoLTJ2LTJ6bS02IDBoMnYyaC0ydi0yem0yLTRoMnYyaC0ydi0yem0yIDBIMzZ2Mmgtc3YtMnptMC00aDJ2MmgtMnYtMnptMiAwaDJ2MmgtMnYtMnptMi00aDJ2MmgtMnYtMnptMCAwaDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>

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

                            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-cyan-500/10 rounded-tl-full blur-3xl"></div>

                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full animate-float opacity-70"></div>
                                <div
                                    className="absolute top-3/4 left-1/3 w-3 h-3 bg-cyan-500 rounded-full animate-float-slow opacity-60"
                                    style={{ animationDelay: "1s" }}
                                ></div>
                                <div
                                    className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-blue-500 rounded-full animate-float opacity-60"
                                    style={{ animationDelay: "0.5s" }}
                                ></div>
                            </div>
                        </div>
                    )}

                    <Suspense fallback={null}>
                        <DimensionTransition />
                        <PageTurnEffect />
                    </Suspense>

                    {/* Comic cursor: only mounted in its own dimension, so it
                        never attaches pointer listeners in the normal one. */}
                    {isSpiderVerse && (
                        <Suspense fallback={null}>
                            <SpiderverseCursor />
                        </Suspense>
                    )}

                    <main
                        id="main-content"
                        tabIndex={-1}
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

                        {isSpiderVerse ? (
                            <Suspense
                                fallback={
                                    <div className="min-h-screen flex items-center justify-center">
                                        Loading Spiderverse...
                                    </div>
                                }
                            >
                                <SpiderverseAudio />
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
                                <DeferredSection minHeight={700}>
                                    {About}
                                </DeferredSection>
                                <DeferredSection minHeight={800}>
                                    {Skills}
                                </DeferredSection>
                                <DeferredSection minHeight={1200}>
                                    {Projects}
                                </DeferredSection>
                                <DeferredSection minHeight={900}>
                                    {Contact}
                                </DeferredSection>
                                <Suspense fallback={<div style={{ minHeight: 320 }} />}>
                                    <Footer />
                                </Suspense>
                            </>
                        )}

                        <FloatingControls />
                    </main>

                    <DimensionTrigger />

                    {/* Easter egg: listens for the Konami code, so it has to stay
                        mounted in both dimensions. */}
                    <Suspense fallback={null}>
                        <MultiverseEasterEgg />
                    </Suspense>

                    {/* Post-credit scene - a 20 kB chunk no other dimension needs. */}
                    {isSpiderVerse && (
                        <Suspense fallback={null}>
                            <SpiderversePostCredit />
                        </Suspense>
                    )}

                    {!isSpiderVerse && (
                        <Suspense fallback={null}>
                            <BrandStyleGuide />
                        </Suspense>
                    )}
                    </div>
                </>
            )}
        </>
    )
}

export default App