import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import { LayoutGrid, Code, Database, ServerCog, Smartphone, Wrench, Search, Plus } from "lucide-react";
import {
  SiReact, SiVuedotjs, SiAngular, SiSvelte, SiNextdotjs, SiNuxtdotjs, SiTailwindcss, SiBootstrap, 
  SiNodedotjs, SiExpress, SiLaravel, SiDjango, SiFlask, SiSpring, SiRubyonrails, SiDotnet, 
  SiMongodb, SiMysql, SiPostgresql, SiSqlite, SiFirebase, SiDocker, SiJenkins, 
  SiFlutter, SiSwift, SiKotlin, SiGit, SiWebpack, SiVite, SiJest, SiCypress, 
  SiStorybook, SiEslint, SiPrettier, SiSass, SiLess, SiGraphql, SiRedux, SiMobx, 
  SiPuppeteer, SiMocha, SiChai, SiJasmine, SiPhp, SiPython, SiJavascript, SiTypescript, 
  SiGo, SiRust, SiFramer, SiHtml5, SiCss3, SiJquery, SiEmberdotjs, SiAlpinedotjs, SiAstro, 
  SiRemix, SiGatsby, SiVuetify, SiQuasar, SiMui, SiChakraui, SiAntdesign, SiBulma,
  SiFastapi, SiNestjs, SiKoa, SiSocketdotio, SiFastify, SiStrapi, SiSupabase, SiPlanetscale,
  SiRedis, SiApachecassandra, SiOracle, SiMariadb, SiAmazondynamodb, SiElasticsearch, SiInfluxdb,
  SiKubernetes, SiAmazon, SiGooglecloud, SiVercel, SiNetlify,
  SiHeroku, SiGithubactions, SiGitlab, SiCircleci, SiTravisci, SiTerraform, SiAnsible,
  SiIonic, SiApachecordova, SiNativescript, SiExpo,
  SiYarn, SiNpm, SiPnpm, SiRollupdotjs, SiEsbuild, SiVitest, SiSelenium,
  SiPostman, SiInsomnia, SiSwagger, SiFigma, SiSketch, SiAdobexd, SiInvision, SiPm2, SiNodemon, SiLerna, SiNx, SiTurborepo,
  SiC, SiCplusplus, SiRuby, SiScala, SiElixir, SiHaskell, SiClojure,
  SiContentful, SiSanity, SiGhost, SiWordpress
} from "react-icons/si";
import { FaJava } from "react-icons/fa"
import { TbBrandAzure, TbBrandReactNative, TbBrandXamarin } from 'react-icons/tb'

