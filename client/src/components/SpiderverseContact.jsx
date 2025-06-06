import React, { useState, useEffect, useRef } from "react"
import { useDimension } from "../context/DimensionContext"
import personalInfo from "../utils/personalInfo"
import {
    GithubIcon,
    LinkedInIcon,
    TwitterIcon,
    CodeChefIcon,
    CodeForcesIcon,
    EmailIcon,
    ChatIcon,
    ClockIcon,
    ErrorIcon,
    LoadingIcon,
    SendIcon,
} from "../assets/icons"

// Formspark form submission URL from environment variables
const FORMSPARK_ACTION_URL = import.meta.env.VITE_FORMSPARK_ACTION_URL

const SpiderverseContact = () => {
    const { isSpiderVerse } = useDimension()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)
    const [activeField, setActiveField] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        message: "",
    })
    const [touched, setTouched] = useState({
        name: false,
        email: false,
        message: false,
    })

    const formRef = useRef(null)
    const sectionRef = useRef(null)

    // Intersection observer to trigger animations when section is visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [])

    // Validate form on data change
    useEffect(() => {
        if (touched.name) validateName(formData.name)
        if (touched.email) validateEmail(formData.email)
        if (touched.message) validateMessage(formData.message)
    }, [formData, touched])

    const validateName = (name) => {
        let error = ""
        if (!name.trim()) {
            error = "Name is required"
        } else if (name.trim().length < 2) {
            error = "Name must be at least 2 characters"
        }
        setErrors((prev) => ({ ...prev, name: error }))
        return error === ""
    }

    const validateEmail = (email) => {
        let error = ""
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email.trim()) {
            error = "Email is required"
        } else if (!emailRegex.test(email)) {
            error = "Please enter a valid email address"
        }
        setErrors((prev) => ({ ...prev, email: error }))
        return error === ""
    }

    const validateMessage = (message) => {
        let error = ""
        if (!message.trim()) {
            error = "Message is required"
        } else if (message.trim().length < 10) {
            error = "Message must be at least 10 characters"
        }
        setErrors((prev) => ({ ...prev, message: error }))
        return error === ""
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleFocus = (e) => {
        const { name } = e.target
        setActiveField(name)
    }

    const handleBlur = (e) => {
        const { name } = e.target
        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }))
        setActiveField(null)
    }

    const isFormValid = () => {
        const nameValid = validateName(formData.name)
        const emailValid = validateEmail(formData.email)
        const messageValid = validateMessage(formData.message)
        return nameValid && emailValid && messageValid
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Set all fields as touched to show validation errors
        setTouched({
            name: true,
            email: true,
            message: true,
        })

        if (!isFormValid()) {
            // Shake the form on invalid submission
            if (formRef.current) {
                formRef.current.classList.add("shake-animation")
                setTimeout(() => {
                    formRef.current.classList.remove("shake-animation")
                }, 500)
            }
            return
        }

        setIsSubmitting(true)

        try {
            // Submit form data to Formspark
            const response = await fetch(FORMSPARK_ACTION_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    // Add a source field to identify which form was used
                    source: "spiderverse-contact",
                }),
            })

            if (!response.ok) {
                throw new Error("Form submission failed")
            }

            // Handle successful submission
            setIsSubmitting(false)
            setSubmitStatus("success")
            setFormData({ name: "", email: "", message: "" })

            // Reset touched state
            setTouched({
                name: false,
                email: false,
                message: false,
            })

            // Reset status after 5 seconds
            setTimeout(() => {
                setSubmitStatus(null)
            }, 5000)
        } catch (error) {
            console.error("Form submission error:", error)
            setIsSubmitting(false)
            setSubmitStatus("error")

            // Reset error status after 5 seconds
            setTimeout(() => {
                setSubmitStatus(null)
            }, 5000)
        }
    }

    // Function to create random motion lines
    const createMotionLines = () => {
        const lines = []
        for (let i = 0; i < 15; i++) {
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

    // Removed sound effects function to keep it simpler

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="py-16 relative overflow-hidden"
        >
            {/* Comic book style background */}
            <div className="absolute inset-0 bg-white z-0">
                <div className="halftone-overlay"></div>
                {createMotionLines()}
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section header with comic book styling */}
                <div
                    className={`text-center mb-16 ${
                        isVisible ? "animate-bounce-in" : "opacity-0"
                    }`}
                >
                    <div className="dialogue-box inline-block relative">
                        <h2
                            className="comic-title text-3xl md:text-4xl mb-4 text-black glitch-text"
                            data-text="Get In Touch"
                        >
                            Get In{" "}
                            <span className="text-spiderverse-blue">Touch</span>
                        </h2>
                        <p className="text-black max-w-2xl mx-auto">
                            Have a question or want to work together? Drop me a
                            message!
                        </p>

                        {/* Comic book style speech bubble pointer */}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-b-2 border-r-2 border-black rotate-45"></div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contact info with comic styling */}
                        <div
                            className={`comic-panel bg-white p-6 relative ${
                                isVisible ? "animate-panel-in" : "opacity-0"
                            }`}
                            style={{
                                "--panel-rotation": "-1deg",
                                animationDelay: "0.2s",
                            }}
                        >
                            <div className="absolute -top-3 -left-3 w-10 h-10 bg-spiderverse-yellow rounded-full border-2 border-black flex items-center justify-center font-bold text-black z-10">
                                1
                            </div>

                            <h3 className="comic-title text-2xl mb-6 text-spiderverse-red">
                                Contact Info
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4 group">
                                    <div className="comic-border bg-spiderverse-yellow p-2 rounded-full transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                                        <EmailIcon className="h-6 w-6 text-black" />
                                    </div>
                                    <div className="transition-all duration-300 group-hover:translate-x-1">
                                        <h4 className="font-bold text-black">
                                            Email
                                        </h4>
                                        <a
                                            href={
                                                personalInfo.contact.emailLink
                                            }
                                            className="text-spiderverse-blue hover:underline relative inline-block"
                                        >
                                            {personalInfo.contact.email}
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-spiderverse-blue group-hover:w-full transition-all duration-300"></span>
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 group">
                                    <div className="comic-border bg-spiderverse-red p-2 rounded-full transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                                        <ChatIcon className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="transition-all duration-300 group-hover:translate-x-1">
                                        <h4 className="font-bold text-black">
                                            Social Media
                                        </h4>
                                        <div className="flex space-x-3 mt-2">
                                            <a
                                                href={
                                                    personalInfo.social.github
                                                        .url
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="comic-border bg-black p-2 rounded-full transform hover:rotate-12 transition-transform duration-300 hover:scale-110"
                                                aria-label={
                                                    personalInfo.social.github
                                                        .label
                                                }
                                            >
                                                <GithubIcon className="w-4 h-4 text-white" />
                                            </a>
                                            <a
                                                href={
                                                    personalInfo.social.linkedin
                                                        .url
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="comic-border bg-blue-600 p-2 rounded-full transform hover:-rotate-12 transition-transform duration-300 hover:scale-110"
                                                aria-label={
                                                    personalInfo.social.linkedin
                                                        .label
                                                }
                                            >
                                                <LinkedInIcon className="w-4 h-4 text-white" />
                                            </a>
                                            <a
                                                href={
                                                    personalInfo.social.twitter
                                                        .url
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="comic-border bg-blue-400 p-2 rounded-full transform hover:rotate-12 transition-transform duration-300 hover:scale-110"
                                                aria-label={
                                                    personalInfo.social.twitter
                                                        .label
                                                }
                                            >
                                                <TwitterIcon className="w-4 h-4 text-white" />
                                            </a>

                                            {/* CodeChef */}
                                            <a
                                                href={
                                                    personalInfo.social.codechef
                                                        .url
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="comic-border bg-orange-500 p-2 rounded-full transform hover:rotate-12 transition-transform duration-300 hover:scale-110"
                                                aria-label={
                                                    personalInfo.social.codechef
                                                        .label
                                                }
                                            >
                                                <CodeChefIcon className="w-4 h-4 text-white" />
                                            </a>

                                            {/* CodeForces */}
                                            <a
                                                href={
                                                    personalInfo.social
                                                        .codeforces.url
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="comic-border bg-red-500 p-2 rounded-full transform hover:rotate-12 transition-transform duration-300 hover:scale-110"
                                                aria-label={
                                                    personalInfo.social
                                                        .codeforces.label
                                                }
                                            >
                                                <CodeForcesIcon className="w-4 h-4 text-white" />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 group">
                                    <div className="comic-border bg-spiderverse-purple p-2 rounded-full transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                                        <ClockIcon className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="transition-all duration-300 group-hover:translate-x-1">
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

                            {/* Comic book price tag */}
                            <div className="absolute top-2 left-10 bg-spiderverse-yellow text-xs font-bold py-1 px-2 border-2 border-black transform -rotate-6">
                                DIRECT MESSAGE
                            </div>

                            {/* Halftone overlay */}
                            <div className="absolute inset-0 benday-dots opacity-10 pointer-events-none"></div>
                        </div>

                        {/* Contact form with comic styling */}
                        <div
                            className={`comic-panel bg-white p-6 relative ${
                                isVisible ? "animate-panel-in" : "opacity-0"
                            }`}
                            style={{
                                "--panel-rotation": "1deg",
                                animationDelay: "0.4s",
                            }}
                            ref={formRef}
                        >
                            <div className="absolute -top-3 -left-3 w-10 h-10 bg-spiderverse-blue rounded-full border-2 border-black flex items-center justify-center font-bold text-white z-10">
                                2
                            </div>

                            <h3 className="comic-title text-2xl mb-6 text-spiderverse-blue">
                                Send a Message
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div
                                    className={`${
                                        activeField === "name"
                                            ? "transform scale-105 transition-transform duration-300"
                                            : ""
                                    }`}
                                >
                                    <label
                                        htmlFor="name"
                                        className={`block text-black font-bold mb-2 ${
                                            errors.name && touched.name
                                                ? "text-spiderverse-red"
                                                : ""
                                        }`}
                                    >
                                        Name
                                        {activeField === "name" && (
                                            <span className="ml-2 text-xs text-spiderverse-blue animate-pulse">
                                                TYPING...
                                            </span>
                                        )}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            className={`comic-border w-full p-3 bg-white text-black transition-all duration-300 ${
                                                errors.name && touched.name
                                                    ? "border-spiderverse-red"
                                                    : activeField === "name"
                                                    ? "border-spiderverse-blue border-3"
                                                    : ""
                                            }`}
                                            placeholder="Your name"
                                        />
                                        {activeField === "name" && (
                                            <div className="absolute top-0 right-0 mt-2 mr-2">
                                                <div className="typing-indicator">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {errors.name && touched.name && (
                                        <p className="mt-1 text-spiderverse-red text-sm font-bold flex items-center">
                                            <ErrorIcon />
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div
                                    className={`${
                                        activeField === "email"
                                            ? "transform scale-105 transition-transform duration-300"
                                            : ""
                                    }`}
                                >
                                    <label
                                        htmlFor="email"
                                        className={`block text-black font-bold mb-2 ${
                                            errors.email && touched.email
                                                ? "text-spiderverse-red"
                                                : ""
                                        }`}
                                    >
                                        Email
                                        {activeField === "email" && (
                                            <span className="ml-2 text-xs text-spiderverse-blue animate-pulse">
                                                TYPING...
                                            </span>
                                        )}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            className={`comic-border w-full p-3 bg-white text-black transition-all duration-300 ${
                                                errors.email && touched.email
                                                    ? "border-spiderverse-red"
                                                    : activeField === "email"
                                                    ? "border-spiderverse-blue border-3"
                                                    : ""
                                            }`}
                                            placeholder="your.email@example.com"
                                        />
                                        {activeField === "email" && (
                                            <div className="absolute top-0 right-0 mt-2 mr-2">
                                                <div className="typing-indicator">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {errors.email && touched.email && (
                                        <p className="mt-1 text-spiderverse-red text-sm font-bold flex items-center">
                                            <ErrorIcon />
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div
                                    className={`${
                                        activeField === "message"
                                            ? "transform scale-105 transition-transform duration-300"
                                            : ""
                                    }`}
                                >
                                    <label
                                        htmlFor="message"
                                        className={`block text-black font-bold mb-2 ${
                                            errors.message && touched.message
                                                ? "text-spiderverse-red"
                                                : ""
                                        }`}
                                    >
                                        Message
                                        {activeField === "message" && (
                                            <span className="ml-2 text-xs text-spiderverse-blue animate-pulse">
                                                TYPING...
                                            </span>
                                        )}
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            rows="4"
                                            className={`comic-border w-full p-3 bg-white text-black transition-all duration-300 ${
                                                errors.message &&
                                                touched.message
                                                    ? "border-spiderverse-red"
                                                    : activeField === "message"
                                                    ? "border-spiderverse-blue border-3"
                                                    : ""
                                            }`}
                                            placeholder="Your message here..."
                                        ></textarea>
                                        {activeField === "message" && (
                                            <div className="absolute top-0 right-0 mt-2 mr-2">
                                                <div className="typing-indicator">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {errors.message && touched.message && (
                                        <p className="mt-1 text-spiderverse-red text-sm font-bold flex items-center">
                                            <ErrorIcon />
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={
                                        isSubmitting ||
                                        (touched.name &&
                                            touched.email &&
                                            touched.message &&
                                            (errors.name ||
                                                errors.email ||
                                                errors.message))
                                    }
                                    className={`spiderverse-button ${
                                        isSubmitting ||
                                        (touched.name &&
                                            touched.email &&
                                            touched.message &&
                                            (errors.name ||
                                                errors.email ||
                                                errors.message))
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-spiderverse-blue"
                                    } w-full relative overflow-hidden`}
                                >
                                    <span className="relative z-10 flex items-center justify-center">
                                        {isSubmitting ? (
                                            <>
                                                <LoadingIcon />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <SendIcon />
                                            </>
                                        )}
                                    </span>
                                </button>

                                {submitStatus === "success" && (
                                    <div className="mt-4 p-3 bg-green-100 border-2 border-black text-black font-bold animate-bounce-in">
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

                                {submitStatus === "error" && (
                                    <div className="mt-4 p-3 bg-red-100 border-2 border-black text-black font-bold animate-bounce-in">
                                        <div className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 mr-2 text-red-600"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Oops! Something went wrong. Please
                                            try again later.
                                        </div>
                                    </div>
                                )}

                                {/* Form validation guidance */}
                                {(errors.name ||
                                    errors.email ||
                                    errors.message) &&
                                    (touched.name ||
                                        touched.email ||
                                        touched.message) && (
                                        <div className="text-black text-sm mt-4 flex items-start p-3 bg-yellow-100 rounded-lg border-2 border-black">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-spiderverse-red mr-2 flex-shrink-0 mt-0.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            <span className="font-bold">
                                                Please fill out all required
                                                fields correctly before
                                                submitting the form.
                                            </span>
                                        </div>
                                    )}
                            </form>

                            {/* Comic book decorative elements */}
                            <div className="absolute top-2 right-2 text-xs font-bold transform rotate-12 text-spiderverse-blue">
                                #MESSAGE
                            </div>

                            {/* Comic book price tag */}
                            <div className="absolute top-2 left-10 bg-spiderverse-cyan text-xs font-bold py-1 px-2 border-2 border-black transform -rotate-6">
                                SPECIAL EDITION
                            </div>

                            {/* Halftone overlay */}
                            <div className="absolute inset-0 benday-dots opacity-10 pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comic book style decorative elements removed to keep it simpler */}

            {/* Add CSS animations */}
            <style jsx="true">{`
                @keyframes bounce-in {
                    0% {
                        opacity: 0;
                        transform: scale(0.3);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.05);
                    }
                    70% {
                        transform: scale(0.9);
                    }
                    100% {
                        transform: scale(1);
                    }
                }

                @keyframes panel-in {
                    0% {
                        opacity: 0;
                        transform: translateY(20px)
                            rotate(var(--panel-rotation));
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) rotate(var(--panel-rotation));
                    }
                }

                @keyframes pop-in {
                    0% {
                        opacity: 0;
                        transform: scale(0) rotate(var(--panel-rotation, 0deg));
                    }
                    70% {
                        transform: scale(1.2)
                            rotate(var(--panel-rotation, 0deg));
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) rotate(var(--panel-rotation, 0deg));
                    }
                }

                .animate-bounce-in {
                    animation: bounce-in 0.6s ease-out forwards;
                }

                .animate-panel-in {
                    animation: panel-in 0.6s ease-out forwards;
                }

                .animate-pop-in {
                    animation: pop-in 0.5s ease-out forwards;
                }

                .shake-animation {
                    animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)
                        both;
                }

                @keyframes shake {
                    0%,
                    100% {
                        transform: translateX(0) rotate(var(--panel-rotation));
                    }
                    10%,
                    30%,
                    50%,
                    70%,
                    90% {
                        transform: translateX(-5px)
                            rotate(var(--panel-rotation));
                    }
                    20%,
                    40%,
                    60%,
                    80% {
                        transform: translateX(5px) rotate(var(--panel-rotation));
                    }
                }

                .typing-indicator {
                    display: flex;
                    align-items: center;
                }

                .typing-indicator span {
                    height: 8px;
                    width: 8px;
                    margin: 0 2px;
                    background-color: var(--spiderverse-blue);
                    border-radius: 50%;
                    display: inline-block;
                    opacity: 0.6;
                }

                .typing-indicator span:nth-child(1) {
                    animation: typing 1s infinite 0s;
                }

                .typing-indicator span:nth-child(2) {
                    animation: typing 1s infinite 0.2s;
                }

                .typing-indicator span:nth-child(3) {
                    animation: typing 1s infinite 0.4s;
                }

                @keyframes typing {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.5);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
            `}</style>
        </section>
    )
}

export default SpiderverseContact
