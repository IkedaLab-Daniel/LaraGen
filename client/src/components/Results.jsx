import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb, Clock, Star, Code, CheckCircle, Target,ExternalLink } from "lucide-react";
import { useState } from "react";

const Results = () => {

    const [selectedProject, setSelectedProject] = useState(null)
    
    const sampleResults = {
        "success": "true",
        "data": {
        "projects": [
            {
            "name": "To-Do List Manager",
            "description": "A simple yet efficient web application to manage your daily tasks using React for the frontend and Express & MongoDB for the backend.",
            "features": [
                "User authentication",
                "Task creation, reading, updating, and deletion",
                "Markdown support for task details"
            ],
            "estimatedTime": "2-3 weeks",
            "difficulty": "Beginner",
            "learningOutcomes": [
                "Building CRUD APIs with Express and MongoDB",
                "Implementing user authentication with JSON Web Tokens",
                "State management with React"
            ]
            },
            {
            "name": "E-Commerce Platform",
            "description": "A full-featured online store with shopping cart, payment processing, and admin dashboard using modern web technologies.",
            "features": [
                "Product catalog with search and filters",
                "Shopping cart and checkout system",
                "Payment integration with Stripe",
                "Admin dashboard for inventory management"
            ],
            "estimatedTime": "6-8 weeks",
            "difficulty": "Advanced",
            "learningOutcomes": [
                "Complex state management and data flow",
                "Payment gateway integration",
                "Advanced database relationships",
                "Production deployment strategies"
            ]
            },
            {
            "name": "Real-time Chat Application",
            "description": "Build a modern chat application with real-time messaging, file sharing, and user presence indicators.",
            "features": [
                "Real-time messaging with Socket.io",
                "File and image sharing",
                "User presence and typing indicators",
                "Chat rooms and private messaging"
            ],
            "estimatedTime": "3-4 weeks",
            "difficulty": "Intermediate",
            "learningOutcomes": [
                "WebSocket implementation and real-time communication",
                "File upload and storage solutions",
                "Advanced React hooks and context",
                "User experience optimization"
            ]
            }
        ]
        }
    };

    const projects = sampleResults.data.projects

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    }

    return(
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-6xl mx-auto p-6 space-y-8"
        >
            {/* Heading stuffs */}
            <motion.div
                variants={itemVariants}
                className="text-center space-y-4"
            >
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-400 rounded-full md:flex items-center justify-center hidden">
                        <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">Recommended Projects</h2>
                </div>
                {/* subtitle here */}
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Based on your selected tech stack, here are personalized project recommendations to help you build real-world experience and advance your skills.
                </p>
            </motion.div>

            {/* main project grid */}
            <motion.div
                variants={containerVariants}
                className="grid gap-6 grid-cols-1"
            >
                <AnimatePresence>
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.name}
                            variants={itemVariants}
                            layout
                            className="bg-white/80 backdrop-blue-sm rounded-2xl shadow-xl p-6 border border-blue-100 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                            whileHover={{ y: -5, scale: 1.02 }}
                            onClick={() => setSelectedProject(selectedProject === index ? null : index)}
                        >
                            {/* project heading here */}
                            <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                        {project.name}
                                    </h3>
                                    <span className="px-2 py-1 rounded-full text-xs font-medium text-gray-400">
                                        {project.difficulty}
                                    </span>
                                </div>

                                <p className="text-gray-600 text-sm leading-relax">
                                    {project.description}
                                </p>

                                {/* time */}
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Clock className="w-4 h-4" />
                                    <span>{project.estimatedTime}</span>
                                </div>

                                {/* key feature preview */}
                                <div className="space-y-2">
                                    <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <Star className="w-4 h-4" />
                                        Key Feature
                                    </h4>
                                    <div className="flex flex-wrap gap-1">
                                        {project.features.slice(0,2).map((feature, index) => (
                                            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs">
                                                {feature}
                                            </span>
                                        ))}
                                        {project.features.length > 2 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                                                + {project.features.length - 2} more
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Expand button here  */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full mt-4 py-2 bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <Code className="w-4 h-4" />
                                    {selectedProject === index ? "Show Less" : "Show"}
                                </motion.button>

                                {/* expand details */}
                                <AnimatePresence>
                                    {selectedProject === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-6 mt-6 border-t border-gray-200 space-y-4">
                                            {/* All Features */}
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                Complete Feature List
                                                </h4>
                                                <ul className="space-y-1">
                                                {project.features.map((feature, idx) => (
                                                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                                    {feature}
                                                    </li>
                                                ))}
                                                </ul>
                                            </div>

                                            {/* Learning Outcomes */}
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                <Target className="w-4 h-4 text-purple-500" />
                                                Learning Outcomes
                                                </h4>
                                                <ul className="space-y-1">
                                                {project.learningOutcomes.map((outcome, idx) => (
                                                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                                    {outcome}
                                                    </li>
                                                ))}
                                                </ul>
                                            </div>

                                            {/* Action Button */}
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Start Building This Project
                                            </motion.button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}

export default Results