// Project data that can be used across different components
// This will eventually be fetched from an API

export const projects = [
    {
        title: "ShopEase E-Commerce",
        description:
            "A comprehensive e-commerce platform with advanced features including user authentication, product filtering, cart management, payment processing with Stripe, and order tracking. Implemented admin dashboard for inventory and order management.",
        technologies: [
            "React",
            "Node.js",
            "MongoDB",
            "Express",
            "Redux",
            "Stripe API",
        ],
        category: "fullstack",
        color: "purple",
        demoLink: "https://shopease-demo.example.com",
        codeLink: "https://github.com/sumitmaurya/shopease",
        image: "ecommerce-placeholder.jpg",
        highlights: [
            "Implemented JWT authentication with refresh tokens",
            "Built responsive UI with Material UI components",
            "Integrated real-time inventory updates with Socket.io",
            "Achieved 95% Lighthouse performance score",
        ],
        panelSize: "panel-large",
        rotation: "-2deg",
    },
    {
        title: "TaskCollab Pro",
        description:
            "A collaborative task management application with real-time updates, team workspaces, and progress tracking. Features include drag-and-drop task organization, deadline notifications, file attachments, and detailed analytics dashboard.",
        technologies: [
            "Next.js",
            "Socket.io",
            "MongoDB",
            "Express",
            "Chart.js",
            "AWS S3",
        ],
        category: "fullstack",
        color: "pink",
        demoLink: "https://taskcollab.example.com",
        codeLink: "https://github.com/sumitmaurya/taskcollab",
        image: "task-manager-placeholder.jpg",
        highlights: [
            "Implemented real-time collaboration with Socket.io",
            "Built custom drag-and-drop kanban board",
            "Integrated AWS S3 for file storage",
            "Optimized with Next.js SSR for improved SEO",
        ],
        panelSize: "panel-medium",
        rotation: "1deg",
    },
    {
        title: "WeatherNow Dashboard",
        description:
            "An interactive weather application providing real-time weather data, 7-day forecasts, and historical weather patterns. Features include location-based weather, interactive maps, severe weather alerts, and customizable dashboard widgets.",
        technologies: [
            "React",
            "OpenWeather API",
            "Mapbox",
            "CSS Modules",
            "PWA",
        ],
        category: "frontend",
        color: "cyan",
        demoLink: "https://weathernow.example.com",
        codeLink: "https://github.com/sumitmaurya/weathernow",
        image: "weather-placeholder.jpg",
        highlights: [
            "Implemented as Progressive Web App with offline capabilities",
            "Built interactive weather maps with Mapbox",
            "Optimized API calls with caching strategies",
            "Added dark mode and accessibility features",
        ],
        panelSize: "panel-small",
        rotation: "-1deg",
    },
    {
        title: "MicroServe Architecture",
        description:
            "A scalable microservice architecture for a content delivery platform. Implemented service discovery, API gateway, load balancing, circuit breaking, and distributed logging. Containerized with Docker and orchestrated with Kubernetes.",
        technologies: [
            "Docker",
            "Kubernetes",
            "Node.js",
            "RabbitMQ",
            "MongoDB",
            "Redis",
            "ELK Stack",
        ],
        category: "backend",
        color: "purple",
        demoLink: "https://microserve-docs.example.com",
        codeLink: "https://github.com/sumitmaurya/microserve",
        image: "microservice-placeholder.jpg",
        highlights: [
            "Implemented event-driven architecture with RabbitMQ",
            "Built centralized logging with ELK stack",
            "Designed CI/CD pipeline with GitHub Actions",
            "Achieved 99.9% service uptime with auto-scaling",
        ],
        panelSize: "panel-wide",
        rotation: "0.5deg",
    },
    {
        title: "DevPortfolio",
        description:
            "A modern, responsive portfolio website with interactive UI elements, animations, and dark/light mode. Features include dynamic content loading, contact form with validation, and optimized performance metrics.",
        technologies: [
            "React",
            "Tailwind CSS",
            "Vite",
            "Framer Motion",
            "EmailJS",
        ],
        category: "frontend",
        color: "pink",
        demoLink: "https://sumitmaurya.dev",
        codeLink: "https://github.com/sumitmaurya/portfolio",
        image: "portfolio-placeholder.jpg",
        highlights: [
            "Implemented smooth animations with Framer Motion",
            "Built custom theme system with Tailwind CSS",
            "Optimized for performance with 100% Lighthouse score",
            "Added SEO optimizations and meta tags",
        ],
        panelSize: "panel-medium",
        rotation: "-1.5deg",
    },
    {
        title: "SecureAPI Service",
        description:
            "A production-ready RESTful API service with comprehensive security features including OAuth2 authentication, role-based access control, rate limiting, request validation, and detailed API documentation with Swagger.",
        technologies: [
            "Node.js",
            "Express",
            "MongoDB",
            "JWT",
            "OAuth2",
            "Swagger",
            "Jest",
        ],
        category: "backend",
        color: "cyan",
        demoLink: "https://api-docs.example.com",
        codeLink: "https://github.com/sumitmaurya/secureapi",
        image: "api-placeholder.jpg",
        highlights: [
            "Implemented OAuth2 authentication flow",
            "Built comprehensive test suite with Jest",
            "Added rate limiting and request validation",
            "Created detailed API documentation with Swagger",
        ],
        panelSize: "panel-tall",
        rotation: "2deg",
    },
]

// Function to fetch projects - will be used in the future when API is implemented
export const fetchProjects = async () => {
    try {
        // This is a placeholder for future API implementation
        // const response = await fetch('/api/projects');
        // const data = await response.json();
        // return data;

        // For now, return the hardcoded projects
        return projects
    } catch (error) {
        console.error("Error fetching projects:", error)
        // Return hardcoded projects as fallback
        return projects
    }
}
