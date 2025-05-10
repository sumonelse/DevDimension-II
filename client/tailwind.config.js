/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
