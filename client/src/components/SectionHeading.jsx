import React from "react"
import useIntersectionObserver from "../hooks/useIntersectionObserver"

const SectionHeading = ({
    title,
    subtitle,
    align = "center",
    titleColor = "text-gradient-purple",
    subtitleColor = "text-gray-300",
    className = "",
    underlineColor = "bg-gradient-to-r from-purple-500 to-pink-500",
    withAnimation = true,
}) => {
    const [ref, isIntersecting] = useIntersectionObserver({
        threshold: 0.1,
        triggerOnce: true,
    })

    const alignmentClasses = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
    }

    const alignClass = alignmentClasses[align] || alignmentClasses.center

    return (
        <div
            ref={ref}
            className={`mb-12 ${alignClass} ${className} ${
                withAnimation ? "transition-all duration-700 transform" : ""
            } ${
                withAnimation && isIntersecting
                    ? "opacity-100 translate-y-0"
                    : withAnimation
                    ? "opacity-0 translate-y-10"
                    : "opacity-100"
            }`}
        >
            <h2
                className={`text-3xl md:text-4xl font-bold mb-4 inline-block relative ${titleColor}`}
            >
                {title}
                <span
                    className={`absolute -bottom-1 left-0 w-full h-0.5 ${underlineColor} transform origin-left ${
                        withAnimation && isIntersecting
                            ? "animate-expand-line"
                            : "scale-x-0"
                    }`}
                ></span>
            </h2>

            {subtitle && (
                <p
                    className={`text-lg max-w-2xl mx-auto mt-4 ${subtitleColor} ${
                        withAnimation
                            ? "transition-opacity duration-700 delay-300"
                            : ""
                    } ${
                        withAnimation && isIntersecting
                            ? "opacity-100"
                            : withAnimation
                            ? "opacity-0"
                            : "opacity-100"
                    }`}
                >
                    {subtitle}
                </p>
            )}
        </div>
    )
}

export default SectionHeading
