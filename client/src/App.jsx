import React, { useEffect, useState, lazy, Suspense } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import FloatingControls from "./components/FloatingControls"
import DimensionTrigger from "./components/DimensionTrigger"
import SpiderverseLoader from "./components/SpiderverseLoader"
import SEO from "./components/SEO"
import CustomCursor from "./components/CustomCursor"
import AmbientBackground from "./components/AmbientBackground"
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

/**
 * How long to wait before admitting the page is slow and showing the splash
 * screen. Below this the loader never mounts at all, which is the common case.
 */
const LOADER_DELAY_MS = 250

const App = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)
    const { isSpiderVerse, isTransitioning } = useDimension()

    // Show the loader only when loading is genuinely slow.
    //
    // This used to hold the content back for a flat 500 ms on every visit, warm
    // cache included, and the hero then faded in over a further 300 ms - so the
    // site sat behind a splash screen for ~800 ms regardless of how fast the
    // network was. Inverting it fixes both: a fast load never renders the loader
    // at all, and a slow one shows something honest rather than something
    // arbitrarily delayed.
    const [hasShownLoader, setHasShownLoader] = useState(false)

    useEffect(() => {
        const startedAt = performance.now()
        let revealTimer

        const finish = () => {
            const elapsed = performance.now() - startedAt
            const wait = Math.max(0, LOADER_DELAY_MS - elapsed)
            revealTimer = setTimeout(() => setIsLoading(false), wait)
        }

        // Only mount the loader if we are still waiting after the delay.
        const loaderTimer = setTimeout(() => setHasShownLoader(true), LOADER_DELAY_MS)

        if (document.readyState === "complete") {
            finish()
        } else {
            window.addEventListener("load", finish, { once: true })
            // Safety net in case the load event never arrives.
            const fallback = setTimeout(finish, 3000)
            return () => {
                clearTimeout(fallback)
                clearTimeout(revealTimer)
                clearTimeout(loaderTimer)
                window.removeEventListener("load", finish)
            }
        }

        return () => {
            clearTimeout(revealTimer)
            clearTimeout(loaderTimer)
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

    // Drives the content fade-in. Tied to the loader actually being dismissed
    // rather than a fixed delay, so a fast load fades in as soon as the content
    // exists instead of sitting at opacity 0 for 300 ms.
    useEffect(() => {
        if (isLoading) {
            setIsLoaded(false)
            return
        }
        const frame = requestAnimationFrame(() => setIsLoaded(true))
        return () => cancelAnimationFrame(frame)
    }, [isLoading])

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

            {/* Only mounted if loading turned out to be slow - see LOADER_DELAY_MS. */}
            {isLoading && hasShownLoader && (
                <SpiderverseLoader
                    isLoading={isLoading}
                    setIsLoaded={setIsLoaded}
                />
            )}

            {!isLoading && (
                <>
                    {/* First tab stop: lets keyboard users jump straight past the
                        nav, the background layers and the floating controls. */}
                    <a href="#main-content" className="skip-to-content">
                        Skip to content
                    </a>
                    <div
                    data-dimension={isSpiderVerse ? "spiderverse" : "default"}
                    className={`min-h-screen text-white transition-colors duration-500 ${
                        isTransitioning ? "dimension-transition" : ""
                    } ${
                        !isSpiderVerse
                            ? "bg-main-gradient gradient-overlay"
                            : "sv-page"
                    }`}
                >
                    {/* Background for the active dimension. Both are single
                        fixed layers that cover the viewport at every scroll
                        position, so no section boundary can produce a seam. */}
                    {isSpiderVerse ? (
                        <Suspense
                            fallback={<div className="fixed inset-0 z-0 bg-[#06060f]" />}
                        >
                            <SpiderverseBackground />
                            <FloatingComicPanels />
                        </Suspense>
                    ) : (
                        <AmbientBackground />
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

                    {/* The fade was 1000 ms to smooth over the splash screen handing off to
                        the content. The loader is now only mounted on a genuinely
                        slow load, so a long fade just leaves the hero sitting at
                        half opacity - it was taking ~1.4 s for the name to reach
                        full contrast. */}
                    <main
                        id="main-content"
                        tabIndex={-1}
                        className={`relative z-10 transition-opacity duration-500 ${
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