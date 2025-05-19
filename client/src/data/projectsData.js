// Project data that can be used across different components
// This will eventually be fetched from an API

export const projects = [
    {
        title: "Silsha - Multi-Vendor E-Commerce Platform",
        description:
            "A comprehensive multi-vendor e-commerce platform with advanced features including user authentication, product management, cart functionality, wishlist, order tracking, and integrated payment processing with PhonePe. The platform supports multiple vendors/artisans with their own dashboards, admin controls, and a responsive user interface.",
        technologies: [
            "React",
            "Node.js",
            "Express",
            "MongoDB",
            "Mongoose",
            "JWT Authentication",
            "Tailwind CSS",
            "PhonePe Payment Integration",
            "Cloudinary",
            "Nodemailer",
            "EKart Logistics API",
        ],
        category: "fullstack",
        color: "purple",
        demoLink: "https://multi-ecomm-demo.example.com",
        codeLink: "https://github.com/yourusername/multi-ecomm",
        image: "multi-ecomm-showcase.jpg",
        difficulty: 4,
        developmentTime: "12 weeks",
        overview: [
            "This e-commerce platform was developed as a complete solution for artisans to showcase and sell their products online. The project required extensive planning and architecture to support multiple vendors while maintaining a seamless user experience.",
            "The development process involved close collaboration with stakeholders, iterative implementation based on feedback, and rigorous testing to ensure reliability and security of the payment and logistics integrations.",
        ],
        highlights: [
            "Delivered a complete freelance solution with ongoing client support and maintenance",
            "Implemented secure JWT authentication with refresh tokens and role-based access control",
            "Built a scalable multi-vendor system with individual dashboards for artisans",
            "Integrated PhonePe payment gateway with comprehensive error handling and transaction verification",
            "Developed EKart logistics integration for automated shipping and delivery tracking",
            "Created a responsive UI with Tailwind CSS optimized for both mobile and desktop users",
            "Implemented advanced product filtering, search, and categorization with performance optimizations",
            "Built comprehensive admin dashboard with sales analytics and reporting features",
            "Successfully serving real customers with 99.9% uptime",
        ],
        panelSize: "panel-large",
        rotation: "-1deg",
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
        difficulty: 3,
        developmentTime: "8 weeks",
        overview: [
            "TaskCollab Pro was designed to solve the challenges of remote team collaboration and project management. The application focuses on providing real-time updates and intuitive interfaces to enhance team productivity.",
            "The development process involved extensive user research to identify pain points in existing task management solutions and iterative design to create a more efficient workflow.",
        ],
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
        difficulty: 2,
        developmentTime: "4 weeks",
        overview: [
            "WeatherNow Dashboard was created to provide users with a more intuitive and visually appealing way to access weather information. The project focused on combining accurate data with an engaging user interface.",
            "The development process emphasized performance optimization and accessibility, ensuring the application works well across different devices and for users with various needs.",
        ],
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
        difficulty: 5,
        developmentTime: "16 weeks",
        overview: [
            "MicroServe Architecture was developed to address the scalability challenges of monolithic applications. This project demonstrates my expertise in designing distributed systems that can handle high traffic loads while maintaining reliability.",
            "The development process involved extensive research into best practices for microservices, careful planning of service boundaries, and implementation of robust communication patterns between services.",
        ],
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
        difficulty: 3,
        developmentTime: "6 weeks",
        overview: [
            "DevPortfolio was created to showcase my work and skills in an engaging and interactive way. The project demonstrates my ability to create visually appealing interfaces with smooth animations and transitions.",
            "The development process focused on creating a unique user experience while maintaining excellent performance and accessibility standards. The design went through multiple iterations based on user feedback.",
        ],
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
        difficulty: 4,
        developmentTime: "10 weeks",
        overview: [
            "SecureAPI Service was developed to provide a robust foundation for building secure and well-documented APIs. The project emphasizes security best practices and developer experience through comprehensive documentation.",
            "The development process involved extensive research into security vulnerabilities and authentication protocols, followed by implementation of multiple layers of protection and thorough testing to ensure data integrity and access control.",
        ],
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
