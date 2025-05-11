import React, { useEffect } from "react"

/**
 * Component to enhance accessibility features
 * - Adds keyboard navigation support
 * - Improves focus management
 * - Adds screen reader announcements
 */
const AccessibilityHelper = () => {
    useEffect(() => {
        // Add skip to content link
        const addSkipLink = () => {
            const skipLink = document.createElement("a")
            skipLink.href = "#main-content"
            skipLink.className = "skip-link"
            skipLink.textContent = "Skip to main content"
            document.body.insertBefore(skipLink, document.body.firstChild)

            // Add styles for skip link
            const style = document.createElement("style")
            style.textContent = `
        .skip-link {
          position: absolute;
          top: -40px;
          left: 0;
          background: #8b5cf6;
          color: white;
          padding: 8px;
          z-index: 100;
          transition: top 0.2s;
        }
        
        .skip-link:focus {
          top: 0;
        }
      `
            document.head.appendChild(style)
        }

        // Enhance focus visibility
        const enhanceFocus = () => {
            const style = document.createElement("style")
            style.textContent = `
        :focus {
          outline: 2px solid #8b5cf6 !important;
          outline-offset: 2px !important;
        }
        
        :focus:not(:focus-visible) {
          outline: none !important;
        }
        
        :focus-visible {
          outline: 2px solid #8b5cf6 !important;
          outline-offset: 2px !important;
        }
      `
            document.head.appendChild(style)
        }

        // Add ARIA landmarks
        const addAriaLandmarks = () => {
            // Add role="main" to main content
            const mainContent =
                document.querySelector("main") ||
                document.getElementById("main-content")
            if (mainContent) {
                mainContent.setAttribute("role", "main")
                mainContent.setAttribute("id", "main-content")
            }

            // Add role="banner" to header
            const header = document.querySelector("header")
            if (header) {
                header.setAttribute("role", "banner")
            }

            // Add role="contentinfo" to footer
            const footer = document.querySelector("footer")
            if (footer) {
                footer.setAttribute("role", "contentinfo")
            }
        }

        // Add keyboard navigation for custom components
        const addKeyboardNavigation = () => {
            // Make custom buttons keyboard accessible
            document.querySelectorAll('[role="button"]').forEach((button) => {
                if (!button.getAttribute("tabindex")) {
                    button.setAttribute("tabindex", "0")
                }

                button.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        button.click()
                    }
                })
            })
        }

        // Initialize accessibility enhancements
        addSkipLink()
        enhanceFocus()
        addAriaLandmarks()
        addKeyboardNavigation()

        // Re-run keyboard navigation setup when DOM changes
        const observer = new MutationObserver(() => {
            addKeyboardNavigation()
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        })

        return () => {
            observer.disconnect()
        }
    }, [])

    return null // This component doesn't render anything
}

export default AccessibilityHelper
