import React, { useState, useEffect } from "react"

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
            className="py-24 bg-dark-800 relative overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMHYyaC0ydi0yaDJ6bTIgMGgydjJoLTJ2LTJ6bS02IDBoMnYyaC0ydi0yem0yLTRoMnYyaC0ydi0yem0yIDBIMzZ2Mmgtc3YtMnptMC00aDJ2MmgtMnYtMnptMiAwaDJ2MmgtMnYtMnptMi00aDJ2MmgtMnYtMnptMCAwaDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-cyan-500/5 rounded-tl-full blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section header */}
                <div className="text-center mb-16 reveal">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                        Get In <span className="text-gradient-cyan">Touch</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-cyan mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Have a project in mind or want to discuss potential
                        opportunities? Feel free to reach out!
                    </p>
                </div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact info */}
                    <div className="reveal" style={{ animationDelay: "0.1s" }}>
                        <div className="h-full glass-dark p-8 rounded-xl border border-purple-500/20 shadow-lg hover:shadow-purple-500/5 transition-all duration-500">
                            <h3 className="text-2xl font-bold text-white mb-8 relative inline-block">
                                Contact Information
                                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-purple"></span>
                            </h3>

                            <div className="space-y-8">
                                <div className="flex items-start gap-5 group">
                                    <div className="bg-purple-500/10 p-3 rounded-lg text-purple-400 group-hover:bg-purple-500/20 transition-all duration-300 group-hover:scale-110">
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
                                            href="mailto:sumit.maurya@example.com"
                                            className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                                        >
                                            sumit.maurya@example.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5 group">
                                    <div className="bg-cyan-500/10 p-3 rounded-lg text-cyan-400 group-hover:bg-cyan-500/20 transition-all duration-300 group-hover:scale-110">
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
                                        <p className="text-gray-400">India</p>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <h4 className="text-white font-medium mb-5 relative inline-block">
                                        Social Profiles
                                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></span>
                                    </h4>
                                    <div className="flex gap-5">
                                        {/* GitHub */}
                                        <a
                                            href="#"
                                            className="group relative w-12 h-12 rounded-lg flex items-center justify-center bg-dark-800 border border-purple-500/30 text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                                            aria-label="GitHub"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 relative z-10"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </a>

                                        {/* LinkedIn */}
                                        <a
                                            href="#"
                                            className="group relative w-12 h-12 rounded-lg flex items-center justify-center bg-dark-800 border border-cyan-500/30 text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                                            aria-label="LinkedIn"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 relative z-10"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                        </a>

                                        {/* Twitter/X */}
                                        <a
                                            href="#"
                                            className="group relative w-12 h-12 rounded-lg flex items-center justify-center bg-dark-800 border border-pink-500/30 text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                                            aria-label="Twitter"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 relative z-10"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                            </svg>
                                        </a>

                                        {/* CodePen */}
                                        <a
                                            href="#"
                                            className="group relative w-12 h-12 rounded-lg flex items-center justify-center bg-dark-800 border border-purple-500/30 text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                                            aria-label="CodePen"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 relative z-10"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M24 8.182l-.018-.087-.017-.05c-.01-.024-.018-.05-.03-.075-.003-.018-.015-.034-.02-.05l-.035-.067-.03-.05-.044-.06-.046-.045-.06-.045-.046-.03-.06-.044-.044-.04-.015-.02L12.58.19c-.347-.232-.796-.232-1.142 0L.453 7.502l-.015.015-.044.035-.06.05-.038.04-.05.056-.037.045-.05.06c-.02.017-.03.03-.03.046l-.05.06-.02.06c-.02.01-.02.04-.03.07l-.01.05C0 8.12 0 8.15 0 8.18v7.497c0 .044.003.09.01.135l.01.046c.005.03.01.06.02.086l.015.05c.01.027.016.053.027.075l.022.05c0 .01.015.04.03.06l.03.04c.015.01.03.04.045.06l.03.04.04.04c.01.013.01.03.03.03l.06.042.04.03.01.014 10.97 7.33c.164.12.375.163.57.163s.39-.06.57-.18l10.99-7.28.014-.01.046-.037.06-.043.048-.036.052-.058.033-.045.04-.06.03-.05.03-.07.016-.052.03-.077.015-.045.03-.08v-7.5c0-.05 0-.095-.016-.14l-.014-.045.044.003zm-11.99 6.28l-3.65-2.44 3.65-2.442 3.65 2.44-3.65 2.44zm-1.034-6.674l-4.473 2.99L2.89 8.362l8.086-5.39V7.79zm-6.33 4.233l-2.582 1.73V10.3l2.582 1.726zm1.857 1.25l4.473 2.99v4.82L2.89 15.69l3.618-2.417v-.004zm6.537 2.99l4.474-2.98 3.613 2.42-8.087 5.39v-4.82zm6.33-4.23l2.583-1.72v3.456l-2.583-1.73zm-1.855-1.24L13.042 7.8V2.97l8.085 5.39-3.612 2.415v.003z" />
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
                    <div className="reveal" style={{ animationDelay: "0.3s" }}>
                        <div className="h-full glass-dark p-8 rounded-xl border border-cyan-500/20 shadow-lg hover:shadow-cyan-500/5 transition-all duration-500">
                            <h3 className="text-2xl font-bold text-white mb-8 relative inline-block">
                                Send Me a Message
                                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-cyan"></span>
                            </h3>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {/* Form status message */}
                                {formStatus.info.msg && (
                                    <div
                                        className={`p-4 rounded-lg ${
                                            formStatus.info.error
                                                ? "bg-pink-500/10 text-pink-400 border border-pink-500/20"
                                                : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                                        } animate-fade-in`}
                                    >
                                        {formStatus.info.msg}
                                    </div>
                                )}

                                <div className="group">
                                    <label
                                        htmlFor="name"
                                        className={`block mb-2 transition-colors duration-300 ${
                                            errors.name && touched.name
                                                ? "text-pink-400"
                                                : "text-gray-400 group-focus-within:text-cyan-400"
                                        }`}
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`w-full bg-dark-900 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                                            errors.name && touched.name
                                                ? "border-pink-500/50 focus:ring-pink-500"
                                                : "border-dark-600 focus:ring-cyan-500 focus:border-transparent"
                                        }`}
                                        placeholder="Your name"
                                    />
                                    {errors.name && touched.name && (
                                        <p className="mt-1 text-pink-400 text-sm">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div className="group">
                                    <label
                                        htmlFor="email"
                                        className={`block mb-2 transition-colors duration-300 ${
                                            errors.email && touched.email
                                                ? "text-pink-400"
                                                : "text-gray-400 group-focus-within:text-cyan-400"
                                        }`}
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`w-full bg-dark-900 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                                            errors.email && touched.email
                                                ? "border-pink-500/50 focus:ring-pink-500"
                                                : "border-dark-600 focus:ring-cyan-500 focus:border-transparent"
                                        }`}
                                        placeholder="Your email"
                                    />
                                    {errors.email && touched.email && (
                                        <p className="mt-1 text-pink-400 text-sm">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div className="group">
                                    <label
                                        htmlFor="subject"
                                        className="block text-gray-400 mb-2 group-focus-within:text-cyan-400 transition-colors duration-300"
                                    >
                                        Subject (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Subject of your message"
                                    />
                                </div>

                                <div className="group">
                                    <label
                                        htmlFor="message"
                                        className={`block mb-2 transition-colors duration-300 ${
                                            errors.message && touched.message
                                                ? "text-pink-400"
                                                : "text-gray-400 group-focus-within:text-cyan-400"
                                        }`}
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`w-full bg-dark-900 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                                            errors.message && touched.message
                                                ? "border-pink-500/50 focus:ring-pink-500"
                                                : "border-dark-600 focus:ring-cyan-500 focus:border-transparent"
                                        }`}
                                        placeholder="Your message"
                                    ></textarea>
                                    {errors.message && touched.message && (
                                        <p className="mt-1 text-pink-400 text-sm">
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
        </section>
    )
}

export default Contact
