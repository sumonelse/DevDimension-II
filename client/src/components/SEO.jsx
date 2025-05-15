import React, { useEffect } from "react"
import personalInfo from "../utils/personalInfo"

/**
 * SEO component for managing document head metadata
 */
const SEO = ({
    title = `${personalInfo.name} | ${personalInfo.title}`,
    description = personalInfo.aboutShort,
    keywords = "developer, portfolio, full-stack, competitive programming, web development, algorithms, problem-solving",
    author = personalInfo.name,
    ogImage = "/og-image.jpg",
    ogUrl = "https://sumitmaurya.dev",
    twitterHandle = personalInfo.social.twitter.username,
}) => {
    useEffect(() => {
        // Update document title
        document.title = title

        // Update meta tags
        updateMetaTag("description", description)
        updateMetaTag("keywords", keywords)
        updateMetaTag("author", author)

        // Update Open Graph tags
        updateMetaTag("og:title", title)
        updateMetaTag("og:description", description)
        updateMetaTag("og:image", ogImage)
        updateMetaTag("og:url", ogUrl)
        updateMetaTag("og:type", "website")

        // Update Twitter tags
        updateMetaTag("twitter:card", "summary_large_image")
        updateMetaTag("twitter:title", title)
        updateMetaTag("twitter:description", description)
        updateMetaTag("twitter:image", ogImage)
        updateMetaTag("twitter:creator", twitterHandle)

        // Add canonical link
        let canonicalLink = document.querySelector('link[rel="canonical"]')
        if (!canonicalLink) {
            canonicalLink = document.createElement("link")
            canonicalLink.rel = "canonical"
            document.head.appendChild(canonicalLink)
        }
        canonicalLink.href = ogUrl
    }, [title, description, keywords, author, ogImage, ogUrl, twitterHandle])

    // Helper function to update meta tags
    const updateMetaTag = (name, content) => {
        let metaTag = document.querySelector(
            `meta[name="${name}"], meta[property="${name}"]`
        )

        if (!metaTag) {
            metaTag = document.createElement("meta")
            if (name.startsWith("og:") || name.startsWith("twitter:")) {
                metaTag.setAttribute("property", name)
            } else {
                metaTag.setAttribute("name", name)
            }
            document.head.appendChild(metaTag)
        }

        metaTag.setAttribute("content", content)
    }

    return null // This component doesn't render anything
}

export default SEO
