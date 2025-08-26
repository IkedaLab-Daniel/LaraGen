import { useState } from "react";
import { motion } from "framer-motion"
import { LayoutGrid, Code, Database, ServerCog, Smartphone, Wrench, Search } from "lucide-react";
import { 
  SiReact, SiVuedotjs, SiAngular, SiSvelte, SiNextdotjs, SiNuxtdotjs, SiTailwindcss, SiBootstrap, 
  SiNodedotjs, SiExpress, SiLaravel, SiDjango, SiFlask, SiSpring, SiRubyonrails, SiDotnet, 
  SiMongodb, SiMysql, SiPostgresql, SiSqlite, SiFirebase, SiDocker, SiJenkins, 
  SiFlutter, SiSwift, SiKotlin, SiGit, SiWebpack, SiVite, SiJest, SiCypress, 
  SiStorybook, SiEslint, SiPrettier, SiSass, SiLess, SiGraphql, SiRedux, SiMobx, 
  SiPuppeteer, SiMocha, SiChai, SiJasmine, SiPhp, SiPython, SiJavascript, SiTypescript, 
  SiGo, SiRust, SiFramer
} from "react-icons/si";

const TechChoose = () => {

        const [selectedCategory, setSelectedCategory] = useState('frontend')

        const techOptions = [
        // Frontend
    { id: 1, name: "React", icon: SiReact, color: "#61DAFB", category: "frontend" },
    { id: 2, name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D", category: "frontend" },
    { id: 3, name: "Angular", icon: SiAngular, color: "#DD0031", category: "frontend" },
    { id: 4, name: "Svelte", icon: SiSvelte, color: "#FF3E00", category: "frontend" },
    { id: 5, name: "Next.js", icon: SiNextdotjs, color: "#000000", category: "frontend" },
    { id: 6, name: "Nuxt.js", icon: SiNuxtdotjs, color: "#00DC82", category: "frontend" },
    { id: 7, name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8", category: "frontend" },
    { id: 8, name: "Bootstrap", icon: SiBootstrap, color: "#7952B3", category: "frontend" },
        { id: 56, name: "Framer", icon: SiFramer, color: "#0055FF", category: "frontend" },
    // Backend
    { id: 10, name: "Node.js", icon: SiNodedotjs, color: "#339933", category: "backend" },
    { id: 11, name: "Express.js", icon: SiExpress, color: "#000000", category: "backend" },
    { id: 12, name: "Laravel", icon: SiLaravel, color: "#FF2D20", category: "backend" },
    { id: 13, name: "Django", icon: SiDjango, color: "#092E20", category: "backend" },
    { id: 14, name: "Flask", icon: SiFlask, color: "#000000", category: "backend" },
    { id: 15, name: "Spring Boot", icon: SiSpring, color: "#6DB33F", category: "backend" },
    { id: 16, name: "Ruby on Rails", icon: SiRubyonrails, color: "#CC0000", category: "backend" },
    { id: 17, name: "ASP.NET", icon: SiDotnet, color: "#512BD4", category: "backend" },
    // Database
    { id: 18, name: "MongoDB", icon: SiMongodb, color: "#47A248", category: "database" },
    { id: 19, name: "MySQL", icon: SiMysql, color: "#4479A1", category: "database" },
    { id: 20, name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", category: "database" },
    { id: 21, name: "SQLite", icon: SiSqlite, color: "#003B57", category: "database" },
    { id: 22, name: "Firebase", icon: SiFirebase, color: "#FFCA28", category: "database" },
    // DevOps
    { id: 23, name: "Docker", icon: SiDocker, color: "#2496ED", category: "devops" },
    { id: 24, name: "Jenkins", icon: SiJenkins, color: "#D24939", category: "devops" },
    // Mobile
    { id: 25, name: "React Native", icon: SiReact, color: "#61DAFB", category: "mobile" },
    { id: 26, name: "Flutter", icon: SiFlutter, color: "#02569B", category: "mobile" },
    { id: 27, name: "Swift", icon: SiSwift, color: "#FA7343", category: "mobile" },
    { id: 28, name: "Kotlin", icon: SiKotlin, color: "#7F52FF", category: "mobile" },
    // Tools
    { id: 29, name: "Git", icon: SiGit, color: "#F05032", category: "tools" },
    { id: 30, name: "Webpack", icon: SiWebpack, color: "#8DD6F9", category: "tools" },
    { id: 31, name: "Vite", icon: SiVite, color: "#646CFF", category: "tools" },
    { id: 32, name: "Jest", icon: SiJest, color: "#C21325", category: "tools" },
    { id: 33, name: "Cypress", icon: SiCypress, color: "#17202C", category: "tools" },
    { id: 34, name: "Storybook", icon: SiStorybook, color: "#FF4785", category: "tools" },
    { id: 35, name: "ESLint", icon: SiEslint, color: "#4B32C3", category: "tools" },
    { id: 36, name: "Prettier", icon: SiPrettier, color: "#F7B93E", category: "tools" },
    { id: 37, name: "Sass", icon: SiSass, color: "#CC6699", category: "tools" },
    { id: 38, name: "Less", icon: SiLess, color: "#1D365D", category: "tools" },
    // API
    { id: 39, name: "GraphQL", icon: SiGraphql, color: "#E10098", category: "tools" },
    { id: 40, name: "REST API", icon: SiRedux, color: "#6DB33F", category: "tools" },
    // State Management
    { id: 41, name: "Redux", icon: SiRedux, color: "#764ABC", category: "tools" },
    { id: 42, name: "MobX", icon: SiMobx, color: "#FF9955", category: "tools" },
    // Testing
    { id: 43, name: "Puppeteer", icon: SiPuppeteer, color: "#40B5A4", category: "tools" },
    { id: 44, name: "Mocha", icon: SiMocha, color: "#8D6748", category: "tools" },
    { id: 45, name: "Chai", icon: SiChai, color: "#A30701", category: "tools" },
    { id: 46, name: "Jasmine", icon: SiJasmine, color: "#8A4182", category: "tools" },
    // Other
    { id: 47, name: "PHP", icon: SiPhp, color: "#777BB4", category: "backend" },
    { id: 48, name: "Python", icon: SiPython, color: "#3776AB", category: "backend" },
    { id: 49, name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", category: "frontend" },
    { id: 50, name: "TypeScript", icon: SiTypescript, color: "#3178C6", category: "frontend" },
    { id: 53, name: "Go", icon: SiGo, color: "#00ADD8", category: "backend" },
    { id: 54, name: "Rust", icon: SiRust, color: "#000000", category: "backend" },
    { id: 55, name: "Redux Toolkit", icon: SiRedux, color: "#764ABC", category: "tools" }
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

    const handleDragStart = (e, tech) => {
        e.dataTransfer.setData('tech', JSON.stringify(tech))
    }

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
                            className="grid grid-cols-7 gap-3"
                        >
                            {filteredTechOptions.map((tech) => (
                                <motion.div
                                    key={tech.id}
                                    layout
                                    className="flex flex-col items-center justify-center p-2 bg-white rounded-xl shadow hover:shadow-lg transition-all duration-200 border border-gray-100 max-h-[100px]"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                    draggable
                                    onDrag={(e) => handleDragStart(e, tech)}
                                    whileHover={{ scale: 1.05 }}
                                    whileDrag={{ scale: 1.1, rotate: 5}}
                                >
                                    {/* React icon rendering */}
                                    <tech.icon size={32} color={tech.color} className="mb-2" />
                                    <span className="text-xs text-gray-700 font-medium text-center">{tech.name}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* 
                        show this no tech found on the category
                        This is not likely to happen but this might be useful later
                        */}
                        {filteredTechOptions.length === 0 && (
                            <div className="flex items-center justify-center h-32 text-gray-400">
                                <div className="text-center">
                                    <div className="text-2xl mb-2">
                                        <Search className="inline-block w-8 h-8 mb-2" />
                                    </div>
                                    <span>No technologies found in this category.</span>
                                </div>
                            </div>
                        )}
                    </div>
                    
                </div>
            </div>
        </motion.div>
    )
}

export default TechChoose