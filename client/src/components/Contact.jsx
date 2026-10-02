import React, { useState, useEffect, useRef } from "react"
import personalInfo from "../utils/personalInfo"
import {
    FIELD_NAMES,
    selectVisibleErrors,
    validateAll,
    validateField,
} from "../utils/validation"
import {
    GithubIcon,
    LinkedInIcon,
    TwitterIcon,
    CodeChefIcon,
    CodeForcesIcon,
    EmailIcon,
    LocationIcon,
    ErrorIcon,
    SuccessIcon,
    LoadingIcon,
    SendIcon,
    WarningIcon,
} from "../assets/icons"

// Formspark form submission URL from environment variables
const FORMSPARK_ACTION_URL = import.meta.env.VITE_FORMSPARK_ACTION_URL

const EMPTY_ERRORS = { name: "", email: "", message: "" }

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

    const [errors, setErrors] = useState(EMPTY_ERRORS)

    const [touched, setTouched] = useState({
        name: false,
        email: false,
        message: false,
    })

    // Once a submit has been attempted, errors update live while typing again.
    const [hasSubmitted, setHasSubmitted] = useState(false)

    // Spam guard: a hidden field only a bot would fill in, plus a minimum time
    // on the form. Both are invisible to the visitor and cost nothing.
    const mountedAtRef = useRef(Date.now())
    const [honeypot, setHoneypot] = useState("")

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

        const section = formRef.current
        if (section) observer.observe(section)

        return () => observer.disconnect()
    }, [])

    // Re-evaluate which errors should be visible. Runs when a field is first
    // blurred or after a submit attempt, not on every keystroke.
    useEffect(() => {
        setErrors(selectVisibleErrors(touched, formData, hasSubmitted))
    }, [touched, formData, hasSubmitted])

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData((previous) => ({ ...previous, [id]: value }))

        // After a failed submit, correct a field as soon as it becomes valid
        // rather than waiting for another blur.
        if (hasSubmitted) {
            setErrors((previous) => ({
                ...previous,
                [id]: id in EMPTY_ERRORS ? validateField(id, value) : "",
            }))
        }
    }

    const handleBlur = (e) => {
        const { id } = e.target
        setTouched((previous) => ({ ...previous, [id]: true }))
        setActiveField(null)
    }

    const handleFocus = (e) => {
        const { id } = e.target
        setActiveField(id)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Every field is now on screen, so flag them all and keep them live.
        setHasSubmitted(true)
        setTouched({ name: true, email: true, message: true })

        const nextErrors = validateAll(formData)
        setErrors(nextErrors)

        const firstInvalid = FIELD_NAMES.find((field) => nextErrors[field])

        if (firstInvalid) {
            // Shake the form and move focus to the first problem, so keyboard
            // and screen-reader users are not left guessing.
            const section = formRef.current
            if (section) {
                section.classList.add("shake-animation")
                setTimeout(() => section.classList.remove("shake-animation"), 500)
            }

            document.getElementById(firstInvalid)?.focus()
            return
        }

        // A bot filled the hidden field, or submitted implausibly fast.
        const elapsed = Date.now() - mountedAtRef.current
        if (honeypot || elapsed < 2500) {
            setFormStatus({
                submitted: false,
                submitting: false,
                info: { error: false, msg: null },
            })
            return
        }

        if (!FORMSPARK_ACTION_URL) {
            setFormStatus({
                submitted: false,
                submitting: false,
                info: {
                    error: true,
                    msg: "The contact form is not configured yet. Please email me directly.",
                },
            })
            return
        }

        setFormStatus({
            submitting: true,
            submitted: false,
            info: { error: false, msg: null },
        })

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
                    subject: formData.subject || "No Subject",
                    message: formData.message,
                }),
            })

            if (!response.ok) {
                throw new Error("Form submission failed")
            }
            // Handle successful submission
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
            setHasSubmitted(false)

            // Clear success message after 5 seconds
            setTimeout(() => {
                setFormStatus({
                    submitted: false,
                    submitting: false,
                    info: { error: false, msg: null },
                })
            }, 5000)
        } catch (error) {
            // Handle submission error
            console.error("Form submission error:", error)
            setFormStatus({
                submitted: false,
                submitting: false,
                info: {
                    error: true,
                    msg: "Oops! Something went wrong. Please try again later.",
                },
            })

            // Clear error message after 5 seconds
            setTimeout(() => {
                setFormStatus({
                    submitted: false,
                    submitting: false,
                    info: { error: false, msg: null },
                })
            }, 5000)
        }
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
                                        <EmailIcon className="h-6 w-6" />
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
                                        <LocationIcon className="h-6 w-6" />
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
                                            <GithubIcon className="h-6 w-6 relative z-10 transition-transform duration-300 group-hover:scale-110" />
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
                                            <LinkedInIcon className="h-6 w-6 relative z-10 transition-transform duration-300 group-hover:scale-110" />
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
                                            <TwitterIcon className="h-6 w-6 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                                        </a>

                                        {/* CodeChef */}
                                        <a
                                            href={
                                                personalInfo.social.codechef.url
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative w-12 h-12 rounded-lg flex items-center justify-center bg-dark-800 border border-orange-500/30 text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                                            aria-label={
                                                personalInfo.social.codechef
                                                    .label
                                            }
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <CodeChefIcon className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                                        </a>

                                        {/* CodeForces */}
                                        <a
                                            href={
                                                personalInfo.social.codeforces
                                                    .url
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative w-12 h-12 rounded-lg flex items-center justify-center bg-dark-800 border border-red-500/30 text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                                            aria-label={
                                                personalInfo.social.codeforces
                                                    .label
                                            }
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <CodeForcesIcon className="h-6 w-6 relative z-10 transition-transform duration-300 group-hover:scale-110" />
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
                                noValidate
                            >
                                {/* Spam trap: hidden from people, irresistible
                                    to bots. Nothing is submitted when it is filled. */}
                                <div
                                    aria-hidden="true"
                                    className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
                                >
                                    <label htmlFor="company-website">
                                        Company website
                                    </label>
                                    <input
                                        type="text"
                                        id="company-website"
                                        name="company_website"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        value={honeypot}
                                        onChange={(e) =>
                                            setHoneypot(e.target.value)
                                        }
                                    />
                                </div>

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
                                            errors.name
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
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            required
                                            autoComplete="name"
                                            aria-required="true"
                                            aria-invalid={Boolean(errors.name)}
                                            aria-describedby={
                                                errors.name
                                                    ? "name-error"
                                                    : undefined
                                            }
                                            className={`w-full bg-dark-900 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                                                errors.name
                                                    ? "border-pink-500/50 focus:ring-pink-500"
                                                    : "border-dark-600 focus:ring-cyan-500 focus:border-transparent"
                                            }`}
                                            placeholder="Your name"
                                        />
                                        {activeField === "name" && (
                                            <div className="absolute inset-0 border-2 border-cyan-500 rounded-lg pointer-events-none animate-pulse-border"></div>
                                        )}
                                    </div>
                                    {errors.name && (
                                        <p
                                            id="name-error"
                                            role="alert"
                                            className="mt-1 text-pink-400 text-sm flex items-center"
                                        >
                                            <WarningIcon className="h-4 w-4 mr-1" />
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
                                            errors.email
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
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            required
                                            autoComplete="email"
                                            inputMode="email"
                                            aria-required="true"
                                            aria-invalid={Boolean(errors.email)}
                                            aria-describedby={
                                                errors.email
                                                    ? "email-error"
                                                    : undefined
                                            }
                                            className={`w-full bg-dark-900 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                                                errors.email
                                                    ? "border-pink-500/50 focus:ring-pink-500"
                                                    : "border-dark-600 focus:ring-cyan-500 focus:border-transparent"
                                            }`}
                                            placeholder="Your email"
                                        />
                                        {activeField === "email" && (
                                            <div className="absolute inset-0 border-2 border-cyan-500 rounded-lg pointer-events-none animate-pulse-border"></div>
                                        )}
                                    </div>
                                    {errors.email && (
                                        <p
                                            id="email-error"
                                            role="alert"
                                            className="mt-1 text-pink-400 text-sm flex items-center"
                                        >
                                            <WarningIcon className="h-4 w-4 mr-1" />
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
                                            errors.message
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
                                            name="message"
                                            rows="5"
                                            value={formData.message}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            required
                                            aria-required="true"
                                            aria-invalid={Boolean(
                                                errors.message
                                            )}
                                            aria-describedby={
                                                errors.message
                                                    ? "message-error"
                                                    : undefined
                                            }
                                            className={`w-full bg-dark-900 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                                                errors.message
                                                    ? "border-pink-500/50 focus:ring-pink-500"
                                                    : "border-dark-600 focus:ring-cyan-500 focus:border-transparent"
                                            }`}
                                            placeholder="Your message"
                                        ></textarea>
                                        {activeField === "message" && (
                                            <div className="absolute inset-0 border-2 border-cyan-500 rounded-lg pointer-events-none animate-pulse-border"></div>
                                        )}
                                    </div>
                                    {errors.message && (
                                        <p
                                            id="message-error"
                                            role="alert"
                                            className="mt-1 text-pink-400 text-sm flex items-center"
                                        >
                                            <WarningIcon className="h-4 w-4 mr-1" />
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                {/* The button stays enabled when the form is
                                    incomplete: a disabled button cannot explain
                                    itself, and it would stop the visitor ever
                                    reaching the submit handler that shows which
                                    field needs attention. */}
                                <button
                                    type="submit"
                                    className={`w-full text-white font-medium py-4 px-8 rounded-lg transition-all duration-500 flex items-center justify-center relative overflow-hidden group ${
                                        formStatus.submitting
                                            ? "bg-gray-600 opacity-70 cursor-wait transform-none hover:shadow-none"
                                            : "bg-gradient-to-r from-cyan-600 to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-1"
                                    }`}
                                    disabled={formStatus.submitting}
                                    aria-disabled={formStatus.submitting}
                                >
                                    <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>

                                    {formStatus.submitting ? (
                                        <span className="flex items-center relative z-10">
                                            <LoadingIcon className="-ml-1 mr-3 h-5 w-5 text-white" />
                                            Sending Message...
                                        </span>
                                    ) : (
                                        <span className="flex items-center relative z-10">
                                            <SendIcon className="h-5 w-5 mr-2" />
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

                                {/* Form status messages */}
                                {formStatus.info.msg &&
                                    !formStatus.info.error && (
                                        <div className="mt-6 p-4 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 animate-fade-in transform transition-all duration-300 hover:scale-[1.02]">
                                            <div className="flex items-center">
                                                <SuccessIcon className="h-5 w-5 mr-2 text-cyan-400" />
                                                {formStatus.info.msg}
                                            </div>
                                        </div>
                                    )}

                                {/* Success / error announcements. `aria-live`
                                    means a screen reader reads the result without
                                    the visitor having to go hunting for it. */}
                                <div aria-live="polite" aria-atomic="true">
                                    {formStatus.info.msg &&
                                        formStatus.info.error && (
                                            <div className="mt-6 p-4 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20 animate-fade-in transform transition-all duration-300 hover:scale-[1.02]">
                                                <div className="flex items-center">
                                                    <ErrorIcon className="h-5 w-5 mr-2 text-pink-400" />
                                                    {formStatus.info.msg}
                                                </div>
                                            </div>
                                        )}

                                    {formStatus.info.msg &&
                                        !formStatus.info.error && (
                                            <div className="mt-6 p-4 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-fade-in">
                                                <div className="flex items-center">
                                                    <SuccessIcon className="h-5 w-5 mr-2" />
                                                    {formStatus.info.msg}
                                                </div>
                                            </div>
                                        )}
                                </div>

                                {/* Form validation guidance */}
                                {(errors.name ||
                                    errors.email ||
                                    errors.message) && (
                                    <div className="text-gray-400 text-sm mt-4 flex items-start p-3 bg-dark-900/50 rounded-lg border border-cyan-500/20">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
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
        </section>
    )
}

export default Contact
