import { useState } from "react";
import { motion } from "framer-motion"
import { LayoutGrid, Code, Database, ServerCog, Smartphone, Wrench } from "lucide-react";
const TechChoose = () => {

        const [selectedCategory, setSelectedCategory] = useState('frontend')

        const techOptions = [
        // Frontend
    { id: 1, name: "React", icon: "react", category: "frontend" },
    { id: 2, name: "Vue.js", icon: "vue", category: "frontend" },
    { id: 3, name: "Angular", icon: "angular", category: "frontend" },
    { id: 4, name: "Svelte", icon: "svelte", category: "frontend" },
    { id: 5, name: "Next.js", icon: "nextjs", category: "frontend" },
    { id: 6, name: "Nuxt.js", icon: "nuxtjs", category: "frontend" },
    { id: 7, name: "Tailwind CSS", icon: "tailwind", category: "frontend" },
    { id: 8, name: "Bootstrap", icon: "bootstrap", category: "frontend" },
    { id: 9, name: "Material UI", icon: "materialui", category: "frontend" },
    // Backend
    { id: 10, name: "Node.js", icon: "nodejs", category: "backend" },
    { id: 11, name: "Express.js", icon: "express", category: "backend" },
    { id: 12, name: "Laravel", icon: "laravel", category: "backend" },
    { id: 13, name: "Django", icon: "django", category: "backend" },
    { id: 14, name: "Flask", icon: "flask", category: "backend" },
    { id: 15, name: "Spring Boot", icon: "spring", category: "backend" },
    { id: 16, name: "Ruby on Rails", icon: "rails", category: "backend" },
    { id: 17, name: "ASP.NET", icon: "dotnet", category: "backend" },
    // Database
    { id: 18, name: "MongoDB", icon: "mongodb", category: "database" },
    { id: 19, name: "MySQL", icon: "mysql", category: "database" },
    { id: 20, name: "PostgreSQL", icon: "postgresql", category: "database" },
    { id: 21, name: "SQLite", icon: "sqlite", category: "database" },
    { id: 22, name: "Firebase", icon: "firebase", category: "database" },
    // DevOps
    { id: 23, name: "Docker", icon: "docker", category: "devops" },
    { id: 24, name: "Jenkins", icon: "jenkins", category: "devops" },
    // Mobile
    { id: 25, name: "React Native", icon: "react", category: "mobile" },
    { id: 26, name: "Flutter", icon: "flutter", category: "mobile" },
    { id: 27, name: "Swift", icon: "swift", category: "mobile" },
    { id: 28, name: "Kotlin", icon: "kotlin", category: "mobile" },
    // Tools
    { id: 29, name: "Git", icon: "git", category: "tools" },
    { id: 30, name: "Webpack", icon: "webpack", category: "tools" },
    { id: 31, name: "Vite", icon: "vite", category: "tools" },
    { id: 32, name: "Jest", icon: "jest", category: "tools" },
    { id: 33, name: "Cypress", icon: "cypress", category: "tools" },
    { id: 34, name: "Storybook", icon: "storybook", category: "tools" },
    { id: 35, name: "ESLint", icon: "eslint", category: "tools" },
    { id: 36, name: "Prettier", icon: "prettier", category: "tools" },
    { id: 37, name: "Sass", icon: "sass", category: "tools" },
    { id: 38, name: "Less", icon: "less", category: "tools" },
    // API
    { id: 39, name: "GraphQL", icon: "graphql", category: "tools" },
    { id: 40, name: "REST API", icon: "api", category: "tools" },
    // State Management
    { id: 41, name: "Redux", icon: "redux", category: "tools" },
    { id: 42, name: "MobX", icon: "mobx", category: "tools" },
    // Testing
    { id: 43, name: "Puppeteer", icon: "puppeteer", category: "tools" },
    { id: 44, name: "Mocha", icon: "mocha", category: "tools" },
    { id: 45, name: "Chai", icon: "chai", category: "tools" },
    { id: 46, name: "Jasmine", icon: "jasmine", category: "tools" },
    // Other
    { id: 47, name: "PHP", icon: "php", category: "backend" },
    { id: 48, name: "Python", icon: "python", category: "backend" },
    { id: 49, name: "JavaScript", icon: "javascript", category: "frontend" },
    { id: 50, name: "TypeScript", icon: "typescript", category: "frontend" },
    { id: 51, name: "C#", icon: "csharp", category: "backend" },
    { id: 52, name: "Java", icon: "java", category: "backend" },
    { id: 53, name: "Go", icon: "go", category: "backend" },
    { id: 54, name: "Rust", icon: "rust", category: "backend" },
    { id: 55, name: "Redux Toolkit", icon: "redux", category: "tools" }
    ];

    const categories = [
        { id: 'all', name: 'All', icon: LayoutGrid, count: techOptions.length },
        { id: 'frontend', name: 'Frontend', icon: Code, count: techOptions.filter(tech => tech.category === 'frontend').length },
        { id: 'backend', name: 'Backend', icon: ServerCog, count: techOptions.filter(tech => tech.category === 'backend').length },
        { id: 'database', name: 'Database', icon: Database, count: techOptions.filter(tech => tech.category === 'database').length },
        { id: 'devops', name: 'DevOps', icon: Wrench, count: techOptions.filter(tech => tech.category === 'devops').length },
        { id: 'mobile', name: 'Mobile', icon: Smartphone, count: techOptions.filter(tech => tech.category === 'mobile').length },
        { id: 'tools', name: 'Tools', icon: Wrench, count: techOptions.filter(tech => tech.category === 'tools').length },
    ];

    const filteredTechOptions = selectedCategory === 'all'
    ? techOptions
    : techOptions.filter(
        techOption => techOption.category === selectedCategory)

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
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-blue-100">
                        <h4 className="text-lg font-semibold text-gray-700 mb-4">Available Technologies</h4>

                        {/* category filtering */}
                        <div className="mb-6">
                            <div className="flex flex-wrap gap-4">
                                {categories.map((category)=>(
                                    <motion.button
                                        key={category.id}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setSelectedCategory(category.id)
                                            console.log(selectedCategory)
                                        }}
                                        className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 ${
                                            selectedCategory === category.id
                                                ? 'bg-blue-500 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        {category.icon && <category.icon className="w-4 h-4 mr-1" />}
                                        {category.name} ({category.count})
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* tech options here */}
                        <motion.div
                            layout
                            className="grid grid-cols-4 gap-3 min-h-48"
                        >
                            {filteredTechOptions.map((tech) => (
                                <motion.div
                                    key={tech.id}
                                    layout
                                    className="flex flex-col items-center justify-center p-2 bg-white rounded-xl shadow hover:shadow-lg transition-all duration-200 border border-gray-100"
                                >
                                    {/* CDN icon rendering */}
                                    <img
                                        src={`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${tech.icon}.svg`}
                                        alt={tech.name}
                                        className="w-8 h-8 mb-2"
                                        onError={e => { e.target.style.display = 'none'; }}
                                    />
                                    <span className="text-xs text-gray-700 font-medium text-center">{tech.name}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                    
                </div>
            </div>
        </motion.div>
    )
}

export default TechChoose