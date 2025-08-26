import { useState } from "react";
import { motion } from "framer-motion"
import { LayoutGrid, Code, Database, ServerCog, Smartphone, Wrench } from "lucide-react";
const TechChoose = () => {

        const [selectedCategory, setSelectedCategory] = useState('frontend')

        const techOptions = [
        // Frontend
        { id: 1, name: "React", icon: "react", category: "Frontend" },
        { id: 2, name: "Vue.js", icon: "vue", category: "Frontend" },
        { id: 3, name: "Angular", icon: "angular", category: "Frontend" },
        { id: 4, name: "Svelte", icon: "svelte", category: "Frontend" },
        { id: 5, name: "Next.js", icon: "nextjs", category: "Frontend" },
        { id: 6, name: "Nuxt.js", icon: "nuxtjs", category: "Frontend" },
        { id: 7, name: "Tailwind CSS", icon: "tailwind", category: "Frontend" },
        { id: 8, name: "Bootstrap", icon: "bootstrap", category: "Frontend" },
        { id: 9, name: "Material UI", icon: "materialui", category: "Frontend" },
        // Backend
        { id: 10, name: "Node.js", icon: "nodejs", category: "Backend" },
        { id: 11, name: "Express.js", icon: "express", category: "Backend" },
        { id: 12, name: "Laravel", icon: "laravel", category: "Backend" },
        { id: 13, name: "Django", icon: "django", category: "Backend" },
        { id: 14, name: "Flask", icon: "flask", category: "Backend" },
        { id: 15, name: "Spring Boot", icon: "spring", category: "Backend" },
        { id: 16, name: "Ruby on Rails", icon: "rails", category: "Backend" },
        { id: 17, name: "ASP.NET", icon: "dotnet", category: "Backend" },
        // Databases
        { id: 18, name: "MongoDB", icon: "mongodb", category: "Database" },
        { id: 19, name: "MySQL", icon: "mysql", category: "Database" },
        { id: 20, name: "PostgreSQL", icon: "postgresql", category: "Database" },
        { id: 21, name: "SQLite", icon: "sqlite", category: "Database" },
        { id: 22, name: "Firebase", icon: "firebase", category: "Database" },
        // Tools & Others
        { id: 23, name: "Docker", icon: "docker", category: "Tool" },
        { id: 24, name: "Git", icon: "git", category: "Tool" },
        { id: 25, name: "Webpack", icon: "webpack", category: "Tool" },
        { id: 26, name: "Vite", icon: "vite", category: "Tool" },
        { id: 27, name: "Jest", icon: "jest", category: "Testing" },
        { id: 28, name: "Cypress", icon: "cypress", category: "Testing" },
        { id: 29, name: "GraphQL", icon: "graphql", category: "API" },
        { id: 30, name: "REST API", icon: "api", category: "API" },
        { id: 31, name: "Redux", icon: "redux", category: "State Management" },
        { id: 32, name: "MobX", icon: "mobx", category: "State Management" },
        { id: 33, name: "Sass", icon: "sass", category: "CSS Preprocessor" },
        { id: 34, name: "Less", icon: "less", category: "CSS Preprocessor" },
        { id: 35, name: "Jenkins", icon: "jenkins", category: "CI/CD" },
        { id: 36, name: "AWS", icon: "aws", category: "Cloud" },
        { id: 37, name: "Azure", icon: "azure", category: "Cloud" },
        { id: 38, name: "Google Cloud", icon: "gcp", category: "Cloud" },
        { id: 39, name: "Heroku", icon: "heroku", category: "Cloud" },
        { id: 40, name: "Netlify", icon: "netlify", category: "Cloud" },
        { id: 41, name: "Vercel", icon: "vercel", category: "Cloud" },
        { id: 42, name: "Storybook", icon: "storybook", category: "Tool" },
        { id: 43, name: "ESLint", icon: "eslint", category: "Tool" },
        { id: 44, name: "Prettier", icon: "prettier", category: "Tool" },
        { id: 45, name: "Socket.io", icon: "socketio", category: "API" },
        { id: 46, name: "Puppeteer", icon: "puppeteer", category: "Testing" },
        { id: 47, name: "Mocha", icon: "mocha", category: "Testing" },
        { id: 48, name: "Chai", icon: "chai", category: "Testing" },
        { id: 49, name: "Jasmine", icon: "jasmine", category: "Testing" },
        { id: 50, name: "PHP", icon: "php", category: "Backend" },
        { id: 51, name: "Python", icon: "python", category: "Backend" },
        { id: 52, name: "categoryScript", icon: "categoryscript", category: "Frontend" },
        { id: 53, name: "JavaScript", icon: "javascript", category: "Frontend" },
        { id: 54, name: "C#", icon: "csharp", category: "Backend" },
        { id: 55, name: "Java", icon: "java", category: "Backend" },
        { id: 56, name: "Go", icon: "go", category: "Backend" },
        { id: 57, name: "Rust", icon: "rust", category: "Backend" },
        { id: 58, name: "Kotlin", icon: "kotlin", category: "Backend" },
        { id: 59, name: "Swift", icon: "swift", category: "Backend" },
        { id: 60, name: "Redux Toolkit", icon: "redux", category: "State Management" }
    ];

    const categories = [
        { id: 'all', name: 'All', icon: LayoutGrid, count: techOptions.length },
        { id: 'frontend', name: 'Frontend', icon: Code, count: techOptions.filter(tech => tech.category === 'Frontend').length },
        { id: 'backend', name: 'Backend', icon: ServerCog, count: techOptions.filter(tech => tech.category === 'Backend').length },
        { id: 'database', name: 'Database', icon: Database, count: techOptions.filter(tech => tech.category === 'Database').length },
        { id: 'devops', name: 'DevOps', icon: Wrench, count: techOptions.filter(tech => tech.category === 'Devops').length },
        { id: 'mobile', name: 'Mobile', icon: Smartphone, count: techOptions.filter(tech => tech.category === 'Mobile').length },
        { id: 'tools', name: 'Tools', icon: Wrench, count: techOptions.filter(tech => tech.category === 'Tools').length },
    ];

    const itemVariants = {
        hidden: {opacity: 0, y: 30},
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    }

    return(
        <motion.div variants={itemVariants} className="bg-blue-300 w-full max-w-6xl mx-auto h-24">
            <div className="grid md:grid-cols-[70%,30%] gap-8">
                {/* tech stack selection */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-800 text-center">Choose Your Tech Stack</h3>

                    {/* render the techs here */}
                    <div className="bg-white/80 backdrop-blur-sm rounder-2xl p-6 shadow-xl border border-blue-100">
                        <h4>Available Technologies</h4>

                        {/* category filtering */}
                        <div className="mb-6">
                            <div className="flex flex-wrap gap-4">
                                {categories.map((category)=>(
                                    <motion.button
                                        key={category.id}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 ${
                                            selectedCategory === category.id
                                                ? 'bg-blue-500 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        {category.icon && <category.icon className="w-4 h-4 mr-1" />}
                                        {category.name}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </motion.div>
    )
}

export default TechChoose