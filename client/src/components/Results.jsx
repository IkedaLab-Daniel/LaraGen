import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
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
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
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

                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}

export default Results