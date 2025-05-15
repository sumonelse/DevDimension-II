/**
 * Personal Information Configuration
 *
 * This file centralizes all personal information used throughout the application.
 * Update this file to change your personal details across the entire site.
 */

const personalInfo = {
    // Basic Information
    name: "Sumit Maurya",
    title: "Full-stack Developer",
    email: "sumdev34@gmail.com",
    location: "Mumbai, India",

    // Short descriptions
    tagline:
        "Full-stack developer passionate about creating exceptional digital experiences.",
    aboutShort:
        "Full-stack developer with expertise in modern web technologies.",

    // Social Media Links
    social: {
        github: {
            url: "https://github.com/sumonelse",
            label: "GitHub",
            username: "yourusername",
        },
        linkedin: {
            url: "https://linkedin.com/in/sumitmaurya01",
            label: "LinkedIn",
            username: "yourusername",
        },
        twitter: {
            url: "https://x.com/sumonelse_",
            label: "Twitter",
            username: "@yourusername",
        },
        // Add more social platforms as needed
    },

    // Contact Information
    contact: {
        email: "sumdev34@gmail.com",
        emailLink: "mailto:sumdev34@gmail.com",
        phone: "+91 98765 43210", // Optional
    },

    // Copyright Information
    copyright: {
        name: "Sumit Maurya",
        startYear: 2025, // Will display as "2023-currentYear" if different
    },
}

export default personalInfo
