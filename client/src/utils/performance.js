/**
 * Utility functions for monitoring and optimizing performance
 */

// Track key performance metrics
export const trackPerformance = () => {
    if (typeof window === "undefined" || !window.performance) return {}

    try {
        // `performance.timing` is deprecated and returns zeroes in several
        // browsers; the Navigation Timing Level 2 entry is the supported source.
        const [navigation] = performance.getEntriesByType("navigation")

        if (!navigation) return {}

        const metrics = {
            pageLoadTime: Math.round(navigation.loadEventEnd),
            domReadyTime: Math.round(navigation.domContentLoadedEventEnd),
            networkLatency: Math.round(
                navigation.responseStart - navigation.requestStart
            ),
            redirectTime: Math.round(
                navigation.redirectEnd - navigation.redirectStart
            ),
            dnsLookupTime: Math.round(
                navigation.domainLookupEnd - navigation.domainLookupStart
            ),
            serverResponseTime: Math.round(
                navigation.responseEnd - navigation.requestStart
            ),
            transferSize: navigation.transferSize,
        }

        console.info("Performance Metrics:", metrics)
        return metrics
    } catch (error) {
        console.error("Error tracking performance:", error)
        return {}
    }
}

// Track component render time
export const trackComponentRender = (componentName, callback) => {
    if (import.meta.env.PROD) return callback()

    const startTime = performance.now()
    const result = callback()
    const endTime = performance.now()

    console.info(
        `[Render Time] ${componentName}: ${(endTime - startTime).toFixed(2)}ms`
    )

    return result
}

// Debounce function to limit how often a function can be called
export const debounce = (func, wait = 100) => {
    let timeout
    return function (...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(this, args), wait)
    }
}

// Throttle function to limit the rate at which a function can be called
export const throttle = (func, limit = 100) => {
    let inThrottle
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
    if (typeof window === "undefined") return

    // Track page load performance
    window.addEventListener("load", () => {
        // Wait for browser to calculate all timing data
        setTimeout(() => trackPerformance(), 0)
    })

    // Track long tasks
    if (window.PerformanceObserver) {
        try {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.warn(
                        `Long task detected: ${entry.duration.toFixed(2)}ms`,
                        entry
                    )
                }
            })

            observer.observe({ entryTypes: ["longtask"] })
        } catch {
            console.error("PerformanceObserver for longtask not supported")
        }
    }
}
