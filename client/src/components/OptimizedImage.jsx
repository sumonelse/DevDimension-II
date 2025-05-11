import React, { useState, useEffect } from "react"

const OptimizedImage = ({
    src,
    alt,
    className = "",
    width,
    height,
    loading = "lazy",
    placeholderColor = "#1e1e1e",
    onLoad = () => {},
}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        // Reset states when src changes
        setIsLoaded(false)
        setError(false)
    }, [src])

    const handleLoad = () => {
        setIsLoaded(true)
        onLoad()
    }

    const handleError = () => {
        setError(true)
    }

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            style={{
                width: width || "100%",
                height: height || "auto",
                backgroundColor: placeholderColor,
                aspectRatio: width && height ? `${width}/${height}` : "auto",
            }}
        >
            {/* Placeholder or blur-up effect */}
            {!isLoaded && !error && (
                <div
                    className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-800 to-gray-700"
                    style={{ opacity: 0.5 }}
                />
            )}

            {/* Actual image */}
            <img
                src={src}
                alt={alt}
                className={`transition-opacity duration-500 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                }`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                width={width}
                height={height}
                loading={loading}
                onLoad={handleLoad}
                onError={handleError}
            />

            {/* Error state */}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-400">
                    <span>Failed to load image</span>
                </div>
            )}
        </div>
    )
}

export default OptimizedImage