const TechChoose = () => {

        const [selectedCategory, setSelectedCategory] = useState('frontend')
        const [droppedTech, setDroppedTech] = useState([])

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
        { id: 156, name: "Framer", icon: SiFramer, color: "#0055FF", category: "frontend" },
        // HTML/CSS/JS frameworks
        { id: 56, name: "HTML5", icon: SiHtml5, color: "#E34F26", category: "frontend" },
        { id: 57, name: "CSS3", icon: SiCss3, color: "#1572B6", category: "frontend" },
        { id: 58, name: "jQuery", icon: SiJquery, color: "#0769AD", category: "frontend" },
        { id: 59, name: "Ember.js", icon: SiEmberdotjs, color: "#E04E39", category: "frontend" },
        { id: 60, name: "Alpine.js", icon: SiAlpinedotjs, color: "#8BC0D0", category: "frontend" },
        { id: 61, name: "Astro", icon: SiAstro, color: "#1B1F23", category: "frontend" },
        { id: 62, name: "Remix", icon: SiRemix, color: "#000000", category: "frontend" },
        { id: 63, name: "Gatsby", icon: SiGatsby, color: "#663399", category: "frontend" },
        { id: 64, name: "Vuetify", icon: SiVuetify, color: "#1867C0", category: "frontend" },
        { id: 65, name: "Quasar", icon: SiQuasar, color: "#1976D2", category: "frontend" },
        { id: 66, name: "MUI", icon: SiMui, color: "#007FFF", category: "frontend" },
        { id: 67, name: "Chakra UI", icon: SiChakraui, color: "#319795", category: "frontend" },
        { id: 68, name: "Ant Design", icon: SiAntdesign, color: "#0170FE", category: "frontend" },
        { id: 69, name: "Bulma", icon: SiBulma, color: "#00D1B2", category: "frontend" },
        // Backend frameworks
        { id: 70, name: "FastAPI", icon: SiFastapi, color: "#009688", category: "backend" },
        { id: 71, name: "NestJS", icon: SiNestjs, color: "#E0234E", category: "backend" },
        { id: 72, name: "Koa", icon: SiKoa, color: "#33333D", category: "backend" },
        { id: 73, name: "Socket.io", icon: SiSocketdotio, color: "#010101", category: "backend" },
        { id: 74, name: "Fastify", icon: SiFastify, color: "#000000", category: "backend" },
        { id: 75, name: "Strapi", icon: SiStrapi, color: "#8E75FF", category: "backend" },
        { id: 76, name: "Supabase", icon: SiSupabase, color: "#3ECF8E", category: "backend" },
        { id: 77, name: "PlanetScale", icon: SiPlanetscale, color: "#000000", category: "database" },
        // Databases
        { id: 78, name: "Redis", icon: SiRedis, color: "#DC382D", category: "database" },
        { id: 79, name: "Cassandra", icon: SiApachecassandra, color: "#1287B1", category: "database" },
        { id: 80, name: "Oracle", icon: SiOracle, color: "#F80000", category: "database" },
        { id: 81, name: "MariaDB", icon: SiMariadb, color: "#003545", category: "database" },
        { id: 82, name: "DynamoDB", icon: SiAmazondynamodb, color: "#4053D6", category: "database" },
        { id: 83, name: "Elasticsearch", icon: SiElasticsearch, color: "#005571", category: "database" },
        { id: 84, name: "InfluxDB", icon: SiInfluxdb, color: "#22ADF6", category: "database" },
        // Cloud/DevOps
        { id: 85, name: "Kubernetes", icon: SiKubernetes, color: "#326CE5", category: "devops" },
        { id: 86, name: "AWS", icon: SiAmazon, color: "#FF9900", category: "devops" },
        { id: 87, name: "Azure", icon: TbBrandAzure, color: "#0078D4", category: "devops" },
        { id: 88, name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4", category: "devops" },
        { id: 89, name: "Vercel", icon: SiVercel, color: "#000000", category: "devops" },
        { id: 90, name: "Netlify", icon: SiNetlify, color: "#00C7B7", category: "devops" },
        { id: 91, name: "Heroku", icon: SiHeroku, color: "#430098", category: "devops" },
        { id: 92, name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF", category: "devops" },
        { id: 93, name: "GitLab", icon: SiGitlab, color: "#FC6D26", category: "devops" },
        { id: 94, name: "CircleCI", icon: SiCircleci, color: "#343434", category: "devops" },
        { id: 95, name: "Travis CI", icon: SiTravisci, color: "#3EAAAF", category: "devops" },
        { id: 96, name: "Terraform", icon: SiTerraform, color: "#623CE4", category: "devops" },
        { id: 97, name: "Ansible", icon: SiAnsible, color: "#000000", category: "devops" },
        // Mobile
        { id: 98, name: "Xamarin Android", icon: TbBrandXamarin, color: "#3498DB", category: "mobile" },
        { id: 99, name: "Ionic", icon: SiIonic, color: "#3880FF", category: "mobile" },
        { id: 100, name: "Cordova", icon: SiApachecordova, color: "#E8E8E8", category: "mobile" },
        { id: 101, name: "React Native", icon: TbBrandReactNative, color: "#61DAFB", category: "mobile" },
        { id: 102, name: "NativeScript", icon: SiNativescript, color: "#3655FF", category: "mobile" },
        { id: 103, name: "Expo", icon: SiExpo, color: "#000020", category: "mobile" },
        // Build tools
        { id: 104, name: "Yarn", icon: SiYarn, color: "#2C8EBB", category: "tools" },
        { id: 105, name: "npm", icon: SiNpm, color: "#CB3837", category: "tools" },
        { id: 106, name: "pnpm", icon: SiPnpm, color: "#F69220", category: "tools" },
        { id: 107, name: "Rollup", icon: SiRollupdotjs, color: "#EC4A3F", category: "tools" },
        { id: 109, name: "esbuild", icon: SiEsbuild, color: "#FFCF00", category: "tools" },
        { id: 110, name: "Vitest", icon: SiVitest, color: "#6E9F18", category: "tools" },
        { id: 112, name: "Selenium", icon: SiSelenium, color: "#43B02A", category: "tools" },
        // API/Testing/Design tools
        { id: 113, name: "Postman", icon: SiPostman, color: "#FF6C37", category: "tools" },
        { id: 114, name: "Insomnia", icon: SiInsomnia, color: "#4000BF", category: "tools" },
        { id: 115, name: "Swagger", icon: SiSwagger, color: "#85EA2D", category: "tools" },
        { id: 116, name: "Figma", icon: SiFigma, color: "#F24E1E", category: "tools" },
        { id: 117, name: "Sketch", icon: SiSketch, color: "#F7B500", category: "tools" },
        { id: 118, name: "Adobe XD", icon: SiAdobexd, color: "#FF61F6", category: "tools" },
        { id: 119, name: "InVision", icon: SiInvision, color: "#FF3366", category: "tools" },
        { id: 120, name: "PM2", icon: SiPm2, color: "#2B637B", category: "tools" },
        { id: 121, name: "Nodemon", icon: SiNodemon, color: "#76D04B", category: "tools" },
        { id: 122, name: "Lerna", icon: SiLerna, color: "#9333EA", category: "tools" },
        { id: 123, name: "Nx", icon: SiNx, color: "#1435C2", category: "tools" },
        { id: 124, name: "Turborepo", icon: SiTurborepo, color: "#000000", category: "tools" },
        // Languages
        { id: 126, name: "Java", icon: FaJava, color: "#007396", category: "backend" },
        { id: 127, name: "C#", icon: SiC, color: "#239120", category: "backend" },
        { id: 128, name: "C++", icon: SiCplusplus, color: "#00599C", category: "backend" },
        { id: 129, name: "C", icon: SiC, color: "#A8B9CC", category: "backend" },
        { id: 130, name: "Ruby", icon: SiRuby, color: "#CC342D", category: "backend" },
        { id: 131, name: "Scala", icon: SiScala, color: "#DC322F", category: "backend" },
        { id: 132, name: "Elixir", icon: SiElixir, color: "#6E4A7E", category: "backend" },
        { id: 133, name: "Haskell", icon: SiHaskell, color: "#5D4F85", category: "backend" },
        { id: 134, name: "Clojure", icon: SiClojure, color: "#5881D8", category: "backend" },
        // Headless CMS/Blog
        { id: 136, name: "Contentful", icon: SiContentful, color: "#2478CC", category: "tools" },
        { id: 137, name: "Sanity", icon: SiSanity, color: "#F03E2F", category: "tools" },
        { id: 138, name: "Ghost", icon: SiGhost, color: "#181818", category: "tools" },
        { id: 139, name: "WordPress", icon: SiWordpress, color: "#21759B", category: "tools" },
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

    const handleDrop = (e) => {
        e.preventDefault();
        const tech = JSON.parse(e.dataTransfer.getData('tech'))
        addTechToStack(tech)
    }

    const addTechToStack = (tech) => {
        if (!droppedTech.find(item => item.id === tech.id)){
            setDroppedTech([...droppedTech, tech])
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
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

    // ! Debugging
    useEffect(() => {
        console.log("Techs rendered:", filteredTechOptions);
    }, [])

    return(
        <motion.div variants={itemVariants} className="w-full max-w-6xl mx-auto h-auto">
            <div className="grid md:grid-cols-[70%,30%] gap-8">
                {/* tech stack selection */}
                <div className="space-y-6 w-[95%] mx-auto md:w-full">
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
                            className="grid grid-cols-4 md:grid-cols-7 gap-3"
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

                    {/* Selected tech stack container*/}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-gray-800 text-center">Selected Stack</h3>
                        <div 
                            className="w-[95%] mx-auto md:w-full bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-dashed border-blue-300 md:min-h-[300px] flex items-center justify-center"
                            onDrop={handleDrop}
                        >   
                            {/* if no tech dropped yet let's display this */}
                            {droppedTech.length === 0 ? (
                                <div className="flex items-center justify-center text-gray-400 h-full">
                                    <Plus className="w-8 h-8 mr-2" />
                                    Drag technologies here
                                </div>
                            ) : (
                                <div>
                                    item
                                </div>
                            )}
                        </div>
                    </div>
            </div>
        </motion.div>
    )
}

export default TechChoose