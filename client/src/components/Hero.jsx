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
            className="w-full max-w-[1200px] bg-slate-200 h-[300px] mx-auto flex flex-col justify-center items-center "
        >
            {/* Badge */}
            <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center px-4 py-2 mb-8 bg-white/70 backdrop-blur-sm border border-blue-200 rounded-full shadow-lg"
            >
                <Zap className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-sm font-medium text-#FF2D20">Server Running</span>
            </motion.div>
            <h1 className="font-bold text-5xl">Cool Hero</h1>
            <h3 className="text-xl">A description for my web app</h3>
        </motion.div>
    )
}

export default Hero