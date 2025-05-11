/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    safelist: [
        // Color variants for dynamic classes
        "from-purple-400",
        "to-purple-600",
        "from-purple-500",
        "to-purple-700",
        "border-purple-500/20",
        "hover:border-purple-500/50",
        "text-purple-400",
        "bg-purple-500/5",
        "from-pink-400",
        "to-pink-600",
        "from-pink-500",
        "to-pink-700",
        "border-pink-500/20",
        "hover:border-pink-500/50",
        "text-pink-400",
        "bg-pink-500/5",
        "from-cyan-400",
        "to-cyan-600",
        "from-cyan-500",
        "to-cyan-700",
        "border-cyan-500/20",
        "hover:border-cyan-500/50",
        "text-cyan-400",
        "bg-cyan-500/5",
        "from-amber-400",
        "to-amber-600",
        "from-amber-500",
        "to-amber-700",
        "border-amber-500/20",
        "hover:border-amber-500/50",
        "text-amber-400",
        "bg-amber-500/5",
        "from-emerald-400",
        "to-emerald-600",
        "from-emerald-500",
        "to-emerald-700",
        "border-emerald-500/20",
        "hover:border-emerald-500/50",
        "text-emerald-400",
        "bg-emerald-500/5",
        // Add more colors as needed
    ],
    theme: {
        extend: {
            colors: {
                // Enhanced dark theme with deeper blue undertones
                dark: {
                    950: "#080C1F", // Deeper blue-black
                    900: "#0F1631", // Deep navy
                    800: "#151C3D", // Rich indigo
                    700: "#1E2A4F", // Midnight blue
                    600: "#2A3A6A", // Royal blue-purple
                    500: "#364785", // Slate blue
                },
                // Vibrant violet-indigo accent
                purple: {
                    700: "#5B21B6", // Deep violet
                    600: "#7C3AED", // Vivid purple
                    500: "#8B5CF6", // Bright violet
                    400: "#A78BFA", // Light violet
                    300: "#C4B5FD", // Soft lavender
                },
                // Teal-cyan accent for fresh contrast
                cyan: {
                    700: "#0E7490", // Deep teal
                    600: "#0891B2", // Vibrant teal
                    500: "#06B6D4", // Bright cyan
                    400: "#22D3EE", // Light cyan
                    300: "#67E8F9", // Soft cyan
                },
                // Vibrant coral-pink accent for highlights
                pink: {
                    700: "#BE185D", // Deep magenta
                    600: "#DB2777", // Vibrant pink
                    500: "#EC4899", // Bright pink
                    400: "#F472B6", // Light pink
                    300: "#F9A8D4", // Soft pink
                },
                // New accent colors
                amber: {
                    500: "#F59E0B", // Warm amber
                    400: "#FBBF24", // Light amber
                },
                emerald: {
                    500: "#10B981", // Vibrant emerald
                    400: "#34D399", // Light emerald
                },
                // Spider-Verse inspired colors
                spiderverse: {
                    red: "#FF1744",
                    blue: "#304FFE",
                    yellow: "#FFEA00",
                    pink: "#FF4081",
                    cyan: "#00E5FF",
                    purple: "#AA00FF",
                    green: "#00E676",
                    dark: "#0A0A1A",
                    darker: "#050510",
                },
            },
            fontFamily: {
                sans: ["Poppins", "system-ui", "sans-serif"],
                heading: ["Space Grotesk", "sans-serif"],
                mono: ["Fira Code", "monospace"],
            },
            animation: {
                bounce: "bounce 2s infinite",
                float: "float 6s ease-in-out infinite",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "spin-slow": "spin 8s linear infinite",
                gradient: "gradient 8s ease infinite",
                typewriter: "typewriter 2s steps(30) forwards",
                blink: "blink 1s infinite",
                "slide-up": "slideUp 0.5s ease-out forwards",
                "slide-down": "slideDown 0.5s ease-out forwards",
                "slide-in-right": "slideInRight 0.5s ease-out forwards",
                "slide-in-left": "slideInLeft 0.5s ease-out forwards",
                "fade-in": "fadeIn 0.5s ease-out forwards",
                "scale-up": "scaleUp 0.5s ease-out forwards",
                // Spider-Verse animations
                "bounce-slow": "bounce 3s infinite",
                "spider-sense": "spiderSense 1s ease-in-out infinite",
                "web-swing": "webSwing 2s ease-in-out infinite",
                "spider-crawl": "spiderCrawl 3s ease-in-out infinite",
                "comic-flip": "comicFlip 0.5s ease-in-out forwards",
                "dimension-shift": "dimensionShift 5s ease infinite",
                // Enhanced Spider-Verse animations
                "float-slow": "floatSlow 10s ease-in-out infinite",
                "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
                "rotate-slow": "rotateSlow 20s linear infinite",
                "spin-slow-reverse": "spinSlowReverse 12s linear infinite",
                "gradient-shift": "gradientShift 15s ease infinite",
                "glitch-text": "glitchText 3s infinite",
                "web-shoot": "webShoot 0.5s ease-out forwards",
                "portal-pulse": "portalPulse 2s ease-in-out infinite",
                "action-word-pulse": "actionWordPulse 2s infinite alternate",
                "comic-panel-float": "comicPanelFloat 15s ease-in-out infinite",
                "dimension-glitch": "dimensionGlitch 0.5s infinite",
                "color-cycle": "colorCycle 10s infinite",
                "float-up-slow": "floatUpSlow 4s ease-out forwards",
                "float-down": "floatDown 4s ease-out forwards",
            },
            keyframes: {
                bounce: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(10px)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                gradient: {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" },
                },
                typewriter: {
                    from: { width: "0" },
                    to: { width: "100%" },
                },
                blink: {
                    "0%, 100%": { borderColor: "transparent" },
                    "50%": { borderColor: "white" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: 0 },
                    "100%": { transform: "translateY(0)", opacity: 1 },
                },
                slideDown: {
                    "0%": { transform: "translateY(-20px)", opacity: 0 },
                    "100%": { transform: "translateY(0)", opacity: 1 },
                },
                slideInRight: {
                    "0%": { transform: "translateX(50px)", opacity: 0 },
                    "100%": { transform: "translateX(0)", opacity: 1 },
                },
                slideInLeft: {
                    "0%": { transform: "translateX(-50px)", opacity: 0 },
                    "100%": { transform: "translateX(0)", opacity: 1 },
                },
                fadeIn: {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
                scaleUp: {
                    "0%": { transform: "scale(0.8)", opacity: 0 },
                    "100%": { transform: "scale(1)", opacity: 1 },
                },
                // Spider-Verse keyframes
                spiderSense: {
                    "0%": { boxShadow: "0 0 0 0 rgba(255, 204, 0, 0.7)" },
                    "70%": { boxShadow: "0 0 0 15px rgba(255, 204, 0, 0)" },
                    "100%": { boxShadow: "0 0 0 0 rgba(255, 204, 0, 0)" },
                },
                webSwing: {
                    "0%": { transform: "rotate(15deg) translateY(0)" },
                    "50%": { transform: "rotate(-15deg) translateY(-20px)" },
                    "100%": { transform: "rotate(15deg) translateY(0)" },
                },
                spiderCrawl: {
                    "0%": {
                        transform: "translateX(0) translateY(0) rotate(0deg)",
                    },
                    "25%": {
                        transform:
                            "translateX(10px) translateY(-5px) rotate(5deg)",
                    },
                    "50%": {
                        transform:
                            "translateX(0) translateY(-10px) rotate(0deg)",
                    },
                    "75%": {
                        transform:
                            "translateX(-10px) translateY(-5px) rotate(-5deg)",
                    },
                    "100%": {
                        transform: "translateX(0) translateY(0) rotate(0deg)",
                    },
                },
                comicFlip: {
                    "0%": { transform: "perspective(1200px) rotateY(0)" },
                    "100%": {
                        transform: "perspective(1200px) rotateY(180deg)",
                    },
                },
                dimensionShift: {
                    "0%": {
                        transform: "translateX(0) scale(1)",
                        filter: "hue-rotate(0deg)",
                    },
                    "25%": {
                        transform: "translateX(5px) scale(1.02)",
                        filter: "hue-rotate(45deg)",
                    },
                    "50%": {
                        transform: "translateX(-3px) scale(0.98)",
                        filter: "hue-rotate(90deg)",
                    },
                    "75%": {
                        transform: "translateX(2px) scale(1.01)",
                        filter: "hue-rotate(45deg)",
                    },
                    "100%": {
                        transform: "translateX(0) scale(1)",
                        filter: "hue-rotate(0deg)",
                    },
                },
                // Enhanced Spider-Verse keyframes
                floatSlow: {
                    "0%": { transform: "translate(0, 0) rotate(0deg)" },
                    "25%": {
                        transform: "translate(-10px, -15px) rotate(2deg)",
                    },
                    "50%": {
                        transform: "translate(10px, -25px) rotate(-2deg)",
                    },
                    "75%": { transform: "translate(15px, -10px) rotate(1deg)" },
                    "100%": { transform: "translate(0, 0) rotate(0deg)" },
                },
                pulseSubtle: {
                    "0%": { opacity: 0.7, transform: "scale(1)" },
                    "50%": { opacity: 1, transform: "scale(1.05)" },
                    "100%": { opacity: 0.7, transform: "scale(1)" },
                },
                rotateSlow: {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                spinSlowReverse: {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(-360deg)" },
                },
                gradientShift: {
                    "0%": {
                        backgroundPosition: "0% 50%",
                        filter: "hue-rotate(0deg)",
                    },
                    "50%": {
                        backgroundPosition: "100% 50%",
                        filter: "hue-rotate(180deg)",
                    },
                    "100%": {
                        backgroundPosition: "0% 50%",
                        filter: "hue-rotate(360deg)",
                    },
                },
                glitchText: {
                    "0%": {
                        textShadow: "2px 0 0 #ff0000, -2px 0 0 #00ff00",
                        transform: "translate(0)",
                    },
                    "25%": {
                        textShadow: "-2px 0 0 #ff0000, 2px 0 0 #00ff00",
                        transform: "translate(2px, 2px)",
                    },
                    "50%": {
                        textShadow: "2px 0 0 #ff0000, -2px 0 0 #00ff00",
                        transform: "translate(-2px, -2px)",
                    },
                    "75%": {
                        textShadow: "-2px 0 0 #ff0000, 2px 0 0 #00ff00",
                        transform: "translate(2px, -2px)",
                    },
                    "100%": {
                        textShadow: "2px 0 0 #ff0000, -2px 0 0 #00ff00",
                        transform: "translate(0)",
                    },
                },
                webShoot: {
                    "0%": { transform: "scaleX(0)" },
                    "100%": { transform: "scaleX(1)" },
                },
                portalPulse: {
                    "0%": { transform: "scale(1)", opacity: 0.8 },
                    "50%": { transform: "scale(1.1)", opacity: 1 },
                    "100%": { transform: "scale(1)", opacity: 0.8 },
                },
                actionWordPulse: {
                    "0%": { transform: "rotate(-5deg) scale(1)" },
                    "100%": { transform: "rotate(-3deg) scale(1.1)" },
                },
                comicPanelFloat: {
                    "0%": { transform: "translate(0, 0) rotate(0deg)" },
                    "20%": { transform: "translate(20px, -15px) rotate(2deg)" },
                    "40%": {
                        transform: "translate(-15px, -25px) rotate(-1deg)",
                    },
                    "60%": {
                        transform: "translate(-20px, 10px) rotate(-2deg)",
                    },
                    "80%": { transform: "translate(15px, 15px) rotate(1deg)" },
                    "100%": { transform: "translate(0, 0) rotate(0deg)" },
                },
                dimensionGlitch: {
                    "0%": {
                        opacity: 1,
                        transform: "translate(0) skew(0deg)",
                        filter: "hue-rotate(0deg)",
                    },
                    "10%": {
                        opacity: 0.9,
                        transform: "translate(3px, 2px) skew(2deg)",
                        filter: "hue-rotate(60deg)",
                    },
                    "20%": {
                        opacity: 1,
                        transform: "translate(0) skew(0deg)",
                        filter: "hue-rotate(120deg)",
                    },
                    "30%": {
                        opacity: 0.9,
                        transform: "translate(-3px, -2px) skew(-2deg)",
                        filter: "hue-rotate(180deg)",
                    },
                    "40%": {
                        opacity: 1,
                        transform: "translate(0) skew(0deg)",
                        filter: "hue-rotate(240deg)",
                    },
                    "50%": {
                        opacity: 0.9,
                        transform: "translate(3px, -2px) skew(1deg)",
                        filter: "hue-rotate(300deg)",
                    },
                    "60%": {
                        opacity: 1,
                        transform: "translate(0) skew(0deg)",
                        filter: "hue-rotate(360deg)",
                    },
                    "70%": {
                        opacity: 0.9,
                        transform: "translate(-3px, 2px) skew(-1deg)",
                        filter: "hue-rotate(300deg)",
                    },
                    "80%": {
                        opacity: 1,
                        transform: "translate(0) skew(0deg)",
                        filter: "hue-rotate(240deg)",
                    },
                    "90%": {
                        opacity: 0.9,
                        transform: "translate(3px, 2px) skew(2deg)",
                        filter: "hue-rotate(180deg)",
                    },
                    "100%": {
                        opacity: 1,
                        transform: "translate(0) skew(0deg)",
                        filter: "hue-rotate(0deg)",
                    },
                },
                colorCycle: {
                    "0%": { filter: "hue-rotate(0deg)" },
                    "100%": { filter: "hue-rotate(360deg)" },
                },
                floatUpSlow: {
                    "0%": { transform: "translateY(0)", opacity: 0.7 },
                    "100%": { transform: "translateY(-100px)", opacity: 0 },
                },
                floatDown: {
                    "0%": { transform: "translateY(-20px)", opacity: 0 },
                    "20%": { opacity: 0.7 },
                    "80%": { opacity: 0.7 },
                    "100%": { transform: "translateY(100px)", opacity: 0 },
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "gradient-diagonal":
                    "linear-gradient(45deg, var(--tw-gradient-stops))",
            },
            boxShadow: {
                neon: '0 0 5px theme("colors.purple.400"), 0 0 20px theme("colors.purple.500")',
                "neon-cyan":
                    '0 0 5px theme("colors.cyan.400"), 0 0 20px theme("colors.cyan.500")',
                "neon-pink":
                    '0 0 5px theme("colors.pink.400"), 0 0 20px theme("colors.pink.500")',
            },
            backdropBlur: {
                xs: "2px",
            },
            transitionDuration: {
                2000: "2000ms",
                3000: "3000ms",
            },
        },
    },
    plugins: [],
}
