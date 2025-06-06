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
        demoLink: "https://silsha.com",
        codeLink: "https://github.com/sumonelse/multi-ecomm",
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
        title: "DevDimension - Interactive Portfolio with Multiverse Theme",
        description:
            "A creative and interactive portfolio website featuring a unique dimension-switching concept that transforms between a professional portfolio and a Spider-Verse themed experience. The site includes smooth animations, interactive UI elements, responsive design, and accessibility features while showcasing projects and skills in an engaging way.",
        technologies: [
            "React 19",
            "Vite",
            "Tailwind CSS",
            "CSS Animations",
            "Custom Hooks",
            "Context API",
            "Lazy Loading",
            "Suspense",
            "Performance Optimization",
            "Responsive Design",
            "Accessibility Features",
            "Custom Cursor Effects",
        ],
        category: "frontend",
        color: "pink",
        demoLink: "https://devdimension.example.com",
        codeLink: "https://github.com/sumonelse/DevDimension-II",
        image: "devdimension-showcase.jpg",
        difficulty: 4,
        developmentTime: "5 weeks",
        overview: [
            "DevDimension was created as a unique portfolio website that stands out by implementing a creative dimension-switching concept, allowing visitors to toggle between a professional portfolio and a Spider-Verse themed experience.",
            "The project demonstrates advanced React patterns, performance optimization techniques, and creative UI/UX design while maintaining accessibility and responsiveness across all devices.",
        ],
        highlights: [
            "Implemented a unique dimension-switching concept with smooth transition effects",
            "Created two completely different UI themes that share the same content structure",
            "Built custom hooks for scroll animations, parallax effects, and intersection observers",
            "Optimized performance with React Suspense and lazy loading for non-critical components",
            "Designed interactive UI elements including custom cursors and floating controls",
            "Implemented accessibility features for inclusive user experience",
            "Used Context API for global state management across dimensions",
            "Created responsive layouts that work seamlessly on mobile and desktop",
            "Added creative animations and micro-interactions for engaging user experience",
            "Implemented SEO best practices with meta tags and semantic HTML",
        ],
        panelSize: "panel-medium",
        rotation: "1deg",
    },
    {
        title: "Hand Cricket Game",
        description:
            "A nostalgic digital adaptation of the popular hand cricket game with a modern twist. This Progressive Web App (PWA) allows users to play the classic hand gesture cricket game against a computer opponent with adjustable difficulty levels, customizable settings, and offline playability.",
        technologies: [
            "HTML5",
            "CSS3",
            "JS",
            "Progressive Web App (PWA)",
            "LocalStorage API",
            "Service Workers",
        ],
        category: "frontend",
        color: "cyan",
        demoLink: "https://hndcricket.netlify.app",
        codeLink: "https://github.com/sumonelse/HandCricket",
        image: "hand-cricket-screenshot.jpg",
        highlights: [
            "Implemented a fully responsive UI with light/dark theme support",
            "Created an intelligent computer opponent with three difficulty levels",
            "Built as a Progressive Web App with offline functionality",
            "Added audio effects and confetti animations for an engaging experience",
            "Integrated game statistics tracking using LocalStorage",
        ],
        difficulty: 3,
        developmentTime: "3 weeks",
        panelSize: "panel-small",
        rotation: "-1deg",
    },
    {
        title: "Shortie - URL Shortener",
        description:
            "A modern URL shortening service that transforms long, unwieldy links into clean, manageable URLs in seconds. Features include custom slug creation, QR code generation, and Redis caching for high performance.",
        technologies: [
            "React",
            "Node.js",
            "Express",
            "MongoDB",
            "Redis",
            "Tailwind CSS",
            "QR Code Generation",
        ],
        category: "fullstack",
        color: "purple",
        demoLink: "https://shortie-9fgs.onrender.com/",
        codeLink: "https://github.com/sumonelse/Shortie",
        image: "url-shortener-preview.jpg",
        difficulty: 3,
        developmentTime: "4 weeks",
        overview: [
            "Shortie is a full-stack URL shortening application that provides a simple and efficient way to create shortened URLs. The project demonstrates my ability to build a complete web application with both frontend and backend components.",
            "The application features a clean, responsive UI built with React and Tailwind CSS, while the backend leverages Node.js, Express, and MongoDB for robust data storage. Redis caching is implemented to improve performance for frequently accessed URLs.",
        ],
        highlights: [
            "Implemented Redis caching to improve response times for popular URLs",
            "Created QR code generation functionality with customizable size options",
            "Built URL validation using regex patterns for security and reliability",
            "Designed a clean, responsive UI with Tailwind CSS",
            "Implemented custom slug creation for personalized short URLs",
            "Added social sharing capabilities for shortened URLs",
            "Utilized security best practices with Helmet.js and rate limiting",
            "Optimized performance with compression middleware",
        ],

        panelSize: "panel-wide",
        rotation: "0.5deg",
    },
    {
        title: "NeuralDrive - Self-Driving Car Simulation",
        description:
            "An advanced neural network-powered self-driving car simulation that demonstrates machine learning principles in action. The project features a realistic physics engine, sensor systems, neural network visualization, and evolutionary learning algorithms that allow cars to learn to navigate through traffic autonomously.",
        technologies: [
            "JS",
            "HTML5 Canvas",
            "NeuralNet",
            "Genetic Algorithms",
            "Physics Simulation",
            "Collision Detection",
            "Sensor Systems",
            "Real-time Visualization",
        ],
        category: "ai",
        color: "pink",
        demoLink: "https://neuraldrive.vercel.app/",
        codeLink:
            "https://github.com/sumonelse/NeuralDrive-Self_Driving_Car_Simulator",
        image: "neuraldrive-showcase.jpg",
        difficulty: 4,
        developmentTime: "6 weeks",
        overview: [
            "NeuralDrive is a sophisticated self-driving car simulation that demonstrates how neural networks can learn to navigate complex environments through evolutionary algorithms. The project was built from scratch using vanilla JavaScript and HTML5 Canvas, with no external libraries or frameworks.",
            "The simulation implements a complete physics engine with realistic car movement, sensor systems that detect the environment, and a neural network 'brain' that processes sensor data to make driving decisions. The evolutionary learning system allows cars to improve over generations through natural selection and mutation.",
        ],
        highlights: [
            "Implemented a multi-layer neural network architecture with customizable topology and mutation capabilities",
            "Developed a realistic physics engine with acceleration, friction, and steering mechanics",
            "Created an advanced sensor system that simulates LIDAR/radar technology used in real self-driving vehicles",
            "Built a procedural traffic generation system that creates diverse and challenging driving scenarios",
            "Designed a real-time neural network visualization that shows the decision-making process",
            "Implemented genetic algorithm principles with natural selection of the best-performing cars",
            "Created a persistent learning system that saves and loads neural networks via local storage",
            "Optimized collision detection using polygon intersection algorithms for realistic interactions",
            "Developed a camera system that follows the best-performing car for improved visualization",
            "Built a responsive UI that works across different screen sizes and devices",
        ],
        panelSize: "panel-medium",
        rotation: "-1.5deg",
    },
    {
        title: "Inrun - Knowledge Blog",
        description:
            "A responsive, feature-rich blog platform focused on sharing knowledge across multiple niches including technology, gaming, movies, and animation. The site features a clean, modern UI with light/dark mode toggle and mobile-friendly design.",
        technologies: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Responsive Design",
            "Local Storage",
            "Google Analytics",
            "SEO Optimization",
        ],
        category: "frontend",
        color: "cyan",
        demoLink: "https://inrun.netlify.app",
        codeLink: "https://github.com/sumonelse/inrun",
        image: "inrun-preview.jpg",
        difficulty: 2,
        developmentTime: "7 weeks",
        overview: [
            "inrun is a modern, responsive blog platform designed to share knowledge across various niches including technology, gaming, movies, and animation. The project demonstrates my ability to create a clean, user-friendly interface with attention to accessibility and user experience.",
            "The site features a thoughtfully designed UI with both light and dark mode options that persist across sessions using local storage. The responsive design ensures a seamless experience across all device sizes, from mobile phones to large desktop screens.",
        ],
        highlights: [
            "Implemented a persistent light/dark mode toggle using localStorage for enhanced user experience",
            "Created a fully responsive design that adapts to various screen sizes using CSS media queries",
            "Built a clean, modern UI with neumorphic design elements and subtle animations",
            "Optimized performance with efficient CSS and JavaScript",
            "Implemented SEO best practices including meta tags, semantic HTML, and proper heading structure",
            "Integrated Google Analytics for visitor tracking and site performance monitoring",
        ],
        panelSize: "panel-tall",
        rotation: "2deg",
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
