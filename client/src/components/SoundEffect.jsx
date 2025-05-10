import React from "react"

const SoundEffect = ({
    text,
    color = "yellow",
    size = "medium",
    rotation = 0,
    className = "",
    animated = true,
}) => {
    // Define size classes
    const sizeClasses = {
        small: "text-2xl md:text-3xl",
        medium: "text-3xl md:text-5xl",
        large: "text-5xl md:text-7xl",
        huge: "text-7xl md:text-9xl",
    }

    // Define color classes
    const colorClasses = {
        red: "text-spiderverse-red",
        blue: "text-spiderverse-blue",
        yellow: "text-spiderverse-yellow",
        green: "text-spiderverse-green",
        purple: "text-spiderverse-purple",
        cyan: "text-spiderverse-cyan",
        pink: "text-spiderverse-pink",
    }

    // Define animation classes
    const animationClass = animated ? "animate-pulse" : ""

    return (
        <div
            className={`
        font-['Bangers'] 
        ${sizeClasses[size] || sizeClasses.medium} 
        ${colorClasses[color] || colorClasses.yellow}
        ${animationClass}
        ${className}
      `}
            style={{
                transform: `rotate(${rotation}deg)`,
                textShadow:
                    "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000",
            }}
        >
            {text}
        </div>
    )
}

export default SoundEffect
