import React from "react"

/**
 * Catches render errors anywhere below it and shows a recoverable message
 * instead of the React unmounting the whole tree.
 *
 * The main reason this exists here is chunk loading. Every section of this site
 * is a `React.lazy` dynamic import, so a deploy that renames a chunk, a
 * corporate proxy that blocks it, or one flaky request leaves a rejected import
 * promise. Without a boundary that rejection surfaces as a blank white page
 * with nothing in the console. A chunk failure is recoverable by reloading, so
 * that case gets a one-click reload instead of an apology.
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null, canReload: false }
    }

    static getDerivedStateFromError(error) {
        // A failed dynamic import is a chunk-load problem, not a code problem,
        // and reloading genuinely fixes it.
        const canReload =
            error?.name === "ChunkLoadError" ||
            /dynamically imported module|Importing a module script failed|Loading chunk/i.test(
                error?.message ?? ""
            )

        return { hasError: true, error, canReload }
    }

    componentDidCatch(error, info) {
        // Kept as a console error rather than swallowed: this is the one place
        // where the actual cause would otherwise vanish.
        console.error("Unhandled render error:", error, info?.componentStack)
    }

    handleReload = () => {
        window.location.reload()
    }

    handleDismiss = () => {
        this.setState({ hasError: false, error: null, canReload: false })
    }

    render() {
        if (!this.state.hasError) return this.props.children

        return (
            <div
                role="alert"
                className="min-h-screen flex items-center justify-center bg-main-gradient px-6"
            >
                <div className="max-w-lg text-center glass-dark p-8 rounded-2xl border border-purple-500/20">
                    <div
                        className="text-5xl mb-6"
                        role="img"
                        aria-label="A dimension torn"
                    >
                        🕸️
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold font-heading text-white mb-4">
                        This dimension failed to load
                    </h1>

                    <p className="text-gray-400 mb-8">
                        {this.state.canReload
                            ? "A part of the site didn't make it across. A reload usually sorts it."
                            : "Something went wrong while rendering this page. Reloading is the quickest way to recover."}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            type="button"
                            onClick={this.handleReload}
                            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
                        >
                            Reload the page
                        </button>

                        <button
                            type="button"
                            onClick={this.handleDismiss}
                            className="px-6 py-3 rounded-lg border border-purple-500/30 text-gray-300 font-medium transition-colors duration-300 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
                        >
                            Try to continue
                        </button>
                    </div>

                    {/* Collapsed so the detail is available without dominating
                        the recovery UI. */}
                    {import.meta.env.DEV && this.state.error && (
                        <pre className="mt-8 text-left text-xs text-red-300 bg-black/40 p-4 rounded-lg overflow-auto max-h-48">
                            {this.state.error.stack ?? String(this.state.error)}
                        </pre>
                    )}
                </div>
            </div>
        )
    }
}

export default ErrorBoundary
