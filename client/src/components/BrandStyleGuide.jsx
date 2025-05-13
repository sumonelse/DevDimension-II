import React, { useState } from "react"

const BrandStyleGuide = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleStyleGuide = () => {
        setIsOpen(!isOpen)
    }

    // Brand colors
    const colors = [
        { name: "Primary", hex: "#7C3AED", tailwind: "purple-600" },
        { name: "Secondary", hex: "#06B6D4", tailwind: "cyan-600" },
        { name: "Accent", hex: "#EC4899", tailwind: "pink-500" },
        { name: "Dark", hex: "#070A18", tailwind: "dark-950" },
        { name: "Light", hex: "#F8FAFC", tailwind: "slate-50" },
    ]

    // Typography examples
    const typography = [
        {
            name: "Heading 1",
            class: "font-heading text-4xl font-bold",
            sample: "Full-Stack Developer",
        },
        {
            name: "Heading 2",
            class: "font-heading text-3xl font-semibold",
            sample: "Problem Solver",
        },
        {
            name: "Heading 3",
            class: "font-heading text-2xl font-medium",
            sample: "UI/UX Enthusiast",
        },
        {
            name: "Body",
            class: "font-sans text-base font-medium",
            sample: "I build exceptional digital experiences with a passion for competitive programming.",
        },
        {
            name: "Code",
            class: "font-mono text-sm",
            sample: "const solve = (problem) => elegant(solution);",
        },
    ]

    // Button styles
    const buttons = [
        {
            name: "Primary",
            class: "px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full",
        },
        {
            name: "Secondary",
            class: "px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-full",
        },
        {
            name: "Outline",
            class: "px-4 py-2 border border-purple-600 text-purple-600 rounded-full hover:bg-purple-600/10",
        },
        {
            name: "Ghost",
            class: "px-4 py-2 text-purple-600 hover:bg-purple-600/10 rounded-full",
        },
    ]

    return (
        <div className="fixed bottom-4 left-4 z-50">
            {/* Toggle button */}
            <button
                onClick={toggleStyleGuide}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105"
                aria-label="Toggle Brand Style Guide"
                data-cursor-text="Brand"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                </svg>
            </button>

            {/* Style guide panel */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-900 rounded-xl shadow-2xl border border-purple-600/20 p-6 m-4">
                        {/* Close button */}
                        <button
                            onClick={toggleStyleGuide}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            aria-label="Close style guide"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Header */}
                        <div className="mb-8 text-center">
                            <div className="flex justify-center mb-4">
                                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-700/20">
                                    <div className="text-white text-3xl font-bold font-heading tracking-tight">
                                        SM
                                    </div>
                                </div>
                            </div>
                            <h1 className="font-heading text-3xl font-bold text-gradient-purple mb-2">
                                Sumit Maurya
                            </h1>
                            <p className="text-gray-400">Brand Style Guide</p>
                        </div>

                        {/* Colors */}
                        <section className="mb-8">
                            <h2 className="font-heading text-2xl font-semibold mb-4 text-white">
                                Brand Colors
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {colors.map((color) => (
                                    <div
                                        key={color.name}
                                        className="flex flex-col"
                                    >
                                        <div
                                            className={`h-20 rounded-lg mb-2 bg-${color.tailwind}`}
                                            style={{
                                                backgroundColor: color.hex,
                                            }}
                                        ></div>
                                        <div className="text-sm">
                                            <p className="font-medium text-white">
                                                {color.name}
                                            </p>
                                            <p className="text-gray-400">
                                                {color.hex}
                                            </p>
                                            <p className="text-gray-500 text-xs">
                                                tailwind: {color.tailwind}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Typography */}
                        <section className="mb-8">
                            <h2 className="font-heading text-2xl font-semibold mb-4 text-white">
                                Typography
                            </h2>
                            <div className="space-y-4 bg-dark-800 rounded-lg p-4">
                                {typography.map((type) => (
                                    <div
                                        key={type.name}
                                        className="flex flex-col md:flex-row md:items-center py-2 border-b border-gray-700"
                                    >
                                        <div className="w-full md:w-1/4 text-gray-400 text-sm mb-2 md:mb-0">
                                            {type.name}
                                        </div>
                                        <div
                                            className={`w-full md:w-3/4 ${type.class} text-white`}
                                        >
                                            {type.sample}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Buttons */}
                        <section className="mb-8">
                            <h2 className="font-heading text-2xl font-semibold mb-4 text-white">
                                Buttons
                            </h2>
                            <div className="flex flex-wrap gap-4 bg-dark-800 rounded-lg p-4">
                                {buttons.map((button) => (
                                    <div
                                        key={button.name}
                                        className="flex flex-col items-center"
                                    >
                                        <button className={button.class}>
                                            {button.name}
                                        </button>
                                        <span className="text-xs text-gray-500 mt-2">
                                            {button.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Brand Statement */}
                        <section className="mb-8">
                            <h2 className="font-heading text-2xl font-semibold mb-4 text-white">
                                Brand Statement
                            </h2>
                            <div className="bg-dark-800 rounded-lg p-6">
                                <p className="text-lg text-white mb-4 font-medium">
                                    I build exceptional digital experiences with
                                    a passion for problem-solving.
                                </p>
                                <p className="text-gray-300 mb-2">
                                    Focusing on{" "}
                                    <span className="text-purple-400">
                                        competitive programming
                                    </span>
                                    ,
                                    <span className="text-cyan-400">
                                        {" "}
                                        algorithmic thinking
                                    </span>
                                    , and
                                    <span className="text-pink-400">
                                        {" "}
                                        efficient problem-solving
                                    </span>
                                    .
                                </p>
                                <p className="text-gray-300">
                                    Creating solutions that are both{" "}
                                    <span className="text-amber-400">
                                        optimized
                                    </span>{" "}
                                    and
                                    <span className="text-emerald-400">
                                        {" "}
                                        applicable to real-world scenarios
                                    </span>
                                    .
                                </p>
                            </div>
                        </section>

                        <div className="text-center text-gray-500 text-sm mt-8">
                            © {new Date().getFullYear()} Sumit Maurya •
                            Full-Stack Developer
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BrandStyleGuide
