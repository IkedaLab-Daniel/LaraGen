import { motion } from "framer-motion";

const Results = () => {
    
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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 0,
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
        <div className="w-full max-w-6xl h-[300px] mx-auto">        
            {/* project 1 */}
            <div className="grid grid-cols-[30%,70%] gap-4 h-full">
                <div className="bg-red-200 h-full">
                    Left side details
                </div>
                <div className="bg-blue-200 h-full">
                    right side details
                </div>
            </div>
        </div>
    )
}

export default Results