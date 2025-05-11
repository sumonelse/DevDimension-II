/**
 * Utility functions for monitoring and optimizing performance
 */

// Track key performance metrics
export const trackPerformance = () => {
    if (typeof window === "undefined" || !window.performance) return {}

    try {
        // Get navigation timing data
        const perfData = window.performance.timing
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
        const domReadyTime = perfData.domComplete - perfData.domLoading
        const networkLatency = perfData.responseEnd - perfData.requestStart
        const redirectTime = perfData.redirectEnd - perfData.redirectStart
        const dnsLookupTime =
            perfData.domainLookupEnd - perfData.domainLookupStart
        const serverResponseTime = perfData.responseEnd - perfData.requestStart

        // Log performance data
        console.info("Performance Metrics:", {
            pageLoadTime: `${pageLoadTime}ms`,
            domReadyTime: `${domReadyTime}ms`,
            networkLatency: `${networkLatency}ms`,
            redirectTime: `${redirectTime}ms`,
            dnsLookupTime: `${dnsLookupTime}ms`,
            serverResponseTime: `${serverResponseTime}ms`,
        })

        return {
            pageLoadTime,
            domReadyTime,
            networkLatency,
            redirectTime,
            dnsLookupTime,
            serverResponseTime,
        }
    } catch (error) {
        console.error("Error tracking performance:", error)
        return {}
    }
}

// Track component render time
export const trackComponentRender = (componentName, callback) => {
    if (process.env.NODE_ENV === "production") return callback()

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
        } catch (e) {
            console.error("PerformanceObserver for longtask not supported")
        }
    }
}
