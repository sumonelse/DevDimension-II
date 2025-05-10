import React from "react"

const SpeechBubble = ({
    children,
    type = "speech", // speech, thought, shout, whisper
    direction = "right", // right, left, top, bottom
    color = "white",
    className = "",
}) => {
    // Define bubble styles based on type
    const bubbleStyles = {
        speech: {
            base: "relative p-4 rounded-2xl comic-border bg-white",
            right: "after:content-[''] after:absolute after:top-1/2 after:-right-4 after:w-5 after:h-5 after:bg-white after:transform after:rotate-45 after:border-r-2 after:border-b-2 after:border-black",
            left: "after:content-[''] after:absolute after:top-1/2 after:-left-4 after:w-5 after:h-5 after:bg-white after:transform after:rotate-45 after:border-l-2 after:border-t-2 after:border-black",
            top: "after:content-[''] after:absolute after:left-1/2 after:-top-4 after:w-5 after:h-5 after:bg-white after:transform after:rotate-45 after:border-l-2 after:border-t-2 after:border-black",
            bottom: "after:content-[''] after:absolute after:left-1/2 after:-bottom-4 after:w-5 after:h-5 after:bg-white after:transform after:rotate-45 after:border-r-2 after:border-b-2 after:border-black",
        },
        thought: {
            base: "relative p-4 rounded-full comic-border bg-white",
            right: "after:content-[''] after:absolute after:top-3/4 after:-right-3 after:w-3 after:h-3 after:bg-white after:rounded-full after:border-2 after:border-black after:before:content-[''] after:before:absolute after:before:top-full after:before:-right-1 after:before:w-2 after:before:h-2 after:before:bg-white after:before:rounded-full after:before:border-2 after:before:border-black",
            left: "after:content-[''] after:absolute after:top-3/4 after:-left-3 after:w-3 after:h-3 after:bg-white after:rounded-full after:border-2 after:border-black after:before:content-[''] after:before:absolute after:before:top-full after:before:-left-1 after:before:w-2 after:before:h-2 after:before:bg-white after:before:rounded-full after:before:border-2 after:before:border-black",
            top: "after:content-[''] after:absolute after:left-3/4 after:-top-3 after:w-3 after:h-3 after:bg-white after:rounded-full after:border-2 after:border-black",
            bottom: "after:content-[''] after:absolute after:left-3/4 after:-bottom-3 after:w-3 after:h-3 after:bg-white after:rounded-full after:border-2 after:border-black",
        },
        shout: {
            base: "relative p-4 comic-border bg-white",
            right: "clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)",
            left: "clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 50% 75%, 25% 100%, 25% 75%, 0% 75%)",
            top: "clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 50% 100%, 25% 75%, 0% 75%)",
            bottom: "clip-path: polygon(0% 25%, 25% 0%, 75% 0%, 100% 25%, 100% 100%, 0% 100%)",
        },
        whisper: {
            base: "relative p-4 rounded-2xl comic-border bg-white border-dashed",
            right: "after:content-[''] after:absolute after:top-1/2 after:-right-4 after:w-5 after:h-5 after:bg-white after:transform after:rotate-45 after:border-r-2 after:border-b-2 after:border-black after:border-dashed",
            left: "after:content-[''] after:absolute after:top-1/2 after:-left-4 after:w-5 after:h-5 after:bg-white after:transform after:rotate-45 after:border-l-2 after:border-t-2 after:border-black after:border-dashed",
            top: "after:content-[''] after:absolute after:left-1/2 after:-top-4 after:w-5 after:h-5 after:bg-white after:transform after:rotate-45 after:border-l-2 after:border-t-2 after:border-black after:border-dashed",
            bottom: "after:content-[''] after:absolute after:left-1/2 after:-bottom-4 after:w-5 after:h-5 after:bg-white after:transform after:rotate-45 after:border-r-2 after:border-b-2 after:border-black after:border-dashed",
        },
    }

    // Get the appropriate styles
    const baseStyle = bubbleStyles[type]?.base || bubbleStyles.speech.base
    const directionStyle =
        bubbleStyles[type]?.[direction] || bubbleStyles.speech[direction]

    // Apply custom color if provided
    const colorStyle = color !== "white" ? `bg-${color} after:bg-${color}` : ""

    return (
        <div
            className={`${baseStyle} ${directionStyle} ${colorStyle} ${className}`}
        >
            <div className="text-black">{children}</div>
        </div>
    )
}

export default SpeechBubble
