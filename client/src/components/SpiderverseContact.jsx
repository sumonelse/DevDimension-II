import React, { useState } from "react"

const SpiderverseContact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false)
            setSubmitStatus("success")
            setFormData({ name: "", email: "", message: "" })

            // Reset status after 5 seconds
            setTimeout(() => {
                setSubmitStatus(null)
            }, 5000)
        }, 1500)
    }

    // Function to create random motion lines
    const createMotionLines = () => {
        const lines = []
        for (let i = 0; i < 10; i++) {
            const top = Math.random() * 100
            const left = Math.random() * 100
            const width = 30 + Math.random() * 70
            const rotation = Math.random() * 180
            const opacity = 0.1 + Math.random() * 0.3

            lines.push(
                <div
                    key={i}
                    className="motion-line absolute bg-black"
                    style={{
                        top: `${top}%`,
                        left: `${left}%`,
                        width: `${width}px`,
                        transform: `rotate(${rotation}deg)`,
                        opacity,
                    }}
                />
            )
        }
        return lines
    }

    return (
        <section id="contact" className="py-16 relative overflow-hidden">
            {/* Comic book style background */}
            <div className="absolute inset-0 bg-white z-0">
                <div className="halftone-overlay"></div>
                {createMotionLines()}
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section header with comic book styling */}
                <div className="text-center mb-16">
                    <div className="dialogue-box inline-block">
                        <h2 className="comic-title text-3xl md:text-4xl mb-4 text-black">
                            Get In{" "}
                            <span className="text-spiderverse-blue">Touch</span>
                        </h2>
                        <p className="text-black max-w-2xl mx-auto">
                            Have a question or want to work together? Drop me a
                            message!
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contact info with comic styling */}
                        <div
                            className="comic-panel bg-white p-6"
                            style={{ "--panel-rotation": "-1deg" }}
                        >
                            <h3 className="comic-title text-2xl mb-6 text-spiderverse-red">
                                Contact Info
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="comic-border bg-spiderverse-yellow p-2 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-black"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-black">
                                            Email
                                        </h4>
                                        <a
                                            href="mailto:your.email@example.com"
                                            className="text-spiderverse-blue hover:underline"
                                        >
                                            your.email@example.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="comic-border bg-spiderverse-red p-2 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-black">
                                            Social Media
                                        </h4>
                                        <div className="flex space-x-3 mt-2">
                                            <a
                                                href="https://github.com/yourusername"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="comic-border bg-black p-2 rounded-full transform hover:rotate-12 transition-transform duration-300"
                                            >
                                                <svg
                                                    className="w-4 h-4 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </a>
                                            <a
                                                href="https://linkedin.com/in/yourusername"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="comic-border bg-blue-600 p-2 rounded-full transform hover:-rotate-12 transition-transform duration-300"
                                            >
                                                <svg
                                                    className="w-4 h-4 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                </svg>
                                            </a>
                                            <a
                                                href="https://twitter.com/yourusername"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="comic-border bg-blue-400 p-2 rounded-full transform hover:rotate-12 transition-transform duration-300"
                                            >
                                                <svg
                                                    className="w-4 h-4 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="comic-border bg-spiderverse-purple p-2 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-black">
                                            Response Time
                                        </h4>
                                        <p className="text-black">
                                            I'll get back to you within 24-48
                                            hours
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Comic book decorative elements */}
                            <div className="absolute top-2 right-2 text-xs font-bold transform rotate-12 text-spiderverse-red">
                                #CONTACT
                            </div>

                            {/* Halftone overlay */}
                            <div className="absolute inset-0 benday-dots opacity-10 pointer-events-none"></div>
                        </div>

                        {/* Contact form with comic styling */}
                        <div
                            className="comic-panel bg-white p-6"
                            style={{ "--panel-rotation": "1deg" }}
                        >
                            <h3 className="comic-title text-2xl mb-6 text-spiderverse-blue">
                                Send a Message
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-black font-bold mb-2"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="comic-border w-full p-3 bg-white text-black"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-black font-bold mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="comic-border w-full p-3 bg-white text-black"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-black font-bold mb-2"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="comic-border w-full p-3 bg-white text-black"
                                        placeholder="Your message here..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="spiderverse-button bg-spiderverse-blue w-full"
                                >
                                    {isSubmitting
                                        ? "Sending..."
                                        : "Send Message"}
                                    {!isSubmitting && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 ml-2 inline-block"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                            />
                                        </svg>
                                    )}
                                </button>

                                {submitStatus === "success" && (
                                    <div className="mt-4 p-3 bg-green-100 border-2 border-black text-black font-bold">
                                        <div className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 mr-2 text-green-600"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Message sent successfully!
                                        </div>
                                    </div>
                                )}
                            </form>

                            {/* Comic book decorative elements */}
                            <div className="absolute top-2 right-2 text-xs font-bold transform rotate-12 text-spiderverse-blue">
                                #MESSAGE
                            </div>

                            {/* Halftone overlay */}
                            <div className="absolute inset-0 benday-dots opacity-10 pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comic book style decorative elements */}
            <div
                className="absolute bottom-10 right-10 onomatopoeia bang"
                style={{ fontSize: "2rem" }}
            >
                BANG!
            </div>
        </section>
    )
}

export default SpiderverseContact
