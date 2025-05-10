import React from "react"

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-dark-950 border-t border-dark-800 py-12 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500"></div>
            <div className="absolute bottom-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMHYyaC0ydi0yaDJ6bTIgMGgydjJoLTJ2LTJ6bS02IDBoMnYyaC0ydi0yem0yLTRoMnYyaC0ydi0yem0yIDBIMzZ2Mmgtc3YtMnptMC00aDJ2MmgtMnYtMnptMiAwaDJ2MmgtMnYtMnptMi00aDJ2MmgtMnYtMnptMCAwaDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Logo and tagline */}
                    <div className="flex flex-col items-center md:items-start">
                        <a
                            href="#hero"
                            className="text-3xl font-bold font-heading flex items-center group mb-4"
                        >
                            <span className="text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-purple">
                                SM
                            </span>
                            <span className="text-purple-400 group-hover:text-cyan-400 transition-colors duration-300">
                                .
                            </span>
                        </a>
                        <p className="text-gray-400 text-center md:text-left max-w-xs">
                            Full-stack developer passionate about creating
                            exceptional digital experiences.
                        </p>
                    </div>

                    {/* Quick links */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-white font-bold mb-4 relative inline-block">
                            Quick Links
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-purple transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                        </h3>
                        <div className="flex flex-col space-y-2">
                            <a
                                href="#about"
                                className="text-gray-400 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 inline-flex transform"
                            >
                                About
                            </a>
                            <a
                                href="#skills"
                                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-flex transform"
                            >
                                Skills
                            </a>
                            <a
                                href="#projects"
                                className="text-gray-400 hover:text-pink-400 transition-colors duration-300 hover:translate-x-1 inline-flex transform"
                            >
                                Projects
                            </a>
                            <a
                                href="#contact"
                                className="text-gray-400 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 inline-flex transform"
                            >
                                Contact
                            </a>
                        </div>
                    </div>

                    {/* Social links */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-white font-bold mb-4 relative inline-block">
                            Connect
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-cyan transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                        </h3>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 bg-dark-900 rounded-full flex items-center justify-center text-gray-400 hover:text-purple-400 hover:shadow-neon transition-all duration-300 hover:-translate-y-1"
                                aria-label="GitHub"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-dark-900 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:shadow-neon-cyan transition-all duration-300 hover:-translate-y-1"
                                aria-label="LinkedIn"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-dark-900 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-400 hover:shadow-neon-pink transition-all duration-300 hover:-translate-y-1"
                                aria-label="Twitter"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-dark-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-500 text-sm mb-4 md:mb-0">
                        &copy; {currentYear}{" "}
                        <span className="text-purple-400">Sumit Maurya</span>.
                        All rights reserved.
                    </div>

                    <div className="text-gray-500 text-sm">
                        Made with <span className="text-pink-500">❤</span> and{" "}
                        <span className="text-gradient-purple">React</span>
                    </div>
                </div>
            </div>

            {/* Back to top button */}
            <a
                href="#hero"
                className="fixed bottom-6 right-6 w-12 h-12 bg-dark-800 rounded-full flex items-center justify-center text-purple-400 hover:text-white hover:bg-gradient-purple transition-all duration-300 shadow-lg hover:shadow-neon z-50 group"
                aria-label="Back to top"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 transform group-hover:-translate-y-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                </svg>
            </a>
        </footer>
    )
}

export default Footer
