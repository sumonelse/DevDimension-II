/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                // Rich dark background with purple undertones
                dark: {
                    950: "#0A0118",
                    900: "#120823",
                    800: "#1A0D33",
                    700: "#231244",
                    600: "#2D1755",
                    500: "#371C66",
                },
                // Vibrant purple accent
                purple: {
                    600: "#7928CA",
                    500: "#8A3FFC",
                    400: "#9B51E0",
                    300: "#AC63FF",
                },
                // Bright cyan accent for contrast
                cyan: {
                    600: "#0BC5EA",
                    500: "#00D4FF",
                    400: "#33DEFF",
                    300: "#66E7FF",
                },
                // Soft pink accent for highlights
                pink: {
                    600: "#D53F8C",
                    500: "#F72585",
                    400: "#FF4D9E",
                    300: "#FF70B8",
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
