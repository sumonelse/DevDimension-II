import React from "react"
import personalInfo from "../utils/personalInfo"
import { GithubIcon, LinkedInIcon, TwitterIcon } from "../assets/icons"

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
                            {personalInfo.tagline}
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
                                href={personalInfo.social.github.url}
                                className="w-10 h-10 bg-dark-900 rounded-full flex items-center justify-center text-gray-400 hover:text-purple-400 hover:shadow-neon transition-all duration-300 hover:-translate-y-1"
                                aria-label={personalInfo.social.github.label}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <GithubIcon className="h-5 w-5" />
                            </a>
                            <a
                                href={personalInfo.social.linkedin.url}
                                className="w-10 h-10 bg-dark-900 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:shadow-neon-cyan transition-all duration-300 hover:-translate-y-1"
                                aria-label={personalInfo.social.linkedin.label}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <LinkedInIcon className="h-5 w-5" />
                            </a>
                            <a
                                href={personalInfo.social.twitter.url}
                                className="w-10 h-10 bg-dark-900 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-400 hover:shadow-neon-pink transition-all duration-300 hover:-translate-y-1"
                                aria-label={personalInfo.social.twitter.label}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <TwitterIcon className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-dark-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-500 text-sm mb-4 md:mb-0">
                        &copy;{" "}
                        {personalInfo.copyright.startYear === currentYear
                            ? currentYear
                            : `${personalInfo.copyright.startYear}-${currentYear}`}{" "}
                        <span className="text-purple-400">
                            {personalInfo.name}
                        </span>
                        . All rights reserved.
                    </div>

                    <div className="text-gray-500 text-sm">
                        Made with <span className="text-pink-500">❤</span> and{" "}
                        <span className="text-gradient-purple">React</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
