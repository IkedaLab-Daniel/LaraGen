import { Icon } from "lucide-react"

const SelectTech = () => {

    const techOptions = [
        // Frontend
        { id: 1, name: "React", icon: "react", type: "Frontend" },
        { id: 2, name: "Vue.js", icon: "vue", type: "Frontend" },
        { id: 3, name: "Angular", icon: "angular", type: "Frontend" },
        { id: 4, name: "Svelte", icon: "svelte", type: "Frontend" },
        { id: 5, name: "Next.js", icon: "nextjs", type: "Frontend" },
        { id: 6, name: "Nuxt.js", icon: "nuxtjs", type: "Frontend" },
        { id: 7, name: "Tailwind CSS", icon: "tailwind", type: "Frontend" },
        { id: 8, name: "Bootstrap", icon: "bootstrap", type: "Frontend" },
        { id: 9, name: "Material UI", icon: "materialui", type: "Frontend" },
        // Backend
        { id: 10, name: "Node.js", icon: "nodejs", type: "Backend" },
        { id: 11, name: "Express.js", icon: "express", type: "Backend" },
        { id: 12, name: "Laravel", icon: "laravel", type: "Backend" },
        { id: 13, name: "Django", icon: "django", type: "Backend" },
        { id: 14, name: "Flask", icon: "flask", type: "Backend" },
        { id: 15, name: "Spring Boot", icon: "spring", type: "Backend" },
        { id: 16, name: "Ruby on Rails", icon: "rails", type: "Backend" },
        { id: 17, name: "ASP.NET", icon: "dotnet", type: "Backend" },
        // Databases
        { id: 18, name: "MongoDB", icon: "mongodb", type: "Database" },
        { id: 19, name: "MySQL", icon: "mysql", type: "Database" },
        { id: 20, name: "PostgreSQL", icon: "postgresql", type: "Database" },
        { id: 21, name: "SQLite", icon: "sqlite", type: "Database" },
        { id: 22, name: "Firebase", icon: "firebase", type: "Database" },
        // Tools & Others
        { id: 23, name: "Docker", icon: "docker", type: "Tool" },
        { id: 24, name: "Git", icon: "git", type: "Tool" },
        { id: 25, name: "Webpack", icon: "webpack", type: "Tool" },
        { id: 26, name: "Vite", icon: "vite", type: "Tool" },
        { id: 27, name: "Jest", icon: "jest", type: "Testing" },
        { id: 28, name: "Cypress", icon: "cypress", type: "Testing" },
        { id: 29, name: "GraphQL", icon: "graphql", type: "API" },
        { id: 30, name: "REST API", icon: "api", type: "API" },
        { id: 31, name: "Redux", icon: "redux", type: "State Management" },
        { id: 32, name: "MobX", icon: "mobx", type: "State Management" },
        { id: 33, name: "Sass", icon: "sass", type: "CSS Preprocessor" },
        { id: 34, name: "Less", icon: "less", type: "CSS Preprocessor" },
        { id: 35, name: "Jenkins", icon: "jenkins", type: "CI/CD" },
        { id: 36, name: "AWS", icon: "aws", type: "Cloud" },
        { id: 37, name: "Azure", icon: "azure", type: "Cloud" },
        { id: 38, name: "Google Cloud", icon: "gcp", type: "Cloud" },
        { id: 39, name: "Heroku", icon: "heroku", type: "Cloud" },
        { id: 40, name: "Netlify", icon: "netlify", type: "Cloud" },
        { id: 41, name: "Vercel", icon: "vercel", type: "Cloud" },
        { id: 42, name: "Storybook", icon: "storybook", type: "Tool" },
        { id: 43, name: "ESLint", icon: "eslint", type: "Tool" },
        { id: 44, name: "Prettier", icon: "prettier", type: "Tool" },
        { id: 45, name: "Socket.io", icon: "socketio", type: "API" },
        { id: 46, name: "Puppeteer", icon: "puppeteer", type: "Testing" },
        { id: 47, name: "Mocha", icon: "mocha", type: "Testing" },
        { id: 48, name: "Chai", icon: "chai", type: "Testing" },
        { id: 49, name: "Jasmine", icon: "jasmine", type: "Testing" },
        { id: 50, name: "PHP", icon: "php", type: "Backend" },
        { id: 51, name: "Python", icon: "python", type: "Backend" },
        { id: 52, name: "TypeScript", icon: "typescript", type: "Frontend" },
        { id: 53, name: "JavaScript", icon: "javascript", type: "Frontend" },
        { id: 54, name: "C#", icon: "csharp", type: "Backend" },
        { id: 55, name: "Java", icon: "java", type: "Backend" },
        { id: 56, name: "Go", icon: "go", type: "Backend" },
        { id: 57, name: "Rust", icon: "rust", type: "Backend" },
        { id: 58, name: "Kotlin", icon: "kotlin", type: "Backend" },
        { id: 59, name: "Swift", icon: "swift", type: "Backend" },
        { id: 60, name: "Redux Toolkit", icon: "redux", type: "State Management" }
    ];

    const difficulty = [
        { id: 'easy', label: 'Easy', desc: 'Perfect for beginners' },
        { id: 'medium', label: 'Medium', desc: 'For those with some experience' },
        { id: 'hard', label: 'Hard', desc: 'Challenging for advanced developers' },
        { id: 'expert', label: 'Expert', desc: 'For experts seeking mastery' }
    ];


    return(
        <section>
            <h1>Select Stack</h1>
        </section>
    )
}

export default SelectTech