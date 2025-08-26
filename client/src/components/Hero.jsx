import { motion } from "framer-motion"
import { Zap } from "lucide-react";
const Hero = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

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
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-[1200px] h-[300px] mx-auto flex flex-col justify-center items-center pt-[260px] md:pt-[310px]"
        >
            {/* Badge */}
            <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center px-4 py-2 mb-5 md:mb-8 bg-white/70 backdrop-blur-sm border border-blue-200 rounded-full shadow-lg"
            >
                <Zap className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-sm font-medium text-#FF2D20">Server Running</span>
            </motion.div>
            
            {/* main headline */}
            <motion.div variants={itemVariants} className="text-center mb-12">
                <h1 className="text-4xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                    Generate {' '}
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        Perfect
                    </span>
                    <br/>
                    Project Ideas
                </h1>

                <p className="text-md md:text-2xl text-gray-600 mb-8 max-w-[80vw] md:max-w-3xl mx-auto leading-relaxe lg:max-w-4xl">
                    Choose your tech stack and difficulty level. Our AI will generate personalized project ideas that match your skills and help you grow as a developer.
                </p>
            </motion.div>
        </motion.div>
    )
}

export default Hero