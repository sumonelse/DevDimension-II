import React, { useState, useEffect, useRef } from "react"
import personalInfo from "../utils/personalInfo"

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })

    const [formStatus, setFormStatus] = useState({
        submitted: false,
        submitting: false,
        info: { error: false, msg: null },
    })

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

    // Animation states
    const [activeField, setActiveField] = useState(null)
    const formRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

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

        if (formRef.current) {
            observer.observe(formRef.current)
        }

        return () => {
            if (formRef.current) {
                observer.unobserve(formRef.current)
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
        const { id, value } = e.target
        setFormData({
            ...formData,
            [id]: value,
        })
    }

    const handleBlur = (e) => {
        const { id } = e.target
        setTouched((prev) => ({
            ...prev,
            [id]: true,
        }))
        setActiveField(null)
    }

    const handleFocus = (e) => {
        const { id } = e.target
        setActiveField(id)
    }

    const isFormValid = () => {
        const nameValid = validateName(formData.name)
        const emailValid = validateEmail(formData.email)
        const messageValid = validateMessage(formData.message)
        return nameValid && emailValid && messageValid
    }

    const handleSubmit = (e) => {
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

        setFormStatus({
            submitting: true,
            submitted: false,
            info: { error: false, msg: null },
        })

        // Simulate form submission
        setTimeout(() => {
            setFormStatus({
                submitted: true,
                submitting: false,
                info: {
                    error: false,
                    msg: "Thanks for your message! I'll get back to you soon.",
                },
            })

            // Reset form after successful submission
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            })

            // Reset touched state
            setTouched({
                name: false,
                email: false,
                message: false,
            })

            // Clear success message after 5 seconds
            setTimeout(() => {
                setFormStatus({
                    submitted: false,
                    submitting: false,
                    info: { error: false, msg: null },
                })
            }, 5000)
        }, 1500)
    }

    return (
        <section
            id="contact"
            ref={formRef}
            className={`py-24 bg-dark-800 relative overflow-hidden ${
                isVisible ? "fade-in" : "opacity-0"
            }`}
        >
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMHYyaC0ydi0yaDJ6bTIgMGgydjJoLTJ2LTJ6bS02IDBoMnYyaC0ydi0yem0yLTRoMnYyaC0ydi0yem0yIDBIMzZ2Mmgtc3YtMnptMC00aDJ2MmgtMnYtMnptMiAwaDJ2MmgtMnYtMnptMi00aDJ2MmgtMnYtMnptMCAwaDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-cyan-500/5 rounded-tl-full blur-3xl"></div>

            {/* Interactive particles background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full animate-float opacity-70"></div>
                <div
                    className="absolute top-3/4 left-1/3 w-3 h-3 bg-cyan-500 rounded-full animate-float-slow opacity-60"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute top-1/2 right-1/4 w-2 h-2 bg-pink-500 rounded-full animate-float-slow opacity-70"
                    style={{ animationDelay: "2s" }}
                ></div>
                <div
                    className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-blue-500 rounded-full animate-float opacity-60"
                    style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                    className="absolute top-1/3 right-1/2 w-1 h-1 bg-yellow-500 rounded-full animate-float-slow opacity-80"
                    style={{ animationDelay: "1.5s" }}
                ></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section header */}
                <div
                    className={`text-center mb-16 ${
                        isVisible ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: "0.1s" }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 relative inline-block">
                        Get In <span className="text-gradient-cyan">Touch</span>
                        <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-cyan mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Have a project in mind or want to discuss potential
                        opportunities? Feel free to reach out!
                    </p>
                </div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact info */}
                    <div
                        className={`${
                            isVisible ? "animate-fade-in-left" : "opacity-0"
                        }`}
                        style={{ animationDelay: "0.2s" }}
                    >
                        <div className="h-full glass-dark p-8 rounded-xl border border-purple-500/20 shadow-lg hover:shadow-purple-500/10 transition-all duration-500 transform hover:-translate-y-1">
                            <h3 className="text-2xl font-bold text-white mb-8 relative inline-block group">
                                Contact Information
                                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-purple transform scale-x-100 group-hover:scale-x-50 transition-transform duration-300"></span>
                            </h3>

                            <div className="space-y-8">
                                <div className="flex items-start gap-5 group">
                                    <div className="bg-purple-500/10 p-3 rounded-lg text-purple-400 group-hover:bg-purple-500/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
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
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="transition-all duration-300 group-hover:translate-x-1">
                                        <h4 className="text-white font-medium mb-1">
                                            Email
                                        </h4>
                                        <a
                                            href={
                                                personalInfo.contact.emailLink
                                            }
                                            className="text-gray-400 hover:text-purple-400 transition-colors duration-300 relative group"
                                        >
                                            <span>
                                                {personalInfo.contact.email}
                                            </span>
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5 group">
                                    <div className="bg-cyan-500/10 p-3 rounded-lg text-cyan-400 group-hover:bg-cyan-500/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
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
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="transition-all duration-300 group-hover:translate-x-1">
                                        <h4 className="text-white font-medium mb-1">
                                            Location
                                        </h4>
                                        <p className="text-gray-400 relative">
                                            <span className="relative">
                                                {personalInfo.location}
                                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <h4 className="text-white font-medium mb-5 relative inline-block group">
                                        Social Profiles
                                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-transparent transform scale-x-100 group-hover:scale-x-50 transition-transform duration-300"></span>
                                    </h4>
                                    <div className="flex gap-5">
                                        {/* GitHub */}
                                        <a
                                            href={
                                                personalInfo.social.github.url
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative w-12 h-12 rounded-lg flex items-center justify-center bg-dark-800 border border-purple-500/30 text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                                            aria-label={
                                                personalInfo.social.github.label
                                            }
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 relative z-10 transition-transform duration-300 group-hover:scale-110"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </a>

                                        {/* LinkedIn */}
                                        <a
                                            href={
                                                personalInfo.social.linkedin.url
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative w-12 h-12 rounded-lg flex items-center justify-center bg-dark-800 border border-cyan-500/30 text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                                            aria-label={
                                                personalInfo.social.linkedin
                                                    .label
                                            }
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 relative z-10 transition-transform duration-300 group-hover:scale-110"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                        </a>

                                        {/* Twitter/X */}
                                        <a
                                            href={
                                                personalInfo.social.twitter.url
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative w-12 h-12 rounded-lg flex items-center justify-center bg-dark-800 border border-pink-500/30 text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                                            aria-label={
                                                personalInfo.social.twitter
                                                    .label
                                            }
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 relative z-10 transition-transform duration-300 group-hover:scale-110"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                {/* Animated decoration */}
                                <div className="mt-8 relative">
                                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse-slow"></div>
                                    <div
                                        className="absolute -bottom-5 -left-5 w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse-slow"
                                        style={{ animationDelay: "1s" }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact form */}
                    <div
                        className={`${
                            isVisible ? "animate-fade-in-right" : "opacity-0"
                        }`}
                        style={{ animationDelay: "0.4s" }}
                    >
                        <div
                            className={`h-full glass-dark p-8 rounded-xl border border-cyan-500/20 shadow-lg hover:shadow-cyan-500/10 transition-all duration-500 transform hover:-translate-y-1 ${
                                formStatus.submitting ? "animate-pulse" : ""
                            } shake-animation-container`}
                        >
                            <h3 className="text-2xl font-bold text-white mb-8 relative inline-block group">
                                Send Me a Message
                                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-cyan transform scale-x-100 group-hover:scale-x-50 transition-transform duration-300"></span>
                            </h3>

                            <form
                                className="space-y-6"
                                onSubmit={handleSubmit}
                                ref={formRef}
                            >
                                {/* Form status message */}
                                {formStatus.info.msg && (
                                    <div
                                        className={`p-4 rounded-lg ${
                                            formStatus.info.error
                                                ? "bg-pink-500/10 text-pink-400 border border-pink-500/20"
                                                : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                                        } animate-fade-in`}
                                    >
                                        <div className="flex items-center">
                                            {formStatus.info.error ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-2 text-pink-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-2 text-cyan-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            )}
                                            {formStatus.info.msg}
                                        </div>
                                    </div>
                                )}

                                <div
                                    className={`group ${
                                        activeField === "name"
                                            ? "active-field"
                                            : ""
                                    }`}
                                >
                                    <label
                                        htmlFor="name"
                                        className={`block mb-2 transition-colors duration-300 ${
                                            errors.name && touched.name
                                                ? "text-pink-400"
                                                : activeField === "name"
                                                ? "text-cyan-400"
                                                : "text-gray-400 group-focus-within:text-cyan-400"
                                        }`}
                                    >
                                        Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            className={`w-full bg-dark-900 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                                                errors.name && touched.name
                                                    ? "border-pink-500/50 focus:ring-pink-500"
                                                    : "border-dark-600 focus:ring-cyan-500 focus:border-transparent"
                                            }`}
                                            placeholder="Your name"
                                        />
                                        {activeField === "name" && (
                                            <div className="absolute inset-0 border-2 border-cyan-500 rounded-lg pointer-events-none animate-pulse-border"></div>
                                        )}
                                    </div>
                                    {errors.name && touched.name && (
                                        <p className="mt-1 text-pink-400 text-sm flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 mr-1"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div
                                    className={`group ${
                                        activeField === "email"
                                            ? "active-field"
                                            : ""
                                    }`}
                                >
                                    <label
                                        htmlFor="email"
                                        className={`block mb-2 transition-colors duration-300 ${
                                            errors.email && touched.email
                                                ? "text-pink-400"
                                                : activeField === "email"
                                                ? "text-cyan-400"
                                                : "text-gray-400 group-focus-within:text-cyan-400"
                                        }`}
                                    >
                                        Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            className={`w-full bg-dark-900 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                                                errors.email && touched.email
                                                    ? "border-pink-500/50 focus:ring-pink-500"
                                                    : "border-dark-600 focus:ring-cyan-500 focus:border-transparent"
                                            }`}
                                            placeholder="Your email"
                                        />
                                        {activeField === "email" && (
                                            <div className="absolute inset-0 border-2 border-cyan-500 rounded-lg pointer-events-none animate-pulse-border"></div>
                                        )}
                                    </div>
                                    {errors.email && touched.email && (
                                        <p className="mt-1 text-pink-400 text-sm flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 mr-1"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div
                                    className={`group ${
                                        activeField === "subject"
                                            ? "active-field"
                                            : ""
                                    }`}
                                >
                                    <label
                                        htmlFor="subject"
                                        className={`block mb-2 transition-colors duration-300 ${
                                            activeField === "subject"
                                                ? "text-cyan-400"
                                                : "text-gray-400 group-focus-within:text-cyan-400"
                                        }`}
                                    >
                                        Subject (Optional)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Subject of your message"
                                        />
                                        {activeField === "subject" && (
                                            <div className="absolute inset-0 border-2 border-cyan-500 rounded-lg pointer-events-none animate-pulse-border"></div>
                                        )}
                                    </div>
                                </div>

                                <div
                                    className={`group ${
                                        activeField === "message"
                                            ? "active-field"
                                            : ""
                                    }`}
                                >
                                    <label
                                        htmlFor="message"
                                        className={`block mb-2 transition-colors duration-300 ${
                                            errors.message && touched.message
                                                ? "text-pink-400"
                                                : activeField === "message"
                                                ? "text-cyan-400"
                                                : "text-gray-400 group-focus-within:text-cyan-400"
                                        }`}
                                    >
                                        Message
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            id="message"
                                            rows="5"
                                            value={formData.message}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            className={`w-full bg-dark-900 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                                                errors.message &&
                                                touched.message
                                                    ? "border-pink-500/50 focus:ring-pink-500"
                                                    : "border-dark-600 focus:ring-cyan-500 focus:border-transparent"
                                            }`}
                                            placeholder="Your message"
                                        ></textarea>
                                        {activeField === "message" && (
                                            <div className="absolute inset-0 border-2 border-cyan-500 rounded-lg pointer-events-none animate-pulse-border"></div>
                                        )}
                                    </div>
                                    {errors.message && touched.message && (
                                        <p className="mt-1 text-pink-400 text-sm flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 mr-1"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full text-white font-medium py-4 px-8 rounded-lg transition-all duration-500 flex items-center justify-center relative overflow-hidden group ${
                                        formStatus.submitting ||
                                        (touched.name &&
                                            touched.email &&
                                            touched.message &&
                                            (!formData.name ||
                                                !formData.email ||
                                                !formData.message ||
                                                errors.name ||
                                                errors.email ||
                                                errors.message))
                                            ? "bg-gray-600 opacity-70 cursor-not-allowed transform-none hover:shadow-none"
                                            : "bg-gradient-to-r from-cyan-600 to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-1"
                                    }`}
                                    disabled={
                                        formStatus.submitting ||
                                        (touched.name &&
                                            touched.email &&
                                            touched.message &&
                                            (!formData.name ||
                                                !formData.email ||
                                                !formData.message ||
                                                errors.name ||
                                                errors.email ||
                                                errors.message))
                                    }
                                >
                                    <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>

                                    {formStatus.submitting ? (
                                        <span className="flex items-center relative z-10">
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Sending Message...
                                        </span>
                                    ) : (
                                        <span className="flex items-center relative z-10">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 mr-2"
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
                                            Send Message
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                />
                                            </svg>
                                        </span>
                                    )}
                                </button>

                                {/* Form validation guidance */}
                                {(errors.name ||
                                    errors.email ||
                                    errors.message) &&
                                    (touched.name ||
                                        touched.email ||
                                        touched.message) && (
                                        <div className="text-gray-400 text-sm mt-4 flex items-start p-3 bg-dark-900/50 rounded-lg border border-cyan-500/20">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5"
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
                                            <span>
                                                Please fill out all required
                                                fields correctly before
                                                submitting the form.
                                            </span>
                                        </div>
                                    )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS for shake animation */}
            <style jsx="true">{`
                .shake-animation-container .shake-animation {
                    animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)
                        both;
                }

                @keyframes shake {
                    0%,
                    100% {
                        transform: translateX(0);
                    }
                    10%,
                    30%,
                    50%,
                    70%,
                    90% {
                        transform: translateX(-5px);
                    }
                    20%,
                    40%,
                    60%,
                    80% {
                        transform: translateX(5px);
                    }
                }

                .active-field {
                    transform: scale(1.01);
                }
            `}</style>
        </section>
    )
}

export default Contact
